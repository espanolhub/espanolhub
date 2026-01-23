import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/admin-users';

/**
 * API Route لجلب جميع المستخدمين
 * يتطلب مصادقة admin
 */
export async function GET(request: NextRequest) {
  try {
    // التحقق من المصادقة
    const token = request.cookies.get('admin-auth')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // فك تشفير token
    try {
      const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // التحقق من انتهاء الجلسة (7 أيام)
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (Date.now() - sessionData.timestamp > maxAge) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // التحقق من أن المستخدم هو admin
      if (sessionData.role !== 'admin') {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      // جلب جميع المستخدمين
      const users = await getAllUsers();

      // إرجاع المستخدمين بدون كلمات المرور
      const usersWithoutPasswords = users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      return NextResponse.json(usersWithoutPasswords);
    } catch (e) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
