"use client"

import type React from "react"
import { useState } from "react"
import { Phone } from "lucide-react"

import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InstagramButton } from "@/components/instagram-button"
import { PageWrapper } from "@/components/page-wrapper"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { SOCIAL_LINKS } from "@/lib/constants"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaEvento: "",
    tipoEvento: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = `Hola! Me contacto desde el formulario web:

Nombre: ${formData.nombre}
Fecha del evento: ${formData.fechaEvento}
Tipo de evento: ${formData.tipoEvento}
Mensaje: ${formData.mensaje}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodedMessage}`, "_blank")
  }

  return (
    <PageWrapper>
      <AppHeader />

      {/* 🔑 Igual que Home: main con flex-1 para que el footer quede abajo */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
        <section className="w-full max-w-6xl">
          {/* Tarjeta contenedora general (estilo Home) */}
          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <div className="mb-10 text-center">
                <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 text-balance sm:text-5xl">Contacto</h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 text-pretty">
                  Contanos sobre tu evento y te ayudaremos a crear algo memorable
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Columna izquierda */}
                <Card className="border-gray-200 p-6">
                  <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">Contactate directamente</h2>
                  <div className="space-y-4">
                    <WhatsAppButton className="w-full" size="lg" />
                    <InstagramButton className="w-full" size="lg" />
                    <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                      <a href={`tel:${SOCIAL_LINKS.whatsappNumber}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        Llamar ahora
                      </a>
                    </Button>
                  </div>
                </Card>

                {/* Columna derecha: FORMULARIO COMPLETO */}
                <Card className="border-gray-200 p-6">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900">Formulario de consulta</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-gray-900">
                        Nombre *
                      </label>
                      <Input
                        id="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="fechaEvento" className="mb-2 block text-sm font-medium text-gray-900">
                        Fecha del evento *
                      </label>
                      <Input
                        id="fechaEvento"
                        type="date"
                        required
                        value={formData.fechaEvento}
                        onChange={(e) => setFormData({ ...formData, fechaEvento: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="tipoEvento" className="mb-2 block text-sm font-medium text-gray-900">
                        Tipo de evento *
                      </label>
                      <Input
                        id="tipoEvento"
                        type="text"
                        required
                        value={formData.tipoEvento}
                        onChange={(e) => setFormData({ ...formData, tipoEvento: e.target.value })}
                        placeholder="Ej: Cumpleaños, Boda, Corporativo"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="mb-2 block text-sm font-medium text-gray-900">
                        Mensaje *
                      </label>
                      <Textarea
                        id="mensaje"
                        required
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        placeholder="Contanos qué necesitás para tu evento"
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Enviar consulta por WhatsApp
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                      Al enviar, se abrirá WhatsApp con tu consulta lista para enviar
                    </p>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  )
}
