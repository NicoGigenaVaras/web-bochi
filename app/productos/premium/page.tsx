import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Sectores Premium"
      subtitle="Detalles premium que transforman el ambiente."
      description={`Sectores premium pensados para crear experiencias únicas dentro del evento.

Propuestas más personalizadas y cuidadas, como sector merchandising, flower bar o panel de tul backdrop, diseñadas para destacar espacios específicos.

Cada sector se adapta al estilo del evento, aportando identidad, impacto visual y un detalle especial que marca la diferencia.`}
      images={[
          "/productos/premium/03.jpg",
          "/productos/premium/07.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Sectores Premium."
      backHref="/productos#premium"
      inConstruction={false}
    />
  )
}
