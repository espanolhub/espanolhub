'use client';

import React, { useState, useRef } from 'react';
import HintModal from './HintModal';
import { useImmersion } from './LanguageImmersionProvider';

interface DifficultWord {
  word: string;
  translation: string;
  explanation?: string;
}

interface ClickableTextProps {
  text: string;
  difficultWords?: DifficultWord[];
}

export default function ClickableText({ text, difficultWords = [] }: ClickableTextProps) {
  const [selectedWord, setSelectedWord] = useState<DifficultWord | null>(null);
  const { level, soloSpanish, reportMistake } = (() => {
    try { return useImmersion(); } catch { return { level: 'beginner', soloSpanish: false, reportMistake: (_:string)=>0 }; }
  })();
  const longPressRef = useRef<number | null>(null);

  if (!difficultWords || difficultWords.length === 0) {
    return <span>{text}</span>;
  }

  // Create a map for quick lookup
  const wordMap = new Map<string, DifficultWord>();
  difficultWords.forEach(dw => {
    wordMap.set(dw.word.toLowerCase(), dw);
  });

  // Split text into words and punctuation
  const words = text.split(/(\s+|[.,;:!?()[\]{}'"])/);
  
  const renderedWords = words.map((word, index) => {
    // Remove punctuation for comparison
    const cleanWord = word.replace(/[.,;:!?()[\]{}'"]/g, '').toLowerCase();
    const wordInfo = wordMap.get(cleanWord);

    if (wordInfo && cleanWord.length > 0) {
      return (
        <span key={index}>
          <button
            onMouseDown={() => {
              // start long-press timer (700ms)
              longPressRef.current = window.setTimeout(() => {
                // show Spanish simplified definition if available
                try {
                  const entry = (window as any).__getDictionaryEntry?.(wordInfo.word);
                  if (entry && entry.content) {
                    // show definition in Spanish inside hint modal
                    setSelectedWord({ ...wordInfo, explanation: entry.summary || entry.excerpt || '' });
                    return;
                  }
                } catch (e) {}
                setSelectedWord(wordInfo);
              }, 700);
            }}
            onMouseUp={() => {
              if (longPressRef.current) {
                clearTimeout(longPressRef.current);
                longPressRef.current = null;
                // treat as click => open dictionary or hint
                try {
                  const entry = (window as any).__getDictionaryEntry?.(wordInfo.word);
                  if (entry && entry.summary) {
                    setSelectedWord({ ...wordInfo, explanation: entry.summary });
                    return;
                  }
                } catch (e) {}
                setSelectedWord(wordInfo);
              }
            }}
            className="underline decoration-dotted decoration-purple-400 hover:decoration-solid hover:bg-purple-50 hover:decoration-purple-600 transition-all cursor-help px-1 rounded"
            title={`${wordInfo.translation}${wordInfo.explanation ? ' - ' + wordInfo.explanation : ''}`}
          >
            {word}
          </button>
        </span>
      );
    }

    return <span key={index}>{word}</span>;
  });

  return (
    <>
      <span>{renderedWords}</span>
      {selectedWord && (
        <HintModal
          open={!!selectedWord}
          onClose={() => setSelectedWord(null)}
          title={selectedWord.word}
        >
          <div className="space-y-2">
            {selectedWord.explanation && (
              <div className="pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-700">Significado: </span>
                <span>{selectedWord.explanation}</span>
              </div>
            )}
          </div>
        </HintModal>
      )}
    </>
  );
}
