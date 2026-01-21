/**
 * Graded Reading Texts for Spanish Learners
 * Texts organized by CEFR levels (A1, A2, B1, B2, C1, C2)
 */

export interface ReadingText {
  id: string;
  title: string;
  titleAr: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'daily-life' | 'culture' | 'history' | 'science' | 'literature' | 'news' | 'biography';
  text: string;
  textAr: string;
  wordCount: number;
  readingTime: number; // in minutes
  vocabulary: {
    word: string;
    translation: string;
    context?: string;
  }[];
  comprehensionQuestions: {
    question: string;
    questionAr: string;
    options: string[];
    correctAnswer: number; // index
  }[];
  audioUrl?: string;
}

export const readingTexts: ReadingText[] = [
  // A1 LEVEL TEXTS
  {
    id: 'read-a1-my-family',
    title: 'Mi Familia',
    titleAr: 'عائلتي',
    level: 'A1',
    category: 'daily-life',
    wordCount: 85,
    readingTime: 1,
    text: `Mi Familia

Me llamo Carlos. Tengo 25 años. Vivo en Madrid con mi familia.

Mi familia es grande. Somos seis personas en total. Mi padre se llama José y tiene 55 años. Trabaja en un banco. Mi madre se llama María y tiene 52 años. Ella es profesora en una escuela.

Tengo dos hermanos y una hermana. Mi hermano mayor se llama Pedro. Tiene 28 años y es médico. Mi hermana se llama Ana. Tiene 22 años y estudia en la universidad. Mi hermano pequeño se llama Luis. Tiene solo 15 años y va al instituto.

Vivimos en un apartamento en el centro de Madrid. El apartamento tiene tres dormitorios, una cocina grande y un salón. Los fines de semana, toda la familia come junta. A veces vamos al parque o al cine.

Me gusta mucho mi familia. Todos nos ayudamos y somos muy felices juntos.`,
    textAr: `عائلتي

اسمي كارلوس. عمري 25 سنة. أعيش في مدريد مع عائلتي.

عائلتي كبيرة. نحن ستة أشخاص في المجموع. اسم والدي خوسيه وعمره 55 سنة. يعمل في بنك. اسم والدتي ماريا وعمرها 52 سنة. هي معلمة في مدرسة.

لدي أخوان وأخت واحدة. اسم أخي الأكبر بيدرو. عمره 28 سنة وهو طبيب. اسم أختي آنا. عمرها 22 سنة وتدرس في الجامعة. اسم أخي الصغير لويس. عمره فقط 15 سنة ويذهب إلى الثانوية.

نعيش في شقة في وسط مدريد. الشقة فيها ثلاث غرف نوم، مطبخ كبير وصالة. في عطلة نهاية الأسبوع، العائلة كلها تأكل معاً. أحياناً نذهب إلى الحديقة أو السينما.

أحب عائلتي كثيراً. كلنا نساعد بعضنا ونحن سعداء جداً معاً.`,
    vocabulary: [
      { word: 'me llamo', translation: 'اسمي', context: 'Introducción' },
      { word: 'vivo', translation: 'أعيش', context: 'Del verbo vivir' },
      { word: 'en total', translation: 'في المجموع', context: 'Expresión de cantidad' },
      { word: 'mayor', translation: 'أكبر', context: 'Comparativo' },
      { word: 'pequeño', translation: 'صغير', context: 'Adjetivo' },
      { word: 'dormitorio', translation: 'غرفة نوم', context: 'Parte de la casa' },
      { word: 'fines de semana', translation: 'عطلة نهاية الأسبوع', context: 'Expresión de tiempo' },
      { word: 'juntos', translation: 'معاً', context: 'Adverbio' }
    ],
    comprehensionQuestions: [
      {
        question: '¿Cuántos años tiene Carlos?',
        questionAr: 'كم عمر كارلوس؟',
        options: ['22 años', '25 años', '28 años', '15 años'],
        correctAnswer: 1
      },
      {
        question: '¿Cuántas personas hay en la familia de Carlos?',
        questionAr: 'كم شخصاً في عائلة كارلوس؟',
        options: ['Cuatro', 'Cinco', 'Seis', 'Siete'],
        correctAnswer: 2
      },
      {
        question: '¿Qué hace el padre de Carlos?',
        questionAr: 'ماذا يعمل والد كارلوس؟',
        options: ['Es médico', 'Trabaja en un banco', 'Es profesor', 'Estudia'],
        correctAnswer: 1
      },
      {
        question: '¿Dónde vive la familia?',
        questionAr: 'أين تعيش العائلة؟',
        options: ['En una casa', 'En el campo', 'En un apartamento en Madrid', 'En Barcelona'],
        correctAnswer: 2
      },
      {
        question: '¿Qué hace la familia los fines de semana?',
        questionAr: 'ماذا تفعل العائلة في عطلة نهاية الأسبوع؟',
        options: ['Trabajan', 'Comen juntos', 'Duermen', 'Estudian'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'read-a1-daily-routine',
    title: 'Mi Rutina Diaria',
    titleAr: 'روتيني اليومي',
    level: 'A1',
    category: 'daily-life',
    wordCount: 95,
    readingTime: 1,
    text: `Mi Rutina Diaria

Me llamo Laura y quiero contarles sobre mi día típico.

Me despierto todos los días a las 7 de la mañana. Me levanto y voy al baño. Me ducho con agua caliente y me lavo los dientes.

Después, voy a la cocina y desayuno. Normalmente como tostadas con mantequilla y mermelada. Bebo un café con leche. Mi desayuno es simple pero delicioso.

A las 8:30 salgo de casa. Voy al trabajo en metro. El viaje dura 30 minutos. Trabajo en una oficina de 9 a 6 de la tarde.

Al mediodía, como en un restaurante cerca de mi oficina con mis compañeros de trabajo. Generalmente como una ensalada o un bocadillo.

Después del trabajo, vuelvo a casa a las 7 de la tarde. Ceno algo ligero, veo la televisión o leo un libro. A las 11 de la noche, me acuesto y duermo.

Los fines de semana, mi rutina es diferente. Me levanto más tarde y hago actividades divertidas como ir al cine o al parque.`,
    textAr: `روتيني اليومي

اسمي لاورا وأريد أن أخبركم عن يومي العادي.

أستيقظ كل يوم في الساعة 7 صباحاً. أنهض وأذهب إلى الحمام. أستحم بماء ساخن وأنظف أسناني.

بعد ذلك، أذهب إلى المطبخ وأتناول الفطور. عادة آكل خبز محمص مع زبدة ومربى. أشرب قهوة بالحليب. فطوري بسيط لكن لذيذ.

في الساعة 8:30 أخرج من المنزل. أذهب إلى العمل بالمترو. الرحلة تستغرق 30 دقيقة. أعمل في مكتب من 9 إلى 6 مساءً.

في الظهر، آكل في مطعم قريب من مكتبي مع زملائي في العمل. عادة آكل سلطة أو ساندويتش.

بعد العمل، أعود إلى المنزل في الساعة 7 مساءً. أتناول عشاءً خفيفاً، أشاهد التلفزيون أو أقرأ كتاباً. في الساعة 11 ليلاً، أذهب للنوم.

في عطلة نهاية الأسبوع، روتيني مختلف. أستيقظ متأخراً وأقوم بأنشطة ممتعة مثل الذهاب إلى السينما أو الحديقة.`,
    vocabulary: [
      { word: 'me despierto', translation: 'أستيقظ', context: 'Verbo reflexivo' },
      { word: 'me levanto', translation: 'أنهض', context: 'Verbo reflexivo' },
      { word: 'me ducho', translation: 'أستحم', context: 'Verbo reflexivo' },
      { word: 'tostadas', translation: 'خبز محمص', context: 'Comida' },
      { word: 'salgo', translation: 'أخرج', context: 'Del verbo salir' },
      { word: 'dura', translation: 'يستغرق', context: 'Del verbo durar' },
      { word: 'al mediodía', translation: 'في الظهر', context: 'Expresión de tiempo' },
      { word: 'me acuesto', translation: 'أذهب للنوم', context: 'Verbo reflexivo' }
    ],
    comprehensionQuestions: [
      {
        question: '¿A qué hora se despierta Laura?',
        questionAr: 'في أي ساعة تستيقظ لاورا؟',
        options: ['A las 6', 'A las 7', 'A las 8', 'A las 9'],
        correctAnswer: 1
      },
      {
        question: '¿Qué desayuna Laura?',
        questionAr: 'ماذا تتناول لاورا في الفطور؟',
        options: ['Cereales', 'Fruta', 'Tostadas con mantequilla', 'Huevos'],
        correctAnswer: 2
      },
      {
        question: '¿Cómo va Laura al trabajo?',
        questionAr: 'كيف تذهب لاورا إلى العمل؟',
        options: ['En coche', 'En autobús', 'En metro', 'A pie'],
        correctAnswer: 2
      },
      {
        question: '¿Dónde come Laura al mediodía?',
        questionAr: 'أين تأكل لاورا في الظهر؟',
        options: ['En casa', 'En la oficina', 'En un restaurante', 'No come'],
        correctAnswer: 2
      },
      {
        question: '¿Qué hace Laura los fines de semana?',
        questionAr: 'ماذا تفعل لاورا في عطلة نهاية الأسبوع؟',
        options: ['Trabaja', 'Duerme todo el día', 'Hace actividades divertidas', 'Estudia'],
        correctAnswer: 2
      }
    ]
  },

  // A2 LEVEL TEXT
  {
    id: 'read-a2-madrid-city',
    title: 'Madrid: La Capital de España',
    titleAr: 'مدريد: عاصمة إسبانيا',
    level: 'A2',
    category: 'culture',
    wordCount: 180,
    readingTime: 2,
    text: `Madrid: La Capital de España

Madrid es la capital y la ciudad más grande de España. Está situada en el centro del país y tiene más de 3 millones de habitantes. Es una ciudad vibrante, llena de historia, cultura y vida nocturna.

El centro histórico de Madrid es famoso por sus plazas hermosas. La Plaza Mayor es uno de los lugares más visitados. Fue construida en el siglo XVII y ahora está rodeada de cafés y restaurantes. La Puerta del Sol es otra plaza importante. Aquí se celebra la Nochevieja cada año, cuando miles de personas comen las 12 uvas de la suerte.

Madrid tiene museos increíbles. El Museo del Prado es uno de los museos de arte más importantes del mundo. Aquí puedes ver obras maestras de artistas como Velázquez, Goya y El Bosco. El Museo Reina Sofía es famoso por tener el cuadro "Guernica" de Pablo Picasso.

El Parque del Retiro es el pulmón verde de Madrid. Es perfecto para pasear, hacer deporte o simplemente relajarse. En el parque hay un lago donde puedes alquilar barcas.

La comida madrileña es deliciosa. El "cocido madrileño" es un plato tradicional de garbanzos, carne y verduras. Los "churros con chocolate" son perfectos para el desayuno o la merienda.

Madrid también es famosa por su vida nocturna. Los madrileños cenan tarde, generalmente entre las 10 y las 11 de la noche, y luego salen a bares y discotecas que están abiertos hasta el amanecer.

El clima de Madrid es continental. Los veranos son muy calurosos, con temperaturas que pueden superar los 40 grados. Los inviernos son fríos pero raramente nieva.

Si visitas Madrid, no puedes perderte el Palacio Real, el estadio Santiago Bernabéu (si te gusta el fútbol), y la Gran Vía para ir de compras.`,
    textAr: `مدريد: عاصمة إسبانيا

مدريد هي العاصمة وأكبر مدينة في إسبانيا. تقع في وسط البلاد ويسكنها أكثر من 3 ملايين نسمة. إنها مدينة نابضة بالحياة، مليئة بالتاريخ والثقافة والحياة الليلية.

المركز التاريخي لمدريد مشهور بساحاته الجميلة. بلازا مايور واحدة من أكثر الأماكن زيارة. بُنيت في القرن السابع عشر والآن محاطة بالمقاهي والمطاعم. بويرتا ديل سول ساحة مهمة أخرى. هنا يُحتفل برأس السنة كل عام، عندما يأكل آلاف الأشخاص حبات العنب الـ12 للحظ.

لدى مدريد متاحف رائعة. متحف البرادو واحد من أهم متاحف الفن في العالم. هنا يمكنك رؤية روائع فنانين مثل فيلاسكيث، غويا وإل بوسكو. متحف رينا صوفيا مشهور بلوحة "غيرنيكا" لبابلو بيكاسو.

حديقة الريتيرو هي الرئة الخضراء لمدريد. مثالية للتمشي، ممارسة الرياضة أو الاسترخاء ببساطة. في الحديقة بحيرة يمكنك استئجار قوارب فيها.

طعام مدريد لذيذ. "الكوسيدو المدريدي" طبق تقليدي من الحمص واللحم والخضروات. "التشوروس مع الشوكولاتة" مثالي للفطور أو الوجبة الخفيفة.

مدريد مشهورة أيضاً بحياتها الليلية. أهل مدريد يتعشون متأخراً، عادة بين 10 و11 ليلاً، ثم يخرجون إلى الحانات والملاهي الليلية التي تبقى مفتوحة حتى الفجر.

مناخ مدريد قاري. الصيف حار جداً، مع درجات حرارة قد تتجاوز 40 درجة. الشتاء بارد لكن نادراً ما تثلج.

إذا زرت مدريد، لا يمكنك تفويت القصر الملكي، ملعب سانتياغو برنابيو (إذا كنت تحب كرة القدم)، وغران فيا للتسوق.`,
    vocabulary: [
      { word: 'vibrante', translation: 'نابضة بالحياة', context: 'Adjetivo' },
      { word: 'habitantes', translation: 'سكان', context: 'Sustantivo' },
      { word: 'rodeada', translation: 'محاطة', context: 'Participio' },
      { word: 'Nochevieja', translation: 'ليلة رأس السنة', context: 'Festividad' },
      { word: 'obras maestras', translation: 'روائع فنية', context: 'Arte' },
      { word: 'pulmón verde', translation: 'الرئة الخضراء', context: 'Metáfora' },
      { word: 'alquilar', translation: 'يستأجر', context: 'Verbo' },
      { word: 'garbanzos', translation: 'حمص', context: 'Comida' },
      { word: 'amanecer', translation: 'الفجر', context: 'Tiempo' },
      { word: 'superar', translation: 'يتجاوز', context: 'Verbo' }
    ],
    comprehensionQuestions: [
      {
        question: '¿Cuántos habitantes tiene aproximadamente Madrid?',
        questionAr: 'كم عدد سكان مدريد تقريباً؟',
        options: ['1 millón', '2 millones', 'Más de 3 millones', '5 millones'],
        correctAnswer: 2
      },
      {
        question: '¿Qué se come en la Nochevieja en la Puerta del Sol?',
        questionAr: 'ماذا يُؤكل في ليلة رأس السنة في بويرتا ديل سول؟',
        options: ['Manzanas', '12 uvas', 'Churros', 'Garbanzos'],
        correctAnswer: 1
      },
      {
        question: '¿Qué cuadro famoso está en el Museo Reina Sofía?',
        questionAr: 'ما اللوحة المشهورة في متحف رينا صوفيا؟',
        options: ['Las Meninas', 'Guernica', 'La Gioconda', 'El Jardín de las Delicias'],
        correctAnswer: 1
      },
      {
        question: '¿Cómo es el clima de Madrid en verano?',
        questionAr: 'كيف يكون المناخ في مدريد في الصيف؟',
        options: ['Frío', 'Lluvioso', 'Muy caluroso', 'Templado'],
        correctAnswer: 2
      },
      {
        question: '¿A qué hora cenan normalmente los madrileños?',
        questionAr: 'في أي ساعة يتعشى أهل مدريد عادة؟',
        options: ['A las 7', 'A las 8', 'Entre las 10 y las 11', 'A la medianoche'],
        correctAnswer: 2
      }
    ]
  },

  // B1 LEVEL TEXT
  {
    id: 'read-b1-cervantes',
    title: 'Miguel de Cervantes y Don Quijote',
    titleAr: 'ميغيل دي ثيربانتيس ودون كيخوته',
    level: 'B1',
    category: 'literature',
    wordCount: 280,
    readingTime: 3,
    text: `Miguel de Cervantes y Don Quijote

Miguel de Cervantes Saavedra nació en Alcalá de Henares en 1547 y murió en Madrid en 1616. Es considerado el escritor más importante de la literatura española y uno de los mejores escritores universales. Su obra más famosa, "Don Quijote de la Mancha", es la primera novela moderna de la literatura mundial.

La vida de Cervantes fue aventurera y difícil. En 1571, participó en la batalla de Lepanto contra el Imperio Otomano, donde recibió tres heridas de arcabuz. Una de ellas le dejó la mano izquierda inútil, por lo que se le conoce como "el manco de Lepanto". De regreso a España, fue capturado por piratas berberiscos y pasó cinco años como prisionero en Argel hasta que fue rescatado.

Cuando regresó a España, Cervantes intentó vivir de la escritura, pero no tuvo éxito inicial. Trabajó como recaudador de impuestos y fue encarcelado varias veces por problemas económicos. Se cree que comenzó a escribir "Don Quijote" mientras estaba en la cárcel.

"El ingenioso hidalgo Don Quijote de la Mancha" fue publicado en dos partes: la primera en 1605 y la segunda en 1615. La novela cuenta la historia de Alonso Quijano, un hidalgo que pierde la razón por leer demasiados libros de caballerías. Se convierte en Don Quijote y decide salir en busca de aventuras acompañado de su fiel escudero, Sancho Panza.

La obra es una sátira de las novelas de caballerías que eran populares en aquella época, pero también es una profunda reflexión sobre la realidad y la imaginación, los ideales y la locura. Don Quijote representa el idealismo y los sueños, mientras que Sancho Panza representa el realismo y el sentido común.

La novela incluye episodios famosos como la lucha contra los molinos de viento, que Don Quijote confunde con gigantes. Esta escena se ha convertido en símbolo universal de luchar contra enemigos imaginarios. Otro episodio memorable es cuando Don Quijote ataca un rebaño de ovejas creyendo que son ejércitos enemigos.

A lo largo de la novela, la relación entre Don Quijote y Sancho Panza evoluciona. Sancho aprende el idealismo de su amo, mientras que Don Quijote se vuelve más realista. Al final, Don Quijote recupera la cordura en su lecho de muerte, pero muchos lectores prefieren recordarlo como el caballero loco que perseguía sus sueños.

"Don Quijote" ha sido traducido a más de 140 idiomas y ha influenciado a innumerables escritores en todo el mundo. La obra dio origen a la palabra "quijotesco", que describe a alguien noble pero poco práctico en sus ideales. El 23 de abril, día de la muerte de Cervantes, se celebra el Día Internacional del Libro en su honor.`,
    textAr: `ميغيل دي ثيربانتيس ودون كيخوته

ولد ميغيل دي ثيربانتيس سابيدرا في ألكالا دي إيناريس عام 1547 وتوفي في مدريد عام 1616. يُعتبر أهم كاتب في الأدب الإسباني وأحد أفضل الكتاب العالميين. عمله الأشهر، "دون كيخوته دي لا مانتشا"، هو أول رواية حديثة في الأدب العالمي.

كانت حياة ثيربانتيس مليئة بالمغامرات والصعوبات. في 1571، شارك في معركة ليبانتو ضد الإمبراطورية العثمانية، حيث أصيب بثلاث جروح من البندقية. واحدة منها تركت يده اليسرى عديمة الفائدة، ولذلك يُعرف بـ"الأجذم ليبانتو". عند عودته إلى إسبانيا، تم أسره من قِبل قراصنة بربريين وقضى خمس سنوات كأسير في الجزائر حتى تم إنقاذه.

عندما عاد إلى إسبانيا، حاول ثيربانتيس العيش من الكتابة، لكنه لم يحقق نجاحاً في البداية. عمل كجابي ضرائب وتم سجنه عدة مرات بسبب مشاكل اقتصادية. يُعتقد أنه بدأ كتابة "دون كيخوته" أثناء وجوده في السجن.

نُشر "النبيل البارع دون كيخوته دي لا مانتشا" في جزأين: الأول في 1605 والثاني في 1615. تحكي الرواية قصة ألونسو كيخانو، نبيل يفقد عقله من قراءة الكثير من كتب الفروسية. يصبح دون كيخوته ويقرر الخروج بحثاً عن المغامرات برفقة مرافقه المخلص، سانتشو بانثا.

العمل هو هجاء لروايات الفروسية التي كانت شائعة في ذلك الوقت، لكنه أيضاً تأمل عميق في الواقع والخيال، المُثُل والجنون. دون كيخوته يمثل المثالية والأحلام، بينما سانتشو بانثا يمثل الواقعية والحس السليم.

تتضمن الرواية حلقات شهيرة مثل القتال ضد طواحين الهواء، التي يخلط دون كيخوته بينها وبين العمالقة. أصبح هذا المشهد رمزاً عالمياً للقتال ضد أعداء وهميين. حلقة أخرى لا تُنسى هي عندما يهاجم دون كيخوته قطيعاً من الخراف معتقداً أنها جيوش معادية.

على مدار الرواية، تتطور العلاقة بين دون كيخوته وسانتشو بانثا. سانتشو يتعلم المثالية من سيده، بينما دون كيخوته يصبح أكثر واقعية. في النهاية، يستعيد دون كيخوته صوابه على فراش الموت، لكن العديد من القراء يفضلون تذكره كفارس مجنون كان يطارد أحلامه.

تُرجم "دون كيخوته" إلى أكثر من 140 لغة وأثر على عدد لا يحصى من الكتاب حول العالم. أنشأ العمل كلمة "دونكيشوتي"، التي تصف شخصاً نبيلاً لكن غير عملي في مُثُله. في 23 أبريل، يوم وفاة ثيربانتيس، يُحتفل باليوم العالمي للكتاب تكريماً له.`,
    vocabulary: [
      { word: 'arcabuz', translation: 'بندقية قديمة', context: 'Arma antigua' },
      { word: 'manco', translation: 'أجذم، من فقد يده', context: 'Adjetivo' },
      { word: 'hidalgo', translation: 'نبيل', context: 'Clase social' },
      { word: 'caballerías', translation: 'الفروسية', context: 'Literatura' },
      { word: 'escudero', translation: 'مرافق الفارس', context: 'Personaje' },
      { word: 'sátira', translation: 'هجاء', context: 'Género literario' },
      { word: 'molinos de viento', translation: 'طواحين الهواء', context: 'Episodio famoso' },
      { word: 'rebaño', translation: 'قطيع', context: 'Animales' },
      { word: 'cordura', translation: 'صواب، عقل سليم', context: 'Sustantivo' },
      { word: 'lecho de muerte', translation: 'فراش الموت', context: 'Expresión' }
    ],
    comprehensionQuestions: [
      {
        question: '¿Por qué se conoce a Cervantes como "el manco de Lepanto"?',
        questionAr: 'لماذا يُعرف ثيربانتيس بـ"الأجذم ليبانتو"؟',
        options: [
          'Porque nació allí',
          'Porque perdió la mano en la batalla',
          'Porque vivió allí',
          'Porque escribió sobre Lepanto'
        ],
        correctAnswer: 1
      },
      {
        question: '¿Cuándo fue publicada la primera parte de Don Quijote?',
        questionAr: 'متى نُشر الجزء الأول من دون كيخوته؟',
        options: ['1547', '1571', '1605', '1616'],
        correctAnswer: 2
      },
      {
        question: '¿Qué representa Don Quijote en la novela?',
        questionAr: 'ماذا يمثل دون كيخوته في الرواية؟',
        options: ['El realismo', 'El idealismo', 'La cobardía', 'La riqueza'],
        correctAnswer: 1
      },
      {
        question: '¿Con qué confunde Don Quijote los molinos de viento?',
        questionAr: 'بماذا يخلط دون كيخوته طواحين الهواء؟',
        options: ['Con castillos', 'Con gigantes', 'Con dragones', 'Con árboles'],
        correctAnswer: 1
      },
      {
        question: '¿Cuándo se celebra el Día Internacional del Libro?',
        questionAr: 'متى يُحتفل باليوم العالمي للكتاب؟',
        options: ['1 de enero', '23 de abril', '25 de diciembre', '12 de octubre'],
        correctAnswer: 1
      }
    ]
  }
];

// Helper functions
export function getTextById(id: string): ReadingText | undefined {
  return readingTexts.find(text => text.id === id);
}

export function getTextsByLevel(level: ReadingText['level']): ReadingText[] {
  return readingTexts.filter(text => text.level === level);
}

export function getTextsByCategory(category: ReadingText['category']): ReadingText[] {
  return readingTexts.filter(text => text.category === category);
}

export function getAllTexts(): ReadingText[] {
  return readingTexts;
}

export const readingLevels: ReadingText['level'][] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const readingCategories: ReadingText['category'][] = [
  'daily-life',
  'culture',
  'history',
  'science',
  'literature',
  'news',
  'biography'
];
