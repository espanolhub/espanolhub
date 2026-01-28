'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Download, ShoppingCart, BookOpen, GraduationCap, Award, FileText, Filter, Sparkles, Star } from 'lucide-react';
import { resources, getResourcesByCategory, getResourcesByPrice } from '@/lib/data/resources';
import ResourceCard from '@/components/ResourceCard';
import type { Resource } from '@/lib/types/resources';

export default function RecursosPage() {
  const [selectedCategory, setSelectedCategory] = useState<Resource['category'] | 'all'>('all');
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');

  const filteredResources = useMemo(() => {
    let filtered = resources;

    if (selectedCategory !== 'all') {
      filtered = getResourcesByCategory(selectedCategory);
    }

    if (selectedPrice !== 'all') {
      filtered = filtered.filter(r => r.price === selectedPrice);
    }

    return filtered;
  }, [selectedCategory, selectedPrice]);

  const freeCount = useMemo(() => resources.filter(r => r.price === 'free').length, []);
  const paidCount = useMemo(() => resources.filter(r => r.price === 'paid').length, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Download className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Guías, PDFs y Materiales</span>
            <Star className="w-4 h-4 text-blue-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Recursos Descargables
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-3">
            Materiales profesionales para acelerar tu aprendizaje
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guías PDF, hojas de referencia, ejercicios y recursos premium
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Download className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{resources.length}</div>
            <div className="text-sm text-gray-600">Recursos Totales</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FileText className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{freeCount}</div>
            <div className="text-sm text-gray-600">Recursos Gratis</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Award className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{paidCount}</div>
            <div className="text-sm text-gray-600">Recursos Premium</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'grammar', 'vocabulary', 'reading', 'exam-prep', 'general'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'Todas' : category === 'exam-prep' ? 'Preparación Examen' : category === 'grammar' ? 'Gramática' : category === 'vocabulary' ? 'Vocabulario' : category === 'reading' ? 'Lectura' : 'General'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'free', 'paid'] as const).map((price) => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPrice === price
                        ? price === 'free' 
                          ? 'bg-green-600 text-white shadow-md'
                          : price === 'paid'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {price === 'all' ? 'Todos' : price === 'free' ? 'Gratis' : 'Premium'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">
              No se encontraron recursos con estos filtros.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Buscas algo específico?
          </h2>
          <p className="text-lg mb-6 text-blue-100">
            Contáctanos y te ayudaremos a encontrar el recurso perfecto para tu aprendizaje
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
