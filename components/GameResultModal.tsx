'use client';
import React from 'react';
import ViralShareButton from './ViralShareButton';
import { Trophy, Star, Medal } from 'lucide-react';

interface GameResultModalProps {
  open: boolean;
  score: number;
  max: number;
  onClose: () => void;
  gameName?: string;
  level?: number;
}

export default function GameResultModal({ 
  open, 
  score, 
  max, 
  onClose, 
  gameName, 
  level 
}: GameResultModalProps) {
  if (!open) return null;
  
  const percentage = (score / max) * 100;
  const isPerfect = score === max;
  const isGood = percentage >= 70;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl transform animate-in">
        {/* Icon based on performance */}
        <div className="mb-4">
          {isPerfect ? (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          ) : isGood ? (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg">
              <Star className="w-12 h-12 text-white" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shadow-lg">
              <Medal className="w-12 h-12 text-white" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {isPerfect ? '¡Perfecto! 🎉' : isGood ? '¡Buen trabajo! 👏' : '¡Sigue practicando! 💪'}
        </h3>
        
        {/* Score */}
        <div className="mb-6">
          <p className="text-lg text-gray-600 mb-2">Tu puntuación:</p>
          <div className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            {score}
          </div>
          <p className="text-gray-500">de {max} puntos posibles</p>
          
          {/* Percentage bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isPerfect ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                isGood ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{percentage.toFixed(0)}%</p>
        </div>

        {/* Motivational message */}
        {isPerfect && (
          <p className="text-gray-600 mb-6">
            ¡Increíble! Has demostrado un dominio completo. ¡Comparte tu logro con amigos!
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <ViralShareButton
            score={score}
            level={level}
            gameName={gameName}
            language="es"
            variant="button"
            className="w-full"
          />
          
          <button 
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all"
            onClick={onClose}
          >
            Volver a jugar
          </button>
        </div>
      </div>
    </div>
  );
}

