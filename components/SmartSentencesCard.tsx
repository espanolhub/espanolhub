'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { createRipple } from '@/lib/utils/ripple';
import type { Sentence } from '@/lib/data/sentences-100';
import { playClickSound } from '@/lib/utils/sounds';

interface SmartSentencesCardProps {
  sentence: Sentence;
}

export default function SmartSentencesCard({ sentence }: SmartSentencesCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

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

      {/* Spanish-only UI: no Arabic translation */}

      {/* Category Badge */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          {sentence.category}
        </span>
      </div>
    </div>
  );
}
