/**
 * Daily Dialogues for Spanish Learners
 * Real-life conversations with Arabic translation
 */

export interface Dialogue {
  id: string;
  title: string;
  titleAr: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'greetings' | 'shopping' | 'restaurant' | 'travel' | 'work' | 'health' | 'social' | 'phone' | 'emergencies';
  situation: string;
  situationAr: string;
  lines: {
    speaker: string;
    speakerAr: string;
    text: string;
    textAr: string;
    pronunciation?: string;
  }[];
  vocabulary: {
    word: string;
    translation: string;
  }[];
  notes?: string[];
  notesAr?: string[];
}

export const dailyDialogues: Dialogue[] = [
  // BEGINNER DIALOGUES
  {
    id: 'dialogue-greeting-1',
    title: 'Saludos Básicos',
    titleAr: 'تحيات أساسية',
    level: 'beginner',
    category: 'greetings',
    situation: 'Dos amigos se encuentran en la calle',
    situationAr: 'صديقان يلتقيان في الشارع',
    lines: [
      {
        speaker: 'Juan',
        speakerAr: 'خوان',
        text: '¡Hola María! ¿Cómo estás?',
        textAr: 'مرحباً ماريا! كيف حالك؟',
        pronunciation: 'O-la Ma-ri-a! Ko-mo es-tas?'
      },
      {
        speaker: 'María',
        speakerAr: 'ماريا',
        text: '¡Hola Juan! Estoy muy bien, gracias. ¿Y tú?',
        textAr: 'مرحباً خوان! أنا بخير جداً، شكراً. وأنت؟',
        pronunciation: 'O-la Hwan! Es-toy muy byen, gra-thyas. I tu?'
      },
      {
        speaker: 'Juan',
        speakerAr: 'خوان',
        text: 'También estoy bien. ¿Qué tal el trabajo?',
        textAr: 'أنا أيضاً بخير. كيف العمل؟',
        pronunciation: 'Tam-byen es-toy byen. Ke tal el tra-ba-ho?'
      },
      {
        speaker: 'María',
        speakerAr: 'ماريا',
        text: 'El trabajo está bien, pero estoy un poco cansada.',
        textAr: 'العمل بخير، لكني متعبة قليلاً.',
        pronunciation: 'El tra-ba-ho es-ta byen, pe-ro es-toy un po-ko kan-sa-da.'
      },
      {
        speaker: 'Juan',
        speakerAr: 'خوان',
        text: 'Entiendo. Bueno, nos vemos pronto. ¡Adiós!',
        textAr: 'أفهم. حسناً، نراك قريباً. وداعاً!',
        pronunciation: 'En-tyen-do. Bwe-no, nos ve-mos pron-to. A-dyos!'
      },
      {
        speaker: 'María',
        speakerAr: 'ماريا',
        text: '¡Hasta luego!',
        textAr: 'إلى اللقاء!',
        pronunciation: 'As-ta lwe-go!'
      }
    ],
    vocabulary: [
      { word: 'hola', translation: 'مرحباً' },
      { word: 'cómo estás', translation: 'كيف حالك' },
      { word: 'muy bien', translation: 'بخير جداً' },
      { word: 'gracias', translation: 'شكراً' },
      { word: 'también', translation: 'أيضاً' },
      { word: 'cansado/a', translation: 'متعب/متعبة' },
      { word: 'nos vemos', translation: 'نراك' },
      { word: 'pronto', translation: 'قريباً' },
      { word: 'adiós', translation: 'وداعاً' },
      { word: 'hasta luego', translation: 'إلى اللقاء' }
    ],
    notes: [
      '¿Cómo estás? - Pregunta informal para amigos',
      '¿Y tú? - Se usa para devolver la pregunta',
      'un poco - significa "a little" en inglés'
    ],
    notesAr: [
      '¿Cómo estás? - سؤال غير رسمي للأصدقاء',
      '¿Y tú? - تُستخدم لإعادة السؤال',
      'un poco - تعني "قليلاً"'
    ]
  },
  {
    id: 'dialogue-restaurant-1',
    title: 'En el Restaurante',
    titleAr: 'في المطعم',
    level: 'beginner',
    category: 'restaurant',
    situation: 'Un cliente pide comida en un restaurante',
    situationAr: 'زبون يطلب الطعام في مطعم',
    lines: [
      {
        speaker: 'Camarero',
        speakerAr: 'النادل',
        text: 'Buenas tardes. ¿Qué desea tomar?',
        textAr: 'مساء الخير. ماذا تريد أن تطلب؟',
        pronunciation: 'Bwe-nas tar-des. Ke de-se-a to-mar?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Buenas tardes. Quiero una paella, por favor.',
        textAr: 'مساء الخير. أريد بايلا، من فضلك.',
        pronunciation: 'Bwe-nas tar-des. Kye-ro u-na pa-e-ya, por fa-vor.'
      },
      {
        speaker: 'Camarero',
        speakerAr: 'النادل',
        text: 'Muy bien. ¿Y para beber?',
        textAr: 'جيد جداً. وماذا للشرب؟',
        pronunciation: 'Muy byen. I pa-ra be-ber?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Un agua, por favor.',
        textAr: 'ماء، من فضلك.',
        pronunciation: 'Un a-gwa, por fa-vor.'
      },
      {
        speaker: 'Camarero',
        speakerAr: 'النادل',
        text: 'Perfecto. ¿Algo más?',
        textAr: 'ممتاز. شيء آخر؟',
        pronunciation: 'Per-fek-to. Al-go mas?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'No, gracias. Es todo.',
        textAr: 'لا، شكراً. هذا كل شيء.',
        pronunciation: 'No, gra-thyas. Es to-do.'
      },
      {
        speaker: 'Camarero',
        speakerAr: 'النادل',
        text: 'Muy bien. Enseguida se lo traigo.',
        textAr: 'جيد جداً. سأحضره لك حالاً.',
        pronunciation: 'Muy byen. En-se-gi-da se lo tray-go.'
      }
    ],
    vocabulary: [
      { word: 'desea', translation: 'يريد (رسمي)' },
      { word: 'tomar', translation: 'يأخذ، يطلب' },
      { word: 'quiero', translation: 'أريد' },
      { word: 'paella', translation: 'بايلا (طبق إسباني)' },
      { word: 'por favor', translation: 'من فضلك' },
      { word: 'para beber', translation: 'للشرب' },
      { word: 'agua', translation: 'ماء' },
      { word: 'algo más', translation: 'شيء آخر' },
      { word: 'es todo', translation: 'هذا كل شيء' },
      { word: 'enseguida', translation: 'حالاً، فوراً' }
    ],
    notes: [
      '¿Qué desea...? - Forma formal de preguntar',
      'Quiero - Forma directa de pedir algo',
      'Enseguida - Significa "right away"'
    ],
    notesAr: [
      '¿Qué desea...? - طريقة رسمية للسؤال',
      'Quiero - طريقة مباشرة لطلب شيء',
      'Enseguida - تعني "فوراً"'
    ]
  },
  {
    id: 'dialogue-shopping-1',
    title: 'Comprando Ropa',
    titleAr: 'شراء ملابس',
    level: 'beginner',
    category: 'shopping',
    situation: 'Un cliente compra una camisa en una tienda',
    situationAr: 'زبون يشتري قميصاً في محل',
    lines: [
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Buenos días. Busco una camisa.',
        textAr: 'صباح الخير. أبحث عن قميص.',
        pronunciation: 'Bwe-nos di-as. Bus-ko u-na ka-mi-sa.'
      },
      {
        speaker: 'Vendedor',
        speakerAr: 'البائع',
        text: 'Buenos días. ¿De qué color?',
        textAr: 'صباح الخير. أي لون؟',
        pronunciation: 'Bwe-nos di-as. De ke ko-lor?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Azul o blanca.',
        textAr: 'أزرق أو أبيض.',
        pronunciation: 'A-thul o blan-ka.'
      },
      {
        speaker: 'Vendedor',
        speakerAr: 'البائع',
        text: 'Tenemos estas. ¿Qué talla usa?',
        textAr: 'عندنا هذه. أي مقاس تلبس؟',
        pronunciation: 'Te-ne-mos es-tas. Ke ta-ya u-sa?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'La talla M, mediana.',
        textAr: 'مقاس M، وسط.',
        pronunciation: 'La ta-ya e-me, me-dya-na.'
      },
      {
        speaker: 'Vendedor',
        speakerAr: 'البائع',
        text: 'Aquí tiene. ¿Quiere probársela?',
        textAr: 'تفضل. هل تريد تجربتها؟',
        pronunciation: 'A-ki tye-ne. Kye-re pro-bar-se-la?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Sí, por favor. ¿Dónde están los probadores?',
        textAr: 'نعم، من فضلك. أين غرف القياس؟',
        pronunciation: 'Si, por fa-vor. Don-de es-tan los pro-ba-do-res?'
      },
      {
        speaker: 'Vendedor',
        speakerAr: 'البائع',
        text: 'Al fondo, a la derecha.',
        textAr: 'في النهاية، على اليمين.',
        pronunciation: 'Al fon-do, a la de-re-cha.'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: '(Después de probar) Me queda bien. ¿Cuánto cuesta?',
        textAr: '(بعد التجربة) مناسب لي. كم ثمنه؟',
        pronunciation: 'Me ke-da byen. Kwan-to kwes-ta?'
      },
      {
        speaker: 'Vendedor',
        speakerAr: 'البائع',
        text: 'Treinta euros.',
        textAr: 'ثلاثون يورو.',
        pronunciation: 'Treyn-ta e-u-ros.'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Perfecto. La compro. ¿Puedo pagar con tarjeta?',
        textAr: 'ممتاز. سأشتريها. هل يمكن الدفع بالبطاقة؟',
        pronunciation: 'Per-fek-to. La kom-pro. Pwe-do pa-gar kon tar-he-ta?'
      },
      {
        speaker: 'Vendedor',
        speakerAr: 'البائع',
        text: 'Sí, por supuesto.',
        textAr: 'نعم، بالطبع.',
        pronunciation: 'Si, por su-pwes-to.'
      }
    ],
    vocabulary: [
      { word: 'busco', translation: 'أبحث' },
      { word: 'camisa', translation: 'قميص' },
      { word: 'color', translation: 'لون' },
      { word: 'azul', translation: 'أزرق' },
      { word: 'blanca', translation: 'أبيض (مؤنث)' },
      { word: 'talla', translation: 'مقاس' },
      { word: 'probársela', translation: 'تجربتها' },
      { word: 'probadores', translation: 'غرف القياس' },
      { word: 'al fondo', translation: 'في النهاية' },
      { word: 'a la derecha', translation: 'على اليمين' },
      { word: 'me queda bien', translation: 'مناسب لي' },
      { word: 'cuánto cuesta', translation: 'كم ثمنه' },
      { word: 'la compro', translation: 'سأشتريها' },
      { word: 'tarjeta', translation: 'بطاقة' }
    ],
    notes: [
      '¿Qué talla usa? - Pregunta por el tamaño',
      'Me queda bien - Significa "it fits me well"',
      '¿Puedo pagar...? - Forma educada de preguntar'
    ],
    notesAr: [
      '¿Qué talla usa? - سؤال عن المقاس',
      'Me queda bien - تعني "مناسب لي"',
      '¿Puedo pagar...? - طريقة مهذبة للسؤال'
    ]
  },

  // INTERMEDIATE DIALOGUES
  {
    id: 'dialogue-doctor-1',
    title: 'En el Médico',
    titleAr: 'عند الطبيب',
    level: 'intermediate',
    category: 'health',
    situation: 'Un paciente visita al médico porque se siente mal',
    situationAr: 'مريض يزور الطبيب لأنه يشعر بالسوء',
    lines: [
      {
        speaker: 'Médico',
        speakerAr: 'الطبيب',
        text: 'Buenos días. ¿Qué le pasa? ¿Cómo se siente?',
        textAr: 'صباح الخير. ما بك؟ كيف تشعر؟',
        pronunciation: 'Bwe-nos di-as. Ke le pa-sa? Ko-mo se syen-te?'
      },
      {
        speaker: 'Paciente',
        speakerAr: 'المريض',
        text: 'Buenos días, doctor. Me siento muy mal. Tengo fiebre y me duele la garganta.',
        textAr: 'صباح الخير، دكتور. أشعر بسوء شديد. عندي حمى ويؤلمني حلقي.',
        pronunciation: 'Bwe-nos di-as, dok-tor. Me syen-to muy mal. Ten-go fye-bre i me dwe-le la gar-gan-ta.'
      },
      {
        speaker: 'Médico',
        speakerAr: 'الطبيب',
        text: '¿Desde cuándo tiene estos síntomas?',
        textAr: 'منذ متى وأنت تعاني من هذه الأعراض؟',
        pronunciation: 'Des-de kwan-do tye-ne es-tos sin-to-mas?'
      },
      {
        speaker: 'Paciente',
        speakerAr: 'المريض',
        text: 'Desde hace tres días. También tengo tos.',
        textAr: 'منذ ثلاثة أيام. وعندي أيضاً سعال.',
        pronunciation: 'Des-de a-the tres di-as. Tam-byen ten-go tos.'
      },
      {
        speaker: 'Médico',
        speakerAr: 'الطبيب',
        text: 'Entiendo. Voy a examinarle. Abra la boca, por favor.',
        textAr: 'أفهم. سأفحصك. افتح فمك، من فضلك.',
        pronunciation: 'En-tyen-do. Voy a ek-sa-mi-nar-le. A-bra la bo-ka, por fa-vor.'
      },
      {
        speaker: 'Paciente',
        speakerAr: 'المريض',
        text: '(Abre la boca) Aaah.',
        textAr: '(يفتح الفم) آآآه.',
        pronunciation: 'A-aah.'
      },
      {
        speaker: 'Médico',
        speakerAr: 'الطبيب',
        text: 'Tiene la garganta muy inflamada. Es una infección. Voy a recetarle antibióticos.',
        textAr: 'حلقك ملتهب جداً. إنها عدوى. سأصف لك مضادات حيوية.',
        pronunciation: 'Tye-ne la gar-gan-ta muy in-fla-ma-da. Es u-na in-fek-syon. Voy a re-the-tar-le an-ti-byo-ti-kos.'
      },
      {
        speaker: 'Paciente',
        speakerAr: 'المريض',
        text: '¿Cuántas veces al día debo tomar el medicamento?',
        textAr: 'كم مرة في اليوم يجب أن آخذ الدواء؟',
        pronunciation: 'Kwan-tas ve-thes al di-a de-bo to-mar el me-di-ka-men-to?'
      },
      {
        speaker: 'Médico',
        speakerAr: 'الطبيب',
        text: 'Tres veces al día, después de las comidas. Y descanse mucho.',
        textAr: 'ثلاث مرات في اليوم، بعد الوجبات. واسترح كثيراً.',
        pronunciation: 'Tres ve-thes al di-a, des-pwes de las ko-mi-das. I des-kan-se mu-cho.'
      },
      {
        speaker: 'Paciente',
        speakerAr: 'المريض',
        text: 'Entendido, doctor. ¿Cuándo debo volver?',
        textAr: 'مفهوم، دكتور. متى يجب أن أعود؟',
        pronunciation: 'En-ten-di-do, dok-tor. Kwan-do de-bo vol-ver?'
      },
      {
        speaker: 'Médico',
        speakerAr: 'الطبيب',
        text: 'Si no mejora en una semana, vuelva a verme. Que se mejore.',
        textAr: 'إذا لم تتحسن خلال أسبوع، عُد لتراني. شفاك الله.',
        pronunciation: 'Si no me-ho-ra en u-na se-ma-na, vwel-va a ver-me. Ke se me-ho-re.'
      },
      {
        speaker: 'Paciente',
        speakerAr: 'المريض',
        text: 'Muchas gracias, doctor. Hasta luego.',
        textAr: 'شكراً جزيلاً، دكتور. إلى اللقاء.',
        pronunciation: 'Mu-chas gra-thyas, dok-tor. As-ta lwe-go.'
      }
    ],
    vocabulary: [
      { word: '¿qué le pasa?', translation: 'ما بك؟' },
      { word: 'me siento', translation: 'أشعر' },
      { word: 'fiebre', translation: 'حمى' },
      { word: 'me duele', translation: 'يؤلمني' },
      { word: 'garganta', translation: 'حلق' },
      { word: 'síntomas', translation: 'أعراض' },
      { word: 'tos', translation: 'سعال' },
      { word: 'examinar', translation: 'يفحص' },
      { word: 'inflamada', translation: 'ملتهب' },
      { word: 'infección', translation: 'عدوى' },
      { word: 'recetar', translation: 'يصف (دواء)' },
      { word: 'antibióticos', translation: 'مضادات حيوية' },
      { word: 'medicamento', translation: 'دواء' },
      { word: 'descansar', translation: 'يستريح' },
      { word: 'mejorar', translation: 'يتحسن' },
      { word: 'que se mejore', translation: 'شفاك الله' }
    ],
    notes: [
      '¿Qué le pasa? - Pregunta formal por el problema',
      'Me duele + parte del cuerpo - Para expresar dolor',
      'Desde hace + tiempo - Para duración de síntomas',
      'Que se mejore - Expresión para desear recuperación'
    ],
    notesAr: [
      '¿Qué le pasa? - سؤال رسمي عن المشكلة',
      'Me duele + عضو - للتعبير عن الألم',
      'Desde hace + وقت - لمدة الأعراض',
      'Que se mejore - تعبير للتمني بالشفاء'
    ]
  },
  {
    id: 'dialogue-bank-1',
    title: 'En el Banco',
    titleAr: 'في البنك',
    level: 'intermediate',
    category: 'work',
    situation: 'Un cliente quiere abrir una cuenta bancaria',
    situationAr: 'زبون يريد فتح حساب بنكي',
    lines: [
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Buenos días. Quisiera abrir una cuenta bancaria.',
        textAr: 'صباح الخير. أود فتح حساب بنكي.',
        pronunciation: 'Bwe-nos di-as. Ki-sye-ra a-brir u-na kwen-ta ban-ka-rya.'
      },
      {
        speaker: 'Empleado',
        speakerAr: 'الموظف',
        text: 'Por supuesto. ¿Quiere una cuenta corriente o una cuenta de ahorros?',
        textAr: 'بالطبع. هل تريد حساباً جارياً أم حساب توفير؟',
        pronunciation: 'Por su-pwes-to. Kye-re u-na kwen-ta ko-ryen-te o u-na kwen-ta de a-o-rros?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Una cuenta corriente, por favor. ¿Qué documentos necesito?',
        textAr: 'حساباً جارياً، من فضلك. ما الوثائق التي أحتاجها؟',
        pronunciation: 'U-na kwen-ta ko-ryen-te, por fa-vor. Ke do-ku-men-tos ne-the-si-to?'
      },
      {
        speaker: 'Empleado',
        speakerAr: 'الموظف',
        text: 'Necesita su DNI o pasaporte, y un comprobante de domicilio.',
        textAr: 'تحتاج هويتك أو جواز سفرك، وإثبات إقامة.',
        pronunciation: 'Ne-the-si-ta su de-e-ne-i o pa-sa-por-te, i un kom-pro-ban-te de do-mi-thi-lyo.'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Aquí tiene mi pasaporte y una factura de electricidad.',
        textAr: 'تفضل جواز سفري وفاتورة كهرباء.',
        pronunciation: 'A-ki tye-ne mi pa-sa-por-te i u-na fak-tu-ra de e-lek-tri-thi-dad.'
      },
      {
        speaker: 'Empleado',
        speakerAr: 'الموظف',
        text: 'Perfecto. ¿Cuál es su ocupación?',
        textAr: 'ممتاز. ما هي مهنتك؟',
        pronunciation: 'Per-fek-to. Kwal es su o-ku-pa-thyon?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Soy ingeniero.',
        textAr: 'أنا مهندس.',
        pronunciation: 'Soy in-he-nye-ro.'
      },
      {
        speaker: 'Empleado',
        speakerAr: 'الموظف',
        text: 'Muy bien. ¿Quiere asociar una tarjeta de débito a la cuenta?',
        textAr: 'جيد جداً. هل تريد ربط بطاقة خصم بالحساب؟',
        pronunciation: 'Muy byen. Kye-re a-so-thyar u-na tar-he-ta de de-bi-to a la kwen-ta?'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'Sí, por favor. ¿Tiene comisiones?',
        textAr: 'نعم، من فضلك. هل عليها رسوم؟',
        pronunciation: 'Si, por fa-vor. Tye-ne ko-mi-syo-nes?'
      },
      {
        speaker: 'Empleado',
        speakerAr: 'الموظف',
        text: 'La cuenta no tiene comisiones si mantiene un saldo mínimo de 500 euros.',
        textAr: 'الحساب بدون رسوم إذا حافظت على رصيد أدنى 500 يورو.',
        pronunciation: 'La kwen-ta no tye-ne ko-mi-syo-nes si man-tye-ne un sal-do mi-ni-mo de ki-nyen-tos e-u-ros.'
      },
      {
        speaker: 'Cliente',
        speakerAr: 'الزبون',
        text: 'De acuerdo. ¿Cuándo puedo recoger la tarjeta?',
        textAr: 'موافق. متى يمكنني استلام البطاقة؟',
        pronunciation: 'De a-kwer-do. Kwan-do pwe-do re-ko-her la tar-he-ta?'
      },
      {
        speaker: 'Empleado',
        speakerAr: 'الموظف',
        text: 'En una semana la recibirá por correo. Mientras tanto, puede usar esta tarjeta temporal.',
        textAr: 'في غضون أسبوع ستستلمها بالبريد. وفي الوقت نفسه، يمكنك استخدام هذه البطاقة المؤقتة.',
        pronunciation: 'En u-na se-ma-na la re-thi-bi-ra por ko-rre-o. Myen-tras tan-to, pwe-de u-sar es-ta tar-he-ta tem-po-ral.'
      }
    ],
    vocabulary: [
      { word: 'quisiera', translation: 'أود' },
      { word: 'cuenta bancaria', translation: 'حساب بنكي' },
      { word: 'cuenta corriente', translation: 'حساب جاري' },
      { word: 'cuenta de ahorros', translation: 'حساب توفير' },
      { word: 'documentos', translation: 'وثائق' },
      { word: 'DNI', translation: 'الهوية الوطنية' },
      { word: 'pasaporte', translation: 'جواز سفر' },
      { word: 'comprobante', translation: 'إثبات' },
      { word: 'domicilio', translation: 'إقامة، سكن' },
      { word: 'factura', translation: 'فاتورة' },
      { word: 'ocupación', translation: 'مهنة' },
      { word: 'tarjeta de débito', translation: 'بطاقة خصم' },
      { word: 'comisiones', translation: 'رسوم' },
      { word: 'saldo mínimo', translation: 'رصيد أدنى' },
      { word: 'recoger', translation: 'يستلم' },
      { word: 'mientras tanto', translation: 'في الوقت نفسه' }
    ],
    notes: [
      'Quisiera - Forma educada de "quiero"',
      'DNI - Documento Nacional de Identidad',
      'Saldo mínimo - Balance mínimo requerido',
      'Mientras tanto - "In the meantime"'
    ],
    notesAr: [
      'Quisiera - شكل مهذب من "quiero"',
      'DNI - وثيقة الهوية الوطنية',
      'Saldo mínimo - الرصيد الأدنى المطلوب',
      'Mientras tanto - "في هذه الأثناء"'
    ]
  },

  // ADVANCED DIALOGUE
  {
    id: 'dialogue-job-interview-1',
    title: 'Entrevista de Trabajo',
    titleAr: 'مقابلة عمل',
    level: 'advanced',
    category: 'work',
    situation: 'Un candidato tiene una entrevista para un puesto de ingeniero de software',
    situationAr: 'مرشح لديه مقابلة لوظيفة مهندس برمجيات',
    lines: [
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: 'Buenos días. Gracias por venir. Siéntese, por favor.',
        textAr: 'صباح الخير. شكراً لحضورك. اجلس، من فضلك.',
        pronunciation: 'Bwe-nos di-as. Gra-thyas por ve-nir. Syen-te-se, por fa-vor.'
      },
      {
        speaker: 'Candidato',
        speakerAr: 'المرشح',
        text: 'Buenos días. Muchas gracias por la oportunidad.',
        textAr: 'صباح الخير. شكراً جزيلاً على الفرصة.',
        pronunciation: 'Bwe-nos di-as. Mu-chas gra-thyas por la o-por-tu-ni-dad.'
      },
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: 'Primero, cuénteme un poco sobre su experiencia profesional.',
        textAr: 'أولاً، حدثني قليلاً عن خبرتك المهنية.',
        pronunciation: 'Pri-me-ro, kwen-te-me un po-ko so-bre su eks-pe-ryen-thya pro-fe-syo-nal.'
      },
      {
        speaker: 'Candidato',
        speakerAr: 'المرشح',
        text: 'Por supuesto. Llevo cinco años trabajando como desarrollador full-stack. He participado en varios proyectos importantes, incluyendo el desarrollo de aplicaciones web y móviles para el sector bancario.',
        textAr: 'بالطبع. لدي خمس سنوات من العمل كمطور full-stack. شاركت في عدة مشاريع مهمة، بما في ذلك تطوير تطبيقات ويب وموبايل للقطاع المصرفي.',
        pronunciation: 'Por su-pwes-to. Ye-vo thin-ko a-nyos tra-ba-han-do ko-mo de-sa-ro-ya-dor full-stack.'
      },
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: 'Impresionante. ¿Qué tecnologías domina?',
        textAr: 'مثير للإعجاب. ما التقنيات التي تتقنها؟',
        pronunciation: 'Im-pre-syo-nan-te. Ke tek-no-lo-hi-as do-mi-na?'
      },
      {
        speaker: 'Candidato',
        speakerAr: 'المرشح',
        text: 'Principalmente trabajo con JavaScript, TypeScript, React y Node.js. También tengo experiencia con bases de datos como PostgreSQL y MongoDB.',
        textAr: 'بشكل رئيسي أعمل مع JavaScript وTypeScript وReact وNode.js. كما لدي خبرة في قواعد البيانات مثل PostgreSQL وMongoDB.',
        pronunciation: 'Prin-thi-pal-men-te tra-ba-ho kon JavaScript, TypeScript, React i Node.js.'
      },
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: '¿Por qué quiere trabajar en nuestra empresa?',
        textAr: 'لماذا تريد العمل في شركتنا؟',
        pronunciation: 'Por ke kye-re tra-ba-har en nwes-tra em-pre-sa?'
      },
      {
        speaker: 'Candidato',
        speakerAr: 'المرشح',
        text: 'Me atrae mucho la innovación que caracteriza a su empresa. Además, el proyecto que están desarrollando en inteligencia artificial me parece fascinante y me gustaría contribuir con mis habilidades.',
        textAr: 'يجذبني كثيراً الابتكار الذي يميز شركتكم. بالإضافة لذلك، المشروع الذي تطورونه في الذكاء الاصطناعي يبدو رائعاً وأود المساهمة بمهاراتي.',
        pronunciation: 'Me a-tra-e mu-cho la i-no-va-thyon ke ka-rak-te-ri-tha a su em-pre-sa.'
      },
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: '¿Cuáles considera que son sus principales fortalezas y debilidades?',
        textAr: 'ما التي تعتبرها نقاط قوتك وضعفك الرئيسية؟',
        pronunciation: 'Kwa-les kon-si-de-ra ke son sus prin-thi-pa-les for-ta-le-thas i de-bi-li-da-des?'
      },
      {
        speaker: 'Candidato',
        speakerAr: 'المرشح',
        text: 'Mi mayor fortaleza es mi capacidad para resolver problemas complejos y trabajar bien en equipo. En cuanto a debilidades, a veces soy demasiado perfeccionista, lo que puede hacer que dedique más tiempo del necesario a ciertos detalles. Sin embargo, estoy trabajando en encontrar un mejor equilibrio.',
        textAr: 'أكبر نقاط قوتي هي قدرتي على حل المشاكل المعقدة والعمل الجيد ضمن فريق. بالنسبة لنقاط الضعف، أحياناً أكون مثالياً للغاية، ما قد يجعلني أمضي وقتاً أكثر من اللازم في بعض التفاصيل. لكنني أعمل على إيجاد توازن أفضل.',
        pronunciation: 'Mi ma-yor for-ta-le-tha es mi ka-pa-thi-dad pa-ra re-sol-ver pro-ble-mas kom-ple-hos.'
      },
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: 'Excelente. ¿Tiene alguna pregunta para nosotros?',
        textAr: 'ممتاز. هل لديك أي أسئلة لنا؟',
        pronunciation: 'Ek-the-len-te. Tye-ne al-gu-na pre-gun-ta pa-ra no-so-tros?'
      },
      {
        speaker: 'Candidato',
        speakerAr: 'المرشح',
        text: 'Sí. ¿Podrían hablarme más sobre la cultura de trabajo en equipo y las oportunidades de crecimiento profesional?',
        textAr: 'نعم. هل يمكنكم إخباري المزيد عن ثقافة العمل الجماعي وفرص النمو المهني؟',
        pronunciation: 'Si. Po-dri-an a-blar-me mas so-bre la kul-tu-ra de tra-ba-ho en e-ki-po?'
      },
      {
        speaker: 'Entrevistador',
        speakerAr: 'المُحاوِر',
        text: 'Claro. Fomentamos un ambiente colaborativo donde todos los miembros del equipo tienen voz. Ofrecemos formación continua y hay muchas oportunidades de ascenso basadas en el mérito.',
        textAr: 'بالطبع. نشجع بيئة تعاونية حيث لجميع أعضاء الفريق صوت. نقدم تدريباً مستمراً وهناك فرص كثيرة للترقية بناءً على الجدارة.',
        pronunciation: 'Kla-ro. Fo-men-ta-mos un am-byen-te ko-la-bo-ra-ti-vo.'
      }
    ],
    vocabulary: [
      { word: 'entrevista', translation: 'مقابلة' },
      { word: 'oportunidad', translation: 'فرصة' },
      { word: 'experiencia profesional', translation: 'خبرة مهنية' },
      { word: 'desarrollador', translation: 'مطور' },
      { word: 'proyecto', translation: 'مشروع' },
      { word: 'dominar', translation: 'يتقن' },
      { word: 'tecnologías', translation: 'تقنيات' },
      { word: 'innovación', translation: 'ابتكار' },
      { word: 'fascinante', translation: 'رائع' },
      { word: 'contribuir', translation: 'يساهم' },
      { word: 'habilidades', translation: 'مهارات' },
      { word: 'fortalezas', translation: 'نقاط قوة' },
      { word: 'debilidades', translation: 'نقاط ضعف' },
      { word: 'resolver problemas', translation: 'حل المشاكل' },
      { word: 'perfeccionista', translation: 'مثالي' },
      { word: 'equilibrio', translation: 'توازن' },
      { word: 'cultura de trabajo', translation: 'ثقافة العمل' },
      { word: 'crecimiento profesional', translation: 'نمو مهني' },
      { word: 'fomentar', translation: 'يشجع' },
      { word: 'colaborativo', translation: 'تعاوني' },
      { word: 'formación continua', translation: 'تدريب مستمر' },
      { word: 'ascenso', translation: 'ترقية' },
      { word: 'mérito', translation: 'جدارة' }
    ],
    notes: [
      'Llevo + tiempo + gerundio - Para expresar duración de actividad',
      'Impresionante - Muy usado en contextos profesionales',
      'En cuanto a - Para introducir un nuevo tema',
      'Fomentar - "To foster" o "promote"'
    ],
    notesAr: [
      'Llevo + وقت + فعل - للتعبير عن مدة نشاط',
      'Impresionante - يُستخدم كثيراً في السياقات المهنية',
      'En cuanto a - لتقديم موضوع جديد',
      'Fomentar - "يشجع" أو "يعزز"'
    ]
  }
];

// Helper functions
export function getDialogueById(id: string): Dialogue | undefined {
  return dailyDialogues.find(dialogue => dialogue.id === id);
}

export function getDialoguesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Dialogue[] {
  return dailyDialogues.filter(dialogue => dialogue.level === level);
}

export function getDialoguesByCategory(category: Dialogue['category']): Dialogue[] {
  return dailyDialogues.filter(dialogue => dialogue.category === category);
}

export function getAllDialogues(): Dialogue[] {
  return dailyDialogues;
}

export const dialogueCategories = [
  'greetings',
  'shopping',
  'restaurant',
  'travel',
  'work',
  'health',
  'social',
  'phone',
  'emergencies'
] as const;
