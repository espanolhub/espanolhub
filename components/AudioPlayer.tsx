'use client';

import { useState, memo, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  text: string;
  language?: string;
  rate?: number;
}

function AudioPlayer({ text, language = 'es', rate }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // التأكد من تحميل الأصوات
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // بعض المتصفحات تحتاج إلى هذا للتحميل
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : language;
      
      // Use provided rate or default to 0.8 for clearer pronunciation
      utterance.rate = typeof rate === 'number' ? rate : 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // اختيار voice إسبانية إسبانية احترافية (Castellano)
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
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <button
      onClick={isPlaying ? handleStop : handlePlay}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      aria-label={isPlaying ? 'Detener audio' : 'Reproducir audio'}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-5 h-5" />
          <span>Detener</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          <span>Escuchar</span>
        </>
      )}
    </button>
  );
}

export default memo(AudioPlayer);
