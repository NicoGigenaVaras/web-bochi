import { ProductSectionPage } from "@/components/product-section-page"

const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Shinny Balls"
      subtitle="Brillo, movimiento y efecto WoW!"
      description={`Las Shinny Balls son esferas espejadas que aportan un impacto visual moderno y elegante a cualquier evento. 
Su superficie reflectante genera juego de luces, movimiento y profundidad, transformando el espacio en una experiencia visual única.

Son ideales para ambientar sectores de fotos, ingresos o espacios destacados, y se integran perfectamente con otros elementos como Shimmer Wall, livings o estructuras especiales.

Disponibles en color plateado, con distintos tamaños en stock según la necesidad del evento.

Consultanos para combinarlas y lograr un resultado a medida.`}
      images={[
          "/productos/shinny-balls/01.jpg",
          "/productos/shinny-balls/03.jpg",
      ]}
      whatsappMessage="Hola! Quisiera cotizar Shinny Balls."
      backHref="/productos#shinny-balls"
      inConstruction={false}
    />
  )
}
