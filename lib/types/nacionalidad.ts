/**
 * أنواع البيانات لقسم الجنسية الإسبانية
 */

export type ExamType = 'CCSE' | 'DELE-A2';
export type LessonCategory = 'constitucion' | 'cultura' | 'historia' | 'geografia' | 'tramites' | 'economia';

export interface PracticeQuestion {
  id: string;
  question: string;
  question_ar?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  explanation_ar?: string;
}

export interface NacionalidadLesson {
  id: string;
  title: string;
  category: LessonCategory;
  content: string;
  summary?: string;
  keyPoints: string[];
  createdAt: string;
  isFree?: boolean;
  questions?: PracticeQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  question_ar?: string;
  type: 'multiple-choice' | 'true-false' | 'matching';
  options?: string[];
  correctAnswer: string | boolean;
  explanation?: string;
  explanation_ar?: string;
  category: LessonCategory;
  examType: ExamType;
}

export interface ExamAttempt {
  id: string;
  examType: ExamType;
  questions: ExamQuestion[];
  answers: Record<string, string | boolean>;
  score: number;
  totalQuestions: number;
  timeSpent: number; // بالثواني
  completedAt: string;
  incorrectQuestions: string[]; // IDs للأسئلة الخاطئة
}

export interface UserHistory {
  attempts: ExamAttempt[];
  lastAttempt?: ExamAttempt;
  bestScore?: {
    CCSE: number;
    'DELE-A2': number;
  };
}

export interface ErrorReview {
  questionId: string;
  question: ExamQuestion;
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  explanation: string;
  reviewedAt: string;
  reviewCount: number;
}