/**
 * إدارة بيانات المستخدمين (مؤقت - محلي)
 * في الإنتاج، يجب استبدالها بقاعدة بيانات حقيقية
 */

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // في الإنتاج، يجب تشفير كلمات المرور
  role: 'admin' | 'user';
  createdAt: string;
}

// بيانات المستخدمين الافتراضية
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@espanol-educativo.com',
    password: 'admin123', // كلمة مرور بسيطة للاختبار
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

/**
 * البحث عن مستخدم بواسطة اسم المستخدم
 */
export function findUserByUsername(username: string): User | undefined {
  return users.find(user => user.username === username);
}

/**
 * البحث عن مستخدم بواسطة البريد الإلكتروني
 */
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

/**
 * التحقق من صحة بيانات تسجيل الدخول
 */
export function validateCredentials(username: string, password: string): User | null {
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

/**
 * الحصول على مستخدم بواسطة ID
 */
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}