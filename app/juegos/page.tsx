'use client';

import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { games, getGameById } from '@/lib/data/games';
import { CheckCircle, XCircle, Trophy, RotateCcw, Gamepad2, BookOpen, Grid3x3, ArrowLeft } from 'lucide-react';
import GameResultModal from '@/components/GameResultModal';
import GameRenderer from '@/components/games/GameRenderer';
import dynamic from 'next/dynamic';
const WordRaceGame = dynamic(() => import('@/components/games/WordRaceGame'), { ssr: false });
import { addXP, unlockAchievement, updateStats, getUserProgress } from '@/lib/utils/progress';
import { getRandomQuestions } from '@/lib/utils/gameUtils';
import { compareArabic } from '@/lib/utils/normalizeArabic';
import type { GameQuestion } from '@/lib/types';

type TabType = 'principales' | 'biblioteca' | 'todos';

function JuegosContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('principales');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [libraryTitles, setLibraryTitles] = useState<any[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [orderWords, setOrderWords] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<GameQuestion[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxLevel] = useState(9999);
  const [levelLoading, setLevelLoading] = useState(false);
  const [levelSelectActive, setLevelSelectActive] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpTo, setLevelUpTo] = useState(0);
  const urlGameInitialized = useRef(false);

  const baseGame = selectedGame ? getGameById(selectedGame) : null;
  
  // Get randomly selected questions (20 questions) when game starts
  const game = useMemo(() => {
    if (!baseGame || baseGame.id === 'word-race') return baseGame;
    if (selectedQuestions.length === 0) return baseGame;
    return {
      ...baseGame,
      questions: selectedQuestions,
    };
  }, [baseGame, selectedQuestions]);

  const currentQuestion = game?.questions[currentQuestionIndex];

  const fetchOrderOrMcq = async (gameId: string, level: number) => {
    const apiPath = gameId === 'order' ? '/api/games/order' : '/api/games/multiple-choice';
    const res = await fetch(`${apiPath}?level=${level}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.questions ?? [];
  };

  const handleStartGame = async (gameId: string, chosenLevel?: number) => {
    setSelectedGame(gameId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setOrderWords([]);
    setShowLevelUp(false);
    setLevelUpTo(0);
    setCurrentLevel(chosenLevel ?? 1);

    const baseGameData = getGameById(gameId);

    if (gameId === 'order' || gameId === 'multiple-choice') {
      if (chosenLevel != null) {
        setLevelSelectActive(false);
        setLevelLoading(true);
        try {
          const qs = await fetchOrderOrMcq(gameId, chosenLevel);
          setSelectedQuestions(qs);
          setCurrentLevel(chosenLevel);
        } catch (e) {
          console.error('Error loading game:', e);
          setSelectedQuestions([]);
        } finally {
          setLevelLoading(false);
        }
        return;
      }
      setLevelSelectActive(true);
      setSelectedQuestions([]);
      return;
    }

    if (gameId === 'memory') {
      try {
        const res = await fetch('/api/games/match');
        if (res.ok) {
          const data = await res.json();
          const qs = (data.questions ?? []).slice(0, 21);
          setSelectedQuestions(qs);
        } else setSelectedQuestions([]);
      } catch (e) {
        console.error('Error loading match game:', e);
        setSelectedQuestions([]);
      }
      return;
    }
    if (gameId === 'fill-blank') {
      try {
        const res = await fetch('/api/games/fill-blank?level=1');
        if (res.ok) {
          const data = await res.json();
          const qs = (data.questions ?? []).slice(0, 21);
          setSelectedQuestions(qs);
        } else setSelectedQuestions([]);
      } catch (e) {
        console.error('Error loading fill-blank game:', e);
        setSelectedQuestions([]);
      }
      return;
    }
    if (baseGameData && baseGameData.id !== 'word-race' && baseGameData.questions.length > 0) {
      setSelectedQuestions(getRandomQuestions(baseGameData.questions, 20));
    } else {
      setSelectedQuestions([]);
    }
  };

  // Read game from URL params and auto-select (only once on mount)
  useEffect(() => {
    if (urlGameInitialized.current) return;
    const gameParam = searchParams?.get('game');
    if (gameParam && ['quick-quiz-verbos', 'order', 'word-race', 'multiple-choice', 'memory', 'fill-blank'].includes(gameParam)) {
      urlGameInitialized.current = true;
      handleStartGame(gameParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/library/juegos/grouped');
        if (!res.ok) return;
        const data = await res.json();
        const list: any[] = [];
        Object.values(data).forEach((arr:any) => arr.forEach((e:any) => list.push(e)));
        if (mounted) setLibraryTitles(list);
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);


  const handleAnswer = (answer: string | string[]) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (currentQuestion) {
      let isCorrect: boolean;
      
      // For match type questions (Arabic text input), use normalization
      if (currentQuestion.type === 'match' && typeof answer === 'string') {
        // Match type always uses compareArabic, whether correctAnswer is string or array
        isCorrect = compareArabic(answer, currentQuestion.correctAnswer);
      } else if (Array.isArray(currentQuestion.correctAnswer)) {
        // For array answers (e.g., order type)
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer);
      } else {
        // Standard comparison for other types
        isCorrect = answer === currentQuestion.correctAnswer;
      }
      
      if (isCorrect) {
        setScore(prevScore => prevScore + currentQuestion.points);
        
        // Update daily challenge progress for games (only on correct answer)
        try {
          const { updateChallengeProgress } = require('@/lib/utils/dailyChallenge');
          updateChallengeProgress('play-games', 1);
        } catch (e) {
          // Ignore if module not available
        }
      }
    }
  };

  const handleNext = async () => {
    if (game && currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setOrderWords([]);
    } else if (game) {
      if ((game.id === 'order' || game.id === 'multiple-choice') && currentLevel < maxLevel) {
        const next = currentLevel + 1;
        setShowLevelUp(true);
        setLevelUpTo(next);
        setSelectedAnswer(null);
        setShowResult(false);
        setOrderWords([]);
        return;
      } else {
        // Finish game for non-order games or if max level reached
        setGameFinished(true);
        // Agregar XP cuando se completa el juego
        const totalXP = score * 2; // 2 XP por punto
        addXP(totalXP, `Completar juego: ${game.name}`, 'juegos');
        
        const progress = getUserProgress();
        updateStats({ gamesPlayed: progress.stats.gamesPlayed + 1 });
        
        // Verificar logros
        if (!progress.achievements.some(a => a.id === 'first-game')) {
          unlockAchievement('first-game');
        }
        
        // Logro de juego perfecto
        const maxScore = game.questions.reduce((sum, q) => sum + q.points, 0);
        if (score === maxScore) {
          unlockAchievement('perfect-game');
        }
        // save progress (best-effort)
        (async () => {
          try {
            await fetch('/api/progress/save', { method: 'POST', body: JSON.stringify({ gameId: game.id, score, level: currentLevel }), headers: { 'content-type': 'application/json' } });
          } catch (e) {}
        })();
      }
    }
  };

  const handleReset = () => {
    setSelectedGame(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setLevelSelectActive(false);
    setShowLevelUp(false);
    setLevelUpTo(0);
  };

  const handleLevelUpContinue = async () => {
    if (!selectedGame || (selectedGame !== 'order' && selectedGame !== 'multiple-choice')) return;
    setLevelLoading(true);
    setShowLevelUp(false);
    try {
      const qs = await fetchOrderOrMcq(selectedGame, levelUpTo);
      setSelectedQuestions(qs);
      setCurrentLevel(levelUpTo);
      setCurrentQuestionIndex(0);
      setLevelUpTo(0);
    } catch (e) {
      console.error('Error loading next level:', e);
      setGameFinished(true);
    } finally {
      setLevelLoading(false);
    }
  };

  // Define gradient colors for each game
  const gameGradients: Record<string, string> = {
    'memory': 'from-blue-500 to-cyan-500',
    'multiple-choice': 'from-green-500 to-emerald-500',
    'fill-blank': 'from-purple-500 to-pink-500',
    'order': 'from-orange-500 to-red-500',
    'word-race': 'from-yellow-500 to-amber-500',
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎮 Juegos Educativos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Aprende divirtiéndote con juegos educativos interactivos y desafiantes
          </p>
        </div>

        {selectedEntry ? (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
            <button 
              onClick={() => setSelectedEntry(null)} 
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" aria-hidden="true" />
              Volver a Juegos
            </button>
            {/* render playable library entry */}
            {/* @ts-ignore */}
            <GameRenderer entry={selectedEntry} />
          </div>
        ) : !selectedGame ? (
          <>
            {/* Tabs Navigation - Enhanced */}
            <div className="flex justify-center mb-8 overflow-x-auto">
              <div className="inline-flex flex-nowrap items-center gap-2 bg-white rounded-xl shadow-md p-2 border border-gray-200 min-w-0">
                <button
                  onClick={() => setActiveTab('principales')}
                  className={`flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 border ${
                    activeTab === 'principales'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  <Gamepad2 className={`w-6 h-6 ${activeTab === 'principales' ? 'text-white' : 'text-gray-700'}`} aria-hidden="true" />
                  <span className="text-sm sm:text-base">Principales</span>
                </button>
                <button
                  onClick={() => setActiveTab('biblioteca')}
                  className={`flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 border ${
                    activeTab === 'biblioteca'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  <BookOpen className={`w-6 h-6 ${activeTab === 'biblioteca' ? 'text-white' : 'text-gray-700'}`} aria-hidden="true" />
                  <span className="text-sm sm:text-base">Biblioteca</span>
                  {libraryTitles.length > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === 'biblioteca' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {libraryTitles.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('todos')}
                  className={`flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 border ${
                    activeTab === 'todos'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  <Grid3x3 className={`w-6 h-6 ${activeTab === 'todos' ? 'text-white' : 'text-gray-700'}`} aria-hidden="true" />
                  <span className="text-sm sm:text-base">Todos</span>
                </button>
              </div>
            </div>

            {/* Main Games Section */}
            {(activeTab === 'principales' || activeTab === 'todos') && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                Juegos Principales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {games.map((gameItem) => {
                  const gradient = gameGradients[gameItem.id] || 'from-gray-500 to-gray-600';
                  return (
                    <div
                      key={gameItem.id}
                      onClick={() => handleStartGame(gameItem.id)}
                      className="group bg-white rounded-lg border border-gray-200 hover:shadow-md p-4 sm:p-6 md:p-8 cursor-pointer transition-all duration-200"
                    >
                      <div className="text-center relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-gray-900 mb-2 sm:mb-4 border border-gray-800">
                          <span className="text-2xl sm:text-3xl md:text-4xl text-white">{gameItem.icon}</span>
                        </div>
                        <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900 mb-1 sm:mb-3 line-clamp-2">
                          {gameItem.name}
                        </h2>
                        <p className="text-gray-600 mb-2 sm:mb-4 min-h-[36px] sm:min-h-[48px] text-xs sm:text-base line-clamp-2 hidden sm:block">
                          {gameItem.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-gray-100 rounded-full">
                          <span className="text-[10px] sm:text-sm font-semibold text-gray-700 truncate max-w-full">
                            {gameItem.questions.length > 0 ? `${gameItem.questions.length} preguntas` : '⏱️ Tiempo'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            )}

            {/* Library Games Section */}
            {(activeTab === 'biblioteca' || activeTab === 'todos') && libraryTitles.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-4xl">📚</span>
                  Biblioteca de Juegos
                  {libraryTitles.length > 0 && (
                    <span className="text-lg font-normal text-gray-500 ml-2">
                      ({libraryTitles.length} juegos disponibles)
                    </span>
                  )}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {libraryTitles.map((g) => (
                    <div
                      key={g.id}
                      onClick={async () => {
                        const res = await fetch(`/api/library/juegos/entry?id=${encodeURIComponent(g.id)}`);
                        if (res.ok) {
                          const entry = await res.json();
                          setSelectedEntry(entry);
                        }
                      }}
                      className="group bg-white rounded-lg border border-gray-200 hover:shadow-md p-4 sm:p-6 cursor-pointer transition-all duration-200"
                    >
                      
                      <div className="relative z-10">
                        {g.image && (
                          <div className="w-full h-20 sm:h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg sm:rounded-xl mb-2 sm:mb-4 flex items-center justify-center overflow-hidden">
                            <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h4 className="font-bold text-sm sm:text-xl text-gray-800 mb-1 sm:mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {g.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                          {g.excerpt}
                        </p>
                        {g.level && (
                          <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                            g.level === 'beginner' ? 'bg-green-100 text-green-700' :
                            g.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {g.level === 'beginner' ? 'Principiante' : g.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : selectedGame === 'word-race' ? (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
            <button 
              onClick={handleReset}
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-semibold text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" aria-hidden="true" />
              Volver a Juegos
            </button>
            <WordRaceGame onBack={handleReset} />
          </div>
        ) : game && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto relative">
            <button
              onClick={handleReset}
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" aria-hidden="true" />
              Volver a Juegos
            </button>

            {levelSelectActive && (selectedGame === 'order' || selectedGame === 'multiple-choice') ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Elige tu nivel</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {[1, 2, 3].map((l) => (
                    <button
                      key={l}
                      onClick={() => handleStartGame(selectedGame!, l)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Nivel {l}
                    </button>
                  ))}
                </div>
              </div>
            ) : showLevelUp ? (
              <div className="text-center py-12">
                <div className="text-4xl font-bold text-green-600 mb-4">¡Subiste de nivel!</div>
                <p className="text-xl text-gray-700 mb-6">Nivel {levelUpTo}</p>
                <button
                  onClick={handleLevelUpContinue}
                  className="px-8 py-4 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-all border border-gray-800"
                >
                  Continuar
                </button>
              </div>
            ) : (
            <>
            {/* Game Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{game.icon}</div>
              <h2 className="text-3xl font-bold text-pink-600 mb-2">
                {game.name}
              </h2>
              <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-600">Pregunta </span>
                  <span className="font-bold text-gray-800">
                    {currentQuestionIndex + 1} / {game.questions.length}
                  </span>
                </div>
                {(selectedGame === 'order' || selectedGame === 'multiple-choice') && (
                  <div className="bg-blue-100 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Nivel </span>
                    <span className="font-bold text-blue-800">
                      {currentLevel}
                    </span>
                  </div>
                )}
                {(selectedGame === 'memory' || selectedGame === 'fill-blank') && (
                  <div className="bg-amber-100 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Ronda </span>
                    <span className="font-bold text-amber-800">
                      {Math.min(3, Math.floor(currentQuestionIndex / 7) + 1)} / 3
                    </span>
                  </div>
                )}
                <div className="bg-pink-100 rounded-lg px-4 py-2">
                  <Trophy className="w-5 h-5 inline mr-2 text-gray-700" aria-hidden="true" />
                  <span className="font-bold text-gray-900">{score} puntos</span>
                </div>
              </div>
            </div>

            {levelLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mb-4"></div>
                <p className="text-lg text-gray-600">Cargando nivel {currentLevel + 1}...</p>
              </div>
            ) : !gameFinished ? currentQuestion && (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {currentQuestion.question}
                  </h3>

                  {/* Multiple Choice */}
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const showCorrect = showResult && isCorrect;
                        const showIncorrect = showResult && isSelected && !isCorrect;

                        return (
                          <button
                            key={index}
                            onClick={() => !showResult && handleAnswer(option)}
                            disabled={showResult}
                            className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                              showCorrect
                                ? 'border-green-500 bg-green-50'
                                : showIncorrect
                                ? 'border-red-500 bg-red-50'
                                : isSelected
                                ? 'border-pink-500 bg-pink-50'
                                : 'border-gray-200 bg-white hover:border-pink-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-lg">{option}</span>
                              {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />}
                              {showIncorrect && <XCircle className="w-6 h-6 text-red-600" aria-hidden="true" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Fill Blank */}
                  {currentQuestion.type === 'fill-blank' && (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 mb-4">
                        Escribe la respuesta correcta:
                      </p>
                      <input
                        type="text"
                        value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
                        onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && selectedAnswer && !showResult) {
                            handleAnswer(selectedAnswer);
                          }
                        }}
                        disabled={showResult}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-pink-500 focus:outline-none"
                        placeholder="Escribe tu respuesta..."
                      />
                      {showResult && (
                        <div className={`p-4 rounded-lg ${
                          selectedAnswer === currentQuestion.correctAnswer
                            ? 'bg-green-50 border-2 border-green-500'
                            : 'bg-red-50 border-2 border-red-500'
                        }`}>
                          <p className="font-semibold">
                            {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correcto!' : '✗ Incorrecto'}
                          </p>
                          <p className="text-gray-700 mt-2">
                            La respuesta correcta es: <strong>{currentQuestion.correctAnswer}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Match — opciones múltiples (API) o input legacy */}
                  {currentQuestion.type === 'match' && (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 mb-4">
                        {currentQuestion.options?.length
                          ? 'Elige la traducción correcta:'
                          : 'Empareja la palabra con su traducción:'}
                      </p>
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          {currentQuestion.options?.length
                            ? currentQuestion.question
                            : currentQuestion.question.split(':')[1]?.trim()}
                        </p>
                        {currentQuestion.options?.length ? (
                          <>
                            <div className="space-y-3">
                              {currentQuestion.options.map((option) => {
                                const isSelected = selectedAnswer === option;
                                const correctAns = Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer[0] : currentQuestion.correctAnswer;
                                const isCorrect = option === correctAns;
                                const showCorrect = showResult && isCorrect;
                                const showIncorrect = showResult && isSelected && !isCorrect;
                                return (
                                  <button
                                    key={option}
                                    onClick={() => !showResult && handleAnswer(option)}
                                    disabled={showResult}
                                    className={`w-full px-4 py-3 rounded-xl font-semibold text-left transition-all border-2 ${
                                      showCorrect
                                        ? 'bg-green-100 border-green-500 text-green-900'
                                        : showIncorrect
                                          ? 'bg-red-100 border-red-500 text-red-900'
                                          : isSelected
                                            ? 'bg-blue-100 border-blue-500 text-blue-900'
                                            : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                            {showResult && selectedAnswer !== (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer[0] : currentQuestion.correctAnswer) && (
                              <p className="mt-4 text-gray-700">
                                La respuesta correcta es: <strong>{Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer[0] : currentQuestion.correctAnswer}</strong>
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
                              onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && selectedAnswer && !showResult) {
                                  handleAnswer(selectedAnswer);
                                }
                              }}
                              disabled={showResult}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-pink-500 focus:outline-none"
                              placeholder="Escribe la traducción..."
                            />
                            {showResult && (() => {
                              const isCorrect = typeof selectedAnswer === 'string'
                                ? compareArabic(selectedAnswer, currentQuestion.correctAnswer)
                                : selectedAnswer === currentQuestion.correctAnswer;
                              const correctDisplay = Array.isArray(currentQuestion.correctAnswer)
                                ? currentQuestion.correctAnswer.join(' / ')
                                : currentQuestion.correctAnswer;
                              return (
                                <div className={`mt-4 p-4 rounded-lg ${
                                  isCorrect
                                    ? 'bg-green-50 border-2 border-green-500'
                                    : 'bg-red-50 border-2 border-red-500'
                                }`}>
                                  <p className="font-semibold">
                                    {isCorrect ? '✓ Correcto!' : '✗ Incorrecto'}
                                  </p>
                                  <p className="text-gray-700 mt-2">
                                    La respuesta correcta es: <strong>{correctDisplay}</strong>
                                  </p>
                                </div>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Order */}
                  {currentQuestion.type === 'order' && (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 mb-4">
                        Ordena las palabras haciendo clic en ellas:
                      </p>
                      {!showResult && orderWords.length === 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2 justify-center">
                            {(() => {
                              const parts = currentQuestion.question.split(':')[1]?.trim() || '';
                              const items = parts ? parts.split(',').map((w: string) => w.trim()) : [];
                              // Shuffle the items for display
                              const shuffled = [...items].sort(() => Math.random() - 0.5);
                              return shuffled.map((word: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => setOrderWords([...orderWords, word])}
                                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                                >
                                  {word}
                                </button>
                              ));
                            })()}
                          </div>
                        </div>
                      )}
                      {orderWords.length > 0 && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-sm text-gray-600 mb-3">Tu oración:</p>
                            <div className="flex flex-wrap gap-2 min-h-[60px] items-center">
                              {orderWords.map((word, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    if (!showResult) {
                                      const newWords = [...orderWords];
                                      newWords.splice(index, 1);
                                      setOrderWords(newWords);
                                    }
                                  }}
                                  disabled={showResult}
                                  className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-75"
                                >
                                  {word}
                                </button>
                              ))}
                            </div>
                          </div>
                          {!showResult && (
                            <div className="flex flex-wrap gap-2 justify-center">
                              {(() => {
                                const parts = currentQuestion.question.split(':')[1]?.trim() || '';
                                const items = parts ? parts.split(',').map((w: string) => w.trim()) : [];
                                return items.map((word: string, index: number) => {
                                  const isUsed = orderWords.includes(word);
                                  if (isUsed) return null;
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => setOrderWords([...orderWords, word])}
                                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                                    >
                                      {word}
                                    </button>
                                  );
                                });
                              })()}
                            </div>
                          )}
                          {orderWords.length > 0 && !showResult && (
                            <div className="flex gap-4 justify-center">
                              <button
                                onClick={() => {
                                  const answer = [...orderWords];
                                  handleAnswer(answer);
                                }}
                                className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                              >
                                Verificar Orden
                              </button>
                              <button
                                onClick={() => setOrderWords([])}
                                className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                              >
                                Reiniciar
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {showResult && (
                        <div className={`p-4 rounded-lg ${
                          JSON.stringify(orderWords) === JSON.stringify(currentQuestion.correctAnswer)
                            ? 'bg-green-50 border-2 border-green-500'
                            : 'bg-red-50 border-2 border-red-500'
                        }`}>
                          <p className="font-semibold">
                            {JSON.stringify(orderWords) === JSON.stringify(currentQuestion.correctAnswer) ? '✓ Correcto!' : '✗ Incorrecto'}
                          </p>
                          <p className="text-gray-700 mt-2">
                            La respuesta correcta es: <strong>{Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(' ') : currentQuestion.correctAnswer}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {showResult && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                    >
                      {currentQuestionIndex < game.questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <Trophy className="w-20 h-20 text-gray-700 mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  ¡Juego Completado!
                </h2>
                <div className="text-6xl font-bold text-pink-600 mb-6">
                  {score} puntos
                </div>
                <div className="text-xl text-gray-600 mb-8">
                  De {game.questions.reduce((sum, q) => sum + q.points, 0)} puntos posibles
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <RotateCcw className="w-5 h-5 mr-2 text-gray-900" aria-hidden="true" />
                    Volver a los Juegos
                  </button>
                  {(selectedGame === 'memory' || selectedGame === 'fill-blank') && (
                    <button
                      onClick={() => handleStartGame(selectedGame!)}
                      className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center border border-gray-800"
                    >
                      <Gamepad2 className="w-5 h-5 mr-2 text-white" aria-hidden="true" />
                      Jugar de nuevo
                    </button>
                  )}
                </div>
              </div>
            )}
            </>
            )}
            {/* Result modal */}
            {game && (
              <GameResultModal
                open={gameFinished}
                score={score}
                max={game.questions.reduce((sum, q) => sum + q.points, 0)}
                onClose={handleReset}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JuegosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div></div>}>
      <JuegosContent />
    </Suspense>
  );
}
