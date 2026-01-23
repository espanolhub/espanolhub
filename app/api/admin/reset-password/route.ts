/**
 * API endpoint لإعادة تعيين كلمة مرور الأدمن
 * ⚠️ هذا endpoint مؤقت - يجب حذفه بعد الاستخدام
 * 
 * الاستخدام: POST /api/admin/reset-password
 * Body: { "secret": "RESET_SECRET_KEY", "email": "esconabdou@gmail.com", "newPassword": "Esconabdou123." }
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Secret key للحماية - يجب تغييره أو حذف هذا endpoint بعد الاستخدام
const RESET_SECRET = process.env.ADMIN_RESET_SECRET || 'TEMPORARY_RESET_SECRET_CHANGE_ME';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, email, newPassword } = body;

    // التحقق من Secret Key
    if (secret !== RESET_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid secret key' },
        { status: 401 }
      );
    }

    // التحقق من البيانات
    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // التحقق من وجود المستخدم
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (!user) {
      // إنشاء مستخدم جديد إذا لم يكن موجوداً
      const newUser = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'admin',
          username: email.split('@')[0],
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Admin user created successfully',
        email: newUser.email,
        role: newUser.role,
      });
    }

    // تحديث كلمة المرور
    const updatedUser = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        password: hashedPassword,
        role: 'admin', // التأكد من أن الدور هو admin
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
