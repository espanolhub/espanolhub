import type { Metadata } from 'next';
import { getCourseById } from '@/lib/data/courses';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const course = getCourseById(params.id);
  
  if (!course) {
    return {
      title: 'Curso no encontrado | Espanol Hub',
    };
  }

  const title = `${course.title} - Curso Gratis | Espanol Hub`;
  const description = `${course.description}. Aprende gratis con lecciones estructuradas y ejercicios prácticos.`;
  
  return {
    title,
    description,
    keywords: ['curso español', course.title, 'aprender español', course.category, 'español gratis'],
    alternates: {
      canonical: `https://www.espanolhub.com/cursos/${params.id}`,
      languages: {
        'es': `https://www.espanolhub.com/cursos/${params.id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
      url: `https://www.espanolhub.com/cursos/${params.id}`,
      siteName: 'Espanol Hub',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: course.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@espanolhub',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
