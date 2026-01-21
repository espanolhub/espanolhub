'use client';

import React, { useState } from 'react';
import TemplateContainer from './TemplateContainer';
import JuegosCard from './JuegosCard';
import { getLibraryTitles } from '@/lib/library';

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
            <h3 className="text-xl font-semibold mb-2">Preview: {selected}</h3>
            <div className="text-sm text-gray-700">Configuración del juego cargada a demanda.</div>
            {/* render playable game if entry contains gameType */ }
            <div className="mt-4">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <GameRenderer entry={(() => {
                try {
                  const fs = require('fs');
                  const path = require('path');
                  const raw = fs.readFileSync(path.resolve(process.cwd(), 'lib', 'library', 'data', 'juegos.json'), 'utf8');
                  const arr = JSON.parse(raw || '[]');
                  return arr.find((e:any)=>e.id === selected) || null;
                } catch (e) {
                  return null;
                }
              })()} />
              {/* @ts-ignore */}
              <Leaderboard gameId={selected} />
            </div>
          </div>
        </div>
      )}
    </TemplateContainer>
  );
}

