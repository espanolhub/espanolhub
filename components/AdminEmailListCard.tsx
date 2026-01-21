'use client';

import React from 'react';

interface Props {
  adminEmails: string[];
  newAdminEmail: string;
  setNewAdminEmail: (v: string) => void;
  onAdd: () => Promise<void>;
  onRemove: (email: string) => Promise<void>;
}

export default function AdminEmailListCard({ adminEmails, newAdminEmail, setNewAdminEmail, onAdd, onRemove }: Props) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex gap-2 items-center mb-3">
        <input aria-label="New admin email" value={newAdminEmail} onChange={(e)=>setNewAdminEmail(e.target.value)} placeholder="email@example.com" className="px-3 py-2 border rounded flex-1" />
        <button aria-label="Add admin email" onClick={onAdd} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
      <div className="flex flex-col gap-2 max-h-40 overflow-auto pr-1">
        {adminEmails.map(a => (
          <div key={a} className="px-3 py-2 bg-white rounded flex items-center justify-between gap-2 border" role="group" aria-label={`admin ${a}`}>
            <div className="text-sm truncate" title={a}>{a}</div>
            <button aria-label={`Remove ${a}`} onClick={() => onRemove(a)} className="text-xs text-red-600 px-2">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

