'use client';

import React, { useEffect, useState } from 'react';

type Toast = { id: number; message: string; type?: 'info' | 'success' | 'error' };

export default function Toasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // expose a global function to show toasts
    (window as any).__showToast = (message: string, type: Toast['type'] = 'info') => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => {
        setToasts((t) => t.filter(x => x.id !== id));
      }, 4000);
    };
    return () => { try { delete (window as any).__showToast; } catch(e){} };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-3 rounded shadow-lg max-w-xs ${t.type==='success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : t.type==='error' ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-white border border-gray-200 text-gray-900'}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

