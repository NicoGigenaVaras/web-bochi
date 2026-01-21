import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card } from "@/components/ui/card"

type Props = {
  title: string
  subtitle: string
  description: string
  images?: string[] // 1 o 2
  whatsappMessage?: string
  inConstruction?: boolean
}

const PLACEHOLDER = "/placeholders/proximamente.jpg"

export function ProductSectionPage({
  title,
  subtitle,
  description,
  images = [],
  whatsappMessage,
  inConstruction = false,
}: Props) {
  const leftImages = images.length ? images.slice(0, 2) : [PLACEHOLDER]

  return (
    <PageWrapper>
      <div className="bochi-crosshatch min-h-screen">
        <AppHeader />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          {/* ✅ Tarjeta principal (misma estética del resto del sitio) */}
          <Card className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="p-6 sm:p-10">
              <p className="text-xs font-medium tracking-[0.22em] text-neutral-600">
                PRODUCTOS & SERVICIOS
              </p>

              <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                {title}
              </h1>

              <p className="mt-3 text-base text-neutral-600">{subtitle}</p>

              {/* ✅ Cuerpo 2 columnas */}
              <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
                {/* IZQUIERDA: fotos */}
                <section className="space-y-4">
                  {leftImages.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className="overflow-hidden rounded-2xl border border-black/10 bg-white"
                    >
                      <img
                        src={src || PLACEHOLDER}
                        alt={`${title} foto ${i + 1}`}
                        className="h-64 w-full object-cover sm:h-72"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </section>

                {/* DERECHA: texto + botón */}
                <section>
                  {inConstruction ? (
                    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6">
                      <p className="text-neutral-800 font-medium">
                        Sector en construcción 🚧
                      </p>
                      <p className="mt-2 text-neutral-600">
                        Estamos preparando fotos y detalles. Si querés cotizar o consultar,
                        escribinos por WhatsApp.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6">
                      <p className="text-neutral-800 leading-relaxed">{description}</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <WhatsAppButton
                      size="lg"
                      className="w-full sm:w-auto rounded-xl"
                      message={whatsappMessage}
                    />
                  </div>
                </section>
              </div>
            </div>
          </Card>
        </main>

        <Footer />
      </div>
    </PageWrapper>
  )
}
