"use client"

// =====================================================
// /productos (CATÁLOGO)
// - Esta página muestra TODAS las secciones con carrusel + popup
// - Cada sección tiene "Ver más" y el título clickeable que deriva a:
//   /productos/<id>  (ej: /productos/shimmer-wall)
// - Además mantiene anclas: /productos#shimmer-wall
// - Lo ÚNICO que cambia con el tiempo son LAS FOTOS / VIDEOS
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
import { PageTransitionLoader } from "@/components/page-transition-loader"


// ✅ Placeholder general (misma imagen para todo hasta que subas fotos reales)
const PLACEHOLDER = "/placeholders/proximamente.jpg"

// ✅ Logo loader dentro del popup (ponelo en /public/logo/bochi-loader.png)
const LOADER_LOGO = "/logo/bochi-loader.png"

type CatalogItem = {
  id: string // 👈 se usa para ruta y anclas: /productos/<id>  y /productos#<id>
  title: string
  subtitle: string
  images: string[] // 👈 soporta: .jpg/.png/... y también .mp4/.webm
}

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

// ✅ Detecta si un src es video
function isVideo(src?: string) {
  if (!src) return false
  const clean = src.split("?")[0].toLowerCase()
  return clean.endsWith(".mp4") || clean.endsWith(".webm")
}

// ✅ Saca un "safe list" (si viene vacío, pone placeholder)
function normalizeMedia(list: string[]) {
  return list?.length ? list : [PLACEHOLDER]
}

// ✅ Preload SOLO imágenes (evita lag al pasar de foto a foto)
function preloadImage(src: string) {
  if (!src || isVideo(src) || src === PLACEHOLDER) return
  const img = new Image()
  img.src = src
}

function preloadAround(list: string[], index: number) {
  const len = list.length
  if (len <= 1) return
  preloadImage(list[index])
  preloadImage(list[(index + 1) % len])
  preloadImage(list[(index - 1 + len) % len])
}

// ✅ Preload de media inicial del catálogo (imágenes + videos)
// - Imágenes: espera onload
// - Videos: espera loadedmetadata (no baja el video entero)
// - Failsafe: si algo falla, resolve igual
function preloadMedia(src: string) {
  return new Promise<void>((resolve) => {
    if (!src || src === PLACEHOLDER) return resolve()

    if (isVideo(src)) {
      const v = document.createElement("video")
      v.preload = "metadata"
      v.muted = true
      v.playsInline = true

      const done = () => resolve()
      v.onloadedmetadata = done
      v.onerror = done
      v.src = src
      // algunos navegadores requieren llamar load()
      try {
        v.load()
      } catch {
        resolve()
      }
      return
    }

    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function pickPreloadList(catalog: CatalogItem[], perItem = 2) {
  // elegimos 1-2 medias por producto para que el catálogo “entre” fluido
  const out: string[] = []
  for (const item of catalog) {
    const safe = normalizeMedia(item.images)
    for (let i = 0; i < Math.min(perItem, safe.length); i++) {
      const src = safe[i]
      if (src && src !== PLACEHOLDER) out.push(src)
    }
  }
  // dedupe
  return Array.from(new Set(out))
}

/** =====================================================
 * MediaThumb (para carrusel y miniaturas)
 * - Si es video: <video muted loop playsInline>
 * - Si es imagen: <img>
 * - Opcional overlay "VIDEO"
 * ===================================================== */
function MediaThumb({
  src,
  alt,
  className,
  showVideoBadge = false,
}: {
  src: string
  alt: string
  className: string
  showVideoBadge?: boolean
}) {
  const video = isVideo(src)

  return (
    <div className="relative">
      {video ? (
        <video
          src={src}
          className={className}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={src || PLACEHOLDER}
          alt={alt}
          className={className}
          loading="lazy"
          draggable={false}
        />
      )}

      {video && showVideoBadge && (
        <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold tracking-wide text-white">
          VIDEO
        </div>
      )}
    </div>
  )
}

/** =====================================================
 * Carrusel responsive
 * - Mobile: swipe (scroll horizontal + snap)
 * - Desktop: mantiene el auto-scroll (marquee)
 * ===================================================== */
function AutoMarquee({
  images,
  onOpen,
}: {
  images: string[]
  onOpen: (index: number) => void
}) {
  const safeMedia = normalizeMedia(images)
  const loop = [...safeMedia, ...safeMedia]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white">
      {/* ✅ MOBILE (swipe): scroll horizontal con snap */}
      <div className="flex gap-3 overflow-x-auto p-3 sm:hidden snap-x snap-mandatory scroll-smooth no-scrollbar">
        {safeMedia.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => onOpen(i)}
            className="snap-start shrink-0 overflow-hidden rounded-xl outline-none focus:ring-2 focus:ring-black/20"
          >
            <MediaThumb
              src={src}
              alt={`media ${i + 1}`}
              className="h-32 w-56 object-cover"
              showVideoBadge
            />
          </button>
        ))}
      </div>

      {/* ✅ DESKTOP: auto-scroll marquee */}
      <div className="hidden sm:block">
        <div className={cn("flex w-max gap-3 p-3", "bochi-marquee", "motion-reduce:animate-none")}>
          {loop.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => onOpen(i % safeMedia.length)}
              className="group relative overflow-hidden rounded-xl outline-none focus:ring-2 focus:ring-black/20"
            >
              <div className="overflow-hidden rounded-xl">
                <MediaThumb
                  src={src}
                  alt={`media ${i + 1}`}
                  className="h-32 w-56 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  showVideoBadge
                />
              </div>
            </button>
          ))}
        </div>

        {/* fade laterales */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-white/0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-white/0" />
      </div>
    </div>
  )
}

/** =====================================================
 * Lightbox / Popup (SIN “colgado”)
 * - Doble capa:
 *   - BASE: lo que se ve (no se desmonta)
 *   - PENDIENTE: se monta arriba, carga, y recién ahí se confirma
 * - ✅ FIX: la CAPA BASE también apaga el loader en el primer open
 * - Swipe (drag) solo en imágenes
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
  const safeMedia = normalizeMedia(images)

  const [shownIndex, setShownIndex] = useState(startIndex)     // lo que se ve
  const [pendingIndex, setPendingIndex] = useState(startIndex) // lo que quiero cargar arriba
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!open) return
    const idx = Math.max(0, Math.min(startIndex, safeMedia.length - 1))
    setShownIndex(idx)
    setPendingIndex(idx)
    setDirection(0)
    setIsLoading(true)
    preloadAround(safeMedia, idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, startIndex, images.join("|")])

  const requestIndex = (next: number, dir: number) => {
    if (next === pendingIndex) return
    setIsLoading(true)
    setDirection(dir)
    setPendingIndex(next)
    preloadAround(safeMedia, next)
  }

  const paginate = (dir: number) => {
    const next = (pendingIndex + dir + safeMedia.length) % safeMedia.length
    requestIndex(next, dir)
  }

  const shownSrc = safeMedia[shownIndex]
  const pendingSrc = safeMedia[pendingIndex]
  const shownIsVideo = isVideo(shownSrc)
  const pendingIsVideo = isVideo(pendingSrc)

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

                {/* =========================
                    CAPA BASE (NO se desmonta)
                    ✅ FIX: también apaga loader cuando carga
                   ========================= */}
                <div className="relative h-[60vh] w-full bg-black">
                  {shownIsVideo ? (
                    <video
                      key={`base-video-${shownIndex}`} // 🔒 asegura evento load al cambiar
                      src={shownSrc}
                      controls
                      playsInline
                      className="h-full w-full object-contain"
                      onLoadedData={() => {
                        // si justo estamos abriendo y no hay pending, esto evita el “colgado”
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                      onError={() => {
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                    />
                  ) : (
                    <motion.img
                      key={`base-img-${shownIndex}`} // 🔒 asegura evento load al cambiar
                      src={shownSrc || PLACEHOLDER}
                      alt={`imagen ${shownIndex + 1}`}
                      className="h-full w-full select-none object-contain"
                      decoding="async"
                      loading="eager"
                      draggable={false}
                      // swipe SOLO para imágenes
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={(_, info) => {
                        const swipe = info.offset.x
                        if (swipe < -60) paginate(1)
                        if (swipe > 60) paginate(-1)
                      }}
                      onLoad={() => {
                        // ✅ FIX PRINCIPAL: si pending==shown, apagamos loader acá mismo
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                      onError={() => {
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                    />
                  )}
                </div>

                {/* =========================
                    CAPA PENDIENTE (carga arriba)
                   ========================= */}
                {pendingIndex !== shownIndex && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {pendingIsVideo ? (
                      <video
                        key={`pending-video-${pendingIndex}`}
                        src={pendingSrc}
                        controls
                        autoPlay
                        playsInline
                        className="h-[60vh] w-full bg-black object-contain"
                        onLoadedData={() => {
                          setIsLoading(false)
                          setShownIndex(pendingIndex)
                        }}
                        onError={() => setIsLoading(false)}
                      />
                    ) : (
                      <motion.img
                        key={`pending-img-${pendingIndex}`}
                        initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        src={pendingSrc || PLACEHOLDER}
                        alt={`imagen ${pendingIndex + 1}`}
                        className="h-[60vh] w-full select-none bg-black object-contain"
                        decoding="async"
                        loading="eager"
                        draggable={false}
                        onLoad={() => {
                          setIsLoading(false)
                          setShownIndex(pendingIndex)
                        }}
                        onError={() => setIsLoading(false)}
                      />
                    )}
                  </motion.div>
                )}

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
                {safeMedia.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => requestIndex(i, i > pendingIndex ? 1 : -1)}
                    className={cn(
                      "overflow-hidden rounded-lg border",
                      i === shownIndex ? "border-black" : "border-black/10"
                    )}
                  >
                    <MediaThumb
                      src={src}
                      alt={`thumb ${i + 1}`}
                      className="h-14 w-20 object-cover"
                      showVideoBadge
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
  const catalog: CatalogItem[] = useMemo(
    () => [
      {
        id: "shinny-balls",
        title: "Shinny Balls",
        subtitle: "Esferas que cambian tu fiesta.",
        images: [
          "/productos/shinny-balls/01.jpg",
          "/productos/shinny-balls/02.jpg",
          "/productos/shinny-balls/03.jpg",

          
        ],
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
          "/productos/shimmer-wall/08.jpg",
          "/productos/shimmer-wall/09.jpg",
          "/productos/shimmer-wall/11.jpg",
          "/productos/shimmer-wall/12.jpg",
          "/productos/shimmer-wall/13.jpg",
        ],
      },
      {
        id: "barras-moviles",
        title: "Barras Móviles",
        subtitle: "Barra lista para servir, estética y funcional.",
        images: [
          "/productos/barras-moviles/01.jpg",
          "/productos/barras-moviles/02.jpg",
          "/productos/barras-moviles/03.jpg",
          "/productos/barras-moviles/01.jpg",
          "/productos/barras-moviles/02.jpg",
          "/productos/barras-moviles/03.jpg",
        
        ],
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
        subtitle: "Invitaciones interactivas y confirmación de asistencia online.",
        images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
      },
      {
        id: "premium",
        title: "Sectores Premium",
        subtitle: "Detalles premium que transforman el ambiente.",
        images:[
          "/productos/premium/01.jpg",
          "/productos/premium/02.jpg",
          "/productos/premium/03.jpg",
          "/productos/premium/04.jpg",
          "/productos/premium/05.jpg",
          "/productos/premium/06.jpg",
          "/productos/premium/07.jpg",
          "/productos/premium/08.jpg",
      ],
      },
      {
        id: "decoracion-personalizada",
        title: "Decoración Personalizada",
        subtitle: "Diseño a medida para que tu evento sea único.",
        images: [
          "/productos/decoracion-personalizada/festejo-40.jpg",
          "/productos/decoracion-personalizada/festejo-40.mp4",
          "/productos/decoracion-personalizada/fiesta-disco-01.mp4",
          "/productos/decoracion-personalizada/fiesta-disco-02.jpg",
          "/productos/decoracion-personalizada/fiesta-disco-03.jpg",
          "/productos/decoracion-personalizada/anio-nuevo-2026.jpg",
          "/productos/decoracion-personalizada/navidad-2026.jpg",
          "/productos/decoracion-personalizada/barra-deco.jpg",
        ],
      },
    ],
    []
  )

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
    // =========================
  // Loader de página (entrada a /productos)
  // =========================
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    // precargamos 1–2 medias por producto (lo que se ve primero)
    const list = pickPreloadList(catalog, 2)

    // failsafe: nunca más de 3s cargando
    const failSafe = window.setTimeout(() => {
      if (!cancelled) setPageReady(true)
    }, 3000)

    Promise.all(list.map((src) => preloadMedia(src)))
      .catch(() => {})
      .finally(() => {
        window.clearTimeout(failSafe)
        if (!cancelled) setPageReady(true)
      })

    return () => {
      cancelled = true
      window.clearTimeout(failSafe)
    }
  }, [catalog])

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

    if (!pageReady) {
    return <PageTransitionLoader variant="logo" />
  }

  return (
    <PageWrapper>
      <div className="bochi-crosshatch relative flex min-h-screen flex-col overflow-hidden">
        <AppHeader />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-14">
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.22em] text-neutral-600">
              PRODUCTOS & SERVICIOS
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Explorá nuestros productos
            </h1>

            <p className="mt-4 text-base text-neutral-600">
              Deslizá las fotos/videos para ver ejemplos. Tocá una media para verla en grande. Si querés más info,
              entrá en “Ver más”.
            </p>
          </header>

          <section className="space-y-8">
            {catalog.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                className="scroll-mt-24 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="text-center sm:text-left">
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

                      {item.images.every((m) => m === PLACEHOLDER) && (
                        <p className="mt-3 text-sm text-neutral-500">
                          Próximamente sumamos fotos reales de este producto ✨
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center sm:justify-end">
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href={`/productos/${item.id}`}>Ver más</Link>
                      </Button>
                    </div>
                  </div>

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
