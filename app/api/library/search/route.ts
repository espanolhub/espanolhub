import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_ROOT = path.resolve(process.cwd(), 'lib', 'library', 'data');

async function readJson(file: string) {
  try {
    const raw = await fs.readFile(path.join(DATA_ROOT, file), 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').toLowerCase().trim();
    const section = (url.searchParams.get('section') || 'gramatica') as 'gramatica'|'lectura'|'juegos';
    const file = section === 'gramatica' ? 'gramatica.json' : section === 'lectura' ? 'lectura.json' : 'juegos.json';
    const arr = await readJson(file);
    if (!q) {
      return NextResponse.json(arr.map((e:any)=>({ id: e.id, title: e.title })));
    }
    const filtered = arr.filter((e:any)=> (e.title||'').toLowerCase().includes(q)).map((e:any)=>({ id: e.id, title: e.title }));
    return NextResponse.json(filtered);
  } catch (e:any) {
    console.error('library search error', e);
    return NextResponse.json([], { status: 500 });
  }
}

