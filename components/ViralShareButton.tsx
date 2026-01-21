'use client';

import { useState, useEffect } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

interface ViralShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  level?: number;
  score?: number;
  gameName?: string;
  language?: 'es' | 'ar';
  className?: string;
  variant?: 'button' | 'icon';
}

export default function ViralShareButton({
  title,
  text,
  url,
  level,
  score,
  gameName,
  language = 'es',
  className = '',
  variant = 'button',
}: ViralShareButtonProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userReferralCode, setUserReferralCode] = useState<string>('');

  useEffect(() => {
    // Check if Web Share API is supported
    setIsSupported(typeof navigator !== 'undefined' && !!navigator.share);
    
    // Generate or retrieve user referral code
    let referralCode = localStorage.getItem('user-referral-code');
    if (!referralCode) {
      referralCode = generateReferralCode();
      localStorage.setItem('user-referral-code', referralCode);
    }
    setUserReferralCode(referralCode);
  }, []);

  const generateReferralCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const generateShareMessage = (): { title: string; text: string; url: string } => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://espanol-educativo.com';
    const shareUrl = url || `${baseUrl}?ref=${userReferralCode}`;

    // Default messages
    const messages = {
      es: {
        default: {
          title: '¡Aprende Español Conmigo! 🇪🇸',
          text: '¡Estoy aprendiendo español de forma divertida e interactiva! ¿Te unes al reto? 🚀',
        },
        withLevel: {
          title: `¡Nivel ${level} Completado! 🏆`,
          text: `¡Acabo de completar el nivel ${level} en ${gameName || 'Español Educativo'}! ¿Puedes superar mi puntuación de ${score} puntos? 🎯`,
        },
        withScore: {
          title: '¡Nueva Puntuación! 🌟',
          text: `¡He conseguido ${score} puntos en ${gameName || 'Español Educativo'}! ¿Puedes vencerme? 💪`,
        },
      },
      ar: {
        default: {
          title: 'تعلم الإسبانية معي! 🇪🇸',
          text: 'أنا أتعلم الإسبانية بطريقة ممتعة وتفاعلية! هل تنضم إلى التحدي؟ 🚀',
        },
        withLevel: {
          title: `المستوى ${level} مكتمل! 🏆`,
          text: `لقد أكملت المستوى ${level} في ${gameName || 'Español Educativo'}! هل يمكنك تجاوز نتيجتي ${score} نقطة؟ 🎯`,
        },
        withScore: {
          title: 'نتيجة جديدة! 🌟',
          text: `لقد حصلت على ${score} نقطة في ${gameName || 'Español Educativo'}! هل تستطيع التغلب علي؟ 💪`,
        },
      },
    };

    let selectedMessage = messages[language].default;

    if (level && score) {
      selectedMessage = messages[language].withLevel;
    } else if (score) {
      selectedMessage = messages[language].withScore;
    }

    return {
      title: title || selectedMessage.title,
      text: text || selectedMessage.text,
      url: shareUrl,
    };
  };

  const handleShare = async () => {
    const shareData = generateShareMessage();

    try {
      if (isSupported) {
        // Use native Web Share API
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        
        // Track share event (optional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'Web Share API',
            content_type: gameName || 'general',
            item_id: userReferralCode,
          });
        }
      } else {
        // Fallback: Copy to clipboard
        await copyToClipboard(shareData);
      }
    } catch (error) {
      // User cancelled or error occurred
      console.log('Share cancelled or failed:', error);
      // Fallback to copy
      await copyToClipboard(shareData);
    }
  };

  const copyToClipboard = async (shareData: { title: string; text: string; url: string }) => {
    const fullText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleShare}
        className={`p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all transform hover:scale-105 ${className}`}
        aria-label={language === 'es' ? 'Compartir' : 'مشاركة'}
        title={language === 'es' ? 'Compartir con amigos' : 'شارك مع الأصدقاء'}
      >
        {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      className={`group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 ${className}`}
      aria-label={language === 'es' ? 'Compartir con amigos' : 'شارك مع الأصدقاء'}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          <span>{language === 'es' ? '¡Copiado!' : 'تم النسخ!'}</span>
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>{language === 'es' ? 'Compartir con amigos' : 'شارك مع الأصدقاء'}</span>
        </>
      )}
    </button>
  );
}
