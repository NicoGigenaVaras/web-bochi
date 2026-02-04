import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"


export default function Page() {
  return (
    <ProductSectionPage
      title="Barras móviles"
      subtitle="Barra lista para servir, estética y funcional."
      description={`Barras móviles de diseño, ideales para acompañar recepciones, fiestas y eventos sociales.

Se alquila exclusivamente el mobiliario, pensado para sumar estética y funcionalidad al espacio.

Contamos con distintos modelos y tamaños, incluyendo opciones con ruedas para facilitar su ubicación según el evento.
No incluye bebidas ni personal para atención.`}
      images={[
          "/productos/barras-moviles/01.jpg",
          "/productos/barras-moviles/02.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Barras móviles."
      backHref="/productos#barras-moviles"
      inConstruction={false}
    />
  )
}
