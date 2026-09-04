"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  Gift,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  ZoomIn,
} from "lucide-react"

import { AppHeader } from "@/components/app-header"
import { CentroSocialIntro } from "@/components/centro-social-intro"
import { Footer } from "@/components/footer"
import { ImageLightbox } from "@/components/image-lightbox"
import { PageWrapper } from "@/components/page-wrapper"
import { WhatsAppButton } from "@/components/whatsapp-button"

const MAPS_URL =
  "https://www.google.com/maps/place/Centro+Social+Cultural+y+Deportivo+B%C2%B0+Las+Flores/@-31.4534893,-64.2014276,927m/data=!3m2!1e3!4b1!4m6!3m5!1s0x9432a2542f8cb661:0x26dfc78c194ab09c!8m2!3d-31.4534893!4d-64.1988527!16s%2Fg%2F11bbrpr8_m?entry=ttu&g_ep=EgoyMDI2MDkwMS4wIKXMDSoASAFQAw%3D%3D"

const venueImages = [
  "/centro-social-las-flores/salon-01.jpg",
  "/centro-social-las-flores/salon-02.jpg",
  "/centro-social-las-flores/salon-03.jpg",
  "/centro-social-las-flores/salon-04.jpg",
]

const invitationExamples = [
  {
    title: "15 años",
    image: "/centro-social-las-flores/invitaciones/invitacion-15.jpg",
  },
  {
    title: "Casamientos",
    image: "/centro-social-las-flores/invitaciones/invitacion-casamiento.jpg",
  },
  {
    title: "Cumpleaños y festejos",
    image: "/centro-social-las-flores/invitaciones/invitacion-cumple.jpg",
  },
]

const plans = [
  {
    name: "Salón Básico",
    eyebrow: "PLAN BÁSICO",
    featured: false,
    message: "Hola Consulto por el plan basico",
    includes: [
      "Limpieza previa y posterior al evento",
      "Personal para acomodar los autos en las inmediaciones",
      "Tablones y sillas plásticas para 150 personas",
      "Instalaciones del salón principal",
      "Guardia de seguridad en el ingreso al salón",
      "Personal para limpieza de baños durante el evento",
    ],
  },
  {
    name: "Salón Premium",
    eyebrow: "PLAN PREMIUM",
    featured: true,
    message: "Hola Consulto por el plan premium",
    includes: [
      "Limpieza previa y posterior al evento",
      "Personal para acomodar los autos en las inmediaciones",
      "Personal para mantener la limpieza de baños durante el evento",
      "Tablones y sillas plásticas para 150 personas",
      "Instalaciones del salón principal",
      "Guardia de seguridad en el ingreso al salón",
      "Revestimiento de paredes del salón en color negro",
      "Decoración en escenario",
    ],
  },
]

function VenueGallery({
  onOpen,
}: {
  onOpen: (index: number) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:h-[540px] md:grid-cols-4 md:grid-rows-2">
      <div className="relative col-span-2 min-h-[320px] overflow-hidden rounded-[20px] bg-black md:row-span-2 md:min-h-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster="/centro-social-las-flores/portada.jpg"
          aria-label="Video del Centro Social, Cultural y Deportivo Barrio Las Flores"
        >
          <source
            src="/centro-social-las-flores/portada.mp4"
            type="video/mp4"
          />
          Tu navegador no puede reproducir este video.
        </video>

        <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          Conocé el salón
        </div>
      </div>

      {venueImages.map((src, index) => (
        <button
          key={src}
          type="button"
          onClick={() => onOpen(index)}
          className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[20px] bg-neutral-100 md:aspect-auto"
          aria-label={`Ver foto ${index + 1} del salón en grande`}
        >
          <Image
            src={src}
            alt={`Centro Social, Cultural y Deportivo Barrio Las Flores - foto ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035] group-hover:brightness-[0.88]"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/15">
            <ZoomIn className="h-6 w-6 text-white opacity-0 drop-shadow transition group-hover:opacity-100" />
          </div>
        </button>
      ))}
    </div>
  )
}

export default function CentroSocialCulturalLasFloresPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const invitationImages = invitationExamples.map((example) => example.image)

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <CentroSocialIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <PageWrapper>
        <AppHeader />

        <main className="flex-1">
          <section className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mx-auto max-w-5xl text-center"
            >
              <p className="text-xs font-medium tracking-[0.24em] text-neutral-600">
                BÔCHI EVENTOS
              </p>

              <h1 className="mt-3 font-serif font-semibold tracking-tight text-neutral-900">
                <span className="block text-4xl sm:text-5xl md:text-6xl">
                  Centro Social, Cultural y Deportivo
                </span>
                <span className="mt-2 block text-3xl sm:text-4xl md:text-5xl">
                  Barrio Las Flores
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                Un espacio para celebrar, compartir y crear momentos inolvidables.
                Organizá tu evento en nuestro salón y complementá la experiencia
                con la ambientación de BÔCHI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="mt-10"
            >
              <VenueGallery
                onOpen={(index) => openLightbox(venueImages, index)}
              />
            </motion.div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="grid gap-4 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[24px] border border-black/10 bg-white p-6"
              >
                <CalendarDays className="h-6 w-6 text-neutral-700" />

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Agenda abierta
                </p>

                <p className="mt-1 font-serif text-2xl font-semibold text-neutral-900">
                  Consultá disponibilidad
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[24px] border border-black/10 bg-white p-6"
              >
                <Clock3 className="h-6 w-6 text-neutral-700" />

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Horario de evento
                </p>

                <p className="mt-1 font-serif text-2xl font-semibold text-neutral-900">
                  21:00 horas a 04:00 horas
                </p>

                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  Horario de referencia para festejos nocturnos de los sábados.
                </p>
              </motion.div>

              <motion.a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
              >
                <MapPin className="h-6 w-6 text-neutral-700" />

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Ubicación
                </p>

                <p className="mt-1 font-serif text-2xl font-semibold text-neutral-900">
                  Barrio Las Flores
                </p>

                <p className="mt-2 text-sm leading-5 text-neutral-600">
                  José Antonio Guardado 108, X5016CID Córdoba
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-800">
                  Ver en Google Maps
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-5 rounded-[24px] border border-black/10 bg-white/90 p-6 text-center sm:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Festejos nocturnos de los sábados
              </p>

              <p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
                El día del evento pueden ingresar desde las{" "}
                <strong>15:00 horas</strong> para decorar y preparar el salón.
                La finalización es a las <strong>04:00 horas</strong> y el retiro
                de pertenencias debe realizarse como máximo a las{" "}
                <strong>05:00 horas</strong>.
              </p>

              <p className="mx-auto mt-4 max-w-3xl text-sm font-medium leading-6 text-neutral-900 sm:text-base">
                ¿Tu evento es durante el día o necesitás otro horario?
                Consultanos por disponibilidad y condiciones.
              </p>
            </motion.div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <p className="text-xs font-medium tracking-[0.24em] text-neutral-600">
                OPCIONES DE ALQUILER
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                Elegí el plan para tu evento
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
                Dos alternativas para adaptar el salón a la experiencia que querés crear.
              </p>
            </div>

            <div className="grid items-start gap-5 lg:grid-cols-2">
              {plans.map((plan, index) => (
                <motion.article
                  key={plan.name}
                  initial={{ opacity: 0, x: index === 0 ? -70 : 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.992 }}
                  className={[
                    "group relative overflow-hidden rounded-[28px] border bg-white p-5 text-neutral-900 shadow-[0_14px_36px_rgba(0,0,0,0.08)] transition-colors duration-300 sm:p-6",
                    "hover:bg-neutral-900 hover:text-white active:bg-neutral-900 active:text-white",
                    plan.featured
                      ? "border-neutral-900"
                      : "border-black/10",
                  ].join(" ")}
                >
                  {plan.featured && (
                    <div className="absolute right-5 top-5 rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors group-hover:bg-white group-hover:text-neutral-900 group-active:bg-white group-active:text-neutral-900">
                      Más completo
                    </div>
                  )}

                  <p className="text-xs font-medium tracking-[0.22em] text-neutral-500 transition-colors group-hover:text-white/60 group-active:text-white/60">
                    {plan.eyebrow}
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                    {plan.name}
                  </h3>

                  <div className="mt-5 border-t border-black/10 pt-5 transition-colors group-hover:border-white/20 group-active:border-white/20">
                    <p className="font-medium">
                      El alquiler incluye:
                    </p>

                    <ul className="mt-4 space-y-3">
                      {plan.includes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-6 sm:text-[15px]"
                        >
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors group-hover:bg-white group-hover:text-neutral-900 group-active:bg-white group-active:text-neutral-900">
                            <Sparkles className="h-3 w-3" />
                          </span>

                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <WhatsAppButton
                    message={plan.message}
                    size="lg"
                    className="mt-6 w-full rounded-xl bg-neutral-900 text-white transition-colors hover:bg-neutral-800 group-hover:bg-white group-hover:text-neutral-900 group-active:bg-white group-active:text-neutral-900"
                  >
                    Consultar por {plan.eyebrow === "PLAN BÁSICO" ? "Plan Básico" : "Plan Premium"}
                  </WhatsAppButton>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="overflow-hidden rounded-[30px] border border-black/10 bg-neutral-900 p-6 text-white shadow-[0_20px_55px_rgba(0,0,0,0.16)] sm:p-8"
            >
              <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-neutral-900">
                  <ShieldCheck className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                    Reserva de fecha
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-semibold">
                    Confirmá tu fecha con una seña del 50%
                  </h2>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                    Para asegurar la disponibilidad y dejar tu fecha reservada,
                    se solicita una seña equivalente al{" "}
                    <strong className="text-white">50% del valor del alquiler</strong>.
                    Una vez acreditada, la fecha queda confirmada para tu evento.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-20 pt-5 sm:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              className="rounded-[30px] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-8"
            >
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <Gift className="h-6 w-6" />
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                  BENEFICIO INCLUIDO
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  De regalo: tu invitación web personalizada
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                  Al reservar el salón, incluimos sin cargo el desarrollo de una
                  invitación web personalizada para tu evento, diseñada para compartir
                  fácilmente con tus invitados.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {invitationExamples.map((example, index) => (
                  <button
                    key={example.title}
                    type="button"
                    onClick={() => openLightbox(invitationImages, index)}
                    className="group cursor-zoom-in overflow-hidden rounded-[22px] border border-black/10 bg-neutral-50 text-left transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.10)]"
                    aria-label={`Ver invitación de ${example.title} en grande`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                      <Image
                        src={example.image}
                        alt={`Ejemplo de invitación web para ${example.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025] group-hover:brightness-[0.9]"
                      />

                      <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 opacity-0 shadow transition group-hover:opacity-100">
                        <ZoomIn className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4">
                      <PartyPopper className="h-4 w-4 text-neutral-500" />

                      <p className="font-serif text-lg font-semibold text-neutral-900">
                        {example.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-center text-xs leading-5 text-neutral-500">
                Diseño y contenido sujetos a coordinación previa según el tipo y estilo del evento.
              </p>
            </motion.div>
          </section>
        </main>

        <Footer />

        <ImageLightbox
          open={lightboxOpen}
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      </PageWrapper>
    </>
  )
}
