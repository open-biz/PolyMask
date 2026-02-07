# <img src="./polymask-black.jpeg" width="48" height="48" valign="middle"> PolyMask

### **Place private, untraceable bets on Polymarket**

> **"PolyMask is like a VPN for your wallet, allowing you to bet on Polymarket without the world knowing."**

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Next.js](https://img.shields.io/badge/Frontend-Next.js-black)](https://nextjs.org/)
[![TEE: iExec](https://img.shields.io/badge/Hardware-Intel_SGX-blue)](https://iex.ec/)
[![Network: Polygon](https://img.shields.io/badge/Network-Polygon-purple)](https://polygon.technology/)
[![Built for: Polymarket](https://img.shields.io/badge/Built_for-Polymarket-blue)](https://polymarket.com/)

---

## 🔴 The Problem

Polymarket is built on a public blockchain, which creates two massive vulnerabilities for users:

1.  **Identity Exposure (Privacy):** Every bet you make is permanently linked to your wallet. If your wallet is known (via ENS, Twitter, or CEX transfers), your boss, family, or the public can see exactly what your views are. **Your private opinions are public data.**
2.  **Strategy Theft (The "Copy-Trade" Problem):** If you are a successful, high-stakes trader ("Alpha"), bots and other traders watch your wallet 24/7. The moment you place a bet, they copy you, moving the market price against you. **You are being front-run and losing money because people can see your moves.**

> **The "Whale" Trap:** If you are a top trader (like the famous "Fredi9999"), you cannot accumulate a large position without the entire world seeing you. You pay more because you are famous.

---

## 🟢 The Solution: PolyMask

PolyMask is a Chrome Extension that allows you to use the standard Polymarket website while completely hiding your identity and your trades.

### 1. Ghost Wallets (Account Abstraction)
Instead of one "Whale Wallet" that ends up on the leaderboard, PolyMask uses **Account Abstraction** to deploy a fleet of "retail-sized" smart accounts. To the public leaderboard, it looks like 100 random people just made a small bet.

### 2. The Digital Vault (iExec TEE)
We use high-security **Hardware Vaults (Intel SGX)** to manage these Ghost Wallets. Even PolyMask developers cannot see which Ghost Wallet belongs to which user. The connection between your identity and your bet is completely severed inside the TEE.

### 3. Context-Aware Execution
The Chrome Extension identifies exactly which market you are viewing and handles the fragmentation and execution in the background. You can move $1,000,000 into a market without ever appearing on a "Whale Watch" alert. **You get the retail price for institutional size.**

---

## 💎 The Business Value

*   **For the Everyday User:** Financial Privacy. Bet on elections, sports, or pop culture without your financial history being "doxxed" to the world.
*   **For the Professional Trader:** Alpha Protection. By splitting your bets across a "Ghost Fleet," you prevent bots from copy-trading you, ensuring you get the best possible price.
*   **The User Experience:** It works exactly like a **VPN**. You turn it on, browse Polymarket as usual, and click "Shielded Bet." 

> In traditional finance, hedge funds guard their trades with extreme secrecy. On Polymarket, traders are forced to live on the leaderboard. **PolyMask brings Wall Street privacy to the decentralized prediction market.**

---

## 🏗️ Project Structure

- **[`/polymask-extension`](./polymask-extension)**: Chrome Extension (React + Vite). Detects context and handles client-side encryption.
- **[`/iexec-backend`](./iexec-backend)**: TEE Worker (Node.js). Resolves markets, derives the Ghost Fleet, and executes fragmented trades.
- **[`/polymask-landing`](./polymask-landing)**: Marketing and onboarding landing page (Next.js 15).

---

## 🛠️ Development Setup

```bash
# Install all dependencies
cd polymask-extension && bun install
cd ../iexec-backend && bun install
cd ../polymask-landing && bun install
```

### Building the Extension
1. `cd polymask-extension && bun run build`
2. Open Chrome -> `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `polymask-extension/dist` folder.

---

## 🏆 Hackathon Submission
Built for the **Polymarket iExec Hackathon 2026**. PolyMask represents the pinnacle of on-chain privacy by combining TEE Hardware Security with Account Abstraction.
