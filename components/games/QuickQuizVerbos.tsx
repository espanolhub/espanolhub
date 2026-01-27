'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, Trophy, RotateCcw, Clock, Star, 
  Target, Zap, Award, ArrowRight, BookOpen, Brain 
} from 'lucide-react';
import { getRandomQuestions, getExplanationEs, VerbQuizQuestion } from '@/lib/data/verb-quiz-questions';
import GameShell from '@/components/games/ui/GameShell';
import GameButton from '@/components/games/ui/GameButton';

type Level = 'beginner' | 'intermediate' | 'advanced';

export default function QuickQuizVerbos() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [selectedLevel, setSelectedLevel] = useState<Level>('beginner');
  const [questions, setQuestions] = useState<VerbQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const QUESTION_TIME = 30; // 30 segundos por pregunta

  const currentQuestion = questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timerEnabled && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      // Time's up - mark as incorrect
      handleAnswer('');
    }
  }, [gameState, timerEnabled, timeLeft, showResult]);

  const startGame = (level: Level) => {
    const selectedQuestions = getRandomQuestions(20, level);
    setQuestions(selectedQuestions);
    setSelectedLevel(level);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setStartTime(Date.now());
    setTimeLeft(QUESTION_TIME);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correctAnswer) {
      const points = currentQuestion.points;
      setScore(prev => prev + points);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(QUESTION_TIME);
    } else {
      setEndTime(Date.now());
      setGameState('finished');
    }
  };

  const restartGame = () => {
    setGameState('menu');
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Menu Screen
  if (gameState === 'menu') {
    return (
      <GameShell>
        {/* Game Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Zap className="w-6 h-6 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Quick Quiz - Verbos
            </h1>
            <Zap className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 text-lg">
            Practica verbos y gramática con frases de la vida diaria
          </p>
        </div>

        {/* Level Selection */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Elige tu nivel:
          </h2>
          
          {/* Beginner */}
          <button
            onClick={() => startGame('beginner')}
            className="w-full bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-xl group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700">
                    Principiante
                  </h3>
                  <p className="text-gray-600 text-sm">
                    50 preguntas • Verbos regulares básicos • Presente simple
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-green-600" />
            </div>
          </button>

          {/* Intermediate */}
          <button
            onClick={() => startGame('intermediate')}
            className="w-full bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-xl group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">
                    Intermedio
                  </h3>
                  <p className="text-gray-600 text-sm">
                    50 preguntas • Verbos irregulares • Tiempos mixtos
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
            </div>
          </button>

          {/* Advanced */}
          <button
            onClick={() => startGame('advanced')}
            className="w-full bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-500 rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-xl group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700">
                    Avanzado
                  </h3>
                  <p className="text-gray-600 text-sm">
                    50 preguntas • Todos los tiempos • Condicional e imperfecto
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600" />
            </div>
          </button>
        </div>

        {/* Timer Toggle */}
        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Modo Cronometrado</span>
              <span className="text-sm text-gray-500">(30 segundos por pregunta)</span>
            </div>
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                timerEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  timerEnabled ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </GameShell>
    );
  }

  // Playing Screen
  if (gameState === 'playing' && currentQuestion) {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    return (
      <GameShell contentClassName="p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Quick Quiz - Verbos
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {timerEnabled && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  timeLeft <= 10 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-bold">{timeLeft}s</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                <Trophy className="w-4 h-4" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full mb-4 text-sm font-semibold">
              {selectedLevel === 'beginner' && '⭐ Principiante'}
              {selectedLevel === 'intermediate' && '🎯 Intermedio'}
              {selectedLevel === 'advanced' && '🧠 Avanzado'}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-gray-500">
              Verbo: <span className="font-semibold text-purple-600">{currentQuestion.verb}</span>
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;
              
              let buttonClass = 'w-full p-4 rounded-xl border-2 font-semibold text-left transition-all transform hover:scale-105';
              
              if (!showResult) {
                buttonClass += ' border-gray-300 bg-white hover:border-purple-500 hover:bg-purple-50';
              } else if (isCorrectOption) {
                buttonClass += ' border-green-500 bg-green-50 text-green-800';
              } else if (isSelected && !isCorrect) {
                buttonClass += ' border-red-500 bg-red-50 text-red-800';
              } else {
                buttonClass += ' border-gray-200 bg-gray-50 opacity-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showResult && isCorrectOption && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`rounded-xl p-6 mb-6 ${
            isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            {isCorrect ? (
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-green-800 mb-2">
                    ¡Correcto! +{currentQuestion.points} puntos
                  </h4>
                  <p className="text-green-700">
                    {currentQuestion.exampleSentence}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-red-800 mb-2">
                    Incorrecto
                  </h4>
                  <p className="text-red-700 mb-3">
                    {currentQuestion.explanation_es ?? getExplanationEs(currentQuestion)}
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <p className="text-sm text-gray-600 mb-1">
                      Ejemplo de uso:
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {currentQuestion.exampleSentence}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <div className="flex justify-center">
            <GameButton onClick={nextQuestion} variant="primary" size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 hover:bg-none">
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Siguiente Pregunta
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Ver Resultados
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </GameButton>
          </div>
        )}
      </GameShell>
    );
  }

  // Finished Screen
  if (gameState === 'finished') {
    const totalQuestions = questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    return (
      <GameShell>
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Trophy className="w-6 h-6 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              ¡Juego Completado!
            </h1>
          </div>
        </div>

        {/* Results Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke={percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-gray-900">{percentage}%</span>
                <span className="text-sm text-gray-500">Precisión</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600">Puntos</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correctas</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{incorrectAnswers}</div>
              <div className="text-sm text-gray-600">Incorrectas</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600">Tiempo</div>
            </div>
          </div>

          {/* Level Info */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-purple-700" />
              <span className="font-semibold text-purple-900">
                Nivel completado: {
                  selectedLevel === 'beginner' ? 'Principiante' :
                  selectedLevel === 'intermediate' ? 'Intermedio' :
                  'Avanzado'
                }
              </span>
            </div>
          </div>

          {/* Feedback Message */}
          <div className="text-center mb-8">
            {percentage >= 90 && (
              <div className="text-2xl font-bold text-green-600 mb-2">
                ¡Excelente! 🎉
              </div>
            )}
            {percentage >= 70 && percentage < 90 && (
              <div className="text-2xl font-bold text-blue-600 mb-2">
                ¡Muy bien! 👏
              </div>
            )}
            {percentage >= 50 && percentage < 70 && (
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                ¡Buen intento! 💪
              </div>
            )}
            {percentage < 50 && (
              <div className="text-2xl font-bold text-red-600 mb-2">
                Sigue practicando 📚
              </div>
            )}
            <p className="text-gray-600">
              {percentage >= 90 && '¡Dominas los verbos perfectamente!'}
              {percentage >= 70 && percentage < 90 && 'Vas muy bien, sigue así.'}
              {percentage >= 50 && percentage < 70 && 'Necesitas más práctica.'}
              {percentage < 50 && 'Repasa las conjugaciones y vuelve a intentarlo.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <GameButton onClick={restartGame} variant="secondary" size="lg" className="flex-1">
              <BookOpen className="w-5 h-5" />
              Cambiar Nivel
            </GameButton>
            <GameButton
              onClick={() => startGame(selectedLevel)}
              variant="primary"
              size="lg"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 border-0"
            >
              <RotateCcw className="w-5 h-5" />
              Jugar Otra Vez
            </GameButton>
          </div>
        </div>
      </GameShell>
    );
  }

  return null;
}
