'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MESSAGES = [
  "Stay tiny, friend. 🐥",
  "Minimalism is key. ✨",
  "The future is simple. 💛",
  "Built with love. ☀️",
  "Tiny but mighty. 💪",
];

const TinyHuman: FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const nextMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(nextMsg);
    // 3秒後自動消失
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="flex flex-col items-center relative group">
      {/* Elegant Speech Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-16 bg-white border border-slate-100 px-6 py-2 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] z-30 whitespace-nowrap"
          >
            <p className="text-xs font-bold text-slate-600 tracking-tight">{message}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Card */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] bg-white cursor-pointer active:shadow-inner transition-all duration-500"
      >
        <Image 
          src="/memes/photo_2026-05-16_08-05-35.jpg" 
          alt="Tiny Mascot" 
          fill 
          className={`object-cover transition-all duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
          priority
        />
        
        {/* Subtle Identity Tag */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest text-slate-400 uppercase transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          Click to talk
        </div>
      </motion.div>
    </div>
  );
};

export default TinyHuman;
