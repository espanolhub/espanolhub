'use client';
import React from 'react';

type FB = { id: string; question: string };

export default function FillBlankGame({ questions, onSubmit }: { questions: FB[]; onSubmit?: (id: string, value: string) => void }) {
  return (
    <div>
      {questions.map((q) => (
        <div key={q.id} className="mb-4 p-3 bg-white rounded shadow">
          <div className="mb-2">{q.question}</div>
          <div>
            <input placeholder="Escribe la respuesta" className="border p-2 rounded w-full" onBlur={(e) => onSubmit && onSubmit(q.id, e.currentTarget.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}

