import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Centro Social, Cultural y Deportivo Barrio Las Flores | BÔCHI Eventos",
  description:
    "Alquiler del Centro Social, Cultural y Deportivo Barrio Las Flores para eventos. Conocé el salón, los planes disponibles, servicios incluidos y consultá disponibilidad.",
  alternates: {
    canonical: "/centro-social-cultural-deportivo-las-flores",
  },
}

export default function CentroSocialCulturalDeportivoLasFloresLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
