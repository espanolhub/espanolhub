'use server';

import { promises as fs } from 'fs';
import path from 'path';

const FILE = path.resolve(process.cwd(), 'data', 'leaderboards.json');

async function ensureFile() {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.access(FILE).catch(() => fs.writeFile(FILE, '[]', 'utf8'));
  } catch (e) {
    // ignore
  }
}

export async function readLeaderboards() {
  await ensureFile();
  const raw = await fs.readFile(FILE, 'utf8');
  try {
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export async function writeLeaderboards(arr: any[]) {
  await ensureFile();
  await fs.writeFile(FILE, JSON.stringify(arr, null, 2), 'utf8');
}

export async function addScore(entry: { gameId: string; userId?: string | null; name?: string; score: number; meta?: any }) {
  const arr = await readLeaderboards();
  const id = `score-${Date.now().toString(36)}-${Math.floor(Math.random()*9000)+1000}`;
  const record = { id, ...entry, createdAt: Date.now() };
  arr.push(record);
  await writeLeaderboards(arr);
  return record;
}

export async function getTopScores(gameId: string, limit = 10) {
  const arr = await readLeaderboards();
  return arr.filter((r:any)=>r.gameId === gameId).sort((a:any,b:any)=>b.score - a.score).slice(0, limit);
}

