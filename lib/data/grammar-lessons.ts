/**
 * Comprehensive Grammar Lessons
 * Structured lessons for beginner, intermediate, and advanced learners
 */

export interface GrammarLesson {
  id: string;
  title: string;
  titleAr: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'verbs' | 'articles' | 'pronouns' | 'adjectives' | 'prepositions' | 'tenses' | 'sentence-structure';
  content: string;
  contentAr: string;
  examples: { spanish: string; arabic: string; english?: string }[];
  exercises?: { question: string; options: string[]; correctAnswer: string }[];
  tips: string[];
  tipsAr: string[];
}

export const grammarLessons: GrammarLesson[] = [
  // BEGINNER LESSONS
  {
    id: 'gram-ser-estar',
    title: 'Los Verbos Ser y Estar',
    titleAr: 'الفعلان Ser و Estar',
    level: 'beginner',
    category: 'verbs',
    content: `
# Los Verbos Ser y Estar

## ¿Cuál es la diferencia?

Ambos verbos significan "ser/estar" en español, pero se usan en contextos diferentes:

### SER (identidad, características permanentes, origen, profesión, tiempo)
- Identidad: **Soy Juan** (Yo soy Juan)
- Características: **Eres inteligente** (Tú eres inteligente)
- Origen: **Es de España** (Él/Ella es de España)
- Profesión: **Somos profesores** (Nosotros somos profesores)
- Tiempo: **Es la una** (Es la una)

### ESTAR (ubicación, estado temporal, emociones)
- Ubicación: **Estoy en casa** (Yo estoy en casa)
- Estado temporal: **Estás cansado** (Tú estás cansado)
- Emociones: **Está feliz** (Él/Ella está feliz)
- Condición: **Estamos bien** (Nosotros estamos bien)

## Conjugación Presente

### SER
- Yo **soy**
- Tú **eres**
- Él/Ella/Usted **es**
- Nosotros/Nosotras **somos**
- Vosotros/Vosotras **sois**
- Ellos/Ellas/Ustedes **son**

### ESTAR
- Yo **estoy**
- Tú **estás**
- Él/Ella/Usted **está**
- Nosotros/Nosotras **estamos**
- Vosotros/Vosotras **estáis**
- Ellos/Ellas/Ustedes **están**
    `,
    contentAr: `
# الفعلان Ser و Estar

## ما الفرق؟

كلا الفعلين يعنيان "يكون" بالعربية، لكنهما يُستخدمان في سياقات مختلفة:

### SER (الهوية، الخصائص الدائمة، الأصل، المهنة، الوقت)
- الهوية: **Soy Juan** (أنا خوان)
- الخصائص: **Eres inteligente** (أنت ذكي)
- الأصل: **Es de España** (هو/هي من إسبانيا)
- المهنة: **Somos profesores** (نحن معلمون)
- الوقت: **Es la una** (الساعة الواحدة)

### ESTAR (الموقع، الحالة المؤقتة، العواطف)
- الموقع: **Estoy en casa** (أنا في المنزل)
- الحالة المؤقتة: **Estás cansado** (أنت متعب)
- العواطف: **Está feliz** (هو/هي سعيد)
- الوضع: **Estamos bien** (نحن بخير)
    `,
    examples: [
      { spanish: 'Soy médico', arabic: 'أنا طبيب', english: 'I am a doctor' },
      { spanish: 'Estoy en el hospital', arabic: 'أنا في المستشفى', english: 'I am at the hospital' },
      { spanish: 'Eres muy amable', arabic: 'أنت لطيف جداً', english: 'You are very kind' },
      { spanish: 'Estás enfermo hoy', arabic: 'أنت مريض اليوم', english: 'You are sick today' },
      { spanish: 'Es de Madrid', arabic: 'هو من مدريد', english: 'He is from Madrid' },
      { spanish: 'Está en Madrid ahora', arabic: 'هو في مدريد الآن', english: 'He is in Madrid now' },
    ],
    tips: [
      'SER se usa para características permanentes',
      'ESTAR se usa para estados temporales',
      'Para ubicación SIEMPRE usa ESTAR',
      'Para profesiones SIEMPRE usa SER',
      'Para emociones usa ESTAR (estoy feliz, triste, enojado)',
    ],
    tipsAr: [
      'استخدم SER للخصائص الدائمة',
      'استخدم ESTAR للحالات المؤقتة',
      'للموقع دائماً استخدم ESTAR',
      'للمهن دائماً استخدم SER',
      'للعواطف استخدم ESTAR (سعيد، حزين، غاضب)',
    ],
  },
  {
    id: 'gram-articles',
    title: 'Los Artículos Definidos e Indefinidos',
    titleAr: 'أدوات التعريف والتنكير',
    level: 'beginner',
    category: 'articles',
    content: `
# Los Artículos en Español

## Artículos Definidos (el, la, los, las)

Los artículos definidos son como "el/la" en árabe (ال):

- **el** - masculino singular (el libro)
- **la** - femenino singular (la casa)
- **los** - masculino plural (los libros)
- **las** - femenino plural (las casas)

### Ejemplos:
- **El** perro (الكلب)
- **La** mesa (الطاولة)
- **Los** niños (الأطفال - مذكر)
- **Las** niñas (الفتيات)

## Artículos Indefinidos (un, una, unos, unas)

Los artículos indefinidos son como "واحد/واحدة":

- **un** - masculino singular (un libro)
- **una** - femenino singular (una casa)
- **unos** - masculino plural (unos libros)
- **unas** - femenino plural (unas casas)

### Ejemplos:
- **Un** coche (سيارة)
- **Una** silla (كرسي)
- **Unos** amigos (بعض الأصدقاء)
- **Unas** flores (بعض الزهور)

## ¿Cómo saber si es masculino o femenino?

### Generalmente Masculino:
- Palabras que terminan en **-o**: libro, perro, vaso
- Días de la semana: el lunes, el martes
- Idiomas: el español, el árabe

### Generalmente Femenino:
- Palabras que terminan en **-a**: casa, mesa, silla
- Palabras que terminan en **-ión**: lección, estación
- Palabras que terminan en **-dad/-tad**: ciudad, libertad

### Excepciones importantes:
- **el** día (masculino, aunque termina en -a)
- **la** mano (femenino, aunque termina en -o)
- **el** problema (masculino)
- **la** foto (femenino - es abreviación de fotografía)
    `,
    contentAr: `
# أدوات التعريف والتنكير

## أدوات التعريف (el, la, los, las)

تشبه "ال" التعريف بالعربية:

- **el** - مذكر مفرد
- **la** - مؤنث مفرد
- **los** - مذكر جمع
- **las** - مؤنث جمع

## أدوات التنكير (un, una, unos, unas)

- **un** - مذكر مفرد
- **una** - مؤنث مفرد
- **unos** - مذكر جمع
- **unas** - مؤنث جمع

## كيف تعرف إذا كانت الكلمة مذكر أو مؤنث؟

### عادة مذكر:
- الكلمات التي تنتهي بـ **-o**
- أيام الأسبوع
- اللغات

### عادة مؤنث:
- الكلمات التي تنتهي بـ **-a**
- الكلمات التي تنتهي بـ **-ión**
- الكلمات التي تنتهي بـ **-dad/-tad**
    `,
    examples: [
      { spanish: 'El libro es interesante', arabic: 'الكتاب مثير للاهتمام', english: 'The book is interesting' },
      { spanish: 'La casa es grande', arabic: 'المنزل كبير', english: 'The house is big' },
      { spanish: 'Los estudiantes estudian', arabic: 'الطلاب يدرسون', english: 'The students study' },
      { spanish: 'Las flores son bonitas', arabic: 'الزهور جميلة', english: 'The flowers are beautiful' },
      { spanish: 'Un hombre camina', arabic: 'رجل يمشي', english: 'A man walks' },
      { spanish: 'Una mujer habla', arabic: 'امرأة تتحدث', english: 'A woman speaks' },
    ],
    tips: [
      'Memoriza el artículo con cada palabra nueva',
      'La mayoría de palabras en -o son masculinas',
      'La mayoría de palabras en -a son femeninas',
      'Hay excepciones importantes (día, mano, problema)',
      'Los artículos SIEMPRE concuerdan en género y número',
    ],
    tipsAr: [
      'احفظ أداة التعريف مع كل كلمة جديدة',
      'معظم الكلمات التي تنتهي بـ -o مذكرة',
      'معظم الكلمات التي تنتهي بـ -a مؤنثة',
      'هناك استثناءات مهمة',
      'الأدوات دائماً تطابق في الجنس والعدد',
    ],
  },
  {
    id: 'gram-present-regular',
    title: 'Presente de Indicativo - Verbos Regulares',
    titleAr: 'المضارع البسيط - الأفعال المنتظمة',
    level: 'beginner',
    category: 'verbs',
    content: `
# Presente de Indicativo - Verbos Regulares

## Los Tres Grupos de Verbos

En español, los verbos se dividen en tres grupos según su terminación en infinitivo:

### 1. Verbos en -AR (hablar, trabajar, estudiar)
### 2. Verbos en -ER (comer, beber, leer)
### 3. Verbos en -IR (vivir, escribir, abrir)

## Conjugación de Verbos Regulares

### HABLAR (hablar)
- Yo **habl-o**
- Tú **habl-as**
- Él/Ella/Usted **habl-a**
- Nosotros/Nosotras **habl-amos**
- Vosotros/Vosotras **habl-áis**
- Ellos/Ellas/Ustedes **habl-an**

### COMER (comer)
- Yo **com-o**
- Tú **com-es**
- Él/Ella/Usted **com-e**
- Nosotros/Nosotras **com-emos**
- Vosotros/Vosotras **com-éis**
- Ellos/Ellas/Ustedes **com-en**

### VIVIR (vivir)
- Yo **viv-o**
- Tú **viv-es**
- Él/Ella/Usted **viv-e**
- Nosotros/Nosotras **viv-imos**
- Vosotros/Vosotras **viv-ís**
- Ellos/Ellas/Ustedes **viv-en**

## Patrón de Terminaciones

### -AR
| Pronombre | Terminación |
|-----------|-------------|
| yo        | -o          |
| tú        | -as         |
| él/ella/usted | -a      |
| nosotros  | -amos       |
| vosotros  | -áis        |
| ellos/ellas/ustedes | -an |

### -ER
| Pronombre | Terminación |
|-----------|-------------|
| yo        | -o          |
| tú        | -es         |
| él/ella/usted | -e      |
| nosotros  | -emos       |
| vosotros  | -éis        |
| ellos/ellas/ustedes | -en |

### -IR
| Pronombre | Terminación |
|-----------|-------------|
| yo        | -o          |
| tú        | -es         |
| él/ella/usted | -e      |
| nosotros  | -imos       |
| vosotros  | -ís         |
| ellos/ellas/ustedes | -en |

## Verbos Comunes Regulares

### -AR
- trabajar (يعمل)
- estudiar (يدرس)
- caminar (يمشي)
- hablar (يتحدث)
- comprar (يشتري)
- cocinar (يطبخ)

### -ER
- comer (يأكل)
- beber (يشرب)
- leer (يقرأ)
- aprender (يتعلم)
- vender (يبيع)
- correr (يركض)

### -IR
- vivir (يعيش)
- escribir (يكتب)
- abrir (يفتح)
- recibir (يستقبل)
- subir (يصعد)
- decidir (يقرر)
    `,
    contentAr: `
# المضارع البسيط - الأفعال المنتظمة

## المجموعات الثلاث للأفعال

في الإسبانية، تنقسم الأفعال إلى ثلاث مجموعات حسب نهايتها:

### 1. أفعال -AR
### 2. أفعال -ER
### 3. أفعال -IR

## التصريف

نزيل النهاية ونضيف نهايات جديدة حسب الضمير:

### HABLAR (يتحدث)
- أنا **habl-o**
- أنت **habl-as**
- هو/هي **habl-a**
- نحن **habl-amos**
- أنتم **habl-áis**
- هم **habl-an**

## النهايات المنتظمة

حفظ هذه النهايات مهم جداً!

### أفعال -AR
- yo: -o
- tú: -as
- él/ella: -a
- nosotros: -amos
- vosotros: -áis
- ellos: -an

### أفعال -ER
- yo: -o
- tú: -es
- él/ella: -e
- nosotros: -emos
- vosotros: -éis
- ellos: -en

### أفعال -IR
- yo: -o
- tú: -es
- él/ella: -e
- nosotros: -imos
- vosotros: -ís
- ellos: -en
    `,
    examples: [
      { spanish: 'Yo hablo español', arabic: 'أنا أتحدث الإسبانية', english: 'I speak Spanish' },
      { spanish: 'Tú trabajas en Madrid', arabic: 'أنت تعمل في مدريد', english: 'You work in Madrid' },
      { spanish: 'Él come pizza', arabic: 'هو يأكل بيتزا', english: 'He eats pizza' },
      { spanish: 'Nosotros vivimos en España', arabic: 'نحن نعيش في إسبانيا', english: 'We live in Spain' },
      { spanish: 'Ellos estudian mucho', arabic: 'هم يدرسون كثيراً', english: 'They study a lot' },
      { spanish: 'Yo escribo una carta', arabic: 'أنا أكتب رسالة', english: 'I write a letter' },
    ],
    tips: [
      'La terminación de "yo" siempre es -o',
      'Las terminaciones de -ER e -IR son casi iguales',
      'Solo nosotros y vosotros tienen tildes',
      'Practica conjugando 10 verbos regulares cada día',
      'Lee en voz alta para memorizar mejor',
    ],
    tipsAr: [
      'نهاية "yo" دائماً -o',
      'نهايات -ER و -IR متشابهة جداً',
      'فقط nosotros و vosotros عليها تشكيل',
      'تدرب على تصريف 10 أفعال منتظمة كل يوم',
      'اقرأ بصوت عالٍ للحفظ الأفضل',
    ],
  },

  // INTERMEDIATE LESSONS
  {
    id: 'gram-preterito-indefinido',
    title: 'Pretérito Indefinido - Pasado Simple',
    titleAr: 'الماضي البسيط',
    level: 'intermediate',
    category: 'tenses',
    content: `
# Pretérito Indefinido (Pasado Simple)

## ¿Cuándo se usa?

El pretérito indefinido se usa para acciones completadas en el pasado:

- Acciones puntuales: **Ayer comí pizza**
- Eventos históricos: **Colón descubrió América en 1492**
- Secuencia de acciones: **Me levanté, desayuné y salí**

## Conjugación de Verbos Regulares

### HABLAR
- Yo **hablé**
- Tú **hablaste**
- Él/Ella/Usted **habló**
- Nosotros/Nosotras **hablamos**
- Vosotros/Vosotras **hablasteis**
- Ellos/Ellas/Ustedes **hablaron**

### COMER
- Yo **comí**
- Tú **comiste**
- Él/Ella/Usted **comió**
- Nosotros/Nosotras **comimos**
- Vosotros/Vosotras **comisteis**
- Ellos/Ellas/Ustedes **comieron**

### VIVIR
- Yo **viví**
- Tú **viviste**
- Él/Ella/Usted **vivió**
- Nosotros/Nosotras **vivimos**
- Vosotros/Vosotras **vivisteis**
- Ellos/Ellas/Ustedes **vivieron**

## Verbos Irregulares Importantes

### SER / IR (misma conjugación)
- Yo **fui**
- Tú **fuiste**
- Él/Ella/Usted **fue**
- Nosotros/Nosotras **fuimos**
- Vosotros/Vosotras **fuisteis**
- Ellos/Ellas/Ustedes **fueron**

### ESTAR
- Yo **estuve**
- Tú **estuviste**
- Él/Ella/Usted **estuvo**
- Nosotros/Nosotras **estuvimos**
- Vosotros/Vosotras **estuvisteis**
- Ellos/Ellas/Ustedes **estuvieron**

### TENER
- Yo **tuve**
- Tú **tuviste**
- Él/Ella/Usted **tuvo**
- Nosotros/Nosotras **tuvimos**
- Vosotros/Vosotras **tuvisteis**
- Ellos/Ellas/Ustedes **tuvieron**

### HACER
- Yo **hice**
- Tú **hiciste**
- Él/Ella/Usted **hizo**
- Nosotros/Nosotras **hicimos**
- Vosotros/Vosotras **hicisteis**
- Ellos/Ellas/Ustedes **hicieron**

## Marcadores Temporales

Palabras que indican uso del pretérito indefinido:

- **ayer** (أمس)
- **anteayer** (أول أمس)
- **la semana pasada** (الأسبوع الماضي)
- **el mes pasado** (الشهر الماضي)
- **el año pasado** (السنة الماضية)
- **hace dos días** (منذ يومين)
- **en 2020** (في 2020)
    `,
    contentAr: `
# الماضي البسيط (Pretérito Indefinido)

## متى نستخدمه؟

نستخدم الماضي البسيط للأحداث المكتملة في الماضي:

- أحداث محددة: **أمس أكلت بيتزا**
- أحداث تاريخية: **كولومبوس اكتشف أمريكا في 1492**
- تسلسل أحداث: **استيقظت، تناولت الفطور وخرجت**

## التصريف

### الأفعال المنتظمة
تبدأ النهايات بحرف متحرك بدلاً من صامت

### الأفعال الشاذة
يجب حفظها لأن تصريفاتها مختلفة تماماً

## كلمات دالة

استخدم هذه الكلمات مع الماضي البسيط:
- ayer (أمس)
- la semana pasada (الأسبوع الماضي)
- el año pasado (السنة الماضية)
- hace dos días (منذ يومين)
    `,
    examples: [
      { spanish: 'Ayer hablé con mi madre', arabic: 'أمس تحدثت مع أمي', english: 'Yesterday I spoke with my mother' },
      { spanish: 'Comimos paella la semana pasada', arabic: 'أكلنا بايلا الأسبوع الماضي', english: 'We ate paella last week' },
      { spanish: 'Fui a Barcelona el año pasado', arabic: 'ذهبت إلى برشلونة السنة الماضية', english: 'I went to Barcelona last year' },
      { spanish: 'Tuve un examen difícil', arabic: 'كان عندي امتحان صعب', english: 'I had a difficult exam' },
      { spanish: 'Hizo mucho calor ayer', arabic: 'كان الجو حاراً جداً أمس', english: 'It was very hot yesterday' },
    ],
    tips: [
      'Los verbos -AR tienen tildes en yo, él/ella',
      'Los verbos -ER/-IR tienen tildes en yo, él/ella también',
      'SER e IR tienen la misma conjugación en pretérito',
      'Memoriza los irregulares más comunes primero',
      'Practica con marcadores temporales',
    ],
    tipsAr: [
      'أفعال -AR عليها تشكيل في yo و él/ella',
      'أفعال -ER/-IR أيضاً عليها تشكيل',
      'SER و IR لهما نفس التصريف في الماضي',
      'احفظ الأفعال الشاذة الأكثر شيوعاً أولاً',
      'تدرب مع الكلمات الدالة على الوقت',
    ],
  },
  {
    id: 'gram-subjuntivo-presente',
    title: 'Presente de Subjuntivo',
    titleAr: 'المضارع الشرطي',
    level: 'advanced',
    category: 'tenses',
    content: `
# Presente de Subjuntivo

## ¿Qué es el Subjuntivo?

El subjuntivo es un modo verbal que expresa:
- Duda, incertidumbre
- Deseos, esperanzas
- Emociones
- Recomendaciones
- Posibilidad

No existe exactamente en árabe, pero es ESENCIAL en español.

## Formación del Presente de Subjuntivo

### Paso 1: Toma la forma "yo" del presente de indicativo
- hablar → habl**o**
- comer → com**o**
- vivir → viv**o**

### Paso 2: Quita la "-o"
- habl~~o~~
- com~~o~~
- viv~~o~~

### Paso 3: Añade las terminaciones del subjuntivo

#### Para verbos -AR (usa terminaciones de -ER)
- hable, hables, hable, hablemos, habléis, hablen

#### Para verbos -ER/-IR (usa terminaciones de -AR)
- coma, comas, coma, comamos, comáis, coman
- viva, vivas, viva, vivamos, viváis, vivan

## Conjugación Completa

### HABLAR
- Yo **hable**
- Tú **hables**
- Él/Ella/Usted **hable**
- Nosotros **hablemos**
- Vosotros **habléis**
- Ellos/Ellas/Ustedes **hablen**

### COMER
- Yo **coma**
- Tú **comas**
- Él/Ella/Usted **coma**
- Nosotros **comamos**
- Vosotros **comáis**
- Ellos/Ellas/Ustedes **coman**

### VIVIR
- Yo **viva**
- Tú **vivas**
- Él/Ella/Usted **viva**
- Nosotros **vivamos**
- Vosotros **viváis**
- Ellos/Ellas/Ustedes **vivan**

## ¿Cuándo usar el Subjuntivo?

### 1. Después de expresiones de duda
- Dudo que **venga** (أشك أن يأتي)
- No creo que **sea** verdad (لا أظن أن هذا صحيح)

### 2. Después de expresiones de deseo
- Quiero que **estudies** (أريد أن تدرس)
- Espero que **apruebes** (آمل أن تنجح)

### 3. Después de expresiones de emoción
- Me alegro de que **estés** bien (أنا سعيد أنك بخير)
- Temo que **llueva** (أخشى أن تمطر)

### 4. Después de expresiones impersonales
- Es importante que **sepas** esto (من المهم أن تعرف هذا)
- Es necesario que **vengas** (من الضروري أن تأتي)

### 5. Con "para que", "antes de que", "sin que"
- Te llamo para que **sepas** la verdad (أتصل بك لتعرف الحقيقة)

## Verbos Irregulares Importantes

### SER
- sea, seas, sea, seamos, seáis, sean

### ESTAR
- esté, estés, esté, estemos, estéis, estén

### IR
- vaya, vayas, vaya, vayamos, vayáis, vayan

### HABER
- haya, hayas, haya, hayamos, hayáis, hayan

### SABER
- sepa, sepas, sepa, sepamos, sepáis, sepan

### DAR
- dé, des, dé, demos, deis, den

## Frases Comunes

- Espero que... (آمل أن...)
- Quiero que... (أريد أن...)
- Es posible que... (من الممكن أن...)
- Dudo que... (أشك أن...)
- Me alegro de que... (أنا سعيد أن...)
- Temo que... (أخشى أن...)
- Es importante que... (من المهم أن...)
- Es necesario que... (من الضروري أن...)
    `,
    contentAr: `
# المضارع الشرطي (Subjuntivo)

## ما هو الشرطي؟

الشرطي هو صيغة فعلية تعبر عن:
- الشك، عدم اليقين
- الرغبات، الآمال
- العواطف
- التوصيات
- الاحتمال

لا يوجد بالضبط في العربية، لكنه ضروري جداً في الإسبانية.

## كيف نكونه؟

### الخطوة 1: خذ صيغة "yo" من المضارع
### الخطوة 2: احذف "-o"
### الخطوة 3: أضف نهايات الشرطي

**مهم**: أفعال -AR تأخذ نهايات -ER/-IR والعكس!

## متى نستخدم الشرطي؟

### 1. بعد عبارات الشك
- Dudo que venga (أشك أن يأتي)

### 2. بعد عبارات الرغبة
- Quiero que estudies (أريد أن تدرس)

### 3. بعد عبارات العاطفة
- Me alegro de que estés bien (أنا سعيد أنك بخير)

### 4. بعد عبارات غير شخصية
- Es importante que sepas esto (من المهم أن تعرف هذا)

### 5. مع "para que", "antes de que", "sin que"
- Te llamo para que sepas (أتصل بك لتعرف)

## الأفعال الشاذة

يجب حفظ الأفعال الشاذة لأنها مختلفة تماماً:
- SER: sea, seas, sea...
- ESTAR: esté, estés, esté...
- IR: vaya, vayas, vaya...
- HABER: haya, hayas, haya...
    `,
    examples: [
      { spanish: 'Espero que vengas a la fiesta', arabic: 'آمل أن تأتي للحفلة', english: 'I hope you come to the party' },
      { spanish: 'Quiero que estudies más', arabic: 'أريد أن تدرس أكثر', english: 'I want you to study more' },
      { spanish: 'Dudo que llueva mañana', arabic: 'أشك أن تمطر غداً', english: 'I doubt it will rain tomorrow' },
      { spanish: 'Es importante que sepas esto', arabic: 'من المهم أن تعرف هذا', english: 'It is important that you know this' },
      { spanish: 'Me alegro de que estés bien', arabic: 'أنا سعيد أنك بخير', english: 'I am glad you are well' },
    ],
    tips: [
      'El subjuntivo NO es un tiempo, es un MODO (otra forma de ver la realidad)',
      'Memoriza las expresiones que requieren subjuntivo',
      'Practica con verbos irregulares todos los días',
      'Lee mucho para ver el subjuntivo en contexto',
      'El 80% del subjuntivo usa solo 10 verbos irregulares',
    ],
    tipsAr: [
      'الشرطي ليس زمن، بل صيغة (طريقة أخرى لرؤية الواقع)',
      'احفظ العبارات التي تتطلب الشرطي',
      'تدرب على الأفعال الشاذة كل يوم',
      'اقرأ كثيراً لترى الشرطي في السياق',
      '80% من الشرطي يستخدم فقط 10 أفعال شاذة',
    ],
  },
  {
    id: 'gram-por-para',
    title: 'Por vs Para - La Diferencia',
    titleAr: 'الفرق بين Por و Para',
    level: 'intermediate',
    category: 'prepositions',
    content: `
# POR vs PARA

Una de las dudas más comunes para estudiantes de español. Ambas significan "por/para" pero se usan de forma diferente.

## PARA (الهدف، الغاية، الاتجاه)

### Usos principales:

#### 1. Destino / Dirección
- Voy **para** Madrid (أنا ذاهب إلى مدريد)
- Este regalo es **para** ti (هذه الهدية لك)

#### 2. Propósito / Objetivo
- Estudio **para** aprender (أدرس لأتعلم)
- Trabajo **para** vivir (أعمل لأعيش)

#### 3. Fecha límite / Deadline
- El trabajo es **para** mañana (العمل لغدٍ)
- Necesito esto **para** el lunes (أحتاج هذا ليوم الاثنين)

#### 4. Opinión
- **Para** mí, es difícil (بالنسبة لي، صعب)

#### 5. Comparación
- **Para** ser extranjero, hablas muy bien (بالنسبة لكونك أجنبي، تتحدث جيداً)

## POR (السبب، الوسيلة، المكان)

### Usos principales:

#### 1. Causa / Razón
- Gracias **por** tu ayuda (شكراً لمساعدتك)
- Lo hago **por** amor (أفعله من أجل الحب)

#### 2. Medio / Manera
- Hablo **por** teléfono (أتحدث بالهاتف)
- Viajo **por** avión (أسافر بالطائرة)
- Enviado **por** correo (مُرسل بالبريد)

#### 3. Lugar aproximado / A través de
- Camino **por** el parque (أمشي في الحديقة)
- Pasa **por** aquí (مرّ من هنا)

#### 4. Duración de tiempo
- Vivió allí **por** dos años (عاش هناك لمدة سنتين)
- Trabajo **por** la mañana (أعمل في الصباح)

#### 5. Intercambio / Precio
- Pagué 50 euros **por** esto (دفعت 50 يورو مقابل هذا)
- Cambio A **por** B (أبدل A بـ B)

#### 6. En nombre de / En lugar de
- Hablo **por** todos (أتحدث بالنيابة عن الجميع)
- Trabajo **por** mi jefe hoy (أعمل بدلاً من مديري اليوم)

#### 7. Porcentaje / Multiplicación
- 20 **por** ciento (20 بالمئة)
- 2 **por** 3 es 6 (2 ضرب 3 يساوي 6)

## Comparación Directa

| PARA (للهدف/الاتجاه) | POR (للسبب/الوسيلة) |
|----------------------|---------------------|
| destino (إلى أين؟) | movimiento (أين؟) |
| propósito (لماذا؟ الهدف) | causa (لماذا؟ السبب) |
| fecha límite (متى؟) | duración (كم مدة؟) |
| opinión | intercambio |
| comparación | medio/manera |

## Ejemplos Comparativos

### Destino vs Movimiento
- Voy **para** Madrid (ذاهب إلى مدريد - هدف)
- Paso **por** Madrid (أمر من مدريد - حركة)

### Propósito vs Causa
- Estudio **para** aprobar (أدرس لأنجح - هدف)
- Aprobé **por** estudiar (نجحت بسبب الدراسة - سبب)

### Tiempo
- Es **para** mañana (للغد - موعد نهائي)
- Trabajo **por** la mañana (في الصباح - فترة زمنية)

## Frases Comunes

### Con PARA:
- **Para** siempre (للأبد)
- **Para** nada (أبداً، على الإطلاق)
- **Para** empezar (للبداية)
- **Para** terminar (للنهاية)
- **Para** colmo (وفوق كل ذلك)

### Con POR:
- **Por** favor (من فضلك)
- **Por** supuesto (بالطبع)
- **Por** ejemplo (على سبيل المثال)
- **Por** fin (أخيراً)
- **Por** lo menos (على الأقل)
- **Por** si acaso (في حالة، احتياطاً)
- **Por** desgracia (للأسف)
- **Por** cierto (بالمناسبة)
    `,
    contentAr: `
# الفرق بين POR و PARA

أحد أكثر الأسئلة شيوعاً للطلاب. كلاهما يترجم "لـ" بالعربية لكن الاستخدام مختلف.

## PARA (الهدف والوجهة)

### الاستخدامات:

#### 1. الوجهة
- Voy para Madrid (ذاهب إلى مدريد)

#### 2. الهدف/الغرض
- Estudio para aprender (أدرس لأتعلم)

#### 3. الموعد النهائي
- El trabajo es para mañana (العمل لغدٍ)

#### 4. الرأي
- Para mí, es difícil (بالنسبة لي، صعب)

## POR (السبب والوسيلة)

### الاستخدامات:

#### 1. السبب
- Gracias por tu ayuda (شكراً لمساعدتك)

#### 2. الوسيلة
- Hablo por teléfono (أتحدث بالهاتف)

#### 3. الموقع التقريبي
- Camino por el parque (أمشي في الحديقة)

#### 4. المدة الزمنية
- Vivió por dos años (عاش لمدة سنتين)

#### 5. المقايضة/السعر
- Pagué 50 euros por esto (دفعت 50 يورو مقابل هذا)

## ملخص سريع

**PARA** = الهدف، الوجهة، الموعد النهائي
**POR** = السبب، الوسيلة، المكان، المدة
    `,
    examples: [
      { spanish: 'Estudio para ser médico', arabic: 'أدرس لأصبح طبيباً (هدف)', english: 'I study to be a doctor' },
      { spanish: 'Aprobé por estudiar mucho', arabic: 'نجحت بسبب الدراسة الكثيرة (سبب)', english: 'I passed because I studied a lot' },
      { spanish: 'Este regalo es para ti', arabic: 'هذه الهدية لك (وجهة)', english: 'This gift is for you' },
      { spanish: 'Gracias por el regalo', arabic: 'شكراً على الهدية (سبب)', english: 'Thanks for the gift' },
      { spanish: 'Voy para Madrid', arabic: 'ذاهب إلى مدريد (هدف)', english: 'I am going to Madrid' },
      { spanish: 'Paso por Madrid', arabic: 'أمر من مدريد (حركة)', english: 'I pass through Madrid' },
      { spanish: 'Hablo por teléfono', arabic: 'أتحدث بالهاتف (وسيلة)', english: 'I speak by phone' },
      { spanish: 'Es para mañana', arabic: 'إنه لغدٍ (موعد نهائي)', english: 'It is for tomorrow' },
      { spanish: 'Trabajo por la mañana', arabic: 'أعمل في الصباح (فترة)', english: 'I work in the morning' },
    ],
    tips: [
      'PARA = destino/objetivo/opinión',
      'POR = causa/medio/lugar/duración',
      'Memoriza las frases comunes primero',
      'Piensa: "¿Es un objetivo/destino? → PARA"',
      'Piensa: "¿Es una causa/razón? → POR"',
    ],
    tipsAr: [
      'PARA = الهدف/الوجهة/الرأي',
      'POR = السبب/الوسيلة/المكان/المدة',
      'احفظ العبارات الشائعة أولاً',
      'فكر: "هل هو هدف/وجهة؟ → PARA"',
      'فكر: "هل هو سبب؟ → POR"',
    ],
  },
];

// Helper functions
export function getLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find(lesson => lesson.id === id);
}

export function getLessonsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): GrammarLesson[] {
  return grammarLessons.filter(lesson => lesson.level === level);
}

export function getLessonsByCategory(category: GrammarLesson['category']): GrammarLesson[] {
  return grammarLessons.filter(lesson => lesson.category === category);
}

export function getAllLessons(): GrammarLesson[] {
  return grammarLessons;
}
