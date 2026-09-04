"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type CentroSocialIntroProps = {
  onComplete: () => void
}

const letters = ["B", "Ô", "C", "H", "I"]

export function CentroSocialIntro({ onComplete }: CentroSocialIntroProps) {
  const [phase, setPhase] = useState<"loading" | "brand">("loading")

  useEffect(() => {
    const brandTimer = window.setTimeout(() => {
      setPhase("brand")
    }, 850)

    const finishTimer = window.setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      window.clearTimeout(brandTimer)
      window.clearTimeout(finishTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      className="bochi-crosshatch fixed inset-0 z-[5000] flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-white/82 backdrop-blur-[2px]" />

      {phase === "loading" ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="relative z-10 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
            Cargando...
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center"
        >
          <div className="flex justify-center overflow-hidden font-serif text-6xl font-semibold tracking-tight text-neutral-950 sm:text-7xl md:text-8xl">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, x: 34, scale: 0.72, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: (letters.length - 1 - index) * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className="mt-5"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-600 sm:text-xs">
              Centro Social, Cultural y Deportivo
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-neutral-900 sm:text-2xl">
              Barrio Las Flores
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
