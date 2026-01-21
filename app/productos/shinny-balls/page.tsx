import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Shinny Balls"
      subtitle="Esferas que cambian tu fiesta."
      description="Esferas espejadas que transforman cualquier espacio con reflejos y brillo. Ideales para pista de baile, entradas, lounges y sets de fotos."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Shinny Balls."
      inConstruction={true}
    />
  )
}
