'use client';

import { useEffect } from 'react';
import { playClickSound } from '@/lib/utils/sounds';

/**
 * SoundProvider component
 * Adds click sounds to buttons globally
 */
export default function SoundProvider({ children }: { children: React.ReactNode }) {
  // Click sounds disabled globally by default to avoid unexpected system beeps.
  // If you want to re-enable click sounds selectively, add a `data-sound` attribute
  // to the specific element and set NEXT_PUBLIC_ENABLE_CLICK_SOUNDS=true in .env.local,
  // then uncomment the listener registration below.
  //
  // useEffect(() => {
  //   const handleButtonClick = (e: MouseEvent) => {
  //     const target = e.target as HTMLElement;
  //     const button = target.closest('button, [role=\"button\"], a[href]');
  //     if (button && button.hasAttribute('data-sound')) {
  //       playClickSound();
  //     }
  //   };
  //   document.addEventListener('click', handleButtonClick, true);
  //   return () => document.removeEventListener('click', handleButtonClick, true);
  // }, []);

  return <>{children}</>;
}
