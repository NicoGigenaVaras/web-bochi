import { ProductSectionPage } from "@/components/product-section-page"
const PLACEHOLDER = "/placeholders/en-construccion.jpg"

export default function Page() {
  return (
    <ProductSectionPage
      title="Invitaciones digitales"
      subtitle="Invitaciones modernas + confirmación de asistencia."
      description="Invitaciones digitales con diseño, links, ubicación, confirmación de asistencia y toda la info del evento en un solo lugar."
      images={[
        PLACEHOLDER,
        PLACEHOLDER,
      ]}
      whatsappMessage="Hola! Quisiera cotizar Invitaciones digitales."
      backHref="/productos#invitaciones-digitales"
      inConstruction={true}
    />
  )
}
