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
  loading: () => <div className="text-gray-600">Cargando contenido...</div>
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
      'ccse-vivienda-y-servicios',
      'ccse-rios-principales',
      'ccse-montañas-sistemas',
      'ccse-climas-regionales',
      'ccse-recursos-naturales',
      'ccse-fronteras-limitrofes'
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
      'ccse-medios-digitales',
      'ccse-musica-tradicional',
      'ccse-baile-flamenco',
      'ccse-gastronomia-española',
      'ccse-deportes-populares',
      'ccse-literatura-clasicos',
      'ccse-arquitectura-tradicional'
    ], 
    type: 'lesson', 
    icon: Award, 
    color: 'from-purple-500 to-pink-600' 
  },
  { 
    id: 'ch4', 
    title: 'Historia de España', 
    lessons: [
      'ccse-historia-antigua',
      'ccse-historia-romana',
      'ccse-historia-visigoda',
      'ccse-reconquista',
      'ccse-edad-media',
      'ccse-descubrimiento',
      'ccse-imperio-español',
      'ccse-guerra-civil',
      'ccse-transicion-democracia',
      'ccse-españa-europea',
      'ccse-historia-reciente'
    ], 
    type: 'lesson', 
    icon: Clock, 
    color: 'from-blue-600 to-indigo-600' 
  },
  { id: 'ch5', title: 'Simulador CCSE', type: 'exam', icon: Award, color: 'from-blue-600 to-indigo-600' },
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
  const [activeLessonIndex, setActiveLessonIndex] = useState(0); // للدرس النشط داخل Chapter
  const [completed, setCompleted] = useState<number[]>([]);
  const [studyTime, setStudyTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const totalChapters = chapterMap.length;

  // حساب رقم الدرس الكلي (ترقيم متواصل عبر جميع الفصول)
  const calculateLessonNumber = (chapterIndex: number, lessonIndexInChapter: number): number => {
    let totalLessons = 0;
    for (let i = 0; i < chapterIndex; i++) {
      totalLessons += chapterMap[i].lessons?.length || 0;
    }
    return totalLessons + lessonIndexInChapter + 1;
  };

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
      addXP(30, 'Completar Capítulo: Constitución y Gobierno', 'nacionalidad'); // Reward XP
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
      try { addXP(30, 'Aprobar Examen CCSE', 'nacionalidad'); } catch (e) {}
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
    setActiveLessonIndex(0); // Reset to first lesson in new chapter
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
    <div className={`min-h-screen bg-white ${cairo.variable} font-sans text-gray-900`}>
      <div className="container mx-auto px-4 max-w-6xl py-6">
        {/* Header Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                🇪🇸 Nacionalidad Española - CCSE
                <span className="block text-xl text-gray-700 font-semibold mt-2" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                  الجنسية الإسبانية - اختبار CCSE
                </span>
              </h1>
              <p className="text-gray-700 text-lg font-medium">
                Preparación completa para el examen CCSE de nacionalidad española
              </p>
            </div>
            <div className="md:hidden">
              <button onClick={() => setSidebarOpen(true)} aria-label="Abrir contenido" className="p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all border border-gray-800 text-white">
                <span style={{ fontSize: '24px', lineHeight: 1 }}>☰</span>
              </button>
            </div>
          </div>

          {/* Stats Bar - Elegant and Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-white text-gray-900 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all modern-card">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{progressPercent}%</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Progreso / التقدم</div>
                </div>
                <Trophy className="w-6 h-6 text-gray-700 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
            
            <div className="bg-white text-gray-900 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all modern-card">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{completed.length}/{totalChapters}</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Completado / مكتمل</div>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
            
            <div className="bg-white text-gray-900 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all modern-card">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{formatTime(studyTime)}</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Tiempo / الوقت</div>
                </div>
                <Clock className="w-6 h-6 text-gray-700 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
            
            <div className="bg-white text-gray-900 p-3 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all modern-card" onClick={() => setShowStats(!showStats)}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900">{totalChapters - completed.length}</div>
                  <div className="text-xs font-medium text-gray-600 mt-0.5">Restantes / متبقي</div>
                </div>
                <Target className="w-6 h-6 text-gray-700 flex-shrink-0 ml-2" aria-hidden="true" />
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg font-semibold mt-4">
            Preparación completa para el examen CCSE de nacionalidad española
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-80">
            <div className="sticky top-4 space-y-4">
              {/* Quick Actions */}
              <div className="modern-card bg-white border border-gray-200 p-4">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-gray-900">
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>⚡</span>
                  Acceso Rápido / وصول سريع
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => selectChapter(4)}
                    className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-2 text-sm font-medium transition-all text-gray-900"
                  >
                    📝 Simulador CCSE
                  </button>
                  <button 
                    onClick={() => setShowTranslations(!showTranslations)}
                    className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-2 text-sm font-medium transition-all text-gray-900"
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
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>✅</span>
                          ) : isLocked ? (
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>🔒</span>
                          ) : (
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>📚</span>
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <div className="text-sm font-semibold text-gray-900">{chap.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            {isCompleted ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <span style={{ fontSize: '12px', lineHeight: 1 }}>✅</span> Completado
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
                    <span style={{ fontSize: '16px', lineHeight: 1 }}>✖</span>
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
                          <span style={{ fontSize: '16px', lineHeight: 1 }}>✅</span>
                        ) : isLocked ? (
                          <span style={{ fontSize: '16px', lineHeight: 1 }}>🔒</span>
                        ) : (
                          <span style={{ fontSize: '16px', lineHeight: 1 }}>
                            {i === 0 ? '📖' : i === 1 ? '🌍' : i === 2 ? '🎨' : i === 3 ? '📜' : '📚'}
                          </span>
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
            <div className="modern-card bg-white shadow-lg overflow-hidden">
              {/* Chapter Header */}
              <div className="bg-gray-50 border-b border-gray-200 p-6 rounded-t-lg">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900">{currentChapter?.title}</h2>
                    <p className="text-gray-700 text-base font-semibold">
                      Preparación oficial para el examen CCSE / الإعداد الرسمي لاختبار CCSE
                    </p>
                  </div>
                  <div>
                    {current <= 1 ? (
                      <span className="px-5 py-2.5 bg-gray-100 rounded-full text-gray-900 text-base font-bold flex items-center gap-2 border border-gray-200">
                        <span style={{ fontSize: '16px', lineHeight: 1 }}>✅</span> <span>Gratis</span>
                      </span>
                    ) : (
                      <span className="px-5 py-2.5 bg-gray-100 rounded-full text-gray-900 text-base font-bold flex items-center gap-2 border border-gray-200">
                        <span style={{ fontSize: '16px', lineHeight: 1 }}>🔒</span> <span>Premium</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar for current chapter */}
                <div className="flex items-center gap-3 text-base font-semibold text-gray-700">
                  <span style={{ fontSize: '18px', lineHeight: 1 }}>⏰</span>
                  <span>Tiempo de estudio: {formatTime(studyTime)}</span>
                  {completed.includes(current) && (
                    <span className="ml-auto flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-bold border border-gray-200">
                      <span style={{ fontSize: '16px', lineHeight: 1 }}>🏆</span> <span className="text-gray-900">Completado</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="border-b bg-gray-50 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '20px', lineHeight: 1 }}>🧠</span>
                    <span className="text-lg font-bold text-gray-900">Herramientas de Estudio / أدوات الدراسة</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setShowTranslations(!showTranslations)}
                      className={`px-5 py-2.5 rounded-lg flex items-center gap-2 text-base font-bold transition-colors shadow-md ${
                        showTranslations 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>💡</span>
                      <span className="font-bold">{showTranslations ? 'العربية' : 'Traducir'}</span>
                    </button>
                    <button 
                      onClick={markAsCompleted}
                      disabled={completed.includes(current)}
                      className={`px-5 py-2.5 rounded-lg flex items-center gap-2 text-base font-bold transition-all shadow-md ${
                        completed.includes(current)
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
                      }`}
                    >
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>✅</span>
                      <span className="font-bold">{completed.includes(current) ? 'Completado' : 'Marcar Completo'}</span>
                    </button>
                    {!isProHook && current > 1 && (
                      <button
                        onClick={() => activatePreview(15)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-bold flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <span style={{ fontSize: '18px', lineHeight: 1 }}>⭐</span>
                        <span className="font-bold">Vista Previa (15m)</span>
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
                  {/* Tabs Navigation - عرض جميع الدروس كـ tabs */}
                  {currentChapter?.lessons && currentChapter.lessons.length > 0 && (
                    <div className="mb-6">
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          {currentChapter.lessons.map((lessonId, index) => {
                            const lessonNumber = calculateLessonNumber(current, index);
                            const isActive = index === activeLessonIndex;
                            const lesson = getLessonById(lessonId);
                            return (
                              <button
                                key={lessonId}
                                onClick={() => setActiveLessonIndex(index)}
                                className={`px-4 py-2.5 rounded-lg font-bold transition-all text-base whitespace-nowrap overflow-hidden text-ellipsis border ${
                                  isActive
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-200'
                                }`}
                                title={lesson?.title || `Lección ${lessonNumber}`}
                              >
                                Lección {lessonNumber}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* عرض الدرس النشط فقط */}
                  {(() => {
                    const lessonId = currentChapter?.lessons?.[activeLessonIndex];
                    if (!lessonId) return null;
                    const lesson = getLessonById(lessonId);
                    if (!lesson) return null;
                    const previewActive = previewExpiry ? Date.now() < previewExpiry : previewMode;
                    const showFull = isProHook || previewActive || current <= 1 || lesson.isFree;
                    const lessonNumber = calculateLessonNumber(current, activeLessonIndex);
                    const totalLessonsInChapter = currentChapter?.lessons?.length || 0;
                    const totalLessons = chapterMap.reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0);

                    return (
                      <div key={lessonId}>
                        {/* معلومات الدرس الحالي */}
                        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <div className="text-base font-semibold text-gray-700 mb-2">
                                Lección {lessonNumber} de {totalLessons} • Capítulo {current + 1}
                              </div>
                              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">{lesson.title}</h3>
                            </div>
                            <div className="text-base font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
                              {activeLessonIndex + 1} / {totalLessonsInChapter} en este capítulo
                            </div>
                          </div>
                        </div>

                        <div className={`relative rounded-lg p-6 ${!showFull ? 'bg-gray-50' : 'bg-white'} border border-gray-200`}>
                          {!showFull && (
                            <div className="absolute inset-0 bg-white/90 z-10 rounded-lg flex items-center justify-center border border-gray-200">
                              <button 
                                onClick={() => setShowUpgrade(true)} 
                                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg border border-gray-800 transition-all"
                              >
                                Desbloquear / فتح
                              </button>
                            </div>
                          )}
                          {/* المحتوى - يظهر دائماً في HTML للـ SEO حتى لو كان blur */}
                          <div className={`prose max-w-none ${!showFull ? 'filter blur-sm pointer-events-none' : ''}`} style={{ minHeight: '200px' }}>
                            {(() => {
                              // إصلاح regex للـ split - البحث عن "العربية:" مع newlines
                              const content = lesson.content || '';
                              // محاولة عدة أنماط للفاصل
                              let arabicSeparator = /\nالعربية:\n/;
                              let parts = content.split(arabicSeparator);
                              // إذا لم يجد، جرب بدون newline في النهاية
                              if (parts.length === 1) {
                                arabicSeparator = /\nالعربية:\n?/;
                                parts = content.split(arabicSeparator);
                              }
                              // إذا لم يجد، جرب pattern آخر
                              if (parts.length === 1) {
                                arabicSeparator = /العربية:\n/;
                                parts = content.split(arabicSeparator);
                              }
                              const esPart = parts[0]?.trim() || '';
                              const arPart = parts[1]?.trim() || '';
                              
                              return (
                                <>
                                  <div className="mb-6 flex items-center gap-3">
                                    <button 
                                      onClick={() => setActiveTab('lesson')} 
                                      className={`px-4 py-2.5 rounded-lg font-semibold text-base transition-all ${
                                        activeTab === 'lesson' 
                                          ? 'bg-blue-600 text-white shadow-md' 
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      📖 Lección
                                    </button>
                                    <button 
                                      onClick={() => setActiveTab('questions')} 
                                      className={`px-4 py-2.5 rounded-lg font-semibold text-base transition-all ${
                                        activeTab === 'questions' 
                                          ? 'bg-blue-600 text-white shadow-md' 
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      ❓ Preguntas de Práctica
                                    </button>
                                  </div>

                                  {activeTab === 'lesson' && (
                                    <article className="bg-white rounded-lg p-6 shadow-sm">
                                      <h3 className="text-2xl font-bold mb-6 text-gray-900">📖 Contenido Teórico</h3>
                                      {/* عرض المحتوى - يظهر دائماً للـ SEO */}
                                      {esPart ? (
                                        <>
                                          {/* عرض النص العادي دائماً - مهم للـ SEO */}
                                          <div 
                                            className="text-gray-900 prose max-w-none"
                                            style={{ 
                                              whiteSpace: 'pre-wrap',
                                              wordBreak: 'break-word',
                                              lineHeight: '1.75'
                                            }}
                                          >
                                            {esPart.split('\n').map((line, idx, arr) => {
                                              // معالجة بسيطة للـ markdown
                                              let processedLine = line;
                                              if (line.startsWith('# ')) {
                                                return <h2 key={idx} className="text-3xl font-extrabold mb-6 mt-8 text-gray-900 border-b-4 border-blue-600 pb-3">{line.substring(2)}</h2>;
                                              } else if (line.startsWith('## ')) {
                                                return <h3 key={idx} className="text-2xl font-bold mb-4 mt-6 text-gray-900 border-l-4 border-blue-500 pl-4">{line.substring(3)}</h3>;
                                              } else if (line.startsWith('### ')) {
                                                return <h4 key={idx} className="text-xl font-bold mb-3 mt-5 text-gray-800">{line.substring(4)}</h4>;
                                              } else if (line.trim() === '') {
                                                return <br key={idx} />;
                                              } else {
                                                // معالجة bold و italic
                                                const parts = [];
                                                let currentIndex = 0;
                                                const boldRegex = /\*\*(.+?)\*\*/g;
                                                const italicRegex = /\*(.+?)\*/g;
                                                let match;
                                                
                                                // معالجة bold أولاً
                                                while ((match = boldRegex.exec(line)) !== null) {
                                                  if (match.index > currentIndex) {
                                                    parts.push(line.substring(currentIndex, match.index));
                                                  }
                                                  parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>);
                                                  currentIndex = match.index + match[0].length;
                                                }
                                                if (currentIndex < line.length) {
                                                  parts.push(line.substring(currentIndex));
                                                }
                                                
                                                return <p key={idx} className="mb-4 leading-relaxed text-gray-800 text-base">{parts.length > 0 ? parts : line}</p>;
                                              }
                                            })}
                                          </div>
                                          {/* تحسين المحتوى مع ReactMarkdown (اختياري) */}
                                          <div className="hidden md:block">
                                            <Suspense fallback={null}>
                                              <div style={{ display: 'none' }}>
                                                <ReactMarkdown>{esPart}</ReactMarkdown>
                                              </div>
                                            </Suspense>
                                          </div>
                                        </>
                                      ) : (
                                        <p className="text-gray-600">No hay contenido disponible para esta lección.</p>
                                      )}
                                      {arPart && (
                                        <div className={`mt-4 p-4 bg-slate-50 rounded ${showTranslations ? '' : 'hidden'}`} dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                          {/* عرض النص العادي دائماً - مهم للـ SEO */}
                                          <div 
                                            className="text-gray-900"
                                            style={{ 
                                              whiteSpace: 'pre-wrap',
                                              wordBreak: 'break-word',
                                              lineHeight: '1.75'
                                            }}
                                          >
                                            {arPart.split('\n').map((line, idx) => {
                                              if (line.startsWith('# ')) {
                                                return <h2 key={idx} className="text-3xl font-extrabold mb-6 mt-8 text-gray-900 border-b-4 border-blue-600 pb-3">{line.substring(2)}</h2>;
                                              } else if (line.startsWith('## ')) {
                                                return <h3 key={idx} className="text-2xl font-bold mb-4 mt-6 text-gray-900 border-r-4 border-blue-500 pr-4">{line.substring(3)}</h3>;
                                              } else if (line.startsWith('### ')) {
                                                return <h4 key={idx} className="text-xl font-bold mb-3 mt-5 text-gray-800">{line.substring(4)}</h4>;
                                              } else if (line.trim() === '') {
                                                return <br key={idx} />;
                                              } else {
                                                return <p key={idx} className="mb-4 leading-relaxed text-gray-800 text-base">{line}</p>;
                                              }
                                            })}
                                          </div>
                                          {/* تحسين المحتوى مع ReactMarkdown (اختياري) */}
                                          {showTranslations && (
                                            <div className="hidden">
                                              <Suspense fallback={null}>
                                                <ReactMarkdown>{arPart}</ReactMarkdown>
                                              </Suspense>
                                            </div>
                                          )}
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

                        {/* أزرار التنقل بين الدروس */}
                        <div className="mt-6 flex items-center justify-between gap-4">
                          <button
                            onClick={() => setActiveLessonIndex(prev => Math.max(0, prev - 1))}
                            disabled={activeLessonIndex === 0}
                            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                              activeLessonIndex === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                            }`}
                          >
                            ← Lección Anterior
                          </button>
                          <span className="text-sm text-gray-600 font-medium">
                            Lección {lessonNumber} de {totalLessons}
                          </span>
                          <button
                            onClick={() => setActiveLessonIndex(prev => Math.min(totalLessonsInChapter - 1, prev + 1))}
                            disabled={activeLessonIndex === totalLessonsInChapter - 1}
                            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                              activeLessonIndex === totalLessonsInChapter - 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                            }`}
                          >
                            Lección Siguiente →
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Chapter 1 Quiz - يظهر فقط في آخر درس من Chapter 1 */}
                  {current === 0 && activeLessonIndex === (currentChapter?.lessons?.length || 0) - 1 && (
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
                                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
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
                            : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
                        }`}>
                          {summary.passed ? (
                            <>
                              <div className="flex items-center gap-3 mb-3">
                                <Award className="w-8 h-8 text-green-600" aria-hidden="true" />
                                <div className="font-bold text-lg text-green-900">¡Felicidades! Has pasado el quiz de Capítulo 1.</div>
                              </div>
                              <div className="text-sm text-green-800 mb-3" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                تهانينا! لقد نجحت في اختبار الفصل الأول.
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="font-bold text-lg text-slate-900 mb-2">Sigue practicando, ¡casi lo logras!</div>
                              <div className="text-sm text-slate-700 mb-3" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                                استمر بالممارسة، قريبًا ستنجح!
                              </div>
                            </>
                          )}
                          <div className="text-base font-semibold text-gray-700">
                            Puntuación: <span className={`${summary.passed ? 'text-green-700' : 'text-slate-700'}`}>{summary.correct}/{summary.total}</span>
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
                          className="btn btn-primary px-8 py-4 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
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
              <BookOpen className="w-6 h-6 text-gray-700" aria-hidden="true" />
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
