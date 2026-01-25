import { NextResponse } from 'next/server';
import { getExercisesByLevel } from '@/lib/data/grammar-exercises';
import { getSentencesForLevel } from '@/lib/data/order-game-sentences';
import { games } from '@/lib/data/games';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Fill-blank API: grammar exercises (_____ + correctAnswer), order-game sentences (one word → _____), games fill-blank.
 * ?level=1|2|3 (default 1).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelParam = searchParams.get('level');
  const level = levelParam ? Math.max(1, parseInt(levelParam, 10) || 1) : 1;

  try {
    const questions: {
      id: string;
      question: string;
      type: 'fill-blank';
      correctAnswer: string;
      points: number;
    }[] = [];
    const seen = new Set<string>();

    // 1. Grammar exercises with _____ (use as fill-blank, ignore options)
    const grammarLevel = (level === 1 ? 'beginner' : level === 2 ? 'intermediate' : 'advanced') as 'beginner' | 'intermediate' | 'advanced';
    const grammar = getExercisesByLevel(grammarLevel).filter((ex) => ex.question.includes('_____'));
    for (const g of grammar) {
      const key = `${g.question}|${g.correctAnswer}`;
      if (seen.has(key)) continue;
      seen.add(key);
      questions.push({
        id: `fill-grammar-${g.id}`,
        question: g.question,
        type: 'fill-blank',
        correctAnswer: g.correctAnswer,
        points: 10,
      });
    }

    // 2. Order-game sentences: replace one word with _____
    const sentences = getSentencesForLevel(level);
    for (let i = 0; i < Math.min(sentences.length, 20); i++) {
      const s = sentences[i];
      if (!s.words.length) continue;
      const idx = s.words.length <= 2 ? 0 : Math.min(1, s.words.length - 2);
      const word = s.words[idx];
      const parts = [...s.words];
      parts[idx] = '_____';
      const question = parts.join(' ');
      const key = `${question}|${word}`;
      if (seen.has(key)) continue;
      seen.add(key);
      questions.push({
        id: `fill-order-${s.id}-${idx}`,
        question,
        type: 'fill-blank',
        correctAnswer: word,
        points: 10,
      });
    }

    // 3. Games fill-blank (games.ts)
    const fbGame = games.find((g) => g.id === 'fill-blank');
    if (fbGame?.questions?.length) {
      for (const q of fbGame.questions as { id: string; question: string; correctAnswer: string }[]) {
        const key = `${q.question}|${q.correctAnswer}`;
        if (seen.has(key)) continue;
        seen.add(key);
        questions.push({
          id: `fill-games-${q.id}`,
          question: q.question,
          type: 'fill-blank',
          correctAnswer: q.correctAnswer,
          points: 10,
        });
      }
    }

    const shuffled = shuffle(questions).slice(0, 30);

    return NextResponse.json(
      { level, questions: shuffled, totalQuestions: shuffled.length },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    );
  } catch (e: unknown) {
    console.error('Fill-blank API error:', e);
    return NextResponse.json(
      { error: (e as Error).message ?? 'Internal error' },
      { status: 500 }
    );
  }
}
