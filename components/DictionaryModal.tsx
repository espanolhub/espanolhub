 'use client';

import React, { useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import { X } from 'lucide-react';

interface DictionaryModalProps {
  open: boolean;
  entry: any;
  onClose: () => void;
}

export default function DictionaryModal({ open, entry, onClose }: DictionaryModalProps) {
  if (!open || !entry) return null;

  const [rate, setRate] = useState<number>(0.8);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 p-6 z-10">
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-5xl font-extrabold text-yellow-600 mb-2 cursor-pointer" onClick={() => { try { const evt = new CustomEvent('pronounce', { detail: entry.word }); window.dispatchEvent(evt); } catch(e){} }}>
            {entry.word}
          </div>
          <div className="text-2xl font-semibold text-gray-800 mb-2">{Array.isArray(entry.translations) ? entry.translations.join(' / ') : entry.translations}</div>
          {entry.pronunciation && <div className="text-sm text-gray-500 italic mb-4">Pronunciación: {entry.pronunciation}</div>}
          <div className="mb-4 flex items-center justify-center gap-3">
            <AudioPlayer text={entry.word} rate={rate} />
            <label className="text-sm text-gray-600">Velocidad:</label>
            <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="rounded px-2 py-1 border">
              <option value={0.7}>0.7</option>
              <option value={0.8}>0.8</option>
              <option value={0.9}>0.9</option>
              <option value={1}>1.0</option>
            </select>
          </div>
          {/* Examples: prefer entry.examples[] if present, otherwise fall back to entry.example */}
          {Array.isArray(entry.examples) && entry.examples.length > 0 ? (
            <div className="mt-4 space-y-3">
              <strong className="block text-left">Ejemplos</strong>
              {entry.examples.map((ex: string, i: number) => (
                <div key={i} className="p-3 bg-yellow-50 rounded-lg flex items-start justify-between gap-3">
                  <div className="text-gray-700">{ex}</div>
                  <div className="flex items-center gap-2">
                    <AudioPlayer text={ex} rate={0.8} />
                  </div>
                </div>
              ))}
            </div>
          ) : entry.example ? (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-gray-700"><strong>Ejemplo:</strong> {entry.example}</p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-slate-600">
              No hay ejemplos aún — <button className="underline" onClick={async () => {
                try {
                  const suggested = prompt('Escribe un ejemplo en español para la palabra \"' + entry.word + '\"');
                  if (!suggested) return;
                  await fetch('/api/suggestions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ word: entry.word, example: suggested }) });
                  alert('Gracias — tu ejemplo fue enviado para revisión.');
                } catch(e) {
                  console.error(e);
                  alert('Error al enviar. Intenta de nuevo.');
                }
              }}>Sugerir ejemplo</button>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={() => { try { navigator.clipboard.writeText(entry.word); } catch(e){} }} className="px-4 py-2 bg-gray-100 rounded-lg">Copiar</button>
          <button onClick={onClose} className="px-4 py-2 bg-yellow-600 text-white rounded-lg">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

