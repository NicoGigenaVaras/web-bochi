import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Estructuras"
      subtitle="Estructuras que elevan el impacto visual."
      description="Armados especiales para entradas, fondos, soportes y sectores destacados. Personalizamos según el concepto del evento."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Estructuras."
      backHref="/productos#estructuras"
      inConstruction={true}
    />
  )
}
