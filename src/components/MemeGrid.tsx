'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MEMES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/memes/${i + 1}.jpg`,
  alt: `Tiny Meme ${i + 1}`,
}));

const MemeGrid: FC = () => {
  return (
    <section className="w-full bg-white/40 backdrop-blur-xl py-32 px-6 md:px-20 border-t-2 border-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-[12px] font-black text-yellow-500 uppercase tracking-[0.5em] mb-6">The Vault</h2>
          <h3 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter bubble-text italic">
            TINY MEME ARCHIVE
          </h3>
          <div className="mt-8 w-24 h-2 bg-yellow-400 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {MEMES.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? 2 : -2,
                zIndex: 20
              }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white bg-slate-50 group cursor-pointer tiny-glow"
            >
              <Image
                src={meme.src}
                alt={meme.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <a 
            href="https://t.me/tinymemesolana" 
            target="_blank"
            className="px-12 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            View More on Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default MemeGrid;
