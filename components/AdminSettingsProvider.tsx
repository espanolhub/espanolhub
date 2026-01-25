'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface LockedModules {
  driving: boolean;
  nationality: boolean;
  tramites: boolean;
  language: boolean;
}

export interface AdminSettings {
  global_price: number;
  promo_code: string;
  is_sale_active: boolean;
  locked_modules: LockedModules;
  monthly_price?: number;
  billing_mode?: 'one-time' | 'monthly';
}

const DEFAULT_SETTINGS: AdminSettings = {
  global_price: 9.99,
  promo_code: '',
  is_sale_active: false,
  locked_modules: {
    driving: true,
    nationality: true,
    tramites: true,
    language: true,
  },
  monthly_price: 9.99,
  billing_mode: 'monthly',
};

type AdminContextValue = {
  settings: AdminSettings;
  setSettings: (s: AdminSettings) => void;
  updateSettings: (patch: Partial<AdminSettings>) => void;
  previewMode: boolean;
  setPreviewMode: (v: boolean) => void;
};

const AdminSettingsContext = createContext<AdminContextValue | null>(null);

export function AdminSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [previewMode, setPreviewMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      const raw = localStorage.getItem('admin_settings_v1');
      if (raw) {
        setSettingsState(JSON.parse(raw));
      } else {
        localStorage.setItem('admin_settings_v1', JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch (e) {
      console.warn('Failed to load admin settings:', e);
    }
  }, [mounted]);

  const setSettings = (s: AdminSettings) => {
    setSettingsState(s);
    if (!mounted) return;
    try { 
      localStorage.setItem('admin_settings_v1', JSON.stringify(s)); 
    } catch (e) {
      console.warn('Failed to save admin settings:', e);
    }
  };

  const updateSettings = (patch: Partial<AdminSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...patch, locked_modules: { ...prev.locked_modules, ...(patch.locked_modules || {}) } };
      if (mounted) {
        try { 
          localStorage.setItem('admin_settings_v1', JSON.stringify(next)); 
        } catch (e) {
          console.warn('Failed to update admin settings:', e);
        }
      }
      return next;
    });
  };

  return (
    <AdminSettingsContext.Provider value={{ settings, setSettings, updateSettings, previewMode, setPreviewMode }}>
      {children}
    </AdminSettingsContext.Provider>
  );
}

export function useAdminSettings() {
  const ctx = useContext(AdminSettingsContext);
  if (!ctx) {
    console.error('useAdminSettings must be used within AdminSettingsProvider');
    // Return default values instead of throwing to prevent crashes
    return {
      settings: DEFAULT_SETTINGS,
      setSettings: () => {},
      updateSettings: () => {},
      previewMode: false,
      setPreviewMode: () => {},
    };
  }
  return ctx;
}

