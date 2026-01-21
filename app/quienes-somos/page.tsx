import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PageWrapper } from "@/components/page-wrapper"
import { Card } from "@/components/ui/card"

export default function QuienesSomosPage() {
  return (
    <PageWrapper>
      <AppHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
        <section className="w-full max-w-4xl">
          <Card className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <h1 className="mb-8 font-serif text-4xl font-bold text-gray-900 text-balance sm:text-5xl">
                ¿Quiénes somos?
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-gray-700">
                  Somos <strong>BÔCHI – Eventos</strong>, una familia emprendedora que cree profundamente en el valor de
                  los encuentros y las celebraciones compartidas.
                </p>

                <p className="leading-relaxed text-gray-600">
                  Nacimos con la idea de acompañar cada evento desde un lugar cercano, creativo y comprometido.
                  Aportando no solo ambientación y mobiliario, sino también soluciones que faciliten la organización y
                  realcen cada momento.
                </p>

                <p className="leading-relaxed text-gray-600">
                  Trabajamos con dedicación en cada detalle, entendiendo que cada evento es único y merece una puesta
                  en escena que lo represente. Nos especializamos en crear espacios armoniosos, funcionales y
                  estéticamente cuidados, adaptándonos a distintos estilos, tamaños de eventos y necesidades
                  particulares.
                </p>

                <h2 className="mt-12 font-serif text-2xl font-bold text-gray-900">Nuestro objetivo</h2>
                <p className="leading-relaxed text-gray-600">
                  Queremos que quienes nos elijan puedan disfrutar de su celebración con tranquilidad, sabiendo que
                  detrás hay un equipo familiar que se involucra, escucha y acompaña todo el proceso. Creemos en el
                  trato personalizado, en la confianza y en la importancia de generar experiencias que no solo se
                  vivan, sino que también se recuerden y se luzcan. Para nosotros los eventos no son solo fechas o
                  montajes, sino momentos que se comparten, se disfrutan y quedan en la memoria. Y nos encanta ser
                  parte de eso.
                </p>

                <h2 className="mt-12 font-serif text-2xl font-bold text-gray-900">Lo que nos hace diferentes</h2>
                <ul className="leading-relaxed text-gray-600">
                  <li>Atención personalizada para cada evento</li>
                  <li>Mobiliario de alta calidad y diseño moderno</li>
                  <li>Flexibilidad para adaptarnos a tu visión</li>
                  <li>Experiencia en eventos de todo tipo y tamaño</li>
                  <li>Ubicados en Córdoba, pero dispuestos a llegar a cualquier rincón del Mundo.</li>
                </ul>

                <div className="mt-12 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8">
                  <p className="mb-4 text-center text-lg font-semibold text-gray-900">
                    ¿Listo para crear algo memorable?
                  </p>
                  <div className="flex justify-center">
                    <WhatsAppButton message="Hola! Me gustaría conocer más sobre sus servicios de ambientación y mobiliario." />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  )
}
