'use client';

import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Eye, Volume2 } from 'lucide-react';
import GameButton from './ui/GameButton';
import type { GameQuestion } from '@/lib/types';

interface Card {
  id: string;
  content: string;
  type: 'spanish' | 'translation';
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryCardGameProps {
  onBack: () => void;
  questions: GameQuestion[];
  title: string;
}

export default function MemoryCardGame({ onBack, questions, title }: MemoryCardGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  const [previewTime, setPreviewTime] = useState(5);

  useEffect(() => {
    initializeGame();
  }, [questions]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const timer = setTimeout(() => {
        checkMatch();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedCards]);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    
    questions.forEach((question, index) => {
      const pairId = `pair-${index}`;
      
      if (question.type === 'multiple-choice' && question.options) {
        // Create pairs for vocabulary matching
        gameCards.push({
          id: `spanish-${index}`,
          content: question.question,
          type: 'spanish',
          pairId,
          isFlipped: false,
          isMatched: false
        });
        
        gameCards.push({
          id: `translation-${index}`,
          content: String(question.correctAnswer),
          type: 'translation',
          pairId,
          isFlipped: false,
          isMatched: false
        });
      } else if (question.type === 'match') {
        // For match type questions
        gameCards.push({
          id: `spanish-${index}`,
          content: question.question,
          type: 'spanish',
          pairId,
          isFlipped: false,
          isMatched: false
        });
        
        gameCards.push({
          id: `translation-${index}`,
          content: String(question.correctAnswer),
          type: 'translation',
          pairId,
          isFlipped: false,
          isMatched: false
        });
      }
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    
    // Show preview for a few seconds
    setShowAllCards(true);
    setTimeout(() => {
      setShowAllCards(false);
    }, previewTime * 1000);
  };

  const handleCardClick = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    
    if (!card || card.isFlipped || card.isMatched || selectedCards.length >= 2) {
      return;
    }

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);
  };

  const checkMatch = () => {
    const [first, second] = selectedCards;
    const firstCard = cards.find(c => c.id === first);
    const secondCard = cards.find(c => c.id === second);

    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      // Match found
      const newCards = cards.map(c => 
        c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
      );
      setCards(newCards);
      setMatches(prev => prev + 1);
      
      // Check if game is finished
      if (matches + 1 === questions.length) {
        setGameFinished(true);
      }
    } else {
      // No match, flip cards back
      const newCards = cards.map(c => 
        c.id === first || c.id === second ? { ...c, isFlipped: false } : c
      );
      setCards(newCards);
    }

    setSelectedCards([]);
    setMoves(prev => prev + 1);
  };

  const handleReset = () => {
    setMoves(0);
    setMatches(0);
    setSelectedCards([]);
    setGameFinished(false);
    setShowAllCards(false);
    initializeGame();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const calculateScore = () => {
    const maxScore = questions.length * 20;
    const penalty = Math.max(0, moves - questions.length) * 2;
    return Math.max(0, maxScore - penalty);
  };

  if (gameFinished) {
    const score = calculateScore();
    const efficiency = Math.round((questions.length / moves) * 100);
    
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Memoria Completa!</h2>
        <div className="space-y-3 mb-6">
          <div className="text-2xl font-semibold text-blue-600">
            Puntuación: {score}
          </div>
          <div className="text-lg text-gray-600">
            Movimientos: {moves}
          </div>
          <div className="text-lg text-gray-600">
            Eficiencia: {efficiency}%
          </div>
          <div className="text-lg text-green-600">
            Parejas encontradas: {matches}/{questions.length}
          </div>
          {efficiency >= 80 && (
            <div className="text-lg font-bold text-green-600">¡Excelente memoria!</div>
          )}
          {efficiency >= 60 && efficiency < 80 && (
            <div className="text-lg font-bold text-blue-600">¡Buen trabajo!</div>
          )}
          {efficiency < 60 && (
            <div className="text-lg font-bold text-orange-600">Sigue practicando</div>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <GameButton onClick={handleReset} variant="secondary">
            <RotateCcw className="w-5 h-5 mr-2" />
            Jugar de Nuevo
          </GameButton>
          <GameButton onClick={onBack}>
            Volver a Juegos
          </GameButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Game Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Parejas </span>
            <span className="font-bold text-gray-800">
              {matches}/{questions.length}
            </span>
          </div>
          <div className="bg-blue-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Movimientos </span>
            <span className="font-bold text-blue-800">
              {moves}
            </span>
          </div>
          <div className="bg-pink-100 rounded-lg px-4 py-2">
            <Trophy className="w-5 h-5 inline mr-2 text-gray-700" />
            <span className="font-bold text-gray-900">{calculateScore()} puntos</span>
          </div>
        </div>
        
        {/* Preview Timer */}
        {showAllCards && (
          <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Eye className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">
                Memoriza las cartas: {previewTime} segundos
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => !showAllCards && handleCardClick(card.id)}
              disabled={showAllCards || card.isFlipped || card.isMatched}
              className={`aspect-square rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                card.isMatched
                  ? 'border-green-500 bg-green-50'
                  : card.isFlipped || showAllCards
                  ? card.type === 'spanish'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              } ${!showAllCards && !card.isFlipped && !card.isMatched ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="p-2 h-full flex flex-col items-center justify-center">
                {(card.isFlipped || showAllCards || card.isMatched) ? (
                  <>
                    <div className={`text-xs font-medium mb-1 ${
                      card.type === 'spanish' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {card.type === 'spanish' ? 'ES' : 'TR'}
                    </div>
                    <div className="text-sm font-medium text-center text-gray-800">
                      {card.content}
                    </div>
                    {card.type === 'spanish' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(card.content);
                        }}
                        className="mt-1 text-blue-500 hover:text-blue-700"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-2xl text-gray-400">?</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
          <p><strong>Instrucciones:</strong></p>
          <ul className="text-left mt-2 space-y-1">
            <li>• Memoriza las parejas durante el tiempo de vista previa</li>
            <li>• Haz clic en las cartas para voltearlas</li>
            <li>• Encuentra las parejas de español y traducción</li>
            <li>• Usa menos movimientos para obtener mayor puntuación</li>
          </ul>
        </div>
      </div>

      {/* Controls */}
      <div className="text-center">
        <GameButton onClick={handleReset} variant="secondary">
          <RotateCcw className="w-5 h-5 mr-2" />
          Reiniciar Juego
        </GameButton>
      </div>
    </div>
  );
}
