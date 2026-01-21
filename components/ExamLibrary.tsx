'use client';

import React from 'react';
import { ccseQuestions } from '@/lib/data/nacionalidad-exams';
import useIsPro from '@/lib/hooks/useIsPro';
import ProUpgradeModal from './ProUpgradeModal';

export default function ExamLibrary() {
  const isPro = useIsPro();
  const [openUpgrade, setOpenUpgrade] = React.useState(false);

  const exams = Array.from({ length: 10 }).map((_, i) => ({
    id: `exam-${i + 1}`,
    title: `Examen Oficial ${i + 1}`,
    preview: ccseQuestions.slice(i * 3, i * 3 + 3) || ccseQuestions.slice(0, 3),
  }));

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Biblioteca de Exámenes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="rounded-xl p-5 shadow-lg bg-white/60 backdrop-blur-sm border border-gray-100 hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-lg font-semibold">{exam.title}</div>
                <div className="text-xs text-gray-500">Formato oficial · 30 preguntas</div>
              </div>
              <div>
                {!isPro && <div className="text-amber-600 font-semibold">🔒 Premium</div>}
                {isPro && <div className="text-green-600 font-semibold">✓ Desbloqueado</div>}
              </div>
            </div>

            <div className={`rounded-md p-3 ${!isPro ? 'bg-gray-50' : 'bg-white'} border border-gray-100`}>
              <div className="text-sm text-gray-700 mb-2">Vista previa (primeras 3 preguntas)</div>
              <ol className="list-decimal list-inside text-sm space-y-2">
                {exam.preview.map((q:any, idx:number) => (
                  <li key={idx} className="text-gray-700">
                    {q.question}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  if (!isPro) return setOpenUpgrade(true);
                  // start exam flow (navigate) - kept simple to avoid routing changes here
                  window.location.href = '/nacionalidad';
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold shadow-sm"
              >
                {isPro ? 'Comenzar Examen' : 'Obtener PRO'}
              </button>
              {!isPro && (
                <button onClick={() => setOpenUpgrade(true)} className="text-sm text-gray-500 underline">
                  Ver opciones
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ProUpgradeModal open={openUpgrade} onClose={() => setOpenUpgrade(false)} onGetPro={() => { setOpenUpgrade(false); window.location.href = '/pricing'; }} />
    </div>
  );
}

