'use client';

import { useState, useEffect } from 'react';
import { Mail, Bell } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

const ADMIN_EMAILS = ['esconabdou@gmail.com', 'boutibderrahim@gmail.com'];

export default function AdminNotificationBadge() {
  const { isSignedIn, user } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const userEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '';
  const isAdmin = isSignedIn && ADMIN_EMAILS.includes(String(userEmail).toLowerCase());

  useEffect(() => {
    if (!isAdmin) return;

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/contact-messages');
        const data = await response.json();
        if (data.success) {
          const newUnreadCount = data.unreadCount;
          
          // Show notification if new messages arrived
          if (newUnreadCount > unreadCount) {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
          }
          
          setUnreadCount(newUnreadCount);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [isAdmin, unreadCount]);

  if (!isAdmin || unreadCount === 0) return null;

  return (
    <>
      {/* Floating Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <Link href="/admin?tab=messages">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Nuevo mensaje!</p>
                <p className="text-sm text-blue-100">
                  Tienes {unreadCount} {unreadCount === 1 ? 'mensaje sin leer' : 'mensajes sin leer'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Badge in Navigation */}
      <Link href="/admin?tab=messages">
        <div className="relative cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Bell className="w-5 h-5 text-white animate-pulse" />
          </div>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white animate-bounce">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          <div className="absolute right-0 top-12 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {unreadCount} {unreadCount === 1 ? 'mensaje nuevo' : 'mensajes nuevos'}
          </div>
        </div>
      </Link>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
