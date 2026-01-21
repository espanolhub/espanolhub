import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'lib', 'data', 'games', 'laberinto.json');

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ error: 'Game data not found' }, { status: 404 });
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    return NextResponse.json(data, { 
      headers: { 
        'Cache-Control': 'public, max-age=3600' 
      } 
    });
  } catch (e: any) {
    console.error('Laberinto API error:', e);
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}
