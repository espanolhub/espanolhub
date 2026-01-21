'use client';

import { useEffect, useRef } from 'react';

export default function SuccessMoment() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleSuccess = (e: Event) => {
      const detail: any = (e as CustomEvent)?.detail || {};
      const xp = detail.xp || 0;
      launchConfetti();
      playDing();
      // Notify XP listeners
      window.dispatchEvent(new CustomEvent('xpGained', { detail: { xp } }));
    };

    window.addEventListener('successMoment', handleSuccess as EventListener);
    return () => {
      window.removeEventListener('successMoment', handleSuccess as EventListener);
    };
  }, []);

  function playDing() {
    try {
      // Try playing compressed audio file first
      const audio = new Audio('/sounds/ding.mp3');
      audio.volume = 0.9;
      audio.play().catch(() => {
        // fallback to synth
        const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
        o.start();
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        o.stop(ctx.currentTime + 0.7);
      });
    } catch (err) {
      // ignore
    }
  }

  function launchConfetti() {
    // Confetti animation removed to preserve a clean, static background.
    // This function intentionally left blank to avoid particle animations.
  }

  function getCanvas() {
    // Canvas creation removed. We keep canvasRef for future non-visual effects.
    return null;
  }

  return null;
}

