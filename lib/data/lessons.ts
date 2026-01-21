export interface DrivingLesson {
  id: string;
  title: string;
  content_es: string;
  content_ar?: string;
  keyTerms?: { term_es: string; term_ar: string }[];
}

export const drivingLessons: DrivingLesson[] = [
  {
    id: 'driving-1-definiciones',
    title: 'Capítulo 1: Definiciones',
    content_es: `
## Introducción
En este capítulo definimos los conceptos básicos que encontrará en el examen y en la legislación de tráfico.

### Vehículos a motor
Los vehículos a motor son aquellos provistos de un motor que los impulsa, por ejemplo: turismos, motocicletas, camiones y autobuses.

### Vehículos no motorizados
Son aquellos que se desplazan sin motor: bicicletas, carritos y vehículos de tracción animal.

### Peatones
Personas que circulan a pie. Los peatones tienen prioridad en pasos de peatones y zonas peatonales.
    `,
    content_ar: `
## مقدمة
في هذا الفصل نعرّف المصطلحات الأساسية التي ستجدها في الامتحان وفي قوانين المرور.

### المركبات ذات المحرك
المركبات ذات المحرك هي تلك المزودة بمحرك يدفعها، مثل السيارات والدراجات النارية والشاحنات والحافلات.

### المركبات غير المحركة
هي التي تتحرك بدون محرك: الدراجات، العربات الصغيرة، والمركبات التي يجرّها حيوان.

### المشاة
الأشخاص الذين يسيرون على الأقدام. للمشاة الأفضلية في معابر المشاة والمناطق المخصصة لهم.
    `,
    keyTerms: [
      { term_es: 'Turismo', term_ar: 'سيارة ركاب' },
      { term_es: 'Motocicleta', term_ar: 'دراجة نارية' },
      { term_es: 'Camión', term_ar: 'شاحنة' },
      { term_es: 'Bicicleta', term_ar: 'دراجة' },
      { term_es: 'Peatón', term_ar: 'مشاة' },
    ],
  },
];

