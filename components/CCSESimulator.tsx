'use client';

import React from 'react';

export default function CCSESimulator() {
  return (
    <div className="modern-card bg-white p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">CCSE Simulator (Placeholder)</h3>
      <p className="text-sm text-gray-600 mb-4">This is a placeholder for the CCSE-style exam simulator. It will mimic the official CCSE format.</p>
      <div className="space-y-3">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="font-medium">Formato CCSE: preguntas de opción múltiple, tiempo limitado y revisión final.</div>
        </div>
        <button className="btn-primary px-4 py-2 rounded-lg">Iniciar Simulador (Próximamente)</button>
      </div>
    </div>
  );
}

