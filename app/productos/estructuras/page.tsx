import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Estructuras"
      subtitle="Estructuras que elevan el impacto visual."
      description={`Estructuras decorativas pensadas para destacar sectores especiales del evento.

Contamos con distintos modelos, entre ellos estructuras con bolas de boliche; son ideales para colgar elementos decorativos o utilizar como back para fotos.

Un recurso versátil que suma identidad, impacto visual y posibilidades de personalización.`}
      images={[
          "/productos/estructuras/bola-boliche.jpg",
          "/productos/estructuras/tunel-nuevo.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Estructuras."
      backHref="/productos#estructuras"
      inConstruction={false}
    />
  )
}
