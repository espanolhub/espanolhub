'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceSearchProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  className?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ 
  onTranscript, 
  placeholder = "Haz clic para hablar...",
  className = ""
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      // Initialize speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure for Spanish (Spain)
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      // Get available voices and select the best Spanish voice
      recognition.onstart = () => {
        const voices = recognition.getVoices();
        const spanishVoices = voices.filter((voice: any) => 
          voice.lang.startsWith('es-ES') || 
          voice.lang.startsWith('es-') || 
          voice.name.toLowerCase().includes('español') ||
          voice.name.toLowerCase().includes('spanish')
        );
        
        // Sort by preference: Google > Microsoft > others
        const sortedVoices = spanishVoices.sort((a: any, b: any) => {
          const aScore = a.name.toLowerCase().includes('google') ? 3 : 
                         a.name.toLowerCase().includes('microsoft') ? 2 : 1;
          const bScore = b.name.toLowerCase().includes('google') ? 3 : 
                         b.name.toLowerCase().includes('microsoft') ? 2 : 1;
          return bScore - aScore;
        });
        
        if (sortedVoices.length > 0) {
          recognition.voice = sortedVoices[0];
        }
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        onTranscript(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) return;
    
    // Stop any existing recognition
    if (isListening) {
      recognitionRef.current.stop();
    }
    
    // Clear previous transcript
    setTranscript('');
    
    // Start new recognition
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const clearTranscript = () => {
    setTranscript('');
    onTranscript('');
  };

  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-500 ${className}`}>
        <MicOff className="w-5 h-5" />
        <span className="text-sm">Búsqueda por voz no disponible</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 bg-white rounded-xl shadow-md border border-gray-200 p-4 ${className}`}>
      {/* Status Indicator */}
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
        isListening 
          ? 'bg-red-500 animate-pulse' 
          : 'bg-gray-100'
      }`}>
        {isListening ? (
          <MicOff className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-gray-600" />
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-700">
            {isListening ? 'Escuchando...' : placeholder}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              title={isMuted ? 'Activar audio' : 'Silenciar audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            {transcript && (
              <button
                onClick={clearTranscript}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="Limpiar texto"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        {/* Transcript Display */}
        <div className="bg-gray-50 rounded-lg p-3 min-h-[60px] max-h-[120px] overflow-y-auto">
          {transcript ? (
            <p className="text-gray-800 text-sm leading-relaxed">
              {transcript}
            </p>
          ) : (
            <p className="text-gray-400 text-sm italic">
              {placeholder}
            </p>
          )}
        </div>
      </div>
      
      {/* Control Buttons */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          isListening 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {isListening ? (
          <span className="flex items-center gap-2">
            <MicOff className="w-4 h-4" />
            Detener
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic className="w-4 h-4" />
            Hablar
          </span>
        )}
      </button>
    </div>
  );
};

export default VoiceSearch;
