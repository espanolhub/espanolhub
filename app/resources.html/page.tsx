'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, FileText, BookOpen, GraduationCap, Download, X } from 'lucide-react';
import { resources, getResourcesByLibraryCategory, searchResources, type LibraryCategory } from '@/lib/data/resources';
import ResourceCard from '@/components/ResourceCard';
import type { Resource } from '@/lib/types/resources';

export default function ResourcesLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory>('all');

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Filter by library category
    if (selectedCategory !== 'all') {
      filtered = getResourcesByLibraryCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchResources(searchQuery).filter(r => 
        selectedCategory === 'all' || (r as any).libraryCategory === selectedCategory
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group resources by library category for display
  const groupedResources = useMemo(() => {
    const groups: Record<LibraryCategory, Resource[]> = {
      'free-guides': [],
      'workbooks': [],
      'grammar-cheat-sheets': [],
      'all': [],
    };

    filteredResources.forEach(resource => {
      const libCat = (resource as any).libraryCategory || 'all';
      if (groups[libCat as LibraryCategory]) {
        groups[libCat as LibraryCategory].push(resource);
      }
    });

    return groups;
  }, [filteredResources]);

  // Get category info
  const categoryInfo = {
    'free-guides': {
      title: 'Guías Gratuitas',
      titleAr: 'الدلائل المجانية',
      icon: FileText,
      description: 'Guías completas y materiales de estudio gratuitos',
      color: 'from-blue-500 to-blue-600',
    },
    'workbooks': {
      title: 'Cuadernos de Ejercicios',
      titleAr: 'دفاتر التمارين',
      icon: BookOpen,
      description: 'Cuadernos de práctica con ejercicios interactivos',
      color: 'from-green-500 to-green-600',
    },
    'grammar-cheat-sheets': {
      title: 'Hojas de Referencia',
      titleAr: 'ملخصات القواعد',
      icon: GraduationCap,
      description: 'Referencias rápidas de gramática y reglas esenciales',
      color: 'from-purple-500 to-purple-600',
    },
  };

  // If a specific category is selected or search is active, show filtered grid
  const showFilteredView = selectedCategory !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Biblioteca de Recursos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección completa de guías PDF, cuadernos de ejercicios y hojas de referencia
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos (ej: verbos, gramática, vocabulario)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Filtrar por Categoría</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {(['all', 'free-guides', 'workbooks', 'grammar-cheat-sheets'] as LibraryCategory[]).map((category) => {
              const info = category === 'all' 
                ? { title: 'Todas las Categorías', icon: FileText, color: 'from-gray-500 to-gray-600' }
                : categoryInfo[category];
              const Icon = info.icon;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${info.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category === 'all' ? 'Todas las Categorías' : info.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        {showFilteredView && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Mostrando <span className="font-bold text-blue-600">{filteredResources.length}</span> recurso{filteredResources.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Resources Display */}
        {showFilteredView ? (
          // Filtered/Grouped View
          filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center mb-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                No se encontraron recursos
              </p>
              <p className="text-sm text-gray-500">
                Intenta con otros términos de búsqueda o selecciona otra categoría
              </p>
            </div>
          )
        ) : (
          // Grouped by Category View (default)
          <div className="space-y-16 mb-12">
            {(['free-guides', 'workbooks', 'grammar-cheat-sheets'] as const).map((category) => {
              const info = categoryInfo[category];
              const Icon = info.icon;
              const categoryResources = groupedResources[category];

              if (categoryResources.length === 0) return null;

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${info.color} text-white rounded-2xl p-6 mb-6 shadow-xl`}>
                    <div className="flex items-center gap-4 mb-2">
                      <Icon className="w-8 h-8" />
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold">{info.title}</h2>
                        {info.titleAr && (
                          <p className="text-sm opacity-90" dir="rtl" style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}>
                            {info.titleAr}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-blue-100">{info.description}</p>
                    <div className="mt-2 text-sm opacity-75">
                      {categoryResources.length} recurso{categoryResources.length !== 1 ? 's' : ''} disponible{categoryResources.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Resources Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
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
