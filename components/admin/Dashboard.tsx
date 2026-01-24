'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Users, Gamepad2, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const stats = [
    {
      title: 'Contenido Educativo',
      value: '100+',
      description: 'Lecciones y contenido disponible',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Usuarios',
      value: '2',
      description: 'Usuario activo',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Juegos',
      value: '5',
      description: 'Juegos interactivos',
      icon: Gamepad2,
      color: 'bg-purple-500',
    },
    {
      title: 'Visitas',
      value: '1.2K',
      description: 'Visitas este mes',
      icon: BarChart3,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel de Control</h2>
        <p className="text-gray-600">Vista general del sitio y estadísticas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/admin?tab=content')}
              className="px-5 py-4 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm hover:shadow-md text-left border border-blue-200"
            >
              <div className="font-bold text-lg mb-1">Agregar Nueva Lección</div>
              <div className="text-sm text-blue-600">Crear nuevo contenido educativo</div>
            </button>
            <button
              onClick={() => router.push('/admin?tab=users')}
              className="px-5 py-4 bg-gradient-to-br from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all shadow-sm hover:shadow-md text-left border border-green-200"
            >
              <div className="font-bold text-lg mb-1">Gestionar Usuarios</div>
              <div className="text-sm text-green-600">Ver y editar usuarios</div>
            </button>
            <button
              onClick={() => router.push('/admin?tab=stats')}
              className="px-5 py-4 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all shadow-sm hover:shadow-md text-left border border-purple-200"
            >
              <div className="font-bold text-lg mb-1">Ver Estadísticas</div>
              <div className="text-sm text-purple-600">Analizar datos del sitio</div>
            </button>
          </div>
      </div>
    </div>
  );
}