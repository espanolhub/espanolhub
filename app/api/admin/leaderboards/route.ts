import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getAdminEmails } from '@/lib/admins';

const FILE = path.resolve(process.cwd(), 'data', 'leaderboards.json');

async function isAdminUser(userId?: string | null) {
  if (!userId) return false;
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = (user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
  const admins = await getAdminEmails();
  return admins.includes(email);
}

async function ensure() {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.access(FILE).catch(() => fs.writeFile(FILE, '[]', 'utf8'));
  } catch (e) {}
}

export async function GET() {
  await ensure();
  const raw = await fs.readFile(FILE, 'utf8');
  try {
    return NextResponse.json(JSON.parse(raw || '[]'));
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ok = await isAdminUser(userId);
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await ensure();
    const raw = await fs.readFile(FILE, 'utf8');
    const arr = JSON.parse(raw || '[]').filter((r:any)=>r.id !== id);
    await fs.writeFile(FILE, JSON.stringify(arr, null, 2), 'utf8');
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    console.error('admin leaderboards delete error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

