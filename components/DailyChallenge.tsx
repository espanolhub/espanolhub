'use client';

import { useState, useEffect } from 'react';
import { Target, Trophy, CheckCircle } from 'lucide-react';
import { getDailyChallenge, updateChallengeProgress, type DailyChallenge } from '@/lib/utils/dailyChallenge';
import { addXP } from '@/lib/utils/progress';
import { playSuccessSound } from '@/lib/utils/sounds';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);

  useEffect(() => {
    const dailyChallenge = getDailyChallenge();
    setChallenge(dailyChallenge);
    
    // Listen for challenge updates
    const handleUpdate = () => {
      const updatedChallenge = getDailyChallenge();
      setChallenge(updatedChallenge);
    };
    
    window.addEventListener('dailyChallengeUpdated', handleUpdate);
    return () => window.removeEventListener('dailyChallengeUpdated', handleUpdate);
  }, []);

  if (!challenge) return null;

  const progressPercentage = (challenge.progress / challenge.target) * 100;

  // Floating slim progress bar (top-right)
  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 shadow-2xl modern-card">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">🔥</span>
            <div className="text-sm font-semibold text-gray-800">Misión del Día</div>
          </div>
          <div className="w-48">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 bg-gray-900 rounded-full transition-all" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
            </div>
          </div>
          <div className="text-sm text-gray-700 font-medium">{challenge.progress}/{challenge.target}</div>
        </div>
      </div>
    </>
  );
}
