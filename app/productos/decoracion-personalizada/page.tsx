import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Decoración Personalizada"
      subtitle="Diseñamos tu evento a medida."
      description="Ambientación integral: colores, concepto, detalles y composición. Te acompañamos desde la idea hasta el montaje final."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Decoración Personalizada."
      backHref="/productos#decoracion-personalizada"
      inConstruction={true}
    />
  )
}
