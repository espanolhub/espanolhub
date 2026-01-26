'use client';

import { useState, useMemo, useEffect } from 'react';
import { createRipple } from '@/lib/utils/ripple';
import { useRouter } from 'next/navigation';
import { courses, learningPaths, getCoursesByLevel, getCourseById, getAvailableCourses } from '@/lib/data/courses';
import { 
  getUserCourseProgress, 
  startCourse, 
  completeLesson, 
  updateCourseProgressPercent,
  getCompletedCourseIds,
  getInProgressCourseIds,
  setCurrentLesson
} from '@/lib/utils/courses';
import { addXP } from '@/lib/utils/progress';
import { 
  BookOpen, Play, CheckCircle, Clock, Award, ArrowRight, Star, Lock,
  Trophy, Target, Zap, Users, Sparkles, TrendingUp, BookMarked, Languages
} from 'lucide-react';
import Link from 'next/link';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

export default function CursosPage() {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courseProgress, setCourseProgress] = useState<ReturnType<typeof getUserCourseProgress>>([]);

  useEffect(() => {
    setCourseProgress(getUserCourseProgress());
  }, []);

  const completedCourseIds = useMemo(() => getCompletedCourseIds(), [courseProgress]);
  const inProgressCourseIds = useMemo(() => getInProgressCourseIds(), [courseProgress]);

  const filteredCourses = useMemo(() => {
    if (selectedLevel === 'all') return courses;
    return getCoursesByLevel(selectedLevel);
  }, [selectedLevel]);

  const currentCourse = selectedCourse ? getCourseById(selectedCourse) : null;
  const currentCourseProgress = currentCourse ? courseProgress.find(p => p.courseId === currentCourse.id) : null;

  const handleStartCourse = (courseId: string) => {
    startCourse(courseId);
    setCourseProgress(getUserCourseProgress());
    setSelectedCourse(courseId);
  };

  const handleStartLesson = (courseId: string, lessonId: string) => {
    setCurrentLesson(courseId, lessonId);
    const course = getCourseById(courseId);
    const lesson = course?.lessons.find(l => l.id === lessonId);
    if (lesson) {
      const routes: Record<string, string> = {
        alfabeto: '/alfabeto',
        numeros: '/numeros',
        lectura: '/lectura',
        gramatica: '/gramatica',
        vocabulario: '/vocabulario',
        juegos: '/juegos',
        nacionalidad: '/nacionalidad',
      };
      router.push(routes[lesson.type] || '/');
    }
  };

  const handleCompleteLesson = (courseId: string, lessonId: string, xpReward: number) => {
    completeLesson(courseId, lessonId, xpReward);
    addXP(xpReward, `Lección completada: ${lessonId}`, courseId);
    const course = getCourseById(courseId);
    if (course) updateCourseProgressPercent(courseId, course.lessons.length);
    setCourseProgress(getUserCourseProgress());
  };

  return (
    <div className={`min-h-screen bg-slate-50 py-12 ${cairo.variable} font-sans`}>
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-slate-200 shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-800">{courses.length} Cursos Disponibles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Cursos de Español
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Aprende español paso a paso con rutas de aprendizaje diseñadas para todos los niveles.
          </p>
        </div>

        {/* Level Filter - تم إصلاح منطق الألوان هنا */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => {
              const labels = {
                all: { es: 'Todos', icon: BookOpen },
                beginner: { es: 'Principiante', icon: Star },
                intermediate: { es: 'Intermedio', icon: Award },
                advanced: { es: 'Avanzado', icon: Trophy }
              };
              const label = labels[level];
              const Icon = label.icon;
              const isActive = selectedLevel === level;
              
              return (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all border ${
                    isActive 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {label.es}
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map((course) => {
            const progress = courseProgress.find(p => p.courseId === course.id);
            const isCompleted = completedCourseIds.includes(course.id);
            const isInProgress = inProgressCourseIds.includes(course.id);
            const progressPercent = progress ? (progress.completedLessons.length / course.lessons.length) * 100 : 0;

            return (
              <div key={course.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all flex flex-col">
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-5xl bg-slate-50 w-20 h-20 flex items-center justify-center rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform">
                      {course.icon}
                    </div>
                    {isCompleted ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Completado
                      </span>
                    ) : isInProgress ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                        En curso
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> {course.lessons.length} lecciones
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {Math.round(course.estimatedDuration / 60)} min
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(isInProgress || isCompleted) && (
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs font-black text-slate-700">
                        <span>Progreso</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-blue-600'}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <Link
                    href={`/cursos/${course.id}`}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black transition-all ${
                      isCompleted 
                        ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
                    }`}
                  >
                    {isCompleted ? 'Revisar Curso' : isInProgress ? 'Continuar' : 'Empezar ahora'}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal - تم إصلاح ألوان النص في النافذة المنبثقة */}
        {currentCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{currentCourse.icon}</span>
                  <h2 className="text-2xl font-black text-slate-900">{currentCourse.title}</h2>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-900 transition-all">
                  ✕
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-4">
                {currentCourse.lessons.map((lesson, idx) => {
                  const isDone = currentCourseProgress?.completedLessons.includes(lesson.id);
                  return (
                    <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-2xl border ${isDone ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${isDone ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {isDone ? <CheckCircle className="w-6 h-6" /> : idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{lesson.title}</h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lesson.type}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleStartLesson(currentCourse.id, lesson.id)}
                        className={`px-5 py-2 rounded-xl font-bold transition-all ${isDone ? 'text-green-600 hover:bg-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                      >
                        {isDone ? 'Repasar' : 'Iniciar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}