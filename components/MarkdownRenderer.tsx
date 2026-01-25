'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import type { Components } from 'react-markdown';

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => <p className="text-gray-700">Cargando contenido...</p>,
});

interface MarkdownRendererProps {
  children: string;
}

export default function MarkdownRenderer({ children }: MarkdownRendererProps) {
  const defaultComponents: Components = {
    h1: ({ node, ...props }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-6" {...props} />,
    h2: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-5" {...props} />,
    h3: ({ node, ...props }) => <h4 className="text-xl font-bold text-gray-800 mb-2 mt-4" {...props} />,
    p: ({ node, ...props }) => <p className="text-gray-900 mb-4 leading-relaxed" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-900 mb-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="ml-4 text-gray-900" {...props} />,
    table: ({ node, ...props }) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse" {...props} /></div>,
    thead: ({ node, ...props }) => <thead className="bg-red-50" {...props} />,
    th: ({ node, ...props }) => <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900" {...props} />,
    td: ({ node, ...props }) => <td className="border border-gray-200 px-4 py-2 text-gray-900" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-gray-900" {...props} />,
    code: ({ node, ...props }) => <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm font-mono" {...props} />,
  };
  return <ReactMarkdown components={defaultComponents}>{children}</ReactMarkdown>;
}
