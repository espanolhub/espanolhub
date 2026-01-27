'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Download, Mail } from 'lucide-react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFModal({ isOpen, onClose }: PDFModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Send email submission to API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: email.split('@')[0], // Extract name from email
          email: email,
          subject: 'PDF Download Request',
          message: `User requested PDF download. Email: ${email}`,
          type: 'pdf-download'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      // Continue with flow even if email fails
    }
    
    // Close modal and redirect to thank you page
    onClose();
    router.push('/thank-you');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
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
            Descarga tu Guía PDF Gratis
          </h2>
          <p className="text-gray-600">
            Ingresa tu correo electrónico para recibir la guía completa
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
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
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Descargar Guía PDF'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          No compartimos tu información con terceros
        </p>
      </div>
    </div>
  );
}
