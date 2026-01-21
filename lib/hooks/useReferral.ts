'use client';

import { useEffect, useState } from 'react';

interface ReferralData {
  code: string;
  referredBy: string | null;
  referralCount: number;
  createdAt: string;
}

export function useReferral() {
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeReferral();
  }, []);

  const generateReferralCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const initializeReferral = () => {
    try {
      // Check if user has a referral code
      let storedData = localStorage.getItem('referral-data');
      
      if (!storedData) {
        // Create new referral code
        const newCode = generateReferralCode();
        const newData: ReferralData = {
          code: newCode,
          referredBy: null,
          referralCount: 0,
          createdAt: new Date().toISOString(),
        };
        
        // Check if user came from a referral link
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const refCode = urlParams.get('ref');
          
          if (refCode && refCode !== newCode) {
            newData.referredBy = refCode;
            // Track referral
            trackReferral(refCode);
          }
        }
        
        localStorage.setItem('referral-data', JSON.stringify(newData));
        setReferralData(newData);
      } else {
        setReferralData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error initializing referral:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackReferral = async (refCode: string) => {
    try {
      // Send referral data to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'referral_used', {
          referral_code: refCode,
        });
      }

      // Update referrer's count in localStorage
      const referrerKey = `referral-count-${refCode}`;
      const currentCount = parseInt(localStorage.getItem(referrerKey) || '0', 10);
      localStorage.setItem(referrerKey, (currentCount + 1).toString());
      
      // Optional: Send to backend API for persistent tracking
      // await fetch('/api/referrals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refCode }),
      // });
    } catch (error) {
      console.error('Error tracking referral:', error);
    }
  };

  const getReferralUrl = (): string => {
    if (!referralData) return '';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://espanol-educativo.com';
    return `${baseUrl}?ref=${referralData.code}`;
  };

  const getReferralCount = (): number => {
    if (!referralData) return 0;
    const referrerKey = `referral-count-${referralData.code}`;
    return parseInt(localStorage.getItem(referrerKey) || '0', 10);
  };

  return {
    referralData,
    isLoading,
    getReferralUrl,
    getReferralCount,
  };
}
