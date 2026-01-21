'use client';

import { useState, useEffect } from 'react';
import { Volume2, Eye } from 'lucide-react';
import { createRipple } from '@/lib/utils/ripple';
import type { Sentence } from '@/lib/data/sentences-100';
import { playClickSound } from '@/lib/utils/sounds';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

interface SmartSentencesCardProps {
  sentence: Sentence;
}

export default function SmartSentencesCard({ sentence }: SmartSentencesCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    // Load voices on mount
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const pronounceSentence = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(sentence.spanish);
      utterance.lang = 'es-ES';
      utterance.rate = 0.75;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => 
        voice.lang.startsWith('es-ES') && 
        (voice.name.toLowerCase().includes('castilian') || 
         voice.name.toLowerCase().includes('spain') || 
         voice.name.toLowerCase().includes('peninsular'))
      ) || voices.find(voice => 
        voice.lang.startsWith('es-ES') && 
        !voice.name.toLowerCase().includes('latin')
      ) || voices.find(voice => voice.lang.startsWith('es-ES'));
      
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShowTranslation = () => {
    if (!showTranslation) {
      setShowTranslation(true);
      playClickSound();
      // Auto-play Spanish pronunciation when revealing translation
      pronounceSentence();
      // Trigger success moment (confetti, sound, XP animation)
      try {
        window.dispatchEvent(new CustomEvent('successMoment', { detail: { xp: 5 } }));
      } catch (e) {
        // ignore if not available
      }
    }
  };

  // Get tense label
  const tenseLabel = sentence.tense === 'Present' ? 'Presente' : 'Pasado';

  return (
    <div onPointerDown={(e) => createRipple(e)} className="w-full bg-white rounded-xl modern-card shadow-lg border border-gray-200 p-6 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Tense Badge */}
      <div className="flex justify-end mb-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
          {tenseLabel}
        </span>
      </div>

      {/* Spanish Sentence */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-xl md:text-2xl font-extrabold text-gray-800 mb-0">
          {sentence.spanish}
        </p>
        {/* Audio Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            pronounceSentence();
          }}
          disabled={isPlaying}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 px-3 py-2 rounded-md bg-white border"
          aria-label="Pronunciar oración"
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="sr-only">Escuchar</span>
        </button>
      </div>

      {/* Arabic Translation */}
      <div className="border-t border-gray-200 pt-4">
        {showTranslation ? (
          <p 
            className="text-base md:text-lg text-gray-700 leading-relaxed animate-in fade-in duration-300"
            dir="rtl"
            style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}
          >
            {sentence.arabic}
          </p>
        ) : (
          <div className="relative">
            {/* Blurred/Hidden Translation */}
            <div 
              className="relative backdrop-blur-sm bg-gradient-to-r from-white/80 to-gray-100/80 rounded-lg p-4 border border-gray-200/50"
              style={{ filter: 'blur(8px)', WebkitFilter: 'blur(8px)' }}
            >
              <p 
                className="text-base md:text-lg text-transparent leading-relaxed select-none"
                dir="rtl"
                style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}
              >
                {sentence.arabic}
              </p>
            </div>
            
            {/* Overlay with Eye Icon */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/40 group"
              onClick={handleShowTranslation}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-purple-500/90 rounded-full shadow-lg group-hover:bg-purple-600/90 transition-colors">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <p 
                  className="text-xs text-gray-600 font-medium"
                  dir="rtl"
                  style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}
                >
                  انقر للكشف
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Badge */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          {sentence.category}
        </span>
      </div>
    </div>
  );
}
