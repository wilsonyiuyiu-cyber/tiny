'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: <Heart size={24} className="text-slate-900" />,
    title: "Community Led",
    description: "Tiny belongs to the humans. No team tokens, no marketing wallets, just pure community power.",
  },
  {
    icon: <Zap size={24} className="text-slate-900" />,
    title: "Fast & Glowing",
    description: "Built on Solana for lightning-fast interactions and the lowest fees on the market.",
  },
  {
    icon: <Globe size={24} className="text-slate-900" />,
    title: "Global Mascot",
    description: "A digital friend that speaks every language and spreads yellow vibes across the globe.",
  },
];

const Features: FC = () => {
  return (
    <section className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tighter italic">{feature.title}</h4>
            <p className="text-slate-400 font-medium leading-relaxed text-sm max-w-[280px]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
