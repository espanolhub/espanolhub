import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ authenticated: false });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return NextResponse.json({
      authenticated: true,
      userId,
      primaryEmail: user.primaryEmailAddress?.emailAddress || null,
      emails: (user.emailAddresses || []).map((e: any) => e.emailAddress),
      firstName: user.firstName || null,
      lastName: user.lastName || null,
    });
  } catch (err: any) {
    console.error('whoami error', err);
    return NextResponse.json({ error: err?.message || 'failed' }, { status: 500 });
  }
}

