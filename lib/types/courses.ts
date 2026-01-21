/**
 * Types for Learning Paths and Courses system
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'special';
  category: string;
  icon: string;
  color: string;
  estimatedDuration: number; // in minutes
  lessons: Lesson[];
  prerequisites?: string[]; // Course IDs
  order: number;
  isPro?: boolean;
  isFree?: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'alfabeto' | 'numeros' | 'lectura' | 'gramatica' | 'vocabulario' | 'juegos' | 'nacionalidad';
  contentId: string; // ID in the original data source
  order: number;
  estimatedDuration: number; // in minutes
  xpReward: number;
  isFree?: boolean;
}

export interface UserCourseProgress {
  courseId: string;
  completedLessons: string[]; // Lesson IDs
  currentLessonId?: string;
  startedAt: string;
  completedAt?: string;
  progressPercent: number;
  xpEarned: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetLevel: 'beginner' | 'intermediate' | 'advanced';
  courses: string[]; // Course IDs in order
  estimatedTotalDuration: number;
  // Optional UI accent/color for the learning path card
  accent?: string;
  color?: string;
}
