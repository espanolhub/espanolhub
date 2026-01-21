'use client';

import React, { useEffect, useState } from 'react';

export default function AdminLeaderboardsPage() {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/leaderboards');
        if (!res.ok) return;
        const data = await res.json();
        setScores(data);
      } catch (e) {}
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar puntuación?')) return;
    try {
      const res = await fetch('/api/admin/leaderboards', { method: 'DELETE', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ id })});
      if (res.ok) {
        setScores(prev => prev.filter(s => s.id !== id));
      }
    } catch (e) {}
  };

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/leaderboards/export');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leaderboards-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Export failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Leaderboards (Admin)</h1>
      <div className="mb-4">
        <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded">Export CSV</button>
      </div>
      <div className="space-y-3">
        {scores.map(s => (
          <div key={s.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{s.name || s.userId || 'Anon'}</div>
              <div className="text-sm text-gray-500">Game: {s.gameId} • Score: {s.score}</div>
            </div>
            <div>
              <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-500 text-white rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

