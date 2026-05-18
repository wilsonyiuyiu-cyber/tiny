'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-6 pointer-events-none">
      <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] pointer-events-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm">
            <Image 
              src="/memes/1.jpg" 
              alt="Tiny Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="text-sm font-black text-slate-900 tracking-tighter italic">TINY</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <Link href="https://github.com/tinyhumansai/OpenHuman" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest">
            GitHub
          </Link>
          <Link href="https://t.me/TinyHumanAi" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest">
            Telegram
          </Link>
          <Link href="https://x.com/i/communities/1967670599784013865" target="_blank" className="text-slate-400 hover:text-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest">
            Community
          </Link>
        </div>

        <Link 
          href="https://pump.fun/coin/2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump"
          target="_blank"
          className="px-5 py-2 bg-slate-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
        >
          Buy
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
