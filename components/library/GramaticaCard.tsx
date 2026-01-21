'use client';

import React from 'react';

export default function GramaticaCard({ entry, onOpen }: { entry: any; onOpen?: (id: string) => void }) {
  return (
    <article className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#0f172a]">{entry.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{entry.subtitle || ''}</p>
        </div>
        <div className="text-sm text-gray-400">{entry.level || 'general'}</div>
      </div>
      <div className="mt-3 text-sm text-gray-700 line-clamp-3">{entry.excerpt || entry.summary || ''}</div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">ID: {entry.id}</div>
        <button onClick={() => onOpen?.(entry.id)} className="px-3 py-1 bg-[#1e40af] text-white rounded text-sm">Abrir</button>
      </div>
    </article>
  );
}

