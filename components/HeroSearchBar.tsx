'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué quieres aprender hoy? (ماذا تريد أن تتعلم اليوم؟)"
          className="w-full pl-6 pr-14 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 shadow-lg bg-white"
          dir="ltr"
        />
        <button
          type="submit"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
