'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { grammarExercises, getExercisesByCategory, getRandomExercises } from '@/lib/data/grammar-exercises';
import { getAllInfinitiveVerbs } from '@/lib/data/grammar';
import useIsPro from '@/lib/hooks/useIsPro';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import HintModal from '@/components/HintModal';

type Level = 'beginner' | 'intermediate' | 'advanced';

function getHintLocal(exercise: any): string {
  return (
    exercise?.explanation ||
    'Pista: fíjate en el sujeto y en la regla de esta categoría.'
  );
}

export default function GramEjerciciosPage() {
  const isPro = useIsPro();
  const { settings } = useAdminSettings();
  const [category, setCategory] = useState<'all'|'verbs'|'articles'|'pronouns'|'adjectives'>('all');
  const [level, setLevel] = useState<Level>('beginner');
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [exList, setExList] = useState<any[]>([]);
  const [boostMessage, setBoostMessage] = useState<string | null>(null);
  const [recentCorrectId, setRecentCorrectId] = useState<string | null>(null);

  useEffect(() => {
    // Build pool including injected advanced verb questions
    const extraQuestions = [
      {
        id: 'ex-girar-1',
        category: 'verbs',
        level: 'intermediate',
        question: 'Yo ____ (girar) a la derecha en la próxima calle',
        options: ['giro', 'giró', 'giras', 'gira'],
        correctAnswer: 'giro',
        explanation: 'Yo -> -o en presente',
      },
      {
        id: 'ex-solicitar-1',
        category: 'verbs',
        level: 'intermediate',
        question: 'Ellos necesitan ____ (solicitar) el permiso pronto',
        options: ['solicitan', 'solicito', 'solicitas', 'soliciten'],
        correctAnswer: 'solicitan',
        explanation: 'Ellos -> -an en presente',
      },
      {
        id: 'ex-cruzar-1',
        category: 'verbs',
        level: 'beginner',
        question: 'Tú ____ (cruzar) la calle con cuidado',
        options: ['cruzas', 'cruza', 'cruzo', 'cruzan'],
        correctAnswer: 'cruzas',
        explanation: 'Tú -> -as/-es según conjugación',
      },
      {
        id: 'ex-renovar-1',
        category: 'verbs',
        level: 'intermediate',
        question: 'Nosotros vamos a ____ (renovar) el documento',
        options: ['renovamos', 'renováis', 'renovo', 'renovan'],
        correctAnswer: 'renovamos',
        explanation: 'Nosotros -> -amos en presente (ar verbs)',
      },
      {
        id: 'ex-tramitar-1',
        category: 'verbs',
        level: 'intermediate',
        question: 'Ella necesita ____ (tramitar) la solicitud hoy',
        options: ['tramita', 'tramito', 'tramitan', 'tramitas'],
        correctAnswer: 'tramita',
        explanation: 'Ella -> -a en presente (ar verbs)',
      },
    ];

    const pool = (category === 'all' ? [...grammarExercises, ...extraQuestions] : [...getExercisesByCategory(category), ...extraQuestions.filter(q => q.category === category)]);
    // Filter by level
    const byLevel = pool.filter((e:any) => e.level === level);
    // Shuffle client-side and pick up to 20
    const shuffleQuestions = (arr:any[]) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const shuffled = shuffleQuestions(byLevel.length ? byLevel : pool);
    const list = shuffled.slice(0, Math.min(20, shuffled.length));
    setExList(list);
    setAnswers({});
    setShowResults(false);
    setShowHints({});
  }, [category, level]);

  // Motivational messages (ES)
  const boosts = [
    '¡Excelente! 🌟',
    '¡Vas por buen camino! 🚀',
    '¡Muy bien! 🧠',
  ];

  const showBoost = (message:string) => {
    setBoostMessage(message);
    setTimeout(() => setBoostMessage(null), 1500);
  };

  const handleAnswer = (id:string, val:string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    const ex = exList.find(e => e.id === id);
    if (ex) {
      if (val === ex.correctAnswer) {
        // correct immediate feedback + boost
        setRecentCorrectId(id);
        showBoost(boosts[Math.floor(Math.random() * boosts.length)]);
        setTimeout(() => setRecentCorrectId(null), 900);
      } else {
        // when wrong, auto-show hint for this question
        setShowHints(prev => ({ ...prev, [id]: true }));
      }
    }
  };

  const check = () => {
    setShowResults(true);
    const correct = exList.reduce((acc, ex:any) => acc + (answers[ex.id] === ex.correctAnswer ? 1 : 0), 0);
    const score = Math.round((correct / exList.length)*100);
    // Auto-show hints for wrong answers
    const wrongIds: Record<string, boolean> = {};
    exList.forEach(ex => {
      if (answers[ex.id] !== ex.correctAnswer) wrongIds[ex.id] = true;
    });
    setShowHints(prev => ({ ...prev, ...wrongIds }));

    // Persist completion with timestamp (expires after 30 days)
    if (score >= 70 && category !== 'all') {
      try {
        const now = Date.now();
        const payload = JSON.stringify({ completedAt: now });
        localStorage.setItem(`gram_topic_completed_${category}`, payload);
        // Also mark topic completions for specific grammar categories based on verbs present
        const grammarVerbs = require('@/lib/data/grammar-verbs').default as Record<string, string[]>;
        const categoriesMarked: string[] = [];
        exList.forEach((ex:any) => {
          const q = (ex.question || '').toLowerCase();
          Object.entries(grammarVerbs || {}).forEach(([catId, verbs]) => {
            verbs.forEach((v:any) => {
              if (q.includes(v) && !categoriesMarked.includes(catId)) {
                try {
                  localStorage.setItem(`gram_topic_completed_${catId}`, JSON.stringify({ completedAt: now }));
                  categoriesMarked.push(catId);
                } catch (e) {}
              }
            });
          });
        });
        // Notify other parts of the app that topics were completed
        try { window.dispatchEvent(new CustomEvent('gramTopicCompleted', { detail: { category, categoriesMarked } })); } catch(e) {}
      } catch(e) {}
    }
  };

  const [hintOpen, setHintOpen] = useState(false);
  const [hintContent, setHintContent] = useState<string>('');

  const openHintModal = (content: string) => {
    setHintContent(content);
    setHintOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Ejercicios de Gramática</h1>
        <div className="mb-4 flex gap-2">
          {(['all','verbs','articles','pronouns','adjectives'] as any[]).map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-2 rounded ${category===c ? 'bg-red-600 text-white' : 'bg-white text-gray-900'}`}>{c==='all' ? 'Todas' : c}</button>
          ))}
          <div className="ml-auto text-sm text-gray-500">PRO: {isPro ? 'Sí' : 'No'}</div>
        </div>

        <div className="space-y-6">
          {exList.map((ex:any, idx:number) => {
            const selected = answers[ex.id];
            const wrong = showResults && selected && selected !== ex.correctAnswer;
            const correct = showResults && selected === ex.correctAnswer;
            return (
              <div key={ex.id} className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-semibold text-lg">{idx+1}. {ex.question}</div>
                  {!showResults && (
                    <button onClick={() => openHintModal(getHintLocal(ex))} className="px-3 py-1 rounded bg-gray-100 text-blue-700 flex items-center gap-2 border border-gray-300">
                      <Lightbulb className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {ex.options.map((opt:string) => {
                    const isSel = answers[ex.id] === opt;
                    const showCorrect = showResults && opt === ex.correctAnswer;
                    const showIncorrect = showResults && isSel && opt !== ex.correctAnswer;
                    const isRecentCorrect = recentCorrectId === ex.id && opt === ex.correctAnswer;
                    return (
                      <button key={opt} disabled={showResults} onClick={() => handleAnswer(ex.id, opt)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${showCorrect ? 'border-green-400 bg-gradient-to-r from-green-50 to-green-100 shadow-lg transform scale-[1.01]' : showIncorrect ? 'border-red-400 bg-gradient-to-r from-red-50 to-red-100 shadow-lg animate-pulse' : isSel ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                        <div className="flex justify-between items-center">
                          <span>{opt}</span>
                          {showCorrect && <CheckCircle className={`w-5 h-5 text-green-600 ${isRecentCorrect ? 'animate-pulse' : ''}`} />}
                          {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {showResults && answers[ex.id] !== ex.correctAnswer && (
                  <div className="mt-3 p-3 bg-red-50 text-red-800 rounded">
                    <strong className="block mb-1">Pista</strong>
                    <div>{getHintLocal(ex)}</div>
                  </div>
                )}
                {/* Inline hint triggered by button or by wrong answer */}
                {showHints[ex.id] && (
                  <div className="mt-3 p-3 bg-gray-50 text-slate-900 rounded border-l-4 border-blue-600">
                    <strong className="block mb-1">Pista</strong>
                    <div>{getHintLocal(ex)}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Boost popup */}
        {boostMessage && (
          <div className="fixed right-6 top-24 z-50 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg shadow-lg border border-emerald-200">
            {boostMessage}
          </div>
        )}
        {/* Hint Modal */}
        <HintModal open={hintOpen} onClose={() => setHintOpen(false)} title="Pista">{hintContent}</HintModal>

        <div className="mt-6 flex justify-center">
          {!showResults ? (
            <button onClick={check} className="px-6 py-3 bg-red-600 text-white rounded-lg">Verificar Respuestas</button>
          ) : (
            <button onClick={() => { setShowResults(false); setAnswers({}); }} className="px-6 py-3 bg-gray-600 text-white rounded-lg">Intentar de Nuevo</button>
          )}
        </div>
      </div>
    </div>
  );
}

