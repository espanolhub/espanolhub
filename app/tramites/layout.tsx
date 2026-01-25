import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: "Trámites en España - Guías Completas 2026 | Espanol Hub",
  description: "Guías completas para todos los trámites en España: empadronamiento, NIE, seguridad social, tarjeta sanitaria y más. Explicaciones en español y árabe.",
  keywords: ["trámites españa", "empadronamiento", "NIE", "seguridad social españa", "tarjeta sanitaria", "trámites extranjeros españa"],
  alternates: {
    canonical: getCanonicalUrl('/tramites'),
    languages: {
      'es': getCanonicalUrl('/tramites'),
      'ar': getCanonicalUrl('/tramites'),
    },
  },
  openGraph: {
    title: "Trámites en España - Guías Completas 2026",
    description: "Todo lo que necesitas saber sobre trámites en España. Empadronamiento, NIE, seguridad social y más.",
    type: "website",
    locale: "es_ES",
    url: getCanonicalUrl('/tramites'),
    siteName: "Espanol Hub",
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Trámites en España',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Trámites en España - Guías Completas 2026',
    description: 'Todo lo que necesitas saber sobre trámites en España.',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function TramitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
