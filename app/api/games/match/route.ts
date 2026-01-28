import { NextResponse } from 'next/server';

/**
 * Memory/Match game endpoint has been removed to prevent any Arabic translations
 * from being exposed in the games UI.
 */
export async function GET() {
  return NextResponse.json(
    { error: 'This game has been removed.' },
    { status: 410, headers: { 'Cache-Control': 'no-store' } }
  );
}
