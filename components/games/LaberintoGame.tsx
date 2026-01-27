'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Lightbulb, Clock, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import GameShell from '@/components/games/ui/GameShell';
import GameButton from '@/components/games/ui/GameButton';

type Scenario = {
  id: string;
  situation: string;
  options: string[];
  correct: number;
  hint: string;
  explanation: string;
};

type Level = {
  levelId: string;
  name: string;
  description: string;
  timeLimit: number;
  scenarios: Scenario[];
};

type LaberintoData = {
  gameId: string;
  title: string;
  description: string;
  icon: string;
  levels: Level[];
};

interface LaberintoGameProps {
  data?: LaberintoData;
  onComplete?: (score: number, level: string) => void;
  onBack?: () => void;
}

export default function LaberintoGame({ data, onComplete, onBack }: LaberintoGameProps) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(true);

  const [loadedData, setLoadedData] = useState<LaberintoData | null>(data && data.levels && Array.isArray(data.levels) ? data : null);

  useEffect(() => {
    // Load data from API if data is not provided or doesn't have levels
    if (!data || !data.levels || !Array.isArray(data.levels)) {
      fetch('/api/games/laberinto')
        .then(res => res.json())
        .then((json: LaberintoData) => setLoadedData(json))
        .catch(err => console.error('Failed to load laberinto data:', err));
    }
  }, [data]);

  const gameData = loadedData;

  useEffect(() => {
    if (gameStarted && gameData?.levels[currentLevelIndex] && !levelCompleted) {
      const level = gameData.levels[currentLevelIndex];
      setTimeLeft(level.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setLevelCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameData, currentLevelIndex, levelCompleted]);

  const handleSelectLevel = (levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    setShowLevelSelect(false);
  };

  const handleStartLevel = () => {
    setGameStarted(true);
    setLevelCompleted(false);
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowHint(false);
  };

  const handleBackToLevelSelect = () => {
    setShowLevelSelect(true);
    setGameStarted(false);
    setLevelCompleted(false);
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowHint(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!gameData || selectedOption !== null) return;
    const level = gameData.levels[currentLevelIndex];
    if (!level) return;
    const scenario = level.scenarios[currentScenarioIndex];
    if (!scenario) return;
    
    setSelectedOption(optionIndex);
    
    if (optionIndex === scenario.correct) {
      setScore((prev) => prev + 10);
    } else {
      setShowHint(true);
    }
  };

  const handleNext = () => {
    if (!gameData) return;
    const level = gameData.levels[currentLevelIndex];
    if (!level) return;
    
    if (currentScenarioIndex < level.scenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowHint(false);
    } else {
      // Level completed
      setLevelCompleted(true);
      if (onComplete) {
        onComplete(score, level.levelId);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameData || !gameData.levels || !Array.isArray(gameData.levels) || gameData.levels.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Cargando el juego...</p>
      </div>
    );
  }

  // Level selection screen
  if (showLevelSelect) {
    return (
      <GameShell className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="text-6xl mb-2">🗝️</div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg">
              🧩
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{gameData.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{gameData.description}</p>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {gameData.levels && Array.isArray(gameData.levels) && gameData.levels.map((level, index) => (
            <div
              key={level.levelId}
              onClick={() => handleSelectLevel(index)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{level.name}</h2>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(level.timeLimit)}</span>
                    </div>
                    <div>
                      <span>{level.scenarios.length} escenarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {onBack && (
          <GameButton onClick={onBack} variant="ghost" className="justify-start px-0">
            <ArrowLeft className="w-4 h-4" />
            Volver a los juegos
          </GameButton>
        )}
      </GameShell>
    );
  }

  const currentLevel = gameData.levels[currentLevelIndex];
  if (!currentLevel) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Error: Nivel no encontrado.</p>
      </div>
    );
  }

  const totalScenarios = currentLevel.scenarios.length;
  const currentScenario = currentLevel.scenarios[currentScenarioIndex];
  const progress = totalScenarios > 0 ? ((currentScenarioIndex + 1) / totalScenarios) * 100 : 0;

  // Level start screen (before game starts)
  if (!gameStarted) {
    return (
      <GameShell className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="text-6xl mb-2">🗝️</div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg">
              🧩
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{gameData.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{gameData.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl">
                {currentLevelIndex + 1}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentLevel.name}</h2>
              <p className="text-gray-600 mb-4">{currentLevel.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(currentLevel.timeLimit)}</span>
                </div>
                <div>
                  <span>{totalScenarios} escenarios</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartLevel}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Comenzar Nivel
          </button>
        </div>

        {onBack && (
          <GameButton onClick={onBack} variant="ghost" className="justify-start px-0">
            <ArrowLeft className="w-4 h-4" />
            Volver a los juegos
          </GameButton>
        )}
      </GameShell>
    );
  }

  // Level completed screen
  if (levelCompleted) {
    const percentage = totalScenarios > 0 ? Math.round((score / (totalScenarios * 10)) * 100) : 0;
    return (
      <GameShell className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Nivel Completado!</h2>
          <div className="mb-6">
            <div className="text-5xl font-bold text-blue-600 mb-2">{score} puntos</div>
            <div className="text-gray-600">de {totalScenarios * 10} posibles</div>
          </div>
          <div className="mb-6">
            <div className="text-2xl font-semibold text-gray-700 mb-2">{percentage}% correcto</div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all ${
                  percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            {currentLevelIndex < (gameData.levels.length - 1) && (
              <GameButton
                onClick={() => {
                  setCurrentLevelIndex(currentLevelIndex + 1);
                  setShowLevelSelect(false);
                  setGameStarted(false);
                  setLevelCompleted(false);
                }}
              >
                Siguiente Nivel
              </GameButton>
            )}
            <GameButton onClick={handleStartLevel} variant="primary">
              Reintentar
            </GameButton>
            <GameButton onClick={handleBackToLevelSelect} variant="secondary">
              Ver Todos los Niveles
            </GameButton>
            {onBack && (
              <GameButton onClick={onBack} variant="secondary">
                Volver a Juegos
              </GameButton>
            )}
          </div>
        </div>
      </GameShell>
    );
  }

  // Game screen
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Logo and Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🗝️</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{currentLevel.name}</h3>
              <p className="text-sm text-gray-500">Escenario {currentScenarioIndex + 1} de {totalScenarios}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-600">{score}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentScenario?.situation}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentScenario?.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentScenario.correct;
            const showFeedback = selectedOption !== null;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showFeedback && isCorrect
                    ? 'border-green-500 bg-green-50'
                    : showFeedback && isSelected && !isCorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                } ${selectedOption !== null ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{option}</span>
                  {showFeedback && isCorrect && index === selectedOption && (
                    <span className="text-2xl">✓</span>
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <span className="text-2xl">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {showHint && selectedOption !== null && selectedOption !== currentScenario?.correct && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800 mb-1">💡 Pista:</p>
                <p className="text-yellow-700">{currentScenario?.hint}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {selectedOption !== null && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              {currentScenarioIndex < totalScenarios - 1 ? 'Siguiente' : 'Finalizar'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
