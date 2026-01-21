 'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InvoicesPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTx();
  }, []);

  const fetchTx = async () => {
    try {
      const res = await fetch('/api/admin/subscribers');
      const data = await res.json();
      // Flatten transactions (we have no invoices stored yet) - placeholder
      setTransactions([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-4">Facturas y Pagos</h1>
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-600">Aún no hay facturas almacenadas. Las compras por PayPal se registran como transacciones.</p>
        </div>
      </div>
    </div>
  );
}

