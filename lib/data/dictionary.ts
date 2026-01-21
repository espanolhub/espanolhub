import raw from './dictionary.json';
import { DictionaryEntry } from '@/lib/types';
import { normalizeArabic } from '@/lib/utils/normalizeArabic';

const dictionary: DictionaryEntry[] = (raw as unknown) as DictionaryEntry[];

export function getDictionary(): DictionaryEntry[] {
  return dictionary;
}

export function getDictionaryByCategory(category: string): DictionaryEntry[] {
  return dictionary.filter(d => (d.category || '').toLowerCase() === category.toLowerCase());
}

export function getDictionaryByWord(word: string): DictionaryEntry | undefined {
  return dictionary.find(d => d.word === word);
}

export function searchDictionary(query: string): DictionaryEntry[] {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  const normalizedQ = normalizeArabic(q);

  return dictionary.filter(entry => {
    if (entry.word.toLowerCase().includes(q)) return true;
    if (entry.pronunciation && entry.pronunciation.toLowerCase().includes(q)) return true;
    if (Array.isArray(entry.translations)) {
      if (entry.translations.some(t => {
        const tNorm = normalizeArabic(t.toLowerCase());
        return tNorm.includes(normalizedQ) || t.toLowerCase().includes(q);
      })) return true;
    }
    if (entry.tags && entry.tags.join(' ').toLowerCase().includes(q)) return true;
    return false;
  });
}

