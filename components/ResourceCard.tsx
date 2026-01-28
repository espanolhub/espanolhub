'use client';

import { useState } from 'react';
import { Download, ShoppingCart, FileText, BookOpen, Award, GraduationCap, CheckCircle } from 'lucide-react';
import type { Resource } from '@/lib/types/resources';
import ResourceDownloadModal from './ResourceDownloadModal';
import ResourcePurchaseModal from './ResourcePurchaseModal';

interface ResourceCardProps {
  resource: Resource;
}

const categoryIcons: Record<Resource['category'], any> = {
  grammar: GraduationCap,
  vocabulary: BookOpen,
  reading: FileText,
  'exam-prep': Award,
  general: FileText,
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const CategoryIcon = categoryIcons[resource.category];

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 modern-card">
        {/* PDF Cover */}
        <div className="relative h-64 bg-gray-900 overflow-hidden">
          {/* Cover Placeholder with Design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <FileText className="w-20 h-20 mx-auto mb-4 text-white" aria-hidden="true" />
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
              </div>
            </div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-4 right-4">
            {resource.price === 'free' ? (
              <span className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold shadow-md border border-gray-200">
                GRATIS
              </span>
            ) : (
              <span className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md border border-gray-700">
                PREMIUM
              </span>
            )}
          </div>

          {/* Category Icon */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
            <CategoryIcon className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full capitalize">
              {resource.category === 'exam-prep' ? 'Preparación Examen' : resource.category}
            </span>
            {resource.level && (
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full capitalize">
                {resource.level === 'beginner' ? 'Principiante' : resource.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {resource.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            {resource.description}
          </p>

          {/* Stats */}
          {resource.downloadCount && resource.downloadCount > 0 && (
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4 text-gray-600" aria-hidden="true" />
                <span>{resource.downloadCount.toLocaleString()} descargas</span>
              </div>
            </div>
          )}

          {/* Price for Paid */}
          {resource.price === 'paid' && resource.priceAmount && (
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-800">
                  ${resource.priceAmount.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">{resource.currency || 'USD'}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {resource.price === 'free' ? (
              <button
                onClick={() => setShowDownloadModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg border border-gray-800"
              >
                <Download className="w-5 h-5 text-white" aria-hidden="true" />
                <span>Descargar Gratis</span>
              </button>
            ) : (
              <button
                onClick={() => setShowPurchaseModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Comprar Ahora</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <ResourceDownloadModal
          resource={resource}
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
        />
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <ResourcePurchaseModal
          resource={resource}
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </>
  );
}
