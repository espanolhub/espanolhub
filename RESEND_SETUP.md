# 📧 إعداد Resend - دليل كامل

## ✅ ما تم إنجازه

تم تثبيت وإعداد **Resend** بنجاح في الموقع! 🎉

### التغييرات:
1. ✅ تثبيت `resend` package
2. ✅ تعديل `/api/contact/route.ts`
3. ✅ إنشاء Email Template احترافي
4. ✅ إضافة `.env.example`

---

## 🚀 خطوات الإعداد (5 دقائق)

### **الخطوة 1: إنشاء حساب Resend** (مجاني!)

1. اذهب إلى: **https://resend.com**
2. اضغط **Sign Up** (التسجيل مجاني 100%)
3. أدخل بريدك الإلكتروني وكلمة المرور
4. تأكيد البريد الإلكتروني

**المجاني:**
- ✅ 3,000 email/شهر
- ✅ 100 email/يوم
- ✅ جميع الميزات

---

### **الخطوة 2: الحصول على API Key**

1. بعد تسجيل الدخول، اذهب إلى: **https://resend.com/api-keys**
2. اضغط **"Create API Key"**
3. أدخل اسم: `Espanol-Educativo-Production`
4. اختر Permission: **"Sending access"**
5. اضغط **"Add"**
6. **انسخ الـ API Key** (يبدأ بـ `re_...`)

⚠️ **مهم جداً:** احفظ الـ API Key في مكان آمن! لن تتمكن من رؤيته مرة أخرى!

---

### **الخطوة 3: إضافة API Key للموقع**

#### **على جهازك المحلي:**

1. في مجلد المشروع، أنشئ ملف `.env.local`:

```bash
# في Terminal:
copy .env.example .env.local
```

2. افتح `.env.local` وأضف:

```env
# Resend Configuration
RESEND_API_KEY="re_your_actual_api_key_here"
RESEND_FROM_EMAIL="onboarding@resend.dev"
CONTACT_EMAIL="your-email@example.com"
```

3. **استبدل:**
   - `re_your_actual_api_key_here` → الـ API Key الذي نسخته
   - `your-email@example.com` → البريد الذي تريد استقبال الرسائل عليه

**مثال:**
```env
RESEND_API_KEY="re_AbC123XyZ_randomstring123456"
RESEND_FROM_EMAIL="onboarding@resend.dev"
CONTACT_EMAIL="ahmed@example.com"
```

#### **على Vercel/Production:**

1. اذهب إلى: **https://vercel.com/dashboard**
2. اختر مشروعك → **Settings** → **Environment Variables**
3. أضف المتغيرات:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key`
   - اضغط **Save**
4. كرر لـ `RESEND_FROM_EMAIL` و `CONTACT_EMAIL`
5. **Redeploy** المشروع

---

### **الخطوة 4: اختبار النظام**

#### **اختبار محلي:**

1. شغّل الموقع:
```bash
npm run dev
```

2. اذهب إلى صفحة الاتصال:
```
http://localhost:3000/contact
```

3. املأ النموذج واضغط "Enviar"

4. تحقق من:
   - ✅ رسالة نجاح في الموقع
   - ✅ Email وصل لبريدك (تحقق من Spam أيضاً!)
   - ✅ في Resend Dashboard: **https://resend.com/emails**

#### **إذا لم يعمل:**

**تحقق من Terminal:**
```
✅ Email sent successfully: { id: '...' }    ← يعمل!
⚠️ RESEND_API_KEY not configured             ← أضف API Key
❌ Error sending email: ...                   ← تحقق من API Key
```

---

## 🎨 **Email Template**

تم إنشاء Template احترافي في:
```
lib/email-templates/contact-email.ts
```

**الميزات:**
- ✅ تصميم احترافي gradient blue-purple
- ✅ Responsive (يعمل على جميع الأجهزة)
- ✅ معلومات منظمة (الاسم، البريد، التاريخ، الرسالة)
- ✅ زر "الرد السريع"
- ✅ حماية من XSS
- ✅ التاريخ بتوقيت إسبانيا

**شكل الإيميل:**
```
┌─────────────────────────────────┐
│   📧 Nuevo Mensaje de Contacto  │ ← Header (gradient)
│   Español Educativo             │
├─────────────────────────────────┤
│ ⚡ Responder en 24-48 horas     │ ← Badge
├─────────────────────────────────┤
│ 👤 Nombre: Ahmed                │
│ 📧 Email: ahmed@example.com     │ ← Info box
│ 📌 Asunto: Pregunta sobre...    │
│ 🕐 Fecha: ...                   │
├─────────────────────────────────┤
│ 💬 Mensaje:                     │
│ [نص الرسالة هنا...]            │ ← Message box
├─────────────────────────────────┤
│      ✉️ Responder Ahora         │ ← CTA button
└─────────────────────────────────┘
```

---

## 🔧 **كيف يعمل؟**

### **1. المستخدم يملأ النموذج:**
```
📝 Nombre: Ahmed
📧 Email: ahmed@example.com
📌 Asunto: Pregunta
💬 Mensaje: ¿Cuánto cuesta el curso?
```

### **2. يُرسل إلى API:**
```typescript
// app/api/contact/route.ts
POST /api/contact
```

### **3. API يتحقق:**
```typescript
✅ Validation (name, email, message)
✅ Email format
✅ RESEND_API_KEY exists
```

### **4. يُرسل عبر Resend:**
```typescript
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'your-email@example.com',
  replyTo: 'ahmed@example.com',
  subject: 'Contacto: Pregunta',
  html: ContactEmailTemplate(...)
})
```

### **5. تستقبل Email احترافي:**
```
📧 في بريدك الإلكتروني!
```

---

## 📊 **Resend Dashboard**

في: **https://resend.com/emails**

**يمكنك رؤية:**
- ✅ جميع Emails المُرسلة
- ✅ حالة كل Email (Sent, Delivered, Opened)
- ✅ إحصائيات التسليم
- ✅ Logs كاملة

---

## 🔐 **الأمان**

### **ما تم تطبيقه:**

1. ✅ **Validation**: التحقق من جميع الحقول
2. ✅ **Email Format**: regex للـ email
3. ✅ **XSS Protection**: `escapeHtml()` في Template
4. ✅ **Error Handling**: التعامل مع جميع الأخطاء
5. ✅ **Environment Variables**: API Keys في `.env.local`
6. ✅ **Graceful Degradation**: يعمل حتى لو فشل Email

### **في Production:**

```typescript
// إذا فشل Email، يُسجّل ولكن يعطي المستخدم success
// لعدم إفشال التجربة
if (emailError) {
  console.error('Email failed:', emailError);
  // Still return success to user
  return { success: true, warning: 'pending' }
}
```

---

## 🎯 **التخصيص**

### **تغيير عنوان المرسل:**

بعد إضافة Domain في Resend:

```env
RESEND_FROM_EMAIL="contacto@espanol-educativo.com"
```

**خطوات إضافة Domain:**
1. في Resend: **https://resend.com/domains**
2. اضغط **"Add Domain"**
3. أدخل `espanol-educativo.com`
4. أضف DNS Records في Cloudflare/Domain provider
5. انتظر التحقق (5-10 دقائق)

### **تعديل Template:**

في `lib/email-templates/contact-email.ts`:

```typescript
// غيّر الألوان:
background: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);

// أضف شعارك:
<img src="https://your-site.com/logo.png" alt="Logo" />

// غيّر النصوص:
<h1>Your Custom Title</h1>
```

---

## 📝 **الملفات المُعدّلة**

```
✅ app/api/contact/route.ts           (تعديل كامل)
✅ lib/email-templates/contact-email.ts (جديد)
✅ .env.example                         (إضافة متغيرات)
✅ package.json                         (+ resend)
```

---

## ⚡ **الحدود (Free Plan)**

```
✅ 3,000 emails/شهر
✅ 100 emails/يوم
✅ Unlimited domains
✅ Full analytics
✅ API access
```

**إذا احتجت أكثر:**
- **Pro Plan**: $20/شهر → 50,000 emails
- **Business**: Custom pricing

---

## 🐛 **استكشاف الأخطاء**

### **خطأ: "RESEND_API_KEY not configured"**
```bash
# أضف في .env.local:
RESEND_API_KEY="re_your_key"
```

### **خطأ: "Invalid API key"**
```bash
# تحقق من:
1. API Key صحيح (يبدأ بـ re_)
2. لا توجد مسافات زائدة
3. API Key active في Dashboard
```

### **Email لا يصل:**
```bash
# تحقق من:
1. Resend Dashboard (Emails sent?)
2. Spam folder
3. CONTACT_EMAIL صحيح
4. من Console: ✅ Email sent successfully
```

### **خطأ 500:**
```bash
# افحص Terminal/Console:
console.error('Error:', ...)
# غالباً: API Key مفقود أو خاطئ
```

---

## ✨ **الميزات الإضافية**

### **1. Auto-Reply للمستخدم:**

يمكنك إضافة رد تلقائي:

```typescript
// في app/api/contact/route.ts
// بعد إرسال Email للإدارة:
await resend.emails.send({
  from: RESEND_FROM_EMAIL,
  to: email, // للمستخدم
  subject: 'Gracias por contactarnos',
  html: ThankYouEmailTemplate({ name })
});
```

### **2. Email بالعربية:**

Template يدعم العربية بالفعل:

```typescript
message: "شكراً على رسالتك..."
// سيظهر بشكل صحيح!
```

### **3. Attachments:**

```typescript
await resend.emails.send({
  // ...
  attachments: [
    {
      filename: 'guide.pdf',
      path: '/path/to/guide.pdf'
    }
  ]
});
```

---

## 📞 **الدعم**

- **Resend Docs**: https://resend.com/docs
- **Resend Discord**: https://resend.com/discord
- **API Reference**: https://resend.com/docs/api-reference

---

## ✅ **Checklist نهائي**

قبل الإطلاق:

- [ ] حساب Resend مُنشأ
- [ ] API Key مُضاف في `.env.local`
- [ ] `CONTACT_EMAIL` صحيح
- [ ] اختبار محلي ناجح
- [ ] Email Template يظهر بشكل جيد
- [ ] Environment Variables في Vercel
- [ ] اختبار في Production
- [ ] (اختياري) Domain مُضاف في Resend

---

## 🎊 **النتيجة النهائية**

### **قبل:**
```
❌ الرسائل تُطبع في console.log فقط
❌ لا تصل لأي مكان
```

### **بعد:**
```
✅ Emails احترافية تصل لبريدك
✅ Template جميل ومُنظّم
✅ Validation كامل
✅ Error handling
✅ Analytics في Dashboard
✅ Free 3000 emails/شهر!
```

---

**🎉 مبروك! نظام الإيميل جاهز تماماً!** 📧✨

**الآن: جميع رسائل "تواصل معنا" ستصل لبريدك الإلكتروني!** 🚀
