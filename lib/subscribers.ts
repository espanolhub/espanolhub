import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SUB_FILE = path.join(DATA_DIR, 'subscribers.json');
const TX_FILE = path.join(DATA_DIR, 'transactions.json');

async function ensureFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(SUB_FILE);
    } catch {
      await fs.writeFile(SUB_FILE, JSON.stringify([]), 'utf8');
    }
    try {
      await fs.access(TX_FILE);
    } catch {
      await fs.writeFile(TX_FILE, JSON.stringify([]), 'utf8');
    }
  } catch (e) {
    console.error('ensureFiles error', e);
  }
}

export async function readSubscribers() {
  await ensureFiles();
  const raw = await fs.readFile(SUB_FILE, 'utf8');
  return JSON.parse(raw || '[]');
}

export async function writeSubscribers(subs: any[]) {
  await ensureFiles();
  await fs.writeFile(SUB_FILE, JSON.stringify(subs, null, 2), 'utf8');
}

export async function addOrUpdateSubscriber(sub: any) {
  const subs = await readSubscribers();
  const idx = subs.findIndex((s: any) => s.clerkUserId === sub.clerkUserId);
  if (idx >= 0) {
    subs[idx] = { ...subs[idx], ...sub, updatedAt: new Date().toISOString() };
  } else {
    subs.push({ ...sub, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  await writeSubscribers(subs);
  return subs.find((s: any) => s.clerkUserId === sub.clerkUserId);
}

export async function addTransaction(tx: any) {
  await ensureFiles();
  const raw = await fs.readFile(TX_FILE, 'utf8');
  const arr = JSON.parse(raw || '[]');
  arr.push({ ...tx, createdAt: new Date().toISOString() });
  await fs.writeFile(TX_FILE, JSON.stringify(arr, null, 2), 'utf8');
  return arr[arr.length - 1];
}

