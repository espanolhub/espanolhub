/**
 * Contact Messages Storage (In-memory for now)
 * In production, use a database like PostgreSQL or MongoDB
 */

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
  read: boolean;
  replied: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

// In-memory storage (replace with database in production)
let messages: ContactMessage[] = [];

export function getMessages(): ContactMessage[] {
  return messages.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function addMessage(message: Omit<ContactMessage, 'id' | 'timestamp' | 'read' | 'replied' | 'priority'>): ContactMessage {
  const newMessage: ContactMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    read: false,
    replied: false,
    priority: 'medium',
  };
  
  messages.push(newMessage);
  return newMessage;
}

export function markAsRead(id: string): void {
  const message = messages.find(m => m.id === id);
  if (message) {
    message.read = true;
  }
}

export function markAsReplied(id: string): void {
  const message = messages.find(m => m.id === id);
  if (message) {
    message.replied = true;
  }
}

export function updatePriority(id: string, priority: ContactMessage['priority']): void {
  const message = messages.find(m => m.id === id);
  if (message) {
    message.priority = priority;
  }
}

export function deleteMessage(id: string): void {
  messages = messages.filter(m => m.id !== id);
}

export function getUnreadCount(): number {
  return messages.filter(m => !m.read).length;
}

export function getMessageById(id: string): ContactMessage | undefined {
  return messages.find(m => m.id === id);
}
