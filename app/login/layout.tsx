import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - Español Educativo',
  description: 'Inicia sesión en tu cuenta para acceder al panel de control y funciones avanzadas.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}