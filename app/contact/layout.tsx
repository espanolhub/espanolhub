import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Español Educativo',
  description: 'Contáctanos para preguntas, sugerencias o comentarios. Estamos aquí para ayudarte en tu aprendizaje del español.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
