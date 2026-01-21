'use client';

import React, { useEffect, useState } from 'react';
import AdminEditor from '@/components/library/AdminEditor';
import { useUser } from '@clerk/nextjs';

export default function AdminLibraryPage() {
  const { user, isSignedIn } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;
    (async () => {
      try {
        const res = await fetch('/api/admin/emails');
        if (!res.ok) return;
        const emails = await res.json();
        const email = (user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
        setIsAdmin(emails.includes(email));
      } catch (e) {
        // ignore
      }
    })();
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Acceso Restringido</h2>
        <p className="text-sm text-gray-600">Debes iniciar sesión como administrador para acceder a esta sección.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Acceso Denegado</h2>
        <p className="text-sm text-gray-600">Tu cuenta no tiene permisos de administrador.</p>
      </div>
    );
  }

  return <AdminEditor />;
}

