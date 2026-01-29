'use client';

import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, BookOpen, CheckCircle, XCircle, Target } from 'lucide-react';
import GameButton from './ui/GameButton';
import type { GameQuestion } from '@/lib/types';

interface VerbConjugationGameProps {
  onBack: () => void;
  questions: GameQuestion[];
  title: string;
  tense: string;
}

export default function VerbConjugationGame({ onBack, questions, title, tense }: VerbConjugationGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
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
      setScore(prevScore => prevScore + currentQuestion.points);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
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
    setStreak(0);
    setBestStreak(0);
    setUserAnswers([]);
  };

  const getTenseColor = () => {
    switch (tense) {
      case 'presente': return 'green';
      case 'pasado': return 'blue';
      case 'futuro': return 'purple';
      default: return 'gray';
    }
  };

  const getVerbFromQuestion = (question: string) => {
    const match = question.match(/conjuga el verbo "([^"]+)"/i);
    return match ? match[1] : '';
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
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Conjugación Completada!</h2>
          
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
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-orange-600 text-3xl font-bold">{bestStreak}</div>
                <div className="text-orange-700 text-sm">Mejor Racha</div>
              </div>
            </div>

            {/* Score Summary */}
            <div className="space-y-3 mb-6">
              <div className="text-2xl font-semibold text-blue-600">
                Puntuación: {score} / {maxScore}
              </div>
              <div className="text-xl text-gray-600">
                Porcentaje: {percentage}%
              </div>
              <div className="text-lg text-orange-600">
                Racha mejor: {bestStreak} consecutivas
              </div>
            </div>

            {/* Incorrect Conjugations Review */}
            {incorrectAnswers > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-600 mb-3">❌ Revisa tus errores de conjugación:</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    const verb = getVerbFromQuestion(question.question);
                    
                    if (!isCorrect) {
                      return (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-semibold text-gray-700">Verbo: {verb}</span>
                              <div className="text-sm text-gray-600">Pregunta: {question.question}</div>
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
                  <li>• ¡Experto en conjugación! Tu dominio de los verbos es excelente.</li>
                )}
                {percentage >= 70 && percentage < 90 && (
                  <li>• ¡Buen dominio! Enfócate en los verbos que te costaron más.</li>
                )}
                {percentage < 70 && (
                  <li>• Sigue practicando. La conjugación requiere práctica constante.</li>
                )}
                <li>• Revisa los verbos irregulares que te fallaron.</li>
                <li>• Practica las terminaciones de cada tiempo verbal.</li>
                <li>• Usa tablas de conjugación para estudiar los patrones.</li>
                <li>• La racha de {bestStreak} demuestra tu progreso, ¡sigue así!</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <GameButton onClick={handleReset} variant="secondary">
              <RotateCcw className="w-5 h-5 mr-2" />
              Practicar de Nuevo
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verb Conjugation Game</h2>
        <p className="text-gray-600 mb-6">No hay preguntas disponibles</p>
        <GameButton onClick={onBack}>Volver</GameButton>
      </div>
    );
  }

  const verb = getVerbFromQuestion(currentQuestion.question);
  const pronoun = currentQuestion.question.match(/para (yo|tú|él|ella|nosotros|vosotros|ellos|ellas)/i)?.[1] || '';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Verbo </span>
            <span className="font-bold text-gray-800">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className={`bg-${getTenseColor()}-100 rounded-lg px-4 py-2`}>
            <span className="text-sm text-gray-600">Tiempo </span>
            <span className={`font-bold text-${getTenseColor()}-800`}>
              {tense}
            </span>
          </div>
          <div className="bg-pink-100 rounded-lg px-4 py-2">
            <Trophy className="w-5 h-5 inline mr-2 text-gray-700" />
            <span className="font-bold text-gray-900">{score} puntos</span>
          </div>
          {streak > 0 && (
            <div className="bg-orange-100 rounded-lg px-4 py-2">
              <Target className="w-5 h-5 inline mr-2 text-orange-700" />
              <span className="font-bold text-orange-900">Racha: {streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>
          
          {/* Verb Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-sm text-gray-600">Verbo:</span>
                <span className="ml-2 font-bold text-blue-800">{verb}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Pronombre:</span>
                <span className="ml-2 font-bold text-blue-800">{pronoun}</span>
              </div>
            </div>
          </div>

          {/* Conjugation Table Hint */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <BookOpen className="w-4 h-4 inline mr-1" />
              Recuerda las terminaciones regulares:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="bg-white rounded p-2">
                <span className="font-bold">yo:</span> -o, -í
              </div>
              <div className="bg-white rounded p-2">
                <span className="font-bold">tú:</span> -as, -es, -ís
              </div>
              <div className="bg-white rounded p-2">
                <span className="font-bold">él/ella:</span> -a, -e, -ió
              </div>
              <div className="bg-white rounded p-2">
                <span className="font-bold">nosotros:</span> -amos, -emos, -imos
              </div>
            </div>
          </div>
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
                    <span className="text-lg font-medium">{option}</span>
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
              placeholder="Escribe la conjugación correcta..."
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
                La conjugación correcta es: <strong>{currentQuestion.correctAnswer}</strong>
              </p>
            )}
            <div className="mt-3 text-sm text-gray-600">
              <BookOpen className="w-4 h-4 inline mr-1" />
              Esta es la conjugación del verbo "{verb}" en tiempo {tense} para el pronombre {pronoun}.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {showResult && (
        <div className="text-center">
          <GameButton onClick={handleNext} size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente Verbo' : 'Ver Resultados'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
