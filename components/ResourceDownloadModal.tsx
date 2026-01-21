'use client';

import { useState } from 'react';
import { X, Download, Mail, User } from 'lucide-react';
import type { Resource } from '@/lib/types/resources';

interface ResourceDownloadModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResourceDownloadModal({
  resource,
  isOpen,
  onClose,
}: ResourceDownloadModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to save user info
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, you would:
    // 1. Save user info to your database/email service
    // 2. Send download link via email
    // 3. Track download analytics

    setIsSubmitting(false);
    setIsDownloading(true);

    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 500));

    // Trigger actual download (in production, use the actual file URL)
    const link = document.createElement('a');
    link.href = resource.fileUrl || '#'; // Use actual file URL
    link.download = `${resource.title.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
    onClose();
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Descarga Gratis
          </h2>
          <p className="text-gray-600">
            {resource.title}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="download-name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="download-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Tu nombre"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="download-email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="download-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isDownloading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Procesando...</span>
              </>
            ) : isDownloading ? (
              <>
                <Download className="w-5 h-5 animate-bounce" />
                <span>Descargando...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Descargar Ahora</span>
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Al descargar, aceptas recibir actualizaciones y recursos adicionales por correo electrónico.
        </p>
      </div>
    </div>
  );
}
