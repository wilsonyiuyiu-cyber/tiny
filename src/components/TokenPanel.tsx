'use client';

import { FC } from 'react';
import { ExternalLink, TrendingUp, BarChart3, Loader2, ArrowUpRight } from 'lucide-react';
import { useTokenData } from '@/hooks/useTokenData';
import { motion } from 'framer-motion';

const TOKEN_ADDRESS = '2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump';

const TokenPanel: FC = () => {
  const { priceUsd, fdv, volume24h, priceChange24h, symbol, loading } = useTokenData();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Live Market</span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight italic">
            $TINY {symbol && `/ ${symbol}`}
          </h3>
        </div>
        <a 
          href={`https://pump.fun/coin/${TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm group"
        >
          <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
        </a>
      </div>

      <div className="flex-grow flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Price USD</p>
          <div className="flex items-baseline gap-4">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-slate-200" />
            ) : (
              <p className="text-5xl font-black text-slate-900 tracking-tighter">
                ${parseFloat(priceUsd).toFixed(6)}
              </p>
            )}
            {!loading && (
              <span className={`text-sm font-bold ${priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange24h >= 0 ? '+' : ''}{priceChange24h}%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 size={12} /> MCAP
            </p>
            {loading ? (
              <div className="h-6 w-20 bg-slate-50 animate-pulse rounded" />
            ) : (
              <p className="text-xl font-black text-slate-900 italic tracking-tight">{formatNumber(fdv)}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp size={12} /> Volume
            </p>
            {loading ? (
              <div className="h-6 w-20 bg-slate-50 animate-pulse rounded" />
            ) : (
              <p className="text-xl font-black text-slate-900 italic tracking-tight">{formatNumber(volume24h)}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-50">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">Contract Address</p>
          <p className="text-[10px] text-slate-400 font-mono bg-slate-50 px-4 py-2 rounded-xl break-all w-full select-all">
            {TOKEN_ADDRESS}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenPanel;
