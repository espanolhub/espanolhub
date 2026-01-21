/**
 * Motivational Messages System
 * Shows encouraging messages in Spanish and Arabic
 */

export interface MotivationalMessage {
  spanish: string;
  arabic: string;
  category: 'encouragement' | 'progress' | 'achievement' | 'learning';
}

const motivationalMessages: MotivationalMessage[] = [
  { spanish: '¡Sigue así!', arabic: 'استمر هكذا!', category: 'encouragement' },
  { spanish: '¡Estás haciendo un gran trabajo!', arabic: 'أنت تقوم بعمل رائع!', category: 'encouragement' },
  { spanish: '¡Cada día aprendes más!', arabic: 'كل يوم تتعلم المزيد!', category: 'progress' },
  { spanish: '¡Eres increíble!', arabic: 'أنت رائع!', category: 'encouragement' },
  { spanish: '¡No te rindas!', arabic: 'لا تستسلم!', category: 'encouragement' },
  { spanish: '¡Vas por buen camino!', arabic: 'أنت في الطريق الصحيح!', category: 'progress' },
  { spanish: '¡Lo estás logrando!', arabic: 'أنت تنجح!', category: 'achievement' },
  { spanish: '¡Sigue practicando!', arabic: 'استمر في التدريب!', category: 'learning' },
  { spanish: '¡Estás mejorando cada día!', arabic: 'أنت تتحسن كل يوم!', category: 'progress' },
  { spanish: '¡Eres un estudiante excelente!', arabic: 'أنت طالب ممتاز!', category: 'achievement' },
  { spanish: '¡Tu esfuerzo se nota!', arabic: 'جهدك واضح!', category: 'achievement' },
  { spanish: '¡Sigue adelante!', arabic: 'تابع التقدم!', category: 'encouragement' },
  { spanish: '¡Cada paso cuenta!', arabic: 'كل خطوة مهمة!', category: 'progress' },
  { spanish: '¡Estás aprendiendo rápido!', arabic: 'أنت تتعلم بسرعة!', category: 'learning' },
  { spanish: '¡Sigue así, estás genial!', arabic: 'استمر، أنت رائع!', category: 'encouragement' },
  { spanish: '¡Tu dedicación es admirable!', arabic: 'تفانيك جدير بالإعجاب!', category: 'achievement' },
  { spanish: '¡Estás en el camino correcto!', arabic: 'أنت في المسار الصحيح!', category: 'progress' },
  { spanish: '¡No te detengas ahora!', arabic: 'لا تتوقف الآن!', category: 'encouragement' },
  { spanish: '¡Estás progresando muy bien!', arabic: 'أنت تتقدم بشكل جيد جداً!', category: 'progress' },
  { spanish: '¡Sigue aprendiendo!', arabic: 'استمر في التعلم!', category: 'learning' },
];

/**
 * Get a random motivational message
 */
export function getRandomMotivationalMessage(): MotivationalMessage {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

/**
 * Get a motivational message by category
 */
export function getMotivationalMessageByCategory(category: MotivationalMessage['category']): MotivationalMessage {
  const filtered = motivationalMessages.filter(msg => msg.category === category);
  if (filtered.length === 0) return getRandomMotivationalMessage();
  return filtered[Math.floor(Math.random() * filtered.length)];
}
