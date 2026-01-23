/**
 * Blog Posts Data
 * SEO-optimized blog posts for attracting organic traffic
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
  datePublished: string;
  dateModified?: string;
  readingTime: number; // in minutes
  image?: string;
  author?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-aprender-espanol-rapido',
    title: 'Cómo Aprender Español Rápido: 7 Métodos Probados',
    excerpt: 'Descubre 7 métodos efectivos para aprender español más rápido. Técnicas probadas por miles de estudiantes que realmente funcionan.',
    content: `# Cómo Aprender Español Rápido: 7 Métodos Probados

Aprender español puede parecer abrumador al principio, pero con los métodos correctos, puedes acelerar significativamente tu progreso. En este artículo, te compartimos 7 técnicas probadas que han ayudado a miles de estudiantes a dominar el español más rápido.

## 1. Inmersión Total en el Idioma

La inmersión es una de las formas más efectivas de aprender cualquier idioma. Esto significa rodearse de español tanto como sea posible:

- **Cambia el idioma de tu teléfono y aplicaciones** a español
- **Escucha música en español** durante tus actividades diarias
- **Mira series y películas** en español con subtítulos
- **Lee noticias y artículos** en español todos los días

## 2. Practica Diariamente, Aunque Sea Poco

La consistencia es clave. Es mejor estudiar 15 minutos cada día que 2 horas una vez a la semana. Tu cerebro necesita exposición regular para retener información.

**Consejo:** Establece una rutina. Por ejemplo, 20 minutos cada mañana antes del trabajo o 15 minutos antes de dormir.

## 3. Enfócate en Vocabulario de Alta Frecuencia

No necesitas aprender todas las palabras del diccionario. Enfócate en las 1000-2000 palabras más usadas, que cubren aproximadamente el 80% del español hablado.

**Palabras esenciales para empezar:**
- Verbos comunes: ser, estar, tener, hacer, ir, venir
- Sustantivos cotidianos: casa, trabajo, familia, tiempo
- Adjetivos básicos: bueno, malo, grande, pequeño

## 4. Habla Desde el Primer Día

Muchos estudiantes esperan hasta "sentirse listos" para hablar. ¡No esperes! Habla desde el primer día, incluso si solo sabes 10 palabras.

**Formas de practicar:**
- Habla contigo mismo en español
- Únete a grupos de intercambio de idiomas
- Usa aplicaciones de conversación
- Graba tu voz y escúchate

## 5. Usa Técnicas de Memoria (Mnemonics)

Las técnicas mnemotécnicas ayudan a recordar vocabulario más fácilmente:

**Ejemplo:** Para recordar que "casa" significa "house", imagina una casa con una "casa" (case) en la puerta.

## 6. Aprende con Contexto, No Solo Listas

En lugar de memorizar listas de palabras, aprende frases completas y oraciones. Esto te ayuda a entender cómo se usan las palabras en contexto real.

**Mal:** Aprender "casa" = "house"
**Bien:** Aprender "Vivo en una casa grande" = "I live in a big house"

## 7. Usa Juegos y Aplicaciones Interactivas

El aprendizaje divertido es más efectivo. Los juegos educativos mantienen tu motivación alta y hacen que el aprendizaje sea más memorable.

**Recursos recomendados:**
- Juegos de memoria con vocabulario
- Quiz interactivos de gramática
- Aplicaciones de repetición espaciada

## Conclusión

Aprender español rápido es posible si usas los métodos correctos. La clave está en la consistencia, la práctica activa y el uso de técnicas probadas. Recuerda: no busques la perfección, busca el progreso constante.

¿Listo para empezar? [Explora nuestros juegos educativos gratuitos](/juegos) y comienza tu viaje hacia la fluidez en español.`,
    keywords: ['aprender español rápido', 'métodos aprender español', 'técnicas aprendizaje'],
    datePublished: '2025-01-15',
    readingTime: 8,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'gramatica-espanola-basica-guia-completa',
    title: 'Gramática Española Básica: Guía Completa para Principiantes',
    excerpt: 'Guía completa de gramática española para principiantes. Aprende los conceptos fundamentales: verbos, tiempos, artículos y más.',
    content: `# Gramática Española Básica: Guía Completa para Principiantes

La gramática es la base de cualquier idioma. En esta guía completa, te explicamos los conceptos fundamentales de la gramática española que todo principiante debe conocer.

## 1. El Alfabeto y la Pronunciación

El español tiene 27 letras (una más que el inglés: la ñ). La mayoría de las letras se pronuncian de forma consistente, lo que hace que el español sea más fácil de leer que el inglés.

## 2. Los Artículos

Los artículos definidos (el, la, los, las) y indefinidos (un, una, unos, unas) son esenciales en español.

**Ejemplos:**
- El libro (the book)
- La casa (the house)
- Un perro (a dog)
- Una mesa (a table)

## 3. Los Sustantivos y el Género

En español, todos los sustantivos tienen género (masculino o femenino). Generalmente:
- Los que terminan en -o son masculinos: el libro, el perro
- Los que terminan en -a son femeninos: la casa, la mesa

**Excepciones importantes:** el día, el problema, la mano

## 4. Los Adjetivos

Los adjetivos deben coincidir en género y número con el sustantivo que modifican.

**Ejemplos:**
- Casa grande (big house)
- Casas grandes (big houses)
- Libro pequeño (small book)
- Libros pequeños (small books)

## 5. Los Verbos: Presente de Indicativo

El presente es el tiempo más usado. Los verbos regulares tienen tres conjugaciones según su terminación:

**-AR (hablar):** yo hablo, tú hablas, él/ella habla, nosotros hablamos, vosotros habláis, ellos hablan
**-ER (comer):** yo como, tú comes, él/ella come, nosotros comemos, vosotros coméis, ellos comen
**-IR (vivir):** yo vivo, tú vives, él/ella vive, nosotros vivimos, vosotros vivís, ellos viven

## 6. Ser vs Estar

Dos verbos que significan "to be" pero se usan de forma diferente:

**Ser:** características permanentes, identidad, origen
- Yo soy estudiante (I am a student)
- Él es de España (He is from Spain)

**Estar:** ubicación, estados temporales
- Estoy en casa (I am at home)
- Está cansado (He is tired)

## 7. Los Pronombres

Los pronombres personales: yo, tú, él/ella, nosotros, vosotros, ellos/ellas

**Nota:** En español, a menudo puedes omitir el pronombre porque la conjugación del verbo ya indica la persona.

## 8. Preguntas y Negaciones

Las preguntas en español se forman invirtiendo el orden o usando entonación:
- ¿Hablas español? (Do you speak Spanish?)
- ¿Dónde vives? (Where do you live?)

Las negaciones usan "no" antes del verbo:
- No hablo inglés (I don't speak English)

## Próximos Pasos

Esta es solo una introducción. Para dominar la gramática española, necesitas práctica constante. [Explora nuestros ejercicios interactivos](/gramatica) y pon en práctica lo que has aprendido.`,
    keywords: ['gramática española básica', 'gramática para principiantes', 'aprender gramática español'],
    datePublished: '2025-01-10',
    readingTime: 12,
    author: 'Espanol Hub Team',
  },
  {
    slug: '100-palabras-espanol-debes-conocer',
    title: '100 Palabras en Español que Debes Conocer',
    excerpt: 'Las 100 palabras más importantes en español que todo estudiante debe conocer. Vocabulario esencial para comunicarte desde el primer día.',
    content: `# 100 Palabras en Español que Debes Conocer

Estas 100 palabras cubren aproximadamente el 50% del español hablado. Memorízalas y estarás en camino hacia la fluidez.

## Sustantivos Esenciales (40 palabras)

**Personas y Familia:**
- persona, hombre, mujer, niño, niña
- padre, madre, hijo, hija, hermano, hermana
- amigo, amiga, familia

**Lugares:**
- casa, ciudad, país, calle, lugar
- escuela, trabajo, tienda, restaurante

**Tiempo:**
- día, noche, semana, mes, año
- hora, minuto, mañana, tarde

**Objetos Comunes:**
- agua, comida, libro, coche, teléfono
- dinero, ropa, zapatos

## Verbos Esenciales (30 palabras)

**Verbos de Alta Frecuencia:**
- ser, estar, tener, hacer, ir, venir
- decir, ver, saber, poder, querer
- hablar, comer, beber, dormir, trabajar
- estudiar, aprender, entender, pensar
- gustar, necesitar, vivir, llegar, salir

## Adjetivos Esenciales (20 palabras)

- bueno, malo, grande, pequeño
- nuevo, viejo, joven, fácil, difícil
- importante, necesario, posible, imposible
- bonito, feo, rico, pobre
- feliz, triste, cansado, enfermo

## Palabras de Conexión (10 palabras)

- y (and), o (or), pero (but), porque (because)
- con (with), sin (without), en (in), de (of)
- para (for), por (for/by)

## Consejos para Memorizar

1. **Agrupa por temas:** No memorices palabras aleatorias
2. **Usa en contexto:** Crea oraciones con cada palabra
3. **Repite regularmente:** La repetición espaciada funciona
4. **Practica con juegos:** [Juega nuestros juegos de vocabulario](/juegos)

## Próximos Pasos

Una vez que domines estas 100 palabras, expande tu vocabulario con [nuestro sistema de vocabulario por temas](/vocabulario-espanol-por-temas).`,
    keywords: ['vocabulario español', 'palabras esenciales español', 'aprender vocabulario'],
    datePublished: '2025-01-08',
    readingTime: 6,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'mejores-juegos-aprender-espanol-online',
    title: 'Los Mejores Juegos para Aprender Español Online',
    excerpt: 'Descubre los mejores juegos educativos online para aprender español. Aprende divirtiéndote con juegos interactivos y efectivos.',
    content: `# Los Mejores Juegos para Aprender Español Online

Aprender español no tiene que ser aburrido. Los juegos educativos hacen que el aprendizaje sea divertido y más efectivo. Aquí están los mejores juegos para aprender español online.

## Por Qué los Juegos Funcionan

Los juegos educativos:
- **Mantienen tu motivación alta**
- **Hacen el aprendizaje memorable**
- **Permiten práctica repetida sin aburrimiento**
- **Proporcionan retroalimentación inmediata**

## Tipos de Juegos Educativos

### 1. Juegos de Memoria
Mejoran tu vocabulario asociando palabras con imágenes o traducciones.

### 2. Quiz y Preguntas Múltiples
Ponen a prueba tu conocimiento de gramática y vocabulario.

### 3. Juegos de Completar Frases
Practican la gramática en contexto.

### 4. Juegos de Ordenar Palabras
Mejoran tu comprensión de la estructura de oraciones.

### 5. Carreras de Palabras
Desarrollan velocidad y fluidez.

## Nuestros Juegos Recomendados

En Espanol Hub, ofrecemos una variedad de juegos educativos:

1. **Quick Quiz - Verbos:** Practica conjugaciones verbales
2. **Word Race:** Desarrolla velocidad de traducción
3. **El Laberinto de Decisiones:** Aprende con situaciones reales
4. **Juegos de Memoria:** Mejora tu vocabulario

[Explora todos nuestros juegos gratuitos](/juegos)

## Consejos para Maximizar el Aprendizaje

1. **Juega regularmente:** 15-20 minutos diarios
2. **Varía los juegos:** No juegues solo un tipo
3. **Establece metas:** Intenta mejorar tu puntuación
4. **Aprende de los errores:** Revisa las respuestas incorrectas

## Conclusión

Los juegos educativos son una herramienta poderosa para aprender español. Combínalos con estudio tradicional para mejores resultados.

[Empieza a jugar ahora](/juegos) - ¡Es gratis!`,
    keywords: ['juegos aprender español', 'juegos educativos español', 'aprender español jugando'],
    datePublished: '2025-01-05',
    readingTime: 7,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'diferencias-ser-estar-ejemplos',
    title: 'Diferencias entre Ser y Estar (con Ejemplos)',
    excerpt: 'Guía completa sobre las diferencias entre ser y estar en español. Aprende cuándo usar cada verbo con ejemplos claros y ejercicios.',
    content: `# Diferencias entre Ser y Estar (con Ejemplos)

Ser y estar son dos de los verbos más importantes en español, y también de los más confusos para los estudiantes. Ambos significan "to be" en inglés, pero se usan en situaciones diferentes.

## Regla General

**SER:** Características permanentes, identidad, origen, profesión
**ESTAR:** Ubicación, estados temporales, condiciones

## Usos de SER

### 1. Identidad y Características Permanentes
- Yo **soy** estudiante (I am a student)
- Él **es** alto (He is tall)
- La casa **es** grande (The house is big)

### 2. Origen y Nacionalidad
- **Soy** de México (I am from Mexico)
- **Es** español (He is Spanish)

### 3. Profesión
- **Soy** profesor (I am a teacher)
- **Es** médico (She is a doctor)

### 4. Material y Posesión
- La mesa **es** de madera (The table is made of wood)
- El libro **es** mío (The book is mine)

### 5. Hora y Fecha
- **Son** las tres (It's three o'clock)
- Hoy **es** lunes (Today is Monday)

## Usos de ESTAR

### 1. Ubicación
- **Estoy** en casa (I am at home)
- El libro **está** en la mesa (The book is on the table)

### 2. Estados Temporales
- **Estoy** cansado (I am tired)
- **Está** enfermo (He is sick)
- **Estamos** felices (We are happy)

### 3. Condiciones Temporales
- La ventana **está** abierta (The window is open)
- El restaurante **está** cerrado (The restaurant is closed)

## Casos Especiales

Algunos adjetivos cambian de significado según el verbo:

- **Ser bueno** = ser una buena persona
- **Estar bueno** = estar sabroso/atractivo

- **Ser listo** = ser inteligente
- **Estar listo** = estar preparado

## Ejercicios Prácticos

1. Completa con ser o estar:
   - Yo ___ estudiante.
   - Él ___ en la escuela.
   - Nosotros ___ contentos.

[Practica más con nuestros ejercicios interactivos](/gramatica)

## Conclusión

La clave para dominar ser y estar es la práctica constante. Recuerda: SER para características permanentes, ESTAR para estados temporales y ubicación.

[Practica ahora con nuestros juegos](/juegos)`,
    keywords: ['ser y estar', 'diferencias ser estar', 'cuando usar ser estar'],
    datePublished: '2025-01-03',
    readingTime: 10,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'verbos-irregulares-espanol-lista-completa',
    title: 'Verbos Irregulares en Español: Lista Completa',
    excerpt: 'Lista completa de verbos irregulares en español. Aprende las conjugaciones más importantes con ejemplos y ejercicios prácticos.',
    content: `# Verbos Irregulares en Español: Lista Completa

Los verbos irregulares son aquellos que no siguen las reglas estándar de conjugación. En este artículo, encontrarás una lista completa de los verbos irregulares más importantes en español.

## ¿Qué son los Verbos Irregulares?

Los verbos irregulares cambian su raíz o terminación en algunas formas, a diferencia de los verbos regulares que siguen un patrón consistente.

## Verbos Irregulares Más Comunes

### 1. SER (to be)
- yo soy, tú eres, él/ella es, nosotros somos, vosotros sois, ellos son

### 2. ESTAR (to be)
- yo estoy, tú estás, él/ella está, nosotros estamos, vosotros estáis, ellos están

### 3. TENER (to have)
- yo tengo, tú tienes, él/ella tiene, nosotros tenemos, vosotros tenéis, ellos tienen

### 4. HACER (to do/make)
- yo hago, tú haces, él/ella hace, nosotros hacemos, vosotros hacéis, ellos hacen

### 5. IR (to go)
- yo voy, tú vas, él/ella va, nosotros vamos, vosotros vais, ellos van

### 6. VENIR (to come)
- yo vengo, tú vienes, él/ella viene, nosotros venimos, vosotros venís, ellos vienen

### 7. DECIR (to say)
- yo digo, tú dices, él/ella dice, nosotros decimos, vosotros decís, ellos dicen

### 8. VER (to see)
- yo veo, tú ves, él/ella ve, nosotros vemos, vosotros veis, ellos ven

## Patrones de Irregularidad

### Verbos con Cambio de Vocal (e → ie)
- pensar: yo pienso, tú piensas
- querer: yo quiero, tú quieres
- preferir: yo prefiero, tú prefieres

### Verbos con Cambio de Vocal (o → ue)
- poder: yo puedo, tú puedes
- dormir: yo duermo, tú duermes
- volver: yo vuelvo, tú vuelves

### Verbos con Cambio de Vocal (e → i)
- pedir: yo pido, tú pides
- servir: yo sirvo, tú sirves

## Consejos para Aprender Verbos Irregulares

1. **Agrupa por patrones:** Aprende verbos similares juntos
2. **Practica con oraciones:** Usa cada verbo en contexto
3. **Repite regularmente:** La repetición es clave
4. **Usa juegos:** [Practica con nuestros juegos de verbos](/juegos)

## Conclusión

Los verbos irregulares pueden parecer difíciles, pero con práctica constante los dominarás. [Practica ahora](/juegos) con nuestros ejercicios interactivos.`,
    keywords: ['verbos irregulares español', 'conjugación verbos irregulares', 'aprender verbos español'],
    datePublished: '2025-01-01',
    readingTime: 9,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'como-mejorar-pronunciacion-espanol',
    title: 'Cómo Mejorar tu Pronunciación en Español',
    excerpt: 'Guía completa para mejorar tu pronunciación en español. Técnicas, ejercicios y consejos prácticos para sonar más natural.',
    content: `# Cómo Mejorar tu Pronunciación en Español

Una buena pronunciación es esencial para comunicarte efectivamente en español. En esta guía, te enseñamos técnicas probadas para mejorar tu pronunciación.

## Sonidos Difíciles para Estudiantes

### La R y la RR
- **R suave:** pero, caro
- **RR fuerte:** perro, carro

### La J
- Sonido similar a la "h" en inglés: jamón, trabajo

### La Ñ
- Sonido único del español: año, niño

### La Z y la C (antes de e/i)
- En España: sonido "th": caza, cena
- En Latinoamérica: sonido "s": casa, cena

## Técnicas para Mejorar

### 1. Escucha Activa
Escucha hablantes nativos y presta atención a cómo pronuncian cada sonido.

### 2. Repetición
Repite palabras y frases después de escucharlas.

### 3. Graba tu Voz
Grábate hablando y compárate con hablantes nativos.

### 4. Practica con Trabalenguas
Los trabalenguas son excelentes para practicar sonidos difíciles.

## Recursos Recomendados

- [Nuestras lecturas con audio](/lectura)
- [Juegos de pronunciación](/juegos)

## Conclusión

Mejorar la pronunciación requiere práctica constante. [Empieza ahora](/lectura) con nuestras lecturas interactivas.`,
    keywords: ['pronunciación español', 'mejorar pronunciación', 'hablar español'],
    datePublished: '2024-12-28',
    readingTime: 6,
    author: 'Espanol Hub Team',
  },
  {
    slug: '10-errores-comunes-aprender-espanol',
    title: '10 Errores Comunes al Aprender Español',
    excerpt: 'Los 10 errores más comunes que cometen los estudiantes de español. Aprende a evitarlos y acelera tu progreso.',
    content: `# 10 Errores Comunes al Aprender Español

Conocer los errores comunes te ayuda a evitarlos. Aquí están los 10 errores más frecuentes que cometen los estudiantes de español.

## 1. Confundir Ser y Estar
**Error:** "Yo estoy estudiante"
**Correcto:** "Yo soy estudiante"

## 2. Olvidar los Artículos
**Error:** "Voy a escuela"
**Correcto:** "Voy a la escuela"

## 3. Usar "muy" con Verbos
**Error:** "Yo muy gusto esto"
**Correcto:** "A mí me gusta mucho esto"

## 4. Confundir Por y Para
**Error:** "Estudio español para mejorar"
**Correcto:** Depende del contexto

## 5. No Conjugar los Verbos
**Error:** "Yo hablar español"
**Correcto:** "Yo hablo español"

## 6. Traducir Literalmente
**Error:** "Tengo 20 años" (traducción literal)
**Correcto:** "Tengo 20 años" (correcto en español)

## 7. Olvidar el Género
**Error:** "El mesa"
**Correcto:** "La mesa"

## 8. Usar "muy" con Adjetivos Incorrectamente
**Error:** "Muy bueno" cuando debería ser "muy bien"
**Correcto:** Depende del contexto

## 9. Confundir Pretérito e Imperfecto
**Error:** Usar uno cuando debería ser el otro
**Correcto:** Aprender las diferencias

## 10. No Practicar lo Suficiente
**Error:** Solo estudiar teoría
**Correcto:** Practicar activamente

## Cómo Evitar Estos Errores

1. Practica regularmente
2. Presta atención a los errores comunes
3. [Usa nuestros ejercicios interactivos](/gramatica)
4. No tengas miedo de cometer errores

[Practica ahora](/juegos) y evita estos errores comunes.`,
    keywords: ['errores aprender español', 'errores comunes español', 'aprender español'],
    datePublished: '2024-12-25',
    readingTime: 8,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'expresiones-coloquiales-espanolas-mas-usadas',
    title: 'Expresiones Coloquiales Españolas Más Usadas',
    excerpt: 'Aprende las expresiones coloquiales más usadas en español. Frases del día a día que te harán sonar más natural.',
    content: `# Expresiones Coloquiales Españolas Más Usadas

Las expresiones coloquiales son frases que los hablantes nativos usan en conversaciones informales. Conocerlas te hará sonar más natural.

## Expresiones Comunes

### 1. "¿Qué tal?"
Significa "How are you?" o "What's up?"

### 2. "Vale"
Significa "OK" o "alright"

### 3. "Tío/Tía"
Usado como "dude" o "mate" en inglés

### 4. "Estar en las nubes"
Significa estar distraído

### 5. "Ser pan comido"
Significa ser muy fácil

## Más Expresiones

- "Echar una mano" = ayudar
- "Tener ganas de" = querer hacer algo
- "Ponerse las pilas" = esforzarse más

## Cómo Aprender Expresiones

1. Escucha conversaciones reales
2. Practica con hablantes nativos
3. [Lee nuestras lecturas](/lectura) con expresiones coloquiales

[Explora más contenido](/lectura)`,
    keywords: ['expresiones coloquiales español', 'frases españolas', 'español coloquial'],
    datePublished: '2024-12-22',
    readingTime: 7,
    author: 'Espanol Hub Team',
  },
  {
    slug: 'recursos-gratuitos-aprender-espanol',
    title: 'Recursos Gratuitos para Aprender Español',
    excerpt: 'Lista completa de los mejores recursos gratuitos para aprender español. Aplicaciones, sitios web, videos y más.',
    content: `# Recursos Gratuitos para Aprender Español

Aprender español no tiene que costar dinero. Aquí tienes una lista completa de recursos gratuitos de alta calidad.

## Sitios Web Gratuitos

### Espanol Hub
Nuestra plataforma ofrece:
- Gramática completa
- Vocabulario por temas
- Juegos educativos
- Preparación para exámenes

[Explora todo nuestro contenido gratuito](/)

## Aplicaciones Móviles

- Duolingo (versión gratuita)
- Memrise (contenido básico gratis)
- Anki (tarjetas de memoria)

## Canales de YouTube

- SpanishPod101
- Butterfly Spanish
- Why Not Spanish

## Podcasts

- Coffee Break Spanish
- Notes in Spanish
- Spanish Obsessed

## Libros Gratuitos

Muchos libros de dominio público están disponibles online.

## Conclusión

Con estos recursos gratuitos, puedes aprender español sin gastar un euro. [Empieza ahora](/aprender-espanol-gratis) con Espanol Hub.`,
    keywords: ['recursos aprender español', 'aprender español gratis', 'recursos gratuitos español'],
    datePublished: '2024-12-20',
    readingTime: 5,
    author: 'Espanol Hub Team',
  },
];

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

/**
 * Get related blog posts
 */
export function getRelatedBlogPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  // Simple related posts by shared keywords
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
}
