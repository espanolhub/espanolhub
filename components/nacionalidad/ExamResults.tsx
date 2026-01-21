'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Award, ArrowLeft, BookOpen } from 'lucide-react';
import { ExamAttempt, ExamQuestion } from '@/lib/types/nacionalidad';
import { getExplanation } from '@/lib/services/nacionalidad-gemini';

interface ExamResultsProps {
  attempt: ExamAttempt;
  onReview: () => void;
  onRetry: () => void;
  onClose: () => void;
}

export default function ExamResults({ attempt, onReview, onRetry, onClose }: ExamResultsProps) {
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingExplanations, setLoadingExplanations] = useState<Record<string, boolean>>({});

  const percentage = (attempt.score / attempt.totalQuestions) * 100;
  const incorrectQuestions = attempt.questions.filter((q) =>
    attempt.incorrectQuestions.includes(q.id)
  );

  useEffect(() => {
    // Load explanations for incorrect answers
    incorrectQuestions.forEach(async (question) => {
      setLoadingExplanations((prev) => ({ ...prev, [question.id]: true }));
      try {
        const explanation = await getExplanation({
          question: question.question,
          userAnswer: attempt.answers[question.id],
          correctAnswer: question.correctAnswer,
          examType: attempt.examType,
          category: question.category,
        });
        setExplanations((prev) => ({ ...prev, [question.id]: explanation }));
      } catch (error) {
        console.error('Error loading explanation:', error);
        setExplanations((prev) => ({
          ...prev,
          [question.id]: question.explanation || 'No hay explicación disponible.',
        }));
      } finally {
        setLoadingExplanations((prev) => ({ ...prev, [question.id]: false }));
      }
    });
  }, [attempt, incorrectQuestions]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Resultado del Examen</h2>
            <p className="text-blue-100">Examen {attempt.examType}</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 px-6 py-4 rounded-lg">
            <div className="text-4xl font-bold">{percentage.toFixed(1)}%</div>
            <div className="text-sm text-blue-100">Porcentaje</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{attempt.score}</div>
            <div className="text-sm text-gray-600">Correctas</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{attempt.incorrectQuestions.length}</div>
            <div className="text-sm text-gray-600">Errores</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{formatTime(attempt.timeSpent)}</div>
            <div className="text-sm text-gray-600">Tiempo</div>
          </div>
        </div>
      </div>

      {/* Incorrect Answers with Explanations */}
      {incorrectQuestions.length > 0 && (
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Explicación de Errores
          </h3>
          <div className="space-y-6">
            {incorrectQuestions.map((question) => (
              <div key={question.id} className="border border-red-200 rounded-lg p-5 bg-red-50">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 mb-2">{question.question}</h4>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tu respuesta: </span>
                      <span className="font-semibold text-red-700">
                        {String(attempt.answers[question.id])}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Respuesta correcta: </span>
                      <span className="font-semibold text-green-700">
                        {String(question.correctAnswer)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  {loadingExplanations[question.id] ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Cargando explicación...</span>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {explanations[question.id] || question.explanation || 'No hay explicación disponible.'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <div className="flex gap-3">
          {incorrectQuestions.length > 0 && (
            <button
              onClick={onReview}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <BookOpen className="w-5 h-5" />
              Revisar Errores
            </button>
          )}
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Award className="w-5 h-5" />
            Intentar de Nuevo
          </button>
        </div>
      </div>
    </div>
  );
}