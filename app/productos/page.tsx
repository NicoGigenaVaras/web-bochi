"use client"

// =====================================================
// /productos (CATÁLOGO)
// - Esta página muestra TODAS las secciones con carrusel + popup
// - Cada sección tiene "Ver más" y el título clickeable que deriva a:
//   /productos/<id>  (ej: /productos/shimmer-wall)
// - Además mantiene anclas: /productos#shimmer-wall
// - Lo ÚNICO que cambia con el tiempo son LAS FOTOS
// =====================================================

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"

import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// ✅ Placeholder general (misma imagen para todo hasta que subas fotos reales)
const PLACEHOLDER = "/placeholders/proximamente.jpg"

// ✅ Logo loader dentro del popup (ponelo en /public/logo/bochi-loader.png)
const LOADER_LOGO = "/logo/bochi-loader.png"

type CatalogItem = {
  id: string // 👈 se usa para ruta y anclas: /productos/<id>  y /productos#<id>
  title: string
  subtitle: string
  images: string[]
}

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

/** =====================================================
 * Carrusel horizontal (auto-scroll por CSS animation bochi-marquee)
 * ===================================================== */
function AutoMarquee({
  images,
  onOpen,
}: {
  images: string[]
  onOpen: (index: number) => void
}) {
  const safeImages = images.length ? images : [PLACEHOLDER]
  const loop = [...safeImages, ...safeImages]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div
        className={cn(
          "flex w-max gap-3 p-3",
          "bochi-marquee",
          "motion-reduce:animate-none"
        )}
      >
        {loop.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => onOpen(i % safeImages.length)}
            className="group relative overflow-hidden rounded-xl outline-none focus:ring-2 focus:ring-black/20"
          >
            <img
              src={src || PLACEHOLDER}
              alt={`foto ${i + 1}`}
              className="h-28 w-44 object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-32 sm:w-56"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* fades laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-white/0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-white/0" />
    </div>
  )
}

/** =====================================================
 * Lightbox / Popup
 * - X siempre adelante (z-index alto)
 * - Loader con logo cuando cambia/carga la imagen
 * - Swipe (drag) para pasar imágenes en mobile
 * ===================================================== */
function Lightbox({
  open,
  images,
  startIndex,
  onClose,
}: {
  open: boolean
  images: string[]
  startIndex: number
  onClose: () => void
}) {
  const safeImages = images.length ? images : [PLACEHOLDER]
  const [[index, direction], setIndex] = useState<[number, number]>([
    startIndex,
    0,
  ])
  const [isLoading, setIsLoading] = useState(true)

  // ✅ sincroniza cuando abrís el popup en otra foto
  useEffect(() => {
    if (!open) return
    setIsLoading(true)
    setIndex([Math.max(0, Math.min(startIndex, safeImages.length - 1)), 0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, startIndex, images.join("|")])

  const paginate = (dir: number) => {
    setIsLoading(true)
    setIndex(([prev]) => {
      const next = (prev + dir + safeImages.length) % safeImages.length
      return [next, dir]
    })
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅ X siempre por delante */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-2 top-2 z-[2000] rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              <X className="h-5 w-5 text-black" />
            </button>

            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative">
                {/* ✅ Loader con logo mientras carga */}
                {isLoading && (
                  <div className="absolute inset-0 z-[1500] grid place-items-center bg-black/40">
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={LOADER_LOGO}
                        alt="BÔCHI"
                        className="h-14 w-14 animate-pulse object-contain"
                      />
                      <p className="text-sm text-white/90">Cargando…</p>
                    </div>
                  </div>
                )}

                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={index}
                    src={safeImages[index] || PLACEHOLDER}
                    alt={`imagen ${index + 1}`}
                    className="h-[60vh] w-full select-none bg-black object-contain"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.18 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      const swipe = info.offset.x
                      if (swipe < -60) paginate(1)
                      if (swipe > 60) paginate(-1)
                    }}
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                </AnimatePresence>

                {/* Flechas por delante */}
                <div className="absolute inset-y-0 left-0 z-[1600] flex items-center">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="m-3 rounded-full bg-white/85 px-3 py-2 text-sm font-medium shadow hover:bg-white"
                  >
                    ←
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 z-[1600] flex items-center">
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="m-3 rounded-full bg-white/85 px-3 py-2 text-sm font-medium shadow hover:bg-white"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Miniaturas */}
              <div className="flex gap-2 overflow-x-auto p-3">
                {safeImages.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => {
                      setIsLoading(true)
                      setIndex([i, i > index ? 1 : -1])
                    }}
                    className={cn(
                      "overflow-hidden rounded-lg border",
                      i === index ? "border-black" : "border-black/10"
                    )}
                  >
                    <img
                      src={src || PLACEHOLDER}
                      alt={`thumb ${i + 1}`}
                      className="h-14 w-20 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ProductosPage() {
  // =====================================================
  // CATÁLOGO (FIJO)
  // - id debe coincidir con:
  //   1) La ruta: /productos/<id>
  //   2) La ancla: /productos#<id>
  // - Solo cambian las fotos (paths)
  // =====================================================
  const catalog: CatalogItem[] = useMemo(
    () => [
      {
        id: "shinny-balls",
        title: "Shinny Balls",
        subtitle: "Esferas que cambian tu fiesta.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "shimmer-wall",
        title: "Shimmer Wall",
        subtitle: "Brillo premium para fotos perfectas.",
        images: [
          "/productos/shimmer-wall/01.jpg",
          "/productos/shimmer-wall/02.jpg",
          "/productos/shimmer-wall/03.jpg",
          "/productos/shimmer-wall/04.jpg",
          "/productos/shimmer-wall/05.jpg",
          "/productos/shimmer-wall/06.jpg",
          "/productos/shimmer-wall/07.jpg",
        ],
      },
      {
        id: "barras-moviles",
        title: "Barras Móviles",
        subtitle: "Barra lista para servir, estética y funcional.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "livings",
        title: "Livings",
        subtitle: "Confort y presencia para tus invitados.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "mesas",
        title: "Mesas",
        subtitle: "Versátiles y elegantes para cada rincón.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "estructuras",
        title: "Estructuras",
        subtitle: "Estructuras que elevan el impacto visual.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "invitaciones-digitales",
        title: "Invitaciones Digitales",
        subtitle: "Invitaciones interactivas y confirmación de asistencia online.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "premium",
        title: "Sectores Premium",
        subtitle: "Detalles premium que transforman el ambiente.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "decoracion-personalizada",
        title: "Decoración Personalizada",
        subtitle: "Diseño a medida para que tu evento sea único.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
    ],
    []
  )

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <PageWrapper>
      <div className="bochi-crosshatch relative flex min-h-screen flex-col overflow-hidden">
        <AppHeader />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-14">
          {/* Header centrado */}
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.22em] text-neutral-600">
              PRODUCTOS & SERVICIOS
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Explorá nuestros productos
            </h1>

            <p className="mt-4 text-base text-neutral-600">
              Deslizá las fotos para ver ejemplos. Tocá una imagen para verla en grande. Si querés más info, entrá en “Ver más”.
            </p>
          </header>

          {/* Secciones */}
          <section className="space-y-8">
            {catalog.map((item) => (
              <Card
                key={item.id}
                id={item.id} // ✅ ancla /productos#<id>
                className="scroll-mt-24 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
              >
                <div className="p-6 sm:p-8">
                  {/* ✅ Header de cada card + CTA */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="text-center sm:text-left">
                      {/* ✅ Título clickeable */}
                      <Link
                        href={`/productos/${item.id}`}
                        className="group inline-flex items-center justify-center gap-2 sm:justify-start"
                      >
                        <h2 className="font-serif text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                          {item.title}
                        </h2>
                        <ArrowRight className="h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-900" />
                      </Link>

                      <p className="mt-2 text-base text-neutral-600">{item.subtitle}</p>

                      {/* SECTOR EN CONSTRUCCIÓN */}
                      {item.images.every((img) => img === PLACEHOLDER) && (
                        <p className="mt-3 text-sm text-neutral-500">
                          {/* SECTOR EN CONSTRUCCIÓN */}
                          Próximamente sumamos fotos reales de este producto ✨
                        </p>
                      )}
                    </div>

                    {/* ✅ Botón Ver más */}
                    <div className="flex justify-center sm:justify-end">
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href={`/productos/${item.id}`}>Ver más</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Carrusel */}
                  <div className="mt-6">
                    <AutoMarquee
                      images={item.images}
                      onOpen={(idx) => openLightbox(item.images, idx)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </section>
        </main>

        <Footer />

        <Lightbox
          open={lightboxOpen}
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </PageWrapper>
  )
}
