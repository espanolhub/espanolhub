'use client';

import { useState, useMemo, useEffect } from 'react';
import { readingLessons, getLessonsByLevel } from '@/lib/data/reading';
import { dialogues, getAllCategories, getDialoguesByCategory, getDialoguesByLevel } from '@/lib/data/dialogues';
import AudioPlayer from '@/components/AudioPlayer';
import { CheckCircle, XCircle, Languages, Lock, Lightbulb, BookOpen, MessageSquare } from 'lucide-react';
import HintModal from '@/components/HintModal';
import ClickableText from '@/components/ClickableText';
import { usefulSentencesData, getSentencesByContext, type SentenceContext, type UsefulSentence } from '@/lib/data/useful-sentences';
import UsefulSentencesCard from '@/components/UsefulSentencesCard';
import SmartSentencesSection from '@/components/SmartSentencesSection';
import useIsPro from '@/lib/hooks/useIsPro';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import ProBadge from '@/components/ProBadge';
import AdminBadge from '@/components/AdminBadge';
import ProUpgradeModal from '@/components/ProUpgradeModal';

type TabType = 'texts' | 'dialogues' | 'sentences';

export default function LecturaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('texts');
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedDialogue, setSelectedDialogue] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hintModal, setHintModal] = useState<{ open: boolean; content: string }>({ open: false, content: '' });
  
  const isPro = useIsPro();
  const { settings, previewMode } = useAdminSettings();

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0 ? (scrollTop / totalScrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize الدروس لتجنب إعادة الحساب
  const lessons = useMemo(() => getLessonsByLevel(selectedLevel), [selectedLevel]);
  const currentLesson = useMemo(() => lessons.find(l => l.id === selectedLesson), [lessons, selectedLesson]);
  
  // Check if lesson is premium (advanced level is premium by default, unless isFree is explicitly true)
  const isLessonPremium = (lesson: typeof lessons[0]) => {
    if (lesson.isFree === true) return false;
    if (lesson.isFree === false) return true;
    // Default: advanced = premium, beginner/intermediate = free
    return lesson.level === 'advanced';
  };
  
  const canAccessLesson = (lesson: typeof lessons[0]) => {
    return !isLessonPremium(lesson) || isPro || previewMode;
  };
  
  // Memoize الفئات
  const categories = useMemo(() => ['Todos', ...getAllCategories()], []);
  
  // Memoize الحوارات المفلترة
  const filteredDialogues = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return getDialoguesByLevel(selectedLevel);
    }
    return getDialoguesByCategory(selectedCategory).filter(d => d.level === selectedLevel);
  }, [selectedCategory, selectedLevel]);
  
  const currentDialogue = useMemo(() => dialogues.find(d => d.id === selectedDialogue), [selectedDialogue]);

  const handleAnswer = (exerciseId: string, answer: string) => {
    setAnswers({ ...answers, [exerciseId]: answer });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const getScore = () => {
    if (!currentLesson) return 0;
    let correct = 0;
    currentLesson.exercises.forEach(exercise => {
      if (answers[exercise.id] === exercise.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / currentLesson.exercises.length) * 100);
  };

  // Stats calculations
  const totalTexts = readingLessons.length;
  const totalDialogues = dialogues.length;
  const totalSentences = usefulSentencesData.reduce((acc, group) => acc + group.sentences.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      {/* Scroll Progress Bar */}
      {currentLesson && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-purple-100 z-50">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Mejora tu Comprensión</span>
            <Languages className="w-4 h-4 text-purple-600" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Lectura y Comprensión
              </span>
            </h1>
            <div className="flex items-center gap-2">
              {isPro && <ProBadge />}
              {previewMode && <AdminBadge />}
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-3">
            Mejora tu comprensión lectora con textos graduados
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diálogos cotidianos, ejercicios interactivos y frases útiles para el día a día
          </p>
          
        </div>

        {/* Stats Bar */}
        {!selectedLesson && !selectedDialogue && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{totalTexts}</div>
              <div className="text-sm text-gray-600">Textos</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-pink-100 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-1">{totalDialogues}</div>
              <div className="text-sm text-gray-600">Diálogos</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalSentences}</div>
              <div className="text-sm text-gray-600">Frases Útiles</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">3</div>
              <div className="text-sm text-gray-600">Niveles</div>
            </div>
          </div>
        )}

        {/* Enhanced Tab Selector */}
        <div className="flex flex-wrap justify-center mb-8 gap-3 px-2">
          <button
            onClick={() => {
              setActiveTab('texts');
              setSelectedLesson(null);
              setSelectedDialogue(null);
              setAnswers({});
              setShowResults(false);
            }}
            className={`px-6 py-4 rounded-xl font-bold transition-all text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 ${
              activeTab === 'texts'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
            style={activeTab === 'texts' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
          >
            📖 Textos
          </button>
          <button
            onClick={() => {
              setActiveTab('dialogues');
              setSelectedLesson(null);
              setSelectedDialogue(null);
              setAnswers({});
              setShowResults(false);
            }}
            className={`px-6 py-4 rounded-xl font-bold transition-all text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 ${
              activeTab === 'dialogues'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
            style={activeTab === 'dialogues' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
          >
            💬 Diálogos
          </button>
          <button
            onClick={() => {
              setActiveTab('sentences');
              setSelectedLesson(null);
              setSelectedDialogue(null);
              setAnswers({});
              setShowResults(false);
            }}
            className={`px-6 py-4 rounded-xl font-bold transition-all text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 ${
              activeTab === 'sentences'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
            style={activeTab === 'sentences' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
          >
            ⚡ Frases Inteligentes
          </button>
        </div>

        {/* Enhanced Level Selector */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          <button
            onClick={() => {
              setSelectedLevel('beginner');
              setSelectedLesson(null);
              setSelectedDialogue(null);
              setAnswers({});
              setShowResults(false);
            }}
            className={`px-6 py-3 rounded-xl font-bold transition-all capitalize shadow-lg hover:shadow-xl transform hover:scale-105 ${
              selectedLevel === 'beginner'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
            style={selectedLevel === 'beginner' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
          >
            🌱 Principiante
          </button>
          <button
            onClick={() => {
              setSelectedLevel('intermediate');
              setSelectedLesson(null);
              setSelectedDialogue(null);
              setAnswers({});
              setShowResults(false);
            }}
            className={`px-6 py-3 rounded-xl font-bold transition-all capitalize shadow-lg hover:shadow-xl transform hover:scale-105 ${
              selectedLevel === 'intermediate'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
            style={selectedLevel === 'intermediate' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
          >
            ⭐ Intermedio
          </button>
          <button
            onClick={() => {
              setSelectedLevel('advanced');
              setSelectedLesson(null);
              setSelectedDialogue(null);
              setAnswers({});
              setShowResults(false);
            }}
            className={`px-6 py-3 rounded-xl font-bold transition-all capitalize shadow-lg hover:shadow-xl transform hover:scale-105 ${
              selectedLevel === 'advanced'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
            style={selectedLevel === 'advanced' ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
          >
            🏆 Avanzado
          </button>
        </div>

        {/* Dialogues Section */}
        {activeTab === 'dialogues' && (
          <>
            {/* Category Selector for Dialogues */}
            {!selectedDialogue && (
              <div className="mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-w-7xl mx-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                      style={selectedCategory === category ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dialogues List */}
            {!selectedDialogue && (
              <>
                {filteredDialogues.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12 max-w-7xl mx-auto">
                    {filteredDialogues.map((dialogue) => (
                          <button
                            key={dialogue.id}
                            type="button"
                            onClick={() => {
                              setSelectedDialogue(dialogue.id);
                              setAnswers({});
                              setShowResults(false);
                            }}
                            className="card-hover-effect bg-white rounded-xl shadow-lg p-5 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-left w-full"
                          >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                            {dialogue.category}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {dialogue.level}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-purple-600 mb-2">
                          {dialogue.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {dialogue.dialogue.length} intercambios
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
                    <p className="text-gray-600 text-lg">
                      No hay diálogos disponibles para esta categoría y nivel.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Selected Dialogue */}
            {currentDialogue && (
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
                <button
                  onClick={() => setSelectedDialogue(null)}
                  className="mb-4 text-purple-600 hover:text-purple-800 font-semibold"
                >
                  ← Volver a la lista
                </button>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-purple-600">
                      {currentDialogue.title}
                    </h2>
                    <div className="flex gap-3">
                      <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        {currentDialogue.category}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {currentDialogue.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-4 space-y-4 border border-purple-100">
                    {currentDialogue.dialogue.map((exchange, index) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-4 bg-white/60 p-3 rounded-r-lg hover:bg-white/90 transition-all">
                        <p className="font-bold text-purple-700 mb-1">
                          {exchange.speaker}:
                        </p>
                        <p className="text-gray-800 leading-relaxed">
                          {exchange.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Vocabulary */}
                  {currentDialogue.vocabulary && currentDialogue.vocabulary.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Vocabulario Importante
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentDialogue.vocabulary.map((vocab, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <button
                              onClick={() => {
                                try { window.dispatchEvent(new CustomEvent('showDictionary', { detail: { word: vocab.word } })); } catch(e){}
                              }}
                              className="font-semibold text-purple-600 hover:underline"
                            >
                              {vocab.word}
                            </button>
                            <span className="text-gray-600">{vocab.translation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Texts Section */}
        {activeTab === 'texts' && (
          <>
        {/* Lessons List */}
        {!selectedLesson && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {lessons.map((lesson) => {
              const isPremium = isLessonPremium(lesson);
              const canAccess = canAccessLesson(lesson);
              
              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (!canAccess) {
                      setShowUpgradeModal(true);
                      return;
                    }
                    setSelectedLesson(lesson.id);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative ${
                    !canAccess ? 'opacity-75' : ''
                  }`}
                >
                  {isPremium && !canAccess && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md">
                      <Lock className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-purple-600 flex-1">
                      {lesson.title}
                    </h3>
                    {isPremium && canAccess && (
                      <ProBadge className="ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Nivel: <span className="font-semibold capitalize">{lesson.level}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {lesson.exercises.length} ejercicios
                  </p>
                  {isPremium && !canAccess && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-purple-600 font-semibold">Requiere PRO</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Lesson */}
        {currentLesson && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-purple-600 mb-4">
                {currentLesson.title}
              </h2>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <div className="text-base md:text-lg leading-7 md:leading-8 text-gray-800 mb-4">
                  <ClickableText text={currentLesson.text} difficultWords={currentLesson.difficultWords} />
                </div>
                <AudioPlayer text={currentLesson.text} />
              </div>
            </div>

            {/* Exercises */}
            <div className="border-t pt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Ejercicios de Comprensión
              </h3>
              {currentLesson.exercises.map((exercise, index) => (
                <div key={exercise.id} className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-semibold text-gray-800 flex-1">
                      {index + 1}. {exercise.question}
                    </p>
                    {exercise.hint && (
                      <button
                        onClick={() => setHintModal({ open: true, content: exercise.hint || '' })}
                        className="ml-3 p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors flex-shrink-0"
                        aria-label="Mostrar pista"
                        title="Mostrar pista"
                      >
                        <Lightbulb className="w-4 h-4" />
                      </button>
                    )}
                  </div>
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
                            className={`w-full text-left px-5 py-3.5 rounded-lg border-2 transition-all font-medium ${
                              showCorrect
                                ? 'border-green-500 bg-green-50 text-green-900'
                                : showIncorrect
                                ? 'border-red-500 bg-red-50 text-red-900'
                                : isSelected
                                ? 'border-purple-500 bg-purple-50 text-purple-900'
                                : 'border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {showCorrect && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                              {showIncorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex justify-center space-x-4 mt-8">
                {!showResults ? (
                  <button
                    onClick={checkAnswers}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Verificar Respuestas
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      Puntuación: {getScore()}%
                    </div>
                    <button
                      onClick={() => {
                        setAnswers({});
                        setShowResults(false);
                      }}
                      className="mt-4 px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                      Intentar de Nuevo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

          </>
        )}

        {/* Smart Sentences Tab */}
        {activeTab === 'sentences' && (
          <div className="max-w-7xl mx-auto">
            <SmartSentencesSection />
          </div>
        )}
      </div>

      {/* Ads Container - End of Lesson Section */}
      <div className="ads-container mt-8 mb-4"></div>
      
      {/* Pro Upgrade Modal */}
      <ProUpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onGetPro={() => setShowUpgradeModal(false)}
      />
      
      {/* Hint Modal */}
      <HintModal
        open={hintModal.open}
        onClose={() => setHintModal({ open: false, content: '' })}
        title="Pista"
      >
        <div className="text-base text-gray-700">{hintModal.content}</div>
      </HintModal>
    </div>
  );
}

// Useful Sentences Section Component
function UsefulSentencesSection() {
  const [selectedContext, setSelectedContext] = useState<SentenceContext | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<UsefulSentence['level'] | 'all'>('all');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [showAllTranslations, setShowAllTranslations] = useState(false);

  const filteredSentences = useMemo(() => {
    let sentences: UsefulSentence[] = [];

    // Get sentences by context
    if (selectedContext === 'all') {
      sentences = usefulSentencesData.flatMap(group => group.sentences);
    } else {
      sentences = getSentencesByContext(selectedContext);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      sentences = sentences.filter(s => s.level === selectedLevel);
    }

    return sentences;
  }, [selectedContext, selectedLevel]);

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Context Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Contexto
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedContext('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedContext === 'all'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {usefulSentencesData.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedContext(group.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedContext === group.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{group.icon}</span>
                  <span>{group.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Nivel
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level === 'all' ? 'all' : level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    selectedLevel === level
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedLevel === level ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
                >
                  {level === 'all' ? 'Todos' : level === 'beginner' ? 'Principiante' : level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-bold text-purple-600">{filteredSentences.length}</span> frase{filteredSentences.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Flashcard Mode Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Modo Tarjeta:</span>
          <button
            onClick={() => setFlashcardMode(!flashcardMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              flashcardMode ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={flashcardMode}
            aria-label="Toggle Flashcard Mode"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                flashcardMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-600">
            {flashcardMode ? 'Activado' : 'Desactivado'}
          </span>
        </div>
      </div>

      {/* Sentences Grid */}
      {filteredSentences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSentences.map((sentence) => (
            <UsefulSentencesCard 
              key={sentence.id} 
              sentence={sentence} 
              flashcardMode={flashcardMode}
              showAllTranslations={showAllTranslations}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Languages className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            No se encontraron frases con estos filtros
          </p>
        </div>
      )}
    </div>
  );
}
