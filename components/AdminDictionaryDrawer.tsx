'use client';

import React, { useEffect, useState } from 'react';

export default function AdminDictionaryDrawer() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [edited, setEdited] = useState<any | null>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const res = await fetch('/api/admin/dictionary');
        if (!res.ok) return;
        const data = await res.json();
        setEntries(data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [open]);

  const save = async () => {
    if (!edited) return;
    try {
      const res = await fetch('/api/admin/dictionary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edited),
      });
      if (!res.ok) throw new Error('save failed');
      const updated = await res.json();
      setEntries(prev => prev.map(e => e.id === updated.id ? updated : e));
      setEdited(null);
    } catch (e) {
      console.error(e);
      try { (window as any).__showToast?.('Failed to save entry', 'error'); } catch(_) {}
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-3 py-2 bg-slate-800 text-white rounded">Editar Diccionario</button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="relative ml-auto w-full md:w-3/5 bg-white shadow-2xl p-6 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Diccionario (Edición)</h3>
              <button onClick={() => setOpen(false)} className="px-3 py-1 rounded bg-gray-100">Cerrar</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map(e => (
                <div key={e.id} className="p-3 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{e.word}</div>
                    <button onClick={() => setEdited(e)} className="text-sm text-blue-600">Editar</button>
                  </div>
                  <div className="text-sm text-gray-600">{(e.translations || []).slice(0,3).join(', ')}</div>
                </div>
              ))}
            </div>

            {edited && (
              <div className="mt-6 bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Editar: {edited.word}</h4>
                <label className="block text-sm mb-1">Translations (comma separated)</label>
                <input className="w-full p-2 border rounded mb-3" value={(edited.translations || []).join(', ')} onChange={(e)=> setEdited({...edited, translations: e.target.value.split(',').map(s=>s.trim())})} />
                <label className="block text-sm mb-1">Example</label>
                <textarea className="w-full p-2 border rounded mb-3" value={edited.example || ''} onChange={(e)=> setEdited({...edited, example: e.target.value})} />
                <div className="flex gap-2">
                  <button onClick={save} className="px-4 py-2 bg-amber-500 text-white rounded">Guardar</button>
                  <button onClick={() => setEdited(null)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

