'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || 'tinyhumansai/OpenHuman';
        const res = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=12`);
        if (res.ok) {
          const data = await res.json();
          setContributors(data);
        }
      } catch (err) {
        console.error('Failed to fetch contributors');
      } finally {
        setLoading(false);
      }
    }
    fetchContributors();
  }, []);

  if (loading || contributors.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-6 mt-8 md:mt-12 pt-8 md:pt-12 border-t border-slate-50 w-full">
      <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Built by Humans</p>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
        {contributors.map((c, i) => (
          <motion.a
            key={c.id}
            href={c.html_url}
            target="_blank"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, scale: 1.1 }}
            className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0 flex-shrink-0"
            title={c.login}
          >
            <Image src={c.avatar_url} alt={c.login} fill className="object-cover" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
