import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gracias - Espanol Hub',
  description: 'Gracias por descargar nuestra guía PDF. Revisa tu correo electrónico y descubre nuestra oferta especial.',
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
