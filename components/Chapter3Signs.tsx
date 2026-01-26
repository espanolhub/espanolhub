'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Cairo } from 'next/font/google';
import ProUpgradeModal from './ProUpgradeModal';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600'],
});

type Sign = {
  id: string;
  name_es: string;
  name_ar: string;
  img?: string;
  explanation_ar: string;
};

const allSigns: Record<string, Sign[]> = {
  warning: [
    { id: 'w1', name_es: 'Curva peligrosa', name_ar: 'منحنى خطر', img: '/placeholder-sign.svg', explanation_ar: 'تتباطأ قبل المنعطف واستعمل الإشارات إذا لزم.' },
    { id: 'w2', name_es: 'Desnivel', name_ar: 'تضاريس غير مستوية', img: '/placeholder-sign.svg', explanation_ar: 'انتبه لانخفاض مفاجئ على الطريق.' },
    { id: 'w3', name_es: 'Intersección próxima', name_ar: 'تقاطع قادم', img: '/placeholder-sign.svg', explanation_ar: 'خفض السرعة واستعد للحق الأولوية.' },
    { id: 'w4', name_es: 'Paso de peatones', name_ar: 'عبور المشاة', img: '/placeholder-sign.svg', explanation_ar: 'توقف إن رأيت مشاة على الممر.' },
    { id: 'w5', name_es: 'Resbaladizo', name_ar: 'زلق', img: '/placeholder-sign.svg', explanation_ar: 'قلل السرعة، طرق زلقة قد تسبب انزلاق المركبة.' },
    { id: 'w6', name_es: 'Obras', name_ar: 'أشغال', img: '/placeholder-sign.svg', explanation_ar: 'تباطأ واتباع إشارات العمال.' },
  ],
  prohibitory: [
    { id: 'p1', name_es: 'Prohibido girar a la izquierda', name_ar: 'ممنوع الدوران لليسار', img: '/placeholder-sign.svg', explanation_ar: 'لا يمكنك القيام بالدوران لليسار عند هذه العلامة.' },
    { id: 'p2', name_es: 'Prohibido adelantar', name_ar: 'ممنوع التجاوز', img: '/placeholder-sign.svg', explanation_ar: 'ممنوع تجاوز المركبات الأخرى في هذا المقطع.' },
    { id: 'p3', name_es: 'Prohibido estacionar', name_ar: 'ممنوع الوقوف', img: '/placeholder-sign.svg', explanation_ar: 'لا توقف المركبة في هذا المكان.' },
    { id: 'p4', name_es: 'Prohibido bicicleta', name_ar: 'ممنوع الدراجات', img: '/placeholder-sign.svg', explanation_ar: 'ممنوع دخول الدراجات لهذا الجزء من الطريق.' },
    { id: 'p5', name_es: 'Prohibido camiones', name_ar: 'ممنوع الشاحنات', img: '/placeholder-sign.svg', explanation_ar: 'ممنوع مرور الشاحنات في هذا الطريق.' },
    { id: 'p6', name_es: 'Velocidad prohibida', name_ar: 'سرعة ممنوعة', img: '/placeholder-sign.svg', explanation_ar: 'سرعة أعلى من المسموح بها محظورة.' },
  ],
  mandatory: [
    { id: 'm1', name_es: 'Obligatorio girar a la derecha', name_ar: 'إجباري الدوران لليمين', img: '/placeholder-sign.svg', explanation_ar: 'يجب عليك الدوران لليمين.' },
    { id: 'm2', name_es: 'Paso obligatorio', name_ar: 'عبور إلزامي', img: '/placeholder-sign.svg', explanation_ar: 'يجب اتباع المسار المحدد.' },
    { id: 'm3', name_es: 'Sentido obligatorio', name_ar: 'اتجاه إلزامي', img: '/placeholder-sign.svg', explanation_ar: 'سلك الاتجاه المناسب ولا تنعطف.' },
    { id: 'm4', name_es: 'Ceda el paso', name_ar: 'أفسح المجال', img: '/placeholder-sign.svg', explanation_ar: 'تَبْقَ حذرًا وأفسح المجال للمركبات الأخرى.' },
    { id: 'm5', name_es: 'Stop (obligatorio)', name_ar: 'قف (ملزم)', img: '/placeholder-sign.svg', explanation_ar: 'توقف تمامًا عند خط التوقف قبل الاستمرار.' },
  ],
  info: [
    { id: 'i1', name_es: 'Estación de servicio', name_ar: 'محطة وقود', img: '/placeholder-sign.svg', explanation_ar: 'يوفر المكان خدمات الوقود والصيانة.' },
    { id: 'i2', name_es: 'Parking', name_ar: 'موقف سيارات', img: '/placeholder-sign.svg', explanation_ar: 'مكان مخصص لوقوف المركبات.' },
    { id: 'i3', name_es: 'Zona peatonal', name_ar: 'منطقة مشاة', img: '/placeholder-sign.svg', explanation_ar: 'مقصورة للمشاة ويجب تخفيض السرعة.' },
    { id: 'i4', name_es: 'Dirección obligatoria', name_ar: 'اتجاه إلزامي', img: '/placeholder-sign.svg', explanation_ar: 'اتبع الاتجاه المشار إليه.' },
  ],
};

export default function Chapter3Signs({ isProUser, onRequestPro }: { isProUser: boolean; onRequestPro: () => void; }) {
  const [tab, setTab] = useState<'warning'|'prohibitory'|'mandatory'|'info'>('warning');
  const [query, setQuery] = useState('');
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const signs = useMemo(() => {
    const list = allSigns[tab] || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(s => s.name_es.toLowerCase().includes(q) || s.name_ar.includes(q));
  }, [tab, query]);

  const visibleSigns = isProUser ? signs : signs.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">Señales de Tráfico / إشارات المرور</h3>
        <div className="flex items-center gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar señal / ابحث عن إشارة (Giro, Prohibido...)" className="px-3 py-2 rounded-lg border w-64" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={()=>setTab('warning')} className={`px-3 py-2 rounded-lg ${tab==='warning'?'bg-purple-600 text-white':'bg-white text-gray-900'}`}>⚠️ Advertencia</button>
        <button onClick={()=>setTab('prohibitory')} className={`px-3 py-2 rounded-lg ${tab==='prohibitory'?'bg-purple-600 text-white':'bg-white text-gray-900'}`}>🚫 Prohibición</button>
        <button onClick={()=>setTab('mandatory')} className={`px-3 py-2 rounded-lg ${tab==='mandatory'?'bg-purple-600 text-white':'bg-white text-gray-900'}`}>🔵 Obligación</button>
        <button onClick={()=>setTab('info')} className={`px-3 py-2 rounded-lg ${tab==='info'?'bg-purple-600 text-white':'bg-white text-gray-900'}`}>🟦 Información</button>
      </div>

      {/* Grid of signs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleSigns.map(sign => (
          <div key={sign.id} className="relative w-full">
            <div
              onClick={()=>setFlipped(prev=>({...prev,[sign.id]:!prev[sign.id]}))}
              className="cursor-pointer w-full h-44 modern-card p-3 flex flex-col items-center justify-center text-center transition-transform hover:scale-105"
            >
              <div className="mb-2">
                {sign.img && <Image src={sign.img} alt={sign.name_es} width={48} height={48} className="object-contain" />}
              </div>
              <div className="font-semibold text-sm">{sign.name_es}</div>
              <div className="text-xs text-gray-500" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>{sign.name_ar}</div>
              {flipped[sign.id] && (
                <div className="absolute inset-0 bg-white/95 p-4 rounded-xl flex items-center justify-center text-sm">
                  <div>
                    <div className="font-semibold mb-2">Explicación</div>
                    <div className="text-xs text-gray-700" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>{sign.explanation_ar}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!isProUser && signs.length > 3 && (
        <div className="text-center">
          <button onClick={onRequestPro} className="btn-primary px-4 py-2 rounded-lg">Show More / عرض المزيد</button>
        </div>
      )}

      {/* Pro modal handled by parent */}
    </div>
  );
}

