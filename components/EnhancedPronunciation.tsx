'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Settings } from 'lucide-react';

interface EnhancedPronunciationProps {
  text: string;
  language?: string;
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
}

const EnhancedPronunciation: React.FC<EnhancedPronunciationProps> = ({
  text,
  language = 'es-ES',
  className = '',
  showControls = true,
  autoPlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if Speech Synthesis API is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        const spanishVoices = voices.filter(voice => 
          voice.lang.startsWith('es-ES') || 
          voice.lang.startsWith('es-') || 
          voice.name.toLowerCase().includes('español') ||
          voice.name.toLowerCase().includes('spanish') ||
          voice.name.toLowerCase().includes('helena') ||
          voice.name.toLowerCase().includes('google')
        );
        
        // Sort by preference: Google > Microsoft > Helena > others
        const sortedVoices = spanishVoices.sort((a: SpeechSynthesisVoice, b: SpeechSynthesisVoice) => {
          const aScore = a.name.toLowerCase().includes('google') ? 4 : 
                         a.name.toLowerCase().includes('microsoft') ? 3 :
                         a.name.toLowerCase().includes('helena') ? 2 : 1;
          const bScore = b.name.toLowerCase().includes('google') ? 4 : 
                         b.name.toLowerCase().includes('microsoft') ? 3 :
                         b.name.toLowerCase().includes('helena') ? 2 : 1;
          return bScore - aScore;
        });
        
        setAvailableVoices(sortedVoices);
        if (sortedVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(sortedVoices[0]);
        }
      };

      loadVoices();
      
      // Listen for voice changes
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, [selectedVoice]);

  const createUtterance = (): SpeechSynthesisUtterance => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      utterance.lang = language;
    }
    
    utterance.rate = speed;
    utterance.pitch = pitch;
    utterance.volume = isMuted ? 0 : volume;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };
    
    return utterance;
  };

  const speak = () => {
    if (!isSupported || !text) return;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    const utterance = createUtterance();
    utteranceRef.current = utterance;
    
    try {
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking text:', error);
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVoiceChange = (voiceName: string) => {
    const voice = availableVoices.find(v => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-500 ${className}`}>
        <VolumeX className="w-4 h-4" />
        <span className="text-sm">Pronunciación no disponible</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Pronunciation Button */}
      <button
        onClick={isPlaying ? stop : speak}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isPlaying 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
        title={isPlaying ? 'Detener pronunciación' : 'Escuchar pronunciación'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            <span className="text-sm">Detener</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">Escuchar</span>
          </>
        )}
      </button>

      {/* Settings Panel */}
      {showControls && (
        <>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="ml-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Configuración de voz"
          >
            <Settings className="w-4 h-4" />
          </button>

          {showSettings && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
              <h3 className="font-semibold text-gray-800 mb-4">Configuración de Voz</h3>
              
              {/* Voice Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voz seleccionada
                </label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => handleVoiceChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Speed Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Velocidad: {speed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Pitch Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tono: {pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Volume Control */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volumen: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isMuted 
                    ? 'bg-gray-300 text-gray-700' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    Silenciado
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    Activado
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Voice Quality Indicator */}
      {selectedVoice && (
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" 
             title={`Voz: ${selectedVoice.name}`} />
      )}
    </div>
  );
};

export default EnhancedPronunciation;
