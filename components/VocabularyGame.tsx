'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trophy, Star, Zap, Target, Award, Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import EnhancedPronunciation from './EnhancedPronunciation';

interface VocabularyGameProps {
  words: Array<{
    word: string;
    translation: string | string[];
    category: string;
    pronunciation?: string;
  }>;
  onGameComplete?: (score: number, total: number) => void;
}

interface GameQuestion {
  word: string;
  translation: string | string[];
  options: string[];
  correctAnswer: string;
  category: string;
}

const VocabularyGame: React.FC<VocabularyGameProps> = ({ words, onGameComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameMode, setGameMode] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  // Generate questions based on game mode
  const generateQuestions = useCallback(() => {
    if (words.length < 4) return [];
    
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const questionCount = gameMode === 'easy' ? 10 : gameMode === 'medium' ? 15 : 20;
    const selectedWords = shuffledWords.slice(0, Math.min(questionCount, shuffledWords.length));
    
    return selectedWords.map(word => {
      const correctTranslation = Array.isArray(word.translation) 
        ? word.translation[0] 
        : word.translation;
      
      // Generate wrong options
      const wrongOptions = words
        .filter(w => w.word !== word.word)
        .map(w => Array.isArray(w.translation) ? w.translation[0] : w.translation)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [correctTranslation, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        word: word.word,
        translation: word.translation,
        options: allOptions,
        correctAnswer: correctTranslation,
        category: word.category
      };
    });
  }, [words, gameMode]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(selectedAnswer || '');
    }
  }, [timeLeft, gameState, showResult, selectedAnswer]);

  const startGame = () => {
    const newQuestions = generateQuestions();
    if (newQuestions.length === 0) return;
    
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(gameMode === 'easy' ? 45 : gameMode === 'medium' ? 30 : 20);
    setGameState('playing');
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + (timeLeft > 20 ? 10 : timeLeft > 10 ? 7 : 5));
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(gameMode === 'easy' ? 45 : gameMode === 'medium' ? 30 : 20);
      } else {
        setGameState('completed');
        onGameComplete?.(score, questions.length);
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameState('menu');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  if (gameState === 'menu') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Juego de Vocabulario
          </h2>
          <p className="text-gray-600">
            ¡Pon a prueba tu conocimiento del vocabulario español!
          </p>
        </div>

        {/* Game Mode Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Modo de Juego</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setGameMode('easy')}
              className={`p-3 rounded-lg font-medium transition-all ${
                gameMode === 'easy'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Fácil
              <div className="text-xs mt-1">10 preguntas</div>
            </button>
            <button
              onClick={() => setGameMode('medium')}
              className={`p-3 rounded-lg font-medium transition-all ${
                gameMode === 'medium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Medio
              <div className="text-xs mt-1">15 preguntas</div>
            </button>
            <button
              onClick={() => setGameMode('hard')}
              className={`p-3 rounded-lg font-medium transition-all ${
                gameMode === 'hard'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Difícil
              <div className="text-xs mt-1">20 preguntas</div>
            </button>
          </div>
        </div>

        <button
          onClick={startGame}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          Empezar Juego
        </button>
      </div>
    );
  }

  if (gameState === 'playing' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">{score}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">{streak} racha</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded ${
              timeLeft > 20 ? 'bg-green-100 text-green-700' :
              timeLeft > 10 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              <Target className="w-4 h-4" />
              <span className="font-medium">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-lg mb-4">
            <span className="text-sm font-medium text-purple-700 capitalize">
              {currentQuestion.category}
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              {currentQuestion.word}
            </h3>
            <EnhancedPronunciation 
              text={currentQuestion.word} 
              showControls={false}
              className="ml-2"
            />
          </div>
          
          <p className="text-gray-600">
            ¿Cuál es la traducción correcta?
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={`p-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                showResult
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : option === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {showResult && option === currentQuestion.correctAnswer && (
                <CheckCircle className="w-5 h-5 inline mr-2" />
              )}
              {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                <XCircle className="w-5 h-5 inline mr-2" />
              )}
              {option}
            </button>
          ))}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`text-center p-4 rounded-lg ${
            isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">¡Correcto!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  <span className="font-semibold">Incorrecto</span>
                </>
              )}
            </div>
            {!isCorrect && (
              <p className="text-sm">
                La respuesta correcta es: <strong>{currentQuestion.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'completed') {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            ¡Juego Completado!
          </h2>
          
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, index) => (
              <Star
                key={index}
                className={`w-8 h-8 ${
                  index < stars
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-purple-700">Puntos</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{percentage}%</div>
              <div className="text-sm text-green-700">Precisión</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">{bestStreak}</div>
              <div className="text-sm text-orange-700">Mejor Racha</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
              <div className="text-sm text-blue-700">Preguntas</div>
            </div>
          </div>
          
          {/* Achievement Message */}
          <div className="mb-6">
            {percentage >= 90 && (
              <p className="text-lg font-semibold text-purple-600">
                ¡Excelente! Eres un maestro del vocabulario español 🏆
              </p>
            )}
            {percentage >= 70 && percentage < 90 && (
              <p className="text-lg font-semibold text-green-600">
                ¡Muy bien! Sigue practicando para mejorar 🌟
              </p>
            )}
            {percentage >= 50 && percentage < 70 && (
              <p className="text-lg font-semibold text-yellow-600">
                ¡Buen trabajo! Practica más para alcanzar la perfección 📚
              </p>
            )}
            {percentage < 50 && (
              <p className="text-lg font-semibold text-blue-600">
                ¡Sigue intentando! La práctica hace al maestro 💪
              </p>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Menú
            </button>
            <button
              onClick={startGame}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VocabularyGame;
