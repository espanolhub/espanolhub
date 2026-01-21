import { NextResponse } from 'next/server';
import { games } from '@/lib/data/games';

function seedIndex(seed: string, max: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 1000000007;
  return Math.abs(h) % max;
}

export async function GET() {
  try {
    // Build a small set of questions for today's challenge
    const today = new Date().toISOString().slice(0,10);
    const pool: any[] = [];
    games.forEach((g:any) => {
      if (Array.isArray(g.questions)) {
        g.questions.forEach((q:any) => pool.push({ gameId: g.id, ...q }));
      }
    });
    if (pool.length === 0) return NextResponse.json({ questions: [] });
    const start = seedIndex(today, Math.max(1, pool.length - 4));
    const selected = [];
    for (let i = 0; i < 5; i++) {
      selected.push(pool[(start + i) % pool.length]);
    }
    return NextResponse.json({ date: today, questions: selected });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 500 });
  }
}

