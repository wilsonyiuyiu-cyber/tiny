import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StarRecord {
  recorded_at: string;
  star_count: number;
  growth: number;
}

export function useStarGrowth() {
  const [data, setData] = useState<StarRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const { data: rawData, error: supabaseError } = await supabase
          .from('github_stars')
          .select('recorded_at, star_count')
          .order('recorded_at', { ascending: true });

        if (supabaseError) throw supabaseError;

        if (rawData) {
          // 計算每日增幅
          const processedData = rawData.map((entry, index) => {
            const prevCount = index > 0 ? rawData[index - 1].star_count : entry.star_count;
            return {
              recorded_at: entry.recorded_at,
              star_count: entry.star_count,
              growth: entry.star_count - prevCount
            };
          });
          setData(processedData);
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
