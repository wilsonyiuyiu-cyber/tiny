'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

const MESSAGES = [
  "We are glowing together! ✨",
  "Stay tiny, friend! 🐥",
  "The future is yellow. 💛",
  "Moon? No, we're going to the sun! ☀️",
  "Tiny but mighty. 💪",
];

const MASCOT_IMAGES = Array.from({ length: 14 }, (_, i) => `/memes/${i + 1}.jpg`);

const TinyHuman: FC = () => {
  const [message, setMessage] = useState(MESSAGES[0]);
  const [clickCount, setClickCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClick = () => {
    const nextMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(nextMsg);
    setClickCount(prev => prev + 1);
    setImageIndex((prev) => (prev + 1) % MASCOT_IMAGES.length);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          className="relative bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl max-w-[280px] text-center z-20"
        >
          <p className="text-base font-bold tracking-tight">{message}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-slate-900 rotate-45"></div>
        </motion.div>
      </AnimatePresence>

      {/* Mascot Container */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative cursor-pointer group"
      >
        <div className="relative w-80 h-80 sm:w-[400px] sm:h-[400px] rounded-[5rem] overflow-hidden shadow-[0_48px_100px_-20px_rgba(234,179,8,0.3)] border-[16px] border-white bg-white tiny-glow transition-all duration-500">
          <div className="absolute inset-0 bg-yellow-400">
             <AnimatePresence mode="wait">
               <motion.div
                 key={imageIndex}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4, ease: "circOut" }}
                 className="relative w-full h-full"
               >
                 <Image 
                    src={MASCOT_IMAGES[imageIndex]} 
                    alt="Tiny Human Mascot" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                 />
               </motion.div>
             </AnimatePresence>
          </div>
          
          {/* Soft Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-white/10 pointer-events-none"></div>
        </div>

        {/* Floating Shadow */}
        <div className="mt-12 w-48 h-8 bg-yellow-400/10 rounded-[100%] blur-2xl mx-auto animate-pulse"></div>
        
        {/* Identity Tag */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-10 py-4 rounded-full text-sm font-black shadow-2xl tracking-[0.2em] uppercase border-4 border-white z-20">
          TINY #{((clickCount % 99) + 1).toString().padStart(3, '0')}
        </div>
      </motion.div>

      <button 
        onClick={handleClick}
        className="flex items-center gap-4 text-slate-400 hover:text-slate-900 transition-all font-black text-[11px] uppercase tracking-[0.4em] group mt-6"
      >
        <div className="w-12 h-12 rounded-[1.5rem] bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-white transition-all transform group-hover:rotate-12">
          <MessageSquare size={20} fill="currentColor" />
        </div>
        Interact with Tiny
      </button>
    </div>
  );
};

export default TinyHuman;
