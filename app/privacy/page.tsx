import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Espanol Hub',
  description: 'Política de privacidad de Espanol Hub. Información sobre cómo recopilamos, usamos y protegemos tus datos personales.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Introducción</h2>
              <p>
                Espanol Hub ("nosotros", "nuestro" o "el sitio") se compromete a proteger tu privacidad. 
                Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información 
                personal cuando utilizas nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Información que Recopilamos</h2>
              <p>Recopilamos los siguientes tipos de información:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Información de contacto:</strong> Nombre y dirección de correo electrónico cuando solicitas recursos gratuitos o te registras en nuestro sitio.</li>
                <li><strong>Información de uso:</strong> Datos sobre cómo utilizas nuestro sitio, incluyendo páginas visitadas, tiempo de permanencia y características utilizadas.</li>
                <li><strong>Información de progreso:</strong> Datos sobre tu progreso de aprendizaje, puntuaciones en juegos y ejercicios completados, almacenados localmente en tu navegador.</li>
                <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo y datos de cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Cómo Utilizamos tu Información</h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios educativos</li>
                <li>Enviarte recursos educativos solicitados</li>
                <li>Personalizar tu experiencia de aprendizaje</li>
                <li>Rastrear tu progreso y proporcionar retroalimentación</li>
                <li>Comunicarnos contigo sobre actualizaciones y nuevos recursos</li>
                <li>Analizar el uso del sitio para mejorar nuestros servicios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Almacenamiento de Datos</h2>
              <p>
                La mayor parte de tus datos de progreso se almacenan localmente en tu navegador utilizando localStorage. 
                Esta información no se transmite a nuestros servidores. Solo almacenamos información de contacto 
                (nombre y correo electrónico) cuando solicitas recursos gratuitos o te registras para servicios adicionales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Cookies y Tecnologías Similares</h2>
              <p className="mb-4">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso del sitio 
                y personalizar el contenido. Puedes controlar las cookies a través de la configuración de cookies en nuestro sitio o a través de la configuración de tu navegador.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tipos de Cookies que Utilizamos</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Cookies Necesarias:</strong> Estas cookies son esenciales para el funcionamiento del sitio. 
                  Permiten funciones básicas como la navegación y el acceso a áreas seguras del sitio. 
                  El sitio no puede funcionar correctamente sin estas cookies.
                </li>
                <li>
                  <strong>Cookies Analíticas:</strong> Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio 
                  recopilando información de forma anónima. Utilizamos Google Analytics para este propósito. 
                  Estas cookies solo se activan con tu consentimiento explícito.
                </li>
                <li>
                  <strong>Cookies Funcionales:</strong> Permiten que el sitio recuerde tus preferencias (como idioma, región) 
                  y proporcione características mejoradas y más personalizadas. Estas cookies también requieren tu consentimiento.
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Gestión de Cookies</h3>
              <p className="mb-4">
                Puedes gestionar tus preferencias de cookies en cualquier momento haciendo clic en el icono de configuración 
                de cookies que aparece en la parte inferior de la pantalla. También puedes controlar las cookies a través 
                de la configuración de tu navegador. Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Google Analytics</h3>
              <p className="mb-4">
                Utilizamos Google Analytics, un servicio de análisis web proporcionado por Google LLC. Google Analytics utiliza 
                cookies para ayudarnos a analizar cómo los usuarios utilizan el sitio. La información generada por las cookies 
                sobre tu uso del sitio (incluida tu dirección IP) será transmitida y almacenada por Google en servidores en los 
                Estados Unidos. Google utilizará esta información con el propósito de evaluar tu uso del sitio, compilar informes 
                sobre la actividad del sitio para los operadores del sitio y proporcionar otros servicios relacionados con la actividad 
                del sitio y el uso de Internet. Google también puede transferir esta información a terceros cuando así lo requiera la ley, 
                o cuando dichos terceros procesen la información en nombre de Google. Google no asociará tu dirección IP con ningún otro dato 
                que Google tenga. Puedes rechazar el uso de cookies seleccionando la configuración apropiada en tu navegador, 
                sin embargo, ten en cuenta que si haces esto, es posible que no puedas usar la funcionalidad completa de este sitio. 
                Al utilizar este sitio, consientes el procesamiento de datos sobre ti por Google en la forma y para los fines establecidos anteriormente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Compartir Información</h2>
              <p>
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las 
                siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio (procesamiento de pagos, análisis, etc.)</li>
                <li>Cuando sea requerido por ley o para proteger nuestros derechos legales</li>
                <li>Con tu consentimiento explícito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Seguridad</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal. 
                Sin embargo, ningún método de transmisión por Internet es 100% seguro. No podemos garantizar 
                la seguridad absoluta de tus datos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Tus Derechos</h2>
              <p>Tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir información incorrecta</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Solicitar la portabilidad de tus datos</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, puedes contactarnos a través de nuestra <Link href="/contact" className="text-blue-600 hover:underline">página de contacto</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Menores de Edad</h2>
              <p>
                Nuestro sitio está dirigido a usuarios de todas las edades, incluidos menores. No recopilamos 
                intencionalmente información personal de menores sin el consentimiento de los padres. Si eres padre 
                o tutor y crees que tu hijo nos ha proporcionado información personal, contáctanos inmediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos cualquier cambio 
                significativo publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos a través de nuestra 
                <Link href="/contact" className="text-blue-600 hover:underline"> página de contacto</Link>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
