# 💳 دليل تكامل نظام الدفع الكامل
# Complete Payment Integration Guide

## 🎯 الهدف
تمكين المستخدمين من:
1. **التسجيل** في الموقع
2. **الاشتراك** في الخطط المدفوعة
3. **الدفع** بأمان عبر PayPal أو Stripe

---

## 📦 البنية الحالية للنظام

```
النظام الحالي:
├── المصادقة (Authentication)
│   ├── للمسؤولين: Prisma + bcrypt ✅
│   └── للزبائن: Clerk (معطل) ⚠️
│
├── الدفع (Payment)
│   ├── PayPal: جاهز للتفعيل 🟡
│   └── Stripe: جاهز للتفعيل 🟡
│
└── الاشتراكات (Subscriptions)
    ├── تتبع الاشتراكات: ✅
    ├── Webhooks: ✅
    └── إدارة الحسابات: ✅
```

---

## 🔑 الحل 1: نظام بسيط (بدون Clerk)

### المميزات:
- ✅ لا يحتاج خدمات خارجية
- ✅ كل شيء في قاعدة البيانات الخاصة بك
- ✅ سيطرة كاملة على البيانات
- ❌ يحتاج تطوير إضافي للميزات المتقدمة

### الخطوات:

#### 1. تحديث Prisma Schema:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      String   @default("user")
  username  String?
  isPro     Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  subscription Subscription?
  
  @@map("users")
}

model Subscription {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  
  planId            String   // "free", "premium-monthly", "premium-annual"
  status            String   // "active", "cancelled", "expired"
  paymentMethod     String?  // "paypal", "stripe", "free"
  
  currentPeriodEnd  DateTime?
  cancelAtPeriodEnd Boolean  @default(false)
  
  paypalSubscriptionId String?
  stripeSubscriptionId String?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@map("subscriptions")
}
```

#### 2. إنشاء صفحة التسجيل للمستخدمين:

**الملف:** `app/register/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al registrarse');
        return;
      }

      // تسجيل دخول تلقائي بعد التسجيل
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (loginRes.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">
            Únete a miles de estudiantes
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                minLength={8}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-semibold">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

#### 3. إنشاء API للتسجيل:

**الملف:** `app/api/auth/register/route.ts`

```typescript
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

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // إنشاء المستخدم
    const user = await createUser({
      email,
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

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

#### 4. تحديث SubscriptionButton:

**الملف:** `components/SubscriptionButton.tsx`

```typescript
'use client';

import { useState } from 'react';

export default function SubscriptionButton({ 
  planId = 'premium-monthly',
  amount = '9.99' 
}: { 
  planId?: string; 
  amount?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // التحقق من تسجيل الدخول
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();

      if (!authData.authenticated) {
        // إعادة توجيه لصفحة التسجيل
        window.location.href = '/register?redirect=/pricing';
        return;
      }

      // إنشاء جلسة دفع
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, amount }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Error al procesar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Comenzar Ahora'}
      </button>
      <p className="text-center text-sm text-white/80 mt-2">
        🔒 Pago seguro • ❌ Cancela cuando quieras
      </p>
    </div>
  );
}
```

#### 5. تحديث صفحة Dashboard:

**الملف:** `app/dashboard/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Crown, Calendar, CreditCard } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // التحقق من المصادقة
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();

        if (!authData.authenticated) {
          router.push('/login');
          return;
        }

        setUser(authData.user);

        // جلب بيانات الاشتراك
        const subRes = await fetch('/api/subscribers/me');
        const subData = await subRes.json();
        
        if (subData.subscription) {
          setSubscription(subData.subscription);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user?.username || user?.email}!
          </h1>
          <p className="text-gray-600">Bienvenido a tu panel de control</p>
        </div>

        {/* Subscription Status */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-8 h-8" />
                <h2 className="text-2xl font-bold">
                  {subscription?.status === 'active' ? 'Plan Premium' : 'Plan Gratis'}
                </h2>
              </div>
              {subscription?.status === 'active' ? (
                <>
                  <p className="text-purple-100 mb-1">
                    Estado: <span className="font-semibold">Activo</span>
                  </p>
                  <p className="text-purple-100">
                    Válido hasta: {new Date(subscription.currentPeriodEnd).toLocaleDateString('es-ES')}
                  </p>
                </>
              ) : (
                <p className="text-purple-100">
                  Actualiza a Premium para acceder a todo el contenido
                </p>
              )}
            </div>
            {subscription?.status !== 'active' && (
              <a
                href="/pricing"
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Actualizar
              </a>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Cursos Activos</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-gray-600 text-sm mt-1">Comienza tu primer curso</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Racha Diaria</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">0 días</p>
            <p className="text-gray-600 text-sm mt-1">Practica diariamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔑 الحل 2: نظام متقدم (مع Clerk)

### المميزات:
- ✅ مصادقة متقدمة (Social login, MFA)
- ✅ إدارة مستخدمين جاهزة
- ✅ لوحة تحكم للمدراء
- ❌ يحتاج اشتراك مدفوع بعد 10,000 مستخدم

### الخطوات:

سيتم توفير التفاصيل إذا اخترت هذا الحل.

---

## ⚡ التفعيل السريع (5 دقائق)

### لتفعيل النظام الآن:

1. **تأكد من إعداد قاعدة البيانات:**
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

2. **أضف PayPal Email في `.env`:**
```env
PAYPAL_BUSINESS_EMAIL=your-email@example.com
```

3. **فعّل زر الاشتراك:**

في `app/pricing/page.tsx` السطر 24:
```typescript
const PAYMENT_DISABLED = false; // غيّر من true إلى false
```

4. **استبدل `components/SubscriptionButton.tsx`** بالكود أعلاه

5. **أعد تشغيل السيرفر:**
```bash
npm run dev
```

---

## 📝 ملاحظات مهمة

1. **للاختبار:** استخدم PayPal Sandbox
2. **للإنتاج:** فعّل PayPal Live + HTTPS
3. **الأمان:** تأكد من تفعيل SSL على الدومين
4. **Webhooks:** اختبرها قبل النشر

---

## 🆘 المشاكل الشائعة

### المشكلة: "User not authenticated"
**الحل:** المستخدم يجب أن يسجل دخول أولاً

### المشكلة: PayPal يعيد للموقع بدون دفع
**الحل:** تأكد من إعداد Webhook URL الصحيح

---

## 📞 الدعم

إذا واجهت أي مشكلة، تأكد من:
1. DATABASE_URL صحيح
2. PAYPAL_BUSINESS_EMAIL موجود
3. Migration تم تنفيذه
4. السيرفر يعمل على HTTPS في Production
