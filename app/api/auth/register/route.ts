import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/admin-users';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;

    // التحقق من البيانات
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    // التحقق من طول كلمة المرور
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // إنشاء المستخدم
    const user = await createUser({
      email: email.toLowerCase(),
      password,
      username: username || null,
      role: 'user', // مستخدم عادي وليس admin
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Este correo electrónico ya está registrado' },
        { status: 409 }
      );
    }

    // إرجاع بيانات المستخدم (بدون كلمة المرور)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // التعامل مع أخطاء قاعدة البيانات
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Este correo electrónico ya está registrado' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
