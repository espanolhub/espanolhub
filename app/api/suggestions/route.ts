import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const PATH = path.resolve(process.cwd(), 'data', 'suggested-words.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.word) return NextResponse.json({ error: 'Missing word' }, { status: 400 });
    const entry = {
      id: `sug-${Date.now()}`,
      word: body.word,
      category: body.category || null,
      example: body.example || null,
      createdAt: Date.now(),
    };
    let arr: any[] = [];
    try {
      const raw = await fs.readFile(PATH, 'utf8');
      arr = JSON.parse(raw || '[]');
    } catch (e) {
      // file may not exist yet
      arr = [];
    }
    arr.push(entry);
    await fs.writeFile(PATH, JSON.stringify(arr, null, 2), 'utf8');
    return NextResponse.json(entry);
  } catch (e: any) {
    console.error('suggestions post error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

