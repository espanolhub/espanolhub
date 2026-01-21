'use client';

import React, { useState } from 'react';
import TemplateContainer from './TemplateContainer';
import LecturaCard from './LecturaCard';
import { getLibraryTitles } from '@/lib/library';

export default function LecturaTemplate() {
  const [selected, setSelected] = useState<string | null>(null);
  const titles = getLibraryTitles('lectura');

  return (
    <TemplateContainer title="Lectura — Biblioteca">
      {titles.map((t: any) => (
        <LecturaCard key={t.id} entry={t} onOpen={(id) => setSelected(id)} />
      ))}
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

