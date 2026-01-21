import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getAdminEmails } from '@/lib/admins';
import path from 'path';
import { promises as fs } from 'fs';

const DICT_PATH = path.resolve(process.cwd(), 'lib', 'data', 'dictionary.json');

async function checkAdmin(userId?: string | null) {
  if (!userId) return false;
  // clerkClient is a function that returns the client
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = (user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
  const admins = await getAdminEmails();
  return admins.includes(email);
}

export async function GET() {
  try {
    const data = await fs.readFile(DICT_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (e: any) {
    console.error('dictionary get error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const isAdmin = await checkAdmin(userId);
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    if (!body || !body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const raw = await fs.readFile(DICT_PATH, 'utf8');
    const arr = JSON.parse(raw || '[]');
    const idx = arr.findIndex((e: any) => e.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    arr[idx] = { ...arr[idx], ...body };
    await fs.writeFile(DICT_PATH, JSON.stringify(arr, null, 2), 'utf8');
    return NextResponse.json(arr[idx]);
  } catch (e: any) {
    console.error('dictionary put error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

