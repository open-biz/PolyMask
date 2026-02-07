# 🛡️ PolyMask (GhostMarket)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Next.js](https://img.shields.io/badge/Frontend-Next.js-black)](https://nextjs.org/)
[![TEE: iExec](https://img.shields.io/badge/Hardware-Intel_SGX-blue)](https://iex.ec/)
[![Network: Polygon](https://img.shields.io/badge/Network-Polygon-purple)](https://polygon.technology/)
[![Built for: Polymarket](https://img.shields.io/badge/Built_for-Polymarket-blue)](https://polymarket.com/)

**PolyMask is a context-aware privacy shield that fragments your trades across a "Ghost Fleet" of unique Account Abstraction wallets, powered by iExec TEE hardware.**

---

## 🏗️ Project Architecture

PolyMask is divided into three core components:

### 1. [Extension](./polymask-extension) (`/polymask-extension`)
A Context-Aware Chrome Extension built with **React + Vite + Tailwind + Permissionless.js**.
- **Context Detection:** Monitors Polymarket URLs to automatically resolve market slugs.
- **Shielded Vaults:** Automatically calculates a user-specific **Safe v1.4.1** Smart Account (AA).
- **Fleet Control:** Allows users to choose a "Fleet Size" (1-10) to fragment their trades.

### 2. [TEE Worker](./iexec-backend) (`/iexec-backend`)
A Node.js backend designed to run inside an **Intel SGX Enclave**.
- **Ghost Fleet Derivation:** Deterministically derives multiple sub-keys from a master seed using BIP-32 logic.
- **Fragmentation Logic:** Splits a single trade intent into multiple smaller trades, executing them via unique identities.
- **Privacy Ledger:** The TEE acts as the only entity that knows which Ghost wallets belong to which user.

### 3. [Landing Page](./polymask-landing) (`/polymask-landing`)
A high-conversion landing page built with **Next.js 15 (App Router)**.

---

## 🚀 The Ghost Fleet Flow

1.  **Detection:** Navigate to any Polymarket event. PolyMask identifies the market and calculates your Shielded Vault address.
2.  **Fragmentation:** Choose your fleet size. A larger fleet provides higher privacy by mimicking retail behavior.
3.  **Shielded Intent:** Enter your amount. PolyMask encrypts your intent using the iExec Data Protector SDK.
4.  **Ghost Execution:** The iExec TEE worker pulls the intent, derives your unique "Ghost Fleet," and splits your total bet across multiple smart accounts.
5.  **Stealth Result:** On-chain observers see multiple small trades from different people. Your alpha is protected.

---

## 🛠️ Development Setup

### Installation
```bash
# Install dependencies for all projects
cd polymask-extension && bun install
cd ../iexec-backend && bun install
cd ../polymask-landing && bun install
```

### Building the Extension
```bash
cd polymask-extension
bun run build
# Load the 'dist' folder into Chrome
```

---

## 🏆 Hackathon Strategy
PolyMask combines **Privacy (TEE)**, **Account Abstraction (Safe/Session Keys)**, and **Context-Awareness** to create a "magical" one-click experience for private alpha protection.

---

## 📄 License
MIT
