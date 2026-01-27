'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Target, TrendingUp, Award, Clock, CheckCircle } from 'lucide-react';

interface VocabularyProgressProps {
  userId?: string;
  category?: string;
}

interface ProgressData {
  totalWords: number;
  learnedWords: number;
  masteredWords: number;
  reviewWords: number;
  streak: number;
  bestStreak: number;
  studyTime: number;
  lastStudyDate: string;
  categoryProgress: Record<string, {
    total: number;
    learned: number;
    mastered: number;
  }>;
}

const VocabularyProgress: React.FC<VocabularyProgressProps> = ({ userId, category }) => {
  const [progress, setProgress] = useState<ProgressData>({
    totalWords: 0,
    learnedWords: 0,
    masteredWords: 0,
    reviewWords: 0,
    streak: 0,
    bestStreak: 0,
    studyTime: 0,
    lastStudyDate: '',
    categoryProgress: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load progress from localStorage or API
    const loadProgress = () => {
      try {
        const savedProgress = localStorage.getItem('vocabularyProgress');
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          setProgress(parsed);
        } else {
          // Initialize with default progress
          const defaultProgress: ProgressData = {
            totalWords: 1000,
            learnedWords: 0,
            masteredWords: 0,
            reviewWords: 0,
            streak: 0,
            bestStreak: 0,
            studyTime: 0,
            lastStudyDate: new Date().toISOString(),
            categoryProgress: {}
          };
          setProgress(defaultProgress);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [userId, category]);

  const updateProgress = (wordId: string, status: 'learned' | 'mastered' | 'review') => {
    setProgress(prev => {
      const updated = { ...prev };
      
      if (status === 'learned') {
        updated.learnedWords += 1;
      } else if (status === 'mastered') {
        updated.masteredWords += 1;
        updated.learnedWords = Math.max(0, updated.learnedWords - 1);
      } else if (status === 'review') {
        updated.reviewWords += 1;
      }
      
      // Update last study date
      updated.lastStudyDate = new Date().toISOString();
      
      // Save to localStorage
      localStorage.setItem('vocabularyProgress', JSON.stringify(updated));
      
      return updated;
    });
  };

  const getProgressPercentage = () => {
    if (progress.totalWords === 0) return 0;
    return Math.round(((progress.learnedWords + progress.masteredWords) / progress.totalWords) * 100);
  };

  const getMasteryPercentage = () => {
    if (progress.totalWords === 0) return 0;
    return Math.round((progress.masteredWords / progress.totalWords) * 100);
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStreakColor = () => {
    if (progress.streak >= 30) return 'text-purple-600';
    if (progress.streak >= 14) return 'text-blue-600';
    if (progress.streak >= 7) return 'text-green-600';
    if (progress.streak >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          Tu Progreso
        </h3>
        <div className={`flex items-center gap-1 ${getStreakColor()}`}>
          <Target className="w-5 h-5" />
          <span className="font-semibold">{progress.streak} días</span>
        </div>
      </div>

      {/* Main Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Total</span>
          </div>
          <div className="text-2xl font-bold text-purple-800">{progress.totalWords}</div>
          <div className="text-xs text-purple-600">Palabras</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Aprendidas</span>
          </div>
          <div className="text-2xl font-bold text-green-800">{progress.learnedWords}</div>
          <div className="text-xs text-green-600">Palabras</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Dominadas</span>
          </div>
          <div className="text-2xl font-bold text-blue-800">{progress.masteredWords}</div>
          <div className="text-xs text-blue-600">Palabras</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Tiempo</span>
          </div>
          <div className="text-2xl font-bold text-orange-800">{formatStudyTime(progress.studyTime)}</div>
          <div className="text-xs text-orange-600">Estudio</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso General</span>
            <span className="text-sm font-bold text-purple-600">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Dominio</span>
            <span className="text-sm font-bold text-blue-600">{getMasteryPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getMasteryPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Logros</h4>
        <div className="flex flex-wrap gap-2">
          {progress.streak >= 1 && (
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              📅 Primer Día
            </div>
          )}
          {progress.streak >= 7 && (
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              🔥 Semana Completa
            </div>
          )}
          {progress.streak >= 30 && (
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              👑 Mes Legendario
            </div>
          )}
          {progress.masteredWords >= 10 && (
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              🎚️ 10 Palabras Dominadas
            </div>
          )}
          {progress.masteredWords >= 50 && (
            <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
              🎓 50 Palabras Dominadas
            </div>
          )}
          {progress.masteredWords >= 100 && (
            <div className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
              🏆 100 Palabras Dominadas
            </div>
          )}
          {getProgressPercentage() >= 50 && (
            <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
              📈 Mitad del Camino
            </div>
          )}
          {getProgressPercentage() >= 100 && (
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-medium">
              🌟 Maestro del Vocabulario
            </div>
          )}
        </div>
      </div>

      {/* Study Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <h4 className="text-sm font-semibold text-purple-800 mb-2">💡 Consejo del Día</h4>
        <p className="text-sm text-purple-700">
          {progress.streak === 0 && "¡Empieza hoy tu racha de aprendizaje! Estudia solo 5 minutos al día."}
          {progress.streak > 0 && progress.streak < 7 && "¡Excelente racha! Mantén el momentum por una semana completa."}
          {progress.streak >= 7 && progress.streak < 30 && "¡Increíble! Una semana de estudio consecutivo. ¡Sigue así!"}
          {progress.streak >= 30 && "¡Eres una leyenda! Un mes completo de aprendizaje. ¡Comparte tu logro!"}
        </p>
      </div>
    </div>
  );
};

export default VocabularyProgress;
