import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Decoración Personalizada"
      subtitle="Diseñamos tu evento a medida."
      description={`Decoración personalizada pensada para reflejar la identidad de cada evento.

Nos adaptamos al espacio y al presupuesto de cada cliente, diseñando propuestas a medida, sin perder de vista lo más importante: los detalles.

Cada ambientación es única, creada con dedicación para lograr un resultado armonioso y especial.`}
      images={[
          "/productos/decoracion-personalizada/festejo-40.jpg",
          "/productos/decoracion-personalizada/anio-nuevo-2026.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Decoración Personalizada."
      backHref="/productos#decoracion-personalizada"
      inConstruction={true}
    />
  )
}

