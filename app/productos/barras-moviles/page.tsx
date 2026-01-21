import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"


export default function Page() {
  return (
    <ProductSectionPage
      title="Barras móviles"
      subtitle="Barra lista para servir, estética y funcional."
      description="Barras móviles para tragos, recepción y servicio. Se adaptan al estilo del evento y combinan con la ambientación."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Barras móviles."
      inConstruction={true}
    />
  )
}
