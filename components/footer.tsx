// =====================================================
// components/footer.tsx
// Footer fijo del sitio
// - Usa navigationItems para no duplicar links
// - Usa SOCIAL_LINKS / LOCATION desde lib/constants
// =====================================================

import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"
import { SOCIAL_LINKS, LOCATION } from "@/lib/constants"
import { navigationItems } from "@/data/navigation"

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <p className="text-sm text-neutral-700">
          © {new Date().getFullYear()} BÔCHI Eventos. Todos los derechos reservados.
        </p>

        <p className="mt-2 text-sm text-neutral-800">- Detalles que transforman -</p>
      </div>
    </footer>
  )
}
