 'use client';

import { useState, useMemo, useEffect } from 'react';
import { BookOpen, Gamepad2, FileText, MessageSquare, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { games } from '@/lib/data/games';
import { vocabulary } from '@/lib/data/vocabulary';
import { readingLessons } from '@/lib/data/reading';
import { dialogues } from '@/lib/data/dialogues';
import { nacionalidadLessons } from '@/lib/data/nacionalidad-lessons';
import * as lessonService from '@/lib/services/lessonService';
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

type ContentType = 'all' | 'games' | 'vocabulary' | 'lessons' | 'dialogues';

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  category?: string;
  level?: string;
  itemCount?: number;
  data: any;
}

export default function ContentManagement() {
  const [selectedType, setSelectedType] = useState<ContentType>('all');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [lessonsManagerOpen, setLessonsManagerOpen] = useState(false);
  const [allLessonsCount, setAllLessonsCount] = useState(0);

  const categories = [
    { id: 'all', label: 'Todos', icon: FileText },
    { id: 'games', label: 'Juegos', icon: Gamepad2 },
    { id: 'vocabulary', label: 'Vocabulario', icon: BookOpen },
    { id: 'lessons', label: 'Lecciones de Lectura', icon: BookOpen },
    { id: 'dialogues', label: 'Diálogos', icon: MessageSquare },
  ];

  // Convertir datos reales a lista unificada
  const allContent: ContentItem[] = useMemo(() => {
    const items: ContentItem[] = [];

    // Juegos
    games.forEach(game => {
      items.push({
        id: game.id,
        type: 'games',
        title: game.name,
        itemCount: game.questions.length,
        data: game,
      });
    });

    // Vocabulario - agrupar por categoría
    const vocabCategories = Array.from(new Set(vocabulary.map(v => v.category)));
    vocabCategories.forEach(category => {
      const vocabInCategory = vocabulary.filter(v => v.category === category);
      items.push({
        id: `vocab-${category}`,
        type: 'vocabulary',
        title: `Vocabulario: ${category}`,
        category: category,
        itemCount: vocabInCategory.length,
        data: vocabInCategory,
      });
    });

    // Lecciones de lectura
    readingLessons.forEach(lesson => {
      items.push({
        id: lesson.id,
        type: 'lessons',
        title: lesson.title,
        level: lesson.level,
        itemCount: lesson.exercises.length,
        data: lesson,
      });
    });

    // Diálogos - agrupar por categoría
    const dialogueCategories = Array.from(new Set(dialogues.map(d => d.category)));
    dialogueCategories.forEach(category => {
      const dialoguesInCategory = dialogues.filter(d => d.category === category);
      items.push({
        id: `dialogue-${category}`,
        type: 'dialogues',
        title: `Diálogos: ${category}`,
        category: category,
        itemCount: dialoguesInCategory.length,
        data: dialoguesInCategory,
      });
    });

    return items;
  }, []);

  const filteredContent = selectedType === 'all'
    ? allContent
    : allContent.filter(item => item.type === selectedType);

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const handleView = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const getContentPreview = (item: ContentItem) => {
    switch (item.type) {
      case 'games':
        return `Preguntas: ${item.itemCount}`;
      case 'vocabulary':
        return `Palabras: ${item.itemCount}`;
      case 'lessons':
        return `Nivel: ${item.level} | Ejercicios: ${item.itemCount}`;
      case 'dialogues':
        return `Diálogos: ${item.itemCount}`;
      default:
        return '';
    }
  };

  if (selectedItem) {
    return (
      <ContentEditor item={selectedItem} onClose={handleCloseModal} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Contenido Educativo</h2>
          <p className="text-gray-600">Gestionar y editar todo el contenido educativo de español</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">Lessons total: <strong>{allLessonsCount}</strong></div>
          <button onClick={() => setLessonsManagerOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium">
            <Plus className="w-5 h-5" />
            <span>Administrar Lecciones</span>
          </button>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedType(category.id as ContentType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedType === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Lessons Manager Modal */}
      {lessonsManagerOpen && (
        <LessonsManager onClose={() => { setLessonsManagerOpen(false); lessonService.fetchAllLessons().then(r => setAllLessonsCount(r.lessons.length)); }} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Juegos</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {allContent.filter(c => c.type === 'games').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Categorías de Vocabulario</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {allContent.filter(c => c.type === 'vocabulary').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Lecciones de Lectura</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {allContent.filter(c => c.type === 'lessons').length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Categorías de Diálogos</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {allContent.filter(c => c.type === 'dialogues').length}
          </div>
        </div>
      </div>

    {/* Lessons List and existing content list below */}
    <LessonsSummary />

      {/* Content List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {categories.find(c => c.id === item.type)?.label || item.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {getContentPreview(item)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleView(item)}
                      className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md transition-colors mr-2 font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                    <button 
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors font-medium flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Editor de contenido
function ContentEditor({ item, onClose }: { item: ContentItem; onClose: () => void }) {
  const typeLabels: Record<ContentType, string> = {
    all: 'Todos',
    games: 'Juegos',
    vocabulary: 'Vocabulario',
    lessons: 'Lecciones de Lectura',
    dialogues: 'Diálogos',
  };
  const [title, setTitle] = useState(item.title || '');
  const initialContent = typeof item.data === 'string' ? item.data : (item.data ? JSON.stringify(item.data, null, 2) : '');
  const [content, setContent] = useState(initialContent);

  const handleSave = async () => {
    try {
      // Determine source if this is a lesson-like item
      if (item.id.startsWith('const') || item.id.startsWith('cultura') || item.id.startsWith('historia') || item.id.startsWith('geografia') || item.id.startsWith('c')) {
        await lessonService.upsertLesson('nacionalidad', { id: item.id, title, content, category: (item as any).category || 'custom' });
      } else if (item.id.startsWith('ch-')) {
        await lessonService.upsertLesson('driving', { id: item.id, title, content, category: (item as any).category || 'general' });
      } else {
        // fallback to nacionalidad
        await lessonService.upsertLesson('nacionalidad', { id: item.id, title, content, category: (item as any).category || 'custom' });
      }
      onClose();
    } catch (e) {
      console.error(e);
      alert('Error saving content');
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Editar: {item.title}</h2>
            <div className="text-xs text-gray-500">{typeLabels[item.type]}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-2 rounded bg-gray-100">Cerrar</button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Título</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full mt-2 mb-4 p-2 border rounded" />
            <label className="text-sm font-medium">Contenido (Markdown)</label>
            <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={18} className="w-full mt-2 p-3 border rounded font-mono" />
          </div>
          <div>
            <label className="text-sm font-medium">Vista previa</label>
            <div className="p-3 border rounded bg-gray-50 overflow-auto max-h-[70vh]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-end gap-2 border-t">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

// Lightweight Lessons Manager components
function LessonsSummary() {
	const [lessons, setLessons] = useState<any[]>([]);

	useEffect(() => {
		let mounted = true;
		lessonService.fetchAllLessons().then(r => {
			if (!mounted) return;
			setLessons(r.lessons || []);
		});
		const onUpdate = () => {
			lessonService.fetchAllLessons().then(r => {
				if (!mounted) return;
				setLessons(r.lessons || []);
			});
		};
		window.addEventListener('lessonsUpdated', onUpdate as EventListener);
		return () => { mounted = false; window.removeEventListener('lessonsUpdated', onUpdate as EventListener); };
	}, []);

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<h3 className="text-lg font-semibold mb-3">Lecciones (Nacionalidad & Driving)</h3>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="bg-gray-50">
						<tr>
							<th className="p-3 text-left">ID</th>
							<th className="p-3 text-left">Título</th>
							<th className="p-3 text-left">Categoría</th>
							<th className="p-3 text-left">Origen</th>
						</tr>
					</thead>
					<tbody>
						{lessons.map((l:any) => (
							<tr key={l.id} className="border-t">
								<td className="p-3 font-mono text-xs text-gray-700">{l.id}</td>
								<td className="p-3">{l.title}</td>
								<td className="p-3 text-gray-600">{l.category || '-'}</td>
								<td className="p-3 text-gray-600">{l._source}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function LessonsManager({ onClose }: { onClose: () => void }) {
  const [nac, setNac] = useState<any[]>([]);
  const [drv, setDrv] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let mounted = true;
    lessonService.fetchLessonsBySource('nacionalidad').then(r => { if (mounted) setNac(r); });
    lessonService.fetchLessonsBySource('driving').then(r => { if (mounted) setDrv(r); });
    const onUpdate = () => {
      lessonService.fetchLessonsBySource('nacionalidad').then(r => { if (mounted) setNac(r); });
      lessonService.fetchLessonsBySource('driving').then(r => { if (mounted) setDrv(r); });
    };
    window.addEventListener('lessonsUpdated', onUpdate as EventListener);
    return () => { mounted = false; window.removeEventListener('lessonsUpdated', onUpdate as EventListener); };
  }, []);

  const combined = [...nac.map(l=>({...l, _source:'nacionalidad'})), ...drv.map(l=>({...l, _source:'driving'}))].filter(it => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (it.title || '').toLowerCase().includes(q) || (it.category || '').toLowerCase().includes(q) || (it._source || '').toLowerCase().includes(q);
  });

  const openNew = (source: 'nacionalidad' | 'driving') => {
    setEditing({ id: `${source}-${Date.now()}`, title: '', content: '', category: source === 'nacionalidad' ? 'custom' : 'general', _source: source});
    setIsNew(true);
  };

  const handleEdit = (item:any) => {
    setEditing(item);
    setIsNew(false);
  };

  const handleDelete = async (item:any) => {
    if (!confirm(`Eliminar lección ${item.title} (${item.id})? Esta acción es irreversible.`)) return;
    await lessonService.deleteLesson(item._source === 'nacionalidad' ? 'nacionalidad' : 'driving', item.id);
    if (item._source === 'nacionalidad') setNac(prev => prev.filter((l:any)=>l.id !== item.id));
    else setDrv(prev => prev.filter((l:any)=>l.id !== item.id));
  };

  const saveEditing = async () => {
    if (!editing) return;
    await lessonService.upsertLesson(editing._source === 'nacionalidad' ? 'nacionalidad' : 'driving', editing);
    // update local state instantly
    if (editing._source === 'nacionalidad') {
      setNac(prev => {
        const idx = prev.findIndex((l:any)=>l.id === editing.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = editing;
          return copy;
        }
        return [...prev, editing];
      });
    } else {
      setDrv(prev => {
        const idx = prev.findIndex((l:any)=>l.id === editing.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = editing;
          return copy;
        }
        return [...prev, editing];
      });
    }
    setEditing(null);
    setIsNew(false);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/40 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-auto max-h-[92vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Lesson Manager</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => openNew('nacionalidad')} className="px-3 py-2 bg-blue-600 text-white rounded">New CCSE</button>
            <button onClick={() => openNew('driving')} className="px-3 py-2 bg-yellow-600 text-white rounded">New Driving</button>
            <button onClick={onClose} className="px-3 py-2 bg-gray-100 rounded">Close</button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="mb-3 flex gap-2">
              <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder="Search by title, category or source..." className="w-full p-2 border rounded" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Título</th>
                    <th className="p-3 text-left">Origen</th>
                    <th className="p-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {combined.map(l => (
                    <tr key={l.id} className="border-t">
                      <td className="p-2 font-mono text-xs">{l.id}</td>
                      <td className="p-2">{l.title}</td>
                      <td className="p-2 text-gray-600">{l._source}</td>
                      <td className="p-2">
                        <button onClick={()=>handleEdit(l)} className="px-3 py-1 mr-2 bg-blue-50 text-blue-600 rounded">Editar</button>
                        <button onClick={()=>handleDelete(l)} className="px-3 py-1 bg-red-50 text-red-600 rounded">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
          <div className="bg-white p-3 rounded border">
            <h4 className="font-semibold mb-2">{editing ? 'Editar lección' : 'Seleccione una lección'}</h4>
            {editing ? (
              <>
                <label className="text-xs">ID</label>
                <input value={editing.id} readOnly className="w-full p-2 mb-2 border rounded bg-gray-50 font-mono text-xs" />
                <label className="text-xs">Título</label>
                <input value={editing.title} onChange={(e)=>setEditing({...editing, title: e.target.value})} className="w-full p-2 mb-2 border rounded" />
                <label className="text-xs">Categoría</label>
                <input value={editing.category} onChange={(e)=>setEditing({...editing, category: e.target.value})} className="w-full p-2 mb-2 border rounded" />
                <label className="text-xs">Contenido (Markdown) - Live Preview</label>
                <div className="grid grid-cols-1 gap-2">
                  <textarea value={editing.content} onChange={(e)=>setEditing({...editing, content: e.target.value})} rows={10} className="w-full p-2 border rounded mb-2 font-mono" />
                  <div className="p-2 border rounded bg-gray-50">
                    <div className="prose max-w-none"><ReactMarkdown>{editing.content}</ReactMarkdown></div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={()=>{ setEditing(null); setIsNew(false); }} className="px-3 py-2 bg-gray-100 rounded">Cancelar</button>
                  <button onClick={saveEditing} className="px-3 py-2 bg-blue-600 text-white rounded">Guardar</button>
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Seleccione una fila para editar o cree una nueva lección.</div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}