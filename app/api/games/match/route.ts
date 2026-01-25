import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/data/dictionary';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Match game: "¿Cuál es la traducción de [word]?" with 4 options (1 correct + 3 from other entries).
 * Uses dictionary. Correct answer = translation, not the word — no "answer = question".
 */
export async function GET() {
  try {
    const dict = getDictionary();
    const withTranslations = dict.filter(
      (e) => Array.isArray(e.translations) && e.translations.length > 0
    );
    const allTranslations = withTranslations.flatMap((e) =>
      (e.translations as string[]).map((t) => ({ word: e.word, translation: t }))
    );

    const pool = shuffle(withTranslations);
    const questions: {
      id: string;
      question: string;
      type: 'match';
      options: string[];
      correctAnswer: string;
      points: number;
    }[] = [];
    const used = new Set<string>();

    for (let i = 0; i < Math.min(30, pool.length); i++) {
      const entry = pool[i];
      const word = entry.word;
      const trans = (entry.translations as string[])[0];
      const key = `${word}|${trans}`;
      if (used.has(key)) continue;
      used.add(key);

      const others = [...new Set(
        allTranslations
          .filter((x) => x.word !== word && x.translation !== trans)
          .map((x) => x.translation)
      )];
      const wrong = shuffle(others).slice(0, 3);
      const options = shuffle([trans, ...wrong]);
      questions.push({
        id: `match-${i + 1}`,
        question: `¿Cuál es la traducción de "${word}"?`,
        type: 'match',
        options,
        correctAnswer: trans,
        points: 10,
      });
    }

    return NextResponse.json(
      { questions, totalQuestions: questions.length },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    );
  } catch (e: unknown) {
    console.error('Match game API error:', e);
    return NextResponse.json(
      { error: (e as Error).message ?? 'Internal error' },
      { status: 500 }
    );
  }
}
