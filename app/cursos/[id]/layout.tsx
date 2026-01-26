import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  
  // Basic metadata that works for all courses
  return {
    title: `Curso de Español - ${id} | Espanol Hub`,
    description: "Aprende español con nuestros cursos completos. Lecciones estructuradas, ejercicios interactivos y contenido de calidad para todos los niveles.",
    keywords: ["curso español", "aprender español", "lecciones español", "español online", "curso español gratis"],
    alternates: {
      canonical: `https://www.espanolhub.com/cursos/${id}`,
      languages: { 'es': `https://www.espanolhub.com/cursos/${id}` }
    },
    openGraph: {
      title: `Curso de Español - ${id}`,
      description: "Aprende español con nuestros cursos completos. Lecciones estructuradas, ejercicios interactivos y contenido de calidad.",
      url: `https://www.espanolhub.com/cursos/${id}`,
      siteName: "Espanol Hub",
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Curso de Español - Espanol Hub',
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Curso de Español - ${id}`,
      description: "Aprende español con nuestros cursos completos. Lecciones estructuradas y contenido de calidad.",
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
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
