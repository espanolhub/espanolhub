'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trophy, Clock, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { getRandomWordPairs, WordPair } from '@/lib/services/geminiService';
import { getHighScore, setHighScore } from '@/lib/utils/highScore';
import { cachedFetch } from '@/lib/utils/cache';
import GameShell from '@/components/games/ui/GameShell';
import GameButton from '@/components/games/ui/GameButton';

interface WordRaceGameProps {
  onBack?: () => void;
  gameId?: string;
  rounds?: number;
  timePerQuestion?: number;
  difficulty?: string;
}

export default function WordRaceGame({ onBack, gameId, rounds, timePerQuestion, difficulty }: WordRaceGameProps) {
  const [words, setWords] = useState<WordPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [highScore, setHighScoreState] = useState(0);
  const [gameOverKey, setGameOverKey] = useState(0);
  const [questionKey, setQuestionKey] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitName, setSubmitName] = useState('');
  const [submittingScore, setSubmittingScore] = useState(false);

  const GAME_ID = 'word-race';
  const INITIAL_TIME = 5;
  const TIME_DECREASE_PER_LEVEL = 0.3;
  const MIN_TIME = 2;

  useEffect(() => {
    loadHighScore();
    startGame();
  }, []);

  useEffect(() => {
    if (currentIndex < words.length && !gameOver) {
      generateOptions();
      const currentTime = Math.max(MIN_TIME, INITIAL_TIME - (currentIndex * TIME_DECREASE_PER_LEVEL));
      setTimeLeft(currentTime);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionKey(prev => prev + 1);
    }
  }, [currentIndex, words]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameOver && currentIndex < words.length) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 0.1), 100);
      return () => clearTimeout(timer);
    } else if (timeLeft <= 0 && !showResult && !gameOver) {
      handleTimeOut();
    }
  }, [timeLeft, showResult, gameOver]);

  const loadHighScore = () => {
    setHighScoreState(getHighScore(GAME_ID));
  };

  // use pro flag to determine which words are available
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const useIsPro = require('@/lib/hooks/useIsPro').default;
  const isPro = useIsPro();

  const startGame = async () => {
    // Spanish-only UI: do not display/use Arabic fields.
    const wordPairs = await getRandomWordPairs(15, isPro);
    setWords(wordPairs);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setGameOverKey(prev => prev + 1);
  };

  const generateOptions = () => {
    if (currentIndex >= words.length) return;
    
    const correct = words[currentIndex].category || 'general';
    const pool = words
      .filter((_, i) => i !== currentIndex)
      .map(w => w.category || 'general');

    // unique + shuffle
    const unique = Array.from(new Set(pool)).sort(() => Math.random() - 0.5);
    const wrongOptions = unique.slice(0, 3);
    
    const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    const correct = words[currentIndex].category || 'general';
    const correctAnswer = answer === correct;
    
    setSelectedAnswer(answer);
    setIsCorrect(correctAnswer);
    setShowResult(true);
    
    if (correctAnswer) {
      setScore(score + 10);
      // Add bonus points for quick answers
      const timeBonus = Math.max(0, Math.floor(timeLeft * 2));
      setScore(prev => prev + timeBonus);
    }
    
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        endGame();
      }
    }, 1500);
  };

  const handleTimeOut = () => {
    setShowResult(true);
    setIsCorrect(false);
    setTimeout(() => {
      endGame();
    }, 1500);
  };

  const endGame = () => {
    setGameOver(true);
    setGameOverKey(prev => prev + 1);
    if (score > highScore) {
      setHighScore(GAME_ID, score);
      setHighScoreState(score);
    }
    // show submit name UI for anonymous users / allow name input
    setShowSubmit(true);
  };

  const restart = () => {
    startGame();
  };

  const submitScore = async (name?: string) => {
    try {
      setSubmittingScore(true);
      const response = await cachedFetch('/api/games/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: gameId || GAME_ID, score, name: name || submitName || null }),
      }, 5); // cache for 5 minutes
      const data = await response.json();
      setShowSubmit(false);
    } catch (e) {
      console.error('failed to post score', e);
      alert('Error al guardar la puntuación');
    } finally {
      setSubmittingScore(false);
    }
  };

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  if (gameOver) {
    return (
      <GameShell className="max-w-5xl mx-auto">
        <div key={gameOverKey} className="text-center word-race-fade-in">
        <div className="word-race-trophy">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">¡Juego Terminado!</h2>
        <div className="text-6xl font-bold text-blue-600 mb-4">{score}</div>
        <div className="text-xl text-gray-600 mb-6">
          Mejor resultado: <span className="font-bold text-yellow-600">{highScore}</span>
        </div>
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col gap-3">
            <div>
              <GameButton onClick={restart} variant="primary">
                <RotateCcw className="w-5 h-5" />
                Jugar de Nuevo
              </GameButton>
            </div>
            <div>
              <GameButton onClick={onBack} variant="secondary">
                Volver
              </GameButton>
            </div>
            <div>
              {!showSubmit ? (
                <GameButton onClick={() => setShowSubmit(true)} variant="secondary" className="bg-amber-400 border-amber-400 hover:bg-amber-300">
                  Guardar Puntuación
                </GameButton>
              ) : (
                <div className="mt-3 p-4 bg-white border rounded-lg inline-block">
                  <label className="block text-sm mb-1">Tu nombre (opcional)</label>
                  <input value={submitName} onChange={(e)=>setSubmitName(e.target.value)} className="px-3 py-2 border rounded w-64 mb-2" placeholder="Ej: Ana" />
                  <div className="flex gap-2">
                    <button onClick={() => submitScore()} disabled={submittingScore} className="px-4 py-2 bg-green-500 text-white rounded">{submittingScore ? 'Guardando...' : 'Enviar'}</button>
                    <button onClick={() => { setShowSubmit(false); setSubmitName(''); }} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              {/* show top scores for this game */}
              {/* @ts-ignore */}
              <Leaderboard gameId={gameId || GAME_ID} />
            </div>
          </div>
        </div>
        </div>
      </GameShell>
    );
  }

  return (
    <GameShell className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">Puntos: {score}</span>
          </div>
          <div className="text-sm text-gray-600">
            Palabra {currentIndex + 1} / {words.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-6 h-6 text-red-500" />
          <span key={timeLeft} className="text-3xl font-bold text-red-500">
            {Math.ceil(timeLeft)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-100 ${timeLeft < 2 ? 'bg-red-500' : timeLeft < 3 ? 'bg-orange-500' : 'bg-green-500'}`}
            style={{ width: `${(timeLeft / INITIAL_TIME) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      {currentWord && (
        <div key={questionKey} className="mb-8 word-race-slide-in">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-center mb-6 shadow-lg">
            <h3 className="text-5xl font-bold text-white mb-4">{currentWord.spanish}</h3>
            <p className="text-white text-lg mb-2">¿A qué categoría pertenece?</p>
            {timeLeft > 3 && (
              <div className="text-white/80 text-sm">
                ¡Responde rápido para obtener puntos extra!
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === (currentWord.category || 'general');
              const showCorrect = showResult && isCorrectOption;
              const showIncorrect = showResult && isSelected && !isCorrectOption;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`p-6 rounded-xl font-semibold text-lg transition-all word-race-fade-up hover:scale-105 active:scale-95 relative overflow-hidden ${
                    showCorrect
                      ? 'bg-green-500 text-white shadow-lg'
                      : showIncorrect
                      ? 'bg-red-500 text-white shadow-lg'
                      : isSelected
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-blue-500 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background animation for correct/incorrect */}
                  {(showCorrect || showIncorrect) && (
                    <div className={`absolute inset-0 animate-pulse ${
                      showCorrect ? 'bg-green-400' : 'bg-red-400'
                    } opacity-30`} />
                  )}
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span>{option}</span>
                    {showCorrect && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        {timeLeft > 3 && (
                          <span className="text-sm">+{Math.floor(timeLeft * 2)} pts</span>
                        )}
                      </div>
                    )}
                    {showIncorrect && <XCircle className="w-6 h-6" />}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Score indicator for correct answers */}
          {showResult && isCorrect && (
            <div className="mt-4 text-center animate-bounce">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                <Trophy className="w-5 h-5" />
                +10{timeLeft > 3 ? ` +${Math.floor(timeLeft * 2)} rápido` : ''} puntos
              </div>
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
