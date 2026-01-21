import { VocabularyWord } from '../types';

export const vocabulary: VocabularyWord[] = [
  // Common Verbs (10)
  { word: 'hablar', translation: ['تحدث', 'تكلم'], category: 'verbos', pronunciation: 'ah-blahr' },
  { word: 'comer', translation: ['أكل', 'تناول الطعام'], category: 'verbos', pronunciation: 'koh-mehr' },
  { word: 'beber', translation: ['شرب'], category: 'verbos', pronunciation: 'beh-behr' },
  { word: 'dormir', translation: ['نام', 'يغفو'], category: 'verbos', pronunciation: 'dohr-meer' },
  { word: 'trabajar', translation: ['عمل', 'اشتغل'], category: 'verbos', pronunciation: 'trah-bah-hahr' },
  { word: 'estudiar', translation: ['درس', 'تعلم'], category: 'verbos', pronunciation: 'eh-stoo-dyahr' },
  { word: 'caminar', translation: ['مشى', 'يمشي'], category: 'verbos', pronunciation: 'kah-mee-nahr' },
  { word: 'correr', translation: ['ركض', 'يجري'], category: 'verbos', pronunciation: 'koh-rrehr' },
  { word: 'leer', translation: ['قرأ', 'يتلو'], category: 'verbos', pronunciation: 'leh-ehr' },
  { word: 'escribir', translation: ['كتب', 'دوّن'], category: 'verbos', pronunciation: 'eh-skree-beer' },

  // House Items (25)
  { word: 'casa', translation: ['منزل', 'بيت', 'دار'], category: 'casa', pronunciation: 'kah-sah' },
  { word: 'puerta', translation: ['باب'], category: 'casa', pronunciation: 'pwehr-tah' },
  { word: 'ventana', translation: ['نافذة', 'شباك'], category: 'casa', pronunciation: 'vehn-tah-nah' },
  { word: 'cocina', translation: ['مطبخ'], category: 'casa', pronunciation: 'koh-see-nah' },
  { word: 'baño', translation: ['حمام', 'دورة مياه'], category: 'casa', pronunciation: 'bah-nyoh' },
  { word: 'mesa', translation: ['طاولة'], category: 'casa', pronunciation: 'meh-sah' },
  { word: 'silla', translation: ['كرسي'], category: 'casa', pronunciation: 'see-yah' },
  { word: 'cama', translation: ['سرير'], category: 'casa', pronunciation: 'kah-mah' },
  { word: 'armario', translation: ['خزانة'], category: 'casa', pronunciation: 'ahr-mah-ryoh' },
  { word: 'lámpara', translation: ['مصباح'], category: 'casa', pronunciation: 'lahm-pah-rah' },
  { word: 'lavadora', translation: ['غسالة'], category: 'casa', pronunciation: 'lah-vah-doh-rah' },
  { word: 'televisión', translation: ['تلفاز', 'تلفزيون'], category: 'casa', pronunciation: 'teh-leh-bsee-ohn' },
  { word: 'nevera', translation: ['ثلاجة'], category: 'casa', pronunciation: 'neh-veh-rah' },
  { word: 'horno', translation: ['فرن'], category: 'casa', pronunciation: 'ohr-noh' },
  { word: 'microondas', translation: ['مايكروويف'], category: 'casa', pronunciation: 'mee-kroh-ohn-dahs' },
  { word: 'fregadero', translation: ['حوض غسيل'], category: 'casa', pronunciation: 'fre-gah-deh-roh' },
  { word: 'alfombra', translation: ['سجادة'], category: 'casa', pronunciation: 'ahl-fohm-brah' },
  { word: 'espejo', translation: ['مرآة'], category: 'casa', pronunciation: 'eh-speh-hoh' },
  { word: 'estantería', translation: ['رف', 'خزانة كتب'], category: 'casa', pronunciation: 'es-tahn-teh-ree-ah' },
  { word: 'cortina', translation: ['ستارة'], category: 'casa', pronunciation: 'kor-tee-nah' },
  { word: 'almohada', translation: ['وسادة'], category: 'casa', pronunciation: 'ahl-mo-hah-dah' },
  { word: 'colcha', translation: ['لحاف'], category: 'casa', pronunciation: 'kol-chah' },
  { word: 'perchero', translation: ['علاقة الملابس'], category: 'casa', pronunciation: 'per-cheh-roh' },
  { word: 'escalera', translation: ['درج', 'سلّم'], category: 'casa', pronunciation: 'ehs-kah-leh-rah' },
  { word: 'garaje', translation: ['مرآب'], category: 'casa', pronunciation: 'gah-rah-heh' },

  // City/Transport (25)
  { word: 'ciudad', translation: ['مدينة'], category: 'transporte', pronunciation: 'syoo-dahd' },
  { word: 'calle', translation: ['شارع'], category: 'transporte', pronunciation: 'kah-yeh' },
  { word: 'autobús', translation: ['حافلة', 'باص'], category: 'transporte', pronunciation: 'ah-oo-toh-boos' },
  { word: 'tren', translation: ['قطار'], category: 'transporte', pronunciation: 'trehn' },
  { word: 'coche', translation: ['سيارة', 'عربة'], category: 'transporte', pronunciation: 'koh-cheh' },
  { word: 'taxi', translation: ['تاكسي'], category: 'transporte', pronunciation: 'tahk-see' },
  { word: 'aeropuerto', translation: ['مطار'], category: 'transporte', pronunciation: 'ah-eh-roh-pwehr-toh' },
  { word: 'parque', translation: ['حديقة', 'منتزه'], category: 'transporte', pronunciation: 'pahr-keh' },
  { word: 'puente', translation: ['جسر'], category: 'transporte', pronunciation: 'pwehn-teh' },
  { word: 'puerto', translation: ['ميناء'], category: 'transporte', pronunciation: 'pwehr-toh' },
  { word: 'plaza', translation: ['ميدان', 'ساحة'], category: 'transporte', pronunciation: 'plah-thah' },
  { word: 'mercado', translation: ['سوق'], category: 'transporte', pronunciation: 'mehr-kah-doh' },
  { word: 'hospital', translation: ['مستشفى'], category: 'transporte', pronunciation: 'oh-spee-tahl' },
  { word: 'colegio', translation: ['مدرسة'], category: 'transporte', pronunciation: 'koh-leh-hyoh' },
  { word: 'estación', translation: ['محطة', 'محطة قطار'], category: 'transporte', pronunciation: 'eh-stah-syohn' },
  { word: 'rotonda', translation: ['دوار'], category: 'transporte', pronunciation: 'roh-tohn-dah' },
  { word: 'autopista', translation: ['طريق سريع'], category: 'transporte', pronunciation: 'ow-toh-pees-tah' },
  { word: 'carretera', translation: ['طريق'], category: 'transporte', pronunciation: 'kah-reh-teh-rah' },
  { word: 'peatón', translation: ['مشاة'], category: 'transporte', pronunciation: 'peh-ah-tohn' },
  { word: 'semáforo', translation: ['إشارة المرور'], category: 'transporte', pronunciation: 'seh-mah-foh-roh' },
  { word: 'metro', translation: ['مترو'], category: 'transporte', pronunciation: 'meh-troh' },
  { word: 'bicicleta', translation: ['دراجة'], category: 'transporte', pronunciation: 'bee-see-kleh-tah' },
  { word: 'parada', translation: ['موقف'], category: 'transporte', pronunciation: 'pah-rah-dah' },
  { word: 'peaje', translation: ['رسوم المرور'], category: 'transporte', pronunciation: 'peh-ah-heh' },

  // Emotions (10)
  { word: 'feliz', translation: ['سعيد', 'فرحان'], category: 'emociones', pronunciation: 'feh-lees' },
  { word: 'triste', translation: ['حزين'], category: 'emociones', pronunciation: 'trees-teh' },
  { word: 'enojado', translation: ['غاضب', 'مستاء'], category: 'emociones', pronunciation: 'eh-noh-hah-doh' },
  { word: 'miedo', translation: ['خوف'], category: 'emociones', pronunciation: 'myeh-doh' },
  { word: 'amor', translation: ['حب'], category: 'emociones', pronunciation: 'ah-mohr' },
  { word: 'alegría', translation: ['فرح', 'بشر'], category: 'emociones', pronunciation: 'ah-leh-gree-ah' },
  { word: 'calma', translation: ['هدوء', 'طمأنينة'], category: 'emociones', pronunciation: 'kahl-mah' },
  { word: 'nervioso', translation: ['عصبي'], category: 'emociones', pronunciation: 'ner-byo-soh' },
  { word: 'cansado', translation: ['متعب'], category: 'emociones', pronunciation: 'kahn-sah-doh' },
  { word: 'orgulloso', translation: ['فخور'], category: 'emociones', pronunciation: 'or-goo-yoh-soh' },
];

export const vocabularyCategories = [
  'verbos',
  'casa',
  'transporte',
  'emociones',
];

export function getVocabularyByCategory(category: string): VocabularyWord[] {
  return vocabulary.filter(word => word.category === category);
}
