import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Simulador DGT Oficial 2026 - Examen Teórico de Conducir | Espanol Hub",
  description: "Practica con nuestro simulador oficial DGT 2026. Examen teórico de conducir completo con 30 preguntas, cronómetro y corrección detallada. Aprueba a la primera.",
  keywords: ["simulador dgt", "examen teórico conducir", "test dgt online", "simulador carnet conducir", "examen dgt gratis", "test conducir españa"],
  alternates: {
    canonical: "https://www.espanolhub.com/simulator",
    languages: { 'es': "https://www.espanolhub.com/simulator" }
  },
  openGraph: {
    title: "Simulador DGT Oficial 2026 - Examen Teórico de Conducir",
    description: "Practica con nuestro simulador oficial DGT 2026. 30 preguntas reales, cronómetro y corrección detallada. Prepárate para aprobar a la primera.",
    url: "https://www.espanolhub.com/simulator",
    siteName: "Espanol Hub",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Simulador DGT - Espanol Hub',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Simulador DGT Oficial 2026 - Examen Teórico de Conducir",
    description: "Practica con nuestro simulador oficial DGT 2026. 30 preguntas reales, cronómetro y corrección detallada.",
    images: ['/og-image.png'],
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

export default function SimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
