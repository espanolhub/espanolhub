/**
 * Types for Flashcards and Spaced Repetition System
 */

export interface Flashcard {
  id: string;
  word: string;
  translation: string;
  category: string;
  pronunciation?: string;
  example?: string;
  image?: string;
}

export interface FlashcardProgress {
  cardId: string;
  easeFactor: number; // SM-2 algorithm ease factor (default: 2.5)
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  lastReviewed: string; // ISO date string
  nextReview: string; // ISO date string
  status: 'new' | 'learning' | 'review' | 'mastered';
  incorrectCount: number;
  correctCount: number;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  category?: string;
  cardIds: string[];
  createdAt: string;
  updatedAt: string;
}
