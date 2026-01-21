/**
 * Daily Challenge System
 * Generates daily missions for users
 */

import { addXP } from './progress';
import { playSuccessSound } from './sounds';

export interface DailyChallenge {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  target: number;
  category: string;
  xpReward: number;
  completed: boolean;
  progress: number;
  date: string; // YYYY-MM-DD format
}

const CHALLENGE_STORAGE_KEY = 'daily-challenge';

const challengeTemplates = [
  {
    id: 'learn-sentences',
    title: 'Aprende {target} frases sobre {category}',
    titleAr: 'تعلم {target} جملة عن {category}',
    description: 'Completa {target} frases para obtener {xp} XP',
    descriptionAr: 'أكمل {target} جملة للحصول على {xp} نقطة',
    category: 'home',
    categoryAr: 'المنزل',
    xpReward: 50,
  },
  {
    id: 'learn-vocabulary',
    title: 'Aprende {target} palabras nuevas',
    titleAr: 'تعلم {target} كلمة جديدة',
    description: 'Estudia {target} palabras para obtener {xp} XP',
    descriptionAr: 'ادرس {target} كلمة للحصول على {xp} نقطة',
    category: 'vocabulary',
    categoryAr: 'المفردات',
    xpReward: 30,
  },
  {
    id: 'complete-exercises',
    title: 'Completa {target} ejercicios',
    titleAr: 'أكمل {target} تمرين',
    description: 'Resuelve {target} ejercicios para obtener {xp} XP',
    descriptionAr: 'حل {target} تمرين للحصول على {xp} نقطة',
    category: 'exercises',
    categoryAr: 'التمارين',
    xpReward: 40,
  },
  {
    id: 'play-games',
    title: 'Juega {target} juegos',
    titleAr: 'العب {target} لعبة',
    description: 'Completa {target} juegos para obtener {xp} XP',
    descriptionAr: 'أكمل {target} لعبة للحصول على {xp} نقطة',
    category: 'games',
    categoryAr: 'الألعاب',
    xpReward: 25,
  },
];

const categoryOptions = [
  { key: 'home', label: 'La Casa', labelAr: 'المنزل' },
  { key: 'travel', label: 'Viajes', labelAr: 'السفر' },
  { key: 'work', label: 'Trabajo', labelAr: 'العمل' },
  { key: 'food', label: 'Comida', labelAr: 'الطعام' },
  { key: 'social', label: 'Social', labelAr: 'الاجتماعي' },
];

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

/**
 * Generate a random daily challenge
 */
export function generateDailyChallenge(): DailyChallenge {
  const template = challengeTemplates[Math.floor(Math.random() * challengeTemplates.length)];
  const target = template.id === 'learn-sentences' ? 5 : template.id === 'learn-vocabulary' ? 10 : 3;
  
  let category = template.category;
  let categoryAr = template.categoryAr;
  
  if (template.id === 'learn-sentences') {
    const randomCategory = categoryOptions[Math.floor(Math.random() * categoryOptions.length)];
    category = randomCategory.label;
    categoryAr = randomCategory.labelAr;
  }
  
  const challenge: DailyChallenge = {
    id: template.id,
    title: template.title.replace('{target}', String(target)).replace('{category}', category),
    titleAr: template.titleAr.replace('{target}', String(target)).replace('{category}', categoryAr),
    description: template.description.replace('{target}', String(target)).replace('{xp}', String(template.xpReward)),
    descriptionAr: template.descriptionAr.replace('{target}', String(target)).replace('{xp}', String(template.xpReward)),
    target: target,
    category: category,
    xpReward: template.xpReward,
    completed: false,
    progress: 0,
    date: getTodayDate(),
  };
  
  return challenge;
}

/**
 * Get today's challenge (or generate a new one)
 */
export function getDailyChallenge(): DailyChallenge {
  if (typeof window === 'undefined') {
    return generateDailyChallenge();
  }
  
  try {
    const stored = localStorage.getItem(CHALLENGE_STORAGE_KEY);
    if (stored) {
      const challenge: DailyChallenge = JSON.parse(stored);
      // Check if challenge is for today
      if (challenge.date === getTodayDate()) {
        return challenge;
      }
    }
  } catch (error) {
    console.error('Error loading daily challenge:', error);
  }
  
  // Generate new challenge for today
  const newChallenge = generateDailyChallenge();
  saveDailyChallenge(newChallenge);
  return newChallenge;
}

/**
 * Save daily challenge to localStorage
 */
export function saveDailyChallenge(challenge: DailyChallenge): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challenge));
  } catch (error) {
    console.error('Error saving daily challenge:', error);
  }
}

/**
 * Update challenge progress
 * @param challengeType - Type of challenge: 'learn-sentences', 'learn-vocabulary', 'complete-exercises', 'play-games'
 * @param amount - Amount to add to progress (default: 1)
 * @param category - Optional category filter (for sentences)
 */
export function updateChallengeProgress(challengeType: string, amount: number = 1, category?: string): void {
  if (typeof window === 'undefined') return;
  
  const challenge = getDailyChallenge();
  if (challenge.completed) return;
  
  // Check if challenge type matches
  if (challenge.id !== challengeType) return;
  
  // For sentence challenges, check category match if provided
  if (challengeType === 'learn-sentences' && category && challenge.category !== category) {
    return; // Category doesn't match, don't update
  }
  
  const oldProgress = challenge.progress;
  challenge.progress = Math.min(challenge.progress + amount, challenge.target);
  
  if (challenge.progress >= challenge.target && !challenge.completed) {
    challenge.completed = true;
    // Add XP reward when challenge is completed
    addXP(challenge.xpReward, `Misión del Día: ${challenge.title}`, 'daily-challenge');
    
    // Play success sound
    playSuccessSound();
  }
  
  saveDailyChallenge(challenge);
  
  // Trigger a custom event to notify DailyChallenge component to refresh
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dailyChallengeUpdated'));
  }
}

/**
 * Reset challenge progress (for testing)
 */
export function resetDailyChallenge(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CHALLENGE_STORAGE_KEY);
}
