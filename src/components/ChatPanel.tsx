'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, Bot, User, Blocks, 
  Search, DollarSign, Database, Globe, Sparkles,
  Layers, Cpu, Zap, Share2, Code, X, Copy, Check
} from 'lucide-react';
import { AnimatePresence as FramerAnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  tool?: string;
}

const SAMPLE_PLUGINS = [
  { icon: <Search size={12} />, name: 'Web Search' },
  { icon: <DollarSign size={12} />, name: 'Solana Price' },
  { icon: <Database size={12} />, name: 'GitHub Stats' },
  { icon: <Globe size={12} />, name: 'Translation' },
  { icon: <Cpu size={12} />, name: 'Code Exec' },
  { icon: <Layers size={12} />, name: 'Knowledge Base' },
  { icon: <Zap size={12} />, name: 'Action Trigger' },
  { icon: <Share2 size={12} />, name: 'Social Post' },
];

const ChatPanel: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Hello! I am OpenHuman. I can help you manage data, check GitHub stats, or interact with 100+ plugins. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const installCode = `<script src="https://cdn.openhuman.ai/widget.js"></script>\n<open-human agent-id="TINY_001"></open-human>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 模擬 AI 思考與調用插件
    setTimeout(() => {
      let aiContent = "I've processed your request.";
      let toolUsed = undefined;

      if (input.toLowerCase().includes('price') || input.toLowerCase().includes('solana')) {
        toolUsed = "Fetching Solana Real-time Data...";
        aiContent = "The current price of $TINY is $0.00042 (+12.5% today). Market cap is sitting at $420k.";
      } else if (input.toLowerCase().includes('github') || input.toLowerCase().includes('star')) {
        toolUsed = "Accessing GitHub API...";
        aiContent = "OpenHuman repository has gained 1,200 stars in the last 24 hours. Momentum is very high!";
      } else if (input.toLowerCase().includes('plugin')) {
        toolUsed = "Scanning Plugin Registry...";
        aiContent = "I have 124 plugins active. I can handle everything from web search to on-chain execution.";
      } else {
        aiContent = "I'm on it. Using OpenHuman Core to find the best solution for you.";
      }

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        content: aiContent,
        tool: toolUsed
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-[600px] w-full max-w-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-sm">
              <Bot size={20} className="text-slate-900" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">OpenHuman Agent</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">124 Plugins Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowCode(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
            >
                <Code size={12} className="text-yellow-400" />
                <span className="text-[9px] font-black uppercase tracking-widest">Install</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <Blocks size={12} className="text-slate-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">v2.0 Core</span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
                {msg.tool && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg text-[8px] font-black text-white uppercase tracking-widest mb-1 shadow-sm"
                  >
                    <Cpu size={10} className="text-yellow-400 animate-pulse" />
                    {msg.tool}
                  </motion.div>
                )}
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none shadow-sm' 
                  : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.content}
                </div>
                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                  {msg.role === 'user' ? 'You' : 'OpenHuman'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 bg-white border-t border-slate-50">
          {/* Plugin Tray */}
          <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">Plugins:</span>
            {SAMPLE_PLUGINS.map((plugin, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -2, backgroundColor: '#f8fafc' }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-full border border-slate-100 cursor-pointer transition-all"
              >
                <div className="text-slate-400 group-hover:text-slate-900">{plugin.icon}</div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap">{plugin.name}</span>
              </motion.div>
            ))}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-400/10 rounded-full border border-yellow-400/20 cursor-pointer group">
              <Sparkles size={10} className="text-yellow-600" />
              <span className="text-[8px] font-bold text-yellow-600 uppercase tracking-tighter whitespace-nowrap">+116 More</span>
            </div>
          </div>

          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask OpenHuman to do something..."
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all placeholder:text-slate-300"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 代碼彈窗 */}
      <FramerAnimatePresence>
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
      </FramerAnimatePresence>
    </>
  );
};

export default ChatPanel;
