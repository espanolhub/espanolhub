'use client';

import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, BookOpen, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import GameButton from './ui/GameButton';
import type { GameQuestion } from '@/lib/types';

interface GrammarQuizGameProps {
  onBack: () => void;
  questions: GameQuestion[];
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export default function GrammarQuizGame({ onBack, questions, title, level }: GrammarQuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

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
      const points = showHint ? Math.max(5, currentQuestion.points - 5) : currentQuestion.points;
      setScore(prevScore => prevScore + points);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
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
    setShowHint(false);
    setHintsUsed(0);
    setUserAnswers([]);
  };

  const getHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const getLevelColor = () => {
    switch (level) {
      case 'beginner': return 'green';
      case 'intermediate': return 'blue';
      case 'advanced': return 'purple';
      default: return 'gray';
    }
  };

  const getLevelText = () => {
    switch (level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'General';
    }
  };

  if (gameFinished) {
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / maxScore) * 100);
    const correctAnswers = questions.filter((q, index) => 
      userAnswers[index] === q.correctAnswer
    ).length;
    const incorrectAnswers = questions.length - correctAnswers;
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Quiz Completado!</h2>
          
          {/* Detailed Results Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Resultados Detallados</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-600 text-3xl font-bold">{correctAnswers}</div>
                <div className="text-green-700 text-sm">Correctas</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-600 text-3xl font-bold">{incorrectAnswers}</div>
                <div className="text-red-700 text-sm">Incorrectas</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-blue-600 text-3xl font-bold">{percentage}%</div>
                <div className="text-blue-700 text-sm">Precisión</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-purple-600 text-3xl font-bold">{hintsUsed}</div>
                <div className="text-purple-700 text-sm">Pistas</div>
              </div>
            </div>

            {/* Score Summary */}
            <div className="space-y-4 mb-6">
              <div className="text-2xl font-semibold text-blue-600">
                Puntuación: {score} / {maxScore}
              </div>
              <div className="text-xl text-gray-600">
                Porcentaje: {percentage}%
              </div>
              <div className="text-sm text-gray-500">
                Pistas utilizadas: {hintsUsed}
              </div>
            </div>

            {/* Grammar Mistakes Review */}
            {incorrectAnswers > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Revisa tus errores de gramática:</h4>
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
                {percentage >= 90 && (
                  <li>• ¡Excelente trabajo! Tu comprensión gramatical es sobresaliente.</li>
                )}
                {percentage >= 70 && percentage < 90 && (
                  <li>• ¡Buen trabajo! Enfócate en las reglas gramaticales que te costaron más.</li>
                )}
                {percentage < 70 && (
                  <li>• Sigue practicando. La gramática requiere tiempo y práctica constante.</li>
                )}
                <li>• Revisa las reglas gramaticales de las preguntas incorrectas.</li>
                <li>• Practica con ejemplos adicionales para reforzar las reglas.</li>
                <li>• Usa un libro de gramática como referencia cuando tengas dudas.</li>
                {hintsUsed > 0 && (
                  <li>• Intenta reducir el uso de pistas en el próximo intento para mejorar tu autonomía.</li>
                )}
                <li>• La práctica regular es la clave para dominar la gramática española.</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <GameButton onClick={handleReset} variant="secondary">
              <RotateCcw className="w-5 h-5 mr-2" />
              Intentar de Nuevo
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
        <div className="text-4xl mb-4">📖</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Grammar Quiz</h2>
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
          <div className={`bg-${getLevelColor()}-100 rounded-lg px-4 py-2`}>
            <span className="text-sm text-gray-600">Nivel </span>
            <span className={`font-bold text-${getLevelColor()}-800`}>
              {getLevelText()}
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
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuestion.question}
          </h3>
          
          {/* Hint Section */}
          {!showResult && !showHint && (
            <button
              onClick={getHint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Obtener Pista (-5 puntos)
            </button>
          )}
          
          {showHint && (
            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800">Pista:</p>
                  <p className="text-yellow-700">
                    {currentQuestion.type === 'multiple-choice' 
                      ? 'Piensa en las reglas gramaticales básicas del español.'
                      : 'Recuerda la conjugación verbal y los tiempos gramaticales.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Answer Options */}
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
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Fill in the blank */}
        {currentQuestion.type === 'fill-blank' && (
          <div className="space-y-4">
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              placeholder="Escribe tu respuesta..."
            />
            {showResult && (
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              }`}>
                <p className="font-semibold">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✓ ¡Correcto!' : '✗ Incorrecto'}
                </p>
                <p className="text-gray-700 mt-2">
                  La respuesta correcta es: <strong>{currentQuestion.correctAnswer}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Result Feedback */}
        {showResult && currentQuestion.type === 'multiple-choice' && (
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
            <div className="mt-3 text-sm text-gray-600">
              <BookOpen className="w-4 h-4 inline mr-1" />
              Explicación: Esta pregunta evalúa tu conocimiento de las reglas gramaticales españolas.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {showResult && (
        <div className="text-center">
          <GameButton onClick={handleNext} size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
