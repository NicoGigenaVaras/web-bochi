"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroSplashProps {
  onComplete: () => void
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const [flashes, setFlashes] = useState<number[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      // Skip intro or minimal version
      const timer = setTimeout(onComplete, 1000)
      return () => clearTimeout(timer)
    }

    // Camera flash effects at random intervals
    const flashTimes = [800, 1500, 2300, 3200, 4000]
    flashTimes.forEach((time, index) => {
      setTimeout(() => {
        setFlashes((prev) => [...prev, index])
        setTimeout(() => {
          setFlashes((prev) => prev.filter((f) => f !== index))
        }, 150)
      }, time)
    })

    // Complete intro after 5 seconds
    const timer = setTimeout(onComplete, 5000)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      >
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold">BÔCHI</h1>
          <p className="mt-2 text-sm uppercase tracking-wider">Ambientación & Mobiliario</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Neon glow background */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-purple-300/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-pink-300/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/15 blur-[120px]" />
      </div>

      {/* Camera flashes */}
      <AnimatePresence>
        {flashes.map((flash) => (
          <motion.div
            key={flash}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white"
          />
        ))}
      </AnimatePresence>

      {/* Logo reveal */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        >
          {/* TODO: Replace with actual logo */}
          <h1 className="font-serif text-6xl font-bold tracking-tight text-gray-900 md:text-8xl">BÔCHI</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-600 md:text-base"
          >
            Ambientación & Mobiliario
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
