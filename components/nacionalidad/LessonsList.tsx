'use client';

import { useState } from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { nacionalidadLessons, getLessonsByCategory } from '@/lib/data/nacionalidad-lessons';
import { LessonCategory } from '@/lib/types/nacionalidad';
import type { NacionalidadLesson } from '@/lib/types/nacionalidad';

const categoryStyles: Record<LessonCategory, { bg: string; text: string; border: string }> = {
  constitucion: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  cultura: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  historia: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  geografia: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  tramites: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  economia: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
};

const categories = [
  { id: 'constitucion' as LessonCategory, label: 'Constitución' },
  { id: 'cultura' as LessonCategory, label: 'Cultura' },
  { id: 'historia' as LessonCategory, label: 'Historia' },
  { id: 'geografia' as LessonCategory, label: 'Geografía' },
  { id: 'tramites' as LessonCategory, label: 'Trámites' },
  { id: 'economia' as LessonCategory, label: 'Economía' },
];

export default function LessonsList({ onLessonSelect }: { onLessonSelect: (lesson: NacionalidadLesson) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredLessons = selectedCategory === 'all'
    ? nacionalidadLessons
    : getLessonsByCategory(selectedCategory);
  const visibleLessons = filteredLessons.filter(l => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const haystack = `${l.title} ${l.summary || ''} ${l.content?.slice?.(0,200) || ''}`.toLowerCase();
    return haystack.includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lecciones Educativas</h2>
          <p className="text-gray-600">Lecciones completas que cubren el programa CCSE</p>
        </div>
        <div className="ml-4 w-64">
          <input
            aria-label="Buscar lecciones"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por tema (ej. Multas, Reyes)"
            className="w-full px-3 py-2 border rounded-lg text-sm bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const styles = categoryStyles[category.id];
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                isSelected
                  ? `${styles.bg} ${styles.text}`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleLessons.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-10 text-center border border-gray-100 shadow-inner">
            <div className="mx-auto w-40 h-40 mb-4 flex items-center justify-center rounded-full bg-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Bienvenido</h3>
            <p className="text-gray-600">Empieza una búsqueda o selecciona una categoría para ver lecciones.</p>
          </div>
        )}
        {visibleLessons.map((lesson) => {
          const categoryInfo = categories.find(c => c.id === lesson.category);
          const styles = categoryStyles[lesson.category];
          return (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className="rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer border border-gray-100"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,252,255,0.95))' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${styles.bg}`}>
                  <BookOpen className={`w-6 h-6 ${styles.text}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}>
                    {categoryInfo?.label}
                  </span>
                  {lesson.isFree ? (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-50 text-green-700">Gratis</span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-50 text-gray-500">Premium</span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
              {lesson.summary && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.summary}</p>
              )}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{lesson.createdAt}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}