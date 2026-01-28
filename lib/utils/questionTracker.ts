/**
 * Question Tracker for Exámenes Section
 * Sistema para evitar preguntas repetidas
 */

interface QuestionAttempt {
  questionId: string;
  category: string;
  level: string;
  timestamp: number;
  isCorrect: boolean;
}

interface UserQuestionHistory {
  attempts: QuestionAttempt[];
  lastReset: number;
}

const STORAGE_KEY = 'exam_question_history';
const RESET_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export class QuestionTracker {
  private static getHistory(): UserQuestionHistory {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return { attempts: [], lastReset: Date.now() };
      }
      
      const history = JSON.parse(stored) as UserQuestionHistory;
      
      // Reset history if it's older than 7 days
      if (Date.now() - history.lastReset > RESET_INTERVAL) {
        return { attempts: [], lastReset: Date.now() };
      }
      
      return history;
    } catch (error) {
      console.error('Error loading question history:', error);
      return { attempts: [], lastReset: Date.now() };
    }
  }

  private static saveHistory(history: UserQuestionHistory): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving question history:', error);
    }
  }

  /**
   * Get questions that haven't been seen recently
   */
  static getUnseenQuestions(
    allQuestions: any[], 
    category: string, 
    level: string,
    maxQuestions: number = 20
  ): any[] {
    const history = this.getHistory();
    const now = Date.now();
    
    // Filter out questions seen in the last 24 hours
    const recentThreshold = 24 * 60 * 60 * 1000; // 24 hours
    const seenQuestionIds = new Set(
      history.attempts
        .filter(attempt => 
          attempt.category === category && 
          attempt.level === level &&
          (now - attempt.timestamp) < recentThreshold
        )
        .map(attempt => attempt.questionId)
    );

    // Filter out recently seen questions
    const unseenQuestions = allQuestions.filter(q => !seenQuestionIds.has(q.id));
    
    // If we don't have enough unseen questions, include some older ones
    let availableQuestions = unseenQuestions;
    if (unseenQuestions.length < maxQuestions) {
      const olderThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days
      const olderQuestionIds = new Set(
        history.attempts
          .filter(attempt => 
            attempt.category === category && 
            attempt.level === level &&
            (now - attempt.timestamp) >= recentThreshold &&
            (now - attempt.timestamp) < olderThreshold
          )
          .map(attempt => attempt.questionId)
      );

      const olderQuestions = allQuestions.filter(q => 
        !seenQuestionIds.has(q.id) && !olderQuestionIds.has(q.id)
      );
      
      availableQuestions = [...unseenQuestions, ...olderQuestions];
    }

    // Shuffle and select questions
    const shuffled = this.shuffleArray(availableQuestions);
    return shuffled.slice(0, Math.min(maxQuestions, shuffled.length));
  }

  /**
   * Record a question attempt
   */
  static recordAttempt(
    questionId: string, 
    category: string, 
    level: string, 
    isCorrect: boolean
  ): void {
    const history = this.getHistory();
    
    const attempt: QuestionAttempt = {
      questionId,
      category,
      level,
      timestamp: Date.now(),
      isCorrect
    };

    history.attempts.push(attempt);
    
    // Clean up old attempts (older than 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    history.attempts = history.attempts.filter(a => a.timestamp > thirtyDaysAgo);
    
    this.saveHistory(history);
  }

  /**
   * Get statistics for a user
   */
  static getStats(category?: string, level?: string): {
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
    recentAttempts: number;
  } {
    const history = this.getHistory();
    const now = Date.now();
    const recentThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days

    let filteredAttempts = history.attempts;
    
    if (category) {
      filteredAttempts = filteredAttempts.filter(a => a.category === category);
    }
    
    if (level) {
      filteredAttempts = filteredAttempts.filter(a => a.level === level);
    }

    const recentAttempts = filteredAttempts.filter(a => (now - a.timestamp) < recentThreshold);
    const correctAnswers = filteredAttempts.filter(a => a.isCorrect).length;

    return {
      totalAttempts: filteredAttempts.length,
      correctAnswers,
      accuracy: filteredAttempts.length > 0 ? Math.round((correctAnswers / filteredAttempts.length) * 100) : 0,
      recentAttempts: recentAttempts.length
    };
  }

  /**
   * Reset user history
   */
  static resetHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting question history:', error);
    }
  }

  /**
   * Utility function to shuffle array
   */
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Get questions that user got wrong for spaced repetition
   */
  static getWrongQuestions(
    allQuestions: any[], 
    category: string, 
    level: string,
    maxQuestions: number = 10
  ): any[] {
    const history = this.getHistory();
    const now = Date.now();
    
    // Get questions answered incorrectly in the last 3 days
    const recentThreshold = 3 * 24 * 60 * 60 * 1000; // 3 days
    const wrongQuestionIds = new Set(
      history.attempts
        .filter(attempt => 
          !attempt.isCorrect &&
          attempt.category === category && 
          attempt.level === level &&
          (now - attempt.timestamp) < recentThreshold
        )
        .map(attempt => attempt.questionId)
    );

    const wrongQuestions = allQuestions.filter(q => wrongQuestionIds.has(q.id));
    const shuffled = this.shuffleArray(wrongQuestions);
    
    return shuffled.slice(0, Math.min(maxQuestions, shuffled.length));
  }
}
