'use client';

import React, { useState } from 'react';
import TemplateContainer from './TemplateContainer';
import JuegosCard from './JuegosCard';
import { getLibraryTitles } from '@/lib/library';
import GameRenderer from '@/components/games/GameRenderer';

export default function JuegosTemplate() {
  const [selected, setSelected] = useState<string | null>(null);
  const titles = getLibraryTitles('juegos');

  return (
    <TemplateContainer title="Juegos — Biblioteca">
      {titles.map((t: any) => (
        <JuegosCard key={t.id} entry={t} onOpen={(id) => setSelected(id)} />
      ))}
      {selected && (
        <div className="md:col-span-2">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Juego: {selected}</h3>
            <div className="text-sm text-gray-700">Configuración del juego cargada.</div>
            <div className="mt-4">
              <GameRenderer entry={{ id: selected, title: '', content: '', level: 'beginner' }} />
            </div>
          </div>
        </div>
      )}
    </TemplateContainer>
  );
}

