'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initGA, trackPageView } from '@/lib/utils/analytics';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize GA
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
