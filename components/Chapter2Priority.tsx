'use client';

import React from 'react';

export default function Chapter2Priority({ isPro, onRequestPro }: { isPro: boolean; onRequestPro?: () => void; }) {
  const content = (
    <div className="space-y-6">
      {/* Intro */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Prioridad de Paso</h3>
        <p className="text-base text-gray-700 mb-1">
          Regla general: el que viene por la derecha tiene prioridad cuando no hay señalización especial.
        </p>
      </div>

      {/* Order of Authority */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Orden de Autoridad</h4>
        <ol className="space-y-3 list-decimal list-inside text-gray-700">
          <li className="modern-card p-3">Policía</li>
          <li className="modern-card p-3">Señales temporales</li>
          <li className="modern-card p-3">Semáforos</li>
          <li className="modern-card p-3">Señales verticales</li>
          <li className="modern-card p-3">Marcas en pavimento</li>
        </ol>
      </div>

      {/* Intersection Scenarios */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Escenarios comunes</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl modern-card">
            <h5 className="font-semibold mb-2">Intersección sin señal</h5>
            <p className="text-sm text-gray-700 mb-1">Aplica la regla de la derecha; reduce la velocidad y observa.</p>
          </div>
          <div className="p-4 bg-white rounded-xl modern-card">
            <h5 className="font-semibold mb-2">Glorieta</h5>
            <p className="text-sm text-gray-700 mb-1">Ceden prioridad los que entran al circulo conforme a la señalización local.</p>
          </div>
          <div className="p-4 bg-white rounded-xl modern-card">
            <h5 className="font-semibold mb-2">Vehículo de emergencia</h5>
            <p className="text-sm text-gray-700 mb-1">Siempre cede el paso a ambulancias, bomberos y policía en servicio.</p>
          </div>
        </div>
      </div>

      {/* Dictionary */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Diccionario</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold">Intersección</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold">Glorieta</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold">Vehículo de emergencia</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold">Preferencia</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isPro) {
    return <div className="space-y-4">{content}</div>;
  }

  // Blurred preview for non-Pro users
  return (
    <div className="relative">
      <div className="filter blur-md pointer-events-none select-none opacity-80">
        {content}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg modern-card text-center max-w-sm">
          <div className="text-lg font-semibold mb-2">Unlock this lesson with PRO</div>
          <div className="text-sm text-gray-700 mb-4">Accede a la lección completa y recursos adicionales.</div>
          <div className="flex gap-2">
            <button onClick={onRequestPro} className="btn-primary px-4 py-2 rounded-lg btn-glow">Unlock PRO</button>
            <button onClick={() => {}} className="px-4 py-2 rounded-lg bg-white border">Maybe later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

