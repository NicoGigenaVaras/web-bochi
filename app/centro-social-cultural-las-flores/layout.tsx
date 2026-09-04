import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Centro Social y Cultural Las Flores | BÔCHI Eventos",
  description:
    "Alquiler del Centro Social y Cultural Las Flores para eventos. Conocé los planes Básico y Premium, servicios incluidos y disponibilidad.",
}

export default function CentroSocialLasFloresLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
