# 📘 دليل استخدام المحتوى التعليمي الجديد

## مرحباً بك في Español Educativo! 🎉

هذا الدليل سيساعدك على استخدام كل المحتوى التعليمي الجديد المضاف للموقع.

---

## 📚 1. دروس القواعد (Grammar Lessons)

### كيفية الوصول:
```typescript
import { grammarLessons, getLessonsByLevel } from '@/lib/data/grammar-lessons';

// الحصول على جميع الدروس
const allLessons = grammarLessons;

// الحصول على دروس حسب المستوى
const beginnerLessons = getLessonsByLevel('beginner');
const intermediateLessons = getLessonsByLevel('intermediate');
const advancedLessons = getLessonsByLevel('advanced');
```

### الدروس المتوفرة:

#### **مبتدئ (Beginner):**
1. **gram-ser-estar**: الفعلان Ser و Estar
   - متى نستخدم كل فعل
   - التصريف الكامل
   - أمثلة عملية

2. **gram-articles**: أدوات التعريف والتنكير
   - el, la, los, las
   - un, una, unos, unas
   - قواعد الجنس والعدد

3. **gram-present-regular**: المضارع البسيط - الأفعال المنتظمة
   - أفعال -AR, -ER, -IR
   - نهايات التصريف
   - أمثلة كثيرة

#### **متوسط (Intermediate):**
4. **gram-preterito-indefinido**: الماضي البسيط
   - متى نستخدمه
   - الأفعال المنتظمة والشاذة
   - الكلمات الدالة

5. **gram-por-para**: الفرق بين Por و Para
   - جميع استخدامات Por
   - جميع استخدامات Para
   - أمثلة مقارنة

#### **متقدم (Advanced):**
6. **gram-subjuntivo-presente**: المضارع الشرطي
   - كيفية تكوينه
   - متى نستخدمه
   - العبارات الشائعة

### مثال على استخدام درس:
```typescript
const serEstarLesson = getLessonById('gram-ser-estar');

console.log(serEstarLesson.title); // "Los Verbos Ser y Estar"
console.log(serEstarLesson.titleAr); // "الفعلان Ser و Estar"
console.log(serEstarLesson.content); // المحتوى الكامل بالإسبانية
console.log(serEstarLesson.contentAr); // المحتوى الكامل بالعربية
console.log(serEstarLesson.examples); // قائمة الأمثلة
console.log(serEstarLesson.tips); // النصائح بالإسبانية
console.log(serEstarLesson.tipsAr); // النصائح بالعربية
```

---

## 🗣️ 2. الحوارات اليومية (Daily Dialogues)

### كيفية الوصول:
```typescript
import { 
  dailyDialogues, 
  getDialoguesByLevel,
  getDialoguesByCategory 
} from '@/lib/data/daily-dialogues';

// الحصول على جميع الحوارات
const allDialogues = dailyDialogues;

// الحصول على حوارات حسب المستوى
const beginnerDialogues = getDialoguesByLevel('beginner');
const intermediateDialogues = getDialoguesByLevel('intermediate');
const advancedDialogues = getDialoguesByLevel('advanced');

// الحصول على حوارات حسب الفئة
const restaurantDialogues = getDialoguesByCategory('restaurant');
const shoppingDialogues = getDialoguesByCategory('shopping');
```

### الحوارات المتوفرة:

#### **مبتدئ:**
1. **dialogue-greeting-1**: تحيات أساسية
   - مكان: في الشارع
   - 6 جمل

2. **dialogue-restaurant-1**: في المطعم
   - مكان: مطعم
   - 7 جمل

3. **dialogue-shopping-1**: شراء ملابس
   - مكان: محل ملابس
   - 12 جملة

#### **متوسط:**
4. **dialogue-doctor-1**: عند الطبيب
   - مكان: عيادة
   - 12 جملة

5. **dialogue-bank-1**: في البنك
   - مكان: بنك
   - 12 جملة

#### **متقدم:**
6. **dialogue-job-interview-1**: مقابلة عمل
   - مكان: مكتب
   - 13 جملة

### مثال على استخدام حوار:
```typescript
const greeting = getDialogueById('dialogue-greeting-1');

// عرض الحوار
greeting.lines.forEach(line => {
  console.log(`${line.speaker}: ${line.text}`);
  console.log(`${line.speakerAr}: ${line.textAr}`);
  console.log(`النطق: ${line.pronunciation}`);
  console.log('---');
});

// عرض المفردات
greeting.vocabulary.forEach(vocab => {
  console.log(`${vocab.word} = ${vocab.translation}`);
});

// عرض الملاحظات
greeting.notes.forEach((note, index) => {
  console.log(`ملاحظة ${index + 1}: ${note}`);
  console.log(`بالعربية: ${greeting.notesAr[index]}`);
});
```

---

## 📖 3. نصوص القراءة (Reading Texts)

### كيفية الوصول:
```typescript
import { 
  readingTexts,
  getTextsByLevel,
  getTextsByCategory 
} from '@/lib/data/reading-texts';

// الحصول على جميع النصوص
const allTexts = readingTexts;

// الحصول على نصوص حسب المستوى
const a1Texts = getTextsByLevel('A1');
const a2Texts = getTextsByLevel('A2');
const b1Texts = getTextsByLevel('B1');

// الحصول على نصوص حسب الفئة
const culturalTexts = getTextsByCategory('culture');
const literatureTexts = getTextsByCategory('literature');
```

### النصوص المتوفرة:

#### **A1:**
1. **read-a1-my-family**: عائلتي
   - 85 كلمة
   - 1 دقيقة
   - 5 أسئلة فهم

2. **read-a1-daily-routine**: روتيني اليومي
   - 95 كلمة
   - 1 دقيقة
   - 5 أسئلة فهم

#### **A2:**
3. **read-a2-madrid-city**: مدريد: عاصمة إسبانيا
   - 180 كلمة
   - 2 دقيقة
   - 5 أسئلة فهم

#### **B1:**
4. **read-b1-cervantes**: ميغيل دي ثيربانتيس ودون كيخوته
   - 280 كلمة
   - 3 دقائق
   - 5 أسئلة فهم

### مثال على استخدام نص:
```typescript
const familyText = getTextById('read-a1-my-family');

// عرض النص
console.log('العنوان:', familyText.title);
console.log('بالعربية:', familyText.titleAr);
console.log('المستوى:', familyText.level);
console.log('عدد الكلمات:', familyText.wordCount);
console.log('وقت القراءة:', familyText.readingTime, 'دقيقة');

console.log('\nالنص:');
console.log(familyText.text);

console.log('\nالترجمة:');
console.log(familyText.textAr);

// عرض المفردات
console.log('\nالمفردات الجديدة:');
familyText.vocabulary.forEach(vocab => {
  console.log(`${vocab.word} = ${vocab.translation}`);
  if (vocab.context) {
    console.log(`  السياق: ${vocab.context}`);
  }
});

// عرض أسئلة الفهم
console.log('\nأسئلة الفهم:');
familyText.comprehensionQuestions.forEach((q, index) => {
  console.log(`\nسؤال ${index + 1}:`);
  console.log(`${q.question}`);
  console.log(`بالعربية: ${q.questionAr}`);
  q.options.forEach((option, optIndex) => {
    console.log(`  ${optIndex}. ${option}`);
  });
  console.log(`الإجابة الصحيحة: ${q.options[q.correctAnswer]}`);
});
```

---

## 📝 4. القاموس الموسع (Dictionary)

### كيفية الوصول:
```typescript
import { 
  getDictionary,
  getDictionaryByCategory,
  getDictionaryByWord,
  searchDictionary 
} from '@/lib/data/dictionary';

// الحصول على جميع الكلمات
const allWords = getDictionary();
console.log(`إجمالي الكلمات: ${allWords.length}`);

// الحصول على كلمات حسب الفئة
const foodWords = getDictionaryByCategory('comida');
const verbWords = getDictionaryByCategory('verbos');
const familyWords = getDictionaryByCategory('familia');

// البحث عن كلمة معينة
const wordInfo = getDictionaryByWord('hablar');

// البحث في القاموس
const searchResults = searchDictionary('casa');
```

### الفئات المتوفرة:
- **comida**: طعام وشراب (70+ كلمة)
- **animales**: حيوانات (12+ كلمة)
- **familia**: العائلة (14+ كلمة)
- **cuerpo**: أجزاء الجسم (12+ كلمة)
- **ropa**: ملابس (10+ كلمة)
- **tiempo**: الوقت (10+ كلمة)
- **profesiones**: مهن (8+ كلمة)
- **lugares**: أماكن (12+ كلمة)
- **transporte**: وسائل النقل (8+ كلمة)
- **adjetivos**: صفات (16+ كلمة)
- **verbos**: أفعال (30+ كلمة)
- **colores**: ألوان (10+ كلمات)
- **numeros**: أرقام (9+ كلمات)
- **emociones**: عواطف (6+ كلمات)

### مثال على استخدام القاموس:
```typescript
// البحث عن كلمة
const palabra = getDictionaryByWord('casa');

if (palabra) {
  console.log('الكلمة:', palabra.word);
  console.log('الترجمة:', palabra.translations.join(', '));
  console.log('النطق:', palabra.pronunciation);
  console.log('مثال:', palabra.example);
  console.log('النوع:', palabra.pos); // verb, noun, adjective, etc.
  console.log('الفئة:', palabra.category);
  console.log('الوسوم:', palabra.tags.join(', '));
}

// البحث بالنص
const resultados = searchDictionary('comida');
console.log(`وجدنا ${resultados.length} نتيجة`);
resultados.forEach(result => {
  console.log(`- ${result.word}: ${result.translations.join(', ')}`);
});
```

---

## 🎯 أمثلة عملية للاستخدام

### 1. إنشاء صفحة درس قواعد:
```typescript
'use client';

import { getLessonById } from '@/lib/data/grammar-lessons';
import { useState } from 'react';

export default function LessonPage({ params }: { params: { id: string } }) {
  const lesson = getLessonById(params.id);
  const [language, setLanguage] = useState<'es' | 'ar'>('es');
  
  if (!lesson) return <div>Lección no encontrada</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {language === 'es' ? lesson.title : lesson.titleAr}
      </h1>
      
      <div className="mb-4">
        <button onClick={() => setLanguage('es')}>Español</button>
        <button onClick={() => setLanguage('ar')}>العربية</button>
      </div>
      
      <div className="prose max-w-none">
        {language === 'es' ? lesson.content : lesson.contentAr}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Ejemplos / أمثلة</h2>
        {lesson.examples.map((example, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold">{example.spanish}</p>
            <p className="text-gray-600">{example.arabic}</p>
            {example.english && <p className="text-sm">{example.english}</p>}
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Consejos / نصائح</h2>
        <ul>
          {(language === 'es' ? lesson.tips : lesson.tipsAr).map((tip, index) => (
            <li key={index} className="mb-2">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### 2. إنشاء صفحة حوار:
```typescript
'use client';

import { getDialogueById } from '@/lib/data/daily-dialogues';
import { useState } from 'react';

export default function DialoguePage({ params }: { params: { id: string } }) {
  const dialogue = getDialogueById(params.id);
  const [showTranslation, setShowTranslation] = useState(false);
  
  if (!dialogue) return <div>Diálogo no encontrado</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{dialogue.title}</h1>
      <h2 className="text-2xl text-gray-600 mb-4" dir="rtl">{dialogue.titleAr}</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded">
        <p><strong>Situación:</strong> {dialogue.situation}</p>
        <p dir="rtl"><strong>الموقف:</strong> {dialogue.situationAr}</p>
      </div>
      
      <button 
        onClick={() => setShowTranslation(!showTranslation)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showTranslation ? 'Ocultar' : 'Mostrar'} traducción
      </button>
      
      <div className="space-y-4">
        {dialogue.lines.map((line, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded">
            <p className="font-bold text-blue-600">{line.speaker}:</p>
            <p className="text-lg">{line.text}</p>
            {showTranslation && (
              <>
                <p className="text-gray-600 mt-2" dir="rtl">{line.textAr}</p>
                {line.pronunciation && (
                  <p className="text-sm text-gray-500 italic">{line.pronunciation}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Vocabulario / المفردات</h3>
        <div className="grid grid-cols-2 gap-4">
          {dialogue.vocabulary.map((vocab, index) => (
            <div key={index} className="p-3 bg-yellow-50 rounded">
              <p className="font-semibold">{vocab.word}</p>
              <p className="text-gray-600" dir="rtl">{vocab.translation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 3. إنشاء صفحة نص قراءة:
```typescript
'use client';

import { getTextById } from '@/lib/data/reading-texts';
import { useState } from 'react';

export default function ReadingPage({ params }: { params: { id: string } }) {
  const text = getTextById(params.id);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  if (!text) return <div>Texto no encontrado</div>;
  
  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{text.title}</h1>
        <h2 className="text-2xl text-gray-600 mb-4" dir="rtl">{text.titleAr}</h2>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Nivel: {text.level}</span>
          <span>Palabras: {text.wordCount}</span>
          <span>Tiempo: {text.readingTime} min</span>
        </div>
      </div>
      
      <div className="prose max-w-none mb-8">
        <div className="whitespace-pre-wrap">{text.text}</div>
      </div>
      
      <details className="mb-8">
        <summary className="cursor-pointer font-bold text-lg">
          Ver traducción / عرض الترجمة
        </summary>
        <div className="mt-4 p-4 bg-gray-50 rounded" dir="rtl">
          <div className="whitespace-pre-wrap">{text.textAr}</div>
        </div>
      </details>
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Vocabulario / المفردات</h3>
        <div className="grid grid-cols-2 gap-4">
          {text.vocabulary.map((vocab, index) => (
            <div key={index} className="p-3 bg-yellow-50 rounded">
              <p className="font-semibold">{vocab.word}</p>
              <p className="text-gray-600" dir="rtl">{vocab.translation}</p>
              {vocab.context && (
                <p className="text-sm text-gray-500 mt-1">{vocab.context}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">
          Preguntas de comprensión / أسئلة الفهم
        </h3>
        {text.comprehensionQuestions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 bg-gray-50 rounded">
            <p className="font-bold mb-2">{question.question}</p>
            <p className="text-gray-600 mb-3" dir="rtl">{question.questionAr}</p>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = oIndex === question.correctAnswer;
                const showResult = showAnswers && isSelected;
                
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    className={`w-full text-left p-3 rounded border-2 transition ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showAnswers ? 'Ocultar' : 'Verificar'} respuestas
        </button>
      </div>
    </div>
  );
}
```

---

## 💡 نصائح للاستخدام الأمثل

### 1. للطلاب:
- ✅ ابدأ بمستواك الحالي (A1, A2, etc.)
- ✅ اقرأ النصوص بصوت عالٍ لتحسين النطق
- ✅ استخدم الحوارات للممارسة مع صديق
- ✅ راجع دروس القواعد بانتظام
- ✅ استخدم القاموس للبحث عن كلمات جديدة

### 2. للمعلمين:
- ✅ استخدم الحوارات في تمارين التمثيل (Role-play)
- ✅ استخدم نصوص القراءة لاختبارات الفهم
- ✅ استخدم دروس القواعد كمواد مرجعية
- ✅ أنشئ تمارين إضافية من المفردات

### 3. للمطورين:
- ✅ جميع الدوال موثقة بالكامل
- ✅ استخدم TypeScript للحصول على autocomplete
- ✅ جميع البيانات منظمة بشكل منطقي
- ✅ يمكن إضافة محتوى جديد بسهولة

---

## 🔗 روابط مفيدة

- [التوثيق الكامل](./DEVELOPMENT_SUMMARY.md)
- [دليل المساهمة](./CONTRIBUTING.md)
- [الموقع الرسمي](https://espanol-educativo.com)

---

## 📞 الدعم

إذا كنت بحاجة إلى مساعدة:
- 📧 البريد الإلكتروني: support@espanol-educativo.com
- 💬 Discord: [رابط الديسكورد]
- 🐦 Twitter: @EspanolEducativo

---

**بالتوفيق في رحلة تعلم الإسبانية! 🎓🇪🇸**

*آخر تحديث: 21 يناير 2026*
