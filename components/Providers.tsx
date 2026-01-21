'use client';

import SoundProvider from './SoundProvider';
import Analytics from './Analytics';
import CookieConsent from './CookieConsent';
import { AdminSettingsProvider } from './AdminSettingsProvider';
import SignUpIntentHandler from './SignUpIntentHandler';
import { LanguageImmersionProvider } from './LanguageImmersionProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <AdminSettingsProvider>
        <LanguageImmersionProvider>
          <Analytics />
          <SignUpIntentHandler />
          {children}
          <CookieConsent />
        </LanguageImmersionProvider>
      </AdminSettingsProvider>
    </SoundProvider>
  );
}
