/**
 * إدارة بيانات المستخدمين - مع نظام Fallback بسيط
 * يعمل بدون قاعدة بيانات إذا فشل الاتصال
 */

import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  username: string | null;
  email: string;
  password: string; // مشفر باستخدام bcrypt
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// قائمة المستخدمين الثابتة (Fallback - يعمل بدون قاعدة بيانات)
const FALLBACK_USERS: User[] = [
  {
    id: 'admin-1',
    email: 'admin@espanolhub.com',
    password: '$2b$10$dBazvdaPTkTxF6qz/a8K0u3bNkrt89V8EpxfSTDQiVVXDI.Mqx.Dm', // admin123
    role: 'admin',
    username: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'admin-2',
    email: 'esconabdou@gmail.com',
    password: '$2b$10$LlOiScysoNHG25rk0sxx6.UVLayYmr9om7FaSCAuIuOz8XH6L3nNu', // Esconabdou123
    role: 'admin',
    username: 'esconabdou',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'admin-3',
    email: 'boutibderrahim@gmail.com',
    password: '$2b$10$4c24urplLI3zWdWzqJkEz.T2W.gemKZYhSVaJO4QJGlhuPgDZV.o6', // Admin123
    role: 'admin',
    username: 'boutibderrahim',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * البحث عن مستخدم بواسطة اسم المستخدم (مع Fallback)
 */
export async function findUserByUsername(username: string): Promise<User | null> {
  // جرب قاعدة البيانات أولاً
  try {
    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    if (user) return user as User;
  } catch (error) {
    console.log('⚠️ Database connection failed, using fallback users');
  }
  
  // Fallback: استخدام القائمة الثابتة
  return FALLBACK_USERS.find(u => u.username?.toLowerCase() === username.toLowerCase()) || null;
}

/**
 * البحث عن مستخدم بواسطة البريد الإلكتروني (مع Fallback)
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  // جرب قاعدة البيانات أولاً
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (user) return user as User;
  } catch (error) {
    console.log('⚠️ Database connection failed, using fallback users');
  }
  
  // Fallback: استخدام القائمة الثابتة
  return FALLBACK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * التحقق من صحة بيانات تسجيل الدخول (يعمل مع admin و user)
 */
export async function validateCredentials(email: string, password: string): Promise<User | null> {
  try {
    const user = await findUserByEmail(email);
    if (!user) return null;
    
    // التحقق من كلمة المرور باستخدام bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      return user; // يعيد المستخدم بغض النظر عن الدور (admin أو user)
    }
    
    return null;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
}

/**
 * الحصول على مستخدم بواسطة ID (مع Fallback)
 */
export async function getUserById(id: string): Promise<User | null> {
  // جرب قاعدة البيانات أولاً
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) return user as User;
  } catch (error) {
    console.log('⚠️ Database connection failed, using fallback users');
  }
  
  // Fallback: استخدام القائمة الثابتة
  return FALLBACK_USERS.find(u => u.id === id) || null;
}

/**
 * الحصول على جميع المستخدمين (مع Fallback)
 */
export async function getAllUsers(): Promise<User[]> {
  // جرب قاعدة البيانات أولاً
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (users && users.length > 0) return users as User[];
  } catch (error) {
    console.log('⚠️ Database connection failed, using fallback users');
  }
  
  // Fallback: استخدام القائمة الثابتة
  return [...FALLBACK_USERS];
}

/**
 * التحقق من أن المستخدم هو admin
 */
export function isAdmin(user: User | null): boolean {
  return user !== null && user.role === 'admin';
}

/**
 * إنشاء مستخدم جديد (للاستخدام في scripts أو admin panel)
 */
export async function createUser(data: {
  email: string;
  password: string;
  role?: string;
  username?: string;
}): Promise<User | null> {
  try {
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: data.role || 'user',
        username: data.username || null,
      },
    });
    return user as User;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}
