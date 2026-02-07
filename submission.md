# 🛡️ PolyMask (GhostMarket)

### **Place private, untraceable bets on Polymarket**

> **"PolyMask is like a VPN for your wallet, allowing you to bet on Polymarket without the world knowing."**

---

## 🔗 Essential Links
- **📺 [Demo Video](http://go.diginomad.xyz/polymask-demo-video)**
- **💻 [GitHub Repository](https://github.com/open-biz/polymask)**
- **🌐 [Live Onboarding & Landing Page](https://credit-ramp.vercel.app/)**

---

## 🔴 The Problem: Public Leaderboards & Doxxed Alpha
Polymarket is built on a public blockchain, which creates two massive vulnerabilities:
1. **Identity Exposure:** Every bet is linked to your wallet. ENS names and Twitter profiles make your private opinions public data, doxxing you to your boss, family, or competitors.
2. **Strategy Theft (The Whale Trap):** Professional traders are watched 24/7 by bots. When a "Whale" moves, bots front-run the order, moving the price against the trader. You pay more just because you are famous.

---

## 🟢 The Solution: PolyMask
PolyMask is a **context-aware Chrome Extension** that integrates directly with the standard Polymarket website to shield your identity and trades using hardware-grade privacy.

### 1. 👻 Ghost Fleets (Account Abstraction)
Instead of one "Whale Wallet" appearing on a leaderboard, PolyMask uses **Safe Smart Accounts** to fragment your position. A single $100k bet is automatically split across a "fleet" of 10-50 retail-sized accounts. To an observer, it looks like organic retail interest.

### 2. 🛡️ The Digital Vault (iExec TEE)
We utilize **Intel SGX Hardware Enclaves** via the iExec network to manage your keys. All trade intents are encrypted client-side. The TEE is the only entity that knows which "Ghost Wallets" belong to you—severing the link between your identity and the blockchain mempool.

### 3. 🧠 Context-Aware Execution
The extension automatically detects which Polymarket event you are browsing. With one click, it handles market resolution, key derivation, and fragmented execution in the TEE. ** Institutional size at a retail footprint.**

---

## 🛠️ Technical Stack
- **Frontend:** React + Vite + Tailwind CSS + Permissionless.js (AA).
- **Security:** iExec Data Protector SDK + Intel SGX (TEE).
- **Smart Accounts:** Safe v1.4.1 (Account Abstraction).
- **Infrastructure:** Node.js, ethers.js, Polymarket Gamma API.

---

## 💎 Business Value
- **For Everyday Users:** Financial Privacy. Bet on politics or culture without your history being doxxed.
- **For Professional Traders:** Alpha Protection. Hide your size and strategy to ensure the best possible execution price.
- **Seamless UX:** Turn it on like a VPN, browse Polymarket as usual, and click "Shielded Bet."

---

## 🏗️ Project Architecture
- **`/polymask-extension`**: Detects browser context and handles client-side encryption.
- **`/iexec-backend`**: The "Ghost Engine" running inside a TEE to derive keys and execute trades.
- **`/polymask-landing`**: Modern onboarding guide for the "VPN for your Wallet."

---

## 🏆 Hackathon Notes
PolyMask was built for the **Polymarket iExec Hackathon 2026**. It represents a world-class privacy solution by combining **Trusted Execution Environments** with **Multi-Account Abstraction**.
