/**
 * Contact Messages API
 * GET: Retrieve all messages
 * PATCH: Update message status
 * DELETE: Delete a message
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  getMessages, 
  markAsRead, 
  markAsReplied, 
  updatePriority, 
  deleteMessage,
  getUnreadCount 
} from '@/lib/data/contact-messages';

export async function GET(request: NextRequest) {
  try {
    const messages = getMessages();
    const unreadCount = getUnreadCount();
    
    return NextResponse.json({
      messages,
      unreadCount,
      success: true
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Error al obtener mensajes' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action, priority } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'mark-read':
        markAsRead(id);
        break;
      case 'mark-replied':
        markAsReplied(id);
        break;
      case 'update-priority':
        if (!priority) {
          return NextResponse.json(
            { error: 'Priority es requerido' },
            { status: 400 }
          );
        }
        updatePriority(id, priority);
        break;
      default:
        return NextResponse.json(
          { error: 'Acción no válida' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Error al actualizar mensaje' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    deleteMessage(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Error al eliminar mensaje' },
      { status: 500 }
    );
  }
}
