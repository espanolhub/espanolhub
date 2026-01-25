'use client';

import dynamic from 'next/dynamic';

const MarkdownRenderer = dynamic(() => import('./MarkdownRenderer'), { 
  ssr: false,
  loading: () => <div className="animate-pulse">Cargando contenido...</div>
});

export default function MarkdownRendererClient({ children }: { children: string }) {
  return <MarkdownRenderer>{children}</MarkdownRenderer>;
}
