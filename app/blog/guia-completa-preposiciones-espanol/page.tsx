import type { Metadata } from 'next';
import { Calendar, Clock } from 'lucide-react';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Guía Completa de Preposiciones en Español: Aprende a Usarlas Como Nativo (2024)',
  description: 'Domina las preposiciones en español con ejemplos prácticos, reglas claras y ejercicios interactivos. Por, para, a, de, en, con, sin - todo lo que necesitas saber.',
  keywords: [
    'preposiciones español',
    'aprender preposiciones español',
    'por vs para español',
    'preposiciones a de en con',
    'gramática española preposiciones',
    'ejercicios preposiciones español',
    'uso de preposiciones',
    'preposiciones temporales español',
    'preposiciones lugar español',
    'guía preposiciones español'
  ],
};

export default function PreposicionesBlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime="2024-01-15">15 de enero de 2024</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>25 minutos de lectura</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Guía Completa de Preposiciones en Español: Aprende a Usarlas Como Nativo
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Las preposiciones son una de las partes más desafiantes del español para los estudiantes extranjeros. 
            En esta guía completa, aprenderás a dominar las preposiciones más importantes con ejemplos prácticos, 
            reglas claras y ejercicios que te ayudarán a pensar como un hablante nativo.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué son las preposiciones?</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Las preposiciones son palabras invariables que conectan elementos en una oración, estableciendo 
              relaciones de lugar, tiempo, dirección, causa, finalidad, posesión, entre otras. En español, 
              existen 19 preposiciones oficiales, pero en la práctica, solo 9 de ellas cubren el 95% de los usos cotidianos.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-yellow-900 mb-3">Las 19 preposiciones oficiales del español:</h3>
              <p className="text-yellow-800 mb-3">
                a, ante, bajo, cabe, con, contra, de, desde, durante, en, entre, hacia, hasta, 
                mediante, para, por, según, sin, so, sobre, tras.
              </p>
              <p className="text-yellow-700 text-sm">
                <strong>Nota:</strong> Las preposiciones "cabe" y "so" son arcaicas y raramente se usan en el español moderno.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Por qué son tan importantes las preposiciones?</h3>
            
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
              <li><strong>Conectan ideas:</strong> Unen palabras y frases creando relaciones lógicas</li>
              <li><strong>Dan precisión:</strong> Indican exactamente cuándo, dónde, cómo o por qué algo sucede</li>
              <li><strong>Expresan relaciones complejas:</strong> Permiten comunicar ideas abstractas y concretas</li>
              <li><strong>Son universales:</strong> Se usan en todos los niveles del español</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Las 9 preposiciones fundamentales del español</h2>
            
            <div className="space-y-8">
              {/* DE */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. DE - La preposición más usada</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Posesión:</strong> El libro <u>de</u> María</li>
                    <li>• <strong>Material:</strong> Una mesa <u>de</u> madera</li>
                    <li>• <strong>Origen:</strong> Soy <u>de</u> México</li>
                    <li>• <strong>Tema:</strong> Un libro <u>de</u> historia</li>
                    <li>• <strong>Cantidad:</strong> Un vaso <u>de</u> agua</li>
                  </ul>
                </div>
              </div>

              {/* A */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">2. A - Dirección y destino</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• <strong>Dirección:</strong> Voy <u>a</u> la escuela</li>
                    <li>• <strong>Hora:</strong> La reunión es <u>a</u> las 3:00</li>
                    <li>• <strong>Destinatario:</strong> Doy el regalo <u>a</u> Juan</li>
                    <li>• <strong>Lugar:</strong> Estoy <u>a</u> 5 km de aquí</li>
                    <li>• <strong>Infinitivo personal:</strong> Me gusta <u>a</u> nadar</li>
                  </ul>
                </div>
              </div>

              {/* EN */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">3. EN - Ubicación y tiempo</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• <strong>Lugar:</strong> Estoy <u>en</u> casa</li>
                    <li>• <strong>Contenedor:</strong> El agua <u>en</u> el vaso</li>
                    <li>• <strong>Tiempo:</strong> <u>En</u> verano hace calor</li>
                    <li>• <strong>Medio:</strong> Viajo <u>en</u> coche</li>
                    <li>• <strong>Actividad:</strong> Estoy <u>en</u> una reunión</li>
                  </ul>
                </div>
              </div>

              {/* CON */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">4. CON - Compañía y unión</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• <strong>Compañía:</strong> Salgo <u>con</u> amigos</li>
                    <li>• <strong>Instrumento:</strong> Escribo <u>con</u> lápiz</li>
                    <li>• <strong>Característica:</strong> Una casa <u>con</u> jardín</li>
                    <li>• <strong>Manera:</strong> Lo hice <u>con</u> cuidado</li>
                    <li>• <strong>Acuerdo:</strong> Estoy <u>con</u> tu opinión</li>
                  </ul>
                </div>
              </div>

              {/* POR */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4">5. POR - Causa y duración</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-orange-700">
                    <li>• <strong>Causa:</strong> Lloro <u>por</u> alegría</li>
                    <li>• <strong>Duración:</strong> Estudio <u>por</u> dos horas</li>
                    <li>• <strong>Intercambio:</strong> Cambio euros <u>por</u> dólares</li>
                    <li>• <strong>Lugar:</strong> Camino <u>por</u> el parque</li>
                    <li>• <strong>Beneficio:</strong> Lo hago <u>por</u> ti</li>
                  </ul>
                </div>
              </div>

              {/* PARA */}
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4">6. PARA - Finalidad y destinatario</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• <strong>Finalidad:</strong> Estudio <u>para</u> aprender</li>
                    <li>• <strong>Destinatario:</strong> Este regalo es <u>para</u> ti</li>
                    <li>• <strong>Plazo:</strong> Necesito esto <u>para</u> mañana</li>
                    <li>• <strong>Opinión:</strong> <u>Para</u> mí, es importante</li>
                    <li>• <strong>Comparación:</strong> Es alto <u>para</u> su edad</li>
                  </ul>
                </div>
              </div>

              {/* SIN */}
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">7. SIN - Ausencia y privación</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-indigo-700">
                    <li>• <strong>Ausencia:</strong> Café <u>sin</u> azúcar</li>
                    <li>• <strong>Privación:</strong> No puedo vivir <u>sin</u> ti</li>
                    <li>• <strong>Falta:</strong> <u>Sin</u> palabras, no sé qué decir</li>
                    <li>• <strong>Condición:</strong> <u>Sin</u> tu ayuda, no puedo</li>
                  </ul>
                </div>
              </div>

              {/* SOBRE */}
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-4">8. SOBRE - Encima y tema</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-pink-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-pink-700">
                    <li>• <strong>Encima:</strong> El libro está <u>sobre</u> la mesa</li>
                    <li>• <strong>Tema:</strong> Hablamos <u>sobre</u> política</li>
                    <li>• <strong>Aproximación:</strong> Llegará <u>sobre</u> las 8:00</li>
                    <li>• <strong>Control:</strong> Tengo control <u>sobre</u> la situación</li>
                  </ul>
                </div>
              </div>

              {/* HACIA */}
              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-teal-900 mb-4">9. HACIA - Dirección</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-teal-800 mb-2">Usos principales:</h4>
                  <ul className="space-y-2 text-teal-700">
                    <li>• <strong>Dirección:</strong> Voy <u>hacia</u> el norte</li>
                    <li>• <strong>Tendencia:</strong> La economía va <u>hacia</u> la mejora</li>
                    <li>• <strong>Progreso:</strong> Caminamos <u>hacia</u> el futuro</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">POR vs PARA: La batalla eterna</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-red-900 mb-4">La diferencia clave:</h3>
              <p className="text-red-800 mb-4">
                <strong>POR</strong> se usa para causa, motivo, duración, intercambio, lugar (a través de)<br/>
                <strong>PARA</strong> se usa para finalidad, destinatario, plazo, opinión, comparación
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-bold text-orange-900 mb-3">Usa POR cuando:</h4>
                <ul className="space-y-2 text-orange-700 text-sm">
                  <li>• Expresas causa: "Lo hago <u>por</u> amor"</li>
                  <li>• Indicas duración: "Trabajo <u>por</u> 8 horas"</li>
                  <li>• Hablas de intercambio: "Cambio euros <u>por</u> dólares"</li>
                  <li>• Describes movimiento a través: "Camino <u>por</u> el parque"</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h4 className="font-bold text-red-900 mb-3">Usa PARA cuando:</h4>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Indicas finalidad: "Estudio <u>para</u> aprender"</li>
                  <li>• Mencionas destinatario: "Es <u>para</u> ti"</li>
                  <li>• Hablas de plazo: "Necesito <u>para</u> mañana"</li>
                  <li>• Das tu opinión: "<u>Para</u> mí, es perfecto"</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Errores comunes y cómo evitarlos</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-900 mb-3">Error 1: Usar DE en lugar de PARA para finalidad</h3>
                <p className="text-yellow-800 mb-2">
                  <strong>Incorrecto:</strong> "Estudio de aprender"<br/>
                  <strong>Correcto:</strong> "Estudio <u>para</u> aprender"
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-900 mb-3">Error 2: Confundir EN y A para direcciones</h3>
                <p className="text-yellow-800 mb-2">
                  <strong>Incorrecto:</strong> "Voy en la escuela"<br/>
                  <strong>Correcto:</strong> "Voy <u>a</u> la escuela"
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-bold text-yellow-900 mb-3">Error 3: Usar POR en lugar de PARA para destinatarios</h3>
                <p className="text-yellow-800 mb-2">
                  <strong>Incorrecto:</strong> "Este regalo es por ti"<br/>
                  <strong>Correcto:</strong> "Este regalo es <u>para</u> ti"
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ejercicios prácticos</h2>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-blue-900 mb-4">Ejercicio 1: Completa con la preposición correcta</h3>
              <ol className="space-y-3 text-blue-800">
                <li>1. Vivo _____ Madrid (en/a)</li>
                <li>2. Este libro es _____ ti (de/para)</li>
                <li>3. Camino _____ el parque (por/para)</li>
                <li>4. Estudio _____ aprender (de/para)</li>
                <li>5. El gato está _____ la mesa (en/sobre)</li>
              </ol>
              
              <div className="mt-4 p-4 bg-white rounded border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">Respuestas:</h4>
                <p className="text-blue-800 text-sm">
                  1. en | 2. para | 3. por | 4. para | 5. sobre
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-4">Ejercicio 2: POR o PARA?</h3>
              <ol className="space-y-3 text-green-800">
                <li>1. Te lo hago _____ amor (por/para)</li>
                <li>2. Este regalo es _____ tu cumpleaños (por/para)</li>
                <li>3. Trabajo _____ 8 horas diarias (por/para)</li>
                <li>4. Necesito este documento _____ mañana (por/para)</li>
                <li>5. Luchamos _____ la paz (por/para)</li>
              </ol>
              
              <div className="mt-4 p-4 bg-white rounded border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">Respuestas:</h4>
                <p className="text-green-800 text-sm">
                  1. por | 2. para | 3. por | 4. para | 5. por
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Consejos finales para dominar las preposiciones</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">1. Practica con contexto real</h3>
                <p className="text-gray-700">
                  Lee noticias, escucha podcasts y mira series en español. Presta atención a cómo se usan las preposiciones en situaciones reales.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">2. Crea tus propias oraciones</h3>
                <p className="text-gray-700">
                  No te limites a memorizar reglas. Crea oraciones personales usando cada preposición en diferentes contextos.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">3. Usa mnemotécnicos</h3>
                <p className="text-gray-700">
                  Crea frases mnemotécnicas para recordar las diferencias clave, como "POR causa, PARA finalidad".
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">4. Practica con hablantes nativos</h3>
                <p className="text-gray-700">
                  La práctica con nativos te ayudará a internalizar el uso correcto de las preposiciones de forma natural.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusión</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dominar las preposiciones en español requiere tiempo y práctica constante, pero con esta guía completa 
              tienes todas las herramientas necesarias para usarlas como un hablante nativo. Recuerda que la clave está 
              en la práctica regular y en prestar atención al contexto en el que se usan.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Las preposiciones son el pegamento que une las ideas en español. Al dominarlas, no solo mejorarás tu 
              gramática, sino que también te comunicarás con mayor precisión y naturalidad.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3">¿Quieres practicar más?</h3>
              <p className="text-blue-800 mb-4">
                Visita nuestras secciones de ejercicios interactivos y sigue aprendiendo con nosotros:
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/gramatica" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Gramática
                </a>
                <a href="/ejercicios-espanol-interactivos" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Ejercicios
                </a>
                <a href="/vocabulario" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Vocabulario
                </a>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
