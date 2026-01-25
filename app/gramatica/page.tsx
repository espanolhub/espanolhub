 'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  allVerbConjugations, 
  grammarTables, 
  conjugateAdjective,
  getConjugationsByTense,
  getAllInfinitiveVerbs,
  getConjugation,
  tenseInfo,
  type TenseType
} from '@/lib/data/grammar';
import { conjugateRegularVerb } from '@/lib/data/verb-conjugator';
import useIsPro from '@/lib/hooks/useIsPro';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import { 
  grammarExercises, 
  getExercisesByCategory, 
  getExercisesByLevel,
  getRandomExercises,
  type GrammarExercise 
} from '@/lib/data/grammar-exercises';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';
const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });
import { createRipple } from '@/lib/utils/ripple';
import { X, CheckCircle, XCircle, BookOpen, PenTool, Lightbulb, Copy, Volume2, Info, ArrowRight, List, PlayCircle } from 'lucide-react';
import { addXP, updateStats, getUserProgress } from '@/lib/utils/progress';
import ProBadge from '@/components/ProBadge';
import AdminBadge from '@/components/AdminBadge';
import { useTranslations, TranslationToggleButton } from '@/lib/hooks/useTranslations';

type TabType = 'learn' | 'exercises';

export default function GramaticaPage() {
  // Translation toggle
  const [showTranslations, setShowTranslations] = useTranslations();
  
  // Tab management
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  
  // Learn tab state
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<TenseType>('presente');
  const [verbSearch, setVerbSearch] = useState<string>('');
  const scrollPositionRef = useRef<number>(0);
  
  // Exercises tab state
  const [selectedCategory, setSelectedCategory] = useState<GrammarExercise['category'] | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const [exerciseKey, setExerciseKey] = useState(0); // Key to force re-randomization
  
  // Expose exerciseKey to window to avoid potential client-side reference errors
  // Some client code or third-party scripts may reference a global `exerciseKey`.
  // Keep this in sync to prevent "exerciseKey is not defined" runtime errors.
  useEffect(() => {
    try {
      (window as any).exerciseKey = exerciseKey;
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [exerciseKey]);
  // Memoize جميع الأفعال لتجنب إعادة الحساب في كل render
  // Merge global verbs with new "Verbos Cotidianos en España" while avoiding duplicates
  const { grammarVerbs } = require('@/lib/data/grammar-verbs') as { grammarVerbs: Record<string, string[]> };
  const allInfinitiveVerbs = useMemo(() => {
    const base = getAllInfinitiveVerbs() || [];
    const added = Object.values(grammarVerbs || {}).flat();
    return Array.from(new Set([...base, ...added]));
  }, []);

  // verbs limit for lazy loading (keeps page lightweight)
  const [verbsLimit, setVerbsLimit] = useState<number>(20);
  const categories = useMemo(() => ([
    { id: 'dailyLife', label: 'Vida Cotidiana', verbs: grammarVerbs.dailyLife || [] },
    { id: 'driving', label: 'Conducir y Calles', verbs: grammarVerbs.driving || [] },
    { id: 'adminLegal', label: 'Administración / Legal', verbs: grammarVerbs.adminLegal || [] },
  ]), [grammarVerbs]);
  const router = useRouter();
  // temporarily disable badges UI while preserving metadata/storage for later implementation
  const showBadges = true;
  const [completedBadges, setCompletedBadges] = useState<Record<string, boolean>>({});

  const THIRTY_DAYS_MS = 1000 * 60 * 60 * 24 * 30;

  function checkBadgeForKey(key: string) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.completedAt) {
        localStorage.removeItem(key);
        return false;
      }
      const completedAt = Number(parsed.completedAt);
      if (Number.isNaN(completedAt)) {
        localStorage.removeItem(key);
        return false;
      }
      if (Date.now() - completedAt > THIRTY_DAYS_MS) {
        localStorage.removeItem(key);
        return false;
      }
      return true;
    } catch (e) {
      try { localStorage.removeItem(key); } catch(_) {}
      return false;
    }
  }

  useEffect(() => {
    if (!showBadges) return;
    const map: Record<string, boolean> = {};
    categories.forEach(c => {
      const key = `gram_topic_completed_${c.id}`;
      map[c.id] = checkBadgeForKey(key);
    });
    setCompletedBadges(map);

    const handler = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail || {};
        const categoriesMarked: string[] = detail.categoriesMarked || [];
        const categoryKey: string = detail.category;
        const mapUpdate = { ...map };
        if (categoryKey) {
          mapUpdate[categoryKey] = checkBadgeForKey(`gram_topic_completed_${categoryKey}`);
        }
        categoriesMarked.forEach((cid) => {
          mapUpdate[cid] = checkBadgeForKey(`gram_topic_completed_${cid}`);
        });
        setCompletedBadges(mapUpdate);
      } catch (err) {}
    };
    window.addEventListener('gramTopicCompleted', handler as EventListener);
    return () => window.removeEventListener('gramTopicCompleted', handler as EventListener);
  }, [categories, showBadges]);

  // Memoize الأفعال المفلترة
  const filteredVerbs = useMemo(() => {
    if (!verbSearch) return allInfinitiveVerbs;
    const searchLower = verbSearch.toLowerCase();
    return allInfinitiveVerbs.filter(verb => verb.toLowerCase().includes(searchLower));
  }, [allInfinitiveVerbs, verbSearch]);

  // Premium hook
  const isPro = useIsPro();
  const adminSettings = useAdminSettings();
  const previewMode = adminSettings?.previewMode ?? false;

  // Memoize التمارين المفلترة مع اختيار عشوائي
  const filteredExercises = useMemo(() => {
    let exercises = grammarExercises;
    
    if (selectedCategory !== 'all') {
      exercises = getExercisesByCategory(selectedCategory);
    }
    
    exercises = exercises.filter(ex => ex.level === selectedLevel);
    
    // Select 15-20 random exercises (depending on available count)
    const count = Math.min(20, Math.max(15, exercises.length));
    const randomExercises = getRandomExercises(exercises, count);
    
    return randomExercises;
  }, [selectedCategory, selectedLevel, exerciseKey]); // Add exerciseKey to dependencies

  // حفظ موقع التمرير عند فتح Modal
  const handleOpenModal = (type: 'verb' | 'table', id: string) => {
    scrollPositionRef.current = window.scrollY;
    if (type === 'verb') {
      setSelectedVerb(id);
    } else {
      setSelectedTable(id);
    }
    // منع scroll للخلفية
    document.body.style.overflow = 'hidden';
  };

  // استعادة موقع التمرير عند إغلاق Modal
  const handleCloseModal = useCallback(() => {
    setSelectedVerb(null);
    setSelectedTable(null);
    document.body.style.overflow = 'unset';
    // استعادة موقع التمرير بعد render
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  }, []);

  // إغلاق Modal عند الضغط على Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedVerb || selectedTable)) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVerb, selectedTable, handleCloseModal]);

  // Exercise handlers
  const handleAnswer = (exerciseId: string, answer: string) => {
    setAnswers({ ...answers, [exerciseId]: answer });
  };

  const checkAnswers = () => {
    setShowResults(true);
    
    // Calculate score and update stats
    let correct = 0;
    filteredExercises.forEach(exercise => {
      if (answers[exercise.id] === exercise.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / filteredExercises.length) * 100);
    
    // Update daily challenge progress for exercises (only if score > 0)
    if (score > 0) {
      try {
        const { updateChallengeProgress } = require('@/lib/utils/dailyChallenge');
        updateChallengeProgress('complete-exercises', 1);
      } catch (e) {
        // Ignore if module not available
      }
    }
    
    // Add XP based on score
    if (score >= 70) {
      const xpEarned = Math.round(score / 10) * 10; // 10 XP per 10% score
      addXP(xpEarned, `Ejercicios de Gramática: ${score}%`, 'gramatica');
      updateStats({ exercisesCompleted: getUserProgress().stats.exercisesCompleted + 1 });
        // Trigger success moment with xp amount
        try {
          window.dispatchEvent(new CustomEvent('successMoment', { detail: { xp: xpEarned } }));
        } catch (e) {
          // ignore
        }
    }
  };

  const getScore = () => {
    if (filteredExercises.length === 0) return 0;
    let correct = 0;
    filteredExercises.forEach(exercise => {
      if (answers[exercise.id] === exercise.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / filteredExercises.length) * 100);
  };

  const resetExercises = () => {
    setAnswers({});
    setShowResults(false);
    setShowHints({});
    // Force re-randomization by changing the key
    setExerciseKey(prev => prev + 1);
  };

  const toggleHint = (exerciseId: string) => {
    setShowHints(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  // Function to generate Arabic hint from exercise data
  const getArabicHint = (exercise: GrammarExercise): string => {
    if (exercise.category === 'verbs') {
      if (exercise.question.includes('Yo')) {
        return 'تذكر: ضمير "Yo" (أنا) يستخدم دائماً النهاية -o في المضارع';
      } else if (exercise.question.includes('Tú')) {
        return 'تذكر: ضمير "Tú" (أنت) يستخدم دائماً النهاية -es في المضارع';
      } else if (exercise.question.includes('Nosotros')) {
        return 'تذكر: ضمير "Nosotros" (نحن) يستخدم النهاية -amos أو -emos أو -imos';
      } else if (exercise.question.includes('Ellos')) {
        return 'تذكر: ضمير "Ellos" (هم) يستخدم النهاية -an أو -en';
      }
      return 'انظر إلى الضمير في الجملة لتحديد النهاية الصحيحة';
    } else if (exercise.category === 'articles') {
      return 'تذكر: "el" للمذكر، "la" للمؤنث، "los" للمذكر الجمع، "las" للمؤنث الجمع';
    } else if (exercise.category === 'pronouns') {
      return 'تذكر: الضمائر يجب أن تطابق الفاعل في الجنس والعدد';
    } else if (exercise.category === 'adjectives') {
      return 'تذكر: الصفات يجب أن تطابق الاسم في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع)';
    }
    return 'انظر بعناية إلى السياق لتحديد الإجابة الصحيحة';
  };

  // Accessibility: pronunciation helper and copy helper for cards
  const pronounceText = (text: string) => {
    if (typeof window === 'undefined' || !text) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      // ignore
    }
  };

  const showDictionaryFor = (word: string) => {
    try {
      window.dispatchEvent(new CustomEvent('showDictionary', { detail: { word } }));
    } catch (e) {}
  };

  const copyToClipboard = async (text: string) => {
    if (typeof navigator === 'undefined' || !text) return;
    try {
      await navigator.clipboard.writeText(text);
      // subtle visual feedback could be added (toast)
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gramática Española
          </h1>
          <div className="flex items-center justify-center gap-3">
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Aprende la conjugación de verbos, cambios de género y número con tablas completas y ejercicios interactivos para hispanohablantes y estudiantes.
            </p>
            {/* Badges: Pro and Admin (preview-mode as proxy for admin) */}
            <div className="flex items-center gap-2">
              {isPro && <ProBadge />}
              {previewMode && <AdminBadge />}
            </div>
          </div>
          
          {/* Translation Toggle Button */}
          <div className="mt-6">
            <TranslationToggleButton
              showTranslations={showTranslations}
              onClick={() => setShowTranslations(!showTranslations)}
            />
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => {
              setActiveTab('learn');
              resetExercises();
            }}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'learn'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Aprender
          </button>
          <button
            onClick={() => {
              // navigate to the dedicated ejercicios page (randomized quiz)
              router.push('/gramatica/ejercicios');
            }}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'exercises'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <PenTool className="w-5 h-5" />
            Ejercicios
          </button>
        </div>

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <>
            {/* Verb Conjugations Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Conjugación de Verbos para la Gramática Española
              </h2>
              
              {/* Tense Selector */}
              <div className="mb-8 bg-white rounded-xl modern-card shadow-lg p-6">
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {(['presente', 'preterito', 'futuro', 'imperfecto', 'condicional'] as TenseType[]).map((tense) => {
                    const info = tenseInfo[tense];
                    return (
                      <button
                        key={tense}
                        onClick={() => {
                          setSelectedTense(tense);
                          setSelectedVerb(null);
                        }}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                          selectedTense === tense
                            ? 'bg-red-600 text-white shadow-lg ring-4 ring-red-300'
                            : 'bg-white text-gray-900 shadow-md hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="text-lg">{info.name}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-center">
                  <p className="text-gray-700 text-sm bg-gray-100 rounded-lg py-2 px-4 inline-block">
                    {tenseInfo[selectedTense].description}
                  </p>
                </div>
              </div>

              {/* Verb Search */}
              <div className="mb-6 max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar verbo (ej: hablar, comer, ser)..."
                    value={verbSearch}
                    onChange={(e) => setVerbSearch(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-red-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 shadow-lg"
                  />
                  {verbSearch && (
                    <button
                      onClick={() => setVerbSearch('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                      aria-label="Limpiar búsqueda"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 hover:border-[var(--brand-primary)] hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{cat.label}</h4>
                        <p className="text-sm text-gray-700 font-medium">{cat.verbs.length} verbos disponibles</p>
                        <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-red-400" />
                          <span>Actualizado hoy</span>
                        </div>
                      </div>
                      <div>
                        {showBadges && completedBadges[cat.id] ? (
                          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-900 border border-gray-200">
                            ✓ Completado
                          </div>
                        ) : (
                          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-300 shadow-sm">
                            Categoría
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Verb Buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-2 mb-4">
                      {cat.verbs.slice(0, 4).map(v => (
                        <button
                          key={v}
                          onClick={() => handleOpenModal('verb', v)}
                          className="p-3 bg-white rounded-lg text-center text-sm font-semibold text-[var(--brand-primary)] shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-[var(--brand-primary)]"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-red-200">
                      <button
                        onClick={() => {
                          setVerbSearch('');
                          setTimeout(() => {
                            const verbsGrid = document.querySelector('.grid.grid-cols-2.sm\\:grid-cols-3');
                            if (verbsGrid) {
                              verbsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 border border-gray-800"
                      >
                        <List className="w-4 h-4" />
                        Ver todos los verbos ({cat.verbs.length})
                      </button>
                      <button
                        onClick={() => {
                          router.push('/gramatica/ejercicios');
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 border border-gray-800"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Ejercicios
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verbs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                {filteredVerbs.slice(0, verbsLimit).map((infinitive) => {
                    const verbData = getConjugation(infinitive, selectedTense);
                    if (!verbData) return null;
                    
                    return (
                      <button
                        key={`${infinitive}-${selectedTense}`}
                        type="button"
                        onClick={() => handleOpenModal('verb', infinitive)}
                        onPointerDown={(e) => createRipple(e)}
                        className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-lg p-5 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl w-full hover:ring-4 hover:ring-red-300 active:scale-95 border-2 border-transparent hover:border-red-200"
                        aria-label={`Ver conjugación de ${infinitive}`}
                      >
                        <div className="text-center">
                          <div className="text-xl font-bold text-red-600 mb-2">
                            {infinitive}
                          </div>
                          <p className="text-xs text-gray-500 font-medium">Click para ver</p>
                        </div>
                      </button>
                    );
                  })
                  .filter(Boolean)}
              </div>
              
              {/* Load more button for long verb lists */}
              {filteredVerbs.length > verbsLimit && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setVerbsLimit(v => Math.min(filteredVerbs.length, v + 20))}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Cargar más verbos ({filteredVerbs.length - verbsLimit} restantes)
                  </button>
                </div>
              )}

              {verbSearch && filteredVerbs.length === 0 && (
                <p className="text-center text-gray-700 mb-8">No se encontraron verbos</p>
              )}
            </section>

            {/* Grammar Tables Section */}
            <section className="border-t-2 border-gray-200 pt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Tablas de Gramática Española
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {grammarTables.map((table) => (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => handleOpenModal('table', table.id)}
                    onPointerDown={(e) => createRipple(e)}
                    className="bg-gradient-to-br from-white to-purple-50 rounded-2xl modern-card shadow-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl text-left w-full hover:ring-4 hover:ring-purple-300 active:scale-95 border-2 border-transparent hover:border-purple-200"
                    aria-label={`Ver tabla ${table.title}`}
                  >
                    <h3 className="text-xl font-bold text-purple-600 mb-2">
                      {table.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">Click para ver la tabla completa</p>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Exercises Tab */}
        {activeTab === 'exercises' && (
          <div className="max-w-4xl mx-auto">
            {/* Category and Level Selectors */}
            <div className="bg-white rounded-xl modern-card shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Categoría
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'verbs', 'articles', 'pronouns', 'adjectives'] as const).map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          try {
                            localStorage.setItem('gram_last_category', category);
                          } catch (e) {}
                          resetExercises();
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {category === 'all' ? 'Todas' : category === 'verbs' ? 'Verbos' : category === 'articles' ? 'Artículos' : category === 'pronouns' ? 'Pronombres' : 'Adjetivos'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nivel
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setSelectedLevel(level);
                          try {
                            localStorage.setItem('gram_last_level', level);
                          } catch (e) {}
                          resetExercises();
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                          selectedLevel === level
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {level === 'beginner' ? 'Principiante' : level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Exercises List */}
            {filteredExercises.length > 0 ? (
              <div className="bg-white rounded-xl modern-card shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ejercicios de Gramática
                </h2>
                {filteredExercises.map((exercise, index) => (
                  <div 
                    key={exercise.id} 
                    className="mb-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <p className="font-bold text-lg text-gray-900 flex-1">
                        {index + 1}. {exercise.question}
                      </p>
                      {!showResults && (
                        <button
                          onClick={() => toggleHint(exercise.id)}
                          className="ml-4 flex-shrink-0 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 border border-amber-300"
                        >
                          <Lightbulb className="w-4 h-4" />
                          <span>Pista{showTranslations && ' / نصيحة'}</span>
                        </button>
                      )}
                    </div>
                    
                    {showHints[exercise.id] && !showResults && showTranslations && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-r-4 border-amber-400 rounded-xl shadow-md" dir="rtl">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-amber-900" style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}>
                            {getArabicHint(exercise)}
                          </p>
                        </div>
                      </div>
                    )}

                    {exercise.type === 'multiple-choice' && exercise.options && (
                      <div className="space-y-3">
                        {exercise.options.map((option, optIndex) => {
                          const isSelected = answers[exercise.id] === option;
                          const isCorrect = option === exercise.correctAnswer;
                          const showCorrect = showResults && isCorrect;
                          const showIncorrect = showResults && isSelected && !isCorrect;
                          
                          return (
                            <button
                              key={optIndex}
                              onClick={() => !showResults && handleAnswer(exercise.id, option)}
                              disabled={showResults}
                              className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                                showCorrect
                                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 shadow-lg'
                                  : showIncorrect
                                  ? 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 shadow-lg'
                                  : isSelected
                                  ? 'border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-md'
                                  : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-800">{option}</span>
                                {showCorrect && <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
                                {showIncorrect && <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {showResults && exercise.explanation && (
                      <div className={`mt-4 p-4 rounded-xl shadow-md border-l-4 ${
                        answers[exercise.id] === exercise.correctAnswer
                          ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-500'
                          : 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-500'
                      }`}>
                        <p className="text-base font-medium">{exercise.explanation}</p>
                      </div>
                    )}
                    {/* Arabic popup hint when the user failed this exercise */}
                    {showResults && answers[exercise.id] !== exercise.correctAnswer && showTranslations && (
                      <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800" dir="rtl" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                        <strong className="block mb-1">تذكير</strong>
                        <div>{getArabicHint(exercise)}</div>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex justify-center space-x-4 mt-8">
                  {!showResults ? (
                    <button
                      onClick={checkAnswers}
                      disabled={Object.keys(answers).length < filteredExercises.length}
                      className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Verificar Respuestas
                    </button>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">
                        Puntuación: {getScore()}%
                      </div>
                      <button
                        onClick={resetExercises}
                        className="mt-4 px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                      >
                        Intentar de Nuevo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl modern-card shadow-lg p-8 text-center">
                <p className="text-gray-600 text-lg">
                  No hay ejercicios disponibles para esta combinación de categoría y nivel.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal for Verb Details */}
        {selectedVerb && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white shadow-md"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="p-4 sm:p-6 md:p-8 border-t-4 border-red-500">
              {(() => {
                let verb = getConjugation(selectedVerb || '', selectedTense);
                let conjugations: Record<string, string> | null = null;
                
                // Si no se encuentra en la base de datos, intentar generar con conjugateRegularVerb
                if (!verb && selectedVerb) {
                  const regularConj = conjugateRegularVerb(selectedVerb, selectedTense);
                  if (regularConj) {
                    conjugations = regularConj;
                  }
                } else if (verb) {
                  conjugations = verb.conjugations;
                }
                
                if (!conjugations || !selectedVerb) {
                  return (
                    <div className="text-center py-8">
                      <p className="text-gray-600 text-lg mb-4">
                        No se pudo generar la conjugación para este verbo.
                      </p>
                      <p className="text-sm text-gray-500">
                        Verbo: <span className="font-semibold">{selectedVerb}</span>
                      </p>
                    </div>
                  );
                }
                
                return (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-red-600 mb-2">
                        {selectedVerb}
                      </h3>
                      <p className="text-lg text-gray-600 mb-2">
                        Tiempo: <span className="font-semibold">{tenseInfo[selectedTense].name}</span>
                      </p>
                      <AudioPlayer text={selectedVerb} />
                    </div>
                    
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-red-100">
                            <th className="px-4 py-3 font-semibold text-gray-800">Pronombre</th>
                            <th className="px-4 py-3 font-semibold text-gray-800">Conjugación</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(conjugations).map(([pronoun, conjugation]) => (
                            <tr key={pronoun} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3 font-semibold text-gray-700 capitalize">
                                {pronoun === 'él' ? 'él/ella/usted' : pronoun === 'ellos' ? 'ellos/ellas/ustedes' : pronoun}
                              </td>
                              <td className="px-4 py-3 text-red-600 font-semibold text-lg">
                                {conjugation}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Quick Tense Switcher for Selected Verb */}
                    <div className="border-t pt-6 mt-6">
                      <p className="text-sm text-gray-600 mb-3 text-center font-medium">Ver este verbo en otros tiempos:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {(['presente', 'preterito', 'futuro', 'imperfecto', 'condicional'] as TenseType[]).map((tense) => {
                          if (tense === selectedTense) return null;
                          return (
                            <button
                              key={tense}
                              onClick={() => setSelectedTense(tense)}
                              className="px-4 py-2 bg-gray-100 hover:bg-red-100 active:bg-red-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                              aria-label={`Cambiar a ${tenseInfo[tense].name}`}
                            >
                              {tenseInfo[tense].name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Close Button at Bottom */}
                    <div className="mt-6 pt-6 border-t flex justify-center">
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                        aria-label="Cerrar y volver"
                      >
                        Volver
                      </button>
                    </div>
                  </>
                );
              })()}
              </div>
            </div>
          </div>
        )}

        {/* Modal for Table Details */}
        {selectedTable && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white shadow-md"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="p-4 sm:p-6 md:p-8 border-t-4 border-red-500">
              {(() => {
                const table = grammarTables.find(t => t.id === selectedTable);
                if (!table) return null;
                
                return (
                  <>
                    <h3 className="text-3xl font-bold text-red-600 mb-6 text-center">
                      {table.title}
                    </h3>
                    {table.type === 'articles' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['masculine', 'feminine'].map((gender) => {
                          const data = (table.data as any)[gender];
                          if (!data) return null;
                          return (
                            <div
                              key={gender}
                              className="bg-white rounded-xl shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-105 border-t-4"
                              style={{ borderTopColor: gender === 'masculine' ? '#c53030' : '#f6ad55' }}
                            >
                              <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-lg font-bold text-gray-800 capitalize">
                                    {gender === 'masculine' ? 'Masculino' : 'Femenino'}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => pronounceText(`${gender === 'masculine' ? 'Masculino' : 'Femenino'}: singular ${data.singular}, plural ${data.plural}`)}
                                      aria-label="Escuchar"
                                      className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => copyToClipboard(`${gender === 'masculine' ? 'Masculino' : 'Femenino'}: singular ${data.singular}, plural ${data.plural}`)}
                                      aria-label="Copiar"
                                      className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-500">Singular</div>
                                    <div className="text-xl text-red-600 font-semibold">{data.singular}</div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-500">Plural</div>
                                    <div className="text-xl text-red-600 font-semibold">{data.plural}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {table.type === 'pronouns' && table.id === 'pronouns-personal' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-gray-800">Sujeto</h4>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => pronounceText('Pronombres sujetos')}
                                aria-label="Escuchar"
                                className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => copyToClipboard('Pronombres sujetos')}
                                aria-label="Copiar"
                                className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries((table.data as any).subject || {}).map(([key, value]) => (
                              <div key={key} className="w-full p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-transform duration-150 transform hover:scale-105 border-t-4 md:p-3" style={{ borderTopColor: '#c53030' }}>
                                <div className="text-sm text-gray-500 capitalize">{key}</div>
                                <div className="text-xl md:text-2xl text-red-600 font-semibold">{value as string}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-gray-800">Objeto</h4>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => pronounceText('Pronombres de objeto')}
                                aria-label="Escuchar"
                                className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => copyToClipboard('Pronombres de objeto')}
                                aria-label="Copiar"
                                className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries((table.data as any).object || {}).map(([key, value]) => (
                              <div key={key} className="w-full p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-transform duration-150 transform hover:scale-105 border-t-4 md:p-3" style={{ borderTopColor: '#f6ad55' }}>
                                <div className="text-sm text-gray-500">{key}</div>
                                <div className="text-xl md:text-2xl text-red-600 font-semibold">{value as string}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {table.type === 'pronouns' && table.id === 'pronouns-possessive' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries((table.data as any).singular || {}).map(([key, value]) => (
                          <div key={key} className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-105 border-t-4 md:p-4" style={{ borderTopColor: '#c53030' }}>
                            <div className="text-sm text-gray-500 capitalize mb-1">{key}</div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <div className="text-xs text-gray-500">Singular</div>
                                <div className="text-xl md:text-2xl text-red-600 font-semibold">{value as string}</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-gray-500">Plural</div>
                                <div className="text-xl md:text-2xl text-red-600 font-semibold">{(table.data as any).plural?.[key]}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {table.type === 'pronouns' && table.id === 'pronouns-demonstrative' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries((table.data as any).singular || {}).map(([key, value]) => (
                          <div key={key} className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-105 border-t-4 md:p-4" style={{ borderTopColor: '#f6ad55' }}>
                            <div className="text-sm text-gray-500 mb-1">
                              {key === 'near' ? 'Cerca' : key === 'medium' ? 'Medio' : 'Lejos'}
                            </div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <div className="text-xs text-gray-500">Singular</div>
                                <div className="text-xl md:text-2xl text-red-600 font-semibold">{value as string}</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-gray-500">Plural</div>
                                <div className="text-xl md:text-2xl text-red-600 font-semibold">{(table.data as any).plural?.[key]}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {table.type === 'adjectives' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(table.data as Record<string, any>).map(([adj, forms]) => {
                          const f = forms as any;
                          return (
                            <div key={adj} className="bg-white rounded-xl shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-105 border-t-4" style={{ borderTopColor: '#c53030' }}>
                              <div className="p-6 md:p-5">
                                <h4 className="text-xl md:text-lg font-bold text-gray-800 mb-3">{adj}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="text-sm text-gray-500">Masculino Singular</div>
                                  <div className="text-sm text-gray-500">Femenino Singular</div>
                                  <div className="text-xl md:text-2xl text-red-600 font-semibold">{f.masculine?.singular}</div>
                                  <div className="text-xl md:text-2xl text-red-600 font-semibold">{f.feminine?.singular}</div>
                                  <div className="text-sm text-gray-500">Masculino Plural</div>
                                  <div className="text-sm text-gray-500">Femenino Plural</div>
                                  <div className="text-xl md:text-2xl text-red-600 font-semibold">{f.masculine?.plural}</div>
                                  <div className="text-xl md:text-2xl text-red-600 font-semibold">{f.feminine?.plural}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Close Button at Bottom */}
                    <div className="mt-6 pt-6 border-t flex justify-center">
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                        aria-label="Cerrar y volver"
                      >
                        Volver
                      </button>
                    </div>
                  </>
                );
              })()}
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
