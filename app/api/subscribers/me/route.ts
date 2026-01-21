import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { readSubscribers } from '@/lib/subscribers';

/**
 * API route to check if current user has premium subscription
 * Used for server-side validation
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ isPro: false, error: 'Unauthorized' }, { status: 401 });
    }

    const subs = await readSubscribers();
    const userSub = subs.find((s: any) => s.clerkUserId === userId);
    
    if (userSub && userSub.status === 'active') {
      return NextResponse.json({ isPro: true, subscription: userSub });
    }

    return NextResponse.json({ isPro: false });
  } catch (e) {
    console.error('Error checking subscription status', e);
    return NextResponse.json({ isPro: false, error: 'Internal server error' }, { status: 500 });
  }
}
