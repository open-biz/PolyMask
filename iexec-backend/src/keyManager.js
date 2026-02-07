import { ethers } from 'ethers';

/**
 * Deterministically derives a "Ghost Fleet" of keys from a master seed.
 * 
 * @param {string} masterSeed - The master secret
 * @param {string} userAddress - The user's original wallet address
 * @param {number} count - Number of keys to derive in the fleet
 * @returns {string[]} Array of private keys
 */
export function deriveGhostFleet(masterSeed, userAddress, count = 1) {
    if (!masterSeed) throw new Error("Master seed is required");
    if (!userAddress) throw new Error("User address is required");

    const fleet = [];
    const userHash = ethers.keccak256(ethers.toUtf8Bytes(userAddress.toLowerCase()));
    
    // Base index derived from user address
    const baseIndex = parseInt(userHash.substring(2, 10), 16) % 1000000;

    const masterNode = ethers.HDNodeWallet.fromSeed(ethers.keccak256(ethers.toUtf8Bytes(masterSeed)));
    
    for (let i = 0; i < count; i++) {
        // Path: m/44'/60'/0'/0/baseIndex + i
        const derivedNode = masterNode.derivePath(`m/44'/60'/0'/0/${baseIndex + i}`);
        fleet.push(derivedNode.privateKey);
    }
    
    return fleet;
}
