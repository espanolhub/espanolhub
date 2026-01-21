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
    username: 'esconabdou',
    email: 'esconabdou@gmail.com',
    password: 'Esconabdou123', // كلمة مرور المستخدم
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'boutibderrahim',
    email: 'boutibderrahim@gmail.com',
    password: 'Boutibderrahim123', // يمكن تغييرها لاحقاً
    role: 'admin',
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
  return users.find(user => user.email === email.toLowerCase());
}

/**
 * التحقق من صحة بيانات تسجيل الدخول
 */
export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email);
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

/**
 * التحقق من أن المستخدم هو admin
 */
export function isAdmin(user: User | null): boolean {
  return user !== null && user.role === 'admin';
}