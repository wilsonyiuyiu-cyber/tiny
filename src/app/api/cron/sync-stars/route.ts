import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const TARGET_REPOS = [
  "tinyhumansai/OpenHuman",
  "NousResearch/hermes-agent",
  "openclaw/openclaw"
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const results = [];
    const today = new Date().toISOString().split('T')[0];

    for (const repo of TARGET_REPOS) {
      // 1. 抓取 GitHub 數據
      const githubRes = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }),
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 0 },
      });

      if (!githubRes.ok) continue;

      const data = await githubRes.json();
      const starCount = data.stargazers_count;

      // 2. 存入 Supabase (包含 repo_name 欄位)
      const { error } = await supabaseAdmin
        .from('github_stars')
        .upsert({
          repo_name: repo,
          star_count: starCount,
          recorded_at: today,
        }, {
          onConflict: 'repo_name,recorded_at'
        });

      if (!error) {
        results.push({ repo, stars: starCount });
      }
    }

    return NextResponse.json({
      success: true,
      date: today,
      results
    });

  } catch (err: any) {
    console.error('Sync error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
