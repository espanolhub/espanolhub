'use client';

import React, { useEffect, useState } from 'react';

interface Subscriber {
  clerkUserId: string;
  email?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  planId?: string;
  status?: string;
  currentPeriodEnd?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Subscribers() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const fetchSubs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/subscribers');
      const data = await res.json();
      setSubs(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const exportCsv = () => {
    const headers = ['clerkUserId','email','stripeCustomerId','stripeSubscriptionId','planId','status','currentPeriodEnd','createdAt','updatedAt'];
    const rows = subs.map(s => headers.map(h => `"${(s as any)[h] ?? ''}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredAll = subs.filter(s => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (s.email || '').toLowerCase().includes(q) || (s.clerkUserId || '').toLowerCase().includes(q) || (s.planId || '').toLowerCase().includes(q);
  });
  const total = filteredAll.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paged = filteredAll.slice(start, start + pageSize);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Suscriptores</h2>
      <p className="text-gray-600 mb-4">Lista de suscriptores y estado de suscripciones</p>

      <div className="flex items-center gap-3 mb-4">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar por email, plan o userId..." className="px-4 py-3 border rounded-xl w-96" />
        <button onClick={fetchSubs} className="px-4 py-3 bg-blue-600 text-white rounded-xl">Refresh</button>
        <button onClick={exportCsv} className="px-4 py-3 bg-emerald-600 text-white rounded-xl">Export CSV</button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Stripe Cust.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subscription</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paged.map((s) => (
                  <tr key={s.clerkUserId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.email || s.clerkUserId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.planId || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.status || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.stripeCustomerId || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.stripeSubscriptionId || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.updatedAt ? new Date(s.updatedAt).toLocaleString() : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            if (!confirm('Cancelar suscripción?')) return;
                            try {
                              const res = await fetch(`/api/admin/subscribers/${s.clerkUserId}/cancel`, { method: 'POST' });
                              const data = await res.json();
                              if (data?.error) alert('Error: ' + data.error);
                              else { alert('Cancelada'); await fetchSubs(); }
                            } catch (e) { console.error(e); alert('Error'); }
                          }}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={async () => {
                            const newPlan = prompt('Nuevo plan id (ej: premium-monthly):', s.planId || 'premium-monthly');
                            if (!newPlan) return;
                            try {
                              const res = await fetch(`/api/admin/subscribers/${s.clerkUserId}/change-plan`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ planId: newPlan }) });
                              const data = await res.json();
                              if (data?.error) alert('Error: ' + data.error);
                              else { alert('Plan actualizado'); await fetchSubs(); }
                            } catch (e) { console.error(e); alert('Error'); }
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs"
                        >
                          Cambiar Plan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAll.length === 0 && <div className="p-4 text-gray-500">No hay suscriptores.</div>}
            {filteredAll.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Mostrando {start+1} - {Math.min(start+pageSize, total)} de {total} suscriptores</div>
                <div className="flex items-center gap-2">
                  <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">{'<'}</button>
                  <div className="px-2 text-sm">{page}/{totalPages}</div>
                  <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded">{'>'}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

