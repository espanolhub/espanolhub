'use client';

import { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Award } from 'lucide-react';
import { getUserProgress, updateStudyStreak } from '@/lib/utils/progress';
import type { UserProgress } from '@/lib/types/progress';

export default function ProgressDisplay() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [animatedPercent, setAnimatedPercent] = useState<number | null>(null);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    // Actualizar racha al cargar
    const updated = updateStudyStreak();
    setProgress(updated);
  }, []);

  useEffect(() => {
    const handleXP = () => {
      // Refresh progress from storage
      const updated = getUserProgress();
      setProgress(updated);
      // compute percent
      const levelStartXP = updated.level > 1 ? updated.totalXP - updated.currentLevelXP : 0;
      const levelXPNeeded = updated.nextLevelXP - levelStartXP;
      const progressPercent = levelXPNeeded > 0 ? (updated.currentLevelXP / levelXPNeeded) * 100 : 0;
      // animate
      setAnimatedPercent(progressPercent);
      setGlow(true);
      // remove glow after 1.6s
      setTimeout(() => setGlow(false), 1600);
    };

    window.addEventListener('xpGained', handleXP as EventListener);
    return () => window.removeEventListener('xpGained', handleXP as EventListener);
  }, []);

  if (!progress) return null;

  const levelStartXP = progress.level > 1 
    ? progress.totalXP - progress.currentLevelXP 
    : 0;
  const levelXPNeeded = progress.nextLevelXP - levelStartXP;
  const progressPercent = levelXPNeeded > 0 
    ? (progress.currentLevelXP / levelXPNeeded) * 100 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4 mb-2 md:mb-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
          <span className="text-sm md:text-base font-semibold text-gray-900">Nivel {progress.level}</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500" />
            <span className="text-xs md:text-sm font-medium text-gray-700">{progress.totalXP.toLocaleString()} XP</span>
          </div>
          {progress.studyStreak.current > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-lg md:text-xl">🔥</span>
              <span className="text-xs md:text-sm font-medium text-gray-700">{progress.studyStreak.current}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 mb-1.5 md:mb-2">
        <div
          className={`xp-progress-bar bg-gray-900 h-1.5 md:h-2 rounded-full transition-all duration-800 ${glow ? 'shadow-[0_0_12px_rgba(17,24,39,0.6)]' : ''}`}
          style={{ width: `${Math.min(animatedPercent ?? progressPercent, 100)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-[10px] md:text-xs text-gray-500">
        <span>{progress.currentLevelXP.toLocaleString()} XP</span>
        <span>{progress.nextLevelXP.toLocaleString()} XP para nivel {progress.level + 1}</span>
      </div>

      {progress.achievements.length > 0 && (
        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1 mb-1.5 md:mb-2">
            <Award className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
            <span className="text-[10px] md:text-xs font-medium text-gray-600">
              {progress.achievements.length} Logro{progress.achievements.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {progress.achievements.slice(-3).map((achievement) => (
              <div
                key={achievement.id}
                className="text-sm md:text-base lg:text-lg"
                title={achievement.title}
              >
                {achievement.icon}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
