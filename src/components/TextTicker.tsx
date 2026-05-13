'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

const TextTicker: FC = () => {
  const text = "$TINY TO THE MOON • WE ARE GLOWING • STAY TINY • COMMUNITY DRIVEN • THE YELLOWEST TOKEN ON SOLANA • NO TAX • LP BURNT • ";

  return (
    <div className="w-full bg-slate-900 py-6 overflow-hidden flex whitespace-nowrap border-y-4 border-yellow-400 rotate-[-1deg] scale-[1.02] z-20 relative shadow-2xl">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-4"
      >
        <span className="text-3xl font-black text-yellow-400 uppercase tracking-tighter italic">
          {text.repeat(10)}
        </span>
      </motion.div>
    </div>
  );
};

export default TextTicker;
