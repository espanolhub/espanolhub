'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/admin/Dashboard';
import ContentManagement from '@/components/admin/ContentManagement';
import UserManagement from '@/components/admin/UserManagement';
import Stats from '@/components/admin/Stats';
import Subscribers from '@/components/admin/Subscribers';
import AdminSettingsPanel from '@/components/AdminSettingsPanel';
import { LayoutDashboard, FileText, Users, BarChart3, LogOut, CreditCard, Mail } from 'lucide-react';
import ContactMessages from '@/components/admin/ContactMessages';

type TabType = 'dashboard' | 'content' | 'users' | 'subscriptions' | 'stats' | 'messages';

const ADMIN_EMAILS = ['esconabdou@gmail.com', 'boutibderrahim@gmail.com'];

export default function AdminPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const userEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';
  const isAdmin = isSignedIn && ADMIN_EMAILS.includes(String(userEmail).toLowerCase());

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !isAdmin) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, isAdmin, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isSignedIn || !isAdmin) return null;

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Panel de Control', icon: LayoutDashboard },
    { id: 'messages' as TabType, label: 'Mensajes', icon: Mail, badge: true },
    { id: 'content' as TabType, label: 'Gestión de Contenido', icon: FileText },
    { id: 'users' as TabType, label: 'Gestión de Usuarios', icon: Users },
    { id: 'subscriptions' as TabType, label: 'Suscriptores', icon: CreditCard },
    { id: 'stats' as TabType, label: 'Estadísticas', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
              <p className="text-sm text-gray-600">Hola, {user?.firstName || user?.primaryEmailAddress?.emailAddress || 'Admin'}</p>
            </div>
            <a href="/" className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              <span>Volver al Inicio</span>
            </a>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <AdminSettingsPanel />
        </div>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'messages' && <ContactMessages />}
        {activeTab === 'content' && <ContentManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'subscriptions' && <Subscribers />}
        {activeTab === 'stats' && <Stats />}
      </main>
    </div>
  );
}