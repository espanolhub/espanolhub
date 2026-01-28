'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import type { UsefulSentence } from '@/lib/data/useful-sentences';
import { tenseLabels } from '@/lib/data/useful-sentences';

interface UsefulSentencesCardProps {
  sentence: UsefulSentence;
  flashcardMode?: boolean;
  showAllTranslations?: boolean;
}

export default function UsefulSentencesCard({ sentence, flashcardMode = false, showAllTranslations = false }: UsefulSentencesCardProps) {
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

  const tenseInfo = tenseLabels[sentence.tense];

  return (
    <div className="card-hover-effect bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Tense Badge */}
      <div className="flex justify-end mb-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
          {tenseInfo.es}
        </span>
      </div>

      {/* Spanish Sentence */}
      <div className="mb-4">
        <p className="text-lg md:text-xl font-bold text-gray-800 mb-2">
          {sentence.spanish}
        </p>
        
        {/* Audio Button */}
        <button
          onClick={pronounceSentence}
          disabled={isPlaying}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-3 disabled:opacity-50"
          aria-label="Pronunciar oración"
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-medium">Escuchar</span>
        </button>
      </div>

      {/* Spanish-only UI: no Arabic translation */}

      {/* Verbs */}
      {sentence.verbs && sentence.verbs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Verbos:</p>
          <div className="flex flex-wrap gap-2">
            {sentence.verbs.map((verb, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {verb}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
