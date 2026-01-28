'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

type Sign = {
  id: string;
  name_es: string;
  img?: string;
};

const allSigns: Record<string, Sign[]> = {
  warning: [
    { id: 'w1', name_es: 'Curva peligrosa', img: '/placeholder-sign.svg' },
    { id: 'w2', name_es: 'Desnivel', img: '/placeholder-sign.svg' },
    { id: 'w3', name_es: 'Intersección próxima', img: '/placeholder-sign.svg' },
    { id: 'w4', name_es: 'Paso de peatones', img: '/placeholder-sign.svg' },
    { id: 'w5', name_es: 'Resbaladizo', img: '/placeholder-sign.svg' },
    { id: 'w6', name_es: 'Obras', img: '/placeholder-sign.svg' },
  ],
  prohibitory: [
    { id: 'p1', name_es: 'Prohibido girar a la izquierda', img: '/placeholder-sign.svg' },
    { id: 'p2', name_es: 'Prohibido adelantar', img: '/placeholder-sign.svg' },
    { id: 'p3', name_es: 'Prohibido estacionar', img: '/placeholder-sign.svg' },
    { id: 'p4', name_es: 'Prohibido bicicleta', img: '/placeholder-sign.svg' },
    { id: 'p5', name_es: 'Prohibido camiones', img: '/placeholder-sign.svg' },
    { id: 'p6', name_es: 'Velocidad prohibida', img: '/placeholder-sign.svg' },
  ],
  mandatory: [
    { id: 'm1', name_es: 'Obligatorio girar a la derecha', img: '/placeholder-sign.svg' },
    { id: 'm2', name_es: 'Paso obligatorio', img: '/placeholder-sign.svg' },
    { id: 'm3', name_es: 'Sentido obligatorio', img: '/placeholder-sign.svg' },
    { id: 'm4', name_es: 'Ceda el paso', img: '/placeholder-sign.svg' },
    { id: 'm5', name_es: 'Stop (obligatorio)', img: '/placeholder-sign.svg' },
  ],
  info: [
    { id: 'i1', name_es: 'Estación de servicio', img: '/placeholder-sign.svg' },
    { id: 'i2', name_es: 'Parking', img: '/placeholder-sign.svg' },
    { id: 'i3', name_es: 'Zona peatonal', img: '/placeholder-sign.svg' },
    { id: 'i4', name_es: 'Dirección obligatoria', img: '/placeholder-sign.svg' },
  ],
};

export default function Chapter3Signs({ isProUser, onRequestPro }: { isProUser: boolean; onRequestPro: () => void; }) {
  const [tab, setTab] = useState<'warning'|'prohibitory'|'mandatory'|'info'>('warning');
  const [query, setQuery] = useState('');

  const signs = useMemo(() => {
    const list = allSigns[tab] || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(s => s.name_es.toLowerCase().includes(q));
  }, [tab, query]);

  const visibleSigns = isProUser ? signs : signs.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">Señales de Tráfico</h3>
        <div className="flex items-center gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar señal (Giro, Prohibido...)" className="px-3 py-2 rounded-lg border w-64" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={()=>setTab('warning')} className={`px-3 py-2 rounded-lg ${tab==='warning'?'bg-blue-600 text-white':'bg-white text-gray-900'}`}>⚠️ Advertencia</button>
        <button onClick={()=>setTab('prohibitory')} className={`px-3 py-2 rounded-lg ${tab==='prohibitory'?'bg-blue-600 text-white':'bg-white text-gray-900'}`}>🚫 Prohibición</button>
        <button onClick={()=>setTab('mandatory')} className={`px-3 py-2 rounded-lg ${tab==='mandatory'?'bg-blue-600 text-white':'bg-white text-gray-900'}`}>🔵 Obligación</button>
        <button onClick={()=>setTab('info')} className={`px-3 py-2 rounded-lg ${tab==='info'?'bg-blue-600 text-white':'bg-white text-gray-900'}`}>🟦 Información</button>
      </div>

      {/* Grid of signs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleSigns.map(sign => (
          <div key={sign.id} className="relative w-full">
            <div
              className="cursor-pointer w-full h-44 modern-card p-3 flex flex-col items-center justify-center text-center transition-transform hover:scale-105"
            >
              <div className="mb-2">
                {sign.img && <Image src={sign.img} alt={sign.name_es} width={48} height={48} className="object-contain" />}
              </div>
              <div className="font-semibold text-sm">{sign.name_es}</div>
            </div>
          </div>
        ))}
      </div>

      {!isProUser && signs.length > 3 && (
        <div className="text-center">
          <button onClick={onRequestPro} className="btn-primary px-4 py-2 rounded-lg">Ver más</button>
        </div>
      )}

      {/* Pro modal handled by parent */}
    </div>
  );
}

