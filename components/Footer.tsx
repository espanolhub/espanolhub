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

        {/* TikTok CTA - واحد فقط */}
        <div className="flex justify-center mb-6">
          <a
            href="https://www.tiktok.com/@esconabdou"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00f2ea] to-[#ff0050] text-white px-6 py-3.5 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105 font-semibold text-base md:text-lg"
            aria-label="Síguenos en TikTok @esconabdou"
            title="Síguenos en TikTok @esconabdou"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <span>@esconabdou</span>
            <span className="opacity-90 text-sm md:text-base">· Síguenos en TikTok</span>
          </a>
        </div>

        {/* Legal Links - مرة واحدة فقط */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
          <Link href="/aviso-legal" className="hover:text-[#0f172a] transition-colors">Aviso Legal</Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/privacy" className="hover:text-[#0f172a] transition-colors">Privacidad</Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/cookies" className="hover:text-[#0f172a] transition-colors">Cookies</Link>
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
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3 7h7l-5.5 4 2 7-6-4-6 4 2-7L2 9h7l3-7z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-amber-700">Garantía de Satisfacción</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-600">© 2026 Todos los derechos reservados. Espanol Hub.</p>
      </div>
    </footer>
  );
}
