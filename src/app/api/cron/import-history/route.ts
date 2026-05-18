import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const GITHUB_REPO = process.env.GITHUB_REPO || "tinyhumansai/OpenHuman";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 獲取目前的總星數
    const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { 
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 0 }
    });
    const { stargazers_count } = await repoRes.json();

    // 嚴格根據用戶表格數據 (修正版)
    const importData = [
      { recorded_at: "2026-05-13", star_count: 2700 },
      { recorded_at: "2026-05-14", star_count: 4000 },
      { recorded_at: "2026-05-15", star_count: 6000 },
      { recorded_at: "2026-05-16", star_count: 8000 },
      { recorded_at: "2026-05-17", star_count: 11000 },
      { recorded_at: "2026-05-18", star_count: stargazers_count } // 5/18 使用最新實時數據 (目前約 14k+)
    ];

    // 先清空舊的歷史數據 (可選，但為了確保數據乾淨，我們使用 upsert)
    const { error } = await supabaseAdmin
      .from('github_stars')
      .upsert(importData, { onConflict: 'recorded_at' });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: `Strictly imported ${importData.length} days of history from table`,
      data: importData
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
