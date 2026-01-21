'use client';

import { X } from 'lucide-react';
import type { NacionalidadLesson } from '@/lib/types/nacionalidad';
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

interface LessonViewerProps {
  lesson: NacionalidadLesson;
  onClose: () => void;
}

export default function LessonViewer({ lesson, onClose }: LessonViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-blue-100">Lecciones de Nacionalidad Española</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>

          {/* Key Points */}
          {lesson.keyPoints && lesson.keyPoints.length > 0 && (
            <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Puntos Clave</h3>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}