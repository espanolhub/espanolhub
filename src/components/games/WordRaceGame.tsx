'use client';
import React from 'react';

type Round = { id: string; prompt: string; answers: string[] };

export default function WordRaceGame({ rounds, onAnswer }: { rounds: Round[]; onAnswer?: (roundId: string, ans: string) => void }) {
  return (
    <div>
      {rounds.map((r) => (
        <div key={r.id} className="mb-4 p-3 bg-white rounded shadow flex justify-between items-center">
          <div className="font-semibold">{r.prompt}</div>
          <div className="flex gap-2">
            {r.answers.map((a) => (
              <button key={a} onClick={() => onAnswer && onAnswer(r.id, a)} className="px-3 py-1 border rounded">
                {a}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

