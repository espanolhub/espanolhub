'use client';

import React, { useEffect, useState } from 'react';
import DictionaryModal from './DictionaryModal';
import { getDictionaryByWord } from '@/lib/data/dictionary';

export default function GlobalDictionaryProvider() {
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState<any | null>(null);

  useEffect(() => {
    function handler(e: any) {
      try {
        const word = e?.detail?.word || e?.detail;
        if (!word) return;
        const found = getDictionaryByWord(word);
        setEntry(found || { word, translations: [], pronunciation: '', example: '' });
        setOpen(true);
      } catch (err) {
        console.error('GlobalDictionaryProvider handler error', err);
      }
    }

    window.addEventListener('showDictionary', handler as EventListener);
    return () => window.removeEventListener('showDictionary', handler as EventListener);
  }, []);

  return <DictionaryModal open={open} entry={entry} onClose={() => { setOpen(false); setEntry(null); }} />;
}

