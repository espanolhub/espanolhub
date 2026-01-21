'use client';

import React, { useEffect, useState } from 'react';
import AdminEditor from '@/components/library/AdminEditor';

export default function AdminLibraryPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Always true since middleware protects this route

  useEffect(() => {
    // Admin check is done by middleware
    setIsAdmin(true);
  }, []);

  if (!isAdmin) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Acceso Restringido</h2>
        <p className="text-sm text-gray-600">Debes iniciar sesión como administrador para acceder a esta sección.</p>
      </div>
    );
  }

  return <AdminEditor />;
}
