import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Mesas"
      subtitle="Versátiles y elegantes para cada rincón."
      description="Mesas para recepciones, apoyo, candy bar, lounge o sector principal. Elegimos el formato ideal según tu evento."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Mesas."
      inConstruction={true}
    />
  )
}
