'use client';

import { useStarGrowth } from '@/hooks/useStarGrowth';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

export default function StarGrowthChart() {
  const { data, loading, error } = useStarGrowth();

  if (loading) return (
    <div className="p-10 text-center animate-pulse flex flex-col items-center justify-center gap-4 bg-white rounded-[2.5rem] border border-slate-100 min-h-[400px]">
      <div className="w-12 h-12 bg-slate-50 rounded-full"></div>
      <div className="h-3 w-24 bg-slate-50 rounded"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-10 text-slate-400 text-center bg-white rounded-[2.5rem] border border-slate-100 min-h-[400px] flex items-center justify-center italic text-xs">
      Stats momentarily unavailable
    </div>
  );
  
  if (data.length === 0) return null;

  const recentData = data.slice(-7);
  const currentTotal = data[data.length - 1].star_count;
  const todayGrowth = data[data.length - 1].growth;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Growth Tracking</span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight italic">
            GitHub Stars
          </h3>
        </div>
        <a 
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO || 'tinyhumansai/OpenHuman'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm group"
        >
          <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
        </a>
      </div>

      <div className="flex-grow flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Daily Increase</p>
          <div className="flex items-baseline gap-4">
            <p className="text-5xl font-black text-slate-900 tracking-tighter italic">
              +{todayGrowth}
            </p>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Today</span>
          </div>
        </div>
        
        {/* Minimal Bar Chart */}
        <div className="flex items-end justify-between h-24 gap-3">
          {recentData.map((day, i) => {
            const maxGrowth = Math.max(...recentData.map(d => d.growth), 1);
            const height = Math.max((day.growth / maxGrowth) * 100, 4);
            
            return (
              <div key={day.recorded_at} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`w-full rounded-full ${
                    i === recentData.length - 1 ? 'bg-yellow-400' : 'bg-slate-50'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">Total Momentum</p>
            <p className="text-xl font-black text-slate-900 italic tracking-tight">{currentTotal.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <Star size={16} fill="currentColor" className="text-yellow-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
