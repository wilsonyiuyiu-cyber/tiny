'use client';

import { useStarGrowth } from '@/hooks/useStarGrowth';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';

export default function StarGrowthChart() {
  const { data, loading, error } = useStarGrowth();

  if (loading) return (
    <div className="p-10 text-center flex flex-col items-center justify-center gap-4 bg-white rounded-[2.5rem] border border-slate-100 min-h-[420px]">
      <div className="w-12 h-12 bg-slate-50 rounded-full animate-pulse"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-10 text-slate-400 text-center bg-white rounded-[2.5rem] border border-slate-100 min-h-[420px] flex items-center justify-center italic text-xs font-medium">
      Unable to sync growth data
    </div>
  );
  
  if (data.length === 0) return null;

  const chartData = data.filter(d => new Date(d.recorded_at) >= new Date('2026-05-13'));
  if (chartData.length === 0) return null;

  const latestEntry = chartData[chartData.length - 1];
  const todayGrowth = latestEntry.growth;

  const svgWidth = 400;
  const svgHeight = 180;
  const hPadding = 30;
  const vPadding = 40;  
  
  const minStars = Math.min(...chartData.map(d => d.star_count));
  const maxStars = Math.max(...chartData.map(d => d.star_count));
  const range = maxStars - minStars || 1;

  const points = chartData.map((d, i) => {
    const x = hPadding + (i / (chartData.length - 1)) * (svgWidth - hPadding * 2);
    const y = svgHeight - vPadding - ((d.star_count - minStars) / range) * (svgHeight - vPadding * 2);
    return { x, y, total: d.star_count, growth: d.growth, date: d.recorded_at };
  });

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  const formatValue = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] flex flex-col h-full relative overflow-hidden w-full box-border"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

      <div className="flex items-start justify-between mb-8 md:mb-10 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Momentum</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight italic uppercase leading-none">
            Star History
          </h3>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em] mb-1">Live Growth</span>
          <div className="flex items-center gap-2">
             <span className="text-xs md:text-sm font-black text-slate-900 italic font-mono">
               +{todayGrowth.toLocaleString()}
             </span>
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="w-full aspect-[2/1] min-h-[220px]">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D1D1F" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#1D1D1F" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid */}
            {[0.2, 0.5, 0.8].map((p) => (
              <line key={p} x1={hPadding} y1={svgHeight * p} x2={svgWidth - hPadding} y2={svgHeight * p} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            <motion.path
              d={`${pathData} L ${svgWidth - hPadding},${svgHeight - vPadding} L ${hPadding},${svgHeight - vPadding} Z`}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            <motion.path
              d={pathData}
              fill="none"
              stroke="#1D1D1F" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            />
            
            {points.map((p, i) => (
              <g key={i}>
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="3"
                  fill="white"
                  stroke="#1D1D1F"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                />

                {/* Date Label */}
                <text
                  x={p.x}
                  y={svgHeight - 5}
                  textAnchor="middle"
                  className="fill-slate-300 text-[8px] font-bold uppercase tracking-tight"
                >
                  {new Date(p.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                </text>

                {/* Star Count Below Date - 完美的垂直對齊 */}
                <motion.text
                  x={p.x}
                  y={svgHeight + 10}
                  textAnchor="middle"
                  className="fill-slate-900 text-[9px] font-black italic font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  {formatValue(p.total)}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-50 flex items-end justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.4em]">Live Momentum</p>
          <div className="flex items-center gap-2">
             <p className="text-xl font-black text-slate-900 italic tracking-tight">{latestEntry.star_count.toLocaleString()}</p>
             <div className="px-2 py-0.5 bg-yellow-400 rounded text-[7px] font-black text-white uppercase italic">Active</div>
          </div>
        </div>
        <a 
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO || 'tinyhumansai/OpenHuman'}`}
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
        >
          Repo <ArrowUpRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}
