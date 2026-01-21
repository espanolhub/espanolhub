import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/admin-users';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-auth')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Decode token
    try {
      const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if session is expired (7 days)
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (Date.now() - sessionData.timestamp > maxAge) {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        );
      }

      // Get user
      const user = getUserById(sessionData.id);

      if (!user || user.role !== 'admin') {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        );
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (e) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}