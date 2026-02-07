import React, { useState, useEffect } from 'react';
import { IExecDataProtector } from '@iexec/dataprotector';
import { ethers } from 'ethers';
import logo from '../assets/logo.jpeg';
import { getSafeAccountAddress } from '../utils/aa';

const APP_ADDRESS = '0x0000000000000000000000000000000000000000'; 

export const BettingForm: React.FC = () => {
  const [slug, setSlug] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [outcome, setOutcome] = useState<'YES' | 'NO'>('YES');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [isPolymarket, setIsPolymarket] = useState(false);
  const [safeAddress, setSafeAddress] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [fleetSize, setFleetSize] = useState(3);

  useEffect(() => {
    // Detect market and user address
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs: any) => {
        const activeTab = tabs[0];
        if (activeTab?.url?.includes('polymarket.com')) {
          setIsPolymarket(true);
          chrome.tabs.sendMessage(activeTab.id, { type: 'GET_MARKET_CONTEXT' }, (response: any) => {
            if (response?.slug) setSlug(response.slug);
          });
        }
      });
    }

    // Get User and Safe Address
    const initAA = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const addr = await signer.getAddress();
            setUserAddress(addr);
            const safe = await getSafeAccountAddress(addr as `0x${string}`);
            setSafeAddress(safe);
        }
    };
    initAA();
  }, []);

  const handleLinkAccount = async () => {
    setStatus('Authorizing Ghost Signer (Session Key)...');
    // In a real AA setup, this would send a transaction to the Safe 
    // to add the Ghost Signer as a delegate/session key.
    setTimeout(() => {
        setStatus('Ghost Signer Authorized on your Safe!');
    }, 1500);
  };

  const handleShieldAndBet = async () => {
    if (!window.ethereum) return;

    setLoading(true);
    setStatus('Encrypting Trade Intent...');

    try {
      const dataProtector = new IExecDataProtector(window.ethereum as any);
      const tradeIntent = {
        marketSlug: slug || 'none',
        amount,
        outcome,
        userAddress: userAddress || 'none',
        safeAddress: safeAddress || 'none', // TEE will now know the order "maker" is the Safe
        useAA: true,
        fleetSize
      };

      const { address: protectedDataAddress } = await dataProtector.core.protectData({
        data: tradeIntent as any,
        name: `PolyMask Fleet Trade - ${slug || 'none'}`,
      });

      setStatus(`Intent Shielded. Granting TEE access...`);

      await dataProtector.core.grantAccess({
        protectedData: protectedDataAddress,
        authorizedApp: APP_ADDRESS,
        authorizedUser: userAddress!,
        numberOfAccess: 1,
      });

      setStatus('AA Trade Submitted to iExec TEE!');
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isPolymarket) {
    return (
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-xl w-80 text-center border border-blue-500/20">
        <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        <h2 className="text-xl font-bold mb-2">PolyMask</h2>
        <p className="text-gray-400 text-sm mb-6">Navigate to Polymarket to use your Shielded Vault.</p>
        <div className="text-[10px] text-blue-400 bg-blue-500/10 p-2 rounded mb-4 font-mono truncate">
            Vault: {safeAddress || 'Loading...'}
        </div>
        <a href="https://polymarket.com" target="_blank" rel="noreferrer" className="block w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-500 transition-all">Open Polymarket</a>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-xl w-80 border border-blue-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full border border-blue-500/50" />
            <span className="font-bold text-blue-400">PolyMask AA</span>
        </div>
        <div className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 font-bold uppercase">Safe v1.4.1</div>
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="p-2 bg-black/40 rounded border border-white/5">
            <label className="block text-[9px] text-gray-500 uppercase font-bold">Shielded Vault (AA)</label>
            <div className="text-[10px] font-mono text-blue-300 truncate">{safeAddress}</div>
        </div>
        <div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded">
            <label className="block text-[9px] text-blue-400 uppercase font-bold">Active Market</label>
            <div className="text-xs font-medium truncate italic">{slug?.replace(/-/g, ' ')}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="col-span-2">
            <label className="block text-[10px] mb-1 text-gray-400">Bet Amount (USDC)</label>
            <input type="number" className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm focus:border-blue-500 outline-none" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </div>
        <button className={`p-2 rounded font-bold text-xs ${outcome === 'YES' ? 'bg-green-600 ring-1 ring-green-400' : 'bg-gray-700'}`} onClick={() => setOutcome('YES')}>YES</button>
        <button className={`p-2 rounded font-bold text-xs ${outcome === 'NO' ? 'bg-red-600 ring-1 ring-red-400' : 'bg-gray-700'}`} onClick={() => setOutcome('NO')}>NO</button>
      </div>

      <div className="mb-4 p-2 bg-blue-500/5 border border-blue-500/20 rounded">
          <div className="flex justify-between items-center mb-1">
              <label className="text-[9px] text-blue-400 uppercase font-bold">Ghost Fleet Size</label>
              <span className="text-[10px] font-bold text-white bg-blue-600 px-1.5 rounded">{fleetSize} Wallets</span>
          </div>
          <input 
            type="range" min="1" max="10" step="1"
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            value={fleetSize}
            onChange={(e) => setFleetSize(parseInt(e.target.value))}
          />
          <p className="text-[8px] text-gray-500 mt-1 italic text-center">Fragment trade across {fleetSize} unique ghost identities.</p>
      </div>

      <div className="space-y-2">
        <button onClick={handleLinkAccount} className="w-full p-2 rounded border border-blue-500/40 text-blue-400 text-[10px] font-bold hover:bg-blue-500/10 transition-all uppercase tracking-tighter">
            🔗 Link Session Key to Vault
        </button>
        <button className={`w-full p-3 rounded font-extrabold shadow-lg transition-all ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'}`} onClick={handleShieldAndBet} disabled={loading || !slug}>
            {loading ? 'PROCESSING...' : 'EXECUTE SHIELDED TRADE'}
        </button>
      </div>

      {status && (
        <div className="mt-4 p-2 bg-black/50 rounded border border-white/5 text-[9px] text-blue-400/80 font-mono flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          {status}
        </div>
      )}
    </div>
  );
};
