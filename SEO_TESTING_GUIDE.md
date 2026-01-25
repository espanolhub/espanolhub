# دليل اختبار إصلاحات SEO

## 1. اختبار Canonical URLs

### في المتصفح:
1. افتح الصفحة: https://www.espanolhub.com/blog
2. اضغط F12 لفتح Developer Tools
3. اذهب إلى تبويب "Elements" أو "Inspector"
4. ابحث عن `<link rel="canonical"` في `<head>`
5. يجب أن ترى: `<link rel="canonical" href="https://www.espanolhub.com/blog" />`

### باستخدام curl:
```bash
curl -s https://www.espanolhub.com/blog | grep -i canonical
```

يجب أن ترى:
```html
<link rel="canonical" href="https://www.espanolhub.com/blog"/>
```

## 2. اختبار المحتوى في HTML المصدر

### للتحقق من أن Google يمكنه قراءة المحتوى:

```bash
curl -s https://www.espanolhub.com/nacionalidad | grep -i "Derechos y Deberes"
```

يجب أن ترى النص في HTML المصدر.

### في المتصفح:
1. افتح https://www.espanolhub.com/nacionalidad
2. اضغط Ctrl+U (أو Cmd+U على Mac) لعرض المصدر
3. ابحث عن "Derechos y Deberes"
4. يجب أن ترى النص في HTML

## 3. اختبار Open Graph

### باستخدام Facebook Debugger:
1. اذهب إلى: https://developers.facebook.com/tools/debug/
2. أدخل URL: https://www.espanolhub.com/blog
3. اضغط "Debug"
4. يجب أن ترى:
   - Title: "Blog - Guías, Consejos y Recursos para Aprender Español | Espanol Hub"
   - Description: "Artículos, guías y consejos..."
   - Image: og-image.png

### باستخدام Twitter Card Validator:
1. اذهب إلى: https://cards-dev.twitter.com/validator
2. أدخل URL: https://www.espanolhub.com/blog
3. يجب أن ترى preview card صحيح

## 4. اختبار في Google Search Console

### الخطوات:
1. اذهب إلى: https://search.google.com/search-console
2. اختر موقعك: espanolhub.com
3. اذهب إلى "URL Inspection" (فحص عنوان URL)
4. أدخل URL: https://www.espanolhub.com/blog
5. اضغط "Test Live URL"
6. انتظر النتائج
7. اضغط "View Tested Page" > "More Info"
8. تحقق من:
   - ✅ Canonical URL موجود وصحيح
   - ✅ المحتوى ظاهر في HTML
   - ✅ لا توجد أخطاء في الفهرسة

### طلب إعادة الفهرسة:
1. بعد اختبار URL، اضغط "Request Indexing"
2. كرر هذا لجميع الصفحات المهمة:
   - /blog
   - /gramatica
   - /cursos
   - /juegos
   - /nacionalidad
   - /vocabulario
   - /lectura
   - /alfabeto
   - /numeros
   - /driving-license
   - /tramites

## 5. اختبار باستخدام Rich Results Test

### الخطوات:
1. اذهب إلى: https://search.google.com/test/rich-results
2. أدخل URL: https://www.espanolhub.com
3. اضغط "Test URL"
4. تحقق من:
   - ✅ Schema markup صحيح
   - ✅ لا توجد أخطاء
   - ✅ Rich results ظاهرة

## 6. اختبار Mobile-Friendly

### الخطوات:
1. اذهب إلى: https://search.google.com/test/mobile-friendly
2. أدخل URL: https://www.espanolhub.com/nacionalidad
3. اضغط "Test URL"
4. يجب أن ترى: "Page is mobile-friendly"

## 7. مراقبة النتائج

### في Google Search Console:

#### Coverage Report:
- **قبل الإصلاح:** 6 صفحات مفهرسة، 38 غير مفهرسة
- **بعد الإصلاح (متوقع):** 40+ صفحات مفهرسة

#### Duplicate Content:
- **قبل الإصلاح:** "Page en double sans URL canonique"
- **بعد الإصلاح (متوقع):** 0 صفحات مكررة

#### Search Performance:
- راقب زيادة في:
  - Impressions (الظهور)
  - Clicks (النقرات)
  - Average Position (الترتيب المتوسط)

## 8. الجدول الزمني المتوقع:

- **يوم 1-2:** Google يبدأ بإعادة فحص الصفحات
- **يوم 3-7:** زيادة في عدد الصفحات المفهرسة
- **أسبوع 2-4:** تحسن ملحوظ في نتائج البحث
- **شهر 1-2:** استقرار النتائج وتحسن مستمر

## 9. أدوات إضافية للاختبار:

### Screaming Frog SEO Spider:
- تحميل: https://www.screamingfrogseospi der.com/
- فحص الموقع بالكامل
- التحقق من canonical URLs
- اكتشاف محتوى مكرر

### Ahrefs Site Audit:
- فحص شامل للموقع
- تحليل SEO
- اكتشاف المشاكل

### Google PageSpeed Insights:
- اختبار سرعة الصفحات
- تحسينات SEO
- Core Web Vitals

## 10. Checklist للصفحات الجديدة:

عند إنشاء صفحة جديدة، تأكد من:

- [ ] إضافة `export const metadata` في page.tsx أو layout.tsx
- [ ] إضافة canonical URL باستخدام `getCanonicalUrl()`
- [ ] إضافة title (< 60 حرف)
- [ ] إضافة description (150-160 حرف)
- [ ] إضافة keywords array
- [ ] إضافة Open Graph metadata
- [ ] إضافة Twitter Card metadata
- [ ] إضافة robots meta tags
- [ ] إضافة hreflang tags (es, ar)
- [ ] إضافة الصفحة إلى sitemap.ts
- [ ] اختبار في Google Search Console
- [ ] طلب إعادة الفهرسة

## 11. مثال كامل لـ metadata:

```typescript
import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Page Title | Espanol Hub',
  description: 'Page description between 150-160 characters for optimal SEO performance.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  alternates: {
    canonical: getCanonicalUrl('/page-path'),
    languages: {
      'es': getCanonicalUrl('/page-path'),
      'ar': getCanonicalUrl('/page-path'),
    },
  },
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/page-path'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Alt text',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Page Title',
    description: 'Page description',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

---

**ملاحظة:** جميع الإصلاحات تم تطبيقها وتم اختبار البناء بنجاح. الموقع جاهز للنشر.
