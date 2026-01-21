'use client';

import React, { useEffect, useState } from 'react';
import { getUserProgress, getXPTransactions } from '@/lib/utils/progress';
import { CheckCircle, Clock, Award } from 'lucide-react';
import { drivingLessons } from '@/lib/data/lessons';
import { getAllNacionalidadLessons } from '@/lib/data/nacionalidad-lessons';
import { useUser } from '@clerk/nextjs';
import { setLocalUserId } from '@/lib/utils/progress';
import Link from 'next/link';

export default function DashboardPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [progress, setProgress] = useState(() => getUserProgress());
  const [recentExams, setRecentExams] = useState<any[]>([]);
  const [drivingUnlocked, setDrivingUnlocked] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({ total: 0, completed: 0, percentage: 0 });

  useEffect(() => {
    if (!isLoaded) return;
    // when user signs in, bind local progress to their user id
    try {
      if (isSignedIn && user?.id) {
        setLocalUserId(user.id);
        // refresh progress now stored under user key
        setProgress(getUserProgress());
      }
    } catch (e) {}
    
    try {
      setProgress(getUserProgress());
      const raw = localStorage.getItem('dl_exam_history');
      const history = raw ? JSON.parse(raw) : [];
      setRecentExams(history.slice(-3).reverse());
      const dlCompleted = localStorage.getItem('dl_completed_chapters');
      const completed = dlCompleted ? JSON.parse(dlCompleted) : [];
      setDrivingUnlocked(Array.isArray(completed) && completed.length > 0);
      
      // Calculate completion percentage (only if user is authenticated)
      if (isSignedIn) {
        const drivingTotal = drivingLessons?.length || 0;
        const drivingCompleted = Array.isArray(completed) ? completed.length : 0;
        
        // Check nacionalidad completed chapters from localStorage
        const nacCompletedRaw = localStorage.getItem('nac_completed_chapters');
        const nacCompleted = nacCompletedRaw ? JSON.parse(nacCompletedRaw) : [];
        const nacTotal = getAllNacionalidadLessons()?.length || 0;
        const nacCompletedCount = Array.isArray(nacCompleted) ? nacCompleted.length : 0;
        
        const totalLessons = drivingTotal + nacTotal;
        const completedCount = drivingCompleted + nacCompletedCount;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        
        setCompletedLessons({ total: totalLessons, completed: completedCount, percentage });
      } else {
        setCompletedLessons({ total: 0, completed: 0, percentage: 0 });
      }
    } catch (e) {}
  }, [isLoaded, isSignedIn]);

  const totalXP = progress.totalXP || 0;
  const level = progress.level || 1;
  const currentXP = progress.currentLevelXP || 0;
  const nextXP = progress.nextLevelXP || 100;

  const badges = [
    { id: 'ccse-apto', title: 'CCSE Apto 🇪🇸', unlocked: progress.achievements.some(a => a.id === 'ccse-apto') },
    { id: 'driving-master', title: 'Driver License Master 🚗', unlocked: drivingUnlocked },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--muted-bg)] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--muted-bg)] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mi Progreso / ملفي الشخصي</h1>
            {isSignedIn && (
              <div className="text-sm text-gray-600 mt-1">
                Lecciones: {completedLessons.completed} / {completedLessons.total} ({completedLessons.percentage}% Completado)
              </div>
            )}
          </div>
          <Link href="/nacionalidad" className="text-sm text-blue-600">Ir a Nacionalidad</Link>
        </div>

        <div className="modern-card bg-white p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Nivel</div>
              <div className="text-2xl font-bold">Nivel {level} - {level >= 5 ? 'Avanzado' : 'Aprendiz'}</div>
            </div>
            <div className="w-2/3">
              <div className="text-sm text-gray-500 mb-2">XP: {totalXP} total</div>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div className="h-3 bg-blue-600 transition-all" style={{ width: `${(currentXP / nextXP) * 100}%` }} />
              </div>
              <div className="text-xs text-gray-500 mt-2">{currentXP}/{nextXP} XP</div>
            </div>
          </div>
        </div>

        <div className="modern-card bg-white p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">¿Necesitas ayuda con los trámites? / هل تحتاج مساعدة في الأوراق؟</h3>
              <p className="text-sm text-gray-600">Guías y checklists para trámites comunes (Empadronamiento, NIE/TIE, Cita Previa).</p>
            </div>
            <div>
              <Link href="/tramites" className="btn-primary px-4 py-2 rounded-lg">Ir a Trámites / اذهب إلى الأوراق</Link>
            </div>
          </div>
        </div>

        {/* Account Management Links */}
        {isSignedIn && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href="/account/billing" className="modern-card bg-gradient-to-r from-blue-50 to-blue-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white rounded-lg p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Facturación</h3>
                  <p className="text-sm text-gray-600">Gestiona tu suscripción</p>
                </div>
              </div>
            </Link>

            <Link href="/account/invoices" className="modern-card bg-gradient-to-r from-purple-50 to-purple-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 text-white rounded-lg p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Facturas</h3>
                  <p className="text-sm text-gray-600">Ver tus facturas y pagos</p>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="modern-card bg-white p-6">
            <h3 className="text-lg font-semibold mb-4">Insignias</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(b => (
                <div key={b.id} className="flex flex-col items-center p-4 rounded-lg border" style={{ filter: b.unlocked ? 'none' : 'grayscale(100%)', opacity: b.unlocked ? 1 : 0.6 }}>
                  <div className="text-3xl mb-2">{b.title.split(' ')[1] || '🏅'}</div>
                  <div className="text-sm text-center">{b.title}</div>
                  <div className="mt-2 text-xs text-gray-500">{b.unlocked ? 'Desbloqueado' : 'Bloqueado'}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="modern-card bg-white p-6 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
            {recentExams.length === 0 ? (
              <div className="text-sm text-gray-600">Todavía no hay exámenes registrados.</div>
            ) : (
              <ul className="space-y-3">
                {recentExams.map((e, i) => (
                  <li key={i} className="p-3 border rounded flex items-center justify-between">
                    <div>
                      <div className="font-medium">{e.passed ? 'Apto' : 'No Apto'} - {e.correct}/{e.total}</div>
                      <div className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-700">{e.passed ? '✅' : '❌'}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
