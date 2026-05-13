'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: FC = () => {
  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-6 bg-white/40 backdrop-blur-2xl sticky top-0 z-50 border-b-2 border-white">
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-[0_8px_16px_-4px_rgba(234,179,8,0.4)] transform group-hover:rotate-12 transition-transform border-2 border-white bg-yellow-400">
          <Image 
            src="/memes/1.jpg" 
            alt="Tiny Logo" 
            fill 
            className="object-cover"
          />
        </div>
        <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter bubble-text italic">
          TINY HUMANS
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-12">
        <Link href="https://github.com/tinyhumansai/OpenHuman" target="_blank" className="text-slate-500 hover:text-yellow-500 transition-all font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2">
          GitHub
        </Link>
        <Link href="https://x.com/i/communities/1967670599784013865" target="_blank" className="text-slate-500 hover:text-yellow-500 transition-all font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2">
          Community
        </Link>
        <Link href="https://t.me/tinymemesolana" target="_blank" className="text-slate-500 hover:text-yellow-500 transition-all font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2">
          Memes
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="https://pump.fun/coin/2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump"
          target="_blank"
          className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.15em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
        >
          Buy $TINY
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
