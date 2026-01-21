import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { saveProgressForUser } from '@/lib/progressStore';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const progress = body?.progress;
    if (!progress) return NextResponse.json({ error: 'Missing progress' }, { status: 400 });
    const saved = await saveProgressForUser(userId, progress);
    return NextResponse.json(saved);
  } catch (e: any) {
    console.error('save progress error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

