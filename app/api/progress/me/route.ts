import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getProgressForUser } from '@/lib/progressStore';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const prog = await getProgressForUser(userId);
    return NextResponse.json(prog || {});
  } catch (e: any) {
    console.error('get progress error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

