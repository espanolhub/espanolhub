import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const PROG_FILE = path.join(DATA_DIR, 'progress.json');

async function ensure() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(PROG_FILE);
    } catch {
      await fs.writeFile(PROG_FILE, JSON.stringify({}), 'utf8');
    }
  } catch (e) {
    console.error('progressStore ensure error', e);
  }
}

export async function readProgress() {
  await ensure();
  const raw = await fs.readFile(PROG_FILE, 'utf8');
  return JSON.parse(raw || '{}');
}

export async function saveProgressForUser(userId: string, progress: any) {
  await ensure();
  const store = await readProgress();
  store[userId] = { ...(store[userId] || {}), ...progress, updatedAt: new Date().toISOString() };
  await fs.writeFile(PROG_FILE, JSON.stringify(store, null, 2), 'utf8');
  return store[userId];
}

export async function getProgressForUser(userId: string) {
  await ensure();
  const store = await readProgress();
  return store[userId] || null;
}

