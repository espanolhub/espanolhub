import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Trámites en España - Guías Completas 2026 | Espanol Hub",
  description: "Guías completas para todos los trámites en España: empadronamiento, NIE, seguridad social, tarjeta sanitaria y más. Explicaciones en español y árabe.",
  keywords: ["trámites españa", "empadronamiento", "NIE", "seguridad social españa", "tarjeta sanitaria", "trámites extranjeros españa"],
  alternates: {
    canonical: "https://www.espanolhub.com/tramites",
    languages: {
      'es': "https://www.espanolhub.com/tramites",
      'ar': "https://www.espanolhub.com/ar/tramites",
    }
  },
  openGraph: {
    title: "Trámites en España - Guías Completas 2026",
    description: "Todo lo que necesitas saber sobre trámites en España. Empadronamiento, NIE, seguridad social y más.",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com/tramites",
    siteName: "Espanol Hub",
  },
};

export default function TramitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
