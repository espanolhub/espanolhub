# 🚀 دليل الإعداد الكامل للمشروع
# Complete Setup Guide - Español Educativo

## 📋 جدول المحتويات

1. [إعداد قاعدة البيانات](#database-setup)
2. [إعداد نظام المصادقة](#authentication-setup)
3. [إعداد نظام الدفع](#payment-setup)
4. [تفعيل نظام الاشتراكات](#subscription-activation)
5. [اختبار النظام](#testing)

---

## 1️⃣ إعداد قاعدة البيانات {#database-setup}

### المتطلبات:
- حساب على Supabase (مجاني) أو PostgreSQL محلي

### الخطوات:

#### أ) إنشاء قاعدة بيانات على Supabase:
1. اذهب إلى: https://supabase.com
2. أنشئ مشروع جديد
3. انسخ `DATABASE_URL` من Project Settings > Database > Connection String

#### ب) إضافة DATABASE_URL إلى ملف .env:
```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

#### ج) تشغيل Migration:
```bash
npm run db:generate
npm run db:migrate
```

#### د) إنشاء مستخدم Admin أول:
```bash
npm run db:seed
```

أو يدوياً عبر console:
```typescript
import { createUser } from './lib/admin-users';

await createUser({
  email: 'admin@example.com',
  password: 'your-secure-password',
  role: 'admin'
});
```

---

## 2️⃣ إعداد نظام المصادقة {#authentication-setup}

### خيار 1: نظام بسيط (الحالي - للمسؤولين فقط)
✅ **جاهز للاستخدام** - لا يحتاج إعداد إضافي

### خيار 2: Clerk (للزبائن والمسؤولين)

#### الخطوات:
1. أنشئ حساب على: https://dashboard.clerk.com
2. أنشئ تطبيق جديد (Application)
3. انسخ المفاتيح وأضفها لـ `.env`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

4. قم بتفعيل Clerk في الكود (انظر القسم التالي)

---

## 3️⃣ إعداد نظام الدفع {#payment-setup}

### خيار 1: PayPal (سهل، بدون رسوم شهرية)

#### الخطوات:
1. اذهب إلى: https://developer.paypal.com
2. أنشئ حساب Business (Sandbox للتجربة)
3. احصل على:
   - Business Email
   - Client ID
   - Client Secret

4. أضف إلى `.env`:
```env
PAYPAL_BUSINESS_EMAIL=your-business@email.com
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
```

#### PayPal Webhook Setup:
1. اذهب إلى: Apps & Credentials > My Apps
2. أضف Webhook URL:
   ```
   https://your-domain.com/api/webhooks/paypal
   ```
3. اختر الأحداث (Events):
   - Payment capture completed
   - Billing subscription created
   - Billing subscription cancelled

### خيار 2: Stripe (احترافي، رسوم أقل)

#### الخطوات:
1. اذهب إلى: https://dashboard.stripe.com
2. أنشئ حساب
3. احصل على API Keys من: Developers > API Keys

4. أضف إلى `.env`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Stripe Webhook Setup:
```bash
# تثبيت Stripe CLI للاختبار المحلي
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

للإنتاج (Production):
1. اذهب إلى: Developers > Webhooks
2. أضف Endpoint:
   ```
   https://your-domain.com/api/webhooks/stripe
   ```
3. اختر الأحداث:
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted

---

## 4️⃣ تفعيل نظام الاشتراكات {#subscription-activation}

### خيار أ) التفعيل السريع (PayPal):

#### 1. تحديث SubscriptionButton.tsx:

```typescript
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 disabled:opacity-50"
    >
      {loading ? 'Procesando...' : 'Comenzar Ahora'}
    </button>
  );
}
```

#### 2. تحديث pricing/page.tsx:
غيّر السطر 24:
```typescript
const PAYMENT_DISABLED = false; // كان true
```

### خيار ب) نظام متقدم (Clerk + Stripe):

سأقوم بإنشاء الملفات اللازمة في الخطوة التالية إذا كنت تريد هذا الحل.

---

## 5️⃣ اختبار النظام {#testing}

### اختبار تسجيل الدخول للمسؤولين:
1. تأكد من وجود مستخدم في قاعدة البيانات
2. اذهب إلى: http://localhost:3000/login
3. أدخل البيانات الصحيحة

### اختبار PayPal (Sandbox):
1. استخدم حساب PayPal Sandbox
2. اذهب إلى: http://localhost:3000/pricing
3. اضغط "Comenzar Ahora"
4. أكمل الدفع في صفحة PayPal
5. سيتم تحويلك لصفحة النجاح

### اختبار Stripe (Test Mode):
استخدم بطاقات اختبار:
- نجاح: 4242 4242 4242 4242
- فشل: 4000 0000 0000 0002
- 3D Secure: 4000 0027 6000 3184

---

## 🆘 حل المشاكل الشائعة

### مشكلة: "Credenciales inválidas"
**الحل:**
1. تأكد من وجود مستخدم في قاعدة البيانات:
   ```bash
   npm run db:studio
   ```
2. إذا لم يوجد، أنشئ واحد:
   ```bash
   npm run db:seed
   ```

### مشكلة: "PayPal not configured"
**الحل:**
- أضف `PAYPAL_BUSINESS_EMAIL` في ملف `.env`
- أعد تشغيل السيرفر

### مشكلة: Database connection failed
**الحل:**
- تحقق من صحة `DATABASE_URL`
- تأكد من الاتصال بالإنترنت
- جرب الاتصال المباشر في Prisma Studio

---

## 📞 الدعم

للمساعدة الإضافية:
- راجع الوثائق الرسمية لكل خدمة
- تواصل مع الدعم الفني للخدمة المستخدمة

---

## ✅ Checklist نهائي

قبل النشر (Production):
- [ ] DATABASE_URL مضاف في Vercel/Environment Variables
- [ ] PayPal أو Stripe مكون بالكامل
- [ ] Webhooks مفعلة ومختبرة
- [ ] حساب Admin موجود في قاعدة البيانات
- [ ] جميع المتغيرات في `.env.production` محدثة
- [ ] اختبار كامل للدفع والاشتراك
- [ ] NEXT_PUBLIC_APP_URL محدث للدومين الفعلي

---

## 🎯 الخطوات التالية الموصى بها

1. **إعداد قاعدة البيانات** (أولوية عالية)
2. **إنشاء حساب Admin** (أولوية عالية)
3. **اختيار نظام الدفع** (PayPal أو Stripe)
4. **تفعيل نظام الاشتراكات**
5. **الاختبار الشامل**
6. **النشر على Production**

---

**ملاحظة:** هذا الدليل يفترض استخدام Next.js 16 مع App Router.
