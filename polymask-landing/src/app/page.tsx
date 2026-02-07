'use client';

import Image from "next/image";
import { Shield, Zap, Lock, EyeOff, Cpu, Globe, ArrowRight, Download, Eye, TrendingUp, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/50">
              <Image src="/logo.jpeg" alt="PolyMask Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight">PolyMask</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Solution</a>
            <a href="#value" className="hover:text-white transition-colors">Value</a>
          </div>
          <div className="flex items-center gap-4">
             <a 
               href="https://github.com/open-biz/PolyMask/tree/main/polymask-extension" 
               target="_blank" 
               className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
             >
                <Download size={16} />
                Install Dev Beta
             </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest">
            🛡️ Polymarket Alpha Protection
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
            Place private, untraceable <br />bets on Polymarket.
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12 italic">
            "PolyMask is like a VPN for your wallet, allowing you to bet on Polymarket without the world knowing."
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="https://github.com/open-biz/PolyMask/tree/main/polymask-extension"
              target="_blank"
              className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
            >
              Get Extension Beta <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="px-6 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono">
              Status: Developer Preview (v1.0.0-beta)
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section id="problem" className="max-w-7xl mx-auto px-6 mb-32">
            <h2 className="text-3xl font-bold mb-12 text-red-500 flex items-center gap-2">
                <Eye size={32} /> The Problem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
                {/* Large Box: Identity Exposure */}
                <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-red-500/5 border border-red-500/10 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-3 text-red-400">Identity Exposure</h3>
                    <p className="text-gray-400">
                        Polymarket bets are permanently linked to your wallet. ENS names and Twitter profiles make your private opinions public data, doxxing you to your boss, family, and the world.
                    </p>
                </div>

                {/* Small Box: Strategy Theft */}
                <div className="rounded-3xl bg-red-500/5 border border-red-500/10 p-8 flex flex-col justify-between">
                    <TrendingUp className="text-red-500" size={32} />
                    <div>
                        <h3 className="text-xl font-bold mb-1 text-red-400">Strategy Theft</h3>
                        <p className="text-gray-400 text-sm">Bots watch whale wallets 24/7 to copy trades instantly.</p>
                    </div>
                </div>

                {/* Quote Box */}
                <div className="md:col-span-3 rounded-3xl bg-gradient-to-r from-red-950/20 to-black border border-red-500/10 p-8 flex items-center justify-center italic text-red-400/80 text-xl text-center">
                    "In traditional finance, hedge funds guard their trades with extreme secrecy. <br className="hidden md:block" /> On Polymarket, traders are forced to live on the leaderboard."
                </div>
            </div>
        </section>

        {/* Bento Box Solution */}
        <section id="features" className="max-w-7xl mx-auto px-6 mb-32">
          <h2 className="text-3xl font-bold mb-12 text-blue-500">The PolyMask Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
            <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-8 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Image src="/logo.jpeg" alt="Wolf" width={400} height={400} />
              </div>
              <Shield className="text-blue-500 mb-4" size={40} />
              <h3 className="text-3xl font-bold mb-2">Ghost Wallets (AA)</h3>
              <p className="text-gray-400 max-w-md">
                Fragments your "Whale" position into a fleet of retail-sized smart accounts. To the leaderboard, you look like 100 random people.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all">
              <Cpu className="text-blue-400" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Digital Vault</h3>
                <p className="text-gray-400 text-sm">Managed by Intel SGX hardware. Even we can't see which Ghost Wallet belongs to you.</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all">
              <EyeOff className="text-purple-500" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Context-Aware</h3>
                <p className="text-gray-400 text-sm">Chrome Extension reacts to your browsing. One click to shield any market intent.</p>
              </div>
            </div>

            <div className="md:col-span-1 rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all">
              <Globe className="text-orange-500" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Stealth Execution</h3>
                <p className="text-gray-400 text-sm">Move millions without ever triggering a Whale Watch alert.</p>
              </div>
            </div>

            <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/10 p-8 flex items-center gap-8">
              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <TrendingUp size={48} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Alpha Protection</h3>
                <p className="text-gray-400">Prevent copy-trading bots from eating your margin. Get the retail price for institutional-grade bets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Value */}
        <section id="value" className="max-w-7xl mx-auto px-6 mb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                    <UserCheck className="text-blue-400 mb-4" />
                    <h4 className="font-bold mb-2">For Everyday Users</h4>
                    <p className="text-sm text-gray-400">Total Financial Privacy. Bet on anything without your history being doxxed.</p>
                </div>
                <div className="p-8 rounded-3xl bg-purple-500/5 border border-purple-500/10">
                    <TrendingUp className="text-purple-400 mb-4" />
                    <h4 className="font-bold mb-2">For Professionals</h4>
                    <p className="text-sm text-gray-400">Hide strategy and size. fragmented bets ensure the best possible execution price.</p>
                </div>
                <div className="p-8 rounded-3xl bg-orange-500/5 border border-orange-500/10">
                    <Zap className="text-orange-400 mb-4" />
                    <h4 className="font-bold mb-2">VPN Experience</h4>
                    <p className="text-sm text-gray-400">Turn it on, browse, and shield. No complex steps or new platforms to learn.</p>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/50">
              <Image src="/logo.jpeg" alt="PolyMask Logo" fill className="object-cover" />
            </div>
            PolyMask
          </div>
          <p>© 2026 PolyMask. Bringing Wall Street privacy to Polymarket.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">iExec Hub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
