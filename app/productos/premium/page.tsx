import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Sectores Premium"
      subtitle="Detalles premium que transforman el ambiente."
      description="Creamos sectores destacados con piezas premium, iluminación y composición estética. Ideal para mesa principal, fotos o rincones especiales."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Sectores Premium."
      inConstruction={true}
    />
  )
}
