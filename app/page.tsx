"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { AppHeader } from "@/components/app-header"
import { IntroSplash } from "@/components/intro-splash"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InstagramButton } from "@/components/instagram-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem("bochi-intro-seen")
    if (seen) setShowIntro(false)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem("bochi-intro-seen", "true")
  }

  if (showIntro) return <IntroSplash onComplete={handleIntroComplete} />

  return (
    <div className="bochi-crosshatch relative flex min-h-screen flex-col overflow-hidden">
      <AppHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
        {/* Recuadro principal */}
        <section className="relative w-full max-w-3xl">
          {/* Sombra NEGRA */}
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="px-6 py-14 text-center sm:px-10 sm:py-16">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* TITULO */}
                <p className="text-xs font-medium tracking-[0.2em] text-neutral-600 sm:text-sm">
                  BIENVENIDOS A
                </p>

                <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                  BÔCHI
                </h1>

                {/* SUBTITULO */}
                <p className="mx-auto mt-4 max-w-xl text-base font-medium text-neutral-700 sm:text-lg">
                  Ambientación &amp; Mobiliario
                </p>

                {/* BOTONES */}
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Button asChild size="lg" className="w-full sm:w-auto rounded-xl">
                    <Link href="/productos">
                      Ver productos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <WhatsAppButton
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl"
                  />

                  <InstagramButton
                    size="lg"
                    className="w-full sm:w-auto rounded-xl"
                  />
                </div>

                {/* FRASE FINAL */}
                <p className="mt-8 text-sm text-neutral-600 sm:text-base">
                  Nos adaptamos a tu espacio, estilo y presupuesto.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
