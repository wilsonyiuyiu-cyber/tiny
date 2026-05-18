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
    <section className="w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">The Archive</span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic">Meme Wall</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEMES.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-50 group cursor-pointer border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]"
            >
              <Image
                src={meme.src}
                alt={meme.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <a 
            href="https://t.me/TinyHumanAi" 
            target="_blank"
            className="px-10 py-4 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
          >
            View Archive
          </a>
        </div>
      </div>
    </section>
  );
};

export default MemeGrid;
