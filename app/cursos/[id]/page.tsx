 'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCourseById } from '@/lib/data/courses';
import { useRouter } from 'next/navigation';
import { Play, ArrowRight, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CoursePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = getCourseById(id);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartLesson = (lesson: any) => {
    // Special handling for driving lessons
    if (course?.id === 'carnet-1' && lesson.contentId.startsWith('driving-')) {
      router.push(`/driving-license#${lesson.contentId}`);
      return;
    }
    
    const routes: Record<string, (contentId: string) => string> = {
      gramatica: (id) => `/gramatica/${id}`,
      nacionalidad: (id) => `/nacionalidad#${id}`,
      lectura: (id) => `/lectura#${id}`,
      vocabulario: () => '/vocabulario',
      juegos: () => '/juegos',
      alfabeto: () => '/alfabeto',
      numeros: () => '/numeros',
    };
    const routeBuilder = routes[lesson.type];
    if (routeBuilder) {
      router.push(routeBuilder(lesson.contentId));
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen p-8 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Curso no encontrado</h1>
          <p>El curso solicitado no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/cursos" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Volver a Cursos
          </Link>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-sm text-slate-700 mt-2">{course.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Lecciones</h2>
          {course.lessons.length === 0 ? (
            <div className="p-6 border rounded-lg bg-white">
              <p className="text-slate-900">No hay lecciones todavía</p>
            </div>
          ) : (
            <div className="space-y-4">
              {course.lessons.map((lesson: any, idx: number) => (
                <div key={lesson.id} className="p-6 border rounded-xl bg-white hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{lesson.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.estimatedDuration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartLesson(lesson)}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Play className="w-5 h-5" />
                      Iniciar Lección
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

