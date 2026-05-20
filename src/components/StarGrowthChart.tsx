'use client';

import { useStarGrowth } from '@/hooks/useStarGrowth';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function StarGrowthChart() {
  const { data: groupedData, loading, error } = useStarGrowth();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 自動捲動到最右側 (顯示最新日期)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [groupedData]);

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
  
  const tinyData = groupedData["tinyhumansai/OpenHuman"] || [];
  
  if (tinyData.length === 0) return null;

  const lastTinyPoint = tinyData[tinyData.length - 1];
  const chartDates = tinyData.map(d => d.recorded_at);

  const projects = [
    { name: 'TINY (OPENHUMAN)', color: '#1D1D1F', data: tinyData },
  ];

  // 每一個點佔據 140px 寬度，填滿最近 7 天的顯示空間
  const pointWidth = 140;
  const hPadding = 40;
  const svgWidth = Math.max(900, (chartDates.length - 1) * pointWidth + hPadding * 2);
  const svgHeight = 280;
  const vPadding = 60;  
  
  const allCounts = projects.flatMap(p => p.data.map(d => d.star_count));
  const minStars = Math.min(...allCounts);
  const maxStars = Math.max(...allCounts);
  const range = maxStars - minStars || 1;

  const getPoints = (repoData: any[]) => {
    return repoData.map((d) => {
      const dateIndex = chartDates.indexOf(d.recorded_at);
      const x = hPadding + dateIndex * pointWidth;
      const displayStars = d.star_count;
      // 如果 range 為 0，則所有 y 都在中間
      const y = range === 0 
        ? svgHeight / 2 
        : svgHeight - vPadding - ((displayStars - minStars) / range) * (svgHeight - vPadding * 2);
      return { x, y, total: d.star_count, growth: d.growth, date: d.recorded_at };
    });
  };

  const formatValue = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const totalStarCount = lastTinyPoint.star_count;
  const totalGrowthToday = lastTinyPoint.growth;

  const formatGrowth = (num: number) => {
    return `+${num.toLocaleString()}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">GitHub Momentum</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight italic uppercase">
            GitHub Daily Star Growth
          </h3>
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="mb-3">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1 block">Live Total</span>
            <span className="text-lg md:text-xl font-black text-slate-900 italic font-mono leading-none">
              {totalStarCount.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em] mb-1">Growth Today</span>
          <div className="flex items-center gap-2">
             <span className="text-xs md:text-sm font-black text-slate-900 italic font-mono">
               +{totalGrowthToday.toLocaleString()}
             </span>
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 relative z-10">
        {projects.map(p => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.name}</span>
          </div>
        ))}
      </div>

      <div className="flex-grow relative z-10 overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-4 scrollbar-hide"
        >
          <div style={{ width: svgWidth }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight + 20}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D1D1F" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#1D1D1F" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0.2, 0.5, 0.8].map((p) => (
                <line key={p} x1={0} y1={svgHeight * p} x2={svgWidth} y2={svgHeight * p} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              ))}

              {projects.map((proj, pIndex) => {
                const points = getPoints(proj.data);
                if (points.length < 2) return null;
                const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
                const isTiny = proj.name.includes('Tiny');

                return (
                  <g key={proj.name}>
                    {isTiny && (
                      <motion.path
                        d={`${pathData} L ${points[points.length-1].x},${svgHeight - vPadding} L ${points[0].x},${svgHeight - vPadding} Z`}
                        fill="url(#areaGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <motion.path
                      d={pathData}
                      fill="none"
                      stroke={proj.color}
                      strokeWidth={isTiny ? 3 : 1.5}
                      strokeDasharray={isTiny ? "0" : "4 2"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut", delay: pIndex * 0.2 }}
                    />
                    {points.map((p, i) => (
                      <g key={i}>
                        <motion.circle
                          cx={p.x} cy={p.y} r="4" fill="white" stroke={proj.color} strokeWidth="3"
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.1 }}
                        />
                        <text x={p.x} y={svgHeight - 25} textAnchor="middle" className="fill-slate-300 text-[11px] font-bold uppercase">
                          {new Date(p.date).getMonth() + 1}/{new Date(p.date).getDate()}
                        </text>
                        
                        <motion.text
                          x={p.x} y={svgHeight - 5} textAnchor="middle" className="fill-slate-900 text-[13px] font-black italic font-mono"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 + i * 0.1 }}
                        >
                          {formatValue(p.total)}
                        </motion.text>

                        <motion.text
                          x={p.x} y={svgHeight + 15} textAnchor="middle" className="fill-green-500 text-[11px] font-black italic font-mono"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 + i * 0.1 }}
                        >
                          {formatGrowth(p.growth)}
                        </motion.text>
                      </g>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.4em]">GitHub Star Analytics</p>
        <a href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO || 'tinyhumansai/OpenHuman'}`} target="_blank" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm">
          Join Tiny <ArrowUpRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}
