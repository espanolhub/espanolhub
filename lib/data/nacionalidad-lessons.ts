/**
 * دروس الجنسية الإسبانية - منهج CCSE
 */

import { NacionalidadLesson, LessonCategory } from '../types/nacionalidad';

export const nacionalidadLessons: NacionalidadLesson[] = [
  {
    id: 'ccse-derechos-deberes',
    title: 'Derechos y Deberes / الحقوق والواجبات',
    category: 'constitucion',
    isFree: true,
    content: `# Derechos y Deberes (الحقوق والواجبات)

En España, los derechos fundamentales incluyen la igualdad, la libertad de expresión, la libertad religiosa y el derecho a la educación y a la salud. Los deberes incluyen respetar la ley, pagar impuestos y defender al país si procede.

العربية:

في إسبانيا، تشمل الحقوق الأساسية المساواة، حرية التعبير، الحرية الدينية، والحق في التعليم والصحة. الواجبات تشمل احترام القانون، دفع الضرائب، والدفاع عن البلد إذا لزم الأمر.
`,
    keyPoints: ['Derechos fundamentales', 'Deberes ciudadanos', 'Constitución'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-derechos-deberes-q1',
        question: '¿Cuál es uno de los derechos fundamentales recogidos en la Constitución?',
        question_ar: 'ما هو أحد الحقوق الأساسية المنصوص عليها في الدستور؟',
        options: ['Derecho a la vivienda', 'Derecho a la educación', 'Derecho a no pagar impuestos', 'Derecho a conducir sin licencia'],
        correctAnswer: 'Derecho a la educación',
        explanation: 'El derecho a la educación es uno de los derechos fundamentales reconocidos en la Constitución Española.',
        explanation_ar: 'الحق في التعليم هو أحد الحقوق الأساسية المعترف بها في الدستور الإسباني.',
      },
      {
        id: 'ccse-derechos-deberes-q2',
        question: '¿Qué deber tiene el ciudadano según la Constitución?',
        question_ar: 'ما هو واجب المواطن وفقاً للدستور؟',
        options: ['Respetar la ley', 'Ignorar las normas', 'No votar', 'Conducir a alta velocidad'],
        correctAnswer: 'Respetar la ley',
        explanation: 'Los ciudadanos tienen el deber de respetar la ley y cumplir con las obligaciones establecidas.',
        explanation_ar: 'يجب على المواطنين احترام القانون والوفاء بالالتزامات المقررة.',
      },
      {
        id: 'ccse-derechos-deberes-q3',
        question: '¿Cuál derecho protege la libertad de prensa?',
        question_ar: 'ما هو الحق الذي يحمي حرية الصحافة؟',
        options: ['Libertad de reunión', 'Libertad de expresión', 'Derecho al trabajo', 'Derecho a la vivienda'],
        correctAnswer: 'Libertad de expresión',
        explanation: 'La libertad de expresión es el derecho fundamental que protege la libertad de prensa y el derecho a expresar opiniones.',
        explanation_ar: 'حرية التعبير هي الحق الأساسي الذي يحمي حرية الصحافة والحق في التعبير عن الآراء.',
      },
      {
        id: 'ccse-derechos-deberes-q4',
        question: '¿Qué significa «deber» en el contexto constitucional?',
        question_ar: 'ماذا يعني "واجب" في السياق الدستوري؟',
        options: ['Obligaciones de los ciudadanos', 'Derechos exclusivos del gobierno', 'Privilegios de los funcionarios', 'Ninguna de las anteriores'],
        correctAnswer: 'Obligaciones de los ciudadanos',
        explanation: 'Los deberes son las obligaciones que los ciudadanos deben cumplir según la Constitución.',
        explanation_ar: 'الواجبات هي الالتزامات التي يجب على المواطنين الوفاء بها وفقاً للدستور.',
      },
      {
        id: 'ccse-derechos-deberes-q5',
        question: '¿Quién garantiza los derechos fundamentales en España?',
        question_ar: 'من يضمن الحقوق الأساسية في إسبانيا؟',
        options: ['El ayuntamiento', 'El poder judicial y la Constitución', 'La policía local', 'Las comunidades autónomas solamente'],
        correctAnswer: 'El poder judicial y la Constitución',
        explanation: 'El poder judicial y la Constitución son los garantes de los derechos fundamentales en España.',
        explanation_ar: 'السلطة القضائية والدستور هما الضامنان للحقوق الأساسية في إسبانيا.',
      },
    ],
  },
  {
    id: 'ccse-gobierno-leyes',
    title: 'Gobierno y Leyes',
    category: 'constitucion',
    content: `# Gobierno y Leyes (الحكومة والقوانين)

La Constitución Española de 1978 establece el marco democrático y los derechos fundamentales en España. Fue aprobada por referéndum tras la transición y define:

- La forma de gobierno: Monarquía parlamentaria.  
- La separación de poderes: Ejecutivo, Legislativo y Judicial.  
- Derechos y libertades fundamentales: libertad de expresión, derecho a la educación, derecho al trabajo, etc.  
- Organización territorial: Comunidades Autónomas con competencias propias.

العربية:

دستور إسبانيا 1978 يحدد الإطار الديمقراطي والحقوق الأساسية. تم إقراره بعد الانتقال الديمقراطي ويحدد:

- شكل الدولة: ملكية برلمانية.  
- فصل السلطات: التنفيذية، التشريعية، والقضائية.  
- الحقوق والحريات الأساسية: حرية التعبير، الحق في التعليم والعمل، إلخ.  
- التنظيم الإقليمي: الولايات الذاتية (Comunidades Autónomas) مع صلاحيات خاصة.`,
    keyPoints: ['Constitución 1978', 'Monarquía parlamentaria', 'Separación de poderes'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-gobierno-leyes-q1',
        question: '¿En qué año se aprobó la Constitución Española?',
        question_ar: 'في أي سنة تم إقرار الدستور الإسباني؟',
        options: ['1976', '1978', '1980', '1982'],
        correctAnswer: '1978',
        explanation: 'La Constitución Española fue aprobada el 6 de diciembre de 1978 y ratificada en referéndum por el pueblo español.',
        explanation_ar: 'تم إقرار الدستور الإسباني في 6 ديسمبر 1978 وصودق عليه في استفتاء شعبي.',
      },
      {
        id: 'ccse-gobierno-leyes-q2',
        question: '¿Cuál es el artículo de la Constitución que establece que España es un Estado social y democrático de Derecho?',
        question_ar: 'ما هو المادة في الدستور التي تنص على أن إسبانيا دولة اجتماعية وديمقراطية وذات حكم بالقانون؟',
        options: ['Artículo 1', 'Artículo 2', 'Artículo 3', 'Artículo 14'],
        correctAnswer: 'Artículo 1',
        explanation: 'El Artículo 1 de la Constitución establece que España se constituye en un Estado social y democrático de Derecho.',
        explanation_ar: 'تنص المادة 1 من الدستور على أن إسبانيا دولة اجتماعية وديمقراطية تقوم على سيادة القانون.',
      },
      {
        id: 'ccse-gobierno-leyes-q3',
        question: '¿Cuál es la lengua oficial del Estado español?',
        question_ar: 'ما هي اللغة الرسمية للدولة الإسبانية؟',
        options: ['El español', 'El castellano', 'El español y el castellano', 'El español (castellano)'],
        correctAnswer: 'El español (castellano)',
        explanation: 'El Artículo 3 de la Constitución establece que el castellano es la lengua española oficial del Estado.',
        explanation_ar: 'تنص المادة 3 من الدستور على أن اللغة القشتالية (الإسبانية) هي اللغة الرسمية للدولة.',
      },
      {
        id: 'ccse-gobierno-leyes-q4',
        question: '¿Cuántos artículos tiene la Constitución Española?',
        question_ar: 'كم عدد المواد في الدستور الإسباني؟',
        options: ['165', '169', '172', '175'],
        correctAnswer: '169',
        explanation: 'La Constitución Española tiene 169 artículos, además de disposiciones adicionales, transitorias y derogatorias.',
        explanation_ar: 'يحتوي الدستور الإسباني على 169 مادة بالإضافة إلى نصوص إضافية وانتقالية.',
      },
      {
        id: 'ccse-gobierno-leyes-q5',
        question: '¿Qué forma de gobierno tiene España según la Constitución?',
        question_ar: 'ما هو شكل الحكم في إسبانيا وفقاً للدستور؟',
        options: ['República', 'Monarquía parlamentaria', 'Monarquía absoluta', 'Dictadura'],
        correctAnswer: 'Monarquía parlamentaria',
        explanation: 'España es una monarquía parlamentaria según la Constitución de 1978.',
        explanation_ar: 'إسبانيا ملكية برلمانية وفقاً للدستور الصادر عام 1978.',
      },
      {
        id: 'ccse-gobierno-leyes-q6',
        question: '¿Cuáles son los tres poderes del Estado según la Constitución?',
        question_ar: 'ما هي السلطات الثلاث للدولة وفقاً للدستور؟',
        options: ['Ejecutivo, Legislativo y Judicial', 'Local, Regional y Nacional', 'Civil, Militar y Religioso', 'Ninguno'],
        correctAnswer: 'Ejecutivo, Legislativo y Judicial',
        explanation: 'La Constitución establece la separación de poderes en tres: Ejecutivo (Gobierno), Legislativo (Cortes) y Judicial (Tribunales).',
        explanation_ar: 'ينص الدستور على فصل السلطات إلى ثلاث: التنفيذية (الحكومة)، التشريعية (البرلمان) والقضائية (المحاكم).',
      },
    ],
  },
  {
    id: 'ccse-organizacion-territorial',
    title: 'Organización Territorial / التنظيم الترابي',
    category: 'geografia',
    content: `# Organización Territorial (التنظيم الترابي)

España se organiza en Comunidades Autónomas, provincias y municipios. Cada Comunidad Autónoma tiene un Parlamento y un Gobierno regional con competencias propias en áreas como educación y sanidad.

العربية:

تنظيم إسبانيا إدارياً يتألف من ولايات ذاتية (Comunidades Autónomas)، محافظات وبلديات. لكل ولاية برلمانها وحكومتها مع صلاحيات في مجالات مثل التعليم والصحة.
`,
    keyPoints: ['Comunidades Autónomas', 'Provincias', 'Municipios'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-organizacion-territorial-q1',
        question: '¿Qué entidad gestiona la educación en una Comunidad Autónoma?',
        question_ar: 'ما هي الجهة التي تدير التعليم في ولاية ذاتية؟',
        options: ['El Ayuntamiento', 'El Gobierno regional', 'El Parlamento Europeo', 'El Ministerio de Defensa'],
        correctAnswer: 'El Gobierno regional',
        explanation: 'El Gobierno regional de cada Comunidad Autónoma tiene competencias en educación y sanidad.',
        explanation_ar: 'حكومة كل ولاية ذاتية لها صلاحيات في مجال التعليم والصحة.',
      },
      {
        id: 'ccse-organizacion-territorial-q2',
        question: '¿Cuántas Comunidades Autónomas tiene España?',
        question_ar: 'كم عدد الولايات الذاتية في إسبانيا؟',
        options: ['15', '16', '17', '18'],
        correctAnswer: '17',
        explanation: 'España tiene 17 Comunidades Autónomas y 2 Ciudades Autónomas (Ceuta y Melilla).',
        explanation_ar: 'إسبانيا لديها 17 ولاية ذاتية ومدينتين مستقلتين (سبتة ومليلية).',
      },
      {
        id: 'ccse-organizacion-territorial-q3',
        question: '¿Qué nivel administrativo está entre la Comunidad Autónoma y el municipio?',
        question_ar: 'ما هو المستوى الإداري الذي يقع بين الولاية الذاتية والبلدية؟',
        options: ['La región', 'La provincia', 'El distrito', 'La comarca'],
        correctAnswer: 'La provincia',
        explanation: 'La organización territorial española es: Comunidad Autónoma > Provincia > Municipio.',
        explanation_ar: 'التنظيم الإداري الإسباني هو: ولاية ذاتية > محافظة > بلدية.',
      },
      {
        id: 'ccse-organizacion-territorial-q4',
        question: '¿Qué órgano de una Comunidad Autónoma elabora las leyes regionales?',
        question_ar: 'ما هو الجهاز في الولاية الذاتية الذي يضع القوانين الإقليمية؟',
        options: ['El Gobierno regional', 'El Parlamento regional', 'El Ayuntamiento', 'El Tribunal Superior'],
        correctAnswer: 'El Parlamento regional',
        explanation: 'El Parlamento de cada Comunidad Autónoma es el órgano legislativo que elabora las leyes regionales.',
        explanation_ar: 'برلمان كل ولاية ذاتية هو الجهاز التشريعي الذي يضع القوانين الإقليمية.',
      },
      {
        id: 'ccse-organizacion-territorial-q5',
        question: '¿Cuál es la capital de la Comunidad Autónoma de Cataluña?',
        question_ar: 'ما هي عاصمة ولاية كاتالونيا الذاتية؟',
        options: ['Valencia', 'Barcelona', 'Zaragoza', 'Bilbao'],
        correctAnswer: 'Barcelona',
        explanation: 'Barcelona es la capital de Cataluña, una de las 17 Comunidades Autónomas de España.',
        explanation_ar: 'برشلونة هي عاصمة كاتالونيا، إحدى الـ17 ولاية ذاتية في إسبانيا.',
      },
    ],
  },
  {
    id: 'ccse-monarquia-parlamentaria',
    title: 'Monarquía Parlamentaria / الملكية البرلمانية',
    category: 'constitucion',
    content: `# Monarquía Parlamentaria (الملكية البرلمانية)

España es una monarquía parlamentaria: el Rey es jefe del Estado y las decisiones políticas las toma el Gobierno elegido por el Parlamento.

العربية:

إسبانيا ملكية برلمانية؛ الملك رئيس الدولة لكن الحكومة والبرلمان هما المؤسستان المنتخبتان اللتان تتخذ السياسات.
`,
    keyPoints: ['Rey', 'Parlamento', 'Gobierno elegido'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-monarquia-parlamentaria-q1',
        question: '¿Quién es jefe del Estado en España?',
        question_ar: 'من هو رئيس الدولة في إسبانيا؟',
        options: ['El Presidente del Gobierno', 'El Rey', 'El Ministro del Interior', 'El Alcalde'],
        correctAnswer: 'El Rey',
        explanation: 'En una monarquía parlamentaria, el Rey es el jefe del Estado, mientras que el Presidente del Gobierno dirige el poder ejecutivo.',
        explanation_ar: 'في الملكية البرلمانية، الملك هو رئيس الدولة، بينما رئيس الحكومة يوجه السلطة التنفيذية.',
      },
      {
        id: 'ccse-monarquia-parlamentaria-q2',
        question: '¿Quién toma las decisiones políticas en una monarquía parlamentaria?',
        question_ar: 'من يتخذ القرارات السياسية في الملكية البرلمانية؟',
        options: ['El Rey', 'El Gobierno elegido por el Parlamento', 'El Ejército', 'Las Comunidades Autónomas'],
        correctAnswer: 'El Gobierno elegido por el Parlamento',
        explanation: 'En una monarquía parlamentaria, el Gobierno elegido por el Parlamento toma las decisiones políticas, mientras que el Rey tiene funciones representativas.',
        explanation_ar: 'في الملكية البرلمانية، الحكومة المنتخبة من البرلمان تتخذ القرارات السياسية، بينما الملك له وظائف تمثيلية.',
      },
      {
        id: 'ccse-monarquia-parlamentaria-q3',
        question: '¿Cuál es el papel del Rey en una monarquía parlamentaria?',
        question_ar: 'ما هو دور الملك في الملكية البرلمانية؟',
        options: ['Tomar decisiones políticas', 'Representar al Estado y arbitrar', 'Gobernar directamente', 'Nombrar ministros sin consultar'],
        correctAnswer: 'Representar al Estado y arbitrar',
        explanation: 'El Rey en España tiene funciones de representación del Estado y arbitraje, pero no toma decisiones políticas directas.',
        explanation_ar: 'الملك في إسبانيا له وظائف تمثيلية وتحكيمية، لكنه لا يتخذ قرارات سياسية مباشرة.',
      },
      {
        id: 'ccse-monarquia-parlamentaria-q4',
        question: '¿Qué diferencia a una monarquía parlamentaria de una monarquía absoluta?',
        question_ar: 'ما الفرق بين الملكية البرلمانية والملكية المطلقة؟',
        options: ['En la parlamentaria el Rey gobierna directamente', 'En la parlamentaria el poder político lo ejerce el Gobierno elegido', 'No hay diferencia', 'En la absoluta el Rey no existe'],
        correctAnswer: 'En la parlamentaria el poder político lo ejerce el Gobierno elegido',
        explanation: 'En una monarquía parlamentaria, el poder político lo ejerce el Gobierno elegido democráticamente, mientras que en una monarquía absoluta el Rey tiene todo el poder.',
        explanation_ar: 'في الملكية البرلمانية، السلطة السياسية يمارسها الحكومة المنتخبة ديمقراطياً، بينما في الملكية المطلقة الملك لديه كل السلطة.',
      },
      {
        id: 'ccse-monarquia-parlamentaria-q5',
        question: '¿Quién elige al Gobierno en España?',
        question_ar: 'من ينتخب الحكومة في إسبانيا؟',
        options: ['El Rey directamente', 'El Parlamento (Cortes Generales)', 'El Ejército', 'Las Comunidades Autónomas'],
        correctAnswer: 'El Parlamento (Cortes Generales)',
        explanation: 'El Gobierno es elegido por el Parlamento (Cortes Generales) a través del sistema democrático de elecciones.',
        explanation_ar: 'الحكومة تُنتخب من قبل البرلمان (الكورتيس العامة) عبر النظام الديمقراطي للانتخابات.',
      },
    ],
  },
  {
    id: 'ccse-cultura-tradiciones',
    title: 'Cultura y Tradiciones / الثقافة والتقاليد',
    category: 'cultura',
    content: `# Cultura y Tradiciones (الثقافة والتقاليد)

España tiene una rica diversidad cultural: fiestas locales, gastronomía variada y tradiciones regionales que reflejan la historia de cada territorio.

العربية:

إسبانيا بلد ذو ثقافات متعددة؛ لكل منطقة عاداتها، أطباقها التقليدية واحتفالاتها الشعبية.
`,
    keyPoints: ['Fiestas regionales', 'Gastronomía', 'Diversidad cultural'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-cultura-tradiciones-q1',
        question: '¿Qué elemento forma parte de la cultura regional española?',
        question_ar: 'ما هو العنصر الذي يشكل جزءاً من الثقافة الإقليمية الإسبانية؟',
        options: ['La gastronomía', 'Solo la música internacional', 'Ninguna tradición', 'Comunicaciones públicas'],
        correctAnswer: 'La gastronomía',
        explanation: 'La gastronomía es uno de los elementos fundamentales de la cultura regional española, junto con las fiestas y tradiciones.',
        explanation_ar: 'المأكولات التقليدية هي أحد العناصر الأساسية للثقافة الإقليمية الإسبانية، إلى جانب المهرجانات والتقاليد.',
      },
      {
        id: 'ccse-cultura-tradiciones-q2',
        question: '¿Qué caracteriza la diversidad cultural de España?',
        question_ar: 'ما الذي يميز التنوع الثقافي في إسبانيا؟',
        options: ['Uniformidad en todas las regiones', 'Tradiciones regionales que reflejan la historia de cada territorio', 'Ausencia de fiestas locales', 'Cultura única sin variaciones'],
        correctAnswer: 'Tradiciones regionales que reflejan la historia de cada territorio',
        explanation: 'España tiene una rica diversidad cultural con tradiciones regionales únicas que reflejan la historia y características de cada territorio.',
        explanation_ar: 'إسبانيا لديها تنوع ثقافي غني مع تقاليد إقليمية فريدة تعكس تاريخ وخصائص كل إقليم.',
      },
      {
        id: 'ccse-cultura-tradiciones-q3',
        question: '¿Qué tipo de celebraciones forman parte de la cultura española?',
        question_ar: 'ما نوع الاحتفالات التي تشكل جزءاً من الثقافة الإسبانية؟',
        options: ['Solo celebraciones nacionales', 'Fiestas locales y regionales', 'Ninguna celebración', 'Solo celebraciones internacionales'],
        correctAnswer: 'Fiestas locales y regionales',
        explanation: 'Las fiestas locales y regionales son parte esencial de la cultura española, como las Fallas en Valencia, la Feria de Abril en Sevilla, etc.',
        explanation_ar: 'المهرجانات المحلية والإقليمية جزء أساسي من الثقافة الإسبانية، مثل فالاس في فالنسيا، معرض أبريل في إشبيلية، إلخ.',
      },
      {
        id: 'ccse-cultura-tradiciones-q4',
        question: '¿Por qué España tiene una rica diversidad cultural?',
        question_ar: 'لماذا إسبانيا لديها تنوع ثقافي غني؟',
        options: ['Por su historia y las diferentes regiones', 'Por falta de identidad común', 'Por influencia exclusiva externa', 'No tiene diversidad cultural'],
        correctAnswer: 'Por su historia y las diferentes regiones',
        explanation: 'La rica diversidad cultural de España se debe a su historia compleja y a las características únicas de cada región.',
        explanation_ar: 'التنوع الثقافي الغني في إسبانيا يرجع إلى تاريخها المعقد والخصائص الفريدة لكل منطقة.',
      },
      {
        id: 'ccse-cultura-tradiciones-q5',
        question: '¿Qué reflejan las tradiciones regionales españolas?',
        question_ar: 'ماذا تعكس التقاليد الإقليمية الإسبانية؟',
        options: ['Solo el presente', 'La historia de cada territorio', 'Culturas extranjeras exclusivamente', 'Nada específico'],
        correctAnswer: 'La historia de cada territorio',
        explanation: 'Las tradiciones regionales españolas reflejan la historia, identidad y características propias de cada territorio.',
        explanation_ar: 'التقاليد الإقليمية الإسبانية تعكس تاريخ وهوية وخصائص كل إقليم.',
      },
    ],
  },
  {
    id: 'ccse-derechos-sociales',
    title: 'Derechos Sociales / الحقوق الاجتماعية',
    category: 'constitucion',
    content: `# Derechos Sociales (الحقوق الاجتماعية)

La Constitución reconoce derechos sociales como la protección de la salud, la educación y la seguridad social.

العربية:

الدستور يضمن حقوقاً اجتماعية مثل الصحة والتعليم والضمان الاجتماعي.
`,
    keyPoints: ['Salud', 'Educación', 'Seguridad social'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-derechos-sociales-q1',
        question: '¿Qué derecho social está protegido por la Constitución?',
        question_ar: 'ما هو الحق الاجتماعي المحمي بموجب الدستور؟',
        options: ['Derecho a la salud', 'Derecho a conducir sin licencia', 'Derecho a no pagar impuestos', 'Derecho a no trabajar'],
        correctAnswer: 'Derecho a la salud',
        explanation: 'La Constitución reconoce el derecho a la protección de la salud como uno de los derechos sociales fundamentales.',
        explanation_ar: 'الدستور يعترف بالحق في حماية الصحة كأحد الحقوق الاجتماعية الأساسية.',
      },
      {
        id: 'ccse-derechos-sociales-q2',
        question: '¿Qué incluyen los derechos sociales según la Constitución?',
        question_ar: 'ماذا تشمل الحقوق الاجتماعية وفقاً للدستور؟',
        options: ['Solo el derecho al trabajo', 'Protección de la salud, educación y seguridad social', 'Solo derechos económicos', 'Ningún derecho'],
        correctAnswer: 'Protección de la salud, educación y seguridad social',
        explanation: 'Los derechos sociales reconocidos por la Constitución incluyen la protección de la salud, la educación y la seguridad social.',
        explanation_ar: 'الحقوق الاجتماعية المعترف بها في الدستور تشمل حماية الصحة والتعليم والضمان الاجتماعي.',
      },
      {
        id: 'ccse-derechos-sociales-q3',
        question: '¿Qué garantiza el derecho a la educación?',
        question_ar: 'ماذا يضمن الحق في التعليم؟',
        options: ['Educación privada exclusivamente', 'Acceso a la educación para todos', 'Educación solo para algunos', 'Ausencia de educación pública'],
        correctAnswer: 'Acceso a la educación para todos',
        explanation: 'El derecho a la educación garantiza el acceso a la educación para todos los ciudadanos, siendo un derecho social fundamental.',
        explanation_ar: 'الحق في التعليم يضمن الوصول إلى التعليم لجميع المواطنين، وهو حق اجتماعي أساسي.',
      },
      {
        id: 'ccse-derechos-sociales-q4',
        question: '¿Qué es la seguridad social?',
        question_ar: 'ما هو الضمان الاجتماعي؟',
        options: ['Un sistema de protección social', 'Solo pensiones', 'Un sistema privado', 'No existe en España'],
        correctAnswer: 'Un sistema de protección social',
        explanation: 'La seguridad social es un sistema de protección social que incluye pensiones, prestaciones por desempleo, asistencia sanitaria, etc.',
        explanation_ar: 'الضمان الاجتماعي هو نظام حماية اجتماعية يشمل المعاشات، إعانات البطالة، الرعاية الصحية، إلخ.',
      },
      {
        id: 'ccse-derechos-sociales-q5',
        question: '¿Quién garantiza los derechos sociales en España?',
        question_ar: 'من يضمن الحقوق الاجتماعية في إسبانيا؟',
        options: ['Solo las empresas privadas', 'El Estado a través de la Constitución y las leyes', 'Solo las Comunidades Autónomas', 'Nadie'],
        correctAnswer: 'El Estado a través de la Constitución y las leyes',
        explanation: 'El Estado garantiza los derechos sociales a través de la Constitución y las leyes que desarrollan estos derechos.',
        explanation_ar: 'الدولة تضمن الحقوق الاجتماعية من خلال الدستور والقوانين التي تنفذ هذه الحقوق.',
      },
    ],
  },
  {
    id: 'ccse-ciudadania-participacion',
    title: 'Ciudadanía y Participación / المواطنة والمشاركة',
    category: 'constitucion',
    content: `# Ciudadanía y Participación (المواطنة والمشاركة)

La participación ciudadana incluye votar en elecciones, asociarse y participar en la vida pública para fortalecer la democracia.

العربية:

المشاركة المدنية تعني التصويت، الانضمام إلى جمعيات والمشاركة في الحياة العامة لتعزيز الديمقراطية.
`,
    keyPoints: ['Voto', 'Asociaciones', 'Democracia'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-ciudadania-participacion-q1',
        question: '¿Qué acción es participación ciudadana?',
        question_ar: 'ما هو الفعل الذي يعتبر مشاركة مدنية؟',
        options: ['Votar en elecciones', 'Evadir impuestos', 'Ignorar las leyes', 'Todas las anteriores'],
        correctAnswer: 'Votar en elecciones',
        explanation: 'Votar en elecciones es una forma fundamental de participación ciudadana en una democracia.',
        explanation_ar: 'التصويت في الانتخابات هو شكل أساسي من أشكال المشاركة المدنية في الديمقراطية.',
      },
      {
        id: 'ccse-ciudadania-participacion-q2',
        question: '¿Qué formas de participación ciudadana existen en España?',
        question_ar: 'ما هي أشكال المشاركة المدنية الموجودة في إسبانيا؟',
        options: ['Solo el voto', 'Votar, asociarse y participar en la vida pública', 'Solo asociaciones', 'Ninguna participación'],
        correctAnswer: 'Votar, asociarse y participar en la vida pública',
        explanation: 'La participación ciudadana incluye múltiples formas: votar en elecciones, asociarse y participar en la vida pública.',
        explanation_ar: 'المشاركة المدنية تشمل أشكالاً متعددة: التصويت في الانتخابات، الانضمام إلى جمعيات والمشاركة في الحياة العامة.',
      },
      {
        id: 'ccse-ciudadania-participacion-q3',
        question: '¿Cuál es el objetivo de la participación ciudadana?',
        question_ar: 'ما هو هدف المشاركة المدنية؟',
        options: ['Debilitar la democracia', 'Fortalecer la democracia', 'Eliminar las instituciones', 'Aislar a los ciudadanos'],
        correctAnswer: 'Fortalecer la democracia',
        explanation: 'La participación ciudadana tiene como objetivo fortalecer la democracia a través del involucramiento activo de los ciudadanos.',
        explanation_ar: 'المشاركة المدنية تهدف إلى تعزيز الديمقراطية من خلال إشراك المواطنين بنشاط.',
      },
      {
        id: 'ccse-ciudadania-participacion-q4',
        question: '¿Qué derecho permite a los ciudadanos formar asociaciones?',
        question_ar: 'ما هو الحق الذي يسمح للمواطنين بتشكيل جمعيات؟',
        options: ['Derecho de asociación', 'Derecho a no participar', 'Derecho exclusivo del gobierno', 'No existe tal derecho'],
        correctAnswer: 'Derecho de asociación',
        explanation: 'El derecho de asociación permite a los ciudadanos formar y participar en asociaciones para diversos fines legítimos.',
        explanation_ar: 'حق التجمع يسمح للمواطنين بتشكيل والمشاركة في جمعيات لأغراض مشروعة مختلفة.',
      },
      {
        id: 'ccse-ciudadania-participacion-q5',
        question: '¿En qué elecciones pueden participar los ciudadanos españoles?',
        question_ar: 'في أي انتخابات يمكن للمواطنين الإسبان المشاركة؟',
        options: ['Solo elecciones nacionales', 'Elecciones municipales, autonómicas, nacionales y europeas', 'Solo elecciones locales', 'Ninguna elección'],
        correctAnswer: 'Elecciones municipales, autonómicas, nacionales y europeas',
        explanation: 'Los ciudadanos españoles pueden participar en elecciones municipales, autonómicas, nacionales y europeas.',
        explanation_ar: 'يمكن للمواطنين الإسبان المشاركة في انتخابات البلديات، الولايات الذاتية، الوطنية والأوروبية.',
      },
    ],
  },
  {
    id: 'ccse-poderes-publicos',
    title: 'Poderes Públicos / السلطات العامة',
    category: 'constitucion',
    content: `# Poderes Públicos (السلطات العامة)

En España existe la separación de poderes: legislativo (Cortes Generales), ejecutivo (Gobierno) y judicial (tribunales).

العربية:

يوجد فصل للسلطات: التشريعية (البرلمان)، التنفيذية (الحكومة) والقضائية (المحاكم).
`,
    keyPoints: ['Separación de poderes', 'Cortes Generales', 'Tribunales'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-poderes-publicos-q1',
        question: '¿Qué poder interpreta la ley?',
        question_ar: 'ما هي السلطة التي تفسر القانون؟',
        options: ['Ejecutivo', 'Legislativo', 'Judicial', 'Administrativo'],
        correctAnswer: 'Judicial',
        explanation: 'El poder judicial (tribunales) es el encargado de interpretar y aplicar las leyes.',
        explanation_ar: 'السلطة القضائية (المحاكم) هي المسؤولة عن تفسير وتطبيق القوانين.',
      },
      {
        id: 'ccse-poderes-publicos-q2',
        question: '¿Cuáles son los tres poderes del Estado en España?',
        question_ar: 'ما هي السلطات الثلاث للدولة في إسبانيا؟',
        options: ['Legislativo, Ejecutivo y Judicial', 'Local, Regional y Nacional', 'Civil, Militar y Religioso', 'Ninguno'],
        correctAnswer: 'Legislativo, Ejecutivo y Judicial',
        explanation: 'En España existe la separación de poderes en tres: legislativo (Cortes Generales), ejecutivo (Gobierno) y judicial (tribunales).',
        explanation_ar: 'في إسبانيا يوجد فصل للسلطات إلى ثلاث: تشريعية (البرلمان)، تنفيذية (الحكومة) وقضائية (المحاكم).',
      },
      {
        id: 'ccse-poderes-publicos-q3',
        question: '¿Qué poder elabora las leyes?',
        question_ar: 'ما هي السلطة التي تضع القوانين؟',
        options: ['El poder ejecutivo', 'El poder legislativo (Cortes Generales)', 'El poder judicial', 'El poder militar'],
        correctAnswer: 'El poder legislativo (Cortes Generales)',
        explanation: 'El poder legislativo, representado por las Cortes Generales (Congreso y Senado), es el encargado de elaborar las leyes.',
        explanation_ar: 'السلطة التشريعية، الممثلة في الكورتيس العامة (المجلس والشيوخ)، هي المسؤولة عن وضع القوانين.',
      },
      {
        id: 'ccse-poderes-publicos-q4',
        question: '¿Qué poder ejecuta las leyes?',
        question_ar: 'ما هي السلطة التي تنفذ القوانين؟',
        options: ['El poder legislativo', 'El poder ejecutivo (Gobierno)', 'El poder judicial', 'El poder local'],
        correctAnswer: 'El poder ejecutivo (Gobierno)',
        explanation: 'El poder ejecutivo, representado por el Gobierno, es el encargado de ejecutar y hacer cumplir las leyes.',
        explanation_ar: 'السلطة التنفيذية، الممثلة في الحكومة، هي المسؤولة عن تنفيذ وضمان امتثال القوانين.',
      },
      {
        id: 'ccse-poderes-publicos-q5',
        question: '¿Por qué es importante la separación de poderes?',
        question_ar: 'لماذا فصل السلطات مهم؟',
        options: ['Para concentrar el poder', 'Para garantizar el equilibrio y evitar abusos', 'Para eliminar la democracia', 'No es importante'],
        correctAnswer: 'Para garantizar el equilibrio y evitar abusos',
        explanation: 'La separación de poderes es fundamental para garantizar el equilibrio entre las instituciones y evitar abusos de poder.',
        explanation_ar: 'فصل السلطات أساسي لضمان التوازن بين المؤسسات وتجنب إساءة استخدام السلطة.',
      },
    ],
  },
  {
    id: 'ccse-derechos-fundamentales',
    title: 'Libertades Fundamentales / الحريات الأساسية',
    category: 'constitucion',
    content: `# Libertades Fundamentales (الحريات الأساسية)

Las libertades incluyen la libertad de expresión, religiosa, de reunión y de asociación. Están protegidas por la Constitución.

العربية:

الحريات الأساسية محمية بموجب الدستور وتشمل حرية التعبير والدين والاجتماع.
`,
    keyPoints: ['Libertad de expresión', 'Libertad religiosa', 'Reunión'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-derechos-fundamentales-q1',
        question: '¿Cuál es una libertad fundamental protegida por la Constitución?',
        question_ar: 'ما هي إحدى الحريات الأساسية المحمية بموجب الدستور؟',
        options: ['Libertad de expresión', 'Libertad de evasión', 'Libertad a no pagar impuestos', 'Libertad a no respetar las leyes'],
        correctAnswer: 'Libertad de expresión',
        explanation: 'La libertad de expresión es una de las libertades fundamentales protegidas por la Constitución Española.',
        explanation_ar: 'حرية التعبير هي إحدى الحريات الأساسية المحمية بموجب الدستور الإسباني.',
      },
      {
        id: 'ccse-derechos-fundamentales-q2',
        question: '¿Qué libertades están protegidas por la Constitución?',
        question_ar: 'ما هي الحريات المحمية بموجب الدستور؟',
        options: ['Solo la libertad de expresión', 'Libertad de expresión, religiosa, de reunión y de asociación', 'Solo la libertad religiosa', 'Ninguna libertad'],
        correctAnswer: 'Libertad de expresión, religiosa, de reunión y de asociación',
        explanation: 'La Constitución protege múltiples libertades fundamentales: expresión, religiosa, de reunión y de asociación.',
        explanation_ar: 'الدستور يحمي حريات أساسية متعددة: التعبير، الدين، الاجتماع والتجمع.',
      },
      {
        id: 'ccse-derechos-fundamentales-q3',
        question: '¿Qué garantiza la libertad religiosa?',
        question_ar: 'ماذا تضمن الحرية الدينية؟',
        options: ['Obligación de seguir una religión', 'Libertad para practicar cualquier religión o no practicar ninguna', 'Prohibición de todas las religiones', 'Religión única obligatoria'],
        correctAnswer: 'Libertad para practicar cualquier religión o no practicar ninguna',
        explanation: 'La libertad religiosa garantiza el derecho a practicar cualquier religión o no practicar ninguna, sin discriminación.',
        explanation_ar: 'الحرية الدينية تضمن الحق في ممارسة أي دين أو عدم ممارسة أي دين، دون تمييز.',
      },
      {
        id: 'ccse-derechos-fundamentales-q4',
        question: '¿Qué permite la libertad de reunión?',
        question_ar: 'ماذا تسمح به حرية الاجتماع؟',
        options: ['Reunirse solo en privado', 'Reunirse pacíficamente en público y privado', 'Prohibir todas las reuniones', 'Solo reuniones gubernamentales'],
        correctAnswer: 'Reunirse pacíficamente en público y privado',
        explanation: 'La libertad de reunión permite a los ciudadanos reunirse pacíficamente tanto en público como en privado, siempre que sea legal.',
        explanation_ar: 'حرية الاجتماع تسمح للمواطنين بالاجتماع سلمياً في الأماكن العامة والخاصة، طالما كان ذلك قانونياً.',
      },
      {
        id: 'ccse-derechos-fundamentales-q5',
        question: '¿Quién protege las libertades fundamentales?',
        question_ar: 'من يحمي الحريات الأساسية؟',
        options: ['Solo el gobierno', 'La Constitución y las leyes', 'Solo las empresas', 'Nadie'],
        correctAnswer: 'La Constitución y las leyes',
        explanation: 'Las libertades fundamentales están protegidas por la Constitución y desarrolladas por las leyes que garantizan su ejercicio.',
        explanation_ar: 'الحريات الأساسية محمية بموجب الدستور وتطورها القوانين التي تضمن ممارستها.',
      },
    ],
  },
  {
    id: 'ccse-organos-de-gobierno',
    title: 'Órganos de Gobierno / أجهزة الحكومة',
    category: 'constitucion',
    content: `# Órganos de Gobierno (أجهزة الحكومة)

Los principales órganos son: el Presidente del Gobierno, los ministros y el Consejo de Ministros. Se encargan de ejecutar las leyes.

العربية:

الأجهزة الرئيسية للحكم تشمل رئيس الحكومة والوزراء والمجلس الوزاري الذي ينفذ القوانين.
`,
    keyPoints: ['Presidente del Gobierno', 'Ministros', 'Ejecución de leyes'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-organos-de-gobierno-q1',
        question: '¿Quién dirige la política general del país?',
        question_ar: 'من يوجه السياسة العامة للبلاد؟',
        options: ['El Presidente del Gobierno', 'El Rey', 'El Parlamento Europeo', 'El Alcalde'],
        correctAnswer: 'El Presidente del Gobierno',
        explanation: 'El Presidente del Gobierno es quien dirige la política general del país y preside el Consejo de Ministros.',
        explanation_ar: 'رئيس الحكومة هو من يوجه السياسة العامة للبلاد ويرأس المجلس الوزاري.',
      },
      {
        id: 'ccse-organos-de-gobierno-q2',
        question: '¿Qué órganos forman parte del poder ejecutivo?',
        question_ar: 'ما هي الأجهزة التي تشكل جزءاً من السلطة التنفيذية؟',
        options: ['Solo el Presidente', 'Presidente del Gobierno, ministros y Consejo de Ministros', 'Solo los tribunales', 'Solo el Parlamento'],
        correctAnswer: 'Presidente del Gobierno, ministros y Consejo de Ministros',
        explanation: 'Los principales órganos del poder ejecutivo son el Presidente del Gobierno, los ministros y el Consejo de Ministros.',
        explanation_ar: 'الأجهزة الرئيسية للسلطة التنفيذية هي رئيس الحكومة والوزراء والمجلس الوزاري.',
      },
      {
        id: 'ccse-organos-de-gobierno-q3',
        question: '¿Cuál es la función principal de estos órganos de gobierno?',
        question_ar: 'ما هي الوظيفة الرئيسية لهذه الأجهزة الحكومية؟',
        options: ['Crear leyes', 'Ejecutar las leyes', 'Juzgar delitos', 'Gobernar municipios'],
        correctAnswer: 'Ejecutar las leyes',
        explanation: 'Los órganos de gobierno (Presidente, ministros, Consejo de Ministros) se encargan de ejecutar las leyes aprobadas por el Parlamento.',
        explanation_ar: 'الأجهزة الحكومية (رئيس الحكومة، الوزراء، المجلس الوزاري) مسؤولة عن تنفيذ القوانين المعتمدة من قبل البرلمان.',
      },
      {
        id: 'ccse-organos-de-gobierno-q4',
        question: '¿Quién preside el Consejo de Ministros?',
        question_ar: 'من يرأس المجلس الوزاري؟',
        options: ['El Rey', 'El Presidente del Gobierno', 'Un ministro elegido', 'El Presidente del Parlamento'],
        correctAnswer: 'El Presidente del Gobierno',
        explanation: 'El Presidente del Gobierno es quien preside el Consejo de Ministros.',
        explanation_ar: 'رئيس الحكومة هو من يرأس المجلس الوزاري.',
      },
      {
        id: 'ccse-organos-de-gobierno-q5',
        question: '¿Qué diferencia al poder ejecutivo del legislativo?',
        question_ar: 'ما الفرق بين السلطة التنفيذية والتشريعية؟',
        options: ['El ejecutivo crea leyes, el legislativo las ejecuta', 'El ejecutivo ejecuta las leyes, el legislativo las crea', 'No hay diferencia', 'Ambos crean leyes'],
        correctAnswer: 'El ejecutivo ejecuta las leyes, el legislativo las crea',
        explanation: 'El poder legislativo (Parlamento) crea las leyes, mientras que el poder ejecutivo (Gobierno) las ejecuta y aplica.',
        explanation_ar: 'السلطة التشريعية (البرلمان) تضع القوانين، بينما السلطة التنفيذية (الحكومة) تنفذها وتطبقها.',
      },
    ],
  },
  {
    id: 'ccse-historia-reciente',
    title: 'Historia reciente de España / التاريخ الحديث لإسبانيا',
    category: 'historia',
    content: `# Historia reciente (التاريخ الحديث)

Tras la dictadura, España experimentó una transición democrática que culminó con la Constitución de 1978 y la consolidación de instituciones democráticas.

العربية:

بعد الديكتاتورية، مرت إسبانيا بمرحلة انتقال ديمقراطي أدت إلى دستور 1978 وبناء مؤسسات ديمقراطية.
`,
    keyPoints: ['Transición', '1978', 'Democracia'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-historia-reciente-q1',
        question: '¿En qué año se aprobó la Constitución Española?',
        question_ar: 'في أي سنة تم إقرار الدستور الإسباني؟',
        options: ['1978', '1982', '1975', '1992'],
        correctAnswer: '1978',
        explanation: 'La Constitución Española fue aprobada el 6 de diciembre de 1978, marcando el fin de la transición democrática.',
        explanation_ar: 'تم إقرار الدستور الإسباني في 6 ديسمبر 1978، معلناً نهاية المرحلة الانتقالية الديمقراطية.',
      },
      {
        id: 'ccse-historia-reciente-q2',
        question: '¿Qué período histórico precedió a la Constitución de 1978?',
        question_ar: 'ما هي الفترة التاريخية التي سبقت دستور 1978؟',
        options: ['La República', 'La dictadura', 'La monarquía absoluta', 'La ocupación extranjera'],
        correctAnswer: 'La dictadura',
        explanation: 'Tras la dictadura, España experimentó una transición democrática que culminó con la Constitución de 1978.',
        explanation_ar: 'بعد الديكتاتورية، مرت إسبانيا بمرحلة انتقال ديمقراطي انتهت بدستور 1978.',
      },
      {
        id: 'ccse-historia-reciente-q3',
        question: '¿Qué caracterizó la transición democrática española?',
        question_ar: 'ما الذي ميز المرحلة الانتقالية الديمقراطية الإسبانية؟',
        options: ['Violencia y conflictos', 'Proceso pacífico hacia la democracia', 'Continuidad del régimen anterior', 'Ocupación militar'],
        correctAnswer: 'Proceso pacífico hacia la democracia',
        explanation: 'La transición democrática española fue un proceso pacífico que llevó a la consolidación de instituciones democráticas.',
        explanation_ar: 'المرحلة الانتقالية الديمقراطية الإسبانية كانت عملية سلمية أدت إلى بناء مؤسسات ديمقراطية.',
      },
      {
        id: 'ccse-historia-reciente-q4',
        question: '¿Qué consolidó la Constitución de 1978?',
        question_ar: 'ماذا رسخ دستور 1978؟',
        options: ['La dictadura', 'Las instituciones democráticas', 'El régimen anterior', 'La ocupación'],
        correctAnswer: 'Las instituciones democráticas',
        explanation: 'La Constitución de 1978 consolidó las instituciones democráticas y estableció el marco legal para el Estado democrático.',
        explanation_ar: 'دستور 1978 رسخ المؤسسات الديمقراطية وأرسى الإطار القانوني للدولة الديمقراطية.',
      },
      {
        id: 'ccse-historia-reciente-q5',
        question: '¿Cómo se aprobó la Constitución de 1978?',
        question_ar: 'كيف تم إقرار دستور 1978؟',
        options: ['Por decreto', 'Por referéndum popular', 'Por imposición militar', 'Por decisión única del gobierno'],
        correctAnswer: 'Por referéndum popular',
        explanation: 'La Constitución de 1978 fue aprobada por referéndum popular, dando legitimidad democrática al texto constitucional.',
        explanation_ar: 'تم إقرار دستور 1978 في استفتاء شعبي، مما أعطى الشرعية الديمقراطية للنص الدستوري.',
      },
    ],
  },
  {
    id: 'ccse-geografia-climatica',
    title: 'Geografía y Clima / الجغرافيا والمناخ',
    category: 'geografia',
    content: `# Geografía y Clima (الجغرافيا والمناخ)

España tiene variados climas: mediterráneo, oceánico y continental. La geografía incluye montañas, costas y mesetas.

العربية:

إسبانيا ذات مناخ متنوع وجغرافيا تشمل جبال وسواحل وهضاب.
`,
    keyPoints: ['Climas', 'Montañas', 'Costas'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-geografia-climatica-q1',
        question: '¿Qué tipo de clima hay en la costa mediterránea?',
        question_ar: 'ما نوع المناخ في الساحل المتوسطي؟',
        options: ['Mediterráneo', 'Polar', 'Desértico', 'Continental'],
        correctAnswer: 'Mediterráneo',
        explanation: 'La costa mediterránea de España tiene un clima mediterráneo caracterizado por veranos cálidos y secos e inviernos suaves.',
        explanation_ar: 'الساحل المتوسطي لإسبانيا لديه مناخ متوسطي يتميز بصيف حار وجاف وشتاء معتدل.',
      },
      {
        id: 'ccse-geografia-climatica-q2',
        question: '¿Qué tipos de clima tiene España?',
        question_ar: 'ما هي أنواع المناخ في إسبانيا؟',
        options: ['Solo mediterráneo', 'Mediterráneo, oceánico y continental', 'Solo oceánico', 'Solo continental'],
        correctAnswer: 'Mediterráneo, oceánico y continental',
        explanation: 'España tiene variados climas: mediterráneo en la costa este y sur, oceánico en el norte, y continental en el interior.',
        explanation_ar: 'إسبانيا لديها مناخات متنوعة: متوسطي في الساحل الشرقي والجنوبي، محيطي في الشمال، وقاري في الداخل.',
      },
      {
        id: 'ccse-geografia-climatica-q3',
        question: '¿Qué elementos geográficos caracterizan a España?',
        question_ar: 'ما هي العناصر الجغرافية التي تميز إسبانيا؟',
        options: ['Solo montañas', 'Montañas, costas y mesetas', 'Solo costas', 'Solo mesetas'],
        correctAnswer: 'Montañas, costas y mesetas',
        explanation: 'La geografía española incluye montañas (Pirineos, Sistema Central), costas extensas y mesetas (Meseta Central).',
        explanation_ar: 'الجغرافيا الإسبانية تشمل جبال (البرانس، النظام المركزي)، سواحل واسعة وهضاب (الهضبة الوسطى).',
      },
      {
        id: 'ccse-geografia-climatica-q4',
        question: '¿Dónde se encuentra principalmente el clima oceánico en España?',
        question_ar: 'أين يوجد المناخ المحيطي بشكل رئيسي في إسبانيا؟',
        options: ['En el sur', 'En el norte (Galicia, Asturias, País Vasco)', 'En el centro', 'En las islas'],
        correctAnswer: 'En el norte (Galicia, Asturias, País Vasco)',
        explanation: 'El clima oceánico se encuentra principalmente en el norte de España, en regiones como Galicia, Asturias y el País Vasco.',
        explanation_ar: 'المناخ المحيطي موجود بشكل رئيسي في شمال إسبانيا، في مناطق مثل جاليسيا وأستورياس وإقليم الباسك.',
      },
      {
        id: 'ccse-geografia-climatica-q5',
        question: '¿Qué caracteriza el clima continental en España?',
        question_ar: 'ما الذي يميز المناخ القاري في إسبانيا؟',
        options: ['Temperaturas suaves todo el año', 'Veranos cálidos e inviernos fríos', 'Solo lluvia constante', 'Solo calor extremo'],
        correctAnswer: 'Veranos cálidos e inviernos fríos',
        explanation: 'El clima continental en España se caracteriza por veranos cálidos e inviernos fríos, con grandes variaciones de temperatura.',
        explanation_ar: 'المناخ القاري في إسبانيا يتميز بصيف حار وشتاء بارد، مع اختلافات كبيرة في درجة الحرارة.',
      },
    ],
  },
  {
    id: 'ccse-demografia',
    title: 'Demografía y Sociedad / السكانية والمجتمع',
    category: 'geografia',
    content: `# Demografía y Sociedad (الديموغرافيا والمجتمع)

La población de España es diversa y ha crecido por la inmigración. Las ciudades más grandes concentran la mayor parte de la población.

العربية:

السكان في إسبانيا متنوعون، والمدن الكبرى هي الأكثر كثافة سكانية.
`,
    keyPoints: ['Inmigración', 'Ciudades', 'Diversidad'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-demografia-q1',
        question: '¿Qué factor ha incrementado la población en España?',
        question_ar: 'ما هو العامل الذي زاد من عدد السكان في إسبانيا؟',
        options: ['La inmigración', 'La emigración', 'El aislamiento', 'Ninguno'],
        correctAnswer: 'La inmigración',
        explanation: 'La inmigración ha sido un factor importante en el crecimiento de la población española en las últimas décadas.',
        explanation_ar: 'الهجرة كانت عاملاً مهماً في نمو السكان الإسبان في العقود الأخيرة.',
      },
      {
        id: 'ccse-demografia-q2',
        question: '¿Dónde se concentra la mayor parte de la población en España?',
        question_ar: 'أين يتركز معظم السكان في إسبانيا؟',
        options: ['En las zonas rurales', 'En las ciudades más grandes', 'Solo en la capital', 'Distribuida uniformemente'],
        correctAnswer: 'En las ciudades más grandes',
        explanation: 'Las ciudades más grandes de España concentran la mayor parte de la población, como Madrid, Barcelona, Valencia, etc.',
        explanation_ar: 'المدن الكبرى في إسبانيا تجمع معظم السكان، مثل مدريد، برشلونة، فالنسيا، إلخ.',
      },
      {
        id: 'ccse-demografia-q3',
        question: '¿Cómo se caracteriza la población española?',
        question_ar: 'كيف يتميز السكان الإسبان؟',
        options: ['Uniforme y homogénea', 'Diversa', 'Solo local', 'Sin diversidad'],
        correctAnswer: 'Diversa',
        explanation: 'La población española es diversa, con personas de diferentes orígenes y culturas debido a la inmigración y la historia del país.',
        explanation_ar: 'السكان الإسبان متنوعون، مع أشخاص من أصول وثقافات مختلفة بسبب الهجرة وتاريخ البلد.',
      },
      {
        id: 'ccse-demografia-q4',
        question: '¿Qué es la demografía?',
        question_ar: 'ما هي الديموغرافيا؟',
        options: ['El estudio de la población', 'El estudio del clima', 'El estudio de la economía', 'El estudio de la geografía'],
        correctAnswer: 'El estudio de la población',
        explanation: 'La demografía es la ciencia que estudia la población, sus características, distribución y evolución.',
        explanation_ar: 'الديموغرافيا هي العلم الذي يدرس السكان وخصائصهم وتوزيعهم وتطورهم.',
      },
      {
        id: 'ccse-demografia-q5',
        question: '¿Cuál es una característica de la sociedad española actual?',
        question_ar: 'ما هي إحدى خصائص المجتمع الإسباني الحالي؟',
        options: ['Homogeneidad completa', 'Diversidad cultural y étnica', 'Aislamiento', 'Uniformidad total'],
        correctAnswer: 'Diversidad cultural y étnica',
        explanation: 'La sociedad española actual se caracteriza por su diversidad cultural y étnica, resultado de la inmigración y la integración.',
        explanation_ar: 'المجتمع الإسباني الحالي يتميز بتنوعه الثقافي والإثني، نتيجة للهجرة والاندماج.',
      },
    ],
  },
  {
    id: 'ccse-economia-basica',
    title: 'Economía básica / الاقتصاد الأساسي',
    category: 'geografia',
    content: `# Economía Básica (الاقتصاد الأساسي)

La economía española incluye turismo, agricultura, industria y servicios. El turismo es uno de los pilares económicos.

العربية:

الاقتصاد الإسباني يقوم على السياحة والزراعة والصناعة والخدمات؛ السياحة عنصر رئيسي.
`,
    keyPoints: ['Turismo', 'Servicios', 'Industria'],
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'ccse-economia-basica-q1',
        question: '¿Cuál sector es clave para la economía española?',
        question_ar: 'ما هو القطاع الأساسي للاقتصاد الإسباني؟',
        options: ['Turismo', 'Minería espacial', 'Agricultura solo', 'Ninguno'],
        correctAnswer: 'Turismo',
        explanation: 'El turismo es uno de los pilares económicos de España, siendo uno de los sectores más importantes junto con servicios, industria y agricultura.',
        explanation_ar: 'السياحة هي إحدى ركائز الاقتصاد الإسباني، كونها من أهم القطاعات إلى جانب الخدمات والصناعة والزراعة.',
      },
      {
        id: 'ccse-economia-basica-q2',
        question: '¿Qué sectores forman parte de la economía española?',
        question_ar: 'ما هي القطاعات التي تشكل الاقتصاد الإسباني؟',
        options: ['Solo turismo', 'Turismo, agricultura, industria y servicios', 'Solo servicios', 'Solo industria'],
        correctAnswer: 'Turismo, agricultura, industria y servicios',
        explanation: 'La economía española incluye múltiples sectores: turismo (muy importante), agricultura, industria y servicios.',
        explanation_ar: 'الاقتصاد الإسباني يشمل قطاعات متعددة: السياحة (مهم جداً)، الزراعة، الصناعة والخدمات.',
      },
      {
        id: 'ccse-economia-basica-q3',
        question: '¿Por qué el turismo es importante para España?',
        question_ar: 'لماذا السياحة مهمة لإسبانيا؟',
        options: ['Es uno de los pilares económicos', 'Solo proporciona empleos locales', 'No tiene importancia', 'Solo afecta a algunas regiones'],
        correctAnswer: 'Es uno de los pilares económicos',
        explanation: 'El turismo es uno de los pilares económicos de España, generando empleo, ingresos y desarrollo económico en muchas regiones.',
        explanation_ar: 'السياحة هي إحدى ركائز الاقتصاد الإسباني، تولد فرص عمل ودخل وتنمية اقتصادية في العديد من المناطق.',
      },
      {
        id: 'ccse-economia-basica-q4',
        question: '¿Qué otros sectores además del turismo son relevantes en España?',
        question_ar: 'ما هي القطاعات الأخرى بالإضافة للسياحة التي لها أهمية في إسبانيا؟',
        options: ['Solo agricultura', 'Agricultura, industria y servicios', 'Solo servicios', 'Ninguno'],
        correctAnswer: 'Agricultura, industria y servicios',
        explanation: 'Además del turismo, otros sectores relevantes en la economía española son la agricultura, la industria y los servicios.',
        explanation_ar: 'بالإضافة إلى السياحة، القطاعات الأخرى المهمة في الاقتصاد الإسباني هي الزراعة والصناعة والخدمات.',
      },
      {
        id: 'ccse-economia-basica-q5',
        question: '¿Qué caracteriza la economía española?',
        question_ar: 'ما الذي يميز الاقتصاد الإسباني؟',
        options: ['Dependencia de un solo sector', 'Diversidad de sectores económicos', 'Solo agricultura', 'Ausencia de servicios'],
        correctAnswer: 'Diversidad de sectores económicos',
        explanation: 'La economía española se caracteriza por su diversidad, incluyendo turismo, agricultura, industria y servicios.',
        explanation_ar: 'الاقتصاد الإسباني يتميز بتنوعه، يشمل السياحة والزراعة والصناعة والخدمات.',
      },
    ],
  },
  {
    id: 'ccse-sistema-educativo',
    title: 'Sistema Educativo / النظام التعليمي',
    category: 'constitucion',
    content: `# Sistema Educativo (النظام التعليمي)

El sistema educativo en España incluye educación infantil, primaria, secundaria y universidad. La educación básica es obligatoria.

العربية:

يتضمن نظام التعليم الروضة والتعليم الابتدائي والثانوي والجامعي؛ التعليم الأساسي إلزامي.

Pregunta:
1) ¿Qué etapa es obligatoria?  
A) Educación básica  
B) Universidad  
C) Educación superior solo  
D) Ninguna
`,
    keyPoints: ['Etapas educativas', 'Obligatoriedad', 'Universidad'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-salud-publica',
    title: 'Salud Pública / الصحة العامة',
    category: 'constitucion',
    content: `# Salud Pública (الصحة العامة)

El sistema de salud pública garantiza la atención sanitaria a todos los residentes a través del Sistema Nacional de Salud.

العربية:

النظام الصحي العام يوفر الرعاية الصحية لجميع المقيمين عبر النظام الوطني للصحة.

Pregunta:
1) ¿Qué garantiza el sistema de salud pública?  
A) Atención sanitaria a residentes  
B) Solo atención privada  
C) Ninguna atención  
D) Atención internacional solo
`,
    keyPoints: ['Sistema Nacional de Salud', 'Cobertura', 'Acceso'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-derechos-politicos',
    title: 'Derechos Políticos / الحقوق السياسية',
    category: 'constitucion',
    content: `# Derechos Políticos (الحقوق السياسية)

Los derechos políticos incluyen el derecho a votar y a ser elegido en elecciones democráticas.

العربية:

الحقوق السياسية تشمل حق التصويت والترشح في الانتخابات الديمقراطية.

Pregunta:
1) ¿Qué derecho político es esencial?  
A) Derecho a votar  
B) Derecho a no respetar leyes  
C) Derecho a gobernar sin elección  
D) Derecho a evitar impuestos
`,
    keyPoints: ['Voto', 'Candidatura', 'Procesos democráticos'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-medios-comunicacion',
    title: 'Medios de Comunicación / وسائل الإعلام',
    category: 'cultura',
    content: `# Medios de Comunicación (وسائل الإعلام)

La prensa, radio y televisión informan a la ciudadanía y cumplen una función de control democrático.

العربية:

الصحافة والإذاعة والتلفزيون تُعلم الجمهور وتقوم بدور رقابي في الديمقراطية.

Pregunta:
1) ¿Cuál es una función de los medios?  
A) Informar a la ciudadanía  
B) Censurar todo sin razón  
C) Impedir el acceso a la información  
D) Solo entretenimiento sin información
`,
    keyPoints: ['Prensa', 'Radio', 'Televisión', 'Control democrático'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-seguridad-publica',
    title: 'Seguridad Pública / الأمن العام',
    category: 'constitucion',
    content: `# Seguridad Pública (الأمن العام)

La seguridad pública garantiza el orden y la protección de las personas y sus bienes mediante cuerpos policiales y servicios de emergencias.

العربية:

الأمن العام يضمن النظام وحماية الأشخاص والممتلكات عبر الشرطة وخدمات الطوارئ.

Pregunta:
1) ¿Qué organismo protege el orden público?  
A) Cuerpos policiales  
B) Solo organizaciones privadas  
C) Ninguno  
D) Servicios internacionales únicamente
`,
    keyPoints: ['Policía', 'Servicios de emergencias', 'Protección ciudadana'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-simbolos-nacionales',
    title: 'Símbolos Nacionales / الرموز الوطنية',
    category: 'cultura',
    content: `# Símbolos Nacionales (الرموز الوطنية)

La bandera, el himno y el escudo son símbolos oficiales de España y representan la identidad del país.

العربية:

العَلَم والنشيد والشعار هي رموز رسمية تمثل هوية إسبانيا.

Preguntas:
1) ¿Cuál es un símbolo nacional de España?  
A) Bandera  
B) Un himno regional solamente  
C) Un símbolo privado  
D) Ninguno
2) ¿Qué representa el escudo?  
A) La historia y los reinos tradicionales  
B) Solo un color  
C) Una ley local  
D) Un edificio
3) ¿El himno nacional tiene letra oficial?  
A) No tiene letra oficial  
B) Sí, con letra oficial  
C) Solo en algunas comunidades  
D) Es un baile
4) ¿Dónde se usa la bandera oficialmente?  
A) Edificios públicos  
B) Solo en eventos deportivos  
C) No se usa públicamente  
D) En casas particulares solo
5) ¿Quién custodia los símbolos del Estado?  
A) Las instituciones del Estado  
B) Una empresa privada  
C) Cualquier ciudadano sin control  
D) Las ONGs
`,
    keyPoints: ['Bandera', 'Himno', 'Escudo'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-dias-festivos',
    title: 'Días Festivos y Celebraciones / الأعياد والاحتفالات',
    category: 'cultura',
    content: `# Días Festivos (الأعياد)

España celebra fiestas nacionales y regionales como el Día de la Constitución y las diversas fiestas autonómicas.

العربية:

تحتفل إسبانيا بأيام وطنية وإقليمية مثل يوم الدستور والأعياد المحلية المتنوعة.

Preguntas:
1) ¿Qué día se celebra la Constitución en España?  
A) 6 de diciembre  
B) 1 de enero  
C) 15 de marzo  
D) 9 de mayo
2) ¿Las fiestas regionales son competencia de?  
A) Las Comunidades Autónomas  
B) La ONU  
C) Empresas privadas  
D) Ninguna
3) ¿Qué tipo de evento es la Semana Santa?  
A) Fiesta religiosa y cultural  
B) Un evento deportivo  
C) Una reunión política  
D) Un mercado
4) ¿Cuál es un ejemplo de fiesta local?  
A) Las fallas de Valencia  
B) El Día de la Constitución solo  
C) Un evento privado  
D) Ninguno
5) ¿Quién organiza algunas celebraciones tradicionales?  
A) Ayuntamientos y asociaciones locales  
B) Solo el gobierno central  
C) Empresas internacionales  
D) La UE
`,
    keyPoints: ['Fiestas nacionales', 'Fiestas regionales', 'Tradiciones'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-procedimiento-nacionalizacion',
    title: 'Procedimiento de Nacionalización / إجراءات التجنيس',
    category: 'constitucion',
    content: `# Procedimiento de Nacionalización (إجراءات التجنيس)

Existen requisitos como residencia legal, examen de conocimientos (CCSE) y documentación que acrediten identidad y arraigo.

العربية:

هناك متطلبات مثل الإقامة القانونية، واجتياز اختبار المعرفة (CCSE) وتقديم المستندات اللازمة.

Preguntas:
1) ¿Qué examen es habitual para solicitar la nacionalidad por residencia?  
A) CCSE  
B) Un examen de manejo  
C) Examen de idiomas solo  
D) Ninguno
2) ¿La residencia es un requisito?  
A) Sí, residencia legal durante años determinados  
B) No es necesaria  
C) Solo prueba de trabajo  
D) Requisito opcional
3) ¿Qué documento es esencial?  
A) Documento de identidad válido  
B) Una carta personal sin firma  
C) Solo fotos  
D) Boletín informativo
4) ¿Puede variar el procedimiento según el caso?  
A) Sí, según la vía (matrimonio, residencia, etc.)  
B) No, es siempre igual  
C) Solo si lo decide el vecino  
D) Ninguna
5) ¿Quién tramita la solicitud?  
A) Registros civiles y Ministerio de Justicia  
B) Solo la policía local  
C) Una empresa privada  
D) Un particular sin autoridad
`,
    keyPoints: ['Residencia', 'CCSE', 'Documentación'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-administracion-local',
    title: 'Administración Local / الإدارة المحلية',
    category: 'constitucion',
    content: `# Administración Local (الإدارة المحلية)

Municipios y provincias gestionan servicios básicos locales como urbanismo, basuras y atención al ciudadano.

العربية:

البلديات والمحافظات تدير الخدمات المحلية مثل التخطيط الحضري والنفايات وخدمات المواطنين.

Preguntas:
1) ¿Quién gestiona los servicios municipales?  
A) El Ayuntamiento  
B) El Parlamento Nacional  
C) La UE  
D) Empresas internacionales
2) ¿Qué competencia suele tener una Diputación provincial?  
A) Coordinación entre municipios  
B) Gestionar la política exterior  
C) Ejecutar leyes nacionales sin control  
D) Ninguna
3) ¿Dónde se puede solicitar un certificado de empadronamiento?  
A) En el Ayuntamiento  
B) En una embajada extranjera  
C) En una escuela privada  
D) En un supermercado
4) ¿Qué función tiene el alcalde?  
A) Dirigir el gobierno municipal  
B) Ser jefe del Estado  
C) Nombrar jueces nacionales  
D) Ejecutar política exterior
5) ¿Qué es el empadronamiento?  
A) Registro de la residencia habitual en un municipio  
B) Un tipo de impuesto  
C) Un permiso de trabajo  
D) Un título académico
`,
    keyPoints: ['Ayuntamiento', 'Empadronamiento', 'Competencias locales'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-tribunales',
    title: 'Sistema Judicial / النظام القضائي',
    category: 'constitucion',
    content: `# Sistema Judicial (النظام القضائي)

Incluye diferentes tribunales: Juzgados, Audiencias Provinciales, Tribunal Supremo y Tribunal Constitucional con funciones específicas.

العربية:

يشمل النظام القضائي محاكم ابتدائية، محاكم استئناف، والمحكمة العليا والمحكمة الدستورية.

Preguntas:
1) ¿Cuál tribunal garantiza la constitucionalidad de las leyes?  
A) Tribunal Constitucional  
B) Tribunal de Comercio  
C) Un ayuntamiento  
D) Ninguno
2) ¿Cuál es la máxima instancia judicial ordinaria?  
A) Tribunal Supremo  
B) Tribunal local  
C) Corte regional sin autoridad  
D) Una comisión
3) ¿Qué función tiene una Audiencia Provincial?  
A) Resolver recursos y delitos importantes  
B) Gestionar alumbrado público  
C) Crear leyes  
D) Administrar impuestos
4) ¿Quién nombra a los jueces en general?  
A) Órganos competentes según la ley (CGPJ y procesos establecidos)  
B) Votación ciudadana directa  
C) Empresas privadas  
D) Ninguno
5) ¿Qué protege el poder judicial?  
A) El cumplimiento de la ley y los derechos de las personas  
B) Solo intereses económicos  
C) Una religión  
D) Intereses empresariales sin control
`,
    keyPoints: ['Tribunales', 'Tribunal Constitucional', 'Tribunal Supremo'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-derechos-laborales',
    title: 'Derechos Laborales / الحقوق العمالية',
    category: 'constitucion',
    content: `# Derechos Laborales (الحقوق العمالية)

Los trabajadores tienen derechos como salario mínimo, jornada laboral regulada y protección frente al despido injustificado.

العربية:

يتمتع العمال بحقوق مثل حد أدنى للأجور وساعات عمل محددة وحماية من الفصل التعسفي.

Preguntas:
1) ¿Qué derecho protege al trabajador ante un despido injustificado?  
A) Indemnización o recurso judicial  
B) Nada en absoluto  
C) Solo una carta de recomendación  
D) Una sanción administrativa privada
2) ¿Existe un salario mínimo en España?  
A) Sí  
B) No  
C) Solo para empleados públicos  
D) Solo en grandes ciudades
3) ¿Qué regula la jornada laboral?  
A) El Estatuto de los Trabajadores y convenios laborales  
B) Normas locales sin carácter nacional  
C) La UE exclusivamente  
D) Nada
4) ¿Qué es un convenio colectivo?  
A) Acuerdo entre empresas y sindicatos que regula condiciones laborales  
B) Un documento turístico  
C) Un certificado académico  
D) Un tipo de impuesto
5) ¿Quién suele negociar condiciones laborales a nivel sectorial?  
A) Sindicatos y organizaciones empresariales  
B) Vecinos sin representación  
C) Solo el gobierno central sin diálogo  
D) Empresas internacionales sin sindicato
`,
    keyPoints: ['Estatuto de los Trabajadores', 'Salario mínimo', 'Despido'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-prestaciones-sociales',
    title: 'Prestaciones y Seguridad Social / المعاشات والضمان الاجتماعي',
    category: 'constitucion',
    content: `# Prestaciones y Seguridad Social (المعاشات والضمان الاجتماعي)

El sistema ofrece pensiones, prestaciones por desempleo y cobertura sanitaria mediante cotizaciones y reglas específicas.

العربية:

يوفر النظام معاشات تقاعدية وتعويضات البطالة والتغطية الصحية عبر اشتراكات وقوانين محددة.

Preguntas:
1) ¿Qué prestación se da en caso de desempleo?  
A) Prestación por desempleo (paro)  
B) Un premio económico sin control  
C) Ninguna ayuda  
D) Un certificado cultural
2) ¿Qué es la cotización?  
A) Aportación al sistema de seguridad social por trabajo  
B) Un precio de mercado  
C) Un impuesto municipal  
D) Una tasa contable sin propósito social
3) ¿Quién gestiona las pensiones contributivas?  
A) La Seguridad Social  
B) Una ONG internacional  
C) El ayuntamiento local  
D) Empresas privadas sin control
4) ¿La cobertura sanitaria está condicionada a?  
A) Residencia y/o cotización según el caso  
B) Solo a comprar un seguro privado  
C) No hay cobertura pública  
D) Solo a pagos voluntarios
5) ¿Qué documento acredita derecho a prestaciones?  
A) Certificados de cotización y documentación personal  
B) Solo una foto  
C) Un correo electrónico no oficial  
D) Nada en absoluto
`,
    keyPoints: ['Pensiones', 'Prestación por desempleo', 'Cotizaciones'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-servicios-publicos',
    title: 'Servicios Públicos y Administración / الخدمات العامة والإدارة',
    category: 'constitucion',
    content: `# Servicios Públicos (الخدمات العامة)

Los servicios públicos incluyen sanidad, educación, transporte y servicios sociales gestionados por administraciones competentes.

العربية:

تشمل الخدمات العامة الصحة والتعليم والنقل والخدمات الاجتماعية وتديرها الجهات المختصة.

Preguntas:
1) ¿Qué servicio público es gestionado por la administración regional en muchas comunidades?  
A) Sanidad  
B) Política exterior  
C) Defensa nacional  
D) Comercio exterior
2) ¿Qué entidad suele gestionar la educación a nivel regional?  
A) Gobierno autonómico  
B) La ONU  
C) Empresas privadas internacionales  
D) Ninguna
3) ¿Qué servicio es básico y suele ser competencia local?  
A) Recogida de basuras  
B) Política monetaria  
C) Relaciones exteriores  
D) Legislación nacional
4) ¿Qué papel tiene el Estado en servicios públicos?  
A) Coordinar y garantizar acceso según competencias  
B) No intervenir en nada  
C) Solo privatizar sin regulación  
D) Actuar exclusivamente a título comercial
5) ¿Qué permite el acceso a servicios públicos?  
A) Residencia y/o situación administrativa según normativa  
B) Solo el pago de dinero sin más requisitos  
C) Exclusivamente la nacionalidad  
D) Ninguna regla
`,
    keyPoints: ['Sanidad', 'Educación', 'Transporte', 'Servicios sociales'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-impuestos-basicos',
    title: 'Impuestos Básicos / الضرائب الأساسية',
    category: 'geografia',
    content: `# Impuestos Básicos (الضرائب الأساسية)

España aplica impuestos como IRPF, IVA y cotizaciones sociales que financian servicios públicos.

العربية:

تفرض إسبانيا ضرائب مثل ضريبة الدخل (IRPF)، وضريبة القيمة المضافة (IVA) والاشتراكات الاجتماعية لتمويل الخدمات.

Preguntas:
1) ¿Qué impuesto grava el consumo?  
A) IVA  
B) IRPF  
C) Impuesto sobre sociedades exclusivamente  
D) Ninguno
2) ¿Qué grava el IRPF?  
A) La renta de las personas físicas  
B) Solo actividades internacionales  
C) Productos importados فقط  
D) Un impuesto municipal
3) ¿Quién recauda en gran parte los impuestos?  
A) Administración estatal y autonómica según competencias  
B) Organizaciones privadas  
C) La ONU  
D) Un particular
4) ¿Para qué sirven los impuestos?  
A) Financiar servicios públicos y políticas públicas  
B) Solo para gastos personales de funcionarios  
C) Para nada  
D) Para exportaciones solamente
5) ¿Qué es el IVA?  
A) Impuesto sobre el valor añadido que grava consumo  
B) Una subvención estatal  
C) Un tipo de multa  
D) Un certificado de empresa
`,
    keyPoints: ['IRPF', 'IVA', 'Financiación pública'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-transporte-y-documentacion',
    title: 'Transporte y Documentación / النقل والوثائق',
    category: 'geografia',
    content: `# Transporte y Documentación (النقل والوثائق)

Regulaciones sobre permisos de conducir, matriculación de vehículos y transporte público son relevantes para la vida diaria.

العربية:

تشمل اللوائح رخص القيادة وتسجيل المركبات والنقل العام وهي مهمة يومياً.

Preguntas:
1) ¿Qué documento necesitas para conducir legalmente en España?  
A) Permiso de conducción válido  
B) Solo la tarjeta de visita  
C) Un certificado de idioma فقط  
D) Ninguno
2) ¿Dónde se matricula un vehículo?  
A) En la Jefatura de Tráfico y registros oficiales  
B) En una comisaría sin procedimiento  
C) En la iglesia المحلية  
D) Directamente en la UE
3) ¿Qué cubre el transporte público?  
A) Autobuses, trenes y metro según ciudad/área  
B) Solo taxis privados  
C) Solo transporte marítimo  
D) Ninguno
4) ¿Qué organismo gestiona licencias de conducir?  
A) Dirección General de Tráfico (DGT) y autoridades competentes  
B) Solo el ayuntamiento sin coordinación  
C) Empresas sin autoridad  
D) Ninguno
5) ¿La documentación del vehículo incluye?  
A) Permiso de circulación y ficha técnica (ITV)  
B) Solo una foto  
C) Un correo electrónico no oficial  
D) Nada
`,
    keyPoints: ['Permiso de conducir', 'Matriculación', 'Transporte público'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-educacion-detalle',
    title: 'Educación: Etapas y títulos / التعليم: المراحل والشهادات',
    category: 'constitucion',
    content: `# Educación: Etapas y títulos (التعليم)

Desde educación infantil hasta la universidad; títulos oficiales y convalidaciones existen para estudios extranjeros.

العربية:

من رياض الأطفال إلى الجامعة؛ توجد شهادات رسمية وإجراءات معادلة للشهادات الأجنبية.

Preguntas:
1) ¿Qué etapa sigue a la educación primaria?  
A) Educación secundaria obligatoria (ESO)  
B) Universidad directamente  
C) Trabajo obligatorio  
D) Ninguna
2) ¿Qué es la ESO?  
A) Educación secundaria obligatoria  
B) Una entidad regional  
C) Un impuesto  
D) Un documento legal
3) ¿Se pueden homologar títulos extranjeros?  
A) Sí, mediante procedimientos de reconocimiento y homologación  
B) No es posible أبداً  
C) Solo para títulos europeos  
D) Solo para cursos cortos
4) ¿Quién organiza la educación universitaria?  
A) Universidades con regulación estatal y autonómica  
B) La UE مباشرة  
C) Empresas privadas exclusivamente  
D) Las ONGs
5) ¿Qué es una convalidación?  
A) Reconocimiento formal de estudios extranjeros para equivalencia académica  
B) Un permiso de residencia  
C) Una multa administrativa  
D) Ninguno
`,
    keyPoints: ['ESO', 'Homologación', 'Universidad'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-salud-detalle',
    title: 'Salud: Atención y cobertura / الصحة: الرعاية والتغطية',
    category: 'constitucion',
    content: `# Salud: Atención y cobertura (الصحة)

El Sistema Nacional de Salud garantiza cobertura básica; existen niveles de atención primaria, especializada y de urgencias.

العربية:

يضمن النظام الوطني للصحة تغطية أساسية مع رعاية أولية ومتخصصة وحالات طارئة.

Preguntas:
1) ¿Qué es la atención primaria?  
A) El primer nivel de atención sanitaria (centros de salud)  
B) Atención solo en hospitales grandes  
C) Un servicio privado فقط  
D) Ninguno
2) ¿Qué cubre la sanidad pública generalmente?  
A) Atención básica y emergencias para residentes  
B) Solo servicios dentales privados  
C) Solo turismo médico  
D) Nada
3) ¿Qué documento acreditar la tarjeta sanitaria?  
A) Tarjeta sanitaria individual y/o documentación de residencia  
B) Un pasaporte extranjero siempre  
C) Un documento de empresa فقط  
D) Ninguno
4) ¿Quién financia la sanidad pública?  
A) Fondos públicos mediante impuestos y cotizaciones  
B) Fondos privados únicamente  
C) Donaciones internacionales فقط  
D) Empresas sin regulación
5) ¿Dónde acudir en una urgencia médica?  
A) Servicios de urgencias hospitalarios o centros designados  
B) A un cine محلي  
C) A un banco  
D) A la policía فقط
`,
    keyPoints: ['Atención primaria', 'Tarjeta sanitaria', 'Urgencias'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-cultura-contemporanea',
    title: 'Cultura Contemporánea / الثقافة المعاصرة',
    category: 'cultura',
    content: `# Cultura Contemporánea (الثقافة المعاصرة)

Artistas, literatura y cine contemporáneo forman parte de la identidad cultural de España.

العربية:

الفنانون والأدب والسينما المعاصرة جزء من الهوية الثقافية لإسبانيا.

Preguntas:
1) ¿Qué campo representa la cultura contemporánea?  
A) Cine, literatura y artes plásticas  
B) Solo la música القديمة  
C) Legislación فقط  
D) Nada
2) ¿Cuál es un autor español contemporáneo reconocido?  
A) Varios autores; ejemplos incluyen novelistas y poetas actuales  
B) Solo autores del siglo XVIII  
C) No existen مؤلفون معاصرون  
D) Ninguno
3) ¿Qué festival de cine es relevante en España?  
A) Festival de San Sebastián, entre otros  
B) Un mercado agrícola فقط  
C) Un evento deportivo فقط  
D) Ninguno
4) ¿Qué papel tienen las bibliotecas públicas?  
A) Promover lectura y acceso cultural  
B) Solo almacenar documentos viejos  
C) Vender كتب فقط  
D) Nada
5) ¿Quién apoya la cultura a nivel local?  
A) Ayuntamientos, comunidades autónomas y ministerios culturales  
B) Solo empresas privadas  
C) La UE únicamente  
D) Ninguno
`,
    keyPoints: ['Cine', 'Literatura', 'Festivales culturales'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-fiestas-regionales',
    title: 'Fiestas Regionales y Comunidades / الأعياد الإقليمية والمجتمعات',
    category: 'cultura',
    content: `# Fiestas Regionales (الأعياد الإقليمية)

Cada Comunidad Autónoma tiene celebraciones propias como las Fallas (Valencia) o San Fermín (Navarra).

العربية:

كل إقليم لديه احتفالاته مثل فالنسيا وسان فيرمين في نافارا.

Preguntas:
1) ¿Qué celebración es típica de Valencia?  
A) Las Fallas  
B) San Fermín فقط  
C) La Tomatina فقط  
D) Ninguna
2) ¿Dónde se celebra San Fermín?  
A) Pamplona (Navarra)  
B) Valencia  
C) Sevilla  
D) Madrid
3) ¿Qué es la Tomatina?  
A) Una fiesta con lanzamiento de tomates en Buñol  
B) Una competición deportiva  
C) Un desfile institucional  
D) Ninguno
4) ¿Quién organiza fiestas locales grandes?  
A) Asociaciones locales y ayuntamientos  
B) Solo el gobierno central  
C) La ONU  
D) Ninguno
5) ¿Las fiestas regionales forman parte de?  
A) La identidad y patrimonio cultural de cada comunidad  
B) Un documento legal únicamente  
C) Una institución financiera  
D) Nada
`,
    keyPoints: ['Fallas', 'San Fermín', 'Tomatina'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-capitales-autonomicas',
    title: 'Capitales y Comunidades Autónomas / العواصم والمجتمعات',
    category: 'geografia',
    content: `# Capitales Autonómicas (العواصم الإقليمية)

España tiene 17 Comunidades Autónomas con capitales como Madrid, Barcelona (Cataluña tiene capital Barcelona) y Sevilla (Andalucía).

العربية:

لإسبانيا 17 منطقة ذات حكومة محلية وعواصم معروفة مثل مدريد وبرشلونة وإشبيلية.

Preguntas:
1) ¿Cuál es la capital de la Comunidad de Andalucía?  
A) Sevilla  
B) Granada  
C) Málaga  
D) Córdoba
2) ¿Cuál es la capital de España?  
A) Madrid  
B) Barcelona  
C) Valencia  
D) Bilbao
3) ¿Cuántas Comunidades Autónomas hay en España?  
A) 17  
B) 10  
C) 25  
D) 5
4) ¿Qué institución hay en la capital autonómica?  
A) Parlament o asamblea autonómica en muchas comunidades  
B) Un consulado de otro país únicamente  
C) Una base militar بدون ارتباط بالمجتمع  
D) Nada
5) ¿Qué es una provincia?  
A) División administrativa dentro de una Comunidad Autónoma  
B) Una entidad independiente de la nación  
C) Un impuesto  
D) Ninguno
`,
    keyPoints: ['Comunidades Autónomas', 'Capitales', 'División administrativa'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-participacion-practica',
    title: 'Participación Práctica y Civismo / المشاركة المدنية والتطبيقية',
    category: 'constitucion',
    content: `# Participación Práctica (المشاركة العملية)

Cómo participar: votar, asociarse, participar en consultas públicas y respetar normas cívicas básicas.

العربية:

كيفية المشاركة: التصويت والانضمام إلى جمعيات والمشاركة في الاستشارات واحترام القوانين.

Preguntas:
1) ¿Cómo puedes participar en la vida pública local?  
A) Asistiendo a plenos municipales o asociándote a colectivos  
B) Ignorando las noticias فقط  
C) Evadiendo obligaciones civiles  
D) Nada
2) ¿Qué es el voto?  
A) Mecanismo para elegir representantes democráticamente  
B) Un trámite administrativo sin importancia  
C) Un requisito económico  
D) Nada
3) ¿Qué significa civismo?  
A) Respeto a normas y convivencia en sociedad  
B) Solo actividades políticas  
C) Una regla religiosa  
D) Nada
4) ¿Dónde consultar planes y ordenanzas municipales?  
A) En la sede electrónica del Ayuntamiento o tablón de anuncios oficiales  
B) En redes sociales sin verificación  
C) En foros privados  
D) Ninguno
5) ¿Qué implicación tiene respetar normas cívicas?  
A) Mejora convivencia y seguridad ciudadana  
B) Coste para la libertad فقط  
C) No tiene تأثير  
D) Nada
`,
    keyPoints: ['Voto', 'Asociaciones', 'Civismo'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-inmigracion-asilo',
    title: 'Inmigración y Asilo / الهجرة واللجوء',
    category: 'geografia',
    content: `# Inmigración y Asilo (الهجرة واللجوء)

Existen procedimientos para residencia, protección internacional y derechos de solicitantes según normativa española y europea.

العربية:

هناك إجراءات للإقامة والحماية الدولية وحقوق طالبي اللجوء حسب القوانين الإسبانية والأوروبية.

Preguntas:
1) ¿Qué es el asilo?  
A) Protección a personas perseguidas en su país de origen  
B) Un permiso de viaje ترفيهي  
C) Documento turístico  
D) Ninguno
2) ¿Quién gestiona solicitudes de asilo inicialmente?  
A) Las autoridades competentes y órganos estatales  
B) Una organización privada بدون سلطة  
C) La UE فقط  
D) Ninguno
3) ¿Qué puede conceder la residencia por arraigo?  
A) Una vía de regularización por integración laboral o social  
B) Un certificado académico فقط  
C) Un documento fiscal فقط  
D) Nada
4) ¿Qué derecho tienen los solicitantes durante el proceso?  
A) Asistencia jurídica y procedimientos garantizados por ley  
B) Ninguna asistencia  
C) Solo مساعدة إنسانية عشوائية  
D) Nada
5) ¿Qué normativa influye en inmigración?  
A) Normativa nacional y directivas europeas según materia  
B) Solo legislación local بدون تأثير المركزي  
C) Normas privadas فقط  
D) Nada
`,
    keyPoints: ['Asilo', 'Residencia', 'Arraigo'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-vivienda-y-servicios',
    title: 'Vivienda y Servicios Básicos / الإسكان والخدمات الأساسية',
    category: 'geografia',
    content: `# Vivienda y Servicios (الإسكان والخدمات)

Políticas de vivienda, acceso a servicios básicos y ayudas sociales son aspectos prácticos para residentes.

العربية:

سياسات السكن والوصول إلى الخدمات الأساسية والمساعدات الاجتماعية من المواضيع العملية للمقيمين.

Preguntas:
1) ¿Qué ayuda puede existir para vivienda?  
A) Subvenciones, ayudas al alquiler o proyectos sociales públicos  
B) Ninguna مساعدة  
C) فقط برامج خاصة  
D) Nada
2) ¿Qué servicio es básico para una vivienda?  
A) Agua, electricidad y saneamiento  
B) خدمات ترفيهية فقط  
C) مكتب إداري فقط  
D) Ninguno
3) ¿Quién puede gestionar ayudas sociales?  
A) Servicios sociales municipales y autonómicos  
B) فقط شركات خاصة  
C) منظمات بدون صلاحية  
D) لا شيء
4) ¿Qué es una vivienda de protección oficial?  
A) Vivienda con régimen de ayudas o condiciones especiales promovida por la administración  
B) منزل خاص بدون أي دعم  
C) Un tipo de impuesto  
D) Nada
5) ¿Cómo informarse sobre ayudas?  
A) Contactando servicios sociales municipales o portales oficiales  
B) عبر شائعات فقط  
C) من خلال مصادر غير رسمية فقط  
D) Nada
`,
    keyPoints: ['Ayudas vivienda', 'Servicios básicos', 'Servicios sociales'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ccse-medios-digitales',
    title: 'Medios Digitales y Participación / الوسائط الرقمية والمشاركة',
    category: 'cultura',
    content: `# Medios Digitales (الوسائط الرقمية)

El acceso a la información y la participación se realiza cada vez más a través de plataformas digitales y sedes electrónicas públicas.

العربية:

يتم الوصول إلى المعلومات والمشاركة بشكل متزايد عبر المنصات الرقمية والمواقع الرسمية الإلكترونية.

Preguntas:
1) ¿Qué es la sede electrónica?  
A) Portal oficial para trámites y servicios públicos en línea  
B) موقع تجاري فقط  
C) منصة تعليمية فقط  
D) Nada
2) ¿Por qué son importantes los portales oficiales?  
A) Permiten realizar trámites y acceder a información fiable  
B) للتسلية فقط  
C) كونهوس خاص فقط  
D) Nada
3) ¿Qué puede aportar la participación digital?  
A) Opinión en consultas públicas y acceso a servicios  
B) Confusión فقط  
C) تأثير محدود فقط  
D) Nada
4) ¿Cómo identificar una fuente oficial en línea?  
A) Dominios públicos, certificados y enlaces desde portales gubernamentales  
B) اعتمادًا على مشاركة المستخدمين فقط  
C) من خلال الشبكات الاجتماعية فقط  
D) Nada
5) ¿Qué derecho protege el acceso a información pública?  
A) Transparencia y acceso a información pública según normativa  
B) لا شيء  
C) فقط للموظفين  
D) Nada
`,
    keyPoints: ['Sede electrónica', 'Participación digital', 'Transparencia'],
    createdAt: new Date().toISOString(),
  },
];

export function getLessonsByCategory(category: LessonCategory): NacionalidadLesson[] {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('nacionalidad_lessons_v1');
      if (raw) {
        const stored = JSON.parse(raw) as NacionalidadLesson[];
        return stored.filter(lesson => lesson.category === category);
      }
    }
  } catch (e) {}
  return nacionalidadLessons.filter(lesson => lesson.category === category);
}

export function getLessonById(id: string): NacionalidadLesson | undefined {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('nacionalidad_lessons_v1');
      if (raw) {
        const stored = JSON.parse(raw) as NacionalidadLesson[];
        const found = stored.find(lesson => lesson.id === id);
        if (found) return found;
      }
    }
  } catch (e) {}
  return nacionalidadLessons.find(lesson => lesson.id === id);
}

export function getAllNacionalidadLessons(): NacionalidadLesson[] {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('nacionalidad_lessons_v1');
      if (raw) return JSON.parse(raw) as NacionalidadLesson[];
    }
  } catch (e) {}
  return nacionalidadLessons;
}

export function persistNacionalidadLessons(list: NacionalidadLesson[]) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nacionalidad_lessons_v1', JSON.stringify(list));
    }
  } catch (e) {}
}