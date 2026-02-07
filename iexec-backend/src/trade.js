const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { deriveGhostFleet } = require('./keyManager');

/**
 * Resolves a Polymarket slug to technical identifiers (conditionId, tokenId)
 */
async function resolveMarket(slug, outcome, proxyUrl) {
    console.log(`Resolving market for slug: ${slug}`);
    const config = {};
    if (proxyUrl || process.env.HTTPS_PROXY) {
        config.httpsAgent = new HttpsProxyAgent(proxyUrl || process.env.HTTPS_PROXY);
    }

    try {
        const response = await axios.get(`https://clob.polymarket.com/markets?slug=${slug}`, config);
        const market = response.data[0];
        if (!market) throw new Error("Market not found");

        const tokenId = (outcome.toUpperCase() === 'YES') ? market.yes_token_id : market.no_token_id;
        console.log(`Resolved: Market Name="${market.question}", TokenID=${tokenId}`);
        return { 
            tokenId, 
            conditionId: market.condition_id,
            question: market.question 
        };
    } catch (error) {
        console.error("Market resolution failed:", error.message);
        throw error;
    }
}

/**
 * Executes a single trade in the fleet
 */
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
        salt: salt,
        maker: makerAddress,
        signer: await ghostSigner.getAddress(),
        taker: "0x0000000000000000000000000000000000000000",
        tokenId: tokenId,
        makerAmount: amountInWei.toString(),
        takerAmount: "0", 
        expiration: expiration,
        nonce: 0, 
        feeRateBps: 0,
        side: side,
        signatureType: useAA ? 2 : 0, 
    };

    const signature = await ghostSigner.signTypedData(domain, types, order);
    console.log(`[Ghost] Order signed for Vault ${makerAddress} using Ghost ${await ghostSigner.getAddress()}`);
    
    return { status: "success", maker: makerAddress, salt };
}

/**
 * Polymarket CLOB Trade Logic with Ghost Fleet Fragmentation
 */
async function placeOrder({ marketId, outcome, amount, privateKey, proxyUrl, marketSlug, safeAddress, useAA, fleetSize = 1, masterSeed, userAddress }) {
    // 0. Resolve Market
    let tokenId = marketId;
    if (marketSlug) {
        const resolved = await resolveMarket(marketSlug, outcome, proxyUrl);
        tokenId = resolved.tokenId;
    }

    // 1. Derive Fleet
    console.log(`Deploying Ghost Fleet of size: ${fleetSize}`);
    const fleetKeys = deriveGhostFleet(masterSeed || "dev-seed", userAddress || "0x0", fleetSize);
    
    // 2. Split Amount
    const amountPerShip = (parseFloat(amount) / fleetSize).toFixed(6);
    console.log(`Fragmenting ${amount} USDC into ${fleetSize} trades of ${amountPerShip} USDC each.`);

    // 3. Execute Fleet
    const results = [];
    for (const key of fleetKeys) {
        // In a real AA setup, safeAddress would also be unique per key if we want true fragmentation
        // For this demo, we can either use the same Safe or derive unique Safes
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

    return { 
        status: "fleet-success", 
        fleetSize, 
        totalAmount: amount, 
        trades: results 
    };
}

async function main() {
    const iexecIn = process.env.IEXEC_IN || '/iexec_in';
    const iexecOut = process.env.IEXEC_OUT || '/iexec_out';
    const inputPath = path.join(iexecIn, 'protectedData.json'); // Changed from .zip to .json for simplicity in this example

    let inputData;
    try {
        if (fs.existsSync(inputPath)) {
            const rawData = fs.readFileSync(inputPath);
            inputData = JSON.parse(rawData);
            console.log("Loaded protected data from", inputPath);
        } else {
            console.log("No protected data found at", inputPath, "- using env vars for local testing");
            inputData = {
                marketId: process.env.MARKET_ID,
                amount: process.env.AMOUNT,
                outcome: process.env.OUTCOME
            };
        }
    } catch (e) {
        console.error("Error reading input data:", e);
        process.exit(1);
    }

    const masterSeed = process.env.IEXEC_APP_SECRET_1 || "local-dev-seed";
    const userAddress = inputData.userAddress || "0x0000000000000000000000000000000000000000";

    let privateKey;
    if (process.env.IEXEC_APP_SECRET_0) {
        // Option A: Use a direct secret injected by SMS
        privateKey = process.env.IEXEC_APP_SECRET_0;
    } else {
        // Option B: Derive the Ghost Wallet for this user
        console.log(`Deriving Ghost Wallet for user: ${userAddress}`);
        const ghostWallet = deriveGhostWallet(masterSeed, userAddress);
        privateKey = ghostWallet.privateKey;
    }

    if (!inputData.marketId || !inputData.outcome || !inputData.amount || !privateKey) {
        console.error("Missing required inputs (marketId, outcome, amount, or privateKey)");
        process.exit(1);
    }

    try {
        const result = await placeOrder({
            marketId: inputData.marketId,
            marketSlug: inputData.marketSlug,
            outcome: inputData.outcome,
            amount: inputData.amount,
            privateKey: privateKey,
            safeAddress: inputData.safeAddress,
            useAA: inputData.useAA,
            fleetSize: inputData.fleetSize || 1,
            masterSeed: masterSeed,
            userAddress: userAddress
        });

        // Write results for iExec
        fs.writeFileSync(path.join(iexecOut, 'result.json'), JSON.stringify(result));
        fs.writeFileSync(path.join(iexecOut, 'computed.json'), JSON.stringify({
            "deterministic-output-path": path.join(iexecOut, 'result.json')
        }));
        console.log("Results written to", iexecOut);
    } catch (err) {
        console.error("Trade failed:", err);
        process.exit(1);
    }
}

main();
