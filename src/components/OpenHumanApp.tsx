'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Home, User, Search, Settings, Mic, Send, 
  CheckCircle2, Code, Cpu, MessageSquare, 
  X, Copy, Check, Globe, Layers, Zap, Star,
  Mail, MessageCircle, Share2, Terminal, Database, Video,
  HardDrive, Users, CreditCard, ClipboardList
} from 'lucide-react';
import { useStarGrowth } from '@/hooks/useStarGrowth';
import { useTokenData } from '@/hooks/useTokenData';

const INTEGRATION_ICONS = [
  <Database size={14} />, <Terminal size={14} />, <Mail size={14} />, 
  <MessageCircle size={14} />, <Video size={14} />, <Share2 size={14} />,
  <Globe size={14} />, <Layers size={14} />, <Zap size={14} />, <Cpu size={14} />
];

const CATALOG_DATA = [
  { icon: <Mail size={16} />, category: 'Email & calendar', examples: 'Gmail, Outlook, Google Calendar, Apple Calendar' },
  { icon: <HardDrive size={16} />, category: 'Docs & storage', examples: 'Google Docs, Google Drive, Notion, Dropbox, Airtable' },
  { icon: <Terminal size={16} />, category: 'Code & dev', examples: 'GitHub, Linear, Jira, Figma' },
  { icon: <MessageSquare size={16} />, category: 'Comms', examples: 'Slack, Discord, Microsoft Teams, Telegram, WhatsApp' },
  { icon: <Users size={16} />, category: 'CRM & sales', examples: 'Salesforce, HubSpot' },
  { icon: <CreditCard size={16} />, category: 'Commerce & payments', examples: 'Stripe, Shopify' },
  { icon: <ClipboardList size={16} />, category: 'Project management', examples: 'Asana, Trello' },
  { icon: <Share2 size={16} />, category: 'Social', examples: 'Twitter / X, Spotify, YouTube' },
];

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  status?: string;
  connections?: string[];
}

const OpenHumanApp: FC = () => {
  const { data: starData } = useStarGrowth();
  const tokenData = useTokenData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 初始化與讀取歷史紀錄
  useEffect(() => {
    const saved = localStorage.getItem('openhuman_chat');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        { id: '1', role: 'ai', content: "hey tiny, whats up?" },
        { id: '2', role: 'user', content: "not much, just hanging out. what's on your mind?" },
        { id: '3', role: 'ai', content: "Can you check my new emails for me?", connections: ['Making requests to your Gmail account', 'Making requests to your Slack account'] }
      ]);
    }
  }, []);

  // 儲存紀錄
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('openhuman_chat', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiContent = "I'm analyzing your request using OpenHuman Core. I can currently help with project stats, token data, and general info. Try asking about 'GitHub stars' or '$TINY price'!";
      let connections = ['OpenHuman Neural Net', 'Context Buffer'];

      const lowerInput = input.toLowerCase();

      // 1. GitHub Stars (Regex for variations)
      if (/\b(github|star|stars|repo|git)\b/.test(lowerInput)) {
        const repoData = starData?.["tinyhumansai/OpenHuman"];
        const tinyStars = repoData && repoData.length > 0 ? repoData[repoData.length - 1].star_count : '16,100';
        const variants = [
          `We're gaining massive momentum! The OpenHuman repository is currently at ${tinyStars.toLocaleString()} stars.`,
          `Checked the latest git logs. OpenHuman has reached ${tinyStars.toLocaleString()} stars and climbing!`,
          `GitHub stats synced: ${tinyStars.toLocaleString()} stars. The community is on fire! 🔥`
        ];
        aiContent = variants[Math.floor(Math.random() * variants.length)];
        connections = ['GitHub API Connection', 'Repo Analytics'];
      } 
      // 2. Token Market Cap / Price (Regex for mc, cap, price, fdv)
      else if (/\b(price|mc|marketcap|cap|fdv|value|valuation|cost)\b/.test(lowerInput)) {
        const price = tokenData.priceUsd !== '0' ? `$${parseFloat(tokenData.priceUsd).toFixed(6)}` : '$0.000107';
        const mc = tokenData.fdv > 0 ? `$${(tokenData.fdv / 1000).toFixed(1)}k` : '$106.5k';
        const variants = [
          `The current price of $TINY is ${price} with a market cap of ${mc}. Staying tiny but growing! 🐥`,
          `Market data synced. $TINY is trading at ${price}. MC: ${mc}.`,
          `Checked DexScreener: $TINY price is ${price}, Market Cap is ${mc}. 🚀`
        ];
        aiContent = variants[Math.floor(Math.random() * variants.length)];
        connections = ['DexScreener API', 'Solana RPC Node'];
      }
      // 3. General AI Logic (Keywords)
      else if (/\b(hello|hi|hey|yo|sup)\b/.test(lowerInput)) {
        aiContent = "Hey there! I'm OpenHuman, your personal AI agent. Ready to assist with your tiny needs! ✨";
      } else if (/\b(who|what)\b.*\b(are you|openhuman)\b/.test(lowerInput)) {
        aiContent = "I am OpenHuman, a decentralized AI superintelligence. I focus on being private, simple, and extremely powerful. 🤖";
      } else if (/\b(tiny|lifestyle|community)\b/.test(lowerInput)) {
        aiContent = "Tiny is a lifestyle. Minimalist, efficient, and community-driven. It's about being small but having a huge impact. 💛";
      } else if (/\b(help|can you|do for me)\b/.test(lowerInput)) {
        aiContent = "I can check $TINY token price, monitor GitHub star growth, or just chat with you. I have 100+ internal plugins ready to be activated!";
      } else if (/\b(thank|thanks|great|cool)\b/.test(lowerInput)) {
        aiContent = "You're welcome! Just doing my tiny bit for the community. 🐥";
      }

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        content: aiContent,
        connections: connections
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const installCode = `<script src="https://cdn.openhuman.ai/widget.js"></script>\n<open-human agent-id="TINY_001"></open-human>`;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* OS Style Window Container */}
      <div className="bg-[#F8F9FA] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white overflow-hidden flex flex-col md:flex-row h-[620px] md:h-[700px] relative">
        
        {/* Left Side: Mascot Area */}
        <div className="md:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-12 relative border-b md:border-b-0 md:border-r border-slate-50 min-h-[220px] md:min-h-0 shrink-0 overflow-hidden">
          
          {/* 118+ Integrations Background Animation */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
             {[...Array(15)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ 
                   x: Math.random() * 500 - 250, 
                   y: Math.random() * 500 - 250, 
                   opacity: 0 
                 }}
                 animate={{ 
                   x: [null, Math.random() * 500 - 250],
                   y: [null, Math.random() * 500 - 250],
                   opacity: [0, 1, 0],
                   scale: [0.5, 1.2, 0.5]
                 }}
                 transition={{ 
                   duration: Math.random() * 15 + 10, 
                   repeat: Infinity, 
                   ease: "linear",
                   delay: Math.random() * 10
                 }}
                 className="absolute text-slate-900"
               >
                 {INTEGRATION_ICONS[i % INTEGRATION_ICONS.length]}
               </motion.div>
             ))}
          </div>

          <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 z-10">
             <div className="w-4 h-4 rounded-md border border-slate-200 flex items-center justify-center bg-white">
                <Check size={10} className="text-blue-500" />
             </div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Speak replies</span>
          </div>

          <motion.div 
            animate={{ 
              y: isTyping ? [0, -15, 0] : [0, -10, 0],
              scale: isTyping ? [1, 1.05, 1] : 1,
              rotate: isTyping ? [0, 2, -2, 0] : 0
            }}
            transition={{ 
              duration: isTyping ? 1 : 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-32 h-32 md:w-80 md:h-80 mt-4 md:mt-0"
          >
             <Image 
               src="/memes/photo_2026-05-16_08-05-35.jpg" 
               alt="OpenHuman Mascot" 
               fill 
               className="object-contain drop-shadow-2xl"
             />
          </motion.div>

          {/* 118+ Integrations Label */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-slate-900 rounded-full shadow-sm border border-yellow-300">
                <Zap size={10} fill="currentColor" />
                <span className="text-[8px] font-black uppercase tracking-widest">118+ via OAuth</span>
             </div>
          </div>
          
          <div className="absolute bottom-4 md:bottom-12 flex items-center gap-2 z-10">
            <button onClick={() => setShowCode(true)} className="p-2 md:p-3 bg-slate-900 text-white rounded-full hover:scale-110 transition-all shadow-lg group">
              <Code size={14} className="md:w-[18px] md:h-[18px] group-hover:text-yellow-400" />
            </button>
            <div className="px-3 py-1.5 md:px-6 md:py-3 bg-white rounded-full shadow-sm border border-slate-50 flex gap-4 md:gap-6">
               <Home size={14} className="md:w-[18px] md:h-[18px] text-slate-300 hover:text-slate-900 cursor-pointer transition-colors" />
               <User size={14} className="md:w-[18px] md:h-[18px] text-slate-900 cursor-pointer" />
               <div className="w-1.5 h-1.5 rounded-full bg-slate-100 self-center"></div>
               <Layers size={14} className={`${showCatalog ? 'text-slate-900' : 'text-slate-300'} hover:text-slate-900 cursor-pointer transition-colors`} onClick={() => setShowCatalog(!showCatalog)} />
               <Settings size={14} className="text-slate-300 hover:text-slate-900 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Right Side: Chat Area */}
        <div className="md:w-1/2 flex flex-col h-full bg-white/30 backdrop-blur-sm overflow-hidden">
           <div 
             ref={scrollRef}
             className="flex-grow overflow-y-auto p-4 md:p-8 flex flex-col gap-6 md:gap-8 scroll-smooth"
           >
             {messages.map((msg) => (
               <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-3`}>
                 {msg.connections && (
                   <div className="flex flex-col gap-1 mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Viewing your Connections <span className="text-green-500 ml-2">success</span></p>
                      {msg.connections.map((conn, i) => (
                        <div key={i} className="flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                           <span className="text-[10px] font-medium text-slate-500">{conn}</span>
                           <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter ml-auto">success</span>
                        </div>
                      ))}
                   </div>
                 )}
                 <div className={`px-6 py-4 rounded-3xl text-sm font-medium leading-relaxed max-w-[90%] shadow-sm ${
                   msg.role === 'user' 
                   ? 'bg-[#3b82f6] text-white rounded-tr-none' 
                   : 'bg-[#F1F3F5] text-slate-700 rounded-tl-none'
                 }`}>
                   {msg.content}
                 </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-[#F1F3F5] px-6 py-4 rounded-3xl rounded-tl-none animate-pulse text-slate-400 text-xs font-bold">
                    OpenHuman is thinking...
                  </div>
               </div>
             )}
           </div>

           {/* Input Area */}
           <div className="p-4 md:p-8 shrink-0">
              <div className="relative group bg-[#F1F3F5] rounded-3xl p-1 md:p-2 flex items-center">
                 <div className="p-2 md:p-3 text-slate-400">
                    <Mic size={18} className="md:w-5 md:h-5" />
                 </div>
                 <input 
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Tap and speak"
                   className="flex-grow bg-transparent border-none focus:outline-none text-xs md:text-sm font-medium placeholder:text-slate-400 px-1 md:px-2"
                 />
                 <div className="flex items-center gap-2 mr-1 md:mr-2">
                    <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white rounded-lg shadow-sm border border-slate-100">
                       <div className="w-0.5 h-3 bg-slate-200"></div>
                       <div className="w-0.5 h-4 bg-slate-300"></div>
                       <div className="w-0.5 h-2 bg-slate-200"></div>
                       <span className="text-[8px] font-bold text-slate-400 ml-1">0%</span>
                    </div>
                    <button 
                      onClick={handleSend}
                      className="p-2 md:p-3 bg-white text-slate-900 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
                    >
                      <Send size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* OS Close/Min/Max buttons (Top Right) */}
        <div className="absolute top-8 right-8 flex gap-1.5">
           <div className="w-3 h-3 rounded-full bg-slate-200"></div>
           <div className="w-3 h-3 rounded-full bg-slate-200"></div>
           <div className="w-3 h-3 rounded-full bg-slate-200"></div>
        </div>
      </div>

      {/* Code Modal (Reuse logic) */}
      <AnimatePresence>
        {showCode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setShowCode(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">Deploy Agent</h4>
                </div>
                <button onClick={() => setShowCode(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-300"><X size={20} /></button>
              </div>
              <div className="p-8 bg-slate-50/50">
                <pre className="p-6 bg-slate-900 text-slate-300 rounded-2xl text-[10px] font-mono leading-relaxed overflow-x-auto">
                  {installCode}
                </pre>
                <button 
                  onClick={() => { navigator.clipboard.writeText(installCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="mt-4 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Snippet'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Catalog Modal */}
      <AnimatePresence>
        {showCatalog && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setShowCatalog(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white text-slate-900 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black mb-2 uppercase italic tracking-tighter">Some of what's in the catalog</h2>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed">The catalog spans productivity, business, social, messaging and Google. A non-exhaustive sample:</p>
                  </div>
                  <button onClick={() => setShowCatalog(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors"><X size={20} /></button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-4 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Category</th>
                        <th className="py-4 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CATALOG_DATA.map((item, i) => (
                        <tr key={i} className="border-b border-slate-50 last:border-0 group hover:bg-slate-50 transition-colors">
                          <td className="py-4 pr-8 flex items-center gap-3 font-black text-[11px] uppercase tracking-wider text-slate-800">
                            <div className="text-slate-300 group-hover:text-yellow-500 transition-colors">{item.icon}</div>
                            {item.category}
                          </td>
                          <td className="py-4 text-slate-400 text-[11px] font-medium leading-relaxed">{item.examples}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-yellow-400 p-4 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-900">118+ Integrations Available via OAuth</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpenHumanApp;
