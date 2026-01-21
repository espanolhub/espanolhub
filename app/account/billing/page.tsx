 'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BillingPage() {
  const router = useRouter();
  const [sub, setSub] = useState<any>(null);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const res = await fetch('/api/subscribers/me');
      const data = await res.json();
      setSub(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">Facturación y Suscripción</h1>
        {!sub ? (
          <div className="p-6 bg-white rounded-lg shadow">No tienes una suscripción activa.</div>
        ) : (
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="mb-2"><strong>Plan:</strong> {sub.planId || 'N/A'}</div>
            <div className="mb-2"><strong>Status:</strong> {sub.status}</div>
            <div className="mb-2"><strong>Válida hasta:</strong> {sub.currentPeriodEnd || 'N/A'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

