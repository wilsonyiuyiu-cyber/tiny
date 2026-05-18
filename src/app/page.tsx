'use client';

import Navbar from "@/components/Navbar";
import TokenPanel from "@/components/TokenPanel";
import TinyHuman from "@/components/TinyHuman";
import MemeGrid from "@/components/MemeGrid";
import TextTicker from "@/components/TextTicker";
import Features from "@/components/Features";
import StarGrowthChart from "@/components/StarGrowthChart";
import Contributors from "@/components/Contributors";
import { Sparkles, Star, ChevronDown, Circle } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

const ROADMAP = [
  { date: "May 2026", title: "Project Inception", status: "Completed" },
  { date: "June 2026", title: "Community Expansion", status: "Ongoing" },
  { date: "Q3 2026", title: "Meme Portal Launch", status: "Planned" },
  { date: "Q4 2026", title: "Global Tiny Summit", status: "Planned" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-grow pt-32 lg:pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full border-x border-slate-100/50 -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="px-4 py-1.5 bg-slate-100 rounded-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles size={12} />
              Open Source Community
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-serif">Powered by OpenHuman</div>
          </motion.div>
          
          {/* Hero Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="mb-16"
          >
            <TinyHuman />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-[9.5rem] font-black text-slate-900 mb-12 leading-[0.8] tracking-[-0.05em] uppercase italic"
          >
            Stay <br />
            <span className="text-yellow-400">Tiny</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-16 max-w-xl font-medium"
          >
            We are glowing. We are tiny. <br />
            The most minimalist community on Solana.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-32"
          >
            <a 
              href="https://pump.fun/coin/2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump" 
              target="_blank"
              className="px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Get $TINY
            </a>
            <a 
              href="https://github.com/tinyhumansai/OpenHuman"
              target="_blank"
              className="px-10 py-5 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all border border-slate-100 shadow-sm active:scale-95 flex items-center gap-3"
            >
              <Star size={14} fill="currentColor" className="text-yellow-400" />
              GitHub
            </a>
          </motion.div>

          {/* Stats Grid */}
          <div className="w-full grid md:grid-cols-2 gap-8 mb-40">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TokenPanel />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StarGrowthChart />
            </motion.div>
          </div>

          <Contributors />
        </div>
      </main>

      {/* Roadmap Section */}
      <section className="py-40 bg-slate-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">Roadmap</h2>
            <p className="text-slate-400 font-medium">The path to a tinier future.</p>
          </div>
          
          <div className="space-y-12">
            {ROADMAP.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-8 group"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 ${item.status === 'Completed' ? 'bg-yellow-400 border-yellow-400' : 'border-slate-200'} z-10`}></div>
                  {i !== ROADMAP.length - 1 && <div className="w-px h-24 bg-slate-100"></div>}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.date}</span>
                  <h4 className="text-xl font-bold text-slate-900 italic tracking-tight">{item.title}</h4>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Completed' ? 'text-green-400' : 'text-slate-300'}`}>
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#FDFDFD] py-32">
        <div className="max-w-7xl mx-auto">
          <Features />
        </div>
      </div>

      <div className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic text-shadow-sm">Meme Wall</h2>
            <div className="w-12 h-1 bg-yellow-400 rounded-full"></div>
          </div>
          <MemeGrid />
        </div>
      </div>

      <TextTicker />

      <footer className="py-24 px-8 border-t border-slate-100 bg-white">
        <div className="flex flex-col items-center gap-12 max-w-7xl mx-auto text-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                <Image src="/memes/1.jpg" alt="Tiny Footer Logo" fill className="object-cover" />
              </div>
              <p className="text-slate-900 font-black tracking-tighter italic text-sm">TINY HUMANS</p>
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">
              Solana Ecosystem • 2026
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            <a href="https://x.com/i/communities/1967670599784013865" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest">X (Twitter)</a>
            <a href="https://t.me/tinymemesolana" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest">Telegram</a>
            <a href="https://github.com/tinyhumansai/OpenHuman" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest">GitHub</a>
          </div>
          
          <p className="text-slate-300 text-[9px] font-medium tracking-widest">
            © 2026 TINY PROJECT LABS
          </p>
        </div>
      </footer>
    </div>
  );
}
