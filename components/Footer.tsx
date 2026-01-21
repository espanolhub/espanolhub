'use client';

import Link from 'next/link';
import SocialShare from './SocialShare';
import { useAdminSettings } from './AdminSettingsProvider';

export default function Footer() {
  const { settings } = useAdminSettings();
  const monthly = settings?.monthly_price ?? 4.99;
  const billingMode = settings?.billing_mode ?? 'one-time';

  return (
    <footer className="bg-white text-slate-900 mt-auto">
      <div className="container mx-auto px-4 py-10 flex flex-col">
        {/* Main Content: 3 Columns */}
        <div className="order-2 md:order-1 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Column 1: Branding & Disclaimer */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-extrabold text-white text-lg">EH</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Español
                  </span>
                  <span className="text-lg font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Hub
                  </span>
                </div>
                <div className="text-[10px] text-gray-600 font-medium italic">Tu centro inteligente para aprender español</div>
              </div>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
              <p><strong>Aviso:</strong> Esta es una plataforma educativa independiente y no está afiliada a la DGT ni a ningún organismo gubernamental. El contenido es orientativo y educativo.</p>
            </div>
          </div>

          {/* Column 2: Legal Links & Social */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-3 text-[#0f172a]">Enlaces legales</h3>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              <li>
                <Link href="/aviso-legal" className="hover:text-[#0f172a] transition-colors">Aviso Legal</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0f172a] transition-colors">Política de Privacidad</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#0f172a] transition-colors">Cookies</Link>
              </li>
            </ul>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-600">Síguenos</h4>
              <div className="flex items-center gap-3">
                <SocialShare />
              </div>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#0f172a]">Contacto</h3>
            <p className="text-sm text-gray-700">contacto@espanolhub.com</p>
            <p className="text-sm text-gray-700 mt-3">Síguenos en nuestras redes para actualizaciones y nuevos cursos.</p>
          </div>
        </div>

        {/* Premium CTA removed (merged into page content to avoid duplication) */}

        {/* Copyright - Bottom only */}
        <div className="order-3 border-t border-gray-200 pt-6 pb-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-3">
            <Link href="/faq" className="text-sm text-blue-600 underline">Preguntas Frecuentes</Link>
            <a 
              href="https://t.me/esconabdou" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.772 13.32l-2.98-.93c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              <span className="underline">Soporte vía Telegram</span>
            </a>
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7-6-4-6 4 2-7L2 9h7l3-7z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-sm font-semibold text-amber-700">Garantía de Satisfacción</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">© 2026 Todos los derechos reservados. Español Educativo.</p>
        </div>
      </div>
    </footer>
  );
}
