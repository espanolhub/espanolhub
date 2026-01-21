import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

async function ensure() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(ADMINS_FILE);
    } catch {
      await fs.writeFile(ADMINS_FILE, JSON.stringify(['esconabdou@gmail.com','boutibderrahim@gmail.com'], null, 2), 'utf8');
    }
  } catch (e) {
    console.error('admins ensure error', e);
  }
}

export async function getAdminEmails(): Promise<string[]> {
  await ensure();
  const raw = await fs.readFile(ADMINS_FILE, 'utf8');
  try {
    const arr = JSON.parse(raw || '[]');
    return (arr || []).map((s: string) => (s || '').toLowerCase());
  } catch (e) {
    return [];
  }
}

export function getAdminEmailsSync(): string[] {
  try {
    // read file synchronously
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fsSync = require('fs');
    const raw = fsSync.readFileSync(ADMINS_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    if (Array.isArray(arr)) return arr.map((s: string) => (s || '').toLowerCase());
  } catch (e) {
    // fallback default
  }
  return ['esconabdou@gmail.com','boutibderrahim@gmail.com'];
}

export async function addAdminEmail(email: string) {
  const emails = await getAdminEmails();
  const normalized = (email || '').toLowerCase();
  if (!emails.includes(normalized)) {
    emails.push(normalized);
    await fs.writeFile(ADMINS_FILE, JSON.stringify(emails, null, 2), 'utf8');
  }
  return emails;
}

export async function removeAdminEmail(email: string) {
  const emails = await getAdminEmails();
  const normalized = (email || '').toLowerCase();
  const filtered = emails.filter(e => e !== normalized);
  await fs.writeFile(ADMINS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
  return filtered;
}

