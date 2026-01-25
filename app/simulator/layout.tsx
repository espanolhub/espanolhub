import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: "Simulador Examen Conducir DGT - Test Oficial España 2026 | Espanol Hub",
  description: "Simulador oficial del examen de conducir DGT. 30 preguntas, 30 minutos, igual al examen real. Practica gratis y aprueba a la primera. Resultados instantáneos.",
  keywords: ["simulador examen conducir", "test DGT online", "simulador DGT gratis", "examen conducir simulación", "test conducir oficial"],
  alternates: {
    canonical: getCanonicalUrl('/simulator'),
    languages: {
      'es': getCanonicalUrl('/simulator'),
      'ar': getCanonicalUrl('/simulator'),
    },
  },
  openGraph: {
    title: "Simulador Examen Conducir DGT - Test Oficial",
    description: "Practica con el simulador oficial del examen DGT. 30 preguntas en 30 minutos. Gratis.",
    type: "website",
    locale: "es_ES",
    url: getCanonicalUrl('/simulator'),
    siteName: "Espanol Hub",
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Simulador Examen Conducir DGT',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Simulador Examen Conducir DGT - Test Oficial',
    description: 'Practica con el simulador oficial del examen DGT. 30 preguntas en 30 minutos.',
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

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
