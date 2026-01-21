import { NextResponse } from 'next/server';
import { readSubscribers } from '@/lib/subscribers';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getAdminEmails } from '@/lib/admins';

export async function GET() {
  try {
    // require auth and admin
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const primary = user.primaryEmailAddress?.emailAddress?.toLowerCase();
    const emails = (user.emailAddresses || []).map((e: any) => (e.emailAddress || '').toLowerCase());
    const ADMIN_EMAILS = await getAdminEmails();
    const isAdmin = (primary && ADMIN_EMAILS.includes(primary)) || emails.some((e: string) => ADMIN_EMAILS.includes(e));
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const subs = await readSubscribers();
    return NextResponse.json(subs);
  } catch (e) {
    console.error('readSubscribers error', e);
    return NextResponse.json({ error: 'Failed to read subscribers' }, { status: 500 });
  }
}

