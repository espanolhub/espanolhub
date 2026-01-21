import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getAdminEmails } from '@/lib/admins';

const DATA_DIR = path.resolve(process.cwd(), 'lib', 'library', 'data');

async function isAdminUser(userId?: string | null) {
  if (!userId) return false;
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = (user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
  const admins = await getAdminEmails();
  return admins.includes(email);
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ok = await isAdminUser(userId);
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const { section, title, subtitle, level, excerpt, content } = body || {};
    if (!section || !title) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    // validate payload
    const { validateLibraryPayload } = await import('@/lib/library/validators');
    const { valid, errors } = await validateLibraryPayload({ section, title, subtitle, level, excerpt, content });
    if (!valid) return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });

    const fileName = section === 'gramatica' ? 'gramatica.json' : section === 'lectura' ? 'lectura.json' : 'juegos.json';
    const filePath = path.join(DATA_DIR, fileName);
    // ensure dir
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(filePath, 'utf8').catch(()=> '[]');
    const arr = JSON.parse(raw || '[]');
    const id = `${section}-${Date.now().toString(36)}-${Math.floor(Math.random()*9000)+1000}`;
    const entry = { id, title, subtitle, level, excerpt, content, examples: [] };
    arr.unshift(entry);
    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8');
    return NextResponse.json(entry);
  } catch (e: any) {
    console.error('admin library save error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

// Bulk import endpoint (POST JSON array)
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ok = await isAdminUser(userId);
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    if (!Array.isArray(body)) return NextResponse.json({ error: 'Expected array' }, { status: 400 });
    const fileMap: Record<string,string> = { 'gramatica': 'gramatica.json', 'lectura':'lectura.json', 'juegos':'juegos.json' };
    // validate each and append
    for (const item of body) {
      const section = item.section;
      if (!section || !fileMap[section]) continue;
      const f = path.join(DATA_DIR, fileMap[section]);
      const raw = await fs.readFile(f, 'utf8').catch(()=> '[]');
      const arr = JSON.parse(raw || '[]');
      const id = item.id || `${section}-${Date.now().toString(36)}-${Math.floor(Math.random()*9000)+1000}`;
      arr.unshift({ ...item, id });
      await fs.writeFile(f, JSON.stringify(arr, null, 2), 'utf8');
    }
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    console.error('admin library bulk import error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
