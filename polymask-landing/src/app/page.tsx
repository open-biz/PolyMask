'use client';

import Image from "next/image";
import { 
  Shield, 
  Zap, 
  Lock, 
  EyeOff, 
  Cpu, 
  Globe, 
  ArrowRight, 
  Download, 
  Eye, 
  TrendingUp, 
  UserCheck 
} from "lucide-react";
import { 
  GlobeIcon, 
  LockClosedIcon, 
  EyeNoneIcon, 
  RocketIcon,
  Cross1Icon
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { ClientTweetCard } from "@/components/magicui/tweet-card";
import Marquee from "@/components/magicui/marquee";

const problemFeatures = [
  {
    Icon: EyeNoneIcon,
    name: "Identity Exposure",
    description: "Your political and social views are public data, doxxed to your boss, family, and the world.",
    href: "#",
    cta: "Learn more",
    background: <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />,
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Cross1Icon,
    name: "Strategy Theft",
    description: "Bots watch whale wallets 24/7 to copy trades instantly.",
    href: "#",
    cta: "Learn more",
    background: <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
];

const solutionFeatures = [
  {
    Icon: Shield,
    name: "Ghost Wallets (AA)",
    description: "Fragments your position into retail-sized smart accounts. You look like 100 random people.",
    href: "https://github.com/open-biz/PolyMask/tree/main/polymask-extension",
    cta: "Install Beta",
    background: <Image src="/logo.jpeg" alt="Wolf" fill className="absolute inset-0 object-cover opacity-10 grayscale" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Cpu,
    name: "Digital Vault",
    description: "Managed by Intel SGX hardware. Even we can't see your trades.",
    href: "#",
    cta: "Security Docs",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Stealth Execution",
    description: "Move millions without ever triggering a Whale Watch alert.",
    href: "#",
    cta: "How it works",
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: LockClosedIcon,
    name: "Context-Aware",
    description: "Extension reacts to your browsing. One click to shield intent.",
    href: "#",
    cta: "View Demo",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: RocketIcon,
    name: "Alpha Protection",
    description: "Prevent copy-trading bots from eating your margin.",
    href: "#",
    cta: "Pro Features",
    background: <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const tweetIds = [
    "2019711375694500256", 
    "2018267215817052217", 
    "2019821507774382571", 
    "1995139510607434234", 
    "2020197578134942153"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/50">
              <Image src="/logo.jpeg" alt="PolyMask Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">PolyMask</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Solution</a>
            <a href="#users" className="hover:text-white transition-colors">Our Users</a>
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

      <main className="pt-32 pb-20 relative">
        {/* Subtle Background Logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] subtle-bg-logo select-none">
          <Image src="/logo.jpeg" alt="" fill className="object-contain" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black" />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 text-center relative z-10">
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
        <section id="problem" className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
            <h2 className="text-3xl font-bold mb-12 text-red-500 flex items-center gap-2">
                <Eye size={32} /> The Problem
            </h2>
            <BentoGrid className="lg:grid-rows-1">
              {problemFeatures.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
            <div className="mt-4 rounded-xl bg-gradient-to-r from-red-950/20 to-black border border-red-500/10 p-8 flex items-center justify-center italic text-red-400/80 text-lg text-center font-medium">
                "In traditional finance, hedge funds guard their trades with extreme secrecy. <br className="hidden md:block" /> On Polymarket, traders are forced to live on the leaderboard."
            </div>
        </section>

        {/* The Solution Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-blue-500 flex items-center gap-2">
            <Shield size={32} /> The Solution
          </h2>
          <BentoGrid className="lg:grid-rows-3">
            {solutionFeatures.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </section>

        {/* Our Users Section */}
        <section id="users" className="max-w-full px-6 mb-32 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-purple-500 flex items-center gap-2">
                    <UserCheck size={32} /> Our Users
                </h2>
                <p className="text-gray-400 mt-2">See why top traders and privacy advocates are joining the Ghost Fleet.</p>
            </div>
            
            <div className="relative flex flex-col items-center justify-center overflow-hidden py-10">
                <Marquee pauseOnHover className="[--duration:30s]">
                    {tweetIds.map((id) => (
                        <div key={id} className="w-[350px]">
                            <ClientTweetCard id={id} className="border border-white/10 shadow-2xl" />
                        </div>
                    ))}
                </Marquee>
                {/* Gradient Overlays */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
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
          <div className="flex gap-8 font-medium">
            <a href="https://github.com/open-biz/polymask" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://iex.ec" className="hover:text-white transition-colors">iExec Hub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
