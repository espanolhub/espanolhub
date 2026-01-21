import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { userId, sessionId, getToken } = await getAuth(req as any);
    return NextResponse.json({ userId, sessionId });
  } catch (e) {
    return NextResponse.json({ error: 'not available' }, { status: 500 });
  }
}

