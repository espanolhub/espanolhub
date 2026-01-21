'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const componentMap: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  'word-race': () => import('@/components/games/WordRaceGame'),
  'exam-simulator': () => import('@/components/ExamSimulator'),
  'laberinto': () => import('@/components/games/LaberintoGame'),
  'multi-stage': () => import('@/components/games/MultiStageGame'),
};

export default function GameRenderer({ entry }: { entry: any }) {
  if (!entry) return null;
  let gameType = null;
  let gameData = null;
  try {
    const parsed = JSON.parse(entry.content || '{}');
    gameType = parsed.gameType;
    gameData = parsed.data || parsed;
    var gameConfig = parsed.config || {};
  } catch (e) {
    // not JSON - fallback
  }

  if (!gameType) {
    return <div className="p-4 bg-yellow-50 border rounded">No gameType found in content.</div>;
  }

  const Loader = dynamic(
    componentMap[gameType] || (() => Promise.resolve({ default: () => () => <div>Game not found</div> })),
    { ssr: false }
  );

  return (
    <div className="mt-4">
      {/* pass config/data as props to the loaded game component, include gameId */}
      {/* @ts-ignore */}
      <Loader {...(gameConfig || {})} data={gameData} gameId={entry.id} />
    </div>
  );
}

