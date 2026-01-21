/**
 * Tipos para el sistema de progreso y gamificación
 */

export interface UserProgress {
  userId?: string;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  achievements: Achievement[];
  completedSections: CompletedSection[];
  studyStreak: StudyStreak;
  stats: UserStats;
  lastUpdated: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'games' | 'exams' | 'streak' | 'special';
  unlockedAt: string;
  xpReward: number;
}

export interface CompletedSection {
  sectionId: string;
  sectionName: string;
  completedAt: string;
  xpEarned: number;
  progress: number; // 0-100
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}

export interface UserStats {
  totalStudyTime: number; // en minutos
  lessonsCompleted: number;
  gamesPlayed: number;
  examsTaken: number;
  vocabularyLearned: number;
  exercisesCompleted: number;
}

export interface XPTransaction {
  id: string;
  amount: number;
  reason: string;
  section: string;
  timestamp: string;
}
