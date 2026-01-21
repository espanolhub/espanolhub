'use client';

import React, { useState } from 'react';

export default function QuestionCard({
  number,
  id,
  question,
  question_ar,
  options,
  correct,
  onAnswered,
}: {
  number: number;
  id: string;
  question: string;
  question_ar?: string;
  options: string[];
  correct: string | boolean;
  onAnswered?: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (opt: string) => {
    if (showResult) return;
    setSelected(opt);
    const isCorrect = opt === String(correct);
    setShowResult(true);
    try { onAnswered?.(isCorrect); } catch (e) {}
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-700">
            {number}
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 mb-2">{question}</div>
          {question_ar && (
            <div className="text-sm text-slate-600 mb-3 p-3 bg-slate-50 rounded" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
              {question_ar}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt, idx) => {
              const isSelected = selected === opt;
              const isCorrect = showResult && opt === String(correct);
              const isWrongSelected = showResult && isSelected && !isCorrect;
              return (
                <button
                  key={opt + idx}
                  onClick={() => handleSelect(opt)}
                  className={`text-left p-3 rounded-lg border transition-colors ${isCorrect ? 'bg-green-50 border-green-300 text-green-800' : isWrongSelected ? 'bg-red-50 border-red-300 text-red-800' : isSelected ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-white border-gray-200 hover:bg-blue-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {isCorrect && <span className="text-xs font-semibold">✓ Correcto</span>}
                    {isWrongSelected && <span className="text-xs font-semibold">✕ Incorrecto</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

