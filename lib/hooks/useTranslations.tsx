'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para gestionar la visibilidad de traducciones árabes
 * con detección automática del idioma del navegador
 * 
 * @returns [showTranslations, setShowTranslations]
 * - showTranslations: boolean - indica si las traducciones están visibles
 * - setShowTranslations: función para cambiar el estado
 */
export function useTranslations() {
  const [showTranslations, setShowTranslations] = useState<boolean>(() => {
    // Solo en el cliente
    if (typeof window === 'undefined') return false;
    
    try {
      // 1. Revisar localStorage primero (preferencia guardada)
      const saved = localStorage.getItem('show_arabic_translations');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      
      // 2. Detección automática del idioma del navegador
      const browserLang = navigator.language || navigator.languages?.[0] || 'es';
      const isArabic = browserLang.toLowerCase().startsWith('ar');
      
      // Guardar la detección inicial
      localStorage.setItem('show_arabic_translations', JSON.stringify(isArabic));
      
      return isArabic;
    } catch (error) {
      console.error('Error al cargar preferencias de traducción:', error);
      return false;
    }
  });

  // Guardar cambios en localStorage cuando el usuario cambia la preferencia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('show_arabic_translations', JSON.stringify(showTranslations));
      } catch (error) {
        console.error('Error al guardar preferencias de traducción:', error);
      }
    }
  }, [showTranslations]);

  return [showTranslations, setShowTranslations] as const;
}

/**
 * Componente reutilizable para el botón de toggle de traducciones
 */
interface TranslationToggleButtonProps {
  showTranslations: boolean;
  onClick: () => void;
  className?: string;
}

export function TranslationToggleButton({ 
  showTranslations, 
  onClick,
  className = ''
}: TranslationToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg ${className}`}
      aria-label={showTranslations ? 'Ocultar traducciones árabes' : 'Mostrar traducciones árabes'}
    >
      <span className="text-lg">🌐</span>
      <span className="font-medium" style={{ color: '#000000', fontWeight: 'bold' }}>
        {showTranslations ? 'Ocultar' : 'Mostrar'} Árabe
      </span>
    </button>
  );
}
