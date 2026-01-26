"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft } from "lucide-react"

import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { PageWrapper } from "@/components/page-wrapper"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  subtitle: string
  description: string
  images?: string[]
  whatsappMessage?: string
  inConstruction?: boolean
  backHref?: string
}

const PLACEHOLDER = "/placeholders/proximamente.jpg"
const LOADER_LOGO = "/logo/bochi-loader.png"

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

function isVideo(src?: string) {
  if (!src) return false
  const clean = src.split("?")[0].toLowerCase()
  return clean.endsWith(".mp4") || clean.endsWith(".webm")
}

function normalizeMedia(list: string[]) {
  return list?.length ? list : [PLACEHOLDER]
}

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

function Lightbox({
  open,
  media,
  startIndex,
  onClose,
}: {
  open: boolean
  media: string[]
  startIndex: number
  onClose: () => void
}) {
  const safeMedia = normalizeMedia(media)

  const [shownIndex, setShownIndex] = useState(startIndex)
  const [pendingIndex, setPendingIndex] = useState(startIndex)
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
  }, [open, startIndex, safeMedia.join("|")])

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

                {/* BASE */}
                <div className="relative h-[60vh] w-full bg-black">
                  {shownIsVideo ? (
                    <video
                      key={`base-video-${shownIndex}`}
                      src={shownSrc}
                      controls
                      playsInline
                      className="h-full w-full object-contain"
                      onLoadedData={() => {
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                      onError={() => {
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                    />
                  ) : (
                    <motion.img
                      key={`base-img-${shownIndex}`}
                      src={shownSrc || PLACEHOLDER}
                      alt={`imagen ${shownIndex + 1}`}
                      className="h-full w-full select-none object-contain"
                      decoding="async"
                      loading="eager"
                      draggable={false}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={(_, info) => {
                        const swipe = info.offset.x
                        if (swipe < -60) paginate(1)
                        if (swipe > 60) paginate(-1)
                      }}
                      onLoad={() => {
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                      onError={() => {
                        if (pendingIndex === shownIndex) setIsLoading(false)
                      }}
                    />
                  )}
                </div>

                {/* PENDIENTE */}
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

                {/* Flechas */}
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

export function ProductSectionPage({
  title,
  subtitle,
  description,
  images = [],
  whatsappMessage,
  inConstruction = false,
  backHref = "/productos",
}: Props) {
  const mediaAll = useMemo(() => normalizeMedia(images), [images])

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <PageWrapper>
      <div className="bochi-crosshatch min-h-screen">
        <AppHeader />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <Card className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="p-6 sm:p-10 select-none">
              {/* ✅ Volver: queda por encima y no dispara imágenes */}
              <div className="mb-6 relative z-10">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href={backHref} className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Productos
                  </Link>
                </Button>
              </div>

              <p className="text-xs font-medium tracking-[0.22em] text-neutral-600">
                PRODUCTOS & SERVICIOS
              </p>

              <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                {title}
              </h1>

              <p className="mt-3 text-base text-neutral-600">{subtitle}</p>

              <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
                {/* IZQUIERDA: SOLO la imagen/video es clickeable */}
                <section className="space-y-4">
                  {mediaAll.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className="overflow-hidden rounded-2xl border border-black/10 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(i)}
                        className="block w-full outline-none focus:ring-2 focus:ring-black/20"
                      >
                        {isVideo(src) ? (
                          <MediaThumb
                            src={src}
                            alt={`${title} video ${i + 1}`}
                            className="h-64 w-full object-cover sm:h-72"
                            showVideoBadge
                          />
                        ) : (
                          <img
                            src={src || PLACEHOLDER}
                            alt={`${title} foto ${i + 1}`}
                            className="h-64 w-full object-cover sm:h-72"
                            loading="lazy"
                            draggable={false}
                          />
                        )}
                      </button>
                    </div>
                  ))}
                </section>

                {/* DERECHA */}
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
                      <p className="text-neutral-800 leading-relaxed whitespace-pre-line">
                        {description}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 relative z-10">
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

        <Lightbox
          open={lightboxOpen}
          media={mediaAll}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </PageWrapper>
  )
}
