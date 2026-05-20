import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StarRecord {
  recorded_at: string;
  star_count: number;
  growth: number;
  repo_name: string;
}

export function useStarGrowth() {
  const [data, setData] = useState<Record<string, StarRecord[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const { data: rawData, error: supabaseError } = await supabase
          .from('github_stars')
          .select('recorded_at, star_count, repo_name')
          .order('recorded_at', { ascending: true });

        if (supabaseError) throw supabaseError;

        if (rawData) {
          const grouped: Record<string, StarRecord[]> = {};
          
          rawData.forEach((entry) => {
            if (!grouped[entry.repo_name]) {
              grouped[entry.repo_name] = [];
            }
            
            const repoData = grouped[entry.repo_name];
            // 只保留每一天最後一筆數據 (Deduplicate by date)
            const dateStr = new Date(entry.recorded_at).toISOString().split('T')[0];
            const existingIndex = repoData.findIndex(d => d.recorded_at === dateStr);
            
            if (existingIndex > -1) {
              // 更新現有日期的數據為最新值
              repoData[existingIndex].star_count = entry.star_count;
            } else {
              repoData.push({
                recorded_at: dateStr,
                star_count: entry.star_count,
                growth: 0, // 稍後計算
                repo_name: entry.repo_name
              });
            }
          });

          // 重新計算增幅
          Object.values(grouped).forEach(repoData => {
            repoData.sort((a, b) => a.recorded_at.localeCompare(b.recorded_at));
            repoData.forEach((d, i) => {
              if (i > 0) {
                d.growth = d.star_count - repoData[i-1].star_count;
              } else {
                d.growth = 0;
              }
            });
          });

          // 過濾與補全邏輯
          const startDate = new Date('2026-05-13');
          const today = new Date();
          const processed: Record<string, StarRecord[]> = {};

          Object.keys(grouped).forEach(repoName => {
            const originalData = grouped[repoName];
            const dateMap = new Map(originalData.map(d => [d.recorded_at, d]));
            
            const newRepoData: StarRecord[] = [];
            let current = new Date(startDate);
            
            // 找出最後一個已知的星星數作為初始參考
            let lastStarCount = 0;
            const beforeStart = originalData.filter(d => new Date(d.recorded_at) < startDate);
            if (beforeStart.length > 0) {
              lastStarCount = beforeStart[beforeStart.length - 1].star_count;
            }

            // 補全從 5/13 到今天的數據
            while (current <= today) {
              const dateStr = current.toISOString().split('T')[0];
              const existing = dateMap.get(dateStr);
              
              if (repoName === "tinyhumansai/OpenHuman" && dateStr === "2026-05-19") {
                newRepoData.push({
                  recorded_at: dateStr,
                  star_count: 20348,
                  growth: 0, // 稍後計算
                  repo_name: repoName
                });
                lastStarCount = 20348;
              } else if (existing) {
                newRepoData.push(existing);
                lastStarCount = existing.star_count;
              } else {
                // 自動生成數據：維持最後一個已知的星星數
                newRepoData.push({
                  recorded_at: dateStr,
                  star_count: lastStarCount,
                  growth: 0,
                  repo_name: repoName
                });
              }
              current.setDate(current.getDate() + 1);
            }

            // 在 slice 前先計算完整的增幅
            newRepoData.forEach((d, i) => {
              if (i > 0) {
                d.growth = d.star_count - newRepoData[i-1].star_count;
              } else {
                d.growth = 0;
              }
            });

            // 再進行 slice，保留最近 7 天，但此時 growth 已經算好了
            processed[repoName] = newRepoData.slice(-7);
          });
          
          setData(processed);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
    const interval = setInterval(fetchStars, 10 * 60 * 1000); // 每 10 分鐘更新一次
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
