# ⚡ إعداد سريع: قاعدة البيانات

## الخطوات (في Terminal)

### 1️⃣ تثبيت tsx (للتشغيل scripts)
```bash
npm install -D tsx
```

### 2️⃣ إضافة DATABASE_URL في .env.local

أنشئ أو افتح `.env.local` وأضف:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**⚠️ مهم:** احصل على Connection String من:
- Vercel → Settings → Environment Variables → DATABASE_URL
- أو Supabase → Settings → Database → Connection string

### 3️⃣ إنشاء الجداول
```bash
npx prisma migrate dev --name init
```

### 4️⃣ توليد Prisma Client
```bash
npx prisma generate
```

### 5️⃣ إضافة المستخدمين الافتراضيين
```bash
npm run db:seed
```

---

## ✅ بعد ذلك:

1. ✅ قاعدة البيانات جاهزة
2. ✅ المستخدمون محفوظون
3. ✅ جرب `/login` - يجب أن يعمل!

---

**للمزيد:** راجع `DATABASE_SETUP_GUIDE.md`
