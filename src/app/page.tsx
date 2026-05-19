'use client';

import Navbar from "@/components/Navbar";
import TokenPanel from "@/components/TokenPanel";
import TinyHuman from "@/components/TinyHuman";
import MemeGrid from "@/components/MemeGrid";
import TextTicker from "@/components/TextTicker";
import Features from "@/components/Features";
import StarGrowthChart from "@/components/StarGrowthChart";
import Contributors from "@/components/Contributors";
import ChatPanel from "@/components/ChatPanel";
import OpenHumanApp from "@/components/OpenHumanApp";
import { Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto w-full box-border">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-12 items-start">
          
          {/* Left Column: Market & Community (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 lg:sticky lg:top-24 w-full max-w-full overflow-hidden">
            <div className="bg-white p-5 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative overflow-hidden w-full box-border">
               <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
               
               <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl font-black text-slate-900 mt-4 md:mt-8 mb-3 md:mb-4 tracking-tighter uppercase italic"
                >
                  Stay <span className="text-yellow-400">Tiny</span>
                </motion.h1>
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Solana Community</p>
                
                <div className="mt-8 flex flex-col gap-3 w-full">
                   <a href="https://pump.fun/coin/2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump" target="_blank" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm active:scale-95">Get $TINY</a>
                   <Contributors />
                </div>
            </div>
            
            <div className="w-full max-w-full overflow-hidden">
              <TokenPanel />
            </div>
          </div>

          {/* Right Column: OpenHuman App & Stats (8/12) */}
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 w-full max-w-full overflow-hidden">
            <OpenHumanApp />
            <StarGrowthChart />
            
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden w-full">
               <div className="p-6 md:p-10 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">The Archive</span>
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight italic uppercase leading-none">Meme Wall</h3>
                  </div>
                  <a href="https://t.me/TinyHumanAi" target="_blank" className="p-2 md:p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm group">
                    <Star size={14} className="md:w-4 md:h-4 group-hover:rotate-12 transition-transform" />
                  </a>
               </div>
               <div className="p-2 md:p-6 w-full overflow-hidden">
                 <MemeGrid />
               </div>
            </div>
          </div>

        </div>
      </main>

      <div className="py-24 border-t border-slate-50">
        <Features />
      </div>

      <TextTicker />

      <footer className="py-20 md:py-24 px-8 border-t border-slate-100 bg-white">
        <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-100 shadow-sm">
              <Image src="/memes/1.jpg" alt="Tiny Footer Logo" fill className="object-cover" />
            </div>
            <p className="text-slate-900 font-black tracking-tighter italic text-xs uppercase leading-none">TINY HUMANS</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
            <a href="https://x.com/i/communities/1967670599784013865" target="_blank" className="hover:text-slate-900 transition-colors">X (Twitter)</a>
            <a href="https://t.me/TinyHumanAi" target="_blank" className="hover:text-slate-900 transition-colors">Telegram</a>
            <a href="https://github.com/tinyhumansai/OpenHuman" target="_blank" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
          <p className="text-slate-200 text-[8px] font-medium tracking-[0.4em]">© 2026 TINY PROJECT LABS</p>
        </div>
      </footer>
    </div>
  );
}
