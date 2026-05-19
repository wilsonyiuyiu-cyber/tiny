'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RefreshCcw, Cpu, Code, Copy, Check, X } from 'lucide-react';

const MESSAGES = [
  "Stay tiny, friend. 🐥",
  "Minimalism is key. ✨",
  "Just refreshed my memory trees! 🌳",
  "The future is simple. 💛",
  "Tiny but mighty. 💪",
  "Pulling fresh data... 🔄",
  "Memory Graph is glowing. 🔥",
  "20-minute loop is active. 🚀",
];

const TinyHuman: FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [countdown, setCountdown] = useState(1200); // 20 分鐘 (1200秒)
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const installCode = `<script src="https://cdn.openhuman.ai/widget.js"></script>\n<open-human agent-id="TINY_001"></open-human>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 20 分鐘循環計時器邏輯
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // 當計時結束，彈出同步訊息
          setMessage("New data pull completed! 🔄");
          setTimeout(() => setMessage(null), 4000);
          return 1200; // 重置
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    const nextMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(nextMsg);
    setTimeout(() => setMessage(null), 3000);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="flex flex-col items-center relative group">
      {/* 頂部狀態標籤 (Apple Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-12 flex items-center gap-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Memory Sync</span>
        </div>
        <div className="w-px h-3 bg-slate-200"></div>
        <div className="flex items-center gap-1.5">
          <RefreshCcw size={10} className="text-slate-300 animate-spin-slow" />
          <span className="text-[9px] font-mono font-bold text-slate-500">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* 對話泡泡 */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-24 bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] z-30"
          >
            <p className="text-xs font-black text-slate-700 tracking-tight italic">{message}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 吉祥物主體展示框 */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.06)] bg-white cursor-pointer transition-all duration-700"
      >
        {/* 背景數據流感掃描線 */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent h-1/2 w-full z-10 pointer-events-none"
        />

        <Image 
          src="/memes/photo_2026-05-16_08-05-35.jpg" 
          alt="Tiny Mascot" 
          fill 
          className={`object-cover transition-all duration-1000 ${isHovered ? 'scale-110 blur-[1px]' : 'scale-100'}`}
          priority
        />
        
        {/* 懸停時顯示的功能標籤 */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center"
            >
              <Cpu size={24} className="text-yellow-400 mb-3 animate-pulse" />
              <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1">OpenHuman Core</p>
              <p className="text-slate-300 text-[8px] leading-relaxed">20-minute data loop enabled.<br/>Context mapped in real-time.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 底部導引標籤 */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest text-slate-400 uppercase transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          Live Status
        </div>
      </motion.div>

      {/* 底部呼吸裝飾陰影 */}
      <div className="mt-8 w-32 h-4 bg-yellow-400/5 rounded-[100%] blur-xl animate-pulse mx-auto"></div>

      {/* 代碼彈窗 */}
      <AnimatePresence>
        {showCode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setShowCode(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">Deploy Agent</h4>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mt-1">Add OpenHuman to your site</p>
                </div>
                <button onClick={() => setShowCode(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 bg-slate-50/50">
                <div className="relative group">
                  <div className="absolute -top-3 left-4 px-2 py-0.5 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-sm">HTML Snippet</div>
                  <pre className="p-6 bg-slate-900 text-slate-300 rounded-2xl text-[10px] font-mono leading-relaxed overflow-x-auto border border-slate-800">
                    {installCode}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute right-4 bottom-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                
                <div className="mt-8 flex flex-col gap-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                        <span className="text-yellow-600 text-[10px] font-black italic">01</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Copy the snippet above</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                        <span className="text-yellow-600 text-[10px] font-black italic">02</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Paste into your &lt;body&gt; tag</p>
                   </div>
                </div>
              </div>

              <div className="p-8 text-center bg-white">
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-6">Powered by OpenHuman Core</p>
                <a href="https://github.com/tinyhumansai/OpenHuman" target="_blank" className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:underline decoration-yellow-400 decoration-2 underline-offset-4 transition-all">Documentation & API Guide →</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TinyHuman;
