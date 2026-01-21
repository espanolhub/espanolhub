'use client';

import { useState, useEffect } from 'react';
import { XCircle, BookOpen, CheckCircle, AlertCircle, X, Info } from 'lucide-react';
import { getErrorReviews, removeErrorReview } from '@/lib/utils/nacionalidad-storage';
import { getExplanation } from '@/lib/services/nacionalidad-gemini';
import type { ErrorReview } from '@/lib/types/nacionalidad';

export default function ErrorsView() {
  const [errors, setErrors] = useState<ErrorReview[]>([]);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingExplanations, setLoadingExplanations] = useState<Record<string, boolean>>({});
  const [showDetailedExplanation, setShowDetailedExplanation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const errorReviews = getErrorReviews();
    setErrors(errorReviews);
  }, []);

  const handleRemove = (questionId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este error de tu lista de revisión?')) {
      removeErrorReview(questionId);
      setErrors(errors.filter(e => e.questionId !== questionId));
    }
  };

  const groupByCategory = () => {
    const grouped: Record<string, ErrorReview[]> = {};
    errors.forEach(error => {
      const category = error.question.category || 'other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(error);
    });
    return grouped;
  };

  const groupedErrors = groupByCategory();
  const categoryLabels: Record<string, string> = {
    constitucion: 'Constitución',
    cultura: 'Cultura',
    historia: 'Historia',
    geografia: 'Geografía',
    other: 'Otros',
  };

  if (errors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Excelente!</h3>
        <p className="text-gray-600">
          No tienes errores para revisar. ¡Sigue así!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mis Errores</h2>
          <p className="text-gray-600">
            Revisa y aprende de los errores que has cometido en los exámenes ({errors.length} errores)
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Total Errores</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{errors.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Constitución</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {errors.filter(e => e.question.category === 'constitucion').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Cultura</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">
            {errors.filter(e => e.question.category === 'cultura').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Historia/Geografía</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {errors.filter(e => e.question.category === 'historia' || e.question.category === 'geografia').length}
          </div>
        </div>
      </div>

      {/* Errors by Category */}
      {Object.keys(groupedErrors).map((category) => (
        <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {categoryLabels[category] || category} ({groupedErrors[category].length} errores)
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {groupedErrors[category].map((error) => (
              <div key={error.questionId} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        error.question.examType === 'CCSE'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {error.question.examType}
                      </div>
                      {error.reviewCount > 1 && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          Revisado {error.reviewCount} veces
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">{error.question.question}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <div className="text-sm text-gray-600 mb-1">Tu Respuesta</div>
                        <div className="font-semibold text-red-700">{String(error.userAnswer)}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Respuesta Correcta</div>
                        <div className="font-semibold text-green-700">{String(error.correctAnswer)}</div>
                      </div>
                    </div>

                    {/* Simple Explanation (if available) */}
                    {error.question.explanation && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Información</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {error.question.explanation}
                        </p>
                      </div>
                    )}

                    {/* Detailed Explanation (Optional - Load on demand) */}
                    {showDetailedExplanation[error.questionId] && (
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">Explicación Detallada</span>
                        </div>
                        {loadingExplanations[error.questionId] ? (
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                            <span className="text-sm">Cargando explicación detallada...</span>
                          </div>
                        ) : (
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {explanations[error.questionId] || 'No hay explicación detallada disponible.'}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Button to show detailed explanation */}
                    {!showDetailedExplanation[error.questionId] && (
                      <button
                        onClick={async () => {
                          setShowDetailedExplanation((prev) => ({ ...prev, [error.questionId]: true }));
                          if (!explanations[error.questionId]) {
                            setLoadingExplanations((prev) => ({ ...prev, [error.questionId]: true }));
                            try {
                              const explanation = await getExplanation({
                                question: error.question.question,
                                userAnswer: error.userAnswer,
                                correctAnswer: error.correctAnswer,
                                examType: error.question.examType,
                                category: error.question.category,
                              });
                              setExplanations((prev) => ({ ...prev, [error.questionId]: explanation }));
                            } catch (err) {
                              console.error('Error loading explanation:', err);
                              setExplanations((prev) => ({
                                ...prev,
                                [error.questionId]: error.question.explanation || 'No hay explicación disponible.',
                              }));
                            } finally {
                              setLoadingExplanations((prev) => ({ ...prev, [error.questionId]: false }));
                            }
                          }
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                      >
                        <BookOpen className="w-4 h-4" />
                        Ver explicación detallada con Gemini
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(error.questionId)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar de la lista"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}