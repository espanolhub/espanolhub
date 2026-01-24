import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Simulador Examen Conducir DGT - Test Oficial España 2026 | Espanol Hub",
  description: "Simulador oficial del examen de conducir DGT. 30 preguntas, 30 minutos, igual al examen real. Practica gratis y aprueba a la primera. Resultados instantáneos.",
  keywords: ["simulador examen conducir", "test DGT online", "simulador DGT gratis", "examen conducir simulación", "test conducir oficial"],
  alternates: {
    canonical: "https://www.espanolhub.com/simulator",
    languages: {
      'es': "https://www.espanolhub.com/simulator",
      'ar': "https://www.espanolhub.com/ar/simulator",
    }
  },
  openGraph: {
    title: "Simulador Examen Conducir DGT - Test Oficial",
    description: "Practica con el simulador oficial del examen DGT. 30 preguntas en 30 minutos. Gratis.",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com/simulator",
    siteName: "Espanol Hub",
  },
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
