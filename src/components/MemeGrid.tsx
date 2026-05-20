'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TELEGRAM_URL } from '@/constants';

const MEMES = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `/memes/${[1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14][i] || (i + 1)}.jpg`,
  alt: `Tiny Meme ${i + 1}`,
}));

const MemeGrid: FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {MEMES.filter(m => m.src.indexOf('undefined') === -1).map((meme, index) => (
        <motion.div
          key={meme.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.4, 
            delay: (index % 4) * 0.1 
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-slate-50 group cursor-pointer border border-slate-100 shadow-sm"
        >
          <Image
            src={meme.src}
            alt={meme.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MemeGrid;
