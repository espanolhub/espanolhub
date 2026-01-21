'use client';

import { useState, useEffect } from 'react';
import { Volume2, Lightbulb } from 'lucide-react';
import type { UsefulSentence } from '@/lib/data/useful-sentences';
import { tenseLabels } from '@/lib/data/useful-sentences';
import { playSuccessSound } from '@/lib/utils/sounds';

interface UsefulSentencesCardProps {
  sentence: UsefulSentence;
  flashcardMode?: boolean;
  showAllTranslations?: boolean;
}

export default function UsefulSentencesCard({ sentence, flashcardMode = false, showAllTranslations = false }: UsefulSentencesCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(showAllTranslations);

  useEffect(() => {
    // Load voices on mount
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    // Update translation visibility based on showAllTranslations
    setShowTranslation(showAllTranslations);
  }, [showAllTranslations]);

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

  const handleRevealTranslation = () => {
    if (!showTranslation) {
      setShowTranslation(true);
      // Play success sound
      playSuccessSound();
      // Auto-play Spanish pronunciation when revealing translation
      pronounceSentence();
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

      {/* Arabic Translation */}
      <div 
        className="border-t border-gray-200 pt-4 relative"
        onClick={flashcardMode ? handleRevealTranslation : undefined}
        style={{ cursor: flashcardMode && !showTranslation ? 'pointer' : 'default' }}
      >
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
            {/* Blurred/Hidden Translation with Glassmorphism */}
            <div 
              className="relative backdrop-blur-sm bg-gradient-to-r from-white/80 to-gray-100/80 rounded-lg p-4 border border-gray-200/50"
              style={{ filter: 'blur(5px)', WebkitFilter: 'blur(5px)' }}
            >
              <p 
                className="text-base md:text-lg text-transparent leading-relaxed select-none"
                dir="rtl"
                style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}
              >
                {sentence.arabic}
              </p>
            </div>
            
            {/* Overlay with Help Icon */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/40 group"
              onClick={handleRevealTranslation}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-purple-500/90 rounded-full shadow-lg group-hover:bg-purple-600/90 transition-colors">
                  <Lightbulb className="w-5 h-5 text-white" />
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
