import { NextResponse } from 'next/server';
import { getLibraryEntry } from '@/lib/library';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id') || '';
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const entry = getLibraryEntry('juegos', id);
    if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(entry);
  } catch (e: any) {
    console.error('library entry error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

