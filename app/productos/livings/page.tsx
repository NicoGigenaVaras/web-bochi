import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Livings"
      subtitle="Confort y presencia para tus invitados."
      description="Zonas de descanso y charla con estilo. Armamos livings que combinan con tu paleta y el tipo de evento."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Livings."
      backHref="/productos#livings"
      inConstruction={true}
    />
  )
}
