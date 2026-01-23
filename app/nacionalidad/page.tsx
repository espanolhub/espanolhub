'use client';
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import { 
  CheckCircle, Lock, BookOpen, Award, Globe, Clock, Lightbulb,
  Trophy, Target, Brain, Star, Download, FileText, Play,
  AlertCircle, Zap, Menu, X
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Cairo } from 'next/font/google';
const ReactMarkdown = dynamic(() => import('react-markdown'), { 
  ssr: false,
  loading: () => <div className="animate-pulse">Cargando...</div>
});
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { getLessonById } from '@/lib/data/nacionalidad-lessons';
import { ccseQuestions } from '@/lib/data/nacionalidad-exams';
import { addXP } from '@/lib/utils/progress';
import { getLessonQuestions } from '@/lib/utils/nacionalidad-questions';
import ExamLibrary from '@/components/ExamLibrary';
import useIsPro from '@/lib/hooks/useIsPro';
import { useTranslations } from '@/lib/hooks/useTranslations';

const ExamSimulator = dynamic(() => import('@/components/ExamSimulator'), { ssr: false });

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600'],
});

const chapterMap = [
  { 
    id: 'ch1', 
    title: 'Constitución y Gobierno', 
    lessons: [
      'ccse-derechos-deberes',
      'ccse-gobierno-leyes',
      'ccse-monarquia-parlamentaria',
      'ccse-derechos-sociales',
      'ccse-ciudadania-participacion',
      'ccse-poderes-publicos',
      'ccse-derechos-fundamentales',
      'ccse-organos-de-gobierno',
      'ccse-sistema-educativo',
      'ccse-salud-publica',
      'ccse-derechos-politicos',
      'ccse-seguridad-publica',
      'ccse-procedimiento-nacionalizacion',
      'ccse-administracion-local',
      'ccse-tribunales',
      'ccse-derechos-laborales',
      'ccse-prestaciones-sociales',
      'ccse-servicios-publicos',
      'ccse-educacion-detalle',
      'ccse-salud-detalle',
      'ccse-participacion-practica'
    ], 
    type: 'lesson', 
    icon: BookOpen, 
    color: 'from-green-500 to-emerald-600' 
  },
  { 
    id: 'ch2', 
    title: 'Geografía y Organización Territorial', 
    lessons: [
      'ccse-organizacion-territorial',
      'ccse-geografia-climatica',
      'ccse-demografia',
      'ccse-economia-basica',
      'ccse-impuestos-basicos',
      'ccse-transporte-y-documentacion',
      'ccse-capitales-autonomicas',
      'ccse-inmigracion-asilo',
      'ccse-vivienda-y-servicios'
    ], 
    type: 'lesson', 
    icon: Globe, 
    color: 'from-blue-500 to-cyan-600' 
  },
  { 
    id: 'ch3', 
    title: 'Cultura y Tradiciones', 
    lessons: [
      'ccse-cultura-tradiciones',
      'ccse-medios-comunicacion',
      'ccse-simbolos-nacionales',
      'ccse-dias-festivos',
      'ccse-cultura-contemporanea',
      'ccse-fiestas-regionales',
      'ccse-medios-digitales'
    ], 
    type: 'lesson', 
    icon: Award, 
    color: 'from-purple-500 to-pink-600' 
  },
  { 
    id: 'ch4', 
    title: 'Historia de España', 
    lessons: [
      'ccse-historia-reciente'
    ], 
    type: 'lesson', 
    icon: Clock, 
    color: 'from-orange-500 to-red-600' 
  },
  { id: 'ch5', title: 'Simulador CCSE', type: 'exam', icon: Award, color: 'from-yellow-500 to-amber-600' },
];

export default function NacionalidadPage() {
  const [current, setCurrent] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { settings } = useAdminSettings();
  const isProHook = useIsPro();
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [showResults, setShowResults] = useState(false);
  const [summary, setSummary] = useState<{ passed: boolean; correct: number; total: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'lesson' | 'questions'>('lesson');
  const [completed, setCompleted] = useState<number[]>([]);
  const [studyTime, setStudyTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const totalChapters = chapterMap.length;

  // Load completed chapters
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('nac_completed_chapters');
        const arr = raw ? JSON.parse(raw) : [];
        setCompleted(Array.isArray(arr) ? arr : []);
      }
    } catch (e) {
      setCompleted([]);
    }
  }, []);

  // Save completed chapters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nac_completed_chapters', JSON.stringify(completed));
    }
  }, [completed]);

  // Track study time
  useEffect(() => {
    const interval = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [current]);

  // Mark chapter as completed
  const markAsCompleted = () => {
    if (!completed.includes(current)) {
      setCompleted([...completed, current]);
      addXP(30); // Reward XP
    }
  };

  // Calculate progress percentage
  const progressPercent = Math.round((completed.length / totalChapters) * 100);
  
  // Format study time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // bilingual sample for Chapter 1 (kept lightweight)
  const ccseQ1 = useMemo(() => ([
    {
      id: 'c1q1',
      question_es: '¿Cuál es la forma de organización política de España?',
      question_ar: 'ما هو شكل التنظيم السياسي لإسبانيا؟',
      options: ['Monarquía parlamentaria', 'República presidencial', 'Monarquía absoluta'],
      correct: 'Monarquía parlamentaria',
      explanation_ar: 'إسبانيا هي ملكية برلمانية، حيث يوجد ملك ومؤسسات ديمقراطية منتخبة.',
    },
    {
      id: 'c1q2',
      question_es: '¿Qué documento es la norma suprema del país?',
      question_ar: 'ما هو الوثيقة التي تمثل القانون الأعلى في البلاد؟',
      options: ['La Constitución', 'El Código Civil', 'La Ley de Municipios'],
      correct: 'La Constitución',
      explanation_ar: 'الدستور هو أعلى قانون يحدد القواعد الأساسية للدولة.',
    },
    {
      id: 'c1q3',
      question_es: '¿Quién sanciona las leyes en España?',
      question_ar: 'من يصدق على القوانين في إسبانيا؟',
      options: ['El Rey', 'El Tribunal Constitucional', 'El Gobierno únicamente'],
      correct: 'El Rey',
      explanation_ar: 'الملك sanciona y promulga las leyes aprobadas por las Cortes.',
    },
    {
      id: 'c1q4',
      question_es: '¿Qué son las Cortes Generales?',
      question_ar: 'ما هي "الكورتيس جنراليس"؟',
      options: ['El Parlamento compuesto por Diputados y Senadores', 'Un tribunal supremo', 'Un organismo local'],
      correct: 'El Parlamento compuesto por Diputados y Senadores',
      explanation_ar: 'Las Cortes Generales son el órgano legislativo formado por Congreso y Senado.',
    },
    {
      id: 'c1q5',
      question_es: '¿Qué derecho protege la libertad de expresión?',
      question_ar: 'ما الحق الذي يحمي حرية التعبير؟',
      options: ['Derechos fundamentales', 'Derechos administrativos', 'Derechos financieros'],
      correct: 'Derechos fundamentales',
      explanation_ar: 'La libertad de expresión es un derecho fundamental protegido por la Constitución.',
    },
    {
      id: 'c1q6',
      question_es: '¿Qué función tiene el Tribunal Constitucional?',
      question_ar: 'ما وظيفة المحكمة الدستورية؟',
      options: ['Controlar la constitucionalidad de las leyes', 'Gestionar municipios', 'Redactar decretos administrativos'],
      correct: 'Controlar la constitucionalidad de las leyes',
      explanation_ar: 'Se encarga de interpretar la Constitución y controlar la compatibilidad de las leyes.',
    },
    {
      id: 'c1q7',
      question_es: '¿Quién es el jefe del gobierno en España?',
      question_ar: 'من هو رئيس الحكومة في إسبانيا؟',
      options: ['El Presidente del Gobierno', 'El Rey', 'El Ministro de Hacienda'],
      correct: 'El Presidente del Gobierno',
      explanation_ar: 'El Presidente del Gobierno dirige la política general del país.',
    },
    {
      id: 'c1q8',
      question_es: '¿Qué derecho permite votar en elecciones?',
      question_ar: 'ما الحق الذي يتيح التصويت في الانتخابات؟',
      options: ['El derecho de sufragio', 'El derecho a la educación', 'El derecho de asociación'],
      correct: 'El derecho de sufragio',
      explanation_ar: 'El sufragio es el derecho a participar en la elección de representantes.',
    },
    {
      id: 'c1q9',
      question_es: '¿Qué institución vela por los derechos humanos en España?',
      question_ar: 'أي مؤسسة تحمي حقوق الإنسان في إسبانيا؟',
      options: ['Defensor del Pueblo', 'Ministerio de Finanzas', 'Banco de España'],
      correct: 'Defensor del Pueblo',
      explanation_ar: 'El Defensor del Pueblo protege y promueve los derechos fundamentales.',
    },
    {
      id: 'c1q10',
      question_es: '¿Qué significa "participación ciudadana"?',
      question_ar: 'ماذا تعني "المشاركة المدنية"؟',
      options: ['Intervenir en la vida política y social', 'Solo pagar impuestos', 'Solo votar una vez'],
      correct: 'Intervenir en la vida política y social',
      explanation_ar: 'Participar activamente en la sociedad y en procesos democráticos.',
    },
  ]), []);

  const handleAnswer = (qid: string, opt: string) => {
    setAnswers(prev => ({ ...prev, [qid]: opt }));
  };

  const checkAnswers = () => {
    setShowResults(true);
    const total = ccseQ1.length;
    let correct = 0;
    ccseQ1.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    const passed = correct >= 8; // pass threshold 8/10
    setSummary({ passed, correct, total });
    if (passed) {
      try { addXP(100, 'Completar Capítulo: Constitución y Gobierno', 'nacionalidad'); } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('successMoment', { detail: { xp: 100 } })); } catch (e) {}
      try {
        const raw = localStorage.getItem('nac_completed_chapters');
        const arr = raw ? JSON.parse(raw) : [];
        if (!arr.includes(1)) {
          arr.push(1);
          localStorage.setItem('nac_completed_chapters', JSON.stringify(arr));
        }
      } catch (e) {}
    }
  };

  const selectChapter = (index: number) => {
    setCurrent(index);
    setSidebarOpen(false);
    setStudyTime(0); // Reset timer
    const lockedByAdmin = index > 1 && settings.locked_modules.nationality;
    if (lockedByAdmin && !isProHook) setShowUpgrade(true);
  };

  const currentChapter = chapterMap[current];
  const ChapterIcon = currentChapter?.icon || BookOpen;
  const [showTranslations, setShowTranslations] = useTranslations();
  const [previewMode, setPreviewMode] = useState(false);
  const [previewExpiry, setPreviewExpiry] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('nac_preview_mode');
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && obj.expires && Date.now() < obj.expires) {
          setPreviewExpiry(obj.expires);
          setPreviewMode(true);
          // auto-disable when expires
          const remaining = obj.expires - Date.now();
          setTimeout(() => {
            try {
              localStorage.removeItem('nac_preview_mode');
            } catch (e) {}
            setPreviewMode(false);
            setPreviewExpiry(null);
          }, remaining);
        }
      }
    } catch (e) {}
  }, []);

  const activatePreview = (minutes: number = 15) => {
    const expires = Date.now() + minutes * 60 * 1000;
    try {
      localStorage.setItem('nac_preview_mode', JSON.stringify({ expires }));
    } catch (e) {}
    setPreviewExpiry(expires);
    setPreviewMode(true);
    setTimeout(() => {
      try { localStorage.removeItem('nac_preview_mode'); } catch (e) {}
      setPreviewMode(false);
      setPreviewExpiry(null);
    }, minutes * 60 * 1000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 ${cairo.variable} font-sans`}>
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                🇪🇸 Nacionalidad Española - CCSE
                <span className="block text-lg md:text-xl text-gray-600 font-normal mt-1" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                  الجنسية الإسبانية - اختبار CCSE
                </span>
              </h1>
            </div>
            <div className="md:hidden">
              <button onClick={() => setSidebarOpen(true)} aria-label="Abrir contenido" className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
                <Menu className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="modern-card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{progressPercent}%</div>
                  <div className="text-xs opacity-90">Progreso / التقدم</div>
                </div>
                <Trophy className="w-8 h-8 opacity-80" />
              </div>
            </div>
            
            <div className="modern-card bg-gradient-to-br from-green-500 to-green-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{completed.length}/{totalChapters}</div>
                  <div className="text-xs opacity-90">Completado / مكتمل</div>
                </div>
                <CheckCircle className="w-8 h-8 opacity-80" />
              </div>
            </div>
            
            <div className="modern-card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{formatTime(studyTime)}</div>
                  <div className="text-xs opacity-90">Tiempo / الوقت</div>
                </div>
                <Clock className="w-8 h-8 opacity-80" />
              </div>
            </div>
            
            <div className="modern-card bg-gradient-to-br from-amber-500 to-amber-600 text-white p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowStats(!showStats)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalChapters - completed.length}</div>
                  <div className="text-xs opacity-90">Restantes / متبقي</div>
                </div>
                <Target className="w-8 h-8 opacity-80" />
              </div>
            </div>
          </div>

          <p className="text-gray-600">
            Preparación completa para el examen CCSE de nacionalidad española
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-80">
            <div className="sticky top-4 space-y-4">
              {/* Quick Actions */}
              <div className="modern-card bg-gradient-to-br from-purple-500 to-pink-600 text-white p-4">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Acceso Rápido / وصول سريع
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => selectChapter(4)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-2 text-sm font-medium transition-all"
                  >
                    📝 Simulador CCSE
                  </button>
                  <button 
                    onClick={() => setShowTranslations(!showTranslations)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-2 text-sm font-medium transition-all"
                  >
                    🌐 {showTranslations ? 'Ocultar' : 'Mostrar'} Árabe
                  </button>
                </div>
              </div>

              {/* Chapter List */}
              <div className="modern-card bg-white p-4 max-h-[600px] overflow-y-auto">
                <h3 className="font-bold mb-3 text-gray-900">Contenido del Curso</h3>
                <nav className="space-y-2">
                  {chapterMap.map((chap, i) => {
                    const Icon = chap.icon || BookOpen;
                    const isActive = i === current;
                    const isLocked = i > 1 && settings.locked_modules.nationality && !isProHook;
                    const isCompleted = completed.includes(i);
                    
                    return (
                      <button
                        key={chap.id}
                        onClick={() => selectChapter(i)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-50 to-purple-100 ring-2 ring-purple-400 shadow-md'
                            : 'hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : isLocked ? (
                            <Lock className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-600'}`} />
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <div className="text-sm font-semibold text-gray-900">{chap.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            {isCompleted ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Completado
                              </span>
                            ) : (
                              <span className="text-blue-600">✨ Gratis</span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Drawer mobile */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-4 overflow-auto modern-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Contenido</h2>
                  <button onClick={() => setSidebarOpen(false)} aria-label="Cerrar">
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {chapterMap.map((chap, i) => {
                    const Icon = chap.icon || BookOpen;
                    const isActive = i === current;
                    const isLocked = i > 1 && settings.locked_modules.nationality && !isProHook;
                    const isCompleted = completed.includes(i);
                    
                    return (
                      <button
                        key={chap.id}
                        onClick={() => selectChapter(i)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl ${isActive ? 'bg-gray-100' : ''}`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Icon className="w-5 h-5 text-gray-600" />
                        )}
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900">{chap.title}</div>
                          <div className="text-xs text-gray-500">{i <= 1 ? 'Gratis' : 'Premium'}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1">
            <div className="modern-card bg-white shadow-lg">
              {/* Chapter Header */}
              <div className={`bg-gradient-to-r ${currentChapter?.color || 'from-purple-500 to-purple-600'} text-white p-6 rounded-t-xl`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentChapter?.title}</h2>
                    <p className="text-white/90 text-sm">
                      Preparación oficial para el examen CCSE / الإعداد الرسمي لاختبار CCSE
                    </p>
                  </div>
                  <div>
                    {current <= 1 ? (
                      <span className="px-4 py-2 bg-green-500 rounded-full text-white text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Gratis
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-amber-500 rounded-full text-white text-sm font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Premium
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar for current chapter */}
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Tiempo de estudio: {formatTime(studyTime)}</span>
                  {completed.includes(current) && (
                    <span className="ml-auto flex items-center gap-1 bg-green-500/30 px-3 py-1 rounded-full">
                      <Award className="w-4 h-4" /> Completado
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="border-b bg-gray-50 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-700">Herramientas de Estudio / أدوات الدراسة</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setShowTranslations(!showTranslations)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                        showTranslations 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showTranslations ? 'العربية' : 'Traducir'}
                    </button>
                    <button 
                      onClick={markAsCompleted}
                      disabled={completed.includes(current)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                        completed.includes(current)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {completed.includes(current) ? 'Completado' : 'Marcar Completo'}
                    </button>
                    {!isProHook && current > 1 && (
                      <button
                        onClick={() => activatePreview(15)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Vista Previa (15m)
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">

              {/* Content */}
              {currentChapter?.type === 'lesson' ? (
                <>
                    {(currentChapter?.lessons || []).map((lid) => {
                    const lesson = getLessonById(lid);
                    if (!lesson) return null;
                    const previewActive = previewExpiry ? Date.now() < previewExpiry : previewMode;
                    const showFull = isProHook || previewActive || current <= 1 || lesson.isFree;
                    return (
                      <div key={lid} className="mb-8">
                    <div className={`relative rounded-xl p-6 ${!showFull ? 'bg-gray-50' : 'bg-gradient-to-br from-white to-gray-50'} border border-gray-100`}>
                          {!showFull && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
                              <button 
                                onClick={() => setShowUpgrade(true)} 
                                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                              >
                                Desbloquear / فتح
                              </button>
                            </div>
                          )}
                          <div className={`prose max-w-none ${!showFull ? 'filter blur-sm pointer-events-none' : ''}`}>
                            {(() => {
                              const parts = (lesson.content || '').split(/\\nالعربية:??\\n?/);
                              const esPart = parts[0] || '';
                              const arPart = parts[1] || '';
                              return (
                                <>
                                  <div className="mb-4 flex items-center gap-2">
                                    <button onClick={() => setActiveTab('lesson')} className={`px-3 py-1 rounded ${activeTab === 'lesson' ? 'bg-slate-100 font-semibold' : 'text-slate-600'}`}>📖 Lección</button>
                                    <button onClick={() => setActiveTab('questions')} className={`px-3 py-1 rounded ${activeTab === 'questions' ? 'bg-slate-100 font-semibold' : 'text-slate-600'}`}>❓ Preguntas de Práctica</button>
                                  </div>

                                  {activeTab === 'lesson' && (
                                    <article className="bg-white rounded-lg p-6 shadow-sm">
                                      <h3 className="text-lg font-bold mb-4">📖 Contenido Teórico</h3>
                                      <ReactMarkdown>{esPart}</ReactMarkdown>
                                      {arPart && showTranslations && (
                                        <div className="mt-4 p-4 bg-slate-50 rounded" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                          <ReactMarkdown>{arPart}</ReactMarkdown>
                                        </div>
                                      )}
                                    </article>
                                  )}

                                  {activeTab === 'questions' && (
                                    <div className="space-y-4 mt-4">
                                      {(() => {
                                        const questions = getLessonQuestions(lesson);
                                        if (questions.length === 0) {
                                          return (
                                            <div className="text-sm text-gray-500">
                                              {!showFull ? 'Preguntas de práctica disponibles en la versión PRO.' : 'No hay preguntas disponibles para esta lección.'}
                                            </div>
                                          );
                                        }
                                        const QuestionCard = require('@/components/nacionalidad/QuestionCard').default;
                                        return questions.map((q, idx) => (
                                          <QuestionCard 
                                            key={q.id} 
                                            number={idx+1} 
                                            id={q.id} 
                                            question={q.question} 
                                            question_ar={q.question_ar} 
                                            options={q.options} 
                                            correct={q.correctAnswer}
                                          />
                                        ));
                                      })()}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Chapter 1 Quiz */}
                  {current <= 1 && (
                    <section className="mt-8">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Capítulo 1 (Bilingüe)</h3>
                        <p className="text-sm text-gray-600">Responde las preguntas para evaluar tu comprensión</p>
                      </div>
                      
                      <div className="space-y-6">
                        {ccseQ1.map((q, idx) => {
                          const selected = answers[q.id];
                          const wrong = showResults && selected && selected !== q.correct;
                          const correct = showResults && selected === q.correct;
                          const isSelected = answers[q.id] === selected;
                          
                          return (
                            <div key={q.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                              <div className="flex items-start gap-4 mb-4">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  correct ? 'bg-green-100 text-green-700' : wrong ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 mb-2 text-lg">{q.question_es}</div>
                                  {showTranslations && (
                                    <div className="text-sm text-gray-600 mb-4" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                      {q.question_ar}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {q.options.map(opt => {
                                  const isOptSelected = answers[q.id] === opt;
                                  const isOptCorrect = opt === q.correct;
                                  
                                  return (
                                    <button
                                      key={opt}
                                      onClick={() => !showResults && handleAnswer(q.id, opt)}
                                      disabled={showResults}
                                      className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                        showResults && isOptCorrect
                                          ? 'bg-green-50 border-green-400 text-green-900 font-semibold'
                                          : showResults && isOptSelected && wrong
                                          ? 'bg-red-50 border-red-400 text-red-900'
                                          : isOptSelected && !showResults
                                          ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-200'
                                          : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
                                      } ${showResults ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02]'}`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{opt}</span>
                                        {showResults && isOptCorrect && (
                                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                              
                              {showResults && wrong && (
                                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                  <div className="text-sm font-semibold text-red-900 mb-2">
                                    Respuesta correcta: <span className="font-normal">{q.correct}</span>
                                  </div>
                                  {showTranslations && (
                                    <div className="text-sm text-red-800 mt-2" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                      {q.explanation_ar}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {!showResults ? (
                        <div className="mt-8 flex justify-center">
                          <button
                            onClick={checkAnswers}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg"
                          >
                            Verificar Respuestas
                          </button>
                        </div>
                      ) : summary && (
                        <div className={`mt-8 p-6 rounded-xl border-2 ${
                          summary.passed 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                            : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300'
                        }`}>
                          {summary.passed ? (
                            <>
                              <div className="flex items-center gap-3 mb-3">
                                <Award className="w-8 h-8 text-green-600" />
                                <div className="font-bold text-lg text-green-900">¡Felicidades! Has pasado el quiz de Capítulo 1.</div>
                              </div>
                              <div className="text-sm text-green-800 mb-3" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                تهانينا! لقد نجحت في اختبار الفصل الأول.
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="font-bold text-lg text-yellow-900 mb-2">Sigue practicando, ¡casi lo logras!</div>
                              <div className="text-sm text-yellow-800 mb-3" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                استمر بالممارسة، قريبًا ستنجح!
                              </div>
                            </>
                          )}
                          <div className="text-base font-semibold text-gray-700">
                            Puntuación: <span className={`${summary.passed ? 'text-green-700' : 'text-yellow-700'}`}>{summary.correct}/{summary.total}</span>
                          </div>
                        </div>
                      )}
                    </section>
                  )}
                </>
              ) : (
                // Exam chapter
                <div>
                  { (isProHook || (previewExpiry ? Date.now() < previewExpiry : previewMode)) ? (
                    <React.Suspense fallback={<div className="text-center py-12">Cargando simulador CCSE...</div>}>
                    <ExamSimulator
                        isProUser={isProHook}
                        onRequestPro={() => setShowUpgrade(true)}
                        questionsProp={(isProHook ? require('@/lib/data/nacionalidad-exams').ccseFullQuestions : require('@/lib/data/nacionalidad-exams').ccseQuestions).map((q:any) => ({
                          id: q.id,
                          question_es: q.question,
                          question_ar: q.question_ar || '',
                          options: q.options || [],
                          correct: q.correctAnswer === undefined ? (q.correct ? String(q.correct) : '') : String(q.correctAnswer),
                          explanation_ar: q.explanation_ar || q.explanation || '',
                        }))}
                        timeLimitMinutes={60}
                        passThreshold={30}
                        xpOnPass={200}
                        achievementId="ccse-apto"
                      />
                    </React.Suspense>
                  ) : (
                    <div className="relative">
                      <div className="filter blur-sm p-8 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                        <div className="text-center">
                          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-gray-700 mb-2">Simulador CCSE Completo</h3>
                          <p className="text-gray-600">Desbloquea PRO para acceder al simulador completo con todas las preguntas oficiales</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => setShowUpgrade(true)}
                          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
                        >
                          Desbloquear PRO
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                onClick={() => current > 0 && selectChapter(current - 1)}
                disabled={current === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  current === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                ← Anterior
              </button>
              <button
                onClick={() => current < totalChapters - 1 && selectChapter(current + 1)}
                disabled={current === totalChapters - 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  current === totalChapters - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                Siguiente →
              </button>
            </div>
          </main>
        </div>

        {/* Exam Library section */}
        <div className="mt-8">
          <div className="modern-card bg-white p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              Biblioteca de Exámenes / مكتبة الامتحانات
            </h2>
            <ExamLibrary />
          </div>
        </div>
      </div>
      <ProUpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} onGetPro={() => { setShowUpgrade(false); try{ localStorage.setItem('isProUser','true'); }catch(e){} window.location.reload(); }} />
    </div>
  );
}
