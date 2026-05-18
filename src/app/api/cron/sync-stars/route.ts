import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// 填寫你的 GitHub 倉庫資訊，例如: "vercel/next.js"
const GITHUB_REPO = process.env.GITHUB_REPO || "owner/repo";

export async function GET(request: Request) {
  // 1. 安全驗證
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 2. 請求 GitHub API
    const githubRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: {
        ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }),
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 },
    });

    if (!githubRes.ok) {
      throw new Error(`GitHub API error: ${githubRes.statusText}`);
    }

    const data = await githubRes.json();
    const starCount = data.stargazers_count;

    // 3. 儲存至 Supabase
    // 使用 upsert 以防同一天重複執行時產生多餘資料
    const { error } = await supabaseAdmin
      .from('github_stars')
      .upsert({
        star_count: starCount,
        recorded_at: new Date().toISOString().split('T')[0],
      }, {
        onConflict: 'recorded_at'
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      repo: GITHUB_REPO,
      stars: starCount,
      date: new Date().toISOString().split('T')[0]
    });

  } catch (err: any) {
    console.error('Sync error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
