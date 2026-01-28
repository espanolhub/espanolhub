 'use client';
import * as React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, Play, Lock, Menu, X, FileText, 
  Trophy, Clock, BookOpen, Award,
  Star, Target, Brain, Zap, AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import dynamic from 'next/dynamic';
import { getDrivingLessonById } from '@/lib/data/driving-lessons';
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
const Chapter2Priority = dynamic(() => import('@/components/Chapter2Priority'), { ssr: false });
const Chapter3Signs = dynamic(() => import('@/components/Chapter3Signs'), { ssr: false });
import { addXP } from '@/lib/utils/progress';
import { useMemo } from 'react';
import useIsPro from '@/lib/hooks/useIsPro';

const ExamSimulator = dynamic(() => import('@/components/ExamSimulator'), { ssr: false });

// Mapping between chapter index and lesson ID
const lessonIds = [
  'driving-1-definiciones',
  'driving-2-velocidades',
  'driving-3-senales',
  'driving-4-prioridad',
  'driving-5-condiciones',
  'driving-6-alcohol-drogas',
  'driving-7-noche',
  'driving-8-estacionamiento',
  'driving-9-seguridad-infantil',
  'driving-10-mantenimiento',
  'driving-11-motores-frenos',
  'driving-12-climatologia',
  'driving-13-emergencias',
  'driving-14-manejo-ciudad',
  'driving-15-repaso-final',
  'driving-16-maniobras',
  'driving-17-normas-multas',
  'driving-18-repaso-completo',
];

const chapters = Array.from({ length: 18 }, (_, i) => ({
  id: `ch-${i + 1}`,
  title: `Capítulo ${i + 1}: ${[
    'Definiciones',
    'Límites de Velocidad',
    'Señales de Tránsito',
    'Prioridad',
    'Condiciones de la Carretera',
    'Alcohol y Drogas',
    'Conducción Nocturna',
    'Estacionamiento',
    'Seguridad Infantil',
    'Mantenimiento del Vehículo',
    'Motores y Frenos',
    'Climatología',
    'Emergencias',
    'Conducción en Ciudad',
    'Conducción en Autopista',
    'Maniobras',
    'Normas y Multas',
    'Repaso Final',
  ][i]}`,
  lessonId: lessonIds[i] || null,
  locked: false, // All chapters are now unlocked
  isFree: i < 2, // first two chapters free
}));

export default function DrivingLicensePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('dl_completed_chapters');
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      // ignore
    }
    return [];
  });
  const [studyTime, setStudyTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const { settings } = useAdminSettings();
  const [summary, setSummary] = useState<{ passed: boolean; correct: number; total: number } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const isProHook = useIsPro();
  
  // Track study time
  useEffect(() => {
    if (current !== -1) {
      const interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [current]);

  // Save completed chapters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dl_completed_chapters', JSON.stringify(completed));
    }
  }, [completed]);

  const markAsCompleted = () => {
    if (!completed.includes(current)) {
      setCompleted([...completed, current]);
      addXP(20, `Capítulo ${current} completado`, 'driving-license'); // Reward XP for completing chapter
    }
  };

  const selectChapter = (index: number) => {
    setCurrent(index);
    setSidebarOpen(false);
    setStudyTime(0); // Reset timer
    // Check if chapter is premium (not free) and user is not Pro
    const chapterIsFree = chapters[index]?.isFree;
    if (!chapterIsFree && !isProHook) {
      setShowUpgrade(true);
    }
  };
  
  // Calculate progress percentage
  const progressPercent = Math.round((completed.length / chapters.length) * 100);
  
  // Format study time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const ChapterStatusIcon = ({ index }: { index: number }) => {
    const ch = chapters[index];
    if (completed.includes(index)) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (index === current) return <Play className="w-5 h-5 text-blue-600" />;
    // All chapters are now unlocked, but premium content requires Pro
    const isFree = ch.isFree;
    if (!isFree && !isProHook) return <Lock className="w-5 h-5 text-gray-500" aria-hidden="true" />;
    return <Play className="w-5 h-5 text-gray-500" aria-hidden="true" />;
  };


  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                🚗 Carnet de Conducir
                <span className="block text-lg md:text-xl text-gray-600 font-normal mt-1">
                  Curso Oficial Completo
                </span>
              </h1>
            </div>
            <div className="md:hidden">
              <button onClick={() => setSidebarOpen(true)} aria-label="Abrir contenido" className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
                <Menu className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Stats Bar - Elegant and Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="modern-card bg-white text-gray-900 p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{progressPercent}%</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Progreso</div>
                </div>
                <Trophy className="w-6 h-6 text-gray-700 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
            
            <div className="modern-card bg-white text-gray-900 p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{completed.length}/{chapters.length}</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Completados</div>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
            
            <div className="modern-card bg-white text-gray-900 p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{formatTime(studyTime)}</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Tiempo</div>
                </div>
                <Clock className="w-6 h-6 text-gray-700 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
            
            <div className="modern-card bg-white text-gray-900 p-3 cursor-pointer hover:shadow-md transition-all border border-gray-200" onClick={() => setShowStats(!showStats)}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{chapters.length - completed.length}</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Restantes</div>
                </div>
                <Target className="w-6 h-6 text-gray-700 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <div className="relative">
              <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="🔍 Buscar capítulo (ej. Multas, Señales, Prioridad)... ابحث عن فصل" 
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl text-sm bg-white shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                🔍
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-80">
            <div className="sticky top-4 space-y-4">
              {/* Quick Actions */}
              <div className="modern-card bg-white border border-gray-200 p-4">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-gray-900">
                  <Zap className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  Acceso Rápido
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => { setCurrent(-1); setSidebarOpen(false); }} 
                    className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-2 text-sm font-medium transition-all text-gray-900"
                  >
                    📝 Simulador de Examen
                  </button>
                </div>
              </div>

              {/* Chapter List */}
              <div className="modern-card bg-white border border-gray-200 p-4 max-h-[600px] overflow-y-auto">
                <h3 className="font-bold mb-3 text-gray-900">Contenido del Curso</h3>
                <nav className="space-y-2">
                  {chapters.filter(ch => {
                    const q = search.trim().toLowerCase();
                    if (!q) return true;
                    return ch.title.toLowerCase().includes(q);
                  }).map((chap, i) => (
                    <button
                      key={chap.id}
                      onClick={() => selectChapter(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all border ${
                        i === current 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <ChapterStatusIcon index={i} />
                      </div>
                      <div className="text-left flex-1">
                        <div className={`text-sm font-semibold ${i === current ? 'text-white' : 'text-gray-900'}`}>{chap.title}</div>
                        <div className={`text-xs flex items-center gap-2 ${i === current ? 'text-gray-300' : 'text-gray-600'}`}>
                          {completed.includes(i) ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-gray-700" aria-hidden="true" /> Completado
                            </span>
                          ) : (
                            <span>✨ Gratis</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
 
          {/* Upgrade Modal */}
          <ProUpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} onGetPro={() => {
            // placeholder - redirect to purchase or show message
            setShowUpgrade(false);
            window.location.href = '/pricing';
          }} />

          {/* Drawer mobile */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-4 overflow-auto modern-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Contenido</h2>
                  <button onClick={() => setSidebarOpen(false)} aria-label="Cerrar">
                    <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  </button>
                </div>
              <nav className="space-y-2">
                  {chapters.map((chap, i) => (
                    <button
                      key={chap.id}
                      onClick={() => selectChapter(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl ${i === current ? 'bg-gray-100' : ''}`}
                    >
                      <ChapterStatusIcon index={i} />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{chap.title}</div>
                        <div className="text-xs text-gray-500">{chap.isFree ? 'Gratis' : 'Premium'}</div>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => { setCurrent(-1); setSidebarOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl">
                    <div className="flex-shrink-0">📝</div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">Simulador de Examen 📝</div>
                      <div className="text-xs text-gray-500">Práctica oficial</div>
                    </div>
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1">
            <div className="modern-card bg-white border border-gray-200">
              {/* Chapter Header */}
              <div className="bg-gray-50 border-b border-gray-200 p-6 rounded-t-lg">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{chapters[current].title}</h2>
                    <p className="text-gray-700 text-sm font-semibold">
                      Lección detallada con explicación completa / درس مفصل مع شرح كامل
                    </p>
                  </div>
                  <div>
                    {/* All content is free now */}
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-900 text-sm font-medium flex items-center gap-2 border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-gray-700" aria-hidden="true" /> Todo Gratis
                    </span>
                  </div>
                </div>

                {/* Progress Bar for current chapter */}
                <div className="flex items-center gap-3 text-sm text-gray-700 font-semibold">
                  <Clock className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  <span>Tiempo de estudio: {formatTime(studyTime)}</span>
                  {completed.includes(current) && (
                    <span className="ml-auto flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      <Award className="w-5 h-5 text-gray-700" aria-hidden="true" /> <span className="text-gray-900">Completado</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              {current !== -1 && (
                <div className="border-b bg-gray-50 px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-gray-700" aria-hidden="true" />
                      <span className="text-sm font-semibold text-gray-700">Herramientas de Estudio</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={markAsCompleted}
                        disabled={completed.includes(current)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all border ${
                          completed.includes(current)
                            ? 'bg-gray-100 text-gray-600 cursor-not-allowed border-gray-200'
                            : 'bg-gray-900 hover:bg-gray-800 text-white border-gray-900'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" aria-hidden="true" />
                        {completed.includes(current) ? 'Completado' : 'Marcar Completo'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="p-6">

              {current === -1 ? (
                // Exam Simulator
                <div>
                  <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">
                          Simulador de Examen Oficial
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">
                          Practica con preguntas reales del examen DGT. El simulador incluye 30 preguntas con imágenes y casos prácticos.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full">30 Preguntas</span>
                          <span className="px-3 py-1 bg-blue-500 text-white rounded-full">Tiempo Real</span>
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full">Corrección Automática</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <React.Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando el simulador...</p>
                      </div>
                    </div>
                  }>
                    {/* @ts-ignore */}
                    <ExamSimulator isProUser={isProHook} onRequestPro={() => setShowUpgrade(true)} />
                  </React.Suspense>
                </div>
              ) : chapters[current]?.title.toLowerCase().includes('prioridad') ? (
                <div id="dl-lesson-content">
                  <Chapter2Priority isPro={isProHook} onRequestPro={() => setShowUpgrade(true)} />
                </div>
              ) : (() => {
                // Get lesson for current chapter
                const currentChapter = chapters[current];
                const lessonId = (currentChapter as any)?.lessonId;
                const lesson = lessonId ? getDrivingLessonById(lessonId) : null;
                const chapterIsFree = currentChapter?.isFree;
                const showFull = isProHook || chapterIsFree;
                
                // No special handling needed - all chapters use the same display logic
                
                // For other chapters, display lesson content
                if (!lesson) {
                  return (
                    <div id="dl-lesson-content" className="p-6">
                      <p className="text-gray-600">El contenido para este capítulo estará disponible pronto.</p>
                    </div>
                  );
                }
                
                return (
                  <div id="dl-lesson-content" className="relative">
                    {/* Lock overlay removed - all content is free */}
                    <div>
                      {/* Learning Objectives */}
                      <div className="mb-6 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-gray-700" aria-hidden="true" />
                          Objetivos de Aprendizaje
                        </h3>
                        <p className="text-gray-700 text-sm">
                          Al completar este capítulo, comprenderás los conceptos fundamentales y estarás preparado para aplicarlos en situaciones reales de conducción.
                        </p>
                      </div>

                      {/* Main Content */}
                      <div className="prose prose-lg max-w-none">
                        <ReactMarkdown 
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4" {...props} />,
                            li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                          }}
                        >
                          {lesson.content}
                        </ReactMarkdown>
                      </div>

                      {/* Key Summary */}
                      {lesson.resumenClave && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900">
                          <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-900">
                            <BookOpen className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            Resumen Clave
                          </h4>
                          <p className="text-gray-800 font-medium mb-3">{lesson.resumenClave.es}</p>
                        </div>
                      )}

                      {/* Common Mistakes */}
                      {lesson.erroresComunes && lesson.erroresComunes.length > 0 && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900">
                          <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-900">
                            <AlertCircle className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            Errores Comunes a Evitar
                          </h4>
                          <ul className="space-y-2">
                            {lesson.erroresComunes.map((error, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Practice Tips */}
                      <div className="mt-6 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900">
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-900">
                          <Star className="w-5 h-5 text-gray-700" aria-hidden="true" />
                          Consejos para Practicar
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            Repasa este capítulo varias veces antes del examen
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            Practica con el simulador después de estudiar
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            Toma notas de los puntos clave
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
              </div>
            </div>

            {/* Navigation Buttons */}
            {current !== -1 && (
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  onClick={() => current > 0 && selectChapter(current - 1)}
                  disabled={current === 0}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 border ${
                    current === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => current < chapters.length - 1 && selectChapter(current + 1)}
                  disabled={current === chapters.length - 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 border ${
                    current === chapters.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900'
                  }`}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

