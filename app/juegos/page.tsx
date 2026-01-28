'use client';

import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { games, getGameById } from '@/lib/data/games';
import { CheckCircle, XCircle, Trophy, RotateCcw, Gamepad2, BookOpen, Grid3x3, ArrowLeft, Puzzle, CheckSquare, PenLine, ListOrdered, Zap, Swords, Route } from 'lucide-react';
import GameResultModal from '@/components/GameResultModal';
import GameRenderer from '@/components/games/GameRenderer';
import dynamic from 'next/dynamic';
const WordRaceGame = dynamic(() => import('@/components/games/WordRaceGame'), { ssr: false });
import { addXP, unlockAchievement, updateStats, getUserProgress } from '@/lib/utils/progress';
import { getRandomQuestions } from '@/lib/utils/gameUtils';
import type { GameQuestion, LibraryEntry } from '@/lib/types';
import GameTabs from '@/components/games/ui/GameTabs';
import GameButton from '@/components/games/ui/GameButton';
import GameCard from '@/components/games/ui/GameCard';
import type { GameCardAccent } from '@/components/games/ui/GameCard';
import { cx } from '@/components/games/ui/classNames';
import GameShell from '@/components/games/ui/GameShell';
import NounAgreementGame from '@/components/games/NounAgreementGame';

type TabType = 'principales' | 'biblioteca' | 'todos';

function JuegosContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('principales');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [libraryTitles, setLibraryTitles] = useState<LibraryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<LibraryEntry | null>(null);
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

  // Safety: never show Arabic text in games UI
  const hasArabic = (value: unknown): boolean => {
    if (typeof value === 'string') return /[\u0600-\u06FF]/.test(value);
    if (Array.isArray(value)) return value.some((v) => hasArabic(v));
    return false;
  };

  type QuestionLike = {
    question?: unknown;
    options?: unknown;
    correctAnswer?: unknown;
    explanation?: unknown;
  };

  const sanitizeQuestions = (qs: unknown[]): GameQuestion[] => {
    if (!Array.isArray(qs)) return [];
    return (qs as QuestionLike[])
      .filter((q): q is QuestionLike => Boolean(q))
      .filter((q) => {
        return !(
          hasArabic(q.question) ||
          hasArabic(q.options) ||
          hasArabic(q.correctAnswer) ||
          hasArabic(q.explanation)
        );
      }) as GameQuestion[];
  };

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
          setSelectedQuestions(sanitizeQuestions(qs));
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

    if (gameId === 'fill-blank') {
      try {
        const res = await fetch('/api/games/fill-blank?level=1');
        if (res.ok) {
          const data = await res.json();
          const qs = sanitizeQuestions((data.questions ?? []).slice(0, 21));
          setSelectedQuestions(qs);
        } else setSelectedQuestions([]);
      } catch (e) {
        console.error('Error loading fill-blank game:', e);
        setSelectedQuestions([]);
      }
      return;
    }
    if (baseGameData && baseGameData.id !== 'word-race' && baseGameData.questions.length > 0) {
      setSelectedQuestions(sanitizeQuestions(getRandomQuestions(baseGameData.questions, 20)));
    } else {
      setSelectedQuestions([]);
    }
  };

  // Read game from URL params and auto-select (only once on mount)
  useEffect(() => {
    if (urlGameInitialized.current) return;
    const gameParam = searchParams?.get('game');
    if (gameParam && ['quick-quiz-verbos', 'order', 'word-race', 'multiple-choice', 'fill-blank'].includes(gameParam)) {
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
        const list: LibraryEntry[] = [];
        Object.values(data).forEach((arr: any) => {
          if (Array.isArray(arr)) {
            arr.forEach((e: LibraryEntry) => list.push(e));
          }
        });
        if (mounted) setLibraryTitles(list);
      } catch (e) {
        console.error('Error loading library games:', e);
      }
    })();
    return () => { mounted = false; };
  }, []);


  const handleAnswer = (answer: string | string[]) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (currentQuestion) {
      let isCorrect: boolean;
      
      // Spanish-only UI: match behaves like normal string equality
      if (currentQuestion.type === 'match' && typeof answer === 'string') {
        isCorrect =
          answer.trim().toLowerCase() ===
          String(currentQuestion.correctAnswer).trim().toLowerCase();
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
        import('@/lib/utils/dailyChallenge')
          .then(({ updateChallengeProgress }) => updateChallengeProgress('play-games', 1))
          .catch(() => {});
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
          } catch {}
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
      setSelectedQuestions(sanitizeQuestions(qs));
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

  const gameIconById: Record<string, React.ReactNode> = {
    'noun-agreement': <Puzzle aria-hidden="true" />,
    'multiple-choice': <CheckSquare aria-hidden="true" />,
    'fill-blank': <PenLine aria-hidden="true" />,
    'order': <ListOrdered aria-hidden="true" />,
    'word-race': <Zap aria-hidden="true" />,
    'quick-quiz-verbos': <Zap aria-hidden="true" />,
  };

  const libraryIconById: Record<string, React.ReactNode> = {
    'quick-quiz-verbos': <CheckSquare aria-hidden="true" />,
    'sample-wordrace-1': <Zap aria-hidden="true" />,
    'laberinto-decisiones': <Route aria-hidden="true" />,
    'desafio-multifase': <Swords aria-hidden="true" />,
    'genero-y-numero': <Puzzle aria-hidden="true" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            🎮 Juegos Educativos
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Aprende divirtiéndote con juegos educativos interactivos y desafiantes
          </p>
        </div>

        {selectedEntry ? (
          <GameShell className="max-w-4xl mx-auto">
            <GameButton onClick={() => setSelectedEntry(null)} className="mb-6" variant="secondary">
              <ArrowLeft className="w-5 h-5 text-gray-900" aria-hidden="true" />
              Volver a Juegos
            </GameButton>
            {/* render playable library entry */}
            <GameRenderer entry={selectedEntry} />
          </GameShell>
        ) : !selectedGame ? (
          <>
            <GameTabs<TabType>
              value={activeTab}
              onChange={setActiveTab}
              className="mb-8"
              items={[
                { key: 'principales', label: 'Principales', icon: Gamepad2 },
                {
                  key: 'biblioteca',
                  label: 'Biblioteca',
                  icon: BookOpen,
                  badge:
                    libraryTitles.length > 0 ? (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          activeTab === 'biblioteca' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                        }`}
                      >
                        {libraryTitles.length}
                      </span>
                    ) : null,
                },
                { key: 'todos', label: 'Todos', icon: Grid3x3 },
              ]}
            />

            {/* Main Games Section */}
            {(activeTab === 'principales' || activeTab === 'todos') && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">🎯</span>
                Juegos Principales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((gameItem) => {
                  const accent: GameCardAccent =
                    gameItem.id === 'multiple-choice'
                        ? 'green'
                        : gameItem.id === 'fill-blank'
                          ? 'blue'
                          : gameItem.id === 'order'
                            ? 'purple'
                            : gameItem.id === 'word-race'
                              ? 'orange'
                              : gameItem.id === 'noun-agreement'
                                ? 'pink'
                                : gameItem.id === 'quick-quiz-verbos'
                                  ? 'amber'
                                  : 'slate';
                  return (
                    <GameCard
                      key={gameItem.id}
                      title={gameItem.name}
                      description={gameItem.description}
                      icon={gameIconById[gameItem.id] ?? <Gamepad2 aria-hidden="true" />}
                      accent={accent}
                      onClick={() => handleStartGame(gameItem.id)}
                      meta={
                        <div className={cx(
                          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300',
                          gameItem.questions.length > 0 
                            ? 'bg-white/90 border-gray-200 hover:bg-white hover:shadow-md'
                            : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:from-amber-100 hover:to-orange-100'
                        )}>
                          <span className="text-xs font-semibold">
                            {gameItem.questions.length > 0 ? `${gameItem.questions.length} preguntas` : '⏱️ Tiempo'}
                          </span>
                        </div>
                      }
                    />
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
                    <GameCard
                      key={g.id}
                      onClick={async () => {
                        const res = await fetch(`/api/library/juegos/entry?id=${encodeURIComponent(g.id)}`);
                        if (res.ok) {
                          const entry = await res.json();
                          setSelectedEntry(entry);
                        }
                      }}
                      title={g.title}
                      description={g.excerpt}
                      imageUrl={g.image}
                      accent="purple"
                      icon={libraryIconById[g.id] ?? <BookOpen aria-hidden="true" />}
                      meta={
                        g.level ? (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              g.level === 'beginner'
                                ? 'bg-green-100 text-green-700'
                                : g.level === 'intermediate'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {g.level === 'beginner' ? 'Principiante' : g.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                          </span>
                        ) : null
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : selectedGame === 'noun-agreement' ? (
          <GameShell className="max-w-5xl mx-auto">
            <GameButton onClick={handleReset} className="mb-6" variant="secondary">
              <ArrowLeft className="w-5 h-5 text-slate-900" aria-hidden="true" />
              Volver a Juegos
            </GameButton>
            <NounAgreementGame onBack={handleReset} />
          </GameShell>
        ) : selectedGame === 'word-race' ? (
          <GameShell className="max-w-4xl mx-auto">
            <GameButton onClick={handleReset} className="mb-6" variant="secondary">
              <ArrowLeft className="w-5 h-5 text-slate-900" aria-hidden="true" />
              Volver a Juegos
            </GameButton>
            <WordRaceGame onBack={handleReset} />
          </GameShell>
        ) : game && (
          <GameShell className="max-w-4xl mx-auto relative">
            <GameButton onClick={handleReset} className="mb-6" variant="secondary">
              <ArrowLeft className="w-5 h-5 text-slate-900" aria-hidden="true" />
              Volver a Juegos
            </GameButton>

            {levelSelectActive && (selectedGame === 'order' || selectedGame === 'multiple-choice') ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Elige tu nivel</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {[1, 2, 3].map((l) => (
                    <GameButton
                      key={l}
                      onClick={() => handleStartGame(selectedGame!, l)}
                      className="min-w-[120px]"
                      variant="secondary"
                      size="lg"
                    >
                      Nivel {l}
                    </GameButton>
                  ))}
                </div>
              </div>
            ) : showLevelUp ? (
              <div className="text-center py-12">
                <div className="text-4xl font-bold text-green-600 mb-4">¡Subiste de nivel!</div>
                <p className="text-xl text-gray-700 mb-6">Nivel {levelUpTo}</p>
                <GameButton onClick={handleLevelUpContinue} variant="primary" size="lg">
                  Continuar
                </GameButton>
              </div>
            ) : (
            <>
            {/* Game Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{game.icon}</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
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
                {(selectedGame === 'fill-blank') && (
                  <div className="bg-blue-100 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Ronda </span>
                    <span className="font-bold text-blue-700">
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
                          ? 'Elige la opción correcta:'
                          : 'Empareja el elemento con la respuesta correcta:'}
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
                              placeholder="Escribe la respuesta..."
                            />
                            {showResult && (() => {
                              const isCorrect = typeof selectedAnswer === 'string'
                                ? selectedAnswer.trim().toLowerCase() === String(currentQuestion.correctAnswer).trim().toLowerCase()
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
                    <GameButton onClick={handleNext} variant="primary" size="lg">
                      {currentQuestionIndex < game.questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
                    </GameButton>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <Trophy className="w-20 h-20 text-gray-700 mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  ¡Juego Completado!
                </h2>
                <div className="text-6xl font-bold text-slate-900 mb-6">
                  {score} puntos
                </div>
                <div className="text-xl text-gray-600 mb-8">
                  De {game.questions.reduce((sum, q) => sum + q.points, 0)} puntos posibles
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <GameButton onClick={handleReset} variant="secondary" size="lg">
                    <RotateCcw className="w-5 h-5 mr-2 text-slate-900" aria-hidden="true" />
                    Volver a los Juegos
                  </GameButton>
                  {(selectedGame === 'fill-blank') && (
                    <GameButton onClick={() => handleStartGame(selectedGame!)} variant="primary" size="lg">
                      <Gamepad2 className="w-5 h-5 mr-2 text-white" aria-hidden="true" />
                      Jugar de nuevo
                    </GameButton>
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
          </GameShell>
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
