/**
 * Sistema de progreso y gamificación
 * Gestiona XP, niveles, logros y estadísticas del usuario
 */

import type { UserProgress, Achievement, CompletedSection, XPTransaction, UserStats } from '../types/progress';

const STORAGE_KEY_PROGRESS = 'espanol-user-progress';
const STORAGE_KEY_XP_TRANSACTIONS = 'espanol-xp-transactions';
const STORAGE_KEY_LOCAL_USER = 'espanol-local-user-id';

function getStorageKeyForCurrentUser(): string {
  if (typeof window === 'undefined') return STORAGE_KEY_PROGRESS;
  try {
    const uid = localStorage.getItem(STORAGE_KEY_LOCAL_USER);
    if (uid) return `${STORAGE_KEY_PROGRESS}:${uid}`;
  } catch (e) {}
  return STORAGE_KEY_PROGRESS;
}

// Configuración de niveles (XP requerido para cada nivel)
const LEVEL_XP_REQUIREMENTS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 3500,
  8: 5500,
  9: 8000,
  10: 11000,
  11: 15000,
  12: 20000,
  13: 26000,
  14: 33000,
  15: 41000,
  16: 50000,
  17: 60000,
  18: 71000,
  19: 83000,
  20: 100000,
};

// Logros predefinidos
const ACHIEVEMENTS_DEFINITIONS: Achievement[] = [
  { id: 'first-lesson', title: 'Primera Lección', description: 'Completa tu primera lección', icon: '📚', category: 'learning', unlockedAt: '', xpReward: 50 },
  { id: 'first-game', title: 'Primer Juego', description: 'Juega tu primer juego educativo', icon: '🎮', category: 'games', unlockedAt: '', xpReward: 50 },
  { id: 'first-exam', title: 'Primer Examen', description: 'Completa tu primer examen', icon: '📝', category: 'exams', unlockedAt: '', xpReward: 100 },
  { id: 'streak-3', title: 'Tres Días', description: 'Estudia 3 días consecutivos', icon: '🔥', category: 'streak', unlockedAt: '', xpReward: 100 },
  { id: 'streak-7', title: 'Semana Completa', description: 'Estudia 7 días consecutivos', icon: '🔥🔥', category: 'streak', unlockedAt: '', xpReward: 300 },
  { id: 'streak-30', title: 'Mes Completo', description: 'Estudia 30 días consecutivos', icon: '🔥🔥🔥', category: 'streak', unlockedAt: '', xpReward: 1000 },
  { id: 'level-5', title: 'Nivel 5', description: 'Alcanza el nivel 5', icon: '⭐', category: 'special', unlockedAt: '', xpReward: 200 },
  { id: 'level-10', title: 'Nivel 10', description: 'Alcanza el nivel 10', icon: '⭐⭐', category: 'special', unlockedAt: '', xpReward: 500 },
  { id: 'level-20', title: 'Nivel 20', description: 'Alcanza el nivel 20', icon: '⭐⭐⭐', category: 'special', unlockedAt: '', xpReward: 1500 },
  { id: 'vocab-100', title: '100 Palabras', description: 'Aprende 100 palabras de vocabulario', icon: '📖', category: 'learning', unlockedAt: '', xpReward: 200 },
  { id: 'perfect-game', title: 'Juego Perfecto', description: 'Obtén 100% en un juego', icon: '💯', category: 'games', unlockedAt: '', xpReward: 150 },
  { id: 'exam-master', title: 'Maestro de Exámenes', description: 'Obtén más de 90% en un examen', icon: '🏆', category: 'exams', unlockedAt: '', xpReward: 300 },
  { id: 'ccse-apto', title: 'Apto CCSE', description: 'Aprobaste el simulador CCSE', icon: '🎓', category: 'exams', unlockedAt: '', xpReward: 0 },
];

/**
 * Obtener el progreso del usuario
 */
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  try {
    const key = getStorageKeyForCurrentUser();
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading user progress:', error);
  }

  return getDefaultProgress();
}

/**
 * Progreso por defecto
 */
function getDefaultProgress(): UserProgress {
  return {
    totalXP: 0,
    level: 1,
    currentLevelXP: 0,
    nextLevelXP: LEVEL_XP_REQUIREMENTS[2],
    achievements: [],
    completedSections: [],
    studyStreak: {
      current: 0,
      longest: 0,
      lastStudyDate: '',
    },
    stats: {
      totalStudyTime: 0,
      lessonsCompleted: 0,
      gamesPlayed: 0,
      examsTaken: 0,
      vocabularyLearned: 0,
      exercisesCompleted: 0,
    },
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Guardar progreso del usuario
 */
function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    progress.lastUpdated = new Date().toISOString();
    const key = getStorageKeyForCurrentUser();
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
}

/**
 * Associate a Clerk user id with local progress storage. This will migrate any anonymous progress
 * saved under the generic key to a user-specific key so progress persists across devices.
 */
export function setLocalUserId(userId: string) {
  if (typeof window === 'undefined') return;
  try {
    const prev = localStorage.getItem(STORAGE_KEY_PROGRESS);
    const userKey = `${STORAGE_KEY_PROGRESS}:${userId}`;
    // If anonymous progress exists and user-specific doesn't, migrate it
    if (prev && !localStorage.getItem(userKey)) {
      localStorage.setItem(userKey, prev);
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    }
    localStorage.setItem(STORAGE_KEY_LOCAL_USER, userId);
    // Attempt to persist progress on server
    try {
      const progress = localStorage.getItem(userKey);
      if (progress) {
        fetch('/api/progress/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ progress: JSON.parse(progress) }) })
          .catch(() => {});
      }
    } catch (e) {}
  } catch (e) {
    console.error('Error setting local user id:', e);
  }
}

/**
 * Calcular nivel basado en XP
 */
function calculateLevel(totalXP: number): { level: number; currentLevelXP: number; nextLevelXP: number } {
  let level = 1;
  let currentLevelXP = totalXP;
  let nextLevelXP = LEVEL_XP_REQUIREMENTS[2];

  for (let i = 20; i >= 1; i--) {
    const required = LEVEL_XP_REQUIREMENTS[i];
    if (totalXP >= required) {
      level = i;
      currentLevelXP = totalXP - required;
      nextLevelXP = LEVEL_XP_REQUIREMENTS[i + 1] || LEVEL_XP_REQUIREMENTS[20];
      break;
    }
  }

  return { level, currentLevelXP, nextLevelXP };
}

/**
 * Agregar XP al usuario
 */
export function addXP(amount: number, reason: string, section: string): UserProgress {
  const progress = getUserProgress();
  const oldLevel = progress.level;
  
  progress.totalXP += amount;
  
  const { level, currentLevelXP, nextLevelXP } = calculateLevel(progress.totalXP);
  progress.level = level;
  progress.currentLevelXP = currentLevelXP;
  progress.nextLevelXP = nextLevelXP;

  // Registrar transacción
  const transaction: XPTransaction = {
    id: `xp-${Date.now()}`,
    amount,
    reason,
    section,
    timestamp: new Date().toISOString(),
  };
  addXPTransaction(transaction);

  // Verificar si subió de nivel
  if (level > oldLevel) {
    checkLevelAchievements(progress, level);
  }

  saveProgress(progress);
  return progress;
}

/**
 * Agregar transacción de XP
 */
function addXPTransaction(transaction: XPTransaction): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY_XP_TRANSACTIONS);
    const transactions: XPTransaction[] = stored ? JSON.parse(stored) : [];
    transactions.push(transaction);
    
    // Mantener solo las últimas 100 transacciones
    if (transactions.length > 100) {
      transactions.splice(0, transactions.length - 100);
    }
    
    localStorage.setItem(STORAGE_KEY_XP_TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving XP transaction:', error);
  }
}

/**
 * Obtener transacciones de XP
 */
export function getXPTransactions(limit: number = 20): XPTransaction[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY_XP_TRANSACTIONS);
    if (stored) {
      const transactions: XPTransaction[] = JSON.parse(stored);
      return transactions.slice(-limit).reverse();
    }
  } catch (error) {
    console.error('Error reading XP transactions:', error);
  }

  return [];
}

/**
 * Actualizar racha de estudio
 */
export function updateStudyStreak(): UserProgress {
  const progress = getUserProgress();
  const today = new Date().toISOString().split('T')[0];
  const lastStudyDate = progress.studyStreak.lastStudyDate.split('T')[0];

  if (lastStudyDate === today) {
    // Ya estudió hoy, no hacer nada
    return progress;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastStudyDate === yesterdayStr) {
    // Continúa la racha
    progress.studyStreak.current += 1;
  } else if (lastStudyDate !== '') {
    // Racha rota, empezar de nuevo
    if (progress.studyStreak.current > progress.studyStreak.longest) {
      progress.studyStreak.longest = progress.studyStreak.current;
    }
    progress.studyStreak.current = 1;
  } else {
    // Primera vez
    progress.studyStreak.current = 1;
  }

  progress.studyStreak.lastStudyDate = new Date().toISOString();

  // Verificar logros de racha
  checkStreakAchievements(progress);

  saveProgress(progress);
  return progress;
}

/**
 * Verificar y desbloquear logros
 */
function checkAchievement(progress: UserProgress, achievementId: string): boolean {
  if (progress.achievements.some(a => a.id === achievementId)) {
    return false; // Ya desbloqueado
  }

  const achievementDef = ACHIEVEMENTS_DEFINITIONS.find(a => a.id === achievementId);
  if (!achievementDef) return false;

  const achievement: Achievement = {
    ...achievementDef,
    unlockedAt: new Date().toISOString(),
  };

  progress.achievements.push(achievement);
  progress.totalXP += achievement.xpReward;

  const { level, currentLevelXP, nextLevelXP } = calculateLevel(progress.totalXP);
  progress.level = level;
  progress.currentLevelXP = currentLevelXP;
  progress.nextLevelXP = nextLevelXP;

  saveProgress(progress);
  return true; // Nuevo logro desbloqueado
}

/**
 * Verificar logros de nivel
 */
function checkLevelAchievements(progress: UserProgress, level: number): void {
  if (level === 5) checkAchievement(progress, 'level-5');
  if (level === 10) checkAchievement(progress, 'level-10');
  if (level === 20) checkAchievement(progress, 'level-20');
}

/**
 * Verificar logros de racha
 */
function checkStreakAchievements(progress: UserProgress): void {
  const streak = progress.studyStreak.current;
  if (streak === 3) checkAchievement(progress, 'streak-3');
  if (streak === 7) checkAchievement(progress, 'streak-7');
  if (streak === 30) checkAchievement(progress, 'streak-30');
}

/**
 * Desbloquear logro específico
 */
export function unlockAchievement(achievementId: string): boolean {
  const progress = getUserProgress();
  return checkAchievement(progress, achievementId);
}

/**
 * Actualizar estadísticas
 */
export function updateStats(updates: Partial<UserStats>): UserProgress {
  const progress = getUserProgress();
  progress.stats = { ...progress.stats, ...updates };
  saveProgress(progress);
  return progress;
}

/**
 * Marcar sección como completada
 */
export function completeSection(sectionId: string, sectionName: string, xpEarned: number, progressPercent: number = 100): UserProgress {
  const userProgress = getUserProgress();
  
  // Verificar si ya está completada
  const existing = userProgress.completedSections.find(s => s.sectionId === sectionId);
  if (existing) {
    // Actualizar progreso si es mayor
    if (progressPercent > existing.progress) {
      existing.progress = progressPercent;
      existing.completedAt = new Date().toISOString();
      saveProgress(userProgress);
    }
    return userProgress;
  }

  // Agregar nueva sección completada
  const completedSection: CompletedSection = {
    sectionId,
    sectionName,
    completedAt: new Date().toISOString(),
    xpEarned,
    progress: progressPercent,
  };

  userProgress.completedSections.push(completedSection);
  
  // Agregar XP
  addXP(xpEarned, `Completar: ${sectionName}`, sectionId);
  
  saveProgress(userProgress);
  return userProgress;
}

/**
 * Obtener logros disponibles (no desbloqueados)
 */
export function getAvailableAchievements(): Achievement[] {
  const progress = getUserProgress();
  const unlockedIds = new Set(progress.achievements.map(a => a.id));
  return ACHIEVEMENTS_DEFINITIONS.filter(a => !unlockedIds.has(a.id));
}
