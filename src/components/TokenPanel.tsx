'use client';

import { FC } from 'react';
import { ExternalLink, TrendingUp, DollarSign, BarChart3, Loader2 } from 'lucide-react';
import { useTokenData } from '@/hooks/useTokenData';

const TOKEN_ADDRESS = '2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump';

const TokenPanel: FC = () => {
  const { priceUsd, fdv, volume24h, priceChange24h, symbol, loading } = useTokenData();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 max-w-md w-full relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl group-hover:bg-yellow-300/30 transition-colors duration-700"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase">
          Market Stats {symbol && `• $${symbol}`}
        </h3>
        <a 
          href={`https://pump.fun/coin/${TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold bg-slate-900 text-white px-4 py-1.5 rounded-full hover:bg-slate-700 transition-all flex items-center gap-1.5 uppercase tracking-wider"
        >
          Trade <ExternalLink size={10} />
        </a>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Current Price</p>
          <div className="flex items-end justify-between">
            {loading ? (
              <Loader2 size={24} className="animate-spin text-slate-300" />
            ) : (
              <p className="text-4xl font-black text-slate-900 tracking-tight">
                ${parseFloat(priceUsd).toFixed(6)}
              </p>
            )}
            {!loading && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-black ${priceChange24h >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                <TrendingUp size={14} className={priceChange24h < 0 ? 'rotate-180' : ''} />
                {priceChange24h >= 0 ? '+' : ''}{priceChange24h}%
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 size={10} /> Market Cap
            </p>
            {loading ? (
              <Loader2 size={16} className="animate-spin text-slate-200" />
            ) : (
              <p className="text-xl font-bold text-slate-800">{formatNumber(fdv)}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp size={10} /> 24h Volume
            </p>
            {loading ? (
              <Loader2 size={16} className="animate-spin text-slate-200" />
            ) : (
              <p className="text-xl font-bold text-slate-800">{formatNumber(volume24h)}</p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/50">
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black py-4 rounded-2xl transition-all shadow-[0_12px_24px_-8px_rgba(234,179,8,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(234,179,8,0.5)] active:scale-[0.98] uppercase tracking-widest text-sm">
            Buy $TINY Now
          </button>
          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Contract Address</p>
            <p className="text-[10px] text-slate-600 font-mono bg-slate-100 px-3 py-1 rounded-md break-all">
              {TOKEN_ADDRESS}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPanel;
