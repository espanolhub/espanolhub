import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { removeAdminEmail, getAdminEmails } from '@/lib/admins';
import { addTransaction } from '@/lib/subscribers';

export async function DELETE(req: Request, context: any) {
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
    const { email } = context?.params || {};
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    const updated = await removeAdminEmail(decodeURIComponent(email));
    try { await addTransaction({ id: `admin-remove-${Date.now()}`, clerkUserId: userId, eventType: 'admin.remove_admin_email', payload: { removed: decodeURIComponent(email) } }); } catch(e){}
    return NextResponse.json(updated);
  } catch (e: any) {
    console.error('admin emails delete error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

