'use client';

import { useState, useEffect, useMemo } from 'react';
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

export default function JuegosPage() {
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

  const handleStartGame = async (gameId: string) => {
    setSelectedGame(gameId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setOrderWords([]);
    setCurrentLevel(1);

    const baseGameData = getGameById(gameId);
    
    // Special handling for order game and multiple-choice - load from API
    if (gameId === 'order') {
      try {
        const response = await fetch(`/api/games/order?level=1`);
        if (response.ok) {
          const data = await response.json();
          setSelectedQuestions(data.questions);
          setCurrentLevel(1);
        } else {
          setSelectedQuestions([]);
        }
      } catch (error) {
        console.error('Error loading order game:', error);
        setSelectedQuestions([]);
      }
    } else if (gameId === 'multiple-choice') {
      try {
        const response = await fetch(`/api/games/multiple-choice?level=1`);
        if (response.ok) {
          const data = await response.json();
          setSelectedQuestions(data.questions);
          setCurrentLevel(1);
        } else {
          setSelectedQuestions([]);
        }
      } catch (error) {
        console.error('Error loading multiple-choice game:', error);
        setSelectedQuestions([]);
      }
    } else if (baseGameData && baseGameData.id !== 'word-race' && baseGameData.questions.length > 0) {
      // Select 20 random questions for other games
      const randomQuestions = getRandomQuestions(baseGameData.questions, 20);
      setSelectedQuestions(randomQuestions);
    } else {
      setSelectedQuestions([]);
    }
  };

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
      // Check if it's order game or multiple-choice and should continue to next level
      if ((game.id === 'order' || game.id === 'multiple-choice') && currentLevel < maxLevel) {
        // Load next level
        setLevelLoading(true);
        try {
          const nextLevel = currentLevel + 1;
          const apiPath = game.id === 'order' ? '/api/games/order' : '/api/games/multiple-choice';
          const response = await fetch(`${apiPath}?level=${nextLevel}`);
          if (response.ok) {
            const data = await response.json();
            setSelectedQuestions(data.questions);
            setCurrentLevel(nextLevel);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setShowResult(false);
            setOrderWords([]);
          } else {
            // If can't load next level, finish game
            setGameFinished(true);
          }
        } catch (error) {
          console.error('Error loading next level:', error);
          setGameFinished(true);
        } finally {
          setLevelLoading(false);
        }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
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
              <ArrowLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
            {/* render playable library entry */}
            {/* @ts-ignore */}
            <GameRenderer entry={selectedEntry} />
          </div>
        ) : !selectedGame ? (
          <>
            {/* Tabs Navigation */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-2xl shadow-xl p-2 border-2 border-gray-100">
                <button
                  onClick={() => setActiveTab('principales')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-200 transform ${
                    activeTab === 'principales'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span>Juegos Principales</span>
                </button>
                <button
                  onClick={() => setActiveTab('biblioteca')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-200 transform ${
                    activeTab === 'biblioteca'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Biblioteca</span>
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
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-200 transform ${
                    activeTab === 'todos'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                  <span>Todos</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((gameItem) => {
                  const gradient = gameGradients[gameItem.id] || 'from-gray-500 to-gray-600';
                  return (
                    <div
                      key={gameItem.id}
                      onClick={() => handleStartGame(gameItem.id)}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200 relative overflow-hidden"
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <div className="text-center relative z-10">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} mb-4 transform group-hover:scale-110 transition-transform shadow-lg`}>
                          <span className="text-4xl">{gameItem.icon}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {gameItem.name}
                        </h2>
                        <p className="text-gray-600 mb-4 min-h-[48px]">
                          {gameItem.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                          <span className="text-sm font-semibold text-gray-700">
                            {gameItem.questions.length > 0 ? `${gameItem.questions.length} preguntas` : '⏱️ Juego de tiempo'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200 relative overflow-hidden"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        {g.image && (
                          <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                            <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {g.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {g.excerpt}
                        </p>
                        {g.level && (
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
            <WordRaceGame onBack={handleReset} />
          </div>
        ) : game && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto relative">
            {/* Back button to return to games list */}
            <button
              onClick={handleReset}
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
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
                <div className="bg-pink-100 rounded-lg px-4 py-2">
                  <Trophy className="w-5 h-5 inline mr-2 text-pink-600" />
                  <span className="font-bold text-pink-600">{score} puntos</span>
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
                              {showCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                              {showIncorrect && <XCircle className="w-6 h-6 text-red-500" />}
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

                  {/* Match */}
                  {currentQuestion.type === 'match' && (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 mb-4">
                        Empareja la palabra con su traducción:
                      </p>
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          {currentQuestion.question.split(':')[1]?.trim()}
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
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  ¡Juego Completado!
                </h2>
                <div className="text-6xl font-bold text-pink-600 mb-6">
                  {score} puntos
                </div>
                <div className="text-xl text-gray-600 mb-8">
                  De {game.questions.reduce((sum, q) => sum + q.points, 0)} puntos posibles
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center mx-auto"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Volver a los Juegos
                </button>
              </div>
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
