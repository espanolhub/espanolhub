import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  children: string;
}

export default function MarkdownRenderer({ children }: MarkdownRendererProps) {
  // Note: Keep h1->h2 mapping to avoid multiple H1s per page.
  const components: Components = {
    h1: ({ node, ...props }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-6" {...props} />,
    h2: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-5" {...props} />,
    h3: ({ node, ...props }) => <h4 className="text-xl font-bold text-gray-800 mb-2 mt-4" {...props} />,
    p: ({ node, ...props }) => <p className="text-gray-900 mb-4 leading-relaxed" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-900 mb-4 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-900 mb-4 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="ml-4 text-gray-900" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-700" {...props} />,
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
    th: ({ node, ...props }) => <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900" {...props} />,
    td: ({ node, ...props }) => <td className="border border-gray-200 px-4 py-2 text-gray-900" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-gray-900" {...props} />,
    pre: ({ node, ...props }) => <pre className="bg-gray-100 text-gray-900 p-4 rounded-lg overflow-x-auto mb-6" {...props} />,
    code: ({ node, className, children: codeChildren, ...props }) => (
      <code className={`bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm font-mono ${className ?? ''}`} {...props}>
        {codeChildren}
      </code>
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-6" {...props} />
    ),
  };

  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
