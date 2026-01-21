import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets', 'games');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, data } = body;
    if (!filename || !data) return NextResponse.json({ error: 'missing' }, { status: 400 });
    const buf = Buffer.from(data, 'base64');
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
    const target = path.join(ASSETS_DIR, filename);
    fs.writeFileSync(target, buf);
    const publicPath = `/assets/games/${filename}`;
    return NextResponse.json({ ok: true, url: publicPath });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 500 });
  }
}

