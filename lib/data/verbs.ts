'use strict';

// Deterministic daily verbs selector using date as seed.
import grammarVerbsDefault from './grammar-verbs';

function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSeedFromDate(d = new Date()) {
  // seed based on YYYYMMDD
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return y * 10000 + m * 100 + day;
}

export function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getDailyVerbs(category: 'dailyLife' | 'driving' | 'adminLegal', count = 5, date?: Date) {
  const grammarVerbs = (grammarVerbsDefault as any) || {};
  const pool: string[] = grammarVerbs[category] || [];
  const seed = getSeedFromDate(date || new Date());
  const shuffled = shuffleWithSeed<string>(pool, seed);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default {
  getDailyVerbs,
};

