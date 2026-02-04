"use client"

import { useMemo } from "react"

// ✅ Link base a tu WhatsApp (por .env.local)
// Ej: NEXT_PUBLIC_WHATSAPP_LINK="https://wa.me/5493517570278"
const DEFAULT_WA_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/5493517570278"

// ✅ Mensaje inicial (llamativo)
const WA_FIRST_MESSAGE =
  "Hola! 🙌 Vengo desde la web de Eventos Bochi.\nQuiero ayuda con la decoración de mi evento ✨\n¿Me cuentan disponibilidad y opciones?"

// Colores de WhatsApp
const WHATSAPP_GREEN = "#25D366"

// ✅ Helper: arma link con texto
function buildWhatsAppLink(baseLink: string, text: string) {
  const encoded = encodeURIComponent(text)
  // Si el link ya trae ?text= por algún motivo, no lo duplicamos:
  if (baseLink.includes("?text=")) return baseLink
  return `${baseLink}?text=${encoded}`
}

// ✅ Ícono WhatsApp (SVG) para no depender de librerías
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.43c-.26-.13-1.54-.76-1.78-.85-.24-.09-.42-.13-.6.13-.18.26-.69.85-.85 1.02-.16.18-.31.2-.57.07-.26-.13-1.1-.4-2.09-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.11-.11.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.46-.16 0-.33-.02-.51-.02-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.73.13.18 1.85 2.83 4.47 3.97.62.27 1.11.43 1.49.55.63.2 1.21.17 1.67.1.51-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31Z"
      />
      <path
        fill="currentColor"
        d="M16 3C9.37 3 4 8.37 4 15c0 2.11.55 4.16 1.6 5.97L4 29l8.2-1.56A11.9 11.9 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3Zm0 21.8c-1.92 0-3.78-.52-5.37-1.51l-.38-.23-4.86.93.95-4.73-.25-.39A9.82 9.82 0 0 1 6.2 15c0-5.41 4.39-9.8 9.8-9.8 5.41 0 9.8 4.39 9.8 9.8 0 5.41-4.39 9.8-9.8 9.8Z"
      />
    </svg>
  )
}

export function WhatsAppFloating() {
  const waLink = useMemo(() => buildWhatsAppLink(DEFAULT_WA_LINK, WA_FIRST_MESSAGE), [])

  return (
    <div
      className="fixed right-4 z-[60] flex flex-col items-end gap-2"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      {/* Hint (opcional) */}
      <div className="hidden rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-900 shadow-md sm:block">
        ¿Necesitás ayuda? Escribinos 💬
      </div>

      {/* Botón flotante → abre WhatsApp directo */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full shadow-xl bochi-wa-pulse"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </a>
    </div>
  )
}
