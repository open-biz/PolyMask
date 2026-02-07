# 🛡️ PolyMask Extension

The Context-Aware privacy shield for Polymarket.

## 🚀 Development Installation (Beta)

Since PolyMask is currently in **Developer Beta**, you need to install it as an unpacked extension in Chrome:

### 1. Build the Extension
Ensure you have [Bun](https://bun.sh) installed, then run:
```bash
bun install
bun run build
```
This will create a `dist` folder.

### 2. Load into Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. In the top right corner, enable **Developer mode**.
3. Click the **Load unpacked** button in the top left.
4. Select the `polymask-extension/dist` folder from this repository.

### 3. Verify
- Navigate to [Polymarket.com](https://polymarket.com).
- Click the PolyMask (Wolf) icon in your toolbar.
- The extension should automatically detect the market you are browsing!

## 🛠️ Tech Stack
- **React + Vite**
- **Tailwind CSS**
- **@iexec/dataprotector** (iExec TEE Encryption)
- **permissionless.js** (Account Abstraction / Safe v1.4.1)
- **viem/ethers** (Blockchain interaction)

## 📁 Structure
- `src/content.ts`: The context detector running on Polymarket.
- `src/components/BettingForm.tsx`: The main UI and encryption logic.
- `src/utils/aa.ts`: Safe Smart Account address calculation.
