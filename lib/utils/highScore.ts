/**
 * High Score Management - LocalStorage based
 */

export interface HighScore {
  gameId: string;
  score: number;
  timestamp: number;
}

const STORAGE_KEY = 'espanol-games-highscores';

export function getHighScore(gameId: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const scores = getHighScores();
    const gameScore = scores.find(s => s.gameId === gameId);
    return gameScore?.score || 0;
  } catch {
    return 0;
  }
}

export function setHighScore(gameId: string, score: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const scores = getHighScores();
    const existingIndex = scores.findIndex(s => s.gameId === gameId);
    
    if (existingIndex >= 0) {
      if (score > scores[existingIndex].score) {
        scores[existingIndex] = { gameId, score, timestamp: Date.now() };
      }
    } else {
      scores.push({ gameId, score, timestamp: Date.now() });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Error saving high score:', error);
  }
}

function getHighScores(): HighScore[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHighScores(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
