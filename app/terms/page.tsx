import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos de Servicio - Español Educativo',
  description: 'Términos y condiciones de uso de Español Educativo. Lee nuestros términos de servicio antes de utilizar el sitio.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Términos de Servicio
          </h1>
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de Español Educativo ("el sitio", "nosotros", "nuestro"), 
                aceptas cumplir con estos Términos de Servicio y todas las leyes y regulaciones aplicables. 
                Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestro sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Descripción del Servicio</h2>
              <p>
                Español Educativo es una plataforma educativa en línea que ofrece recursos, cursos, ejercicios 
                y herramientas para aprender español. Proporcionamos contenido educativo, juegos interactivos, 
                ejercicios de gramática, vocabulario, lectura y más.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Uso del Sitio</h2>
              <p>Al utilizar nuestro sitio, aceptas:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar el sitio solo para fines educativos legales</li>
                <li>No intentar acceder a áreas restringidas del sitio sin autorización</li>
                <li>No utilizar el sitio de manera que pueda dañar, deshabilitar o sobrecargar nuestros servidores</li>
                <li>No intentar obtener acceso no autorizado a cualquier parte del sitio</li>
                <li>Respetar los derechos de propiedad intelectual de otros</li>
                <li>No utilizar el sitio para fines comerciales sin nuestro consentimiento expreso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Contenido del Usuario</h2>
              <p>
                Al enviar contenido al sitio (como comentarios, preguntas o respuestas), otorgas a Español Educativo 
                una licencia no exclusiva, libre de regalías y transferible para usar, reproducir, modificar y 
                distribuir ese contenido en el sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Propiedad Intelectual</h2>
              <p>
                Todo el contenido del sitio, incluyendo textos, gráficos, logotipos, iconos, imágenes, clips de audio, 
                descargas digitales y compilaciones de datos, es propiedad de Español Educativo o de sus proveedores 
                de contenido y está protegido por las leyes de derechos de autor.
              </p>
              <p className="mt-4">
                Puedes imprimir o descargar una copia del material del sitio para tu uso personal y no comercial. 
                No puedes reproducir, distribuir, modificar, crear obras derivadas, realizar públicamente, mostrar 
                públicamente, republicar, descargar, almacenar o transmitir ningún material de nuestro sitio sin 
                nuestro permiso previo por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Cuentas de Usuario</h2>
              <p>
                Algunas funciones del sitio pueden requerir que crees una cuenta. Eres responsable de mantener 
                la confidencialidad de tu información de cuenta y contraseña. Aceptas la responsabilidad de todas 
                las actividades que ocurran bajo tu cuenta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Recursos y Contenido Premium</h2>
              <p>
                Algunos recursos en nuestro sitio pueden ser de pago. Al realizar una compra, aceptas pagar el precio 
                indicado. Los precios pueden cambiar en cualquier momento, pero los cambios no afectarán las compras 
                ya realizadas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Precisión de la Información</h2>
              <p>
                Nos esforzamos por proporcionar información precisa y actualizada. Sin embargo, no garantizamos 
                la exactitud, integridad o actualidad de toda la información en el sitio. El contenido educativo 
                se proporciona "tal cual" sin garantías de ningún tipo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Limitación de Responsabilidad</h2>
              <p>
                En la máxima medida permitida por la ley, Español Educativo no será responsable de ningún daño directo, 
                indirecto, incidental, especial, consecuente o punitivo que surja del uso o la imposibilidad de usar 
                nuestro sitio o su contenido.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Indemnización</h2>
              <p>
                Aceptas indemnizar y eximir de responsabilidad a Español Educativo, sus afiliados, directores, 
                empleados y agentes de cualquier reclamo, daño, obligación, pérdida, responsabilidad, costo o deuda, 
                y gastos (incluidos los honorarios de abogados) que surjan de tu uso del sitio o violación de estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Terminación</h2>
              <p>
                Nos reservamos el derecho de terminar o suspender tu acceso al sitio inmediatamente, sin previo aviso 
                o responsabilidad, por cualquier motivo, incluyendo si violas estos Términos de Servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">12. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Continuar utilizando el sitio 
                después de cualquier cambio constituye tu aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">13. Ley Aplicable</h2>
              <p>
                Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde opera Español Educativo, 
                sin tener en cuenta sus disposiciones sobre conflictos de leyes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">14. Contacto</h2>
              <p>
                Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos a través de nuestra 
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
