import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Shimmer Wall"
      subtitle="Brillo premium para fotos perfectas."
      description={`Backdrops con brillo que elevan la estetica del evento. Perfectos para fotos, mesas principales, entras y zonas especiales instagrameables.

Facil de combinar con otros objetos para realzar su brillo.
Disponibilidad de distintas medidas para adecuarse a tu espacio, sumado a su encanto perfectamente combinado con carteles neon.

Consulta disponibilidad de colores.`}
      images={[
          "/productos/shimmer-wall/11.jpg",
          "/productos/shimmer-wall/07.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Shimmer Wall."
      backHref="/productos#shimmer-wall"
      inConstruction={false}
    />
  )
}
