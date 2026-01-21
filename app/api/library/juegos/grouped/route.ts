import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILE = path.resolve(process.cwd(), 'lib', 'library', 'data', 'juegos.json');

function mapGroup(gameType: string) {
  if (!gameType) return 'Other Games';
  if (gameType === 'word-race') return 'Timed Challenges';
  if (gameType === 'exam-simulator') return 'Simulators';
  return 'Other Games';
}

export async function GET() {
  try {
    if (!fs.existsSync(FILE)) {
      return NextResponse.json({}, { headers: { 'Cache-Control': 'public, max-age=30' } });
    }
    const raw = fs.readFileSync(FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    const groups: Record<string, any[]> = {};
    for (const e of arr) {
      if (!e || !e.id) continue;
      let g = 'Other Games';
      try {
        const parsed = typeof e.content === 'string' ? JSON.parse(e.content) : e.content || {};
        g = mapGroup(parsed.gameType);
      } catch (err) {
        g = 'Other Games';
      }
      groups[g] = groups[g] || [];
      groups[g].push({ id: e.id, title: e.title || '', level: e.level || 'all', excerpt: e.excerpt || e.summary || '' });
    }
    return NextResponse.json(groups, { headers: { 'Cache-Control': 'public, max-age=30' } });
  } catch (e:any) {
    console.error('grouped juegos error', e);
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}

