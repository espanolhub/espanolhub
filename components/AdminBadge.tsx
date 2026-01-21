'use client';

import React from 'react';

export default function AdminBadge({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${className || ''}`} style={{ background: 'linear-gradient(90deg,#0b2545,#08203a)', boxShadow: '0 6px 18px rgba(2,6,23,0.18)', color: '#f8fafc' }}>
      <span style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}>🔑</span>
      <span>ADMIN</span>
    </div>
  );
}

