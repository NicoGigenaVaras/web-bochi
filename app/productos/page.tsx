"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ZoomIn } from "lucide-react"

import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { ImageLightbox } from "@/components/image-lightbox"
import { PageWrapper } from "@/components/page-wrapper"
import { ProductosIntro } from "@/components/productos-intro"

const PLACEHOLDER = "/placeholders/proximamente.jpg"

type CatalogItem = {
  id: string
  title: string
  subtitle: string
  description: string
  images: string[]
}

const catalog: CatalogItem[] = [
  {
    id: "shinny-balls",
    title: "Shinny Balls",
    subtitle: "Brillo, movimiento y efecto WoW.",
    description:
      "Esferas espejadas de distintos tamaños que reflejan luces y movimiento. Ideales para ingresos, sectores de fotos y ambientaciones que buscan un impacto visual moderno.",
    images: [
      "/productos/shinny-balls/01.jpg",
      "/productos/shinny-balls/02.jpg",
      "/productos/shinny-balls/03.jpg",
      "/productos/shinny-balls/04.jpg",
      "/productos/shinny-balls/05.jpg",
    ],
  },
  {
    id: "shimmer-wall",
    title: "Shimmer Wall",
    subtitle: "Brillo premium para fotos perfectas.",
    description:
      "Backdrops con brillo para destacar mesas principales, ingresos y espacios fotográficos. Se adaptan a distintos estilos y pueden combinarse con carteles, estructuras y otros elementos.",
    images: [
      "/productos/shimmer-wall/01.jpg",
      "/productos/shimmer-wall/02.jpg",
      "/productos/shimmer-wall/03.jpg",
      "/productos/shimmer-wall/04.jpg",
      "/productos/shimmer-wall/05.jpg",
    ],
  },
  {
    id: "barras-moviles",
    title: "Barras Móviles",
    subtitle: "Diseño, estética y funcionalidad.",
    description:
      "Barras móviles de diseño para recepciones, fiestas y eventos sociales. Contamos con diferentes modelos y tamaños para integrarlas a la ambientación y aprovechar mejor cada espacio.",
    images: [
      "/productos/barras-moviles/01.jpg",
      "/productos/barras-moviles/03.jpg",
      "/productos/barras-moviles/04.jpg",
      "/productos/barras-moviles/05.jpg",
      "/productos/barras-moviles/06.jpg",
    ],
  },
  {
    id: "livings",
    title: "Livings",
    subtitle: "Confort y presencia para tus invitados.",
    description:
      "Sectores cómodos para descansar, conversar y disfrutar del evento. Diseñamos cada composición para acompañar la paleta, el espacio y la propuesta general.",
    images: [
      "/productos/livings/01.jpg",
      "/productos/livings/02.jpg",
      "/productos/livings/03.jpg",
      "/productos/livings/04.jpg",
      "/productos/livings/05.jpg",
    ],
  },
  {
    id: "mesas",
    title: "Mesas",
    subtitle: "Versátiles y elegantes para cada rincón.",
    description:
      "Mesas para candy bar, mesas dulces, exhibición y estaciones decorativas. Diferentes tamaños y estilos para acompañar la ambientación de cada evento.",
    images: [
      "/productos/mesas/01.jpg",
      "/productos/mesas/02.jpg",
      "/productos/mesas/03.jpg",
      "/productos/mesas/04.jpg",
      "/productos/mesas/05.jpg",
    ],
  },
  {
    id: "estructuras",
    title: "Estructuras",
    subtitle: "Volumen e impacto visual.",
    description:
      "Estructuras decorativas para ingresos, sectores fotográficos y puntos protagonistas. Permiten sumar iluminación, objetos colgantes y detalles personalizados.",
    images: [
      "/productos/estructuras/bola-boliche.jpg",
      "/productos/estructuras/tunel-black.jpg",
      "/productos/estructuras/tunel-color.jpg",
      "/productos/estructuras/tunel-nuevo.jpg",
      "/productos/estructuras/estructura.jpg",
    ],
  },
  {
    id: "invitaciones-digitales",
    title: "Invitaciones Digitales",
    subtitle: "Toda la información del evento en un solo lugar.",
    description:
      "Invitaciones digitales personalizadas con ubicación, enlaces, información del evento y confirmación de asistencia para compartir fácilmente con tus invitados.",
    images: [
      "/centro-social-las-flores/invitaciones/invitacion-15.jpg",
      "/centro-social-las-flores/invitaciones/invitacion-casamiento.jpg",
      "/centro-social-las-flores/invitaciones/invitacion-cumple.jpg",
    ],
  },
  {
    id: "premium",
    title: "Sectores Premium",
    subtitle: "Detalles que transforman el ambiente.",
    description:
      "Experiencias especiales como flower bar, merchandising y backdrops personalizados. Diseñamos cada sector para sumar identidad y un punto memorable dentro del evento.",
    images: [
      "/productos/premium/01.jpg",
      "/productos/premium/02.jpg",
      "/productos/premium/03.jpg",
      "/productos/premium/04.jpg",
      "/productos/premium/05.jpg",
    ],
  },
  {
    id: "decoracion-personalizada",
    title: "Decoración Personalizada",
    subtitle: "Diseñamos tu evento a medida.",
    description:
      "Propuestas creadas según el espacio, la temática y el presupuesto. Combinamos mobiliario, ambientación y detalles para lograr una puesta única y coherente.",
    images: [
      "/productos/decoracion-personalizada/festejo-40.jpg",
      "/productos/decoracion-personalizada/fiesta-disco-02.jpg",
      "/productos/decoracion-personalizada/fiesta-disco-03.jpg",
      "/productos/decoracion-personalizada/anio-nuevo-2026.jpg",
      "/productos/decoracion-personalizada/navidad-2026.jpg",
    ],
  },
]

function StaticGallery({
  item,
  priority = false,
  onOpen,
}: {
  item: CatalogItem
  priority?: boolean
  onOpen: (index: number) => void
}) {
  const images = item.images.slice(0, 5)
  const isThreeImageGallery = images.length === 3

  return (
    <div className="mt-6 grid grid-cols-2 gap-2 overflow-hidden rounded-[22px] md:h-[420px] md:grid-cols-4 md:grid-rows-2">
      {images.map((src, imageIndex) => {
        const isMain = imageIndex === 0

        let layoutClass = ""

        if (isMain) {
          layoutClass = "col-span-2 min-h-[240px] md:row-span-2 md:min-h-0"
        } else if (isThreeImageGallery) {
          layoutClass = "aspect-[4/3] md:col-span-2 md:aspect-auto"
        } else {
          layoutClass = "aspect-[4/3] md:aspect-auto"
        }

        return (
          <button
            key={`${item.id}-${src}-${imageIndex}`}
            type="button"
            onClick={() => onOpen(imageIndex)}
            aria-label={`Ver ${item.title}, imagen ${imageIndex + 1} en grande`}
            className={[
              "group relative cursor-zoom-in overflow-hidden bg-neutral-100 text-left",
              layoutClass,
            ].join(" ")}
          >
            <Image
              src={src}
              alt={`${item.title} - imagen ${imageIndex + 1}`}
              fill
              priority={priority && imageIndex === 0}
              sizes={
                isMain
                  ? "(max-width: 768px) 100vw, 50vw"
                  : isThreeImageGallery
                    ? "(max-width: 768px) 50vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
              }
              className="object-cover transition duration-700 group-hover:scale-[1.035] group-hover:brightness-[0.88]"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/15">
              <span className="flex translate-y-2 items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-medium text-neutral-900 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
                Ver foto
              </span>
            </div>

            {src === PLACEHOLDER && (
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/25 to-transparent p-3">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                  Próximamente
                </span>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function ProductosPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <ProductosIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <PageWrapper>
      <AppHeader />

      <main className="w-full flex-1">
        <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 text-center sm:pt-16">
          <p className="text-xs font-medium tracking-[0.24em] text-neutral-600">
            PRODUCTOS & SERVICIOS
          </p>

          <h1 className="mx-auto mt-3 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Explorá nuestras propuestas
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            Mobiliario, ambientación y detalles pensados para transformar cada evento.
            Tocá cualquier imagen para verla en pantalla completa.
          </p>
        </section>

        <section className="mx-auto max-w-6xl space-y-8 px-4 pb-16 sm:space-y-12 sm:pb-24">
          {catalog.map((item, index) => {
            const fromLeft = index % 2 === 0

            return (
              <motion.article
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, x: fromLeft ? -90 : 90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="scroll-mt-24"
              >
                <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.10)] sm:p-8">
                  <div className="max-w-3xl">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                      BÔCHI EVENTOS
                    </p>

                    <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-base font-medium text-neutral-700">
                      {item.subtitle}
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                      {item.description}
                    </p>
                  </div>

                  <StaticGallery
                    item={item}
                    priority={index === 0}
                    onOpen={(imageIndex) => openLightbox(item.images, imageIndex)}
                  />
                </div>
              </motion.article>
            )
          })}
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
