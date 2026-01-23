import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal - Espanol Hub',
  description: 'Aviso legal e información sobre la responsabilidad de uso de Espanol Hub.',
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Aviso Legal
          </h1>
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Identificación y Titularidad</h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
                de la Información y Comercio Electrónico, se informa a los usuarios del sitio web de Espanol Hub 
                sobre los datos identificativos de la entidad titular del sitio web:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Titular:</strong> Espanol Hub</li>
                <li><strong>Domicilio:</strong> España</li>
                <li><strong>Correo electrónico:</strong> contacto@espanolhub.com</li>
                <li><strong>Sitio web:</strong> https://www.espanolhub.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Objeto</h2>
              <p>
                Espanol Hub es una plataforma educativa en línea cuyo objetivo es proporcionar recursos, 
                herramientas y contenidos para el aprendizaje del idioma español. El sitio ofrece:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lecciones de gramática, vocabulario y lectura</li>
                <li>Ejercicios interactivos y juegos educativos</li>
                <li>Preparación para exámenes oficiales (CCSE, DELE A2)</li>
                <li>Cursos especializados (Carnet de Conducir en España)</li>
                <li>Guías y recursos sobre trámites en España</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Condiciones de Uso</h2>
              <p>
                El acceso y uso del sitio web implica la aceptación expresa y sin reservas de todas las condiciones 
                establecidas en este Aviso Legal. El usuario se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar el sitio y sus contenidos de forma lícita y conforme a la legislación vigente</li>
                <li>No realizar acciones que puedan dañar, inutilizar o sobrecargar el sitio web</li>
                <li>No introducir virus, código malicioso o cualquier otro sistema que pueda causar daños</li>
                <li>No intentar acceder a áreas restringidas sin autorización</li>
                <li>Respetar los derechos de propiedad intelectual e industrial del sitio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Propiedad Intelectual e Industrial</h2>
              <p>
                Todos los contenidos del sitio web, incluyendo pero no limitándose a textos, fotografías, 
                gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, 
                así como su diseño gráfico y códigos fuente, son propiedad intelectual de Espanol Hub 
                o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación 
                reconocidos por la normativa vigente en materia de propiedad intelectual.
              </p>
              <p className="mt-4">
                Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o 
                cualquier otra forma de explotación de los contenidos sin autorización expresa del titular de los derechos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
              <p>
                Espanol Hub no se hace responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La disponibilidad continua e ininterrumpida del sitio web</li>
                <li>Los errores o inexactitudes en los contenidos publicados</li>
                <li>Los daños derivados del uso o acceso al sitio por parte de terceros no autorizados</li>
                <li>El uso inadecuado que los usuarios puedan hacer de los contenidos del sitio</li>
                <li>Los resultados obtenidos por los usuarios en exámenes oficiales</li>
              </ul>
              <p className="mt-4">
                Los contenidos de este sitio tienen un carácter meramente informativo y educativo. La información 
                sobre trámites, exámenes y procedimientos oficiales puede cambiar sin previo aviso. Se recomienda 
                siempre verificar la información en fuentes oficiales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Independencia y No Afiliación</h2>
              <p>
                Espanol Hub es una plataforma educativa <strong>independiente</strong> y NO está afiliada, 
                patrocinada ni respaldada por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>La Dirección General de Tráfico (DGT)</li>
                <li>El Instituto Cervantes</li>
                <li>Ministerios u organismos gubernamentales</li>
                <li>Instituciones oficiales de España</li>
              </ul>
              <p className="mt-4">
                Los cursos, simuladores y materiales educativos ofrecidos son de elaboración propia con fines 
                didácticos y de preparación, pero no constituyen material oficial de ningún organismo público.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Enlaces a Terceros</h2>
              <p>
                El sitio web puede contener enlaces a sitios web de terceros. Espanol Hub no se hace 
                responsable del contenido, políticas de privacidad o prácticas de estos sitios externos. 
                El acceso a sitios de terceros se realiza bajo la responsabilidad del usuario.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Protección de Datos Personales</h2>
              <p>
                El tratamiento de datos personales de los usuarios se rige por lo dispuesto en nuestra{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline font-semibold">
                  Política de Privacidad
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Modificaciones</h2>
              <p>
                Espanol Hub se reserva el derecho de modificar, actualizar o eliminar la información 
                contenida en el sitio web, así como su configuración, diseño y condiciones de acceso, sin 
                necesidad de previo aviso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Legislación Aplicable y Jurisdicción</h2>
              <p>
                Las presentes condiciones se rigen por la legislación española. Para la resolución de 
                cualquier controversia derivada del acceso o uso del sitio web, las partes se someten 
                expresamente a la jurisdicción y competencia de los Juzgados y Tribunales de España, 
                renunciando a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con este Aviso Legal, puede contactarnos a través de:
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
              <Link href="/privacy" className="text-gray-600 hover:text-gray-800">
                Política de Privacidad
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-gray-800">
                Cookies
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-800">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

