'use client';

import React, { useState } from 'react';
import TemplateContainer from './TemplateContainer';
import GramaticaCard from './GramaticaCard';
import { getLibraryTitles } from '@/lib/library';

export default function GramaticaTemplate({ initialSection }: { initialSection?: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const titles = getLibraryTitles('gramatica');

  return (
    <TemplateContainer title="Gramática — Biblioteca">
      {titles.map((t: any) => (
        <GramaticaCard key={t.id} entry={t} onOpen={(id) => setSelected(id)} />
      ))}
      {/* Preview panel for selected */}
      {selected && (
        <div className="md:col-span-2">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Preview: {selected}</h3>
            <div className="text-sm text-gray-700">Contenido cargado a demanda.</div>
          </div>
        </div>
      )}
    </TemplateContainer>
  );
}

