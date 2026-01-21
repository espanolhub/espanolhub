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

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ok = await isAdminUser(userId);
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await ensure();
    const raw = await fs.readFile(FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    // build CSV
    const header = ['id','gameId','userId','name','score','createdAt'];
    const lines = [header.join(',')];
    for (const r of arr) {
      const row = [
        `"${(r.id||'').toString().replace(/"/g,'""')}"`,
        `"${(r.gameId||'').toString().replace(/"/g,'""')}"`,
        `"${(r.userId||'').toString().replace(/"/g,'""')}"`,
        `"${(r.name||'').toString().replace(/"/g,'""')}"`,
        `${r.score||0}`,
        `"${new Date(r.createdAt||0).toISOString()}"`
      ];
      lines.push(row.join(','));
    }
    const csv = lines.join('\n');
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leaderboards-${Date.now()}.csv"`,
      },
    });
  } catch (e:any) {
    console.error('export leaderboards error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

