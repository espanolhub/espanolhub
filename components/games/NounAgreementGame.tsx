'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle, VolumeX, Volume2, Zap, Trophy, Timer, ArrowRight, RotateCcw, Puzzle } from 'lucide-react';
import GameShell from '@/components/games/ui/GameShell';
import GameButton from '@/components/games/ui/GameButton';
import { playCompletionSound, playFailSound, playSuccessSound } from '@/lib/utils/sounds';
import { NOUNS, NounItem, NumberForm, Gender, articleFor, phraseFor, pickRandomNouns, toPlural } from '@/lib/data/noun-agreement';

type LevelId = 1 | 2 | 3;
type Phase = 'intro' | 'playing' | 'levelComplete' | 'complete';

type LevelConfig = {
  roundsLevel1: number;
  roundsLevel2: number;
  roundsLevel3: number;
};

type Props = {
  data?: { roundsLevel1?: number; roundsLevel2?: number; roundsLevel3?: number };
  roundsLevel1?: number;
  roundsLevel2?: number;
  roundsLevel3?: number;
  onBack?: () => void;
  onComplete?: (score: number) => void;
};

type Flash = 'none' | 'success' | 'fail';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now()}`;
}

function titleCase(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function computeMultiplier(streak: number) {
  return 1 + Math.floor(streak / 3);
}

function safePlay(fn: () => void) {
  try {
    fn();
  } catch {
    // ignore
  }
}

  // Fail sound is provided by lib/utils/sounds.ts

export default function NounAgreementGame({
  data,
  roundsLevel1,
  roundsLevel2,
  roundsLevel3,
  onBack,
  onComplete,
}: Props) {
  const cfg: LevelConfig = {
    roundsLevel1: roundsLevel1 ?? data?.roundsLevel1 ?? 20,
    roundsLevel2: roundsLevel2 ?? data?.roundsLevel2 ?? 15,
    roundsLevel3: roundsLevel3 ?? data?.roundsLevel3 ?? 25,
  };

  const [phase, setPhase] = useState<Phase>('intro');
  const [level, setLevel] = useState<LevelId>(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [muted, setMuted] = useState(false);
  const [flash, setFlash] = useState<Flash>('none');

  const multiplier = computeMultiplier(streak);

  // ===== Level 1 state (drag/drop OR tap-select) =====
  const [l1Cards, setL1Cards] = useState<Array<NounItem & { uid: string }>>([]);
  const [l1Mas, setL1Mas] = useState<string[]>([]);
  const [l1Fem, setL1Fem] = useState<string[]>([]);
  const [selectedCardUid, setSelectedCardUid] = useState<string | null>(null);

  // ===== Level 2 state (timer plural) =====
  const [l2Index, setL2Index] = useState(0);
  const [l2TimeLeft, setL2TimeLeft] = useState(10);
  const [l2Locked, setL2Locked] = useState(false);
  const l2TimerRef = useRef<number | null>(null);

  // ===== Level 3 state (fast mix) =====
  const [l3Index, setL3Index] = useState(0);
  const [l3TimeLeft, setL3TimeLeft] = useState(6);
  const [l3Locked, setL3Locked] = useState(false);
  const l3TimerRef = useRef<number | null>(null);

  const resetTimers = () => {
    if (l2TimerRef.current) window.clearInterval(l2TimerRef.current);
    if (l3TimerRef.current) window.clearInterval(l3TimerRef.current);
    l2TimerRef.current = null;
    l3TimerRef.current = null;
  };

  const startLevel1 = useCallback(() => {
    resetTimers();
    setLevel(1);
    setPhase('playing');
    setFlash('none');
    setSelectedCardUid(null);
    const picked = pickRandomNouns(cfg.roundsLevel1).map((n) => ({ ...n, uid: makeId(n.id) }));
    setL1Cards(shuffle(picked));
    setL1Mas([]);
    setL1Fem([]);
  }, [cfg.roundsLevel1]);

  const level1Done = useMemo(() => {
    return l1Cards.length > 0 && (l1Mas.length + l1Fem.length) >= l1Cards.length;
  }, [l1Cards.length, l1Mas.length, l1Fem.length]);

  const showFlash = (kind: Flash) => {
    setFlash(kind);
    window.setTimeout(() => setFlash('none'), 400);
  };

  const onCorrect = (basePoints: number) => {
    const nextStreak = streak + 1;
    const mult = computeMultiplier(nextStreak);
    setStreak(nextStreak);
    setScore((s) => s + basePoints * mult);
    showFlash('success');
    if (!muted) safePlay(playSuccessSound);
  };

  const onFail = () => {
    setStreak(0);
    showFlash('fail');
    if (!muted) safePlay(playFailSound);
  };

  const placeCard = useCallback(
    (uid: string, target: Gender) => {
      const card = l1Cards.find((c) => c.uid === uid);
      if (!card) return;
      const alreadyPlaced = l1Mas.includes(uid) || l1Fem.includes(uid);
      if (alreadyPlaced) return;

      const correct = card.gender === target;
      if (correct) {
        onCorrect(10);
      } else {
        onFail();
      }

      if (target === 'masculino') setL1Mas((prev) => [...prev, uid]);
      else setL1Fem((prev) => [...prev, uid]);

      setSelectedCardUid(null);
    },
    [l1Cards, l1Mas, l1Fem, onCorrect, onFail]
  );

  const handleDrop = (target: Gender) => (e: React.DragEvent) => {
    e.preventDefault();
    const uid = e.dataTransfer.getData('text/plain');
    if (uid) placeCard(uid, target);
  };

  const handleDragStart = (uid: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', uid);
    e.dataTransfer.effectAllowed = 'move';
  };

  const startLevel2 = useCallback(() => {
    resetTimers();
    setLevel(2);
    setPhase('playing');
    setFlash('none');
    setL2Index(0);
    setL2Locked(false);
    setL2TimeLeft(10);
  }, []);

  const startLevel3 = useCallback(() => {
    resetTimers();
    setLevel(3);
    setPhase('playing');
    setFlash('none');
    setL3Index(0);
    setL3Locked(false);
    setL3TimeLeft(6);
  }, []);

  // Level 2 question set (stable per run)
  const l2Questions = useMemo(() => {
    const pool = shuffle([...NOUNS]);
    const selected = pool.slice(0, clamp(cfg.roundsLevel2, 5, 30));
    return selected.map((n) => {
      const correct = phraseFor(n, 'plural'); // e.g. Las mesas
      const wrong1 = `${titleCase(articleFor(n.gender, 'singular'))} ${n.plural || toPlural(n.noun)}`; // wrong number article
      const wrongGender = n.gender === 'masculino' ? 'femenino' : 'masculino';
      const wrong2 = `${titleCase(articleFor(wrongGender, 'plural'))} ${n.plural || toPlural(n.noun)}`; // wrong gender article
      const other = pool.find((x) => x.id !== n.id) || pool[0];
      const wrong3 = phraseFor(other, 'plural');
      const options = shuffle([correct, wrong1, wrong2, wrong3]).slice(0, 4);
      return {
        id: makeId(`l2-${n.id}`),
        noun: n,
        prompt: phraseFor(n, 'singular'), // La mesa
        correct,
        options,
      };
    });
  }, [cfg.roundsLevel2]);

  // Level 3 question set (stable per run)
  const l3Questions = useMemo(() => {
    const pool = shuffle([...NOUNS]);
    const selected = pool.slice(0, clamp(cfg.roundsLevel3, 8, 40));
    return selected.map((n, idx) => {
      // Use deterministic approach based on index instead of Math.random()
      const number: NumberForm = idx % 2 === 0 ? 'singular' : 'plural';
      const correct = phraseFor(n, number);

      const wrongGender: Gender = n.gender === 'masculino' ? 'femenino' : 'masculino';
      const wrong1 = `${titleCase(articleFor(wrongGender, number))} ${number === 'plural' ? (n.plural || toPlural(n.noun)) : n.noun}`;

      const wrongNum: NumberForm = number === 'plural' ? 'singular' : 'plural';
      const wrong2 = phraseFor(n, wrongNum);

      const other = pool.find((x) => x.id !== n.id) || pool[0];
      const wrong3 = phraseFor(other, number);

      const options = shuffle([correct, wrong1, wrong2, wrong3]).slice(0, 4);
      return {
        id: makeId(`l3-${n.id}`),
        noun: n,
        correct,
        options,
      };
    });
  }, [cfg.roundsLevel3]);

  // Timers
  useEffect(() => {
    if (phase !== 'playing') return;
    if (level === 2) {
      if (l2TimerRef.current) window.clearInterval(l2TimerRef.current);
      l2TimerRef.current = window.setInterval(() => {
        setL2TimeLeft((t) => {
          if (t <= 1) return 0;
          return t - 1;
        });
      }, 1000);
      return () => {
        if (l2TimerRef.current) window.clearInterval(l2TimerRef.current);
        l2TimerRef.current = null;
      };
    }
    if (level === 3) {
      if (l3TimerRef.current) window.clearInterval(l3TimerRef.current);
      l3TimerRef.current = window.setInterval(() => {
        setL3TimeLeft((t) => {
          if (t <= 1) return 0;
          return t - 1;
        });
      }, 1000);
      return () => {
        if (l3TimerRef.current) window.clearInterval(l3TimerRef.current);
        l3TimerRef.current = null;
      };
    }
  }, [phase, level]);

  // Auto-fail when time runs out
  useEffect(() => {
    if (phase !== 'playing') return;
    if (level === 2 && l2TimeLeft === 0 && !l2Locked) {
      setL2Locked(true);
      onFail();
      window.setTimeout(() => {
        setL2Index((i) => i + 1);
        setL2Locked(false);
        setL2TimeLeft(10);
      }, 450);
    }
  }, [level, l2TimeLeft, l2Locked, phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (level === 3 && l3TimeLeft === 0 && !l3Locked) {
      setL3Locked(true);
      onFail();
      window.setTimeout(() => {
        setL3Index((i) => i + 1);
        setL3Locked(false);
        setL3TimeLeft(6);
      }, 450);
    }
  }, [level, l3TimeLeft, l3Locked, phase]);

  // Level transitions
  useEffect(() => {
    if (phase !== 'playing') return;
    if (level === 1 && level1Done) {
      safePlay(playCompletionSound);
      setPhase('levelComplete');
    }
  }, [level, level1Done, phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (level === 2 && l2Index >= l2Questions.length) {
      safePlay(playCompletionSound);
      setPhase('levelComplete');
    }
  }, [level, l2Index, l2Questions.length, phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (level === 3 && l3Index >= l3Questions.length) {
      safePlay(playCompletionSound);
      setPhase('complete');
      onComplete?.(score);
    }
  }, [level, l3Index, l3Questions.length, phase, score, onComplete]);

  const overallProgress = useMemo(() => {
    const levelCount = 3;
    if (phase === 'intro') return 0;
    if (level === 1) {
      const p = l1Cards.length ? (l1Mas.length + l1Fem.length) / l1Cards.length : 0;
      return (0 + p) / levelCount;
    }
    if (level === 2) {
      const p = l2Questions.length ? l2Index / l2Questions.length : 0;
      return (1 + p) / levelCount;
    }
    const p = l3Questions.length ? l3Index / l3Questions.length : 0;
    return (2 + p) / levelCount;
  }, [phase, level, l1Cards.length, l1Mas.length, l1Fem.length, l2Index, l2Questions.length, l3Index, l3Questions.length]);

  const start = () => {
    setScore(0);
    setStreak(0);
    setPhase('playing');
    startLevel1();
  };

  const nextLevel = () => {
    if (level === 1) return startLevel2();
    if (level === 2) return startLevel3();
  };

  const restartAll = () => {
    resetTimers();
    setPhase('intro');
    setLevel(1);
    setScore(0);
    setStreak(0);
    setFlash('none');
    setSelectedCardUid(null);
  };

  const header = (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              Género y Número
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 mt-1">
            Nivel {level} de 3
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="inline-flex items-center gap-2 px-3 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition"
            aria-label={muted ? 'Activar sonido' : 'Silenciar'}
            title={muted ? 'Activar sonido' : 'Silenciar'}
          >
            {muted ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
            <span className="hidden sm:inline text-sm font-semibold">{muted ? 'Silencio' : 'Sonido'}</span>
          </button>
          {onBack ? (
            <GameButton onClick={onBack} variant="secondary">
              Volver
            </GameButton>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-amber-600" aria-hidden="true" />
            Puntos
          </div>
          <div className="text-xl font-extrabold text-slate-900">{score}</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            Combo
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            x{multiplier} <span className="text-sm text-slate-600 font-semibold">({streak})</span>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 col-span-2 sm:col-span-2">
          <div className="flex items-center justify-between text-slate-700 text-xs font-semibold">
            <span>Progreso</span>
            <span>{Math.round(overallProgress * 100)}%</span>
          </div>
          <div className="mt-2 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${Math.round(overallProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {flash !== 'none' ? (
        <div
          className={[
            'mt-4 rounded-xl border p-3 text-sm font-semibold transition',
            flash === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700',
          ].join(' ')}
        >
          {flash === 'success' ? '¡Correcto!' : 'Incorrecto — sigue intentando'}
        </div>
      ) : null}
    </div>
  );

  // ===== Screens =====
  if (phase === 'intro') {
    return (
      <GameShell className="max-w-5xl mx-auto">
        {header}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-4 shadow-sm">
              <Puzzle className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Aprende Género y Número
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Tres niveles para dominar <strong>Masculino/Femenino</strong> y <strong>Singular/Plural</strong>.
              Responde rápido para aumentar el combo y ganar más puntos.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <div className="text-slate-900 font-bold mb-1">Nivel 1</div>
              <div className="text-slate-600 text-sm">Clasifica sustantivos en Masculino o Femenino.</div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <div className="text-slate-900 font-bold mb-1">Nivel 2</div>
              <div className="text-slate-600 text-sm">Transforma Singular a Plural contra el reloj.</div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <div className="text-slate-900 font-bold mb-1">Nivel 3</div>
              <div className="text-slate-600 text-sm">Elige el artículo correcto en retos rápidos.</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <GameButton onClick={start} variant="primary" size="lg" className="bg-blue-600 border-blue-600 hover:bg-blue-700 text-white">
              <Zap className="w-5 h-5" aria-hidden="true" />
              Empezar
            </GameButton>
            {onBack ? (
              <GameButton onClick={onBack} variant="secondary" size="lg">
                Volver a Juegos
              </GameButton>
            ) : null}
          </div>
        </div>
      </GameShell>
    );
  }

  if (phase === 'levelComplete') {
    return (
      <GameShell className="max-w-5xl mx-auto">
        {header}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 mb-4">
            <CheckCircle className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Nivel completado</h3>
          <p className="text-slate-600 mb-6">Excelente. Prepárate para el siguiente reto.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GameButton onClick={nextLevel} variant="primary" size="lg" className="bg-blue-600 border-blue-600 hover:bg-blue-700 text-white">
              Siguiente nivel
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </GameButton>
            <GameButton onClick={restartAll} variant="secondary" size="lg">
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              Reiniciar
            </GameButton>
          </div>
        </div>
      </GameShell>
    );
  }

  if (phase === 'complete') {
    return (
      <GameShell className="max-w-5xl mx-auto">
        {header}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-4 shadow-md">
            <Trophy className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-2">¡Juego completado!</h3>
          <p className="text-slate-600 mb-4">Tu puntuación final:</p>
          <div className="text-5xl font-extrabold text-amber-600 mb-6">{score}</div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GameButton onClick={restartAll} variant="primary" size="lg" className="bg-blue-600 border-blue-600 hover:bg-blue-700 text-white">
              Jugar de nuevo
            </GameButton>
            {onBack ? (
              <GameButton onClick={onBack} variant="secondary" size="lg">
                Volver a Juegos
              </GameButton>
            ) : null}
          </div>
        </div>
      </GameShell>
    );
  }

  // ===== Playing =====
  if (level === 1) {
    const placedCount = l1Mas.length + l1Fem.length;
    const total = l1Cards.length || cfg.roundsLevel1;

    const isPlaced = (uid: string) => l1Mas.includes(uid) || l1Fem.includes(uid);

    return (
      <GameShell className="max-w-6xl mx-auto">
        {header}

        <div className="mb-4 flex items-center justify-between text-slate-700 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            {placedCount}/{total} clasificadas
          </div>
          <div className="text-xs text-slate-500">
            Consejo: en móvil, toca una tarjeta y luego un cubo.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cards */}
          <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Arrastra o selecciona</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {l1Cards.map((c) => {
                const placed = isPlaced(c.uid);
                const selected = selectedCardUid === c.uid;
                return (
                  <button
                    key={c.uid}
                    type="button"
                    draggable={!placed}
                    onDragStart={handleDragStart(c.uid)}
                    onClick={() => {
                      if (placed) return;
                      setSelectedCardUid((prev) => (prev === c.uid ? null : c.uid));
                    }}
                    className={[
                      'select-none text-left rounded-xl border p-3 transition',
                      placed ? 'opacity-40 cursor-not-allowed bg-slate-100' : 'hover:bg-white hover:shadow-sm',
                      selected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 bg-white',
                    ].join(' ')}
                    aria-label={`Sustantivo: ${c.noun}`}
                  >
                    <div className="text-slate-900 font-bold text-base">{titleCase(c.noun)}</div>
                    {c.hint ? <div className="text-xs text-slate-500 mt-1">{c.hint}</div> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buckets */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-4 sm:p-6">
            <h3 className="text-white font-extrabold text-lg mb-4">Cubos</h3>

            <div className="space-y-3">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop('masculino')}
                className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-slate-200 font-extrabold">Masculino</div>
                  <GameButton
                    onClick={() => {
                      if (selectedCardUid) placeCard(selectedCardUid, 'masculino');
                    }}
                    variant="secondary"
                    className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  >
                    Colocar
                  </GameButton>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {l1Mas.slice(0, 12).map((uid) => {
                    const c = l1Cards.find((x) => x.uid === uid);
                    return (
                      <span key={uid} className="px-2 py-1 rounded-full text-xs bg-slate-800 text-slate-200 border border-slate-700">
                        {c ? titleCase(c.noun) : '—'}
                      </span>
                    );
                  })}
                  {l1Mas.length > 12 ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-800 text-slate-200 border border-slate-700">
                      +{l1Mas.length - 12}
                    </span>
                  ) : null}
                </div>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop('femenino')}
                className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-slate-200 font-extrabold">Femenino</div>
                  <GameButton
                    onClick={() => {
                      if (selectedCardUid) placeCard(selectedCardUid, 'femenino');
                    }}
                    variant="secondary"
                    className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  >
                    Colocar
                  </GameButton>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {l1Fem.slice(0, 12).map((uid) => {
                    const c = l1Cards.find((x) => x.uid === uid);
                    return (
                      <span key={uid} className="px-2 py-1 rounded-full text-xs bg-slate-800 text-slate-200 border border-slate-700">
                        {c ? titleCase(c.noun) : '—'}
                      </span>
                    );
                  })}
                  {l1Fem.length > 12 ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-800 text-slate-200 border border-slate-700">
                      +{l1Fem.length - 12}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-5 text-xs text-slate-400">
              Tip: si fallas, el combo se reinicia.
            </div>
          </div>
        </div>
      </GameShell>
    );
  }

  if (level === 2) {
    const q = l2Questions[l2Index];
    if (!q) return null;
    const progress = l2Questions.length ? (l2Index / l2Questions.length) * 100 : 0;

    return (
      <GameShell className="max-w-5xl mx-auto">
        {header}

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="text-slate-700 text-sm font-semibold">
              Pregunta {l2Index + 1} de {l2Questions.length}
            </div>
            <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700">
              <Timer className="w-4 h-4" aria-hidden="true" />
              <span className="font-bold">{l2TimeLeft}s</span>
            </div>
          </div>

          <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="text-center mb-6">
            <div className="text-slate-600 text-sm mb-2 font-semibold">Convierte a plural</div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900">{q.prompt}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                type="button"
                disabled={l2Locked}
                onClick={() => {
                  if (l2Locked) return;
                  setL2Locked(true);
                  const ok = opt === q.correct;
                  if (ok) onCorrect(15);
                  else onFail();
                  window.setTimeout(() => {
                    setL2Index((i) => i + 1);
                    setL2Locked(false);
                    setL2TimeLeft(10);
                  }, 450);
                }}
                className={[
                  'rounded-xl border p-4 text-left transition',
                  'bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-300',
                  l2Locked ? 'opacity-60 cursor-not-allowed' : '',
                ].join(' ')}
              >
                <div className="text-slate-900 font-bold text-lg">{opt}</div>
                <div className="text-xs text-slate-500 mt-1">Elige la opción correcta</div>
              </button>
            ))}
          </div>
        </div>
      </GameShell>
    );
  }

  // level 3
  const q3 = l3Questions[l3Index];
  if (!q3) return null;
  const progress3 = l3Questions.length ? (l3Index / l3Questions.length) * 100 : 0;

  return (
    <GameShell className="max-w-5xl mx-auto">
      {header}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="text-slate-700 text-sm font-semibold">
            Reto {l3Index + 1} de {l3Questions.length}
          </div>
          <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
            <Timer className="w-4 h-4" aria-hidden="true" />
            <span className="font-bold">{l3TimeLeft}s</span>
          </div>
        </div>

        <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300" style={{ width: `${progress3}%` }} />
        </div>

        <div className="text-center mb-6">
          <div className="text-slate-600 text-sm mb-2 font-semibold">Elige la forma correcta</div>
          <div className="text-3xl md:text-4xl font-extrabold text-slate-900">{titleCase(q3.noun.noun)}</div>
          {q3.noun.hint ? <div className="text-xs text-slate-500 mt-2">{q3.noun.hint}</div> : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q3.options.map((opt) => (
            <button
              key={opt}
              type="button"
              disabled={l3Locked}
              onClick={() => {
                if (l3Locked) return;
                setL3Locked(true);
                const ok = opt === q3.correct;
                if (ok) onCorrect(20);
                else onFail();
                window.setTimeout(() => {
                  setL3Index((i) => i + 1);
                  setL3Locked(false);
                  setL3TimeLeft(6);
                }, 420);
              }}
              className={[
                'rounded-xl border p-4 text-left transition',
                'bg-white border-slate-200 hover:bg-purple-50 hover:border-purple-300',
                l3Locked ? 'opacity-60 cursor-not-allowed' : '',
              ].join(' ')}
            >
              <div className="text-slate-900 font-bold text-lg">{opt}</div>
              <div className="text-xs text-slate-500 mt-1">Rápido: gana más combo</div>
            </button>
          ))}
        </div>
      </div>
    </GameShell>
  );
}

