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
          // 按專案分組並計算增幅
          const grouped: Record<string, StarRecord[]> = {};
          
          rawData.forEach((entry) => {
            if (!grouped[entry.repo_name]) {
              grouped[entry.repo_name] = [];
            }
            
            const repoData = grouped[entry.repo_name];
            const prevCount = repoData.length > 0 ? repoData[repoData.length - 1].star_count : entry.star_count;
            
            repoData.push({
              recorded_at: entry.recorded_at,
              star_count: entry.star_count,
              growth: entry.star_count - prevCount,
              repo_name: entry.repo_name
            });
          });
          
          setData(grouped);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
  }, []);

  return { data, loading, error };
}
