import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Carnet de Conducir España - Preparación Completa DGT 2026 | Espanol Hub",
  description: "Prepara el examen teórico de conducir en España. 1000+ preguntas oficiales DGT, simuladores, señales, explicaciones bilingües. Aprueba a la primera.",
  keywords: ["carnet de conducir españa", "examen DGT", "test conducir", "permiso conducir", "autoescuela online", "test DGT gratis"],
  alternates: {
    canonical: "https://www.espanolhub.com/driving-license",
    languages: {
      'es': "https://www.espanolhub.com/driving-license",
      'ar': "https://www.espanolhub.com/ar/driving-license",
    }
  },
  openGraph: {
    title: "Carnet de Conducir España - Preparación DGT 2026",
    description: "Prepara el examen teórico de conducir con 1000+ preguntas oficiales DGT y simuladores.",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com/driving-license",
    siteName: "Espanol Hub",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Carnet de Conducir España',
    }],
  },
};

export default function DrivingLicenseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
