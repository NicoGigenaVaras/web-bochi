"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type ProductosIntroProps = {
  onComplete: () => void
}

const letters = ["B", "Ô", "C", "H", "I"]

export function ProductosIntro({ onComplete }: ProductosIntroProps) {
  const [phase, setPhase] = useState<"loading" | "brand">("loading")

  useEffect(() => {
    const brandTimer = window.setTimeout(() => {
      setPhase("brand")
    }, 700)

    const finishTimer = window.setTimeout(() => {
      onComplete()
    }, 2800)

    return () => {
      window.clearTimeout(brandTimer)
      window.clearTimeout(finishTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bochi-crosshatch fixed inset-0 z-[5000] flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-white/84 backdrop-blur-[2px]" />

      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 text-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.38em] text-neutral-500">
              Cargando...
            </p>

            <div className="mx-auto mt-5 h-[2px] w-32 overflow-hidden rounded-full bg-black/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-neutral-900"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 px-4 text-center"
          >
            <div className="flex justify-center overflow-hidden font-serif text-6xl font-semibold tracking-tight text-neutral-950 sm:text-7xl md:text-8xl">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 26,
                    scale: 0.82,
                    filter: "blur(7px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.48,
                    delay: index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-5 text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-600 sm:text-xs"
            >
              Productos & Servicios
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-5 h-px w-28 origin-center bg-neutral-900/35"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
