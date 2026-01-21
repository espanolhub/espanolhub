'use client';

import React, { useEffect, useState } from 'react';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import AdminEmailListCard from '@/components/AdminEmailListCard';
import Toasts from '@/components/Toast';
import AdminDictionaryDrawer from '@/components/AdminDictionaryDrawer';
import { 
  Euro, 
  CreditCard, 
  Tag, 
  Shield, 
  Eye, 
  Lock, 
  Unlock, 
  Save, 
  CheckCircle,
  DollarSign,
  Sparkles,
  Settings as SettingsIcon,
  User,
  BookOpen,
  FileText,
  Car,
  Flag,
  Languages
} from 'lucide-react';

export default function AdminSettingsPanel() {
  const { settings, updateSettings, previewMode, setPreviewMode } = useAdminSettings();
  const [local, setLocal] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/emails');
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && Array.isArray(data)) setAdminEmails(data);
      } catch (e) { 
        console.error(e);
        try { (window as any).__showToast?.('Failed to load admin emails', 'error'); } catch(_) {}
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleAdd = async () => {
    if (!newAdminEmail) return;
    try {
      const res = await fetch('/api/admin/emails', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email: newAdminEmail }) });
      const data = await res.json();
      if (Array.isArray(data)) {
        setAdminEmails(data);
        setNewAdminEmail('');
        try { (window as any).__showToast?.('Admin added', 'success'); } catch(e){}
      }
    } catch (e) { console.error(e); try { (window as any).__showToast?.('Failed to add admin', 'error'); } catch(_) {} }
  };

  const handleRemove = async (email: string) => {
    try {
      const res = await fetch(`/api/admin/emails/${encodeURIComponent(email)}`, { method: 'DELETE' });
      const data = await res.json();
      if (Array.isArray(data)) setAdminEmails(data);
      try { (window as any).__showToast?.('Admin removed', 'success'); } catch(e){}
    } catch (e) { console.error(e); try { (window as any).__showToast?.('Failed to remove admin', 'error'); } catch(_) {} }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <SettingsIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Panel de Configuración</h2>
              <p className="text-blue-100 text-sm">Administra precios, módulos y usuarios</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { updateSettings(local); setSaved(true); setTimeout(()=>setSaved(false),3000); }} 
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Save className="w-5 h-5" />
              <span>Guardar Todo</span>
            </button>
            {saved && (
              <div className="flex items-center gap-2 bg-green-500 px-4 py-3 rounded-xl font-semibold shadow-lg animate-bounce">
                <CheckCircle className="w-5 h-5" />
                <span>¡Guardado!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pricing Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2.5">
              <Euro className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Configuración de Precios</h3>
          </div>

          <div className="space-y-5">
            {/* Global Price Display */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100">
              <div className="text-sm text-gray-600 mb-1">Precio Global</div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                €{local.global_price}
              </div>
            </div>

            {/* Monthly Price */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                Precio Mensual (EUR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">€</span>
                <input
                  type="number"
                  step="0.01"
                  value={local.monthly_price ?? 4.99}
                  onChange={(e)=> {
                    const val = Number(e.target.value);
                    setLocal({...local, monthly_price: val});
                    updateSettings({ monthly_price: val });
                  }}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            {/* Billing Mode */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                Modo de Pago
              </label>
              <select
                value={local.billing_mode ?? 'one-time'}
                onChange={(e)=> {
                  const mode = e.target.value as any;
                  setLocal({...local, billing_mode: mode});
                  updateSettings({ billing_mode: mode });
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-semibold bg-white"
              >
                <option value="one-time">💰 Pago Único</option>
                <option value="monthly">🔄 Suscripción Mensual</option>
              </select>
            </div>

            {/* Sale Active */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 border border-orange-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={local.is_sale_active} 
                  onChange={(e)=> setLocal({...local, is_sale_active: e.target.checked})} 
                  className="h-5 w-5 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500" 
                />
                <div className="flex items-center gap-2 flex-1">
                  <Tag className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-semibold text-gray-800">Oferta Especial Activa</span>
                </div>
                {local.is_sale_active && (
                  <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
                )}
              </label>
            </div>

            {/* Promo Code */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4 text-pink-600" />
                Código Promocional
              </label>
              <input 
                value={local.promo_code} 
                onChange={(e)=> setLocal({...local, promo_code: e.target.value})} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-mono font-semibold uppercase"
                placeholder="PROMO2026"
              />
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Control de Módulos</h3>
          </div>

          <div className="space-y-4">
            {/* Driving Module */}
            <div className={`rounded-xl p-4 border-2 transition-all ${!local.locked_modules.driving ? 'bg-gradient-to-br from-green-50 to-white border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!local.locked_modules.driving} 
                  onChange={(e)=> setLocal({...local, locked_modules: {...local.locked_modules, driving: !e.target.checked}})} 
                  className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-500" 
                />
                <div className="flex items-center gap-2 flex-1">
                  <Car className={`w-5 h-5 ${!local.locked_modules.driving ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-gray-800">Carnet de Conducir</div>
                    <div className="text-xs text-gray-500">Curso oficial de conducción</div>
                  </div>
                </div>
                {!local.locked_modules.driving ? (
                  <Unlock className="w-5 h-5 text-green-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </label>
            </div>

            {/* Nationality Module */}
            <div className={`rounded-xl p-4 border-2 transition-all ${!local.locked_modules.nationality ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!local.locked_modules.nationality} 
                  onChange={(e)=> setLocal({...local, locked_modules: {...local.locked_modules, nationality: !e.target.checked}})} 
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                />
                <div className="flex items-center gap-2 flex-1">
                  <Flag className={`w-5 h-5 ${!local.locked_modules.nationality ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-gray-800">Nacionalidad Española</div>
                    <div className="text-xs text-gray-500">Examen CCSE preparación</div>
                  </div>
                </div>
                {!local.locked_modules.nationality ? (
                  <Unlock className="w-5 h-5 text-blue-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </label>
            </div>

            {/* Tramites Module */}
            <div className={`rounded-xl p-4 border-2 transition-all ${!local.locked_modules.tramites ? 'bg-gradient-to-br from-purple-50 to-white border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!local.locked_modules.tramites} 
                  onChange={(e)=> setLocal({...local, locked_modules: {...local.locked_modules, tramites: !e.target.checked}})} 
                  className="h-5 w-5 text-purple-500 border-gray-300 rounded focus:ring-2 focus:ring-purple-500" 
                />
                <div className="flex items-center gap-2 flex-1">
                  <FileText className={`w-5 h-5 ${!local.locked_modules.tramites ? 'text-purple-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-gray-800">Guías de Trámites</div>
                    <div className="text-xs text-gray-500">Procedimientos oficiales</div>
                  </div>
                </div>
                {!local.locked_modules.tramites ? (
                  <Unlock className="w-5 h-5 text-purple-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </label>
            </div>

            {/* Language Module */}
            <div className={`rounded-xl p-4 border-2 transition-all ${!local.locked_modules?.['language'] ? 'bg-gradient-to-br from-pink-50 to-white border-pink-200' : 'bg-gray-50 border-gray-200'}`}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!local.locked_modules?.['language']} 
                  onChange={(e)=> setLocal({...local, locked_modules: {...local.locked_modules, language: !e.target.checked}})} 
                  className="h-5 w-5 text-pink-500 border-gray-300 rounded focus:ring-2 focus:ring-pink-500" 
                />
                <div className="flex items-center gap-2 flex-1">
                  <Languages className={`w-5 h-5 ${!local.locked_modules?.['language'] ? 'text-pink-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-gray-800">Cursos de Idioma</div>
                    <div className="text-xs text-gray-500">Lecciones de español</div>
                  </div>
                </div>
                {!local.locked_modules?.['language'] ? (
                  <Unlock className="w-5 h-5 text-pink-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Admin Users & Preview Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2.5">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Administradores</h3>
          </div>

          <div className="space-y-5">
            {/* Admin Emails Card */}
            <div>
              <AdminEmailListCard 
                adminEmails={adminEmails} 
                newAdminEmail={newAdminEmail} 
                setNewAdminEmail={setNewAdminEmail} 
                onAdd={handleAdd} 
                onRemove={handleRemove} 
              />
            </div>

            {/* Preview Mode */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-4 border-2 border-amber-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={previewMode} 
                  onChange={(e)=> setPreviewMode(e.target.checked)} 
                  className="h-5 w-5 text-amber-500 border-gray-300 rounded focus:ring-2 focus:ring-amber-500" 
                />
                <div className="flex items-center gap-2 flex-1">
                  <Eye className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Modo Vista Previa</div>
                    <div className="text-xs text-gray-500">Ver sitio como usuario gratuito</div>
                  </div>
                </div>
                {previewMode && (
                  <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ACTIVO
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Dictionary Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-2.5">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Gestión de Diccionario</h3>
            <p className="text-sm text-gray-500">Administra palabras y traducciones</p>
          </div>
        </div>
        <AdminDictionaryDrawer />
      </div>

      <Toasts />
    </div>
  );
}

