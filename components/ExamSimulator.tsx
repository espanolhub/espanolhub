'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ProUpgradeModal from './ProUpgradeModal';
import { addXP, unlockAchievement } from '@/lib/utils/progress';
import { StopCircle, AlertTriangle, TrafficCone } from 'lucide-react';
import Image from 'next/image';

type ExamQuestion = {
  id: string;
  question_es: string;
  question_ar: string;
  options: string[]; // A,B,C
  correct: string;
  explanation_ar: string;
  // optional: could map to an icon name via id mapping
  // icon handled externally by id
};

// 30 high-quality bilingual DGT-style tricky questions
const QUESTIONS: ExamQuestion[] = [
  { id: 'q1', question_es: 'Con lluvia intensa, ¿cómo se debe adaptar la velocidad?', question_ar: 'عند هطول أمطار غزيرة، كيف يجب تعديل السرعة؟', options: ['Reducir y aumentar distancia', 'Mantener la velocidad', 'Acelerar'], correct: 'Reducir y aumentar distancia', explanation_ar: 'يجب تقليل السرعة وزيادة مسافة الأمان لأن السطح زلق.' },
  { id: 'q2', question_es: 'En intersección sin señal, ¿quién tiene prioridad?', question_ar: 'في تقاطع بدون إشارة، من له الأفضلية؟', options: ['El que viene por la derecha', 'El que viene por la izquierda', 'El vehículo más grande'], correct: 'El que viene por la derecha', explanation_ar: 'القادم من اليمين له الأفضلية.' },
  { id: 'q3', question_es: 'Semáforo ámbar intermitente significa:', question_ar: 'الضوء الكهرماني المتقطع يعني:', options: ['Precaución', 'Detenerse siempre', 'Avanzar sin detener'], correct: 'Precaución', explanation_ar: 'يعني توخي الحذر وقد يتطلب إعطاء الأفضلية.' },
  { id: 'q4', question_es: 'Al aproximarse a un paso de peatones con peatón esperando, ¿qué hacer?', question_ar: 'عند الاقتراب من معبر المشاة وهناك مشاة ينتظر، ماذا تفعل؟', options: ['Detenerse y permitir el paso', 'Tocar bocina', 'Acelerar'], correct: 'Detenerse y permitir el paso', explanation_ar: 'يجب التوقف والسماح للمشاة بالعبور.' },
  { id: 'q5', question_es: 'Señal "Prohibido adelantar" indica:', question_ar: 'إشارة "ممنوع التجاوز" تعني:', options: ['No adelantar', 'Adelantar rápido', 'Adelantar camiones'], correct: 'No adelantar', explanation_ar: 'تحظر أي تجاوز حتى انتهاء المنطقة.' },
  { id: 'q6', question_es: 'En glorieta, ¿quién tiene prioridad?', question_ar: 'في الدوار، من له الأولوية؟', options: ['Los que circulan dentro', 'Los que entran', 'Los peatones'], correct: 'Los que circulan dentro', explanation_ar: 'من داخل الدوار لهم الأولوية.' },
  { id: 'q7', question_es: 'Señal triangular con borde rojo indica:', question_ar: 'العلامة المثلثية بحافة حمراء تدل على:', options: ['Peligro', 'Prohibición', 'Información'], correct: 'Peligro', explanation_ar: 'تحذر من خطر قادم.' },
  { id: 'q8', question_es: 'Vehículo de emergencia con sirena, ¿qué hacer?', question_ar: 'مركبة طوارئ مع صفارة، ماذا تفعل؟', options: ['Ceder paso y apartarse', 'Ignorar', 'Acelerar'], correct: 'Ceder paso y apartarse', explanation_ar: 'يجب تسهيل مرورها بالابتعاد بأمان.' },
  { id: 'q9', question_es: 'Línea continua central implica:', question_ar: 'الخط المتصل في الوسط يعني:', options: ['No adelantar ni cruzar', 'Permite adelantar', 'Solo bicicletas'], correct: 'No adelantar ni cruzar', explanation_ar: 'تحظر التجاوز أو عبور الخط.' },
  { id: 'q10', question_es: 'Zona escolar: velocidad típica?', question_ar: 'منطقة مدرسية: ما السرعة النموذجية؟', options: ['30 km/h', '120 km/h', '90 km/h'], correct: '30 km/h', explanation_ar: 'تخفيض السرعة لحماية الأطفال.' },
  { id: 'q11', question_es: 'Señal azul con flecha blanca indica:', question_ar: 'العلامة الزرقاء بالسهم الأبيض تدل على:', options: ['Dirección obligatoria', 'Prohibición', 'Advertencia'], correct: 'Dirección obligatoria', explanation_ar: 'تفرض الاتجاه المشار إليه.' },
  { id: 'q12', question_es: 'Carretera mojada: distancia de seguridad?', question_ar: 'طريق مبلل: مسافة الأمان؟', options: ['Mayor', 'Igual', 'Menor'], correct: 'Mayor', explanation_ar: 'زيادة المسافة لتقليل مخاطر الانزلاق.' },
  { id: 'q13', question_es: 'Señal octogonal roja obliga a:', question_ar: 'العلامة ثمانية الأضلاع الحمراء تجبر على:', options: ['Parada total', 'Prohibición de giro', 'Fin de velocidad'], correct: 'Parada total', explanation_ar: 'تتطلب وقوفًا تامًا عند خط الوقوف.' },
  { id: 'q14', question_es: 'Líneas amarillas en bordillo implican:', question_ar: 'الخط الأصفر على الحافة يعني:', options: ['Prohibido estacionar', 'Acelerar', 'Giro permitido'], correct: 'Prohibido estacionar', explanation_ar: 'تحظر التوقف/الوقوف على الحافة.' },
  { id: 'q15', question_es: 'Ciclista en calzada: prioridad?', question_ar: 'الدراجة على الطريق: أولوية؟', options: ['Depende de señalización', 'Siempre prioridad', 'Nunca prioridad'], correct: 'Depende de señalización', explanation_ar: 'تعتمد الأفضلية على الإشارات والسياق.' },
  { id: 'q16', question_es: 'Señal de fin de prohibición indica:', question_ar: 'علامة نهاية الحظر تعني:', options: ['Fin de restricciones', 'Inicio de prohibición', 'Zona peatonal'], correct: 'Fin de restricciones', explanation_ar: 'تنهي القيود السابقة.' },
  { id: 'q17', question_es: 'Uso de luces largas cuándo?', question_ar: 'متى تستخدم الأضواء العالية؟', options: ['En carretera sin tráfico', 'Siempre en ciudad', 'Mientras haya vehículos adelante'], correct: 'En carretera sin tráfico', explanation_ar: 'تستخدم في الطرق المظلمة دون مركبات مقابلة.' },
  { id: 'q18', question_es: 'Ceda el paso significa:', question_ar: 'عبارة "أفسح المجال" تعني:', options: ['Ceder al tráfico principal', 'Detenerse siempre', 'Prioridad propia'], correct: 'Ceder al tráfico principal', explanation_ar: 'يجب إعطاء الأفضلية لحركة الطريق الرئيسي.' },
  { id: 'q19', question_es: 'Tren con barrera bajada: ¿qué hacer?', question_ar: 'قطار وحاجز منخفض: ماذا تفعل؟', options: ['Detenerse y esperar', 'Pasar con cuidado', 'Tocar bocina'], correct: 'Detenerse y esperar', explanation_ar: 'التوقف والانتظار حتى يُفتح الحاجز.' },
  { id: 'q20', question_es: 'Señal azul con P blanca indica:', question_ar: 'علامة P البيضاء على خلفية زرقاء تدل على:', options: ['Parking', 'Prohibición', 'Peligro'], correct: 'Parking', explanation_ar: 'منطقة مخصصة لوقوف المركبات.' },
  { id: 'q21', question_es: 'Límite 30 km/h significa:', question_ar: 'حد 30 كم/س يعني:', options: ['Máx 30 km/h', 'Mín 30 km/h', 'Velocidad recomendada'], correct: 'Máx 30 km/h', explanation_ar: 'الحد الأقصى المسموح به 30 كم/س.' },
  { id: 'q22', question_es: 'Señal de obras y desvío: hacer?', question_ar: 'إشارة أشغال وتحويل: ماذا تفعل؟', options: ['Seguir señalización temporal', 'Ignorar señales', 'Tomar ruta alterna'], correct: 'Seguir señalización temporal', explanation_ar: 'اتباع الإشارات المؤقتة وتخفيض السرعة.' },
  { id: 'q23', question_es: 'Señal fin de zona limitada significa:', question_ar: 'علامة نهاية المنطقة المحدودة تعني:', options: ['Fin de restricción', 'Inicio de restricción', 'Zona escolar'], correct: 'Fin de restricción', explanation_ar: 'تنهي القيود السابقة.' },
  { id: 'q24', question_es: '¿Dónde detenerse con STOP?', question_ar: 'أين تتوقف مع STOP؟', options: ['Antes de la línea o intersección', 'En la intersección', 'Después de la línea'], correct: 'Antes de la línea o intersección', explanation_ar: 'توقف قبل خط التوقف أو قبل التقاطع إذا لم يكن الخط موجودًا.' },
  { id: 'q25', question_es: 'Triángulo con peatón indica:', question_ar: 'مثلث برمز المشاة يدل على:', options: ['Advertencia paso de peatones', 'Prohibición de peatones', 'Zona industrial'], correct: 'Advertencia paso de peatones', explanation_ar: 'تحذير من معبر المشاة القريب.' },
  { id: 'q26', question_es: 'Niebla intensa: qué luces usar?', question_ar: 'ضباب كثيف: أي أضواء تستخدم؟', options: ['Luces de cruce y antiniebla', 'Largas', 'Intermitentes'], correct: 'Luces de cruce y antiniebla', explanation_ar: 'استخدم الأضواء المنخفضة وأضواء الضباب إذا لزم.' },
  { id: 'q27', question_es: 'Señal azul con "P" indica:', question_ar: 'علامة P البيضاء على أزرق تدل على:', options: ['Parking', 'Prohibición', 'Peligro'], correct: 'Parking', explanation_ar: 'منطقة لوقوف المركبات.' },
  { id: 'q28', question_es: 'Rotonda con prioridad señalizada: hacer?', question_ar: 'دوار بأولوية مُعلنة: ماذا تفعل؟', options: ['Seguir señalización', 'Entrar acelerando', 'No ceder'], correct: 'Seguir señalización', explanation_ar: 'اتبع إشارات الأولوية المعلنة.' },
  { id: 'q29', question_es: 'Círculo rojo con 50 significa:', question_ar: 'دائرة حمراء مع 50 تعني:', options: ['Límite máximo 50', 'Velocidad recomendada', 'Ruta 50'], correct: 'Límite máximo 50', explanation_ar: 'الحد الأقصى للسرعة 50 كم/س.' },
  { id: 'q30', question_es: 'Si no conoces la señal, debes:', question_ar: 'إذا لم تعرف الإشارة، يجب أن:', options: ['Reducir y observar', 'Ignorarla', 'Continuar'], correct: 'Reducir y observar', explanation_ar: 'قلل السرعة وابحث عن معلومات أو إشارات إضافية.' },
];

export default function ExamSimulator({
  isProUser,
  onRequestPro,
  questionsProp,
  timeLimitMinutes,
  passThreshold,
  xpOnPass,
  achievementId,
}: {
  isProUser: boolean;
  onRequestPro: () => void;
  questionsProp?: ExamQuestion[];
  timeLimitMinutes?: number;
  passThreshold?: number;
  xpOnPass?: number;
  achievementId?: string;
}) {
  const questions = useMemo(() => (questionsProp && questionsProp.length ? questionsProp : QUESTIONS), [questionsProp]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeState, setResumeState] = useState<any>(null);
  const [selectedExam, setSelectedExam] = useState(1);
  const [showProModal, setShowProModal] = useState(false);

  // exam state
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => (timeLimitMinutes ? timeLimitMinutes * 60 : 30 * 60)); // seconds
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // temp selection before confirm
  const [finished, setFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    let t: any;
    if (started && !finished) {
      t = setInterval(() => {
        setTimeLeft((s) => {
          if (s <= 1) {
            clearInterval(t);
            setFinished(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [started, finished]);

  const startExam = () => {
    setStarted(true);
    setFinished(false);
    setTimeLeft(timeLimitMinutes ? timeLimitMinutes * 60 : 30 * 60);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    try {
      sessionStorage.setItem('dl_exam_state', JSON.stringify({
        started: true,
        timeLeft: timeLimitMinutes ? timeLimitMinutes * 60 : 30 * 60,
        currentIndex: 0,
        answers: {},
      }));
    } catch (e) {}
  };

  const selectOption = (opt: string) => {
    setSelectedOption(opt);
  };

  const submitExam = () => {
    setFinished(true);
  };

  const confirmAnswer = () => {
    const qid = questions[currentIndex].id;
    if (!selectedOption) return;
    setAnswers(prev => {
      const next = { ...prev, [qid]: selectedOption };
      try {
        const raw = sessionStorage.getItem('dl_exam_state');
        const st = raw ? JSON.parse(raw) : {};
        st.answers = next;
        st.currentIndex = currentIndex;
        st.timeLeft = timeLeft;
        sessionStorage.setItem('dl_exam_state', JSON.stringify(st));
      } catch (e) {}
      return next;
    });
    setSelectedOption(null);
  };

  // persist state periodically
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('dl_exam_state');
      const st = raw ? JSON.parse(raw) : {};
      st.started = started;
      st.timeLeft = timeLeft;
      st.currentIndex = currentIndex;
      st.answers = answers;
      sessionStorage.setItem('dl_exam_state', JSON.stringify(st));
    } catch (e) {}
  }, [answers, timeLeft, currentIndex, started]);

  // Resume guard: try to restore exam state from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('dl_exam_state');
      if (raw) {
        const st = JSON.parse(raw);
        if (st && st.started && !started && !finished) {
          // show custom resume modal
          setResumeState(st);
          setShowResumeModal(true);
        }
      }
    } catch (e) {}
  }, []);

  const errors = useMemo(() => {
    let e = 0;
    questions.forEach(q => {
      if (answers[q.id] && answers[q.id] !== q.correct) e++;
      if (!answers[q.id]) e++;
    });
    return e;
  }, [answers, questions]);

  // Exam selector handler with PRO lock
  const handleSelectExam = (num: number) => {
    if (!isProUser && num > 1) {
      setShowProModal(true);
      return;
    }
    setSelectedExam(num);
    // could load different question sets per exam
  };

  const formatTime = (s: number) => {
    const mm = Math.floor(s/60).toString().padStart(2,'0');
    const ss = (s%60).toString().padStart(2,'0');
    return `${mm}:${ss}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Resume Modal */}
      {showResumeModal && resumeState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative modern-card bg-white/60 backdrop-blur-md border border-white/30 p-6 w-full max-w-lg z-10">
            <h3 className="text-xl font-semibold mb-2">You have an exam in progress! / لديك امتحان قيد التقدم</h3>
            <p className="text-sm text-gray-700 mb-4">Would you like to continue where you left off? / هل تود الاستمرار من حيث توقفت؟</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => {
                // continue
                setStarted(true);
                setTimeLeft(resumeState.timeLeft || 30*60);
                setCurrentIndex(resumeState.currentIndex || 0);
                setAnswers(resumeState.answers || {});
                setShowResumeModal(false);
                setResumeState(null);
              }} className="btn-primary px-4 py-2 rounded-lg">Continue / استمرار</button>
              <button onClick={() => {
                // discard
                try { sessionStorage.removeItem('dl_exam_state'); } catch(e) {}
                setShowResumeModal(false);
                setResumeState(null);
              }} className="px-4 py-2 rounded-lg border bg-white">Start New / ابدأ جديد</button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-2xl">
        <div className="modern-card bg-white p-6 flex flex-col items-center text-center">
          <div className="w-full mb-3">
            <div className="text-sm text-gray-500 mb-2">{formatTime(timeLeft)}</div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-600 transition-all"
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">{Object.keys(answers).length} / {questions.length} contestadas</div>
          </div>
          {!started && (
            <button onClick={startExam} className="btn-primary px-6 py-3 rounded-lg text-lg">Iniciar Examen</button>
          )}
          {started && (
            <>
              <div className="mt-4">
                <div className="text-2xl font-semibold mb-2">{questions[currentIndex].question_es}</div>
                <div className="text-sm text-gray-600 mb-4" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>{questions[currentIndex].question_ar}</div>
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {(() => {
                    const qid = questions[currentIndex].id;
                    if (qid === 'q3') return <TrafficCone className="w-24 h-24 text-gray-700" />;
                    if (qid === 'q13' || qid === 'q24') return <StopCircle className="w-24 h-24 text-gray-700" />;
                    if (qid === 'q25' || qid === 'q7') return <AlertTriangle className="w-24 h-24 text-gray-700" />;
                    return <Image src="/placeholder-sign.svg" alt="sign placeholder" width={96} height={96} className="w-24 h-24" />;
                  })()}
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {questions[currentIndex].options.map(opt => {
                    const confirmed = answers[questions[currentIndex].id] === opt;
                    const selected = selectedOption === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => selectOption(opt)}
                        className={`h-20 flex items-center justify-center rounded-lg text-lg font-semibold border ${
                          confirmed ? 'bg-green-600 text-white border-green-700' : selected ? 'bg-blue-600 text-white border-blue-700' : 'bg-slate-50 border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 w-full gap-2">
                <button onClick={() => { setCurrentIndex(ci => Math.max(0, ci-1)); setSelectedOption(null); }} className="px-4 py-2 rounded-lg bg-white border">Prev</button>

                <div className="flex items-center gap-2">
                  {!answers[questions[currentIndex].id] && (
                    <button
                      onClick={confirmAnswer}
                      disabled={!selectedOption}
                      className={`px-4 py-2 rounded-lg ${selectedOption ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      Confirmar
                    </button>
                  )}
                  <div className="text-sm text-gray-600">Pregunta {currentIndex+1} / {questions.length}</div>
                </div>

                <button
                  onClick={() => {
                    const qid = questions[currentIndex].id;
                    if (!answers[qid]) {
                      if (selectedOption) {
                        confirmAnswer();
                      } else {
                        return;
                      }
                    }
                    // if this is the last question, finish exam
                    if (currentIndex >= questions.length - 1) {
                      submitExam();
                    } else {
                      setCurrentIndex(ci => Math.min(questions.length - 1, ci + 1));
                    }
                    setSelectedOption(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-white border"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        {finished && (
          <div className="modern-card bg-white p-6 mt-4 text-center flex flex-col items-center gap-4">
            {(() => {
              const correctCount = questions.reduce((acc, q) => acc + ((answers[q.id] && answers[q.id] === q.correct) ? 1 : 0), 0);
              const threshold = typeof passThreshold === 'number' ? passThreshold : (questions.length === 30 ? (questions.length - 3) : (questions.length - 3));
              const passed = typeof passThreshold === 'number' ? (correctCount >= passThreshold) : (questions.length - correctCount <= 3);

              // save history
              try {
                const raw = localStorage.getItem('dl_exam_history');
                const history = raw ? JSON.parse(raw) : [];
                history.push({ timestamp: new Date().toISOString(), passed, errors: questions.length - correctCount, correct: correctCount, total: questions.length });
                localStorage.setItem('dl_exam_history', JSON.stringify(history));
              } catch (e) {}

              // award XP only if xpOnPass provided and passed
              if (passed && typeof xpOnPass === 'number' && xpOnPass > 0) {
                try { window.dispatchEvent(new CustomEvent('successMoment', { detail: { xp: xpOnPass } })); } catch (e) {}
                try { addXP(xpOnPass, `Apto ${questions.length}-preguntas`, 'exam-simulator'); } catch (e) {}
              }

              // unlock achievement badge if provided
              if (passed && achievementId) {
                try { unlockAchievement(achievementId); } catch (e) {}
              }

              return (
                <>
                  <div className={`uppercase text-4xl font-black tracking-wider ${passed ? 'text-green-700' : 'text-red-700'}`} style={{ transform: 'rotate(-6deg)', border: '8px solid rgba(0,0,0,0.04)', padding: '1rem 2rem', borderRadius: 8 }}>
                    {passed ? 'APTO' : 'NO APTO'}
                  </div>
                  <div className="text-sm text-gray-700">Errores: {questions.length - correctCount}</div>
                  <div className="flex gap-3">
                    <button onClick={()=>setReviewMode(true)} className="px-4 py-2 rounded-lg btn-primary">Revisar respuestas</button>
                    <button onClick={()=>{ setFinished(false); setStarted(false); try{ sessionStorage.removeItem('dl_exam_state'); }catch(e){} }} className="px-4 py-2 rounded-lg border">Cerrar</button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {reviewMode && (
          <div className="modern-card bg-white p-4 mt-4 space-y-3">
            <h4 className="font-semibold">Review / مراجعة</h4>
            {questions.map((q, idx) => {
              const user = answers[q.id];
              const wrong = user && user !== q.correct;
              return (
                <div key={q.id} className="p-2 border rounded">
                  <div className="text-sm font-medium">{idx+1}. {q.question_es}</div>
                  <div className="text-xs text-gray-600" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>{q.question_ar}</div>
                  <div className="mt-2 text-sm">Tu respuesta: {user ?? '—'}</div>
                  {wrong && <div className="mt-1 text-sm text-red-700" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>Explicación: {q.explanation_ar}</div>}
                  {!wrong && user && <div className="mt-1 text-sm text-green-700">Correcto</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProUpgradeModal open={showProModal} onClose={()=>setShowProModal(false)} onGetPro={()=>{
        try { localStorage.setItem('isProUser','true'); } catch(e) {}
        window.location.reload();
      }} />
    </div>
  );
}

