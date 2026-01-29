'use client';

import { useState, useEffect, useRef } from 'react';
import { Trophy, RotateCcw, Volume2, Mic, MicOff, CheckCircle, XCircle, Headphones } from 'lucide-react';
import GameButton from './ui/GameButton';
import type { GameQuestion } from '@/lib/types';

interface PronunciationGameProps {
  onBack: () => void;
  questions: GameQuestion[];
  title: string;
}

export default function PronunciationGame({ onBack, questions, title }: PronunciationGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setRecognitionResult(transcript);
        setIsRecording(false);
        setHasRecorded(true);
        checkPronunciation(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        // Handle different error types with user-friendly messages
        switch (event.error) {
          case 'not-allowed':
            setRecognitionResult('Permiso de micrófono denegado. Por favor, permite el acceso al micrófono en tu navegador.');
            // Show browser-specific instructions
            if (navigator.userAgent.includes('Chrome')) {
              setRecognitionResult(prev => prev + ' Haz clic en el ícono del micrófono en la barra de direcciones.');
            } else if (navigator.userAgent.includes('Firefox')) {
              setRecognitionResult(prev => prev + ' Ve a Preferencias > Privacidad y Seguridad > Permisos.');
            } else if (navigator.userAgent.includes('Safari')) {
              setRecognitionResult(prev => prev + ' Ve a Preferencias > Sitios web > Micrófono.');
            }
            break;
          case 'no-speech':
            setRecognitionResult('No se detectó voz. Por favor, habla claramente y cerca del micrófono.');
            break;
          case 'network':
            setRecognitionResult('Error de red. Por favor, verifica tu conexión a internet.');
            break;
          case 'service-not-allowed':
            setRecognitionResult('El reconocimiento de voz no está disponible en este navegador. Por favor, usa Chrome o Edge.');
            break;
          case 'audio-capture':
            setRecognitionResult('No se puede acceder al micrófono. Por favor, verifica los permisos del dispositivo.');
            break;
          default:
            setRecognitionResult(`Error de reconocimiento de voz: ${event.error}. Por favor, intenta recargar la página.`);
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentQuestion]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setRecognitionResult('');
      setHasRecorded(false);
      setShowResult(false);
      setIsRecording(true);
      
      // Check if we have microphone access first
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          // Stop the stream immediately (we just needed to check permission)
          stream.getTracks().forEach(track => track.stop());
          
          // Now start speech recognition
          recognitionRef.current.start();
        })
        .catch((error) => {
          console.error('Microphone access error:', error);
          setIsRecording(false);
          
          // Handle specific permission errors
          if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            setRecognitionResult('Permiso de micrófono denegado. Por favor, permite el acceso al micrófono en tu navegador.');
            // Add browser-specific instructions
            if (navigator.userAgent.includes('Chrome')) {
              setRecognitionResult(prev => prev + ' Haz clic en el ícono del micrófono en la barra de direcciones y permite el acceso.');
            } else if (navigator.userAgent.includes('Firefox')) {
              setRecognitionResult(prev => prev + ' Ve a Preferencias > Privacidad y Seguridad > Permisos > Micrófono.');
            } else if (navigator.userAgent.includes('Safari')) {
              setRecognitionResult(prev => prev + ' Ve a Preferencias > Sitios web > Micrófono.');
            }
          } else if (error.name === 'NotFoundError') {
            setRecognitionResult('No se encontró ningún micrófono. Por favor, conecta un micrófono y vuelve a intentarlo.');
          } else if (error.name === 'NotReadableError') {
            setRecognitionResult('El micrófono está siendo usado por otra aplicación. Por favor, cierra otras aplicaciones que usen el micrófono.');
          } else {
            setRecognitionResult('Error al acceder al micrófono. Por favor, verifica los permisos del dispositivo.');
          }
        });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const checkPronunciation = (transcript: string) => {
    const correctAnswer = String(currentQuestion.correctAnswer).toLowerCase().trim();
    const isCorrect = transcript.includes(correctAnswer) || correctAnswer.includes(transcript);
    
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prevScore => prevScore + currentQuestion.points);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRecognitionResult('');
      setHasRecorded(false);
      setShowResult(false);
      setIsRecording(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setRecognitionResult('');
    setHasRecorded(false);
    setShowResult(false);
    setGameFinished(false);
    setIsRecording(false);
  };

  const playExample = () => {
    setIsListening(true);
    speakText(String(currentQuestion.correctAnswer));
    setTimeout(() => setIsListening(false), 3000);
  };

  if (gameFinished) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎤</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Práctica Completada!</h2>
        <div className="text-2xl font-semibold text-blue-600 mb-6">
          Puntuación: {score} / {questions.reduce((sum, q) => sum + q.points, 0)}
        </div>
        <div className="text-lg text-gray-600 mb-6">
          Has practicado la pronunciación de {questions.length} palabras
        </div>
        <div className="flex gap-4 justify-center">
          <GameButton onClick={handleReset} variant="secondary">
            <RotateCcw className="w-5 h-5 mr-2" />
            Practicar de Nuevo
          </GameButton>
          <GameButton onClick={onBack}>
            Volver a Juegos
          </GameButton>
        </div>
      </div>
    );
  }

  if (!speechSupported) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎤</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pronunciation Practice</h2>
        <p className="text-gray-600 mb-6">
          El reconocimiento de voz no está disponible en este navegador.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Por favor, usa un navegador moderno como Chrome, Edge, o Firefox.
        </p>
        <GameButton onClick={onBack}>Volver</GameButton>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎤</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pronunciation Practice</h2>
        <p className="text-gray-600 mb-6">No hay preguntas disponibles</p>
        <GameButton onClick={onBack}>Volver</GameButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Palabra </span>
            <span className="font-bold text-gray-800">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="bg-pink-100 rounded-lg px-4 py-2">
            <Trophy className="w-5 h-5 inline mr-2 text-gray-700" />
            <span className="font-bold text-gray-900">{score} puntos</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>
          
          {/* Listen First */}
          <div className="mb-6">
            <p className="text-gray-600 mb-4">Primero, escucha cómo se pronuncia:</p>
            <button
              onClick={playExample}
              disabled={isListening}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${
                isListening 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <Headphones className={`w-6 h-6 ${isListening ? 'animate-pulse' : ''}`} />
              {isListening ? 'Reproduciendo...' : 'Escuchar Ejemplo'}
            </button>
          </div>

          {/* Recording Section */}
          <div className="mb-6">
            <p className="text-gray-600 mb-4">Ahora, graba tu pronunciación:</p>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!speechSupported}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-lg transition-all ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  : 'bg-green-500 text-white hover:bg-green-600'
              } ${!speechSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-6 h-6" />
                  Detener Grabación
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  Comenzar Grabación
                </>
              )}
            </button>
          </div>

          {/* Recognition Result */}
          {recognitionResult && (
            <div className={`mb-6 p-4 rounded-lg ${
              showResult && recognitionResult.toLowerCase().includes(String(currentQuestion.correctAnswer).toLowerCase())
                ? 'bg-green-50 border-2 border-green-500'
                : showResult
                ? 'bg-red-50 border-2 border-red-500'
                : 'bg-blue-50 border-2 border-blue-200'
            }`}>
              <p className="font-semibold mb-2">
                {showResult ? 'Tu pronunciación:' : 'Detectado:'}
              </p>
              <p className="text-lg">"{recognitionResult}"</p>
              {showResult && (
                <div className="mt-3 flex items-center gap-2">
                  {recognitionResult.toLowerCase().includes(String(currentQuestion.correctAnswer).toLowerCase()) ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-medium">¡Buena pronunciación!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 font-medium">
                        Intenta de nuevo. La palabra correcta es: "{currentQuestion.correctAnswer}"
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
            <p><strong>Instrucciones:</strong></p>
            <ul className="text-left mt-2 space-y-1">
              <li>• Escucha el ejemplo primero haciendo clic en "Escuchar Ejemplo"</li>
              <li>• Haz clic en "Comenzar Grabación" y pronuncia la palabra claramente</li>
              <li>• Detén la grabación cuando termines</li>
              <li>• El sistema evaluará tu pronunciación automáticamente</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {showResult && (
        <div className="text-center">
          <GameButton onClick={handleNext} size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente Palabra' : 'Ver Resultados'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
