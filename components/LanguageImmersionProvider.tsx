'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Level = 'beginner' | 'intermediate' | 'advanced';

interface ImmersionContextValue {
  level: Level;
  setLevel: (l: Level) => void;
  soloSpanish: boolean;
  setSoloSpanish: (v: boolean) => void;
  reportMistake: (key: string) => number; // returns mistakes count
}

const ImmersionContext = createContext<ImmersionContextValue | null>(null);

export function LanguageImmersionProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState<Level>(() => {
    try { return (localStorage.getItem('immersion:level') as Level) || 'beginner'; } catch { return 'beginner'; }
  });
  const [soloSpanish, setSoloSpanishState] = useState<boolean>(() => {
    try { return localStorage.getItem('immersion:solo') === '1'; } catch { return false; }
  });

  const [mistakesMap, setMistakesMap] = useState<Record<string, number>>({});

  useEffect(() => {
    try { localStorage.setItem('immersion:level', level); } catch {}
  }, [level]);
  useEffect(() => {
    try { localStorage.setItem('immersion:solo', soloSpanish ? '1' : '0'); } catch {}
  }, [soloSpanish]);

  const setSoloSpanish = (v: boolean) => setSoloSpanishState(v);

  const reportMistake = (key: string) => {
    setMistakesMap(prev => {
      const next = { ...prev, [key]: (prev[key] || 0) + 1 };
      try { localStorage.setItem('immersion:mistakes', JSON.stringify(next)); } catch {}
      return next;
    });
    return (mistakesMap[key] || 0) + 1;
  };

  return (
    <ImmersionContext.Provider value={{ level, setLevel, soloSpanish, setSoloSpanish, reportMistake }}>
      {children}
    </ImmersionContext.Provider>
  );
}

export function useImmersion() {
  const ctx = useContext(ImmersionContext);
  if (!ctx) throw new Error('useImmersion must be used inside LanguageImmersionProvider');
  return ctx;
}

