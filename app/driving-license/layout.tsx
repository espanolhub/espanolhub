import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: "Carnet de Conducir España - Preparación Completa DGT 2026 | Espanol Hub",
  description: "Prepara el examen teórico de conducir en España. 1000+ preguntas oficiales DGT, simuladores, señales, explicaciones bilingües. Aprueba a la primera.",
  keywords: ["carnet de conducir españa", "examen DGT", "test conducir", "permiso conducir", "autoescuela online", "test DGT gratis"],
  alternates: {
    canonical: getCanonicalUrl('/driving-license'),
    languages: {
      'es': getCanonicalUrl('/driving-license'),
      'ar': getCanonicalUrl('/driving-license'),
    },
  },
  openGraph: {
    title: "Carnet de Conducir España - Preparación DGT 2026",
    description: "Prepara el examen teórico de conducir con 1000+ preguntas oficiales DGT y simuladores.",
    type: "website",
    locale: "es_ES",
    url: getCanonicalUrl('/driving-license'),
    siteName: "Espanol Hub",
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Carnet de Conducir España',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Carnet de Conducir España - Preparación DGT 2026',
    description: 'Prepara el examen teórico de conducir con 1000+ preguntas oficiales DGT y simuladores.',
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

export default function DrivingLicenseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
