'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Clock, ArrowRight, CheckCircle, XCircle, Play, RotateCcw } from 'lucide-react';
import GameShell from '@/components/games/ui/GameShell';
import GameButton from '@/components/games/ui/GameButton';

type StageType = 'memory' | 'word-race' | 'quiz';

interface Stage {
  id: StageType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface MultiStageGameProps {
  onComplete?: (totalScore: number) => void;
  onBack?: () => void;
}

const stages: Stage[] = [
  {
    id: 'memory',
    name: 'Fase 1: Memoria',
    description: 'Encuentra las parejas de palabras',
    icon: '🧠',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'word-race',
    name: 'Fase 2: Carrera de Palabras',
    description: 'Traduce lo más rápido posible',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 'quiz',
    name: 'Fase 3: Quiz de Verbos',
    description: 'Responde preguntas de opción múltiple',
    icon: '✅',
    color: 'from-green-500 to-emerald-500',
  },
];

// Memory game questions (from lib/data/games.ts)
const memoryQuestions = [
  { id: '1', question: 'Empareja: rojo', type: 'match' as const, correctAnswer: ['rojo'], points: 10 },
  { id: '2', question: 'Empareja: casa', type: 'match' as const, correctAnswer: ['casa'], points: 10 },
  { id: '3', question: 'Empareja: perro', type: 'match' as const, correctAnswer: ['perro'], points: 10 },
  { id: '4', question: 'Empareja: agua', type: 'match' as const, correctAnswer: ['agua'], points: 10 },
  { id: '5', question: 'Empareja: azul', type: 'match' as const, correctAnswer: ['azul'], points: 10 },
];

// Quiz questions (from lib/data/games.ts)
const quizQuestions = [
  {
    id: '1',
    question: '¿Cómo se dice "casa" en español?',
    type: 'multiple-choice' as const,
    options: ['casa', 'caso', 'casas', 'caso'],
    correctAnswer: 'casa',
    points: 10,
  },
  {
    id: '2',
    question: '¿Cuál es el número "cinco"?',
    type: 'multiple-choice' as const,
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    points: 10,
  },
  {
    id: '3',
    question: '¿Qué letra viene después de "A"?',
    type: 'multiple-choice' as const,
    options: ['B', 'C', 'D', 'E'],
    correctAnswer: 'B',
    points: 10,
  },
  {
    id: '4',
    question: '¿Cómo se dice "perro" en español?',
    type: 'multiple-choice' as const,
    options: ['perro', 'perra', 'perros', 'perras'],
    correctAnswer: 'perro',
    points: 10,
  },
  {
    id: '5',
    question: '¿Cuál es el número "diez"?',
    type: 'multiple-choice' as const,
    options: ['8', '9', '10', '11'],
    correctAnswer: '10',
    points: 10,
  },
];

export default function MultiStageGame({ onComplete, onBack }: MultiStageGameProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stageScores, setStageScores] = useState<Record<StageType, number>>({
    memory: 0,
    'word-race': 0,
    quiz: 0,
  });
  const [stageCompleted, setStageCompleted] = useState<Record<StageType, boolean>>({
    memory: false,
    'word-race': false,
    quiz: false,
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Memory game state
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [memoryAnswer, setMemoryAnswer] = useState('');
  const [memoryShowResult, setMemoryShowResult] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<string | null>(null);
  const [quizShowResult, setQuizShowResult] = useState(false);

  // Word Race state
  const [wordRaceWords] = useState(['casa', 'perro', 'gato', 'agua', 'sol']);
  const [wordRaceIndex, setWordRaceIndex] = useState(0);
  const [wordRaceAnswer, setWordRaceAnswer] = useState('');
  const [wordRaceShowResult, setWordRaceShowResult] = useState(false);
  const [wordRaceScore, setWordRaceScore] = useState(0);

  const currentStage = stages[currentStageIndex];
  const totalScore = Object.values(stageScores).reduce((sum, score) => sum + score, 0);

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentStageIndex(0);
    setStageScores({ memory: 0, 'word-race': 0, quiz: 0 });
    setStageCompleted({ memory: false, 'word-race': false, quiz: false });
    setGameCompleted(false);
  };

  const handleMemoryAnswer = () => {
    const question = memoryQuestions[memoryIndex];
    const isCorrect = memoryAnswer.toLowerCase().trim() === question.correctAnswer[0].toLowerCase().trim();
    setMemoryShowResult(true);
    
    if (isCorrect) {
      setStageScores(prev => ({ ...prev, memory: prev.memory + question.points }));
    }
  };

  const handleMemoryNext = () => {
    if (memoryIndex < memoryQuestions.length - 1) {
      setMemoryIndex(prev => prev + 1);
      setMemoryAnswer('');
      setMemoryShowResult(false);
    } else {
      // Memory stage completed
      setStageCompleted(prev => ({ ...prev, memory: true }));
      handleNextStage();
    }
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizSelectedAnswer(answer);
    setQuizShowResult(true);
    
    const question = quizQuestions[quizIndex];
    if (answer === question.correctAnswer) {
      setStageScores(prev => ({ ...prev, quiz: prev.quiz + question.points }));
    }
  };

  const handleQuizNext = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizSelectedAnswer(null);
      setQuizShowResult(false);
    } else {
      // Quiz stage completed
      setStageCompleted(prev => ({ ...prev, quiz: true }));
      handleNextStage();
    }
  };

  const handleWordRaceComplete = (score: number) => {
    setStageScores(prev => ({ ...prev, 'word-race': score }));
    setStageCompleted(prev => ({ ...prev, 'word-race': true }));
    handleNextStage();
  };

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setMemoryIndex(0);
      setQuizIndex(0);
      setWordRaceIndex(0);
      setMemoryAnswer('');
      setQuizSelectedAnswer(null);
      setWordRaceAnswer('');
      setMemoryShowResult(false);
      setQuizShowResult(false);
      setWordRaceShowResult(false);
    } else {
      // All stages completed
      setGameCompleted(true);
      if (onComplete) {
        onComplete(totalScore);
      }
    }
  };

  // Start screen
  if (!gameStarted) {
    return (
      <GameShell className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎮 Desafío Multifase</h1>
          <p className="text-xl text-gray-600">Completa tres etapas diferentes para ganar el máximo de puntos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`bg-gradient-to-br ${stage.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <div className="text-5xl mb-4">{stage.icon}</div>
              <h3 className="text-xl font-bold mb-2">{stage.name}</h3>
              <p className="text-white/90 text-sm">{stage.description}</p>
              <div className="mt-4 text-sm font-semibold">Fase {index + 1}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <GameButton
            onClick={handleStartGame}
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 shadow-lg"
          >
            <Play className="w-5 h-5 inline mr-2" />
            Comenzar Desafío
          </GameButton>
        </div>
      </GameShell>
    );
  }

  // Game completed screen
  if (gameCompleted) {
    const percentage = (totalScore / 150) * 100;
    return (
      <GameShell className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Desafío Completado!</h2>
          
          <div className="mb-6">
            <div className="text-5xl font-bold text-purple-600 mb-2">{totalScore} puntos</div>
            <div className="text-gray-600">de 150 posibles</div>
          </div>

          <div className="mb-6">
            <div className="text-2xl font-semibold text-gray-700 mb-2">{Math.round(percentage)}% correcto</div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {stages.map((stage) => (
              <div key={stage.id} className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl mb-2">{stage.icon}</div>
                <div className="font-bold text-gray-800">{stageScores[stage.id]}</div>
                <div className="text-sm text-gray-500">puntos</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <GameButton onClick={handleStartGame} variant="primary">
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Reintentar
            </GameButton>
            {onBack && (
              <GameButton onClick={onBack} variant="secondary">
                Volver
              </GameButton>
            )}
          </div>
        </div>
      </GameShell>
    );
  }

  // Stage progress header
  const completedStages = Object.values(stageCompleted).filter(Boolean).length;
  
  // Render current stage
  if (currentStage.id === 'memory') {
    const question = memoryQuestions[memoryIndex];
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentStage.name}</h2>
              <p className="text-gray-600">{currentStage.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{stageScores.memory}</div>
              <div className="text-sm text-gray-500">puntos</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${((memoryIndex + 1) / memoryQuestions.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Pregunta {memoryIndex + 1} de {memoryQuestions.length} • Fase {completedStages + 1} de {stages.length}
          </div>
        </div>

        {/* Memory Game */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              value={memoryAnswer}
              onChange={(e) => !memoryShowResult && setMemoryAnswer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && memoryAnswer && !memoryShowResult) {
                  handleMemoryAnswer();
                }
              }}
              disabled={memoryShowResult}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              placeholder="Escribe la traducción..."
            />

            {memoryShowResult && (
              <div className={`p-4 rounded-lg ${
                memoryAnswer.toLowerCase().trim() === question.correctAnswer[0].toLowerCase().trim()
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              }`}>
                <p className="font-semibold">
                  {memoryAnswer.toLowerCase().trim() === question.correctAnswer[0].toLowerCase().trim()
                    ? '✓ Correcto!'
                    : '✗ Incorrecto'}
                </p>
                <p className="text-gray-700 mt-2">
                  La respuesta correcta es: <strong>{question.correctAnswer[0]}</strong>
                </p>
              </div>
            )}

            {memoryShowResult && (
              <button
                onClick={handleMemoryNext}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                {memoryIndex < memoryQuestions.length - 1 ? 'Siguiente' : 'Finalizar Fase'}
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const handleWordRaceAnswer = () => {
    // Simple validation - in real implementation, this would use dictionary
    setWordRaceShowResult(true);
    // For demo, accept any answer (in real game, check against dictionary)
    const newScore = stageScores['word-race'] + 10;
    setWordRaceScore(newScore);
    setStageScores(prev => ({ ...prev, 'word-race': newScore }));
  };

  const handleWordRaceNext = () => {
    if (wordRaceIndex < wordRaceWords.length - 1) {
      setWordRaceIndex(prev => prev + 1);
      setWordRaceAnswer('');
      setWordRaceShowResult(false);
    } else {
      handleWordRaceComplete(wordRaceScore);
    }
  };

  if (currentStage.id === 'word-race') {
    const currentWord = wordRaceWords[wordRaceIndex];

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentStage.name}</h2>
              <p className="text-gray-600">{currentStage.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">{stageScores['word-race']}</div>
              <div className="text-sm text-gray-500">puntos</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-500 to-amber-500 h-3 rounded-full transition-all"
              style={{ width: `${((wordRaceIndex + 1) / wordRaceWords.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Palabra {wordRaceIndex + 1} de {wordRaceWords.length} • Fase {completedStages + 1} de {stages.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-yellow-600 mb-4">{currentWord}</div>
            <p className="text-gray-600">Traduce esta palabra al español</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={wordRaceAnswer}
              onChange={(e) => !wordRaceShowResult && setWordRaceAnswer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && wordRaceAnswer && !wordRaceShowResult) {
                  handleWordRaceAnswer();
                }
              }}
              disabled={wordRaceShowResult}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none"
              placeholder="Escribe la traducción..."
            />

            {wordRaceShowResult && (
              <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-500">
                <p className="font-semibold text-yellow-800">✓ ¡Bien hecho! +10 puntos</p>
              </div>
            )}

            {wordRaceShowResult && (
              <button
                onClick={handleWordRaceNext}
                className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-amber-700 transition-all"
              >
                {wordRaceIndex < wordRaceWords.length - 1 ? 'Siguiente' : 'Finalizar Fase'}
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStage.id === 'quiz') {
    const question = quizQuestions[quizIndex];
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentStage.name}</h2>
              <p className="text-gray-600">{currentStage.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{stageScores.quiz}</div>
              <div className="text-sm text-gray-500">puntos</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
              style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Pregunta {quizIndex + 1} de {quizQuestions.length} • Fase {completedStages + 1} de {stages.length}
          </div>
        </div>

        {/* Quiz Game */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = quizSelectedAnswer === option;
              const isCorrect = option === question.correctAnswer;
              const showCorrect = quizShowResult && isCorrect;
              const showIncorrect = quizShowResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !quizShowResult && handleQuizAnswer(option)}
                  disabled={quizShowResult}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {showIncorrect && <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {quizShowResult && (
            <button
              onClick={handleQuizNext}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              {quizIndex < quizQuestions.length - 1 ? 'Siguiente' : 'Finalizar Desafío'}
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
