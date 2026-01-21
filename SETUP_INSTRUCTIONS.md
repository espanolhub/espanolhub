# تعليمات الإعداد - Setup Instructions

## ⚙️ متغيرات البيئة المطلوبة (Required Environment Variables)

أنشئ ملف `.env.local` في جذر المشروع مع المتغيرات التالية:

```env
# Google Analytics 4
# احصل على ID من: https://analytics.google.com/
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# NextAuth (موجود بالفعل)
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Email Service (اختياري - للإنتاج فقط)
# اختر واحدة من الخيارات التالية:

# Option 1: SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

# Option 2: Resend (موصى به - أسهل)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Option 3: Nodemailer (مع SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## 📱 إعداد PWA (Progressive Web App)

### إنشاء الأيقونات المطلوبة:

1. **استخدم أداة PWA Asset Generator**:
   ```bash
   npx @vite-pwa/assets-generator --preset minimal public/logo.png
   ```
   
   أو استخدم موقع: https://www.pwabuilder.com/imageGenerator

2. **الأيقونات المطلوبة** (في مجلد `/public/`):
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)

3. **أيقونات Apple** (اختياري):
   - `apple-touch-icon.png` (180x180 pixels)

---

## ✅ التحقق من الإعداد (Verification Checklist)

### 1. Google Analytics
- [ ] إضافة `NEXT_PUBLIC_GA_MEASUREMENT_ID` في `.env.local`
- [ ] فتح الموقع والتحقق من وجود Cookie Consent Banner
- [ ] الموافقة على Analytics Cookies
- [ ] التحقق من Google Analytics Dashboard (قد يستغرق 24-48 ساعة)

### 2. Cookies Consent
- [ ] يظهر Banner عند أول زيارة
- [ ] يمكن الموافقة/الرفض
- [ ] يمكن فتح الإعدادات
- [ ] التفضيلات محفوظة بعد إعادة تحميل الصفحة

### 3. Social Media
- [ ] أزرار المشاركة تظهر في Footer
- [ ] كل زر يعمل (يفتح نافذة جديدة)
- [ ] Copy Link يعمل
- [ ] Native Share يعمل على الموبايل

### 4. Email Functionality
- [ ] نموذج الاتصال يعمل (`/contact`)
- [ ] API Route موجود (`/api/contact`)
- [ ] في الإنتاج: إضافة SendGrid/Resend API Key
- [ ] اختبار إرسال رسالة

### 5. PWA
- [ ] `manifest.json` موجود
- [ ] أيقونات موجودة (`icon-192.png`, `icon-512.png`)
- [ ] يمكن إضافة الموقع إلى الشاشة الرئيسية (Mobile)
- [ ] يعمل في وضع Offline (بعد إضافة Service Worker)

### 6. Error Tracking
- [ ] Errors يتم logging في Console (Development)
- [ ] في الإنتاج: إضافة Sentry (اختياري)

### 7. Performance
- [ ] `next.config.ts` يحتوي على تحسينات الأداء
- [ ] Images محسّنة (AVIF/WebP)
- [ ] Caching headers موجودة

### 8. Legal Compliance
- [ ] Privacy Policy محدّث (يحتوي على معلومات Cookies و GDPR)
- [ ] Terms of Service موجود
- [ ] Cookie Consent يعمل
- [ ] جميع الروابط القانونية تعمل

---

## 🚀 خطوات النشر (Deployment Steps)

### 1. قبل النشر:

```bash
# تأكد من أن البناء ينجح
npm run build

# اختبار محلي
npm run start
```

### 2. إعدادات الإنتاج:

1. **Environment Variables**:
   - أضف جميع المتغيرات في منصة الاستضافة
   - تأكد من تغيير `NEXTAUTH_SECRET` في الإنتاج

2. **Google Analytics**:
   - أنشئ property جديد في GA4
   - أضف `NEXT_PUBLIC_GA_MEASUREMENT_ID` الصحيح

3. **Email Service**:
   - سجّل في SendGrid أو Resend
   - أضف API Key
   - حدّث `app/api/contact/route.ts` إذا لزم الأمر

4. **PWA Icons**:
   - أنشئ الأيقونات المطلوبة
   - ضعها في `/public/`

5. **Error Tracking** (اختياري):
   - سجّل في Sentry
   - حدّث `lib/utils/errorTracking.ts`

### 3. بعد النشر:

- [ ] اختبر Cookie Consent
- [ ] اختبر Google Analytics
- [ ] اختبر نموذج الاتصال
- [ ] اختبر Social Share
- [ ] اختبر PWA (إضافة إلى الشاشة الرئيسية)
- [ ] مراجعة Privacy Policy و Terms

---

## 📚 الموارد الإضافية (Additional Resources)

### Google Analytics:
- https://analytics.google.com/
- https://developers.google.com/analytics/devguides/collection/ga4

### Email Services:
- SendGrid: https://sendgrid.com/
- Resend: https://resend.com/ (موصى به)
- Nodemailer: https://nodemailer.com/

### PWA:
- PWA Builder: https://www.pwabuilder.com/
- Manifest Generator: https://manifest-gen.netlify.app/

### Error Tracking:
- Sentry: https://sentry.io/
- LogRocket: https://logrocket.com/

### GDPR Compliance:
- GDPR Checklist: https://gdpr.eu/checklist/
- Cookie Consent Guides: https://www.cookiebot.com/en/gdpr-cookies/

---

## ⚠️ ملاحظات مهمة (Important Notes)

1. **Cookies Consent**: يعمل تلقائياً ولا يحتاج إعداد إضافي

2. **Google Analytics**: لا يعمل بدون `NEXT_PUBLIC_GA_MEASUREMENT_ID`

3. **Email Service**: API Route جاهز، لكن يحتاج إعداد خدمة البريد الإلكتروني في الإنتاج

4. **PWA**: يحتاج أيقونات ليعمل بشكل كامل

5. **Error Tracking**: يعمل محلياً، لكن Sentry يحتاج إعداد منفصل

---

## 🆘 الدعم (Support)

إذا واجهت أي مشاكل:

1. تحقق من Console للأخطاء
2. تحقق من `.env.local` يحتوي على جميع المتغيرات
3. تحقق من أن `npm run build` ينجح
4. راجع ملف `IMPLEMENTATION_SUMMARY.md` للتفاصيل

---

**آخر تحديث**: 2024
