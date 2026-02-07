import Image from "next/image";
import { Shield, Zap, Lock, EyeOff, Cpu, Globe, ArrowRight, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
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
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2">
            <Download size={16} />
            Install Extension
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest">
            <Zap size={12} />
            Polymarket Hackathon 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Shield Your Bets. <br />Hide Your Alpha.
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            The first "Ghost Market" interface for Polymarket. 
            Leveraging iExec TEE technology to decouple your identity from your trading strategy.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
              Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full md:w-auto bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              View on GitHub
            </button>
          </div>
        </section>

        {/* Bento Box Features */}
        <section id="features" className="max-w-7xl mx-auto px-6 mb-32">
          <h2 className="text-3xl font-bold mb-12">Engineered for Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
            {/* Box 1: Large Feature */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-8 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield size={240} />
              </div>
              <Shield className="text-blue-500 mb-4" size={40} />
              <h3 className="text-3xl font-bold mb-2">iExec TEE Integration</h3>
              <p className="text-gray-400 max-w-md">
                Your trade intents are encrypted locally and only decrypted inside an Intel SGX hardware enclave. Not even the worker node can see your bet.
              </p>
            </div>

            {/* Box 2: Alpha Protection */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all">
              <EyeOff className="text-purple-500" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Context Aware</h3>
                <p className="text-gray-400 text-sm">Automatically detects the market you are browsing on Polymarket for a zero-friction experience.</p>
              </div>
            </div>

            {/* Box 3: Deterministic Keys */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all">
              <Lock className="text-green-500" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Ghost Wallets</h3>
                <p className="text-gray-400 text-sm">Automated 1-to-1 wallet derivation ensures your main address never touches the exchange.</p>
              </div>
            </div>

            {/* Box 4: Global Proxy */}
            <div className="md:col-span-1 rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all">
              <Globe className="text-orange-500" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-1">Regional Bypassing</h3>
                <p className="text-gray-400 text-sm">Built-in HTTPS proxy support within the TEE for global access.</p>
              </div>
            </div>

            {/* Box 5: Hardware Security */}
            <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/10 p-8 flex items-center gap-8">
              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <Cpu size={48} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Military Grade Infrastructure</h3>
                <p className="text-gray-400">PolyMask runs on the decentralized iExec worker network, ensuring 99.9% uptime and unhackable hardware enclaves.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">The PolyMask Flow</h2>
          <div className="space-y-12 text-left">
            {[
              { step: "01", title: "Connect & Encrypt", desc: "Select your market in the extension. Your browser encrypts the intent using the iExec Data Protector SDK." },
              { step: "02", title: "Grant TEE Access", desc: "You sign a message granting one-time access to your encrypted intent specifically for our TEE worker." },
              { step: "03", title: "Ghost Execution", desc: "The worker pulls the intent into a hardware enclave, derives your ghost wallet, and places the bet via a proxy." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <span className="text-blue-500 font-mono font-bold text-xl">{item.step}</span>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2 text-white font-bold">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-blue-500/50">
              <Image src="/logo.jpeg" alt="PolyMask Logo" fill className="object-cover" />
            </div>
            PolyMask
          </div>
          <p>© 2026 PolyMask. Built for the Polymarket iExec Hackathon.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Discord</a>
            <a href="#" className="hover:text-white">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
