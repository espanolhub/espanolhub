import raw from './dictionary.json';
import { vocabulary } from './vocabulary';
import { DictionaryEntry, VocabularyWord } from '@/lib/types';
import { normalizeArabic } from '@/lib/utils/normalizeArabic';

// Merge sources and remove duplicates
const mergeSources = (): DictionaryEntry[] => {
  const baseDictionary = (raw as unknown) as DictionaryEntry[];
  
  // Convert VocabularyWord to DictionaryEntry format
  const extraWords: DictionaryEntry[] = vocabulary.map((v, index) => ({
    id: `vocab-${v.category}-${index}`,
    word: v.word,
    translations: v.translation,
    category: v.category,
    pronunciation: v.pronunciation,
    example: v.example,
    audio: v.audio,
  }));

  // Combine and remove duplicates by word
  const seen = new Set<string>();
  const combined: DictionaryEntry[] = [];

  // Add base dictionary first
  baseDictionary.forEach(entry => {
    const key = entry.word.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(entry);
    }
  });

  // Add extra words if not already seen
  extraWords.forEach(entry => {
    const key = entry.word.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(entry);
    }
  });

  return combined;
};

const dictionary: DictionaryEntry[] = mergeSources();

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

