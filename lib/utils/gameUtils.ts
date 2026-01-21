/**
 * Utility functions for games
 * وظائف مساعدة للألعاب
 */

import type { GameQuestion } from '../types';

/**
 * Shuffle array using Fisher-Yates algorithm
 * خلط المصفوفة باستخدام خوارزمية Fisher-Yates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random questions from a pool
 * الحصول على أسئلة عشوائية من مجموعة
 * @param questions - All available questions
 * @param count - Number of questions to select (default: 20)
 * @returns Randomly selected questions
 */
export function getRandomQuestions(questions: GameQuestion[], count: number = 20): GameQuestion[] {
  if (questions.length <= count) {
    // If we have fewer or equal questions, return all shuffled
    return shuffleArray(questions);
  }
  
  // Shuffle and take first 'count' questions
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
}
