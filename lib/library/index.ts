import fs from 'fs';
import path from 'path';

const DATA_ROOT = path.resolve(process.cwd(), 'lib', 'library', 'data');

function readJson(file: string) {
  try {
    const raw = fs.readFileSync(path.join(DATA_ROOT, file), 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function getLibraryTitles(section: 'gramatica' | 'lectura' | 'juegos') {
  const file = section === 'gramatica' ? 'gramatica.json' : section === 'lectura' ? 'lectura.json' : 'juegos.json';
  const arr = readJson(file);
  // Return lightweight objects (title-only search friendly)
  return arr.map((e: any) => ({ id: e.id, title: e.title, subtitle: e.subtitle || '', level: e.level || 'all', excerpt: e.excerpt || '', summary: e.summary || '' }));
}

export function getLibraryEntry(section: 'gramatica' | 'lectura' | 'juegos', id: string) {
  const file = section === 'gramatica' ? 'gramatica.json' : section === 'lectura' ? 'lectura.json' : 'juegos.json';
  const arr = readJson(file);
  return arr.find((e: any) => e.id === id) || null;
}

