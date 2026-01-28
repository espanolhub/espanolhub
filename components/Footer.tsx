'use client';

import Link from 'next/link';
import { useAdminSettings } from './AdminSettingsProvider';

export default function Footer() {
  const { settings } = useAdminSettings();

  return (
    <footer className="bg-white text-slate-900 mt-auto">
      <div className="container mx-auto px-4 py-10">
        {/* Branding + Disclaimer - Centered */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg border border-gray-200">
              <span className="font-extrabold text-white text-lg">EH</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-gray-900">Español</span>
                <span className="text-lg font-extrabold text-gray-900">Hub</span>
              </div>
              <div className="text-[10px] text-gray-600 font-medium italic">Tu centro inteligente para aprender español</div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 border border-gray-200">
            <span className="text-sm font-semibold text-gray-900">Plataforma Educativa Abierta</span>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed">
            <p><strong>Aviso:</strong> Esta es una plataforma educativa independiente y no está afiliada a la DGT ni a ningún organismo gubernamental. El contenido es orientativo y educativo.</p>
          </div>
        </div>

        {/* TikTok CTA - واحد فقط */}
        <div className="flex justify-center mb-6">
          <a
            href="https://www.tiktok.com/@esconabdou"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl font-semibold text-base md:text-lg"
            aria-label="Síguenos en TikTok @esconabdou"
            title="Síguenos en TikTok @esconabdou"
          >
            <span>@esconabdou</span>
            <span className="opacity-90 text-sm md:text-base">· Síguenos en TikTok</span>
          </a>
        </div>

        {/* Legal Links - مرة واحدة فقط */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
          <Link href="/aviso-legal" className="hover:text-blue-600 transition-colors">Aviso Legal</Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacidad</Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/cookies" className="hover:text-blue-600 transition-colors">Cookies</Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/faq" className="hover:text-blue-600 hover:underline transition-colors">FAQ</Link>
        </nav>

        {/* Extras - Telegram + Garantía */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm mb-4">
          <a
            href="https://t.me/esconabdou"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="Soporte vía Telegram - @esconabdou"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.772 13.32l-2.98-.93c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            <span className="underline">Soporte vía Telegram</span>
          </a>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3 7h7l-5.5 4 2 7-6-4-6 4 2-7L2 9h7l3-7z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Garantía de Satisfacción</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-600">© 2026 Todos los derechos reservados. Espanol Hub.</p>
      </div>
    </footer>
  );
}
