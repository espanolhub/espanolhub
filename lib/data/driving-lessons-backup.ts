'use client';

import { useEffect } from 'react';

export interface DrivingLesson {
  id: string;
  title: string;
  category?: string;
  content: string;
  createdAt?: string;
  resumenClave?: { es: string; ar?: string };
  erroresComunes?: string[];
  isFree?: boolean;
}

export const drivingLessons: DrivingLesson[] = [
  // 15 enriched driving lessons
  {
    id: 'driving-1-definiciones',
    title: 'Capítulo 1: Definiciones',
    category: 'general',
    isFree: true,
    resumenClave: { es: 'Conceptos básicos: vehículos, conductores y vías públicas según la normativa española.' },
    erroresComunes: [
      'Confundir autopista con autovía',
      'No distinguir entre conductor y propietario',
      'Desconocer los tipos de vehículos según su clasificación',
      'Confundir carril con arcén'
    ],
    content: `# Capítulo 1: Definiciones Básicas (التعريفات الأساسية)

## Introducción / المقدمة

Este capítulo establece los conceptos fundamentales que debes conocer antes de comenzar a conducir. Comprender estas definiciones es esencial para interpretar correctamente las normas de tráfico.

---

## 1. Vehículo (المركبة)

### Definición
Un **vehículo** es todo medio de transporte que circula por las vías públicas, capaz de transportar personas o mercancías.

### Tipos de Vehículos

#### Vehículos de Motor (مركبات بمحرك)
- **Automóviles**: Turismos, todoterrenos, monovolúmenes
- **Motocicletas**: Ciclomotores (hasta 50cc) y motocicletas (más de 50cc)
- **Camiones**: Vehículos de transporte de mercancías
- **Autobuses**: Vehículos de transporte de pasajeros

#### Vehículos sin Motor (مركبات بدون محرك)
- **Bicicletas**: Vehículos de dos ruedas accionados por pedales
- **Vehículos de tracción animal**: Carros tirados por animales

### Clasificación por Peso
- **Ligeros**: Hasta 3.500 kg
- **Pesados**: Más de 3.500 kg

---

## 2. Conductor (السائق)

### Definición
Persona que **maneja o está al mando** de un vehículo en circulación.

### Requisitos Legales
✅ Tener permiso de conducir vigente
✅ Estar en condiciones físicas y mentales adecuadas
✅ No superar las tasas de alcohol permitidas
✅ Respetar las normas de circulación

### Diferencia Importante
- **Conductor**: Quien conduce el vehículo
- **Propietario**: Quien posee legalmente el vehículo
- **Titular**: Quien figura en los documentos del vehículo

⚠️ **Nota**: El conductor es responsable de las infracciones cometidas mientras conduce, aunque no sea el propietario.

---

## 3. Vía Pública (الطريق العام)

### Definición
Cualquier camino, calle o carretera **abierta al tránsito público**, tanto urbana como interurbana.

### Tipos de Vías

#### Autopistas (الطرق السريعة)
- **Código**: AP (autopista de peaje) o A (gratuita)
- **Características**: 
  - Múltiples carriles en cada dirección
  - Separación física entre sentidos (mediana)
  - Sin cruces a nivel
  - Acceso y salida solo por enlaces
- **Velocidad máxima**: 120 km/h

#### Autovías (الطرق السريعة العادية)
- **Código**: A
- **Características**: Similar a autopista pero puede tener cruces
- **Velocidad máxima**: 120 km/h

#### Carreteras Convencionales (الطرق التقليدية)
- **Código**: N (nacional), C (comarcal)
- Un carril por sentido
- **Velocidad máxima**: 90-100 km/h

#### Vías Urbanas (الطرق الحضرية)
- Calles dentro de poblaciones
- **Velocidad máxima**: 20-50 km/h según tipo

---

## 4. Carril (الممر)

### Definición
Banda longitudinal en que puede estar dividida la calzada, delimitada o no por marcas viales.

### Tipos de Carriles

#### Por Uso
- **Carril normal**: Uso general
- **Carril bus**: Exclusivo para autobuses y taxis
- **Carril HOV**: Para vehículos de alta ocupación
- **Carril bici**: Exclusivo para bicicletas

#### Por Dirección
- **Carril de circulación**: Sentido normal
- **Carril de adelantamiento**: Izquierdo en autovías
- **Carril reversible**: Cambia de sentido según la hora

---

## 5. Arcén (الحافة)

### Definición
Franja longitudinal **fuera de la calzada**, contigua a la misma, no destinada normalmente a la circulación.

### Características
- Color: Generalmente blanco o tierra
- **NO es un carril de circulación**
- Uso solo en emergencias o para ciertos vehículos lentos

### Usos Permitidos
✅ Detención de emergencia
✅ Circulación de vehículos especiales (tractores, bicicletas en carreteras)
✅ Estacionamiento temporal en caso de avería

### Usos Prohibidos
❌ Circular normalmente
❌ Adelantar por el arcén
❌ Estacionar (excepto emergencia)

---

## 6. Calzada (الطريق المعبد)

### Definición
Parte de la vía **destinada a la circulación de vehículos**. Se compone de uno o varios carriles.

### Elementos
- **Carriles**: Bandas donde circulan los vehículos
- **Líneas de separación**: Delimitan carriles
- **Marcas viales**: Señales pintadas en el suelo

---

## 7. Intersección (التقاطع)

### Definición
Zona donde se cruzan dos o más vías.

### Tipos
- **Cruce**: Intersección de dos vías
- **Glorieta/Rotonda**: Intersección circular
- **Paso a nivel**: Cruce con vía de tren

---

## Resumen Visual / ملخص بصري

\`\`\`
┌─────────────────────────────────────┐
│        ARCÉN    │ CALZADA │  ARCÉN  │
│       (حافة)    │ (طريق)  │ (حافة)  │
├─────────────────┼─────────┼─────────┤
│                 │ CARRIL 1│         │
│                 │ CARRIL 2│         │
└─────────────────┴─────────┴─────────┘
\`\`\`

---

## Preguntas de Autoevaluación / أسئلة التقييم الذاتي

1. ¿Cuál es la diferencia entre autopista y autovía?
2. ¿Puede circular un turismo por el arcén?
3. ¿Quién es responsable de una infracción: el conductor o el propietario?
4. ¿Cuál es la velocidad máxima en autopista?

---

## العربية: ملخص شامل

### المفاهيم الأساسية:
- **المركبة**: وسيلة نقل على الطرق العامة
- **السائق**: من يقود المركبة ويتحمل المسؤولية
- **الطريق العام**: أي طريق مفتوح للمرور العام
- **الممر**: شريط طولي ضمن الطريق
- **الحافة**: منطقة جانبية للطوارئ فقط
- **الطريق المعبد**: الجزء المخصص لحركة المركبات
- **التقاطع**: منطقة تقاطع طريقين أو أكثر

### نصائح مهمة:
✓ الحافة ليست للسير العادي
✓ السائق يتحمل المسؤولية وليس المالك
✓ يجب معرفة أنواع الطرق والسرعات المسموحة`,
  },
  {
    id: 'driving-2-velocidades',
    title: 'Capítulo 2: Límites de Velocidad',
    category: 'velocidad',
    isFree: true,
    resumenClave: { 
      es: 'Límites generales: Autopistas 120 km/h, carreteras 90 km/h, ciudades 20-50 km/h. Adaptar siempre a las condiciones.', 
      ar: 'حدود عامة: الطرق السريعة 120 كم/س، الطرق العادية 90 كم/س، المدن 20-50 كم/س. التكيف دائماً مع الظروف.' 
    },
    erroresComunes: [
      'No adaptar velocidad a lluvia, niebla o hielo',
      'Ignorar señalización temporal de obras',
      'Exceder límites en zonas urbanas',
      'No reducir velocidad en curvas cerradas',
      'Confundir límites según tipo de vehículo'
    ],
    content: `# Capítulo 2: Límites de Velocidad (حدود السرعة)

## Introducción / المقدمة

La velocidad es uno de los factores más importantes en la seguridad vial. **No solo debes respetar los límites**, sino también **adaptar tu velocidad** a las condiciones de la vía, el tráfico y el clima.

---

## Tabla de Velocidades Máximas / جدول السرعات القصوى

### Turismos y Motocicletas (السيارات والدراجات النارية)

| Tipo de Vía | Velocidad Máxima | السرعة القصوى |
|-------------|------------------|----------------|
| **Autopista/Autovía** | 120 km/h | 120 كم/س |
| **Carretera Convencional** | 90-100 km/h* | 90-100 كم/س |
| **Vía Urbana (calle de un carril)** | 20 km/h | 20 كم/س |
| **Vía Urbana (calle con una acera)** | 30 km/h | 30 كم/س |
| **Vía Urbana (calle con dos carriles)** | 50 km/h | 50 كم/س |
| **Travesías** | 50 km/h | 50 كم/س |

*100 km/h en vías con al menos dos carriles por sentido separados por mediana.

### Vehículos Pesados (Camiones, Autobuses)

| Tipo de Vía | Velocidad Máxima |
|-------------|------------------|
| **Autopista/Autovía** | 90-100 km/h |
| **Carretera Convencional** | 80 km/h |
| **Vía Urbana** | 50 km/h |

---

## Velocidades Mínimas / السرعات الدنيا

### En Autopistas y Autovías
⚠️ **Mínimo**: 60 km/h en carril derecho

### Excepciones
- ❌ No aplica en retenciones o atascos
- ❌ No aplica si las condiciones meteorológicas lo impiden
- ❌ No aplica en vías urbanas

---

## Factores que Obligan a Reducir Velocidad

### 1. Condiciones Meteorológicas Adversas

#### Lluvia Intensa 🌧️
- **Reducción**: 20 km/h del límite
- Ejemplo: En autopista de 120 → **100 km/h**

#### Nieve o Hielo ❄️
- **Reducción**: 50% del límite
- Ejemplo: En autopista de 120 → **60 km/h**

#### Niebla Densa 🌫️
- **Reducción**: Hasta 50 km/h si visibilidad < 50 metros
- Usar luces antiniebla

#### Viento Fuerte 💨
- Reducir velocidad especialmente en:
  - Vehículos altos (furgonetas, autocaravanas)
  - Puentes y viaductos
  - Salidas de túneles

### 2. Estado de la Vía

❌ **Baches o desperfectos**
❌ **Obras en curso**
❌ **Curvas cerradas**
❌ **Pendientes pronunciadas**
❌ **Intersecciones**

### 3. Densidad de Tráfico

- **Atascos**: Mantener distancia de seguridad
- **Zonas escolares**: Máxima precaución
- **Zonas peatonales**: Velocidad muy reducida

---

## Señales de Velocidad / إشارات السرعة

### Señales de Límite

#### Límite Máximo (señal circular roja)
- **R-301**: Velocidad máxima permitida
- Ejemplo: ⭕ 50 = No superar 50 km/h

#### Fin de Límite (señal circular con barra)
- **R-501**: Fin de la limitación
- Volver al límite general de la vía

#### Límite Mínimo (señal circular azul)
- **R-305**: Velocidad mínima obligatoria
- Poco común, solo en vías rápidas

### Señales Informativas

#### Velocidad Recomendada (señal cuadrada azul)
- **S-7**: Velocidad aconsejada
- No es obligatoria pero muy recomendable
- Común en curvas peligrosas

---

## Radares y Control de Velocidad

### Tipos de Radares

#### Radares Fijos 📷
- Instalados permanentemente
- Señalizados previamente
- Generalmente en puntos peligrosos

#### Radares Móviles 🚓
- Patrullas de tráfico
- Trípodes en carretera
- **NO siempre señalizados**

#### Radares de Tramo 📏
- Miden velocidad media entre dos puntos
- Más efectivos que radares puntuales

### Margen de Error
- Radares tienen un margen de tolerancia:
  - **±7 km/h** para velocidades < 100 km/h
  - **±7%** para velocidades > 100 km/h

---

## Sanciones por Exceso de Velocidad

### Infracciones Leves
- **Exceso**: Hasta 20 km/h
- **Multa**: 100€
- **Puntos**: No se pierden

### Infracciones Graves
- **Exceso**: 21-30 km/h (ciudad) o 21-40 km/h (carretera)
- **Multa**: 300€
- **Puntos**: -2 puntos

- **Exceso**: 31-40 km/h (ciudad) o 41-50 km/h (carretera)
- **Multa**: 400€
- **Puntos**: -4 puntos

### Infracciones Muy Graves
- **Exceso**: 41-50 km/h (ciudad) o 51-60 km/h (carretera)
- **Multa**: 500€
- **Puntos**: -6 puntos

- **Exceso**: Más de 60 km/h
- **Multa**: 600€
- **Puntos**: -6 puntos
- **Pena**: Posible delito penal + retirada del permiso

---

## Reglas de Oro para la Velocidad

### ✅ SIEMPRE Debes:

1. **Respetar los límites**: Son máximos, no objetivos
2. **Adaptar a condiciones**: Reducir si llueve, hay niebla, etc.
3. **Mantener distancia de seguridad**: A mayor velocidad, mayor distancia
4. **Anticipar**: Reducir antes de curvas, cruces, rotondas
5. **Estar atento a señales**: Temporales y permanentes

### ❌ NUNCA Debes:

1. Superar límites aunque no veas radares
2. Acelerar en condiciones adversas
3. Circular al límite si no tienes experiencia
4. Ignorar señales de velocidad recomendada
5. Competir con otros conductores

---

## Cálculo de Distancia de Seguridad

### Fórmula Simple
**Velocidad en km/h ÷ 2 = metros de distancia**

Ejemplos:
- A 100 km/h → 50 metros mínimo
- A 120 km/h → 60 metros mínimo

### Tiempo de Reacción
- **Conductor alerta**: 1 segundo
- **Conductor distraído**: 2-3 segundos
- **Bajo efectos de alcohol**: 4+ segundos

---

## Casos Especiales

### Conductores Noveles (Novatos)
Durante el primer año (pegatina "L"):
- **Límite en autopista**: 100 km/h (en vez de 120)
- **Límite en carretera**: 80 km/h (en vez de 90-100)

### Vehículos con Remolque
- **Autopista**: 90 km/h
- **Carretera**: 80 km/h
- **Ciudad**: 50 km/h

### Ciclomotores (≤50cc)
- **Máxima**: 45 km/h en cualquier vía
- **Prohibido**: Circular por autopistas y autovías

---

## العربية: ملخص شامل

### حدود السرعة الأساسية:
- **الطرق السريعة**: 120 كم/س (السيارات)، 100 كم/س (المبتدئين)
- **الطرق التقليدية**: 90-100 كم/س
- **داخل المدن**: 20-50 كم/س حسب نوع الشارع

### التخفيض الإلزامي للسرعة:
- **مطر شديد**: -20 كم/س
- **ثلج أو جليد**: -50%
- **ضباب كثيف**: حتى 50 كم/س

### العقوبات:
- تجاوز 20 كم/س: 100 يورو
- تجاوز 30 كم/س: 300 يورو + نقطتين
- تجاوز 60 كم/س: 600 يورو + 6 نقاط + سحب محتمل للرخصة

### نصائح ذهبية:
✓ السرعة القصوى ليست هدفاً
✓ التكيف مع الظروف الجوية
✓ الحفاظ على مسافة الأمان
✓ التخفيض قبل المنعطفات

---

## Preguntas de Autoevaluación

1. ¿Cuál es la velocidad máxima en autopista para un turismo?
2. ¿Cuánto debo reducir si llueve intensamente?
3. ¿Qué distancia de seguridad necesito a 100 km/h?
4. ¿Cuál es la multa por exceder 35 km/h en ciudad?`,
  },
  {
    id: 'driving-3-senales',
    title: 'Capítulo 3: Señales de Tránsito',
    category: 'señales',
    resumenClave: { es: 'Clasificación y significado de señales.', ar: 'تصنيف ومعنى الإشارات.' },
    erroresComunes: ['Interpretar علامة شاذة incorrectly', 'Ignorar señales de obra'],
    content: `# Señales de Tránsito (لافتات المرور)

Señales de advertencia, prioridad, prohibición e información.

Señales de tráfico españolas.
  },
  {
    id: 'driving-4-prioridad',
    title: 'Capítulo 4: Prioridad',
    category: 'prioridad',
    resumenClave: { es: 'Reglas de prioridad en cruces, rotondas y intersecciones.', ar: 'قواعد الأفضلية في التقاطعات والدوارات.' },
    erroresComunes: ['No ceder en intersecciones sin señal', 'Mala aproximación a glorietas'],
    content: `# Prioridad (الأسبقية)

Criterios para determinar quién tiene prioridad en diferentes situaciones.

Normas de prioridad en la circulación.
  },
  {
    id: 'driving-5-condiciones',
    title: 'Capítulo 5: Condiciones de la Carretera',
    category: 'condiciones',
    resumenClave: { es: 'Cómo adaptar la conducción a lluvia, hielo y niebla.', ar: 'كيفية تكييف القيادة مع المطر والجليد والضباب.' },
    erroresComunes: ['Velocidad inadecuada en lluvia', 'Distancia de frenado insuficiente'],
    content: `# Condiciones de la Carretera (حالات الطريق)

Técnicas y recomendaciones para conducir con seguridad en condiciones adversas.

Conducción segura en condiciones difíciles.
  },
  {
    id: 'driving-6-alcohol-drogas',
    title: 'Capítulo 6: Alcohol y Drogas',
    category: 'seguridad',
    resumenClave: { es: 'Efectos, límites legales y sanciones.', ar: 'الآثار والحدود القانونية والعقوبات.' },
    erroresComunes: ['Conducir tras consumo leve', 'Desconocer límites para noveles'],
    content: `# Alcohol y Drogas (الكحول والمخدرات)

Efectos en la conducción, límites legales y pruebas de alcoholemia.

Alcohol y conducción: efectos y consecuencias.
  },
  {
    id: 'driving-7-noche',
    title: 'Capítulo 7: Conducción Nocturna',
    category: 'seguridad',
    resumenClave: { es: 'Visibilidad, uso de luces y riesgos nocturnos.', ar: 'الرؤية، استخدام الأضواء والمخاطر الليلية.' },
    erroresComunes: ['Uso inadecuado de luces', 'Velocidad excesiva por mala visión'],
    content: `# Conducción Nocturna (القيادة الليلية)

Buenas prácticas para circular de noche y evitar riesgos.

Conducción nocturna segura.
  },
  {
    id: 'driving-8-estacionamiento',
    title: 'Capítulo 8: Estacionamiento',
    category: 'normas',
    resumenClave: { es: 'Normas de estacionamiento y señales asociadas.', ar: 'قواعد الوقوف والإشارات المتعلقة.' },
    erroresComunes: ['Estacionar en zona prohibida', 'No usar freno de mano en pendiente'],
    content: `# Estacionamiento (الوقوف)

Tipos de estacionamiento, señales y sanciones por infracciones.

Normas de estacionamiento y sanciones.
  },
  {
    id: 'driving-9-seguridad-infantil',
    title: 'Capítulo 9: Seguridad Infantil',
    category: 'seguridad',
    resumenClave: { es: 'Sistemas de retención y ubicación de sillas infantiles.', ar: 'أنظمة الحماية ومواقع مقاعد الأطفال.' },
    erroresComunes: ['No asegurar correctamente la silla', 'Uso de sistemas inadecuados'],
    content: `# Seguridad Infantil (أمان الأطفال)

Recomendaciones y tipos de sillas según edad y peso.

Sistemas de retención infantil.
  },
  {
    id: 'driving-10-mantenimiento',
    title: 'Capítulo 10: Mantenimiento del Vehículo',
    category: 'mantenimiento',
    resumenClave: { es: 'Chequeos esenciales y frecuencia de mantenimiento.', ar: 'الفحوصات الأساسية وتكرار الصيانة.' },
    erroresComunes: ['Ignorar luces de aviso', 'No revisar presión de neumáticos'],
    content: `# Mantenimiento del Vehículo (صيانة المركبة)

Lista de comprobación básica para mantener el vehículo en condiciones seguras.

Mantenimiento básico del vehículo.
  },
  {
    id: 'driving-11-motores-frenos',
    title: 'Capítulo 11: Motores y Frenos',
    category: 'mecanica',
    resumenClave: { es: 'Principios básicos del motor y sistema de frenos.', ar: 'مبادئ أساسية للمحرك ونظام الفرامل.' },
    erroresComunes: ['Frenos desgastados', 'No revisar niveles de aceite'],
    content: `# Motores y Frenos (المحركات والفرامل)

Conceptos básicos sobre mantenimiento de motor y prevención de fallos.

Mantenimiento del motor y prevención.
  },
  {
    id: 'driving-12-climatologia',
    title: 'Capítulo 12: Climatología',
    category: 'clima',
    resumenClave: { es: 'Adaptaciones a lluvia, nieve y viento.', ar: 'التكيف مع المطر والثلج والرياح.' },
    erroresComunes: ['Conducir demasiado rápido en lluvia', 'No usar cadenas cuando es obligatorio'],
    content: `# Climatología (المناخ)

Cómo actuar según condiciones meteorológicas adversas.

Conducción en condiciones meteorológicas adversas.
  },
  {
    id: 'driving-13-emergencias',
    title: 'Capítulo 13: Emergencias',
    category: 'emergencias',
    resumenClave: { es: 'Procedimientos ante averías o accidentes.', ar: 'إجراءات عند الأعطال أو الحوادث.' },
    erroresComunes: ['No señalizar el vehículo averiado', 'Salir sin protección'],
    content: `# Emergencias (حالات الطوارئ)

Actuación ante accidente, primeras medidas y comunicación con los servicios.

Procedimientos en caso de accidente.
  },
  {
    id: 'driving-14-manejo-ciudad',
    title: 'Capítulo 14: Conducción en Ciudad',
    category: 'ciudad',
    resumenClave: { es: 'Normas urbanas y convivencia con peatones y ciclistas.', ar: 'قواعد في المدينة والتعايش مع المشاة وراكبي الدراجات.' },
    erroresComunes: ['No respetar pasos peatones', 'Circular por carriles bici'],
    content: `# Conducción en Ciudad (القيادة في المدينة)

Buenas prácticas para circular en entornos urbanos.

Conducción urbana segura.
  },
  {
    id: 'driving-15-repaso-final',
    title: 'Capítulo 15: Repaso Final',
    category: 'repaso',
    resumenClave: { es: 'Resumen de puntos clave y recomendaciones antes del examen.', ar: 'ملخص للنقاط الرئيسية والتوصيات قبل الامتحان.' },
    erroresComunes: ['No repasar señales clave', 'Olvidar documentación necesaria'],
    content: `# Repaso Final (المراجعة النهائية)

Checklist y ejercicios de repaso antes del examen oficial.

Preparación para el examen teórico.
  },
  {
    id: 'driving-16-maniobras',
    title: 'Capítulo 16: Maniobras',
    category: 'maniobras',
    resumenClave: { es: 'Técnicas de giro, adelantamiento, cambio de dirección y estacionamiento.', ar: 'تقنيات الانعطاف والتجاوز وتغيير الاتجاه والوقوف.' },
    erroresComunes: ['No señalizar antes de maniobrar', 'Adelantar sin visibilidad suficiente', 'Girar sin reducir velocidad'],
    content: `# Maniobras (المناورات)

Las maniobras son cambios en la posición del vehículo que requieren señalización, precaución y respeto de las normas de tráfico.

## Tipos de Maniobras

### Giro (الانعطاف)
- Señalizar con intermitentes con suficiente anticipación
- Reducir la velocidad antes del giro
- Respetar las señales y marcas viales

### Adelantamiento (التجاوز)
- Solo cuando haya visibilidad suficiente
- Señalizar la intención de adelantar
- Volver al carril derecho después de completar el adelantamiento

### Cambio de Dirección (تغيير الاتجاه)
- Señalizar con anticipación
- Comprobar los espejos retrovisores
- Asegurar que no haya vehículos en el ángulo muerto

### Estacionamiento (الوقوف)
- Buscar espacios permitidos
- Señalizar antes de estacionar
- Dejar espacio suficiente para otros vehículos

Las maniobras son cambios en la posición del vehículo que requieren señalización, precaución y respeto a las normas de tráfico.

أنواع المناورات:
- الانعطاف: استخدام الإشارات مسبقاً، تقليل السرعة، احترام الإشارات
- التجاوز: فقط عندما تكون الرؤية كافية، الإشارة، العودة للحارة اليمنى
- تغيير الاتجاه: الإشارة مسبقاً، فحص المرايا، التأكد من عدم وجود مركبات
- الوقوف: البحث عن أماكن مسموحة، الإشارة، ترك مساحة كافية`,
  },
  {
    id: 'driving-17-normas-multas',
    title: 'Capítulo 17: Normas y Multas',
    category: 'normas',
    resumenClave: { es: 'Infracciones comunes, sistema de puntos y sanciones económicas.', ar: 'المخالفات الشائعة، نظام النقاط والعقوبات المالية.' },
    erroresComunes: ['Desconocer las infracciones graves', 'Ignorar el sistema de puntos', 'No conocer las multas por exceso de velocidad'],
    content: `# Normas y Multas (القواعد والمخالفات)

El sistema de tráfico español se rige por normas estrictas para garantizar la seguridad vial.

## Infracciones Comunes

### Leves (المخالفات البسيطة)
- Estacionamiento en zona prohibida
- No llevar el cinturón de seguridad
- Multa: 80-200€

### Graves (المخالفات الخطيرة)
- Exceso de velocidad moderado (20-30 km/h)
- No respetar señal de Stop
- Multa: 200-500€ + pérdida de puntos

### Muy Graves (المخالفات الخطيرة جداً)
- Exceso de velocidad superior a 30 km/h
- Conducir bajo los efectos del alcohol
- Multa: 500€+ + pérdida de puntos + posible retirada del permiso

## Sistema de Puntos

El permiso de conducir tiene 12 puntos iniciales:
- Infracciones leves: No pérdida de puntos
- Infracciones graves: 2-6 puntos
- Infracciones muy graves: 6 puntos o retirada del permiso

## Recuperación de Puntos

- Cursos de formación: Recuperación de 2-6 puntos
- Tiempo sin infracciones: 2 años sin pérdida = recuperación de puntos

El sistema de tráfico español se rige por normas estrictas para garantizar la seguridad.

المخالفات:
- البسيطة: الوقوف في منطقة محظورة، عدم ربط الحزام (80-200 يورو)
- الخطيرة: تجاوز السرعة 20-30 كم/س، عدم احترام إشارة Stop (200-500 يورو + نقاط)
- الخطيرة جداً: تجاوز السرعة أكثر من 30 كم/س، القيادة تحت تأثير الكحول (500+ يورو + نقاط + سحب الرخصة)

نظام النقاط: 12 نقطة أولية، يمكن فقدان 2-6 نقاط أو سحب الرخصة.`,
  },
  {
    id: 'driving-18-repaso-completo',
    title: 'Capítulo 18: Repaso Completo',
    category: 'repaso',
    resumenClave: { es: 'Repaso exhaustivo de todos los temas antes del examen práctico y teórico.', ar: 'مراجعة شاملة لجميع المواضيع قبل الامتحان العملي والنظري.' },
    erroresComunes: ['No repasar señales específicas', 'Olvidar documentación', 'Nerviosismo excesivo'],
    content: `# Repaso Completo (المراجعة الشاملة)

Este capítulo es un repaso exhaustivo de todos los conceptos importantes antes del examen.

## Checklist Pre-Examen

### Documentación Necesaria
- ✅ DNI o pasaporte en vigor
- ✅ Permiso de conducir (si aplica)
- ✅ Documentación del vehículo
- ✅ Seguro en vigor

### Conceptos Clave a Repasar
1. **Señales de Tráfico**: Todas las categorías y significados
2. **Límites de Velocidad**: Por tipo de vía y vehículo
3. **Prioridad**: Reglas en cruces, rotondas e intersecciones
4. **Maniobras**: Técnicas correctas y señalización
5. **Normas y Sanciones**: Sistema de puntos y multas

### Consejos para el Día del Examen
- Dormir bien la noche anterior
- Llegar con tiempo suficiente
- Mantener la calma
- Leer cuidadosamente cada pregunta
- Repasar las respuestas antes de entregar

## Ejercicios de Repaso

1. Identifica señales de tráfico comunes
2. Calcula límites de velocidad según tipo de vía
3. Determina quién tiene prioridad en diferentes situaciones
4. Practica maniobras en espacios seguros

Este capítulo es un repaso completo de todos los conceptos importantes antes del examen.

قائمة المراجعة:
- الوثائق: الهوية، رخصة القيادة، وثائق المركبة، التأمين
- المفاهيم الرئيسية: إشارات المرور، حدود السرعة، الأولوية، المناورات، القواعد والعقوبات

نصائح ليوم الامتحان:
- النوم الجيد، الوصول مبكراً، الهدوء، القراءة بعناية، المراجعة قبل التسليم`,
  },
];

const STORAGE_KEY = 'driving_lessons_v1';

export function getAllDrivingLessons(): DrivingLesson[] {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (e) {}
  return drivingLessons;
}

export function getDrivingLessonById(id: string): DrivingLesson | undefined {
  return getAllDrivingLessons().find(l => l.id === id);
}

export function persistDrivingLessons(list: DrivingLesson[]) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  } catch (e) {}
}

