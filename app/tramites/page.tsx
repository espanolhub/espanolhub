'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import useIsPro from '@/lib/hooks/useIsPro';
import { 
  FileText, Download, ExternalLink, CheckCircle, Clock, 
  AlertCircle, Search, Shield, Home, CreditCard, Briefcase,
  Users, GraduationCap, Heart, Car, Sparkles, Star, Lock,
  ChevronDown, ChevronUp
} from 'lucide-react';

const guides = [
  {
    id: 'empadronamiento',
    title_es: 'Cómo obtener el Empadronamiento',
    title_ar: 'كيفية الحصول على البادرون (Empadronamiento)',
    description_es: 'El empadronamiento es un trámite obligatorio que acredita tu residencia en un municipio español. Es necesario para acceder a servicios públicos, sanidad, educación y trámites administrativos.',
    description_ar: 'التسجيل في البلدية إجراء إلزامي يثبت إقامتك في بلدية إسبانية. ضروري للوصول إلى الخدمات العامة، الصحة، التعليم والإجراءات الإدارية.',
    requirements: [
      { es: 'DNI/NIE/Pasaporte original y vigente', ar: 'DNI/NIE/جواز سفر أصلي وساري المفعول' },
      { es: 'Contrato de alquiler o escritura de propiedad', ar: 'عقد إيجار أو سند ملكية' },
      { es: 'Recibo de luz, agua o gas reciente', ar: 'فاتورة كهرباء أو ماء أو غاز حديثة' },
      { es: 'Autorización del propietario (si es inquilino)', ar: 'إذن من المالك (إذا كنت مستأجراً)' },
      { es: 'Formulario de empadronamiento del ayuntamiento', ar: 'نموذج التسجيل من البلدية' },
    ],
    steps: [
      { es: 'Descarga el formulario de empadronamiento del sitio web del ayuntamiento', ar: 'حمّل نموذج التسجيل من موقع البلدية' },
      { es: 'Rellena todos los datos personales y de la vivienda', ar: 'املأ جميع البيانات الشخصية والسكن' },
      { es: 'Solicita cita previa online o por teléfono', ar: 'احجز موعد عبر الإنترنت أو بالهاتف' },
      { es: 'Acude a la oficina con todos los documentos originales', ar: 'اذهب إلى المكتب مع جميع المستندات الأصلية' },
      { es: 'Presenta la documentación al funcionario', ar: 'قدم المستندات للموظف' },
      { es: 'Recibe el certificado de empadronamiento (inmediato o en días)', ar: 'استلم شهادة التسجيل (فوري أو خلال أيام)' },
    ],
    tips: [
      { es: 'El empadronamiento es gratuito en todos los ayuntamientos', ar: 'التسجيل مجاني في جميع البلديات' },
      { es: 'Puedes empadronarte aunque no tengas papeles en regla', ar: 'يمكنك التسجيل حتى لو لم تكن أوراقك سليمة' },
      { es: 'Es válido para trámites durante 3 meses desde su emisión', ar: 'صالح للإجراءات لمدة 3 أشهر من تاريخ إصداره' },
      { es: 'Necesario para renovar NIE, tarjeta sanitaria y escolarización', ar: 'ضروري لتجديد NIE، البطاقة الصحية والتسجيل المدرسي' },
    ],
    links: [
      { label_es: 'Ministerio de Política Territorial', label_ar: 'وزارة السياسة الإقليمية', url: 'https://www.mptfp.gob.es' },
      { label_es: 'Padrón Municipal - Información', label_ar: 'السجل البلدي - معلومات', url: 'https://www.ine.es/ss/Satellite?L=es_ES&c=Page&cid=1254735116599&p=1254735116599&pagename=ProductosYServicios%2FPYSLayout' },
    ],
    officialSource: 'Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local',
    cost: 'Gratuito',
    validity: '3 meses',
    category: 'general',
    icon: Home,
    difficulty: 'fácil',
    duration: '15-20 min'
  },
  {
    id: 'nie-tie',
    title_es: 'Cómo renovar el NIE/TIE',
    title_ar: 'كيفية تجديد NIE/TIE (الإقامة)',
    description_es: 'La renovación del NIE (Número de Identidad de Extranjero) o TIE (Tarjeta de Identidad de Extranjero) es obligatoria antes de su vencimiento. Debes iniciar el trámite 60 días antes de la fecha de caducidad.',
    description_ar: 'تجديد NIE (رقم الهوية للأجانب) أو TIE (بطاقة الهوية للأجانب) إلزامي قبل انتهاء صلاحيتها. يجب بدء الإجراء قبل 60 يوماً من تاريخ الانتهاء.',
    requirements: [
      { es: 'TIE/NIE actual (original y fotocopia)', ar: 'TIE/NIE الحالية (أصل ونسخة)' },
      { es: 'Pasaporte completo vigente (original y copia)', ar: 'جواز سفر كامل ساري (أصل ونسخة)' },
      { es: 'Modelo EX-17 cumplimentado', ar: 'نموذج EX-17 مملوء' },
      { es: '3 fotografías tamaño carnet recientes', ar: '3 صور حجم بطاقة حديثة' },
      { es: 'Justificante de pago de tasa (modelo 790 código 012)', ar: 'إثبات دفع الرسوم (نموذج 790 رمز 012)' },
      { es: 'Certificado de empadronamiento', ar: 'شهادة التسجيل في البلدية' },
      { es: 'Documentos según tipo de residencia (contrato trabajo, nóminas, etc.)', ar: 'مستندات حسب نوع الإقامة (عقد عمل، كشوف رواتب، إلخ)' },
    ],
    steps: [
      { es: 'Descarga y rellena el modelo EX-17 desde la web oficial', ar: 'حمّل واملأ نموذج EX-17 من الموقع الرسمي' },
      { es: 'Paga la tasa modelo 790-012 (online o banco)', ar: 'ادفع الرسوم نموذج 790-012 (أونلاين أو بنك)' },
      { es: 'Solicita cita previa en extranjería de tu provincia', ar: 'احجز موعد مسبق في شؤون الأجانب في مقاطعتك' },
      { es: 'Reúne toda la documentación requerida', ar: 'اجمع جميع المستندات المطلوبة' },
      { es: 'Acude a la cita con todos los documentos originales', ar: 'احضر الموعد مع جميع المستندات الأصلية' },
      { es: 'Entrega documentación y toma de huellas', ar: 'سلّم المستندات وأخذ البصمات' },
      { es: 'Recoge resguardo de solicitud (guárdalo bien)', ar: 'استلم إيصال الطلب (احتفظ به جيداً)' },
      { es: 'Espera notificación (30-45 días)', ar: 'انتظر الإشعار (30-45 يوماً)' },
      { es: 'Recoge nueva TIE en comisaría', ar: 'استلم TIE الجديدة في مركز الشرطة' },
    ],
    tips: [
      { es: 'Inicia el trámite 60 días antes del vencimiento', ar: 'ابدأ الإجراء قبل 60 يوماً من الانتهاء' },
      { es: 'La TIE caducada no te permite trabajar legalmente', ar: 'TIE المنتهية لا تسمح لك بالعمل قانونياً' },
      { es: 'Puedes viajar con el resguardo si la TIE caduca durante el proceso', ar: 'يمكنك السفر بالإيصال إذا انتهت TIE أثناء الإجراء' },
      { es: 'Guarda copias de toda la documentación presentada', ar: 'احتفظ بنسخ من جميع المستندات المقدمة' },
    ],
    links: [
      { label_es: 'Cita Previa Extranjería', label_ar: 'حجز موعد شؤون الأجانب', url: 'https://icp.administracionelectronica.gob.es/icpplus/index.html' },
      { label_es: 'Ministerio de Interior - Extranjería', label_ar: 'وزارة الداخلية - شؤون الأجانب', url: 'https://www.inclusion.gob.es/oberaxe/es/normativa/extranjeria/index.htm' },
      { label_es: 'Modelo 790 - Pago de tasas', label_ar: 'نموذج 790 - دفع الرسوم', url: 'https://sede.policia.gob.es' },
    ],
    officialSource: 'Real Decreto 557/2011, de 20 de abril, Reglamento de Extranjería',
    cost: '€15.93 - €21.52 (según tipo)',
    validity: '2-5 años (según tipo)',
    category: 'general',
    icon: FileText,
    difficulty: 'medio',
    duration: '30-45 min (trámite) + 30-45 días (espera)'
  },
  {
    id: 'cita-previa',
    title_es: 'Cómo pedir Cita Previa para trámites',
    title_ar: 'كيفية طلب "Cita Previa" للخدمات العامة',
    description_es: 'La mayoría de trámites en España requieren cita previa. Es importante solicitarla con antelación, ya que las fechas disponibles pueden ser limitadas, especialmente en grandes ciudades.',
    description_ar: 'معظم الإجراءات في إسبانيا تتطلب موعد مسبق. من المهم طلبه مسبقاً، حيث أن المواعيد المتاحة قد تكون محدودة، خاصة في المدن الكبيرة.',
    requirements: [
      { es: 'NIE/DNI/Pasaporte', ar: 'NIE/DNI/جواز سفر' },
      { es: 'Información del trámite que necesitas', ar: 'معلومات الإجراء الذي تحتاجه' },
      { es: 'Correo electrónico y teléfono', ar: 'بريد إلكتروني وهاتف' },
      { es: 'Disponibilidad de horario', ar: 'توفر الوقت' },
    ],
    steps: [
      { es: 'Identificar el organismo competente (Ayuntamiento, Extranjería, etc.)', ar: 'حدد الجهة المختصة (البلدية، شؤون الأجانب، إلخ)' },
      { es: 'Entrar en la web oficial del organismo', ar: 'ادخل إلى الموقع الرسمي للجهة' },
      { es: 'Seleccionar el tipo de trámite específico', ar: 'اختر نوع الإجراء المحدد' },
      { es: 'Buscar fechas y horarios disponibles', ar: 'ابحث عن التواريخ والأوقات المتاحة' },
      { es: 'Rellenar formulario con datos personales', ar: 'املأ النموذج بالبيانات الشخصية' },
      { es: 'Confirmar cita y guardar justificante', ar: 'أكد الموعد واحفظ الإيصال' },
      { es: 'Recibir confirmación por email/SMS', ar: 'استلم التأكيد عبر البريد/رسالة نصية' },
      { es: 'Acudir puntualmente con documentación requerida', ar: 'احضر في الموعد مع المستندات المطلوبة' },
    ],
    tips: [
      { es: 'Reserva cita con 2-3 semanas de antelación si es posible', ar: 'احجز الموعد قبل 2-3 أسابيع إن أمكن' },
      { es: 'Revisa bien el horario - llegar tarde puede cancelar tu cita', ar: 'تحقق جيداً من الوقت - التأخير قد يلغي موعدك' },
      { es: 'Imprime el justificante o tenlo en el móvil', ar: 'اطبع الإيصال أو احتفظ به في الهاتف' },
      { es: 'Algunas oficinas permiten cancelar y reprogramar online', ar: 'بعض المكاتب تسمح بالإلغاء وإعادة الجدولة عبر الإنترنت' },
    ],
    links: [
      { label_es: 'Cita Previa Extranjería', label_ar: 'موعد شؤون الأجانب', url: 'https://icp.administracionelectronica.gob.es/icpplus/index.html' },
      { label_es: 'Sede Electrónica - Admin. Pública', label_ar: 'المقر الإلكتروني - الإدارة العامة', url: 'https://administracion.gob.es' },
      { label_es: 'Información General - Citas', label_ar: 'معلومات عامة - المواعيد', url: 'https://www.inclusion.gob.es' },
    ],
    officialSource: 'Cada organismo gestiona sus propias citas previas',
    cost: 'Gratuito',
    validity: 'Fecha y hora específicas',
    category: 'general',
    icon: Clock,
    difficulty: 'fácil',
    duration: '10-15 min'
  },
  {
    id: 'seguridad-social',
    title_es: 'Afiliación a la Seguridad Social',
    title_ar: 'التسجيل في الضمان الاجتماعي',
    requirements: [
      { es: 'NIE/DNI válido', ar: 'NIE/DNI ساري المفعول' },
      { es: 'Contrato de trabajo', ar: 'عقد العمل' },
      { es: 'Formulario TA.1', ar: 'نموذج TA.1' },
    ],
    steps: [
      { es: 'Obtener el formulario TA.1 del empleador', ar: 'احصل على نموذج TA.1 من صاحب العمل' },
      { es: 'Presentar en oficina de Seguridad Social', ar: 'قدمه في مكتب الضمان الاجتماعي' },
      { es: 'Recibir número de afiliación', ar: 'استلم رقم التسجيل' },
    ],
    links: [
      { label_es: 'Seguridad Social', label_ar: 'الضمان الاجتماعي', url: 'https://www.seg-social.es' },
    ],
    category: 'trabajo',
    icon: Shield,
    difficulty: 'medio',
    duration: '30-45 min'
  },
  {
    id: 'cuenta-bancaria',
    title_es: 'Abrir cuenta bancaria en España',
    title_ar: 'فتح حساب بنكي في إسبانيا',
    requirements: [
      { es: 'NIE/DNI o Pasaporte', ar: 'NIE/DNI أو جواز سفر' },
      { es: 'Certificado de empadronamiento', ar: 'شهادة التسجيل' },
      { es: 'Contrato de trabajo o justificante de ingresos', ar: 'عقد عمل أو إثبات دخل' },
    ],
    steps: [
      { es: 'Elegir banco y producto', ar: 'اختر البنك والمنتج' },
      { es: 'Solicitar cita o ir presencialmente', ar: 'احجز موعد أو اذهب شخصياً' },
      { es: 'Presentar documentación', ar: 'قدم المستندات' },
      { es: 'Firmar contrato y activar cuenta', ar: 'وقع العقد وفعل الحساب' },
    ],
    links: [
      { label_es: 'Banco de España', label_ar: 'بنك إسبانيا', url: 'https://www.bde.es' },
    ],
    category: 'financiero',
    icon: CreditCard,
    difficulty: 'fácil',
    duration: '20-30 min'
  },
  {
    id: 'tarjeta-sanitaria',
    title_es: 'Solicitar Tarjeta Sanitaria',
    title_ar: 'طلب البطاقة الصحية',
    requirements: [
      { es: 'NIE/DNI', ar: 'NIE/DNI' },
      { es: 'Certificado de empadronamiento', ar: 'شهادة التسجيل' },
      { es: 'Número de afiliación a la Seguridad Social', ar: 'رقم الضمان الاجتماعي' },
    ],
    steps: [
      { es: 'Ir al centro de salud de tu zona', ar: 'اذهب إلى مركز الصحة في منطقتك' },
      { es: 'Presentar documentación', ar: 'قدم المستندات' },
      { es: 'Recibir tarjeta temporal', ar: 'استلم البطاقة المؤقتة' },
      { es: 'Recibir tarjeta definitiva por correo', ar: 'استلم البطاقة النهائية بالبريد' },
    ],
    links: [
      { label_es: 'Sistema Nacional de Salud', label_ar: 'نظام الصحة الوطني', url: 'https://www.sns.gob.es' },
    ],
    category: 'salud',
    icon: Heart,
    difficulty: 'fácil',
    duration: '15-20 min'
  },
  {
    id: 'homologacion-titulo',
    title_es: 'Homologación de títulos académicos',
    title_ar: 'معادلة الشهادات الأكاديمية',
    requirements: [
      { es: 'Título original y traducción jurada', ar: 'الشهادة الأصلية والترجمة المعتمدة' },
      { es: 'Apostilla de La Haya', ar: 'ختم لاهاي' },
      { es: 'Copia del pasaporte', ar: 'نسخة من جواز السفر' },
      { es: 'Pago de tasas', ar: 'دفع الرسوم' },
    ],
    steps: [
      { es: 'Preparar documentación', ar: 'جهز المستندات' },
      { es: 'Solicitar cita en Ministerio de Educación', ar: 'احجز موعد في وزارة التعليم' },
      { es: 'Presentar solicitud', ar: 'قدم الطلب' },
      { es: 'Esperar resolución (3-6 meses)', ar: 'انتظر القرار (3-6 أشهر)' },
    ],
    links: [
      { label_es: 'Ministerio de Educación', label_ar: 'وزارة التعليم', url: 'https://www.educacion.gob.es' },
    ],
    category: 'educacion',
    icon: GraduationCap,
    difficulty: 'difícil',
    duration: '3-6 meses'
  },
  {
    id: 'permiso-trabajo',
    title_es: 'Solicitud de Permiso de Trabajo',
    title_ar: 'طلب تصريح عمل',
    requirements: [
      { es: 'Oferta de empleo o contrato', ar: 'عرض عمل أو عقد' },
      { es: 'NIE', ar: 'NIE' },
      { es: 'Pasaporte vigente', ar: 'جواز سفر ساري' },
      { es: 'Formularios oficiales', ar: 'نماذج رسمية' },
    ],
    steps: [
      { es: 'El empleador inicia el trámite', ar: 'صاحب العمل يبدأ الإجراء' },
      { es: 'Presentar documentación en extranjería', ar: 'تقديم المستندات في شؤون الأجانب' },
      { es: 'Esperar autorización', ar: 'انتظر الموافقة' },
      { es: 'Recoger tarjeta de residencia y trabajo', ar: 'استلم بطاقة الإقامة والعمل' },
    ],
    links: [
      { label_es: 'Oficina de Extranjería', label_ar: 'مكتب شؤون الأجانب', url: 'https://www.interior.gob.es' },
    ],
    category: 'trabajo',
    icon: Briefcase,
    difficulty: 'difícil',
    duration: '1-3 meses'
  },
  {
    id: 'reagrupacion-familiar',
    title_es: 'Reagrupación Familiar',
    title_ar: 'لم شمل الأسرة',
    requirements: [
      { es: 'Residencia legal de al menos 1 año', ar: 'إقامة قانونية لمدة سنة على الأقل' },
      { es: 'Medios económicos suficientes', ar: 'موارد اقتصادية كافية' },
      { es: 'Vivienda adecuada', ar: 'سكن مناسب' },
      { es: 'Documentos de parentesco', ar: 'مستندات القرابة' },
    ],
    steps: [
      { es: 'Reunir documentación requerida', ar: 'اجمع المستندات المطلوبة' },
      { es: 'Presentar solicitud en extranjería', ar: 'قدم الطلب في شؤون الأجانب' },
      { es: 'Esperar resolución favorable', ar: 'انتظر القرار الإيجابي' },
      { es: 'Familiar solicita visado en consulado', ar: 'الأهل يطلبون الفيزا في القنصلية' },
    ],
    links: [
      { label_es: 'Información Reagrupación', label_ar: 'معلومات لم الشمل', url: 'https://www.interior.gob.es' },
    ],
    category: 'familiar',
    icon: Users,
    difficulty: 'difícil',
    duration: '3-6 meses'
  },
  {
    id: 'vivienda-alquiler',
    title_es: 'Alquilar vivienda en España',
    title_ar: 'استئجار سكن في إسبانيا',
    requirements: [
      { es: 'NIE/DNI', ar: 'NIE/DNI' },
      { es: 'Justificante de ingresos', ar: 'إثبات دخل' },
      { es: 'Aval o depósito (1-2 meses)', ar: 'ضمان أو وديعة (1-2 شهر)' },
    ],
    steps: [
      { es: 'Buscar vivienda (portales inmobiliarios)', ar: 'ابحث عن سكن (بوابات العقارات)' },
      { es: 'Visitar y verificar estado', ar: 'زيارة والتحقق من الحالة' },
      { es: 'Firmar contrato de arrendamiento', ar: 'وقع عقد الإيجار' },
      { es: 'Pagar fianza y primer mes', ar: 'ادفع الوديعة والشهر الأول' },
    ],
    links: [
      { label_es: 'Idealista', label_ar: 'إيديالستا', url: 'https://www.idealista.com' },
    ],
    category: 'vivienda',
    icon: Home,
    difficulty: 'medio',
    duration: '2-4 semanas'
  },
  {
    id: 'compra-vehiculo',
    title_es: 'Comprar y matricular un vehículo',
    title_ar: 'شراء وتسجيل مركبة',
    requirements: [
      { es: 'DNI/NIE', ar: 'DNI/NIE' },
      { es: 'Permiso de conducir válido', ar: 'رخصة قيادة سارية' },
      { es: 'Contrato de compraventa', ar: 'عقد البيع' },
      { es: 'ITV vigente', ar: 'ITV ساري' },
    ],
    steps: [
      { es: 'Elegir y negociar vehículo', ar: 'اختر وفاوض على المركبة' },
      { es: 'Verificar documentación del coche', ar: 'تحقق من أوراق السيارة' },
      { es: 'Firmar contrato y pagar impuestos', ar: 'وقع العقد وادفع الضرائب' },
      { es: 'Transferir titularidad en Tráfico', ar: 'انقل الملكية في المرور' },
    ],
    links: [
      { label_es: 'DGT - Matriculación', label_ar: 'إدارة المرور', url: 'https://www.dgt.es' },
    ],
    category: 'transporte',
    icon: Car,
    difficulty: 'medio',
    duration: '1-2 semanas'
  },
];

export default function TramitesPage() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const isProUser = useIsPro();

  const categories = [
    { id: 'all', label: 'Todos', icon: FileText },
    { id: 'general', label: 'General', icon: FileText },
    { id: 'trabajo', label: 'Trabajo', icon: Briefcase },
    { id: 'financiero', label: 'Financiero', icon: CreditCard },
    { id: 'salud', label: 'Salud', icon: Heart },
    { id: 'educacion', label: 'Educación', icon: GraduationCap },
    { id: 'familiar', label: 'Familiar', icon: Users },
    { id: 'vivienda', label: 'Vivienda', icon: Home },
    { id: 'transporte', label: 'Transporte', icon: Car },
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      guide.title_es.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil': return 'text-green-600 bg-green-100';
      case 'medio': return 'text-blue-600 bg-blue-100';
      case 'difícil': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200">
            <Sparkles className="w-5 h-5 text-gray-700" aria-hidden="true" />
            <span className="text-sm font-semibold text-gray-900">{guides.length} Guías Completas</span>
            <Star className="w-5 h-5 text-gray-700" aria-hidden="true" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900">
            Trámites & Documentación
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Guías paso a paso para todos los trámites oficiales que necesitas en España
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar trámite..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none text-lg shadow-lg"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" aria-hidden="true" />
            Categorías
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600'
                      : 'bg-white text-black border-gray-200 hover:bg-gray-50'
                  }`}
                  style={!isActive ? { color: '#000000', fontWeight: '900' } : {}}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-700'}`} aria-hidden="true" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-900 rounded-lg p-6 text-white border border-gray-800">
            <FileText className="w-8 h-8 mb-2 text-white" aria-hidden="true" />
            <div className="text-3xl font-bold mb-1 text-white">{guides.length}</div>
            <div className="text-sm text-gray-300">Guías Totales</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-white border border-gray-800">
            <CheckCircle className="w-8 h-8 mb-2 text-white" aria-hidden="true" />
            <div className="text-3xl font-bold mb-1 text-white">{filteredGuides.length}</div>
            <div className="text-sm text-gray-300">Resultados</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-white border border-gray-800">
            <Shield className="w-8 h-8 mb-2 text-white" aria-hidden="true" />
            <div className="text-3xl font-bold mb-1 text-white">100%</div>
            <div className="text-sm text-gray-300">Oficial</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-white border border-gray-800">
            <Clock className="w-8 h-8 mb-2 text-white" aria-hidden="true" />
            <div className="text-3xl font-bold mb-1 text-white">2026</div>
            <div className="text-sm text-gray-300">Actualizado</div>
          </div>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No se encontraron guías con "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredGuides.map(guide => {
              const Icon = guide.icon || FileText;
              const isExpanded = expandedGuide === guide.id;
              
              return (
                <div key={guide.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Card Header - Always Visible */}
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 border border-gray-800">
                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {guide.title_es}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(guide.difficulty || 'medio')}`}>
                              {guide.difficulty || 'medio'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1 border border-gray-200">
                              <Clock className="w-4 h-4 text-gray-700" aria-hidden="true" />
                              {guide.duration}
                            </span>
                            {(guide as any).cost && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                {(guide as any).cost}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {(guide as any).description_es && (
                          <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            {(guide as any).description_es}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-700"><strong>{guide.requirements.length}</strong> requisitos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-5 h-5 text-gray-700 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-700"><strong>{guide.steps.length}</strong> pasos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink className="w-5 h-5 text-gray-700 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-700"><strong>{guide.links.length}</strong> enlaces oficiales</span>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 border border-gray-800"
                    >
                      {isExpanded ? (
                        <>
                          <span>Ocultar detalles</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Ver guía completa</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                      {/* Requirements */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-gray-700" aria-hidden="true" />
                          Requisitos Necesarios
                        </h4>
                        <div className="bg-white rounded-xl p-5 shadow-md">
                          <ul className="space-y-3">
                            {guide.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                  {i + 1}
                                </span>
                                <p className="text-gray-900 font-medium">{req.es}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <AlertCircle className="w-6 h-6 text-gray-700" aria-hidden="true" />
                          Pasos a Seguir
                        </h4>
                        <div className="space-y-4">
                          {guide.steps.map((step, i) => (
                            <div key={i} className="bg-white rounded-xl p-5 shadow-md flex gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 border border-gray-800">
                                {i + 1}
                              </div>
                              <p className="text-gray-900 font-semibold">{step.es}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips (if available) */}
                      {(guide as any).tips && (guide as any).tips.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                            Consejos Importantes
                          </h4>
                          <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                            <ul className="space-y-3">
                              {(guide as any).tips.map((tip: any, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <Star className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                  <p className="text-gray-900 font-medium">{tip.es}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Official Links */}
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <ExternalLink className="w-6 h-6 text-purple-600" />
                          Enlaces Oficiales
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {guide.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all group border-2 border-transparent hover:border-purple-300"
                            >
                              <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {link.label_es}
                              </p>
                              <ExternalLink className="w-5 h-5 text-gray-700 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Official Source & Cost */}
                      <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {(guide as any).officialSource && (
                            <div>
                              <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600" />
                                Fuente Legal:
                              </p>
                              <p className="text-gray-700">{(guide as any).officialSource}</p>
                            </div>
                          )}
                          {(guide as any).validity && (
                            <div>
                              <p className="font-bold text-gray-900 mb-1">Validez:</p>
                              <p className="text-gray-700">{(guide as any).validity}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 md:p-8 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 border border-gray-800">
              <AlertCircle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ⚠️ Aviso Importante
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Esta información es <strong>orientativa y educativa</strong>. Los procedimientos y requisitos pueden cambiar. 
                Siempre verifica la información actualizada en las <strong>páginas web oficiales</strong> de cada organismo.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8 md:p-12 text-center text-white border border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            ¿Tienes dudas sobre algún trámite?
          </h2>
          <p className="text-xl mb-6 text-gray-300">
            Toda la información actualizada y 100% gratis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all border border-gray-200"
            >
              📧 Contactar Soporte
            </Link>
            <Link
              href="/faq"
              className="px-8 py-4 bg-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-all border border-gray-700"
            >
              ❓ Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </div>
      <ProUpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} onGetPro={() => setShowUpgrade(false)} />
    </div>
  );
}
