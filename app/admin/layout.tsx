import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Control - Espanol Hub',
  description: 'Panel de administración para gestionar contenido, usuarios y estadísticas del sitio.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}