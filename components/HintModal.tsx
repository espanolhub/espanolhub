'use client';

import React from 'react';
import { X } from 'lucide-react';

export default function HintModal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title ? <h3 className="text-lg font-semibold text-[#0f172a]">{title}</h3> : null}
            <div className="text-sm text-gray-600 mt-2">{children}</div>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="p-2 rounded-full bg-[#0f172a] text-white hover:opacity-90">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold shadow-md">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

