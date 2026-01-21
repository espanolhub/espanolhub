'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ArrowUpDown,
  Flag
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
  read: boolean;
  replied: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMessages();
    // Refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact-messages');
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/contact-messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'mark-read' }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      await fetch('/api/contact-messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'mark-replied' }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking as replied:', error);
    }
  };

  const updatePriority = async (id: string, priority: 'low' | 'medium' | 'high') => {
    try {
      await fetch('/api/contact-messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'update-priority', priority }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje?')) return;
    
    try {
      await fetch(`/api/contact-messages?id=${id}`, {
        method: 'DELETE',
      });
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread' && msg.read) return false;
    if (filter === 'replied' && !msg.replied) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.subject?.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const repliedCount = messages.filter(m => m.replied).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Cargando mensajes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Mensajes de Contacto</h2>
            <p className="text-blue-100 mt-1">Gestiona las consultas de los usuarios</p>
          </div>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
          >
            🔄 Actualizar
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Mail className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{messages.length}</div>
            <div className="text-sm text-blue-100">Total Mensajes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <MailOpen className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{unreadCount}</div>
            <div className="text-sm text-blue-100">Sin Leer</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <CheckCircle2 className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{repliedCount}</div>
            <div className="text-sm text-blue-100">Respondidos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Clock className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{messages.length - repliedCount}</div>
            <div className="text-sm text-blue-100">Pendientes</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, email o mensaje..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sin Leer ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('replied')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'replied'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Respondidos ({repliedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages */}
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">No hay mensajes</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.read) markAsRead(msg.id);
                }}
                className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                  selectedMessage?.id === msg.id ? 'ring-2 ring-blue-500' : ''
                } ${!msg.read ? 'border-l-4 border-blue-500' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {!msg.read ? (
                      <Mail className="w-5 h-5 text-blue-600" />
                    ) : (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="font-bold text-gray-900">{msg.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {msg.replied && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                        ✓ Respondido
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold border ${getPriorityColor(msg.priority)}`}>
                      {msg.priority === 'high' ? '⚡' : msg.priority === 'low' ? '➖' : '●'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{msg.email}</p>
                
                {msg.subject && (
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Asunto: {msg.subject}
                  </p>
                )}
                
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                  {msg.message}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(msg.timestamp).toLocaleString('es-ES')}</span>
                  <span className="font-medium text-blue-600">Ver más →</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="sticky top-4">
          {selectedMessage ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedMessage.name}</h3>
                  <a 
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    {selectedMessage.email}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {selectedMessage.subject && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Asunto:</p>
                  <p className="text-gray-900 font-medium">{selectedMessage.subject}</p>
                </div>
              )}

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Mensaje:</p>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="border-t pt-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Recibido:</strong> {new Date(selectedMessage.timestamp).toLocaleString('es-ES')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Estado:</strong> {selectedMessage.read ? 'Leído' : 'No leído'}
                  {selectedMessage.replied && ' • Respondido'}
                </p>
              </div>

              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Prioridad:
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => updatePriority(selectedMessage.id, priority)}
                      className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                        selectedMessage.priority === priority
                          ? priority === 'high'
                            ? 'bg-red-500 text-white'
                            : priority === 'medium'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {priority === 'high' ? '⚡ Alta' : priority === 'medium' ? '● Media' : '➖ Baja'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Tu mensaje'}`}
                  onClick={() => markAsReplied(selectedMessage.id)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Responder
                </a>
                {!selectedMessage.replied && (
                  <button
                    onClick={() => markAsReplied(selectedMessage.id)}
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all"
                  >
                    ✓ Marcar Respondido
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-500">
                Selecciona un mensaje para ver los detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
