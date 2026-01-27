'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, Eye, EyeOff, CheckCircle, XCircle, SkipForward, Brain } from 'lucide-react';
import EnhancedPronunciation from './EnhancedPronunciation';

interface VocabularyStudyModeProps {
  words: Array<{
    word: string;
    translation: string | string[];
    category: string;
    pronunciation?: string;
    example?: string;
  }>;
  onSessionComplete?: (stats: StudySessionStats) => void;
}

interface StudySessionStats {
  totalStudied: number;
  correctAnswers: number;
  timeSpent: number;
  wordsReviewed: string[];
}

type StudyMode = 'flashcard' | 'spaced-repetition' | 'quick-review';

const VocabularyStudyMode: React.FC<VocabularyStudyModeProps> = ({ 
  words, 
  onSessionComplete 
}) => {
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcard');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState<StudySessionStats>({
    totalStudied: 0,
    correctAnswers: 0,
    timeSpent: 0,
    wordsReviewed: []
  });
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [studyQueue, setStudyQueue] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [autoPlay, setAutoPlay] = useState(false);
  const [showExample, setShowExample] = useState(false);

  // Initialize study queue
  useEffect(() => {
    const queue = Array.from({ length: words.length }, (_, i) => i);
    setStudyQueue(shuffleArray(queue));
  }, [words]);

  // Update study time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionStats(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const currentWord = words[studyQueue[currentWordIndex]];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowTranslation(!showTranslation);
  };

  const handleMarkCorrect = () => {
    setSessionStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + 1,
      wordsReviewed: [...prev.wordsReviewed, currentWord.word]
    }));
    nextWord();
  };

  const handleMarkIncorrect = () => {
    setSessionStats(prev => ({
      ...prev,
      wordsReviewed: [...prev.wordsReviewed, currentWord.word]
    }));
    // Add word back to queue for review
    setStudyQueue(prev => [...prev, studyQueue[currentWordIndex]]);
    nextWord();
  };

  const handleSkip = () => {
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex < studyQueue.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsFlipped(false);
      setShowTranslation(false);
      setShowExample(false);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    onSessionComplete?.(sessionStats);
  };

  const resetSession = () => {
    const queue = Array.from({ length: words.length }, (_, i) => i);
    setStudyQueue(shuffleArray(queue));
    setCurrentWordIndex(0);
    setIsFlipped(false);
    setShowTranslation(false);
    setShowExample(false);
    setSessionStats({
      totalStudied: 0,
      correctAnswers: 0,
      timeSpent: 0,
      wordsReviewed: []
    });
    setStartTime(Date.now());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracy = () => {
    if (sessionStats.wordsReviewed.length === 0) return 0;
    return Math.round((sessionStats.correctAnswers / sessionStats.wordsReviewed.length) * 100);
  };

  if (!currentWord) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">No hay palabras disponibles</h3>
        <p className="text-gray-600">Por favor, selecciona una categoría con palabras para estudiar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Study Mode Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Modo de Estudio
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentWordIndex + 1} / {studyQueue.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentWordIndex + 1) / studyQueue.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            ⏱️ {formatTime(sessionStats.timeSpent)}
          </div>
          <div className="text-sm font-medium text-purple-600">
            🎯 {getAccuracy()}% precisión
          </div>
        </div>
      </div>

      {/* Study Mode Selection */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setStudyMode('flashcard')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            studyMode === 'flashcard'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Flashcards
        </button>
        <button
          onClick={() => setStudyMode('spaced-repetition')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            studyMode === 'spaced-repetition'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Repetición Espaciada
        </button>
        <button
          onClick={() => setStudyMode('quick-review')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            studyMode === 'quick-review'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Repaso Rápido
        </button>
      </div>

      {/* Flashcard */}
      <div className="relative mb-6">
        <div 
          className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 min-h-[300px] cursor-pointer transition-all duration-500 transform hover:scale-105 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          {!isFlipped ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-4">
                {currentWord.category}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {currentWord.word}
              </h2>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <EnhancedPronunciation 
                  text={currentWord.word} 
                  showControls={false}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExample(!showExample);
                  }}
                  className="p-2 rounded-lg bg-white/50 hover:bg-white transition-colors"
                  title="Mostrar ejemplo"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              
              {showExample && currentWord.example && (
                <div className="mt-4 p-3 bg-white/70 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "{currentWord.example}"
                  </p>
                </div>
              )}
              
              <div className="mt-6 text-sm text-gray-500">
                Haz clic para ver la traducción
              </div>
            </div>
          ) : (
            /* Back of card */
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
                {Array.isArray(currentWord.translation) 
                  ? currentWord.translation.join(' / ')
                  : currentWord.translation
                }
              </div>
              
              {currentWord.pronunciation && (
                <div className="text-lg text-gray-600 mb-4">
                  [{currentWord.pronunciation}]
                </div>
              )}
              
              <div className="mt-6 text-sm text-gray-500">
                Haz clic para volver
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Study Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={handleFlip}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Voltear
          </button>
          
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              autoPlay
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            Auto
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSkip}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <SkipForward className="w-4 h-4" />
            Saltar
          </button>
          
          {isFlipped && (
            <>
              <button
                onClick={handleMarkIncorrect}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Incorrecto
              </button>
              
              <button
                onClick={handleMarkCorrect}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Correcto
              </button>
            </>
          )}
        </div>
      </div>

      {/* Session Stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{sessionStats.wordsReviewed.length}</div>
            <div className="text-xs text-gray-600">Estudiadas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{sessionStats.correctAnswers}</div>
            <div className="text-xs text-gray-600">Correctas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{getAccuracy()}%</div>
            <div className="text-xs text-gray-600">Precisión</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{formatTime(sessionStats.timeSpent)}</div>
            <div className="text-xs text-gray-600">Tiempo</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyStudyMode;
