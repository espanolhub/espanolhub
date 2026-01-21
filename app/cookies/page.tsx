import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Cookies - EspañolHub',
  description: 'Información sobre el uso de cookies en EspañolHub y cómo gestionarlas.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <Cookie className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Política de Cookies
            </h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o 
                móvil) cuando visitas un sitio web. Las cookies permiten que el sitio web recuerde tus acciones y 
                preferencias durante un período de tiempo, para que no tengas que volver a configurarlas cada vez 
                que regreses al sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">¿Cómo usamos las cookies?</h2>
              <p>
                En EspañolHub utilizamos cookies para mejorar tu experiencia de usuario y ofrecer funcionalidades 
                esenciales del sitio. Las cookies nos ayudan a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recordar tus preferencias y configuraciones</li>
                <li>Guardar tu progreso de aprendizaje</li>
                <li>Mantener tu sesión iniciada</li>
                <li>Analizar el uso del sitio para mejorarlo</li>
                <li>Personalizar el contenido según tus intereses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Tipos de cookies que utilizamos</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">1. Cookies Esenciales (Técnicas)</h3>
                  <p className="mb-2">
                    Son necesarias para el funcionamiento básico del sitio web. Sin estas cookies, el sitio no puede 
                    funcionar correctamente.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Autenticación:</strong> Mantienen tu sesión iniciada</li>
                    <li><strong>Seguridad:</strong> Protegen contra ataques CSRF</li>
                    <li><strong>Preferencias:</strong> Recuerdan tus ajustes básicos</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Duración:</strong> Sesión o hasta 1 año
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">2. Cookies de Funcionalidad</h3>
                  <p className="mb-2">
                    Permiten recordar tus elecciones (como nombre de usuario, idioma o región) y proporcionan 
                    características mejoradas y personalizadas.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Progreso de aprendizaje:</strong> XP, niveles, lecciones completadas</li>
                    <li><strong>Configuración personal:</strong> Preferencias de idioma y visualización</li>
                    <li><strong>Historial:</strong> Últimas lecciones visitadas</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Duración:</strong> Hasta 1 año
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">3. Cookies de Análisis</h3>
                  <p className="mb-2">
                    Nos ayudan a entender cómo los visitantes interactúan con el sitio recopilando y reportando 
                    información de forma anónima.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Google Analytics:</strong> Análisis de tráfico y comportamiento</li>
                    <li><strong>Métricas de uso:</strong> Páginas visitadas, tiempo de permanencia</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Duración:</strong> Hasta 2 años
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">4. Cookies de Terceros</h3>
                  <p className="mb-2">
                    Algunos servicios que ofrecemos en el sitio utilizan cookies de terceros:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Clerk (Autenticación):</strong> Gestión de sesiones de usuario</li>
                    <li><strong>PayPal (Pagos):</strong> Procesamiento seguro de pagos</li>
                    <li><strong>Vercel (Alojamiento):</strong> Optimización de rendimiento</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Duración:</strong> Variable según el proveedor
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Cookies específicas que utilizamos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="px-4 py-3 border border-gray-300 font-semibold">Nombre</th>
                      <th className="px-4 py-3 border border-gray-300 font-semibold">Tipo</th>
                      <th className="px-4 py-3 border border-gray-300 font-semibold">Propósito</th>
                      <th className="px-4 py-3 border border-gray-300 font-semibold">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="px-4 py-3 border border-gray-300 font-mono">user_progress</td>
                      <td className="px-4 py-3 border border-gray-300">Funcionalidad</td>
                      <td className="px-4 py-3 border border-gray-300">Guarda tu progreso de aprendizaje</td>
                      <td className="px-4 py-3 border border-gray-300">1 año</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300 font-mono">dl_exam_history</td>
                      <td className="px-4 py-3 border border-gray-300">Funcionalidad</td>
                      <td className="px-4 py-3 border border-gray-300">Historial de exámenes DGT</td>
                      <td className="px-4 py-3 border border-gray-300">1 año</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 border border-gray-300 font-mono">ccse_progress</td>
                      <td className="px-4 py-3 border border-gray-300">Funcionalidad</td>
                      <td className="px-4 py-3 border border-gray-300">Progreso en preparación CCSE</td>
                      <td className="px-4 py-3 border border-gray-300">1 año</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300 font-mono">cookie_consent</td>
                      <td className="px-4 py-3 border border-gray-300">Esencial</td>
                      <td className="px-4 py-3 border border-gray-300">Recuerda tu consentimiento de cookies</td>
                      <td className="px-4 py-3 border border-gray-300">1 año</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 border border-gray-300 font-mono">_ga</td>
                      <td className="px-4 py-3 border border-gray-300">Análisis</td>
                      <td className="px-4 py-3 border border-gray-300">Google Analytics - Identificador único</td>
                      <td className="px-4 py-3 border border-gray-300">2 años</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300 font-mono">__clerk_*</td>
                      <td className="px-4 py-3 border border-gray-300">Terceros</td>
                      <td className="px-4 py-3 border border-gray-300">Autenticación de usuario</td>
                      <td className="px-4 py-3 border border-gray-300">Sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">¿Cómo gestionar las cookies?</h2>
              <p className="mb-4">
                Puedes controlar y gestionar las cookies de varias formas:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">1. Configuración del navegador</h3>
                <p className="mb-2">
                  La mayoría de los navegadores permiten ver, gestionar y eliminar cookies. Aquí tienes enlaces 
                  a las instrucciones de los navegadores más populares:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">2. Banner de consentimiento</h3>
                <p>
                  Cuando visitas nuestro sitio por primera vez, verás un banner de cookies donde puedes aceptar o 
                  rechazar cookies no esenciales. Puedes cambiar tus preferencias en cualquier momento.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">3. Desactivar Google Analytics</h3>
                <p>
                  Puedes desactivar Google Analytics instalando el{' '}
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    complemento de inhabilitación de Google Analytics
                  </a>.
                </p>
              </div>
            </section>

            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h2 className="text-xl font-bold text-gray-800 mb-3">⚠️ Importante</h2>
              <p>
                Si desactivas las cookies esenciales, algunas funciones del sitio web pueden no funcionar correctamente. 
                Por ejemplo, no podrás guardar tu progreso de aprendizaje, mantener tu sesión iniciada o acceder a 
                ciertas características personalizadas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Actualizaciones de esta política</h2>
              <p>
                Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas 
                o por razones operativas, legales o reglamentarias. Te recomendamos revisar esta página ocasionalmente 
                para estar informado sobre cómo utilizamos las cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contacto</h2>
              <p>
                Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Correo electrónico: contacto@espanolhub.com</li>
                <li>Formulario de contacto:{' '}
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    /contact
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 justify-between">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Volver al inicio
            </Link>
            <div className="flex gap-4">
              <Link href="/aviso-legal" className="text-gray-600 hover:text-gray-800">
                Aviso Legal
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-800">
                Privacidad
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-800">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

