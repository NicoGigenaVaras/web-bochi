"use client"

import { motion } from "framer-motion"

interface PageTransitionLoaderProps {
  variant?: "logo" | "bowling"
}

export function PageTransitionLoader({ variant = "logo" }: PageTransitionLoaderProps) {
  if (variant === "bowling") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm"
      >
        {/* Bowling ball with disco lights effect */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="relative h-24 w-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-950 shadow-2xl"
          >
            {/* Finger holes */}
            <div className="absolute left-1/2 top-1/3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950" />
            <div className="absolute left-1/3 top-2/3 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950" />
            <div className="absolute left-2/3 top-2/3 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950" />
          </motion.div>

          {/* Disco light particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `rotate(${i * 45}deg) translateY(-60px)`,
              }}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            />
          ))}
        </div>
      </motion.div>
    )
  }

  // Logo pulse variant (default)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <h2 className="font-serif text-4xl font-bold text-gray-900">BÔCHI</h2>
        <p className="mt-2 text-xs uppercase tracking-wider text-gray-600">Cargando...</p>
      </motion.div>
    </motion.div>
  )
}
