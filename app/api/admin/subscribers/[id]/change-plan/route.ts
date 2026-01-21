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
    const body = await req.json();
    const { planId, months } = body;

    const subs = await readSubscribers();
    const idx = subs.findIndex((s: any) => s.clerkUserId === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    subs[idx].planId = planId || subs[idx].planId;
    if (months && Number(months) > 0) {
      const current = subs[idx].currentPeriodEnd ? new Date(subs[idx].currentPeriodEnd) : new Date();
      current.setMonth(current.getMonth() + Number(months));
      subs[idx].currentPeriodEnd = current.toISOString();
    }
    subs[idx].updatedAt = new Date().toISOString();
    await writeSubscribers(subs);

    await addTransaction({
      clerkUserId: id,
      eventType: 'admin.change_plan',
      payload: { planId, months },
    });

    return NextResponse.json(subs[idx]);
  } catch (e: any) {
    console.error('admin change plan error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

