import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getAdminEmails, addAdminEmail } from '@/lib/admins';
import { addTransaction } from '@/lib/subscribers';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // verify user is admin
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = (user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
    const admins = await getAdminEmails();
    if (!admins.includes(email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(admins);
  } catch (e: any) {
    console.error('admin emails get error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // verify user is admin
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const requesterEmail = (user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
    const admins = await getAdminEmails();
    if (!admins.includes(requesterEmail)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const body = await req.json();
    const email = (body?.email || '').toLowerCase();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    const updated = await addAdminEmail(email);
    // audit log
    try { await addTransaction({ id: `admin-add-${Date.now()}`, clerkUserId: userId, eventType: 'admin.add_admin_email', payload: { added: email } }); } catch (e) {}
    return NextResponse.json(updated);
  } catch (e: any) {
    console.error('admin emails post error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

