/**
 * إدارة بيانات المستخدمين باستخدام Prisma + Supabase
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

/**
 * البحث عن مستخدم بواسطة اسم المستخدم
 */
export async function findUserByUsername(username: string): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    return user as User | null;
  } catch (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
}

/**
 * البحث عن مستخدم بواسطة البريد الإلكتروني
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user as User | null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

/**
 * التحقق من صحة بيانات تسجيل الدخول
 */
export async function validateCredentials(email: string, password: string): Promise<User | null> {
  try {
    const user = await findUserByEmail(email);
    if (!user) return null;
    
    // التحقق من كلمة المرور باستخدام bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid && user.role === 'admin') {
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
}

/**
 * الحصول على مستخدم بواسطة ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user as User | null;
  } catch (error) {
    console.error('Error finding user by id:', error);
    return null;
  }
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
