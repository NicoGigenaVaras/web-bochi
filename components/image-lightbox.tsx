"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type ImageLightboxProps = {
  open: boolean
  images: string[]
  startIndex?: number
  onClose: () => void
}

export function ImageLightbox({
  open,
  images,
  startIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex)

  useEffect(() => {
    if (open) {
      setIndex(Math.max(0, Math.min(startIndex, Math.max(images.length - 1, 0))))
    }
  }, [open, startIndex, images.length])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }

      if (event.key === "ArrowLeft" && images.length > 1) {
        setIndex((current) => (current - 1 + images.length) % images.length)
      }

      if (event.key === "ArrowRight" && images.length > 1) {
        setIndex((current) => (current + 1) % images.length)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, images.length, onClose])

  const previous = () => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }

  const next = () => {
    setIndex((current) => (current + 1) % images.length)
  }

  const currentImage = images[index]

  return (
    <AnimatePresence>
      {open && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex h-[92vh] w-full max-w-6xl items-center justify-center overflow-hidden rounded-[22px] bg-black"
          >
            <Image
              src={currentImage}
              alt={`Imagen ampliada ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar imagen"
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Imagen anterior"
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition hover:scale-105 sm:left-5"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Imagen siguiente"
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition hover:scale-105 sm:right-5"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium tracking-[0.12em] text-white backdrop-blur-sm">
                  {index + 1} / {images.length}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
