'use client';

import { useState, useEffect } from 'react';
import { User, Shield, Mail, Calendar, Edit, Trash2, Loader2 } from 'lucide-react';

interface UserData {
  id: string;
  username: string | null;
  email: string;
  role: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // جلب المستخدمين من API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/admin/users', {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('No autorizado. Por favor, inicia sesión.');
          } else if (response.status === 403) {
            setError('No tienes permisos para ver los usuarios.');
          } else {
            setError('Error al cargar los usuarios.');
          }
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error de conexión. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const username = user.username?.toLowerCase() || '';
    const email = user.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    return username.includes(search) || email.includes(search);
  });

  const handleEdit = (id: string) => {
    setEditingId(id);
    const user = users.find(u => u.id === id);
    if (user) {
      const newUsername = prompt('Ingrese el nuevo nombre de usuario:', user.username);
      if (newUsername && newUsername.trim()) {
        setUsers(users.map(u => 
          u.id === id ? { ...u, username: newUsername.trim() } : u
        ));
      }
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user && user.role === 'admin') {
      alert('¡No se puede eliminar la cuenta de administrador!');
      return;
    }
    if (confirm(`¿Estás seguro de eliminar al usuario "${user?.username}"?`)) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h2>
            <p className="text-gray-600">Gestionar cuentas de usuarios y permisos</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Cargando usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h2>
            <p className="text-gray-600">Gestionar cuentas de usuarios y permisos</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h2>
          <p className="text-gray-600">Gestionar cuentas de usuarios y permisos</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo Electrónico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No hay usuarios registrados.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          user.role === 'admin' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {user.role === 'admin' ? (
                            <Shield className="h-5 w-5 text-blue-600" />
                          ) : (
                            <User className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.username || 'Sin nombre'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(user.id)}
                      disabled={editingId === user.id}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors mr-2 font-medium flex items-center gap-1 disabled:opacity-50"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}