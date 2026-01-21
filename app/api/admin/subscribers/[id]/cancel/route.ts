import { NextRequest, NextResponse } from 'next/server';
import { readSubscribers, writeSubscribers, addTransaction } from '@/lib/subscribers';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getAdminEmails } from '@/lib/admins';

export async function POST(req: NextRequest, context: any) {
  try {
    // auth + admin check
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const primary = user.primaryEmailAddress?.emailAddress?.toLowerCase();
    const emails = (user.emailAddresses || []).map((e: any) => (e.emailAddress || '').toLowerCase());
    const ADMIN_EMAILS = await getAdminEmails();
    const isAdmin = (primary && ADMIN_EMAILS.includes(primary)) || emails.some((e: string) => ADMIN_EMAILS.includes(e));
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id } = context?.params || {}; // clerkUserId
    const subs = await readSubscribers();
    const idx = subs.findIndex((s: any) => s.clerkUserId === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    subs[idx].status = 'canceled';
    subs[idx].updatedAt = new Date().toISOString();
    await writeSubscribers(subs);

    await addTransaction({
      clerkUserId: id,
      eventType: 'admin.canceled',
      payload: { by: 'admin', time: new Date().toISOString() },
    });

    return NextResponse.json(subs[idx]);
  } catch (e: any) {
    console.error('admin cancel error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

