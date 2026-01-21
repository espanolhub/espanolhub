import { NextResponse } from 'next/server';
import { getQuestionsForLevel, getMaxLevel } from '@/lib/data/multiple-choice-questions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelParam = searchParams.get('level');
  const level = levelParam ? parseInt(levelParam, 10) : 1;

  if (isNaN(level) || level < 1) {
    return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  try {
    const questions = getQuestionsForLevel(level);
    const maxLevel = getMaxLevel();

    // Convert to game question format
    const gameQuestions = questions.map((q) => ({
      id: q.id,
      question: q.question,
      type: 'multiple-choice' as const,
      options: q.options,
      correctAnswer: q.correctAnswer,
      points: 10,
      level: q.level,
      category: q.category,
      explanation: q.explanation,
    }));

    return NextResponse.json({
      level,
      maxLevel,
      questions: gameQuestions,
      totalQuestions: gameQuestions.length,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Multiple choice API error:', error);
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 });
  }
}
