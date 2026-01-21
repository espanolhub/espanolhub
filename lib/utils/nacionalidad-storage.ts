/**
 * نظام حفظ سجل المستخدم والأخطاء لقسم الجنسية
 * يستخدم localStorage
 */

import { ExamAttempt, UserHistory, ErrorReview, ExamQuestion } from '../types/nacionalidad';

const STORAGE_KEY_HISTORY = 'nacionalidad-user-history';
const STORAGE_KEY_ERRORS = 'nacionalidad-user-errors';

/**
 * حفظ محاولة امتحان جديدة
 */
export function saveExamAttempt(attempt: ExamAttempt): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getUserHistory();
    history.attempts.push(attempt);
    history.lastAttempt = attempt;

    // تحديث أفضل نتيجة
    if (!history.bestScore) {
      history.bestScore = {
        CCSE: 0,
        'DELE-A2': 0,
      };
    }

    const percentage = (attempt.score / attempt.totalQuestions) * 100;
    const currentBest = history.bestScore[attempt.examType] || 0;
    if (percentage > currentBest) {
      history.bestScore[attempt.examType] = percentage;
    }

    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));

    // حفظ الأسئلة الخاطئة
    if (attempt.incorrectQuestions.length > 0) {
      saveErrors(attempt.incorrectQuestions, attempt.questions, attempt.answers);
    }
  } catch (error) {
    console.error('Error saving exam attempt:', error);
  }
}

/**
 * الحصول على سجل المستخدم
 */
export function getUserHistory(): UserHistory {
  if (typeof window === 'undefined') {
    return { attempts: [] };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading user history:', error);
  }

  return { attempts: [] };
}

/**
 * حفظ الأخطاء
 */
function saveErrors(
  incorrectQuestionIds: string[],
  questions: ExamQuestion[],
  userAnswers: Record<string, string | boolean>
): void {
  if (typeof window === 'undefined') return;

  try {
    const errors = getErrorReviews();
    
    incorrectQuestionIds.forEach(questionId => {
      const question = questions.find(q => q.id === questionId);
      if (!question) return;

      const existingError = errors.find(e => e.questionId === questionId);
      const userAnswer = userAnswers[questionId];

      if (existingError) {
        // تحديث الخطأ الموجود
        existingError.reviewCount += 1;
        existingError.reviewedAt = new Date().toISOString();
      } else {
        // إضافة خطأ جديد
        errors.push({
          questionId,
          question,
          userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation || 'لا يوجد شرح متاح',
          reviewedAt: new Date().toISOString(),
          reviewCount: 1,
        });
      }
    });

    localStorage.setItem(STORAGE_KEY_ERRORS, JSON.stringify(errors));
  } catch (error) {
    console.error('Error saving errors:', error);
  }
}

/**
 * الحصول على جميع الأخطاء
 */
export function getErrorReviews(): ErrorReview[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY_ERRORS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading error reviews:', error);
  }

  return [];
}

/**
 * حذف خطأ من السجل (بعد المراجعة)
 */
export function removeErrorReview(questionId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const errors = getErrorReviews();
    const filtered = errors.filter(e => e.questionId !== questionId);
    localStorage.setItem(STORAGE_KEY_ERRORS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing error review:', error);
  }
}

/**
 * مسح جميع السجلات
 */
export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    localStorage.removeItem(STORAGE_KEY_ERRORS);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}