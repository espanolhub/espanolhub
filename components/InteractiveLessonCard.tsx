'use client';

import Link from 'next/link';
import { Clock, Play, CheckCircle, BarChart3, BookOpen, Award, Star } from 'lucide-react';
import type { InteractiveLesson } from '@/lib/data/interactive-lessons';

interface InteractiveLessonCardProps {
  lesson: InteractiveLesson;
}

export default function InteractiveLessonCard({ lesson }: InteractiveLessonCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'grammar': return <BookOpen className="w-5 h-5" />;
      case 'vocabulary': return <Star className="w-5 h-5" />;
      case 'reading': return <BookOpen className="w-5 h-5" />;
      case 'exam-prep': return <Award className="w-5 h-5" />;
      case 'general': return <Play className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'grammar': return 'text-blue-600';
      case 'vocabulary': return 'text-purple-600';
      case 'reading': return 'text-green-600';
      case 'exam-prep': return 'text-orange-600';
      case 'general': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 bg-white/20 rounded-lg ${getCategoryColor(lesson.category)}`}>
            {getCategoryIcon(lesson.category)}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
            {lesson.level === 'beginner' ? 'Principiante' : lesson.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-yellow-200 transition-colors">
          {lesson.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {lesson.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {lesson.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {lesson.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{lesson.tags.length - 3}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{lesson.estimatedTime} min</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Play className="w-4 h-4" />
            <span className="text-xs">{lesson.content.length} partes</span>
          </div>
          {lesson.hasExercises && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs">Ejercicios</span>
            </div>
          )}
          {lesson.hasQuiz && (
            <div className="flex items-center gap-1 text-blue-600">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Quiz</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/lecciones/${lesson.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 group-hover:shadow-lg"
        >
          Comenzar Lección
        </Link>
      </div>
    </div>
  );
}
