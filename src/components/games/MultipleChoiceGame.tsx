'use client';
import React from 'react';

type MC = { id: string; question: string; options: string[] };

export default function MultipleChoiceGame({ questions, onAnswer }: { questions: MC[]; onAnswer?: (id: string, ans: string) => void }) {
  return (
    <div>
      {questions.map((q) => (
        <div key={q.id} className="mb-4 p-3 bg-white rounded shadow">
          <div className="font-medium mb-2">{q.question}</div>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((o) => (
              <button key={o} onClick={() => onAnswer && onAnswer(q.id, o)} className="p-2 border rounded text-left">
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

