/**
 * Flashcards and Spaced Repetition System
 * Implements SM-2 algorithm for optimal review scheduling
 */

import type { Flashcard, FlashcardProgress, FlashcardDeck } from '../types/flashcards';
import { vocabulary } from '../data/vocabulary';

const STORAGE_KEY_FLASHCARDS = 'espanol-flashcards-progress';
const STORAGE_KEY_DECKS = 'espanol-flashcard-decks';

// SM-2 Algorithm constants
const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.5;
const INITIAL_INTERVAL = 1; // 1 day

/**
 * Get all flashcard progress
 */
export function getFlashcardProgress(): FlashcardProgress[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY_FLASHCARDS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading flashcard progress:', error);
  }

  return [];
}

/**
 * Save flashcard progress
 */
function saveFlashcardProgress(progress: FlashcardProgress[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY_FLASHCARDS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving flashcard progress:', error);
  }
}

/**
 * Get progress for a specific card
 */
export function getCardProgress(cardId: string): FlashcardProgress | null {
  const allProgress = getFlashcardProgress();
  return allProgress.find(p => p.cardId === cardId) || null;
}

/**
 * Initialize a new card
 */
function initializeCard(cardId: string): FlashcardProgress {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + INITIAL_INTERVAL);

  return {
    cardId,
    easeFactor: INITIAL_EASE_FACTOR,
    interval: INITIAL_INTERVAL,
    repetitions: 0,
    lastReviewed: now.toISOString(),
    nextReview: tomorrow.toISOString(),
    status: 'new',
    incorrectCount: 0,
    correctCount: 0,
  };
}

/**
 * Review a flashcard (SM-2 Algorithm)
 * @param cardId - The card ID
 * @param quality - Quality of recall (0-5): 0=complete blackout, 5=perfect response
 */
export function reviewCard(cardId: string, quality: number): FlashcardProgress {
  const allProgress = getFlashcardProgress();
  let progress = allProgress.find(p => p.cardId === cardId);

  if (!progress) {
    progress = initializeCard(cardId);
  }

  const now = new Date();

  // Update ease factor based on quality (SM-2 algorithm)
  progress.easeFactor = Math.max(
    MIN_EASE_FACTOR,
    progress.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Update repetitions and interval
  if (quality < 3) {
    // Incorrect - reset
    progress.repetitions = 0;
    progress.interval = INITIAL_INTERVAL;
    progress.status = 'learning';
    progress.incorrectCount++;
  } else {
    // Correct
    progress.repetitions++;
    progress.correctCount++;

    if (progress.repetitions === 1) {
      progress.interval = INITIAL_INTERVAL;
      progress.status = 'learning';
    } else if (progress.repetitions === 2) {
      progress.interval = 6;
      progress.status = 'review';
    } else {
      progress.interval = Math.round(progress.interval * progress.easeFactor);
      progress.status = progress.interval >= 30 ? 'mastered' : 'review';
    }
  }

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + progress.interval);

  progress.lastReviewed = now.toISOString();
  progress.nextReview = nextReview.toISOString();

  // Update or add progress
  const index = allProgress.findIndex(p => p.cardId === cardId);
  if (index !== -1) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }

  saveFlashcardProgress(allProgress);
  return progress;
}

/**
 * Get cards due for review
 */
export function getCardsDueForReview(): FlashcardProgress[] {
  const allProgress = getFlashcardProgress();
  const now = new Date();

  return allProgress.filter(progress => {
    const nextReview = new Date(progress.nextReview);
    return nextReview <= now && progress.status !== 'mastered';
  });
}

/**
 * Get cards by status
 */
export function getCardsByStatus(status: FlashcardProgress['status']): FlashcardProgress[] {
  const allProgress = getFlashcardProgress();
  return allProgress.filter(p => p.status === status);
}

/**
 * Add vocabulary word as flashcard
 */
export function addVocabularyAsFlashcard(word: string): FlashcardProgress | null {
  const vocabWord = vocabulary.find(v => v.word === word);
  if (!vocabWord) return null;

  const cardId = `vocab-${vocabWord.word}`;
  const existing = getCardProgress(cardId);
  
  if (existing) {
    return existing;
  }

  const progress = initializeCard(cardId);
  const allProgress = getFlashcardProgress();
  allProgress.push(progress);
  saveFlashcardProgress(allProgress);

  return progress;
}

/**
 * Convert vocabulary word to flashcard
 */
export function vocabularyToFlashcard(word: string): Flashcard | null {
  const vocabWord = vocabulary.find(v => v.word === word);
  if (!vocabWord) return null;

  const translations = Array.isArray(vocabWord.translation) ? vocabWord.translation : [vocabWord.translation];
  return {
    id: `vocab-${vocabWord.word}`,
    word: vocabWord.word,
    translation: translations.join(', '),
    category: vocabWord.category,
    pronunciation: vocabWord.pronunciation,
    example: vocabWord.example,
  };
}

/**
 * Get flashcard data
 */
export function getFlashcard(cardId: string): Flashcard | null {
  if (cardId.startsWith('vocab-')) {
    const word = cardId.replace('vocab-', '');
    return vocabularyToFlashcard(word);
  }
  return null;
}

/**
 * Get all user flashcards
 */
export function getAllUserFlashcards(): Flashcard[] {
  const allProgress = getFlashcardProgress();
  const flashcards: Flashcard[] = [];

  allProgress.forEach(progress => {
    const card = getFlashcard(progress.cardId);
    if (card) {
      flashcards.push(card);
    }
  });

  return flashcards;
}

/**
 * Get statistics
 */
export function getFlashcardStats(): {
  total: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  dueForReview: number;
} {
  const allProgress = getFlashcardProgress();
  const due = getCardsDueForReview();

  return {
    total: allProgress.length,
    new: allProgress.filter(p => p.status === 'new').length,
    learning: allProgress.filter(p => p.status === 'learning').length,
    review: allProgress.filter(p => p.status === 'review').length,
    mastered: allProgress.filter(p => p.status === 'mastered').length,
    dueForReview: due.length,
  };
}
