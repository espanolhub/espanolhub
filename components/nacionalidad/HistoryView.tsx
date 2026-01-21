'use client';

import { useState, useMemo } from 'react';
import { Clock, Award, TrendingUp, Calendar, Filter, X } from 'lucide-react';
import { getUserHistory } from '@/lib/utils/nacionalidad-storage';
import { ExamAttempt, ExamType } from '@/lib/types/nacionalidad';

export default function HistoryView() {
  const [filterType, setFilterType] = useState<ExamType | 'all'>('all');
  const history = getUserHistory();

  const filteredAttempts = useMemo(() => {
    if (filterType === 'all') return history.attempts;
    return history.attempts.filter(attempt => attempt.examType === filterType);
  }, [history.attempts, filterType]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPercentage = (score: number, total: number): number => {
    return Math.round((score / total) * 100);
  };

  const getBestScore = (examType: ExamType): number => {
    return history.bestScore?.[examType] || 0;
  };

  const getAverageScore = (examType: ExamType): number => {
    const attempts = history.attempts.filter(a => a.examType === examType);
    if (attempts.length === 0) return 0;
    const total = attempts.reduce((sum, a) => sum + getPercentage(a.score, a.totalQuestions), 0);
    return Math.round(total / attempts.length);
  };

  const totalAttempts = history.attempts.length;
  const ccseAttempts = history.attempts.filter(a => a.examType === 'CCSE').length;
  const deleAttempts = history.attempts.filter(a => a.examType === 'DELE-A2').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mi Historial</h2>
          <p className="text-gray-600">Registro completo de todos tus intentos de examen</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Total Intentos</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalAttempts}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Mejor CCSE</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{getBestScore('CCSE').toFixed(1)}%</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Mejor DELE A2</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{getBestScore('DELE-A2').toFixed(1)}%</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Último Intento</div>
          <div className="text-xs text-gray-500 mt-1">
            {history.lastAttempt ? formatDate(history.lastAttempt.completedAt) : 'N/A'}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filtrar por tipo:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({totalAttempts})
            </button>
            <button
              onClick={() => setFilterType('CCSE')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'CCSE'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              CCSE ({ccseAttempts})
            </button>
            <button
              onClick={() => setFilterType('DELE-A2')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'DELE-A2'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              DELE A2 ({deleAttempts})
            </button>
          </div>
        </div>
      </div>

      {/* Attempts List */}
      {filteredAttempts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay intentos aún</h3>
          <p className="text-gray-600">
            Comienza un examen para ver tu historial aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAttempts
            .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
            .map((attempt) => {
              const percentage = getPercentage(attempt.score, attempt.totalQuestions);
              const isBest = history.bestScore?.[attempt.examType] === percentage;
              
              return (
                <div
                  key={attempt.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`px-4 py-2 rounded-lg font-semibold ${
                          attempt.examType === 'CCSE'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {attempt.examType}
                        </div>
                        {isBest && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                            <Award className="w-4 h-4" />
                            Mejor Resultado
                          </div>
                        )}
                        <span className="text-sm text-gray-500">
                          {formatDate(attempt.completedAt)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Puntuación</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {percentage}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {attempt.score} de {attempt.totalQuestions}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tiempo</div>
                          <div className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(attempt.timeSpent)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Correctas</div>
                          <div className="text-xl font-semibold text-green-600">
                            {attempt.score}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Errores</div>
                          <div className="text-xl font-semibold text-red-600">
                            {attempt.incorrectQuestions.length}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              percentage >= 80
                                ? 'bg-green-600'
                                : percentage >= 60
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Additional Stats */}
      {filteredAttempts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Promedio de Puntuación</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">CCSE:</span>
                <span className="text-xl font-bold text-blue-600">{getAverageScore('CCSE')}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">DELE A2:</span>
                <span className="text-xl font-bold text-green-600">{getAverageScore('DELE-A2')}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mejores Resultados</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mejor CCSE:</span>
                <span className="text-xl font-bold text-blue-600">{getBestScore('CCSE').toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mejor DELE A2:</span>
                <span className="text-xl font-bold text-green-600">{getBestScore('DELE-A2').toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}