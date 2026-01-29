'use client';

import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Volume2, CheckCircle, XCircle } from 'lucide-react';
import GameButton from './ui/GameButton';
import type { GameQuestion } from '@/lib/types';

interface VocabularyMatchGameProps {
  onBack: () => void;
  questions: GameQuestion[];
  title: string;
}

export default function VocabularyMatchGame({ onBack, questions, title }: VocabularyMatchGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion?.options) {
      const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Store user answer for results
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + currentQuestion.points);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
    setUserAnswers([]);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (gameFinished) {
    const correctAnswers = questions.filter((q, index) => 
      userAnswers[index] === q.correctAnswer
    ).length;
    const incorrectAnswers = questions.length - correctAnswers;
    const accuracy = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Juego Completado!</h2>
          <div className="text-2xl font-semibold text-blue-600 mb-6">
            Puntuación Final: {score} / {questions.reduce((sum, q) => sum + q.points, 0)}
          </div>

          {/* Detailed Results Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Resultados Detallados</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-600 text-3xl font-bold">{correctAnswers}</div>
                <div className="text-green-700 text-sm">Correctas</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-600 text-3xl font-bold">{incorrectAnswers}</div>
                <div className="text-red-700 text-sm">Incorrectas</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-blue-600 text-3xl font-bold">{accuracy}%</div>
                <div className="text-blue-700 text-sm">Precisión</div>
              </div>
            </div>

            {/* Incorrect Answers Review */}
            {incorrectAnswers > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Revisa tus errores:</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    if (!isCorrect) {
                      return (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-semibold text-gray-700">Pregunta: {question.question}</span>
                              <div className="text-sm text-gray-600">Tu respuesta: <span className="text-red-600 font-medium">{userAnswer || 'Sin respuesta'}</span></div>
                              <div className="text-sm text-green-600 font-medium">Correcto: {question.correctAnswer}</div>
                            </div>
                            <div className="text-2xl">
                              {isCorrect ? '✅' : '❌'}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {/* Learning Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">💡 Consejos de aprendizaje:</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {accuracy >= 80 && (
                  <li>• ¡Excelente trabajo! Tu vocabulario es muy bueno.</li>
                )}
                {accuracy >= 60 && accuracy < 80 && (
                  <li>• Buen progreso. Enfócate en las palabras que te costaron más.</li>
                )}
                {accuracy < 60 && (
                  <li>• Sigue practicando. La repetición es clave para aprender vocabulario.</li>
                )}
                <li>• Revisa las palabras incorrectas y practícalas varias veces.</li>
                <li>• Intenta asociar las palabras con imágenes o situaciones.</li>
                <li>• Usa tarjetas de vocabulario (flashcards) para repasar.</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <GameButton onClick={handleReset} variant="secondary">
              <RotateCcw className="w-5 h-5 mr-2" />
              Jugar de Nuevo
            </GameButton>
            <GameButton onClick={onBack}>
              Volver a Juegos
            </GameButton>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vocabulary Match Game</h2>
        <p className="text-gray-600 mb-6">No hay preguntas disponibles</p>
        <GameButton onClick={onBack}>Volver</GameButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Pregunta </span>
            <span className="font-bold text-gray-800">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="bg-pink-100 rounded-lg px-4 py-2">
            <Trophy className="w-5 h-5 inline mr-2 text-gray-700" />
            <span className="font-bold text-gray-900">{score} puntos</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuestion.question}
          </h3>
          {currentQuestion.question && (
            <button
              onClick={() => speakText(currentQuestion.question)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              Escuchar
            </button>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledOptions.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`p-6 rounded-xl border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{option}</span>
                  {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                </div>
                {option && !showResult && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(option);
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer inline-flex items-center"
                  >
                    <Volume2 className="w-4 h-4 inline mr-1" />
                    Escuchar
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === currentQuestion.correctAnswer
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-red-50 border-2 border-red-500'
          }`}>
            <p className="font-semibold text-lg">
              {selectedAnswer === currentQuestion.correctAnswer ? '✓ ¡Correcto!' : '✗ Incorrecto'}
            </p>
            {selectedAnswer !== currentQuestion.correctAnswer && (
              <p className="text-gray-700 mt-2">
                La respuesta correcta es: <strong>{currentQuestion.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      {showResult && (
        <div className="text-center">
          <GameButton onClick={handleNext} size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
