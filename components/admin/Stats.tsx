'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, BookOpen, Gamepad2, Eye, BarChart3 } from 'lucide-react';

export default function Stats() {
  const [realStats, setRealStats] = useState({
    totalVisits: 0,
    activeUsers: 0,
    lessonsCompleted: 0,
    gamesPlayed: 0,
  });

  useEffect(() => {
    // Get real statistics from localStorage
    try {
      // Count all user progress entries
      let lessonsCount = 0;
      let gamesCount = 0;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        
        if (key.includes('completed') || key.includes('progress')) {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              const parsed = JSON.parse(value);
              if (Array.isArray(parsed)) {
                lessonsCount += parsed.length;
              }
            } catch (e) {
              // Not JSON, skip
            }
          }
        }
        
        if (key.includes('game') || key.includes('exam')) {
          gamesCount++;
        }
      }
      
      setRealStats({
        totalVisits: lessonsCount + gamesCount,
        activeUsers: localStorage.length > 0 ? 1 : 0,
        lessonsCompleted: lessonsCount,
        gamesPlayed: gamesCount,
      });
    } catch (e) {
      console.error('Error getting stats:', e);
    }
  }, []);

  const stats = [
    {
      title: 'Datos Guardados',
      value: realStats.totalVisits.toString(),
      change: 'Real',
      changeType: 'increase',
      icon: Eye,
    },
    {
      title: 'Sesiones Activas',
      value: realStats.activeUsers.toString(),
      change: 'Actual',
      changeType: 'increase',
      icon: Users,
    },
    {
      title: 'Lecciones Completadas',
      value: realStats.lessonsCompleted.toString(),
      change: 'Local',
      changeType: 'increase',
      icon: BookOpen,
    },
    {
      title: 'Partidas Guardadas',
      value: realStats.gamesPlayed.toString(),
      change: 'Real',
      changeType: 'increase',
      icon: Gamepad2,
    },
  ];

  const topContent = [
    { title: 'Datos desde LocalStorage', views: realStats.totalVisits, completion: 100 },
    { title: 'Estadísticas Reales del Usuario', views: realStats.lessonsCompleted, completion: 100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Estadísticas</h2>
        <p className="text-gray-600">Análisis completo del rendimiento del sitio y contenido</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Top Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenido Más Popular</h3>
        <div className="space-y-4">
          {topContent.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{item.title}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {item.views.toLocaleString()} visualizaciones • {item.completion}% completado
                </div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${item.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitas Mensuales</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Gráfico de visitas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Usuarios</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-2" />
              <p>Gráfico de usuarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}