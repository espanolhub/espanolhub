'use client';

import React from 'react';

export default function TemplateContainer({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="max-w-4xl mx-auto my-8 px-4">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-[#0f172a]">{title}</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}

