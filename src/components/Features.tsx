'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: <Heart className="text-rose-500" fill="currentColor" />,
    title: "100% Community Led",
    description: "Tiny belongs to the humans. No team tokens, no marketing wallets, just pure community power.",
    color: "bg-rose-50",
  },
  {
    icon: <Zap className="text-yellow-500" fill="currentColor" />,
    title: "Fast & Glowing",
    description: "Built on Solana for lightning-fast interactions and the lowest fees on the market.",
    color: "bg-yellow-50",
  },
  {
    icon: <Globe className="text-sky-500" fill="currentColor" />,
    title: "Global Mascot",
    description: "A digital friend that speaks every language and spreads yellow vibes across the globe.",
    color: "bg-sky-50",
  },
];

const Features: FC = () => {
  return (
    <section className="py-32 px-8 md:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[3rem] ${feature.color} border-2 border-white shadow-xl flex flex-col items-center text-center`}
          >
            <div className="w-20 h-20 rounded-[2rem] bg-white shadow-lg flex items-center justify-center mb-8 transform -rotate-12 group-hover:rotate-0 transition-transform">
              {feature.icon}
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-4 bubble-text italic">{feature.title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
