'use client';

import React, { useEffect, useState } from 'react';

export default function Leaderboard({ gameId }: { gameId: string }) {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (!gameId) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/games/leaderboard?gameId=${encodeURIComponent(gameId)}&limit=10`);
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setList(data);
      } catch (e) {}
    })();
    return () => { mounted = false; };
  }, [gameId]);

  if (!gameId) return null;
  return (
    <div className="mt-4 bg-white border rounded p-3 shadow-sm">
      <h4 className="font-semibold mb-2">Top Scores</h4>
      {list.length === 0 ? <div className="text-sm text-gray-500">No scores yet</div> : (
        <ol className="list-decimal list-inside space-y-1">
          {list.map((s:any) => (
            <li key={s.id} className="flex justify-between text-sm">
              <span>{s.name || (s.userId ? 'Usuario' : 'Anon')}</span>
              <span className="font-mono">{s.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

