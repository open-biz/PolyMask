import fs from 'node:fs/promises';
import path from 'node:path';
import { ethers } from 'ethers';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { deriveGhostFleet } from './keyManager.js';
import JSZip from 'jszip';

/**
 * Custom helper to read protected data from the iExec zip
 */
async function getProtectedData() {
    const iexecIn = process.env.IEXEC_IN || '/iexec_in';
    const datasetFilename = process.env.IEXEC_DATASET_FILENAME || 'protectedData.zip';
    const filePath = path.join(iexecIn, datasetFilename);
    
    try {
        const buffer = await fs.readFile(filePath);
        const zip = await new JSZip().loadAsync(buffer);
        
        // DataProtector v2+ uses a nested structure or individual files
        // We'll try to reconstruct the object from the files in the zip
        const data = {};
        for (const [relativePath, file] of Object.entries(zip.files)) {
            if (!file.dir) {
                const content = await file.async('string');
                const key = relativePath.split('/').pop();
                data[key] = content;
            }
        }
        return data;
    } catch (e) {
        console.log("No protected data zip found or failed to parse, checking for fallback json");
        const fallbackPath = path.join(iexecIn, 'protectedData.json');
        try {
            const raw = await fs.readFile(fallbackPath, 'utf8');
            return JSON.parse(raw);
        } catch (e2) {
            return {};
        }
    }
}

/**
 * Resolves a Polymarket slug to technical identifiers (conditionId, tokenId)
 */
async function resolveMarket(slug, outcome, proxyUrl) {
    console.log(`Resolving market for slug: ${slug}`);
    const config = {};
    if (proxyUrl) {
        config.httpsAgent = new HttpsProxyAgent(proxyUrl);
    }

    try {
        const response = await axios.get(`https://clob.polymarket.com/markets?slug=${slug}`, config);
        const market = response.data[0];
        if (!market) throw new Error("Market not found");

        const tokenId = (outcome.toUpperCase() === 'YES') ? market.yes_token_id : market.no_token_id;
        return { 
            tokenId, 
            conditionId: market.condition_id,
            question: market.question 
        };
    } catch (error) {
        throw new Error(`Market resolution failed: ${error.message}`);
    }
}

async function executeSingleTrade({ tokenId, outcome, amount, privateKey, safeAddress, useAA }) {
    const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');
    const ghostSigner = new ethers.Wallet(privateKey, provider);
    const makerAddress = useAA ? safeAddress : await ghostSigner.getAddress();

    const domain = {
        name: "CtfExchange",
        version: "1",
        chainId: 137,
        verifyingContract: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
    };

    const types = {
        Order: [
            { name: "salt", type: "uint256" },
            { name: "maker", type: "address" },
            { name: "signer", type: "address" },
            { name: "taker", type: "address" },
            { name: "tokenId", type: "uint256" },
            { name: "makerAmount", type: "uint256" },
            { name: "takerAmount", type: "uint256" },
            { name: "expiration", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "feeRateBps", type: "uint256" },
            { name: "side", type: "uint8" },
            { name: "signatureType", type: "uint8" },
        ],
    };

    const side = (outcome.toUpperCase() === 'YES') ? 0 : 1; 
    const salt = Math.floor(Math.random() * 1000000000);
    const expiration = Math.floor(Date.now() / 1000) + 3600;
    const amountInWei = ethers.parseUnits(amount.toString(), 6);

    const order = {
        salt,
        maker: makerAddress,
        signer: await ghostSigner.getAddress(),
        taker: "0x0000000000000000000000000000000000000000",
        tokenId,
        makerAmount: amountInWei.toString(),
        takerAmount: "0", 
        expiration,
        nonce: 0, 
        feeRateBps: 0,
        side,
        signatureType: useAA ? 2 : 0, 
    };

    await ghostSigner.signTypedData(domain, types, order);
    return { status: "success", maker: makerAddress, salt };
}

const main = async () => {
    const { IEXEC_OUT, IEXEC_APP_SECRET_0, IEXEC_APP_SECRET_1 } = process.env;
    console.log("PolyMask Ghost Fleet Worker Starting...");

    try {
        // 1. Get Input Data
        const inputData = await getProtectedData();
        
        const marketId = inputData.marketId;
        const marketSlug = inputData.marketSlug;
        const outcome = inputData.outcome || "YES";
        const amount = inputData.amount || "1.0";
        const safeAddress = inputData.safeAddress;
        const useAA = inputData.useAA === "true" || inputData.useAA === true;
        const fleetSize = parseInt(inputData.fleetSize || "1");
        const userAddress = inputData.userAddress || "0x0000000000000000000000000000000000000000";

        // 2. Resolve Secrets
        const masterSeed = IEXEC_APP_SECRET_1 || "local-dev-seed";
        const proxyUrl = process.env.PROXY_URL;

        // 3. Resolve Market
        let tokenId = marketId;
        if (marketSlug) {
            const resolved = await resolveMarket(marketSlug, outcome, proxyUrl);
            tokenId = resolved.tokenId;
        }

        // 4. Derive Fleet & Execute
        console.log(`Deploying Ghost Fleet of size: ${fleetSize}`);
        const fleetKeys = deriveGhostFleet(masterSeed, userAddress, fleetSize);
        
        const amountPerShip = (parseFloat(amount) / fleetSize).toFixed(6);

        const results = [];
        for (const key of fleetKeys) {
            const result = await executeSingleTrade({
                tokenId,
                outcome,
                amount: amountPerShip,
                privateKey: key,
                safeAddress,
                useAA
            });
            results.push(result);
        }

        const finalResult = { 
            status: "fleet-success", 
            fleetSize, 
            totalAmount: amount, 
            trades: results 
        };

        // 5. Save Output
        await fs.writeFile(`${IEXEC_OUT}/result.json`, JSON.stringify(finalResult));
        await fs.writeFile(`${IEXEC_OUT}/computed.json`, JSON.stringify({
            'deterministic-output-path': `${IEXEC_OUT}/result.json`,
        }));
        console.log("PolyMask execution complete.");

    } catch (e) {
        console.error("PolyMask Error:", e);
        await fs.writeFile(`${IEXEC_OUT}/computed.json`, JSON.stringify({
            'deterministic-output-path': IEXEC_OUT,
            'error-message': e.message,
        }));
        process.exit(1);
    }
};

main();
