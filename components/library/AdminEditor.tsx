'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

type Section = 'gramatica' | 'lectura' | 'juegos';

export default function AdminEditor() {
  const [section, setSection] = useState<Section>('gramatica');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [level, setLevel] = useState('beginner');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, title, subtitle, level, excerpt, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      alert('Guardado correctamente');
      setTitle(''); setSubtitle(''); setExcerpt(''); setContent(''); setPreview(false);
    } catch (e:any) {
      alert('Error: ' + (e?.message || 'unknown'));
    } finally {
      setSaving(false);
    }
  };

  const handleFileImport = async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    // try JSON parse first
    try {
      const parsed = JSON.parse(text);
      // if array, call bulk import
      if (Array.isArray(parsed)) {
        const res = await fetch('/api/admin/library', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) });
        if (!res.ok) throw new Error('Import failed');
        alert('Importación completada');
        return;
      }
      // if object, try single save
      const res = await fetch('/api/admin/library', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) });
      if (!res.ok) throw new Error('Import failed');
      alert('Importación completada');
    } catch (e) {
      alert('Formato inválido. Sube JSON válido.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Library Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <label className="block text-sm">Sección</label>
          <select value={section} onChange={(e) => setSection(e.target.value as Section)} className="w-full p-2 border rounded">
            <option value="gramatica">Gramática</option>
            <option value="lectura">Lectura</option>
            <option value="juegos">Juegos</option>
          </select>

          <label className="block text-sm">Título</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded" />

          <label className="block text-sm">Subtítulo</label>
          <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} className="w-full p-2 border rounded" />

          <label className="block text-sm">Extracto</label>
          <textarea value={excerpt} onChange={(e)=>setExcerpt(e.target.value)} rows={2} className="w-full p-2 border rounded" />

          <label className="block text-sm">Contenido (Markdown)</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={8} className="w-full p-2 border rounded font-mono" />
        </div>

        <aside className="space-y-3">
          <div className="p-4 border rounded bg-white shadow-sm">
            <label className="block text-sm">Nivel</label>
            <select value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full p-2 border rounded">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="p-4 border rounded bg-white shadow-sm">
            <button onClick={() => setPreview(!preview)} className="w-full px-4 py-2 bg-yellow-400 rounded text-slate-900 font-semibold">
              {preview ? 'Cerrar Previsualización' : 'Ver Previsualización'}
            </button>
          </div>

          <div className="p-4 border rounded bg-white shadow-sm">
            <button onClick={handleSave} disabled={saving} className="w-full px-4 py-2 bg-blue-600 text-white rounded">
              {saving ? 'Guardando...' : 'Guardar en Biblioteca'}
            </button>
          </div>
 
          <div className="p-4 border rounded bg-white shadow-sm">
            <label className="block text-sm mb-2">Importar archivo JSON/Array (bulk)</label>
            <input type="file" accept=".json" onChange={(e)=> {
              const f = e.target.files ? e.target.files[0] : null;
              handleFileImport(f);
              e.currentTarget.value = '';
            }} className="w-full" />
          </div>
        </aside>
      </div>

      {preview && (
        <div className="mt-6 bg-white border rounded p-4 shadow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
          <div className="prose max-w-none">
            {/* dynamic ReactMarkdown to render preview without increasing main bundle */}
            <React.Suspense fallback={<div>Loading preview...</div>}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <ReactMarkdown>{content}</ReactMarkdown>
            </React.Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

