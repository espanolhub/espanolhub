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
  Trophy, Target, Zap, Users, Sparkles, TrendingUp, BookMarked
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
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
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

  const availableCourses = useMemo(() => {
    return getAvailableCourses(completedCourseIds);
  }, [completedCourseIds]);

  const currentCourse = selectedCourse ? getCourseById(selectedCourse) : null;
  const currentCourseProgress = currentCourse ? courseProgress.find(p => p.courseId === currentCourse.id) : null;

  const handleStartCourse = (courseId: string) => {
    startCourse(courseId);
    setCourseProgress(getUserCourseProgress());
    setSelectedCourse(courseId);
  };

  const handleStartLesson = (courseId: string, lessonId: string) => {
    setCurrentLesson(courseId, lessonId);
    // Navigate to the appropriate section based on lesson type
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
      window.location.href = routes[lesson.type] || '/';
    }
  };

  const handleCompleteLesson = (courseId: string, lessonId: string, xpReward: number) => {
    completeLesson(courseId, lessonId, xpReward);
    addXP(xpReward, `Lección completada: ${lessonId}`, courseId);
    
    const course = getCourseById(courseId);
    if (course) {
      updateCourseProgressPercent(courseId, course.lessons.length);
    }
    
    setCourseProgress(getUserCourseProgress());
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 ${cairo.variable}`}>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">5 Cursos Disponibles</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            Cursos y Rutas de Aprendizaje
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Sigue un camino estructurado para aprender español paso a paso con contenido diseñado para todos los niveles
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8" />
              <TrendingUp className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-3xl font-bold mb-1">{courses.length}</div>
            <div className="text-sm text-blue-100">Cursos Totales</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8" />
              <CheckCircle className="w-5 h-5 text-green-200" />
            </div>
            <div className="text-3xl font-bold mb-1">{completedCourseIds.length}</div>
            <div className="text-sm text-green-100">Completados</div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8" />
              <Clock className="w-5 h-5 text-amber-200" />
            </div>
            <div className="text-3xl font-bold mb-1">{inProgressCourseIds.length}</div>
            <div className="text-sm text-amber-100">En Progreso</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8" />
              <Users className="w-5 h-5 text-purple-200" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {courseProgress.length > 0 
                ? Math.round(courseProgress.reduce((acc, p) => acc + p.progressPercent, 0) / courseProgress.length)
                : 0}%
            </div>
            <div className="text-sm text-purple-100">Progreso Total</div>
          </div>
        </div>

        {/* Learning Paths - horizontal scroll */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Rutas de Aprendizaje</h2>
            </div>
            <BookMarked className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {learningPaths.map((path) => {
              const accent = path.accent || 'bg-blue-100';
              const pathCourses = path.courses.map(id => getCourseById(id)).filter(Boolean);
              const completedCount = pathCourses.filter(c => completedCourseIds.includes(c!.id)).length;
              const progressPercent = (completedCount / Math.max(1, pathCourses.length)) * 100;
              
              return (
                <div key={path.id} className="min-w-[320px] bg-white rounded-2xl shadow-xl p-6 flex-shrink-0 border-2 border-gray-100 hover:border-blue-300 transition-all hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
                    <div className={`w-4 h-4 rounded-full ${path.color || 'bg-blue-500'} shadow-lg`} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{path.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-700 mb-3 font-medium">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>{pathCourses.length} Cursos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{Math.round(path.estimatedTotalDuration / 60)} hrs</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span className="font-semibold">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500" 
                        style={{ width: `${progressPercent}%` }} 
                      />
                    </div>
                  </div>

                  {progressPercent > 0 && (
                    <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      <span>{completedCount} de {pathCourses.length} completados</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Level Filter - Enhanced */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Filtrar por Nivel
          </h3>
          <nav aria-label="Filtrar por nivel" className="flex flex-wrap gap-4">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => {
              const labels = {
                all: { es: 'Todos', icon: BookOpen, color: 'from-gray-500 to-gray-600' },
                beginner: { es: 'Principiante', icon: Star, color: 'from-green-500 to-green-600' },
                intermediate: { es: 'Intermedio', icon: Award, color: 'from-blue-500 to-blue-600' },
                advanced: { es: 'Avanzado', icon: Trophy, color: 'from-purple-500 to-purple-600' }
              };
              const label = labels[level];
              const Icon = label.icon;
              const isActive = selectedLevel === level;
              
              return (
                <button
                  key={level}
                  onMouseDown={(e) => createRipple(e)}
                  onClick={() => {
                    setSelectedLevel(level);
                    try { router.replace(`/cursos?level=${level}`); } catch (err) {}
                  }}
                  aria-pressed={isActive}
                  className={`group px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? `bg-gradient-to-r ${label.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                  <span>{label.es}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Courses Grid - Enhanced */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Todos los Cursos ({filteredCourses.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredCourses.map((course) => {
              const progress = courseProgress.find(p => p.courseId === course.id);
              const isCompleted = completedCourseIds.includes(course.id);
              const isInProgress = inProgressCourseIds.includes(course.id);
              const isAvailable = !course.prerequisites || course.prerequisites.every(id => completedCourseIds.includes(id));
              const progressPercent = progress ? (progress.completedLessons.length / course.lessons.length) * 100 : 0;
              const targetHref = course.id === 'carnet-1' ? '/driving-license' : course.id === 'nacionalidad-1' ? '/nacionalidad' : `/cursos/${course.id}`;
              const hasLessons = Array.isArray(course.lessons) && course.lessons.length > 0;

              return (
                <div
                  key={course.id}
                  className={`group relative bg-white rounded-3xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
                    !isAvailable ? 'opacity-60 border-gray-200' : isCompleted ? 'border-green-400' : isInProgress ? 'border-blue-400' : 'border-gray-100'
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {!isAvailable && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                        <Lock className="w-3 h-3" />
                        Bloqueado
                      </div>
                    )}
                    {/* PRO Badge hidden - all content is free */}
                    {isCompleted && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Completado
                      </div>
                    )}
                    {!isCompleted && isInProgress && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        En curso
                      </div>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-4xl">{course.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{course.subtitle || ''}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">{course.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-700 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{course.lessons.length} Lecciones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{Math.round(course.estimatedDuration / 60)} min</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span className="font-semibold">Progreso</span>
                      <span className="font-bold">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}
                        style={{ width: `${progressPercent}%` }} 
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4">
                    {hasLessons ? (
                      <Link
                        href={targetHref}
                        onMouseDown={(e) => createRipple(e)}
                        className={`group/btn flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            : isInProgress
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                        }`}
                      >
                        <span>
                          {isInProgress ? 'Continuar Curso' : isCompleted ? 'Revisar Curso' : 'Empezar Ahora'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div
                        className="w-full px-4 py-3 rounded-xl font-medium bg-gray-50 text-gray-500 border-2 border-dashed border-gray-200 text-center"
                        aria-label="Curso en preparación"
                      >
                        Próximamente
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Detail Modal */}
        {currentCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{currentCourse.icon}</div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">{currentCourse.title}</h2>
                      <p className="text-gray-600">{currentCourse.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {!currentCourseProgress && (
                  <button
                    onClick={() => handleStartCourse(currentCourse.id)}
                    className="w-full mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Comenzar Curso
                  </button>
                )}

                {currentCourseProgress && (
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${currentCourseProgress.progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentCourseProgress.progressPercent}% completado
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Lecciones</h3>
                  {currentCourse.lessons.map((lesson, index) => {
                    const isCompleted = currentCourseProgress?.completedLessons.includes(lesson.id) || false;
                    const isCurrent = currentCourseProgress?.currentLessonId === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-lg border-2 ${
                          isCompleted
                            ? 'border-green-500 bg-green-50'
                            : isCurrent
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                              <p className="text-sm text-gray-600">{lesson.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                <span>{lesson.estimatedDuration} min</span>
                                <span>{lesson.xpReward} XP</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {!isCompleted && (
                              <>
                                <button
                                  onClick={() => handleStartLesson(currentCourse.id, lesson.id)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  Iniciar
                                </button>
                                <button
                                  onClick={() => handleCompleteLesson(currentCourse.id, lesson.id, lesson.xpReward || 10)}
                                  className="px-3 py-2 bg-gray-100 text-slate-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                  Marcar como completado
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Bottom lesson controls */}
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 bg-white border border-gray-200 text-[#0f172a] rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Volver a Cursos
                  </button>
                  <button
                    onClick={() => {
                      // go to next uncompleted lesson if any
                      const lessons = currentCourse.lessons;
                      const completed = currentCourseProgress?.completedLessons || [];
                      const next = lessons.find(l => !completed.includes(l.id));
                      if (next) {
                        setCurrentLesson(currentCourse.id, next.id);
                        handleStartLesson(currentCourse.id, next.id);
                      }
                    }}
                    className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-md font-bold hover:bg-yellow-500 transition-colors"
                  >
                    Próxima Lección
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ads Container - End of Lesson Section */}
      <div className="ads-container mt-8 mb-4"></div>
    </div>
  );
}
