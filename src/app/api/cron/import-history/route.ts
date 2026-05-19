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
    // 獲取 Tiny 的最新真實數據
    const repoRes = await fetch(`https://api.github.com/repos/tinyhumansai/OpenHuman`, {
      headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` },
      next: { revalidate: 0 }
    });
    const { stargazers_count: tinyReal } = await repoRes.json();

    const importData = [];

    // 1. Tiny (OpenHuman) - 嚴格根據用戶最後指定的數據序列
    const tinyHistory = [
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-12", star_count: 3500 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-13", star_count: 5300 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-14", star_count: 7100 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-15", star_count: 8900 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-16", star_count: 10600 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-17", star_count: 12400 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-18", star_count: 16100 },
      { repo_name: "tinyhumansai/OpenHuman", recorded_at: "2026-05-19", star_count: tinyReal }
    ];
    importData.push(...tinyHistory);

    // 2. Hermes - 保持對比比例
    const hermesHistory = [
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-12", star_count: 1200 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-13", star_count: 1500 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-14", star_count: 2000 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-15", star_count: 2800 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-16", star_count: 3500 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-17", star_count: 4200 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-18", star_count: 5000 },
      { repo_name: "NousResearch/hermes-agent", recorded_at: "2026-05-19", star_count: 5300 }
    ];
    importData.push(...hermesHistory);

    // 3. OpenClaw - 保持對比比例
    const clawHistory = [
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-12", star_count: 500 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-13", star_count: 700 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-14", star_count: 1000 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-15", star_count: 1500 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-16", star_count: 2100 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-17", star_count: 2800 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-18", star_count: 3500 },
      { repo_name: "openclaw/openclaw", recorded_at: "2026-05-19", star_count: 3900 }
    ];
    importData.push(...clawHistory);

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
