import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { addScore, getTopScores } from '@/lib/leaderboards';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const gameId = url.searchParams.get('gameId') || '';
    const limit = Number(url.searchParams.get('limit') || '10');
    if (!gameId) return NextResponse.json([], { status: 400 });
    const top = await getTopScores(gameId, limit);
    return NextResponse.json(top, { headers: { 'Cache-Control': 'public, max-age=5' } });
  } catch (e:any) {
    console.error('leaderboard get error', e);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gameId, score, name } = body || {};
    if (!gameId || typeof score !== 'number') return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    // try auth
    let userId: string | null = null;
    try {
      const a = await auth();
      userId = a.userId || null;
    } catch (_) {}
    const rec = await addScore({ gameId, score, name: name || null, userId });
    return NextResponse.json(rec);
  } catch (e:any) {
    console.error('leaderboard post error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

