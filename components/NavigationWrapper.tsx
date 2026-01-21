'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Safe Navigation wrapper that only loads Navigation when Clerk is available
// This prevents SSR/prerendering errors with Clerk hooks
export default function NavigationWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load Navigation on client-side after mount
    // Check if Clerk key exists (optional, but prevents unnecessary loading)
    setShouldLoad(true);
  }, []);

  // Use dynamic import with ssr: false to prevent prerendering issues
  const Navigation = dynamic(
    () => import('@/components/Navigation'),
    {
      ssr: false, // Critical: disable SSR to avoid ClerkProvider issues
      loading: () => (
        <nav className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Loading placeholder - maintains layout */}
            </div>
          </div>
        </nav>
      ),
    }
  );

  // Render Navigation only after client-side hydration
  if (!shouldLoad) {
    return (
      <nav className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Placeholder during initial render */}
          </div>
        </div>
      </nav>
    );
  }

  return <Navigation />;
}