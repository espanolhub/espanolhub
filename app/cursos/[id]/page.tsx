 'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCourseById } from '@/lib/data/courses';
import { useRouter } from 'next/navigation';

export default function CoursePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = getCourseById(id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-sm text-slate-700">{course.description}</p>
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
                <div key={lesson.id} className="p-4 border rounded-md bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">Lección {idx + 1}: {lesson.title}</h3>
                      <p className="text-sm text-slate-700">{lesson.description}</p>
                    </div>
                    <button className="btn btn-primary px-4 py-2 rounded-md">Finalizar</button>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-semibold mb-2">Contenido</h4>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: lesson.content || '<p>No hay contenido</p>' }} />
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

