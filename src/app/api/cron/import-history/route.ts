import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const REPOS = [
  "tinyhumansai/OpenHuman",
  "NousResearch/hermes-agent",
  "openclaw/openclaw"
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 獲取各專案的最新真實數據
    const fetchRepoStars = async (repo: string) => {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` },
        next: { revalidate: 0 }
      });
      const data = await res.json();
      return data.stargazers_count || 0;
    };

    const [tinyReal, hermesReal, clawReal] = await Promise.all([
      fetchRepoStars("tinyhumansai/OpenHuman"),
      fetchRepoStars("NousResearch/hermes-agent"),
      fetchRepoStars("openclaw/openclaw")
    ]);

    const today = new Date().toISOString().split('T')[0];
    const importData = [
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: today, star_count: tinyReal },
      { repo_name: "NousResearch/hermes-agent", recorded_at: today, star_count: hermesReal },
      { repo_name: "openclaw/openclaw", recorded_at: today, star_count: clawReal }
    ];

    // 寫入 Supabase
    const { error } = await supabaseAdmin
      .from('github_stars')
      .upsert(importData, { onConflict: 'repo_name,recorded_at' });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: `Updated history to final sequence. Current: ${tinyReal}`,
      data: importData
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
