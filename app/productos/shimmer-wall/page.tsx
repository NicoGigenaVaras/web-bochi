import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Shimmer Wall"
      subtitle="Brillo premium para fotos perfectas."
      description="Backdrops con brillo que elevan la estética del evento. Perfecto para fotos, mesas principales, entradas y zonas especiales. Podes combinarlo de la manera que más te guste. Placas de 30cm x 30cm que en su combinación puedes armar distintos tamaños de paneles consulta la disponibildiad. "
      images={[
          "/productos/shimmer-wall/06.jpg",
          "/productos/shimmer-wall/07.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Shimmer Wall."
      backHref="/productos#shimmer-wall"
      inConstruction={false}
    />
  )
}
