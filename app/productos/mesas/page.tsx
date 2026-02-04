import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Mesas"
      subtitle="Versátiles y elegantes para cada rincón."
      description={`Mesas diseñadas para lucir cada detalle de tu evento.

Ideales para candy bar, mesas dulces y estaciones decorativas.

Disponibles en diferentes tamaños y estilos, pensadas para integrarse a la ambientación general.`}
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Mesas."
      backHref="/productos#mesas"
      inConstruction={true}
    />
  )
}