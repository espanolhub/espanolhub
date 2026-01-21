import { NextResponse } from 'next/server';
import { getSentencesForLevel, getMaxLevel } from '@/lib/data/order-game-sentences';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelParam = searchParams.get('level');
  const level = levelParam ? parseInt(levelParam, 10) : 1;

  if (isNaN(level) || level < 1) {
    return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  try {
    const sentences = getSentencesForLevel(level);
    const maxLevel = getMaxLevel();

    // Convert to game question format - format for parsing: "word1, word2, word3"
    const questions = sentences.map((sentence, index) => ({
      id: sentence.id,
      question: `Ordena: ${sentence.words.join(', ')}`,
      type: 'order' as const,
      correctAnswer: sentence.words,
      points: 10,
      level: sentence.level,
      category: sentence.category,
    }));

    return NextResponse.json({
      level,
      maxLevel,
      questions,
      totalQuestions: questions.length,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Order game API error:', error);
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 });
  }
}
