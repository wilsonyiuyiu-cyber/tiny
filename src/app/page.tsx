'use client';

import Navbar from "@/components/Navbar";
import TokenPanel from "@/components/TokenPanel";
import TinyHuman from "@/components/TinyHuman";
import MemeGrid from "@/components/MemeGrid";
import TextTicker from "@/components/TextTicker";
import Features from "@/components/Features";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 selection:bg-yellow-200">
      <Navbar />

      {/* Hero Section Background */}
      <div className="absolute top-0 left-0 w-full h-[200vh] -z-10 overflow-hidden pointer-events-none">
        {/* Soft Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200/50 via-white to-slate-50"></div>
        
        {/* Animated Sun Glow */}
        <div className="absolute -top-20 -left-20 w-[800px] h-[800px] bg-yellow-200/15 rounded-full blur-[140px] animate-pulse"></div>
        
        {/* Floating Background Dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
            className="absolute w-4 h-4 bg-yellow-400 rounded-full blur-md"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 200}%`,
            }}
          />
        ))}

        {/* Distant Beach Line Decor */}
        <div className="absolute top-[800px] left-0 w-full h-px bg-slate-200/50"></div>
      </div>

      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 py-24 lg:py-40 gap-16 lg:gap-24 max-w-7xl mx-auto w-full relative z-10">
        {/* Left Side: Story & Mascot */}
        <div className="flex-1 flex flex-col items-center text-center lg:text-left lg:items-start max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-400 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-[0_8px_20px_-4px_rgba(234,179,8,0.5)]"
          >
            <Sparkles size={14} fill="currentColor" />
            Join the Tiny Movement
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-8xl md:text-[10rem] font-black text-slate-900 mb-10 leading-[0.8] tracking-tighter bubble-text italic"
          >
            STAY <br />
            <span className="text-yellow-400 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">TINY</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-slate-500 leading-relaxed mb-16 font-medium max-w-md"
          >
            We are glowing. We are tiny. <br />
            The cutest family on Solana is waiting for you. 
            Nurture your soul with the tiniest mascot.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a 
              href="https://pump.fun/coin/2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump" 
              target="_blank"
              className="px-14 py-7 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
            >
              Get $TINY
            </a>
            <a 
              href="https://t.me/tinymemesolana"
              target="_blank"
              className="px-14 py-7 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-slate-50 transition-all border-2 border-slate-100 active:scale-95"
            >
              Meme Wall
            </a>
          </motion.div>
        </div>

        {/* Center/Right Content Wrapper */}
        <div className="flex flex-col gap-16 lg:gap-24 items-center">
          {/* Mascot Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <TinyHuman />
          </motion.div>

          {/* Token Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full lg:max-w-sm"
          >
            <TokenPanel />
          </motion.div>
        </div>
      </main>

      {/* Moving Banner */}
      <TextTicker />

      {/* Features Section */}
      <Features />

      {/* Meme Grid Section */}
      <MemeGrid />

      <footer className="py-12 px-8 border-t border-slate-200/50 bg-white/30 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white bg-yellow-400 shadow-sm">
                <Image 
                  src="/memes/1.jpg" 
                  alt="Tiny Footer Logo" 
                  fill 
                  className="object-cover"
                />
              </div>
              <p className="text-slate-900 font-black tracking-tighter bubble-text italic">TINY HUMANS</p>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Built on Solana • Powered by OpenHuman
            </p>
          </div>
          
          <div className="flex gap-10">
            <a href="https://x.com/i/communities/1967670599784013865" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-black text-xs uppercase tracking-[0.2em]">X / Twitter</a>
            <a href="https://t.me/tinymemesolana" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-black text-xs uppercase tracking-[0.2em]">Meme Channel</a>
            <a href="https://github.com/tinyhumansai/OpenHuman" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-black text-xs uppercase tracking-[0.2em]">GitHub</a>
          </div>
          
          <p className="text-slate-300 text-[10px] font-bold">
            © 2026 TINY PROJECT LABS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
