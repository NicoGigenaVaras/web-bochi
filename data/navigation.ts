// =====================================================
// data/navigation.ts
// Menú principal del sitio
// - Solo hay 3 secciones "macro" en código:
//   1) ¿Quiénes somos?
//   2) Productos y Servicios (con sub-items)
//   3) Experiencias y Fotos + Contacto (sección bottom)
// - Importante: NO existen páginas /productos/[slug]
//   Los sub-items de productos navegan a anclas:
//   /productos#shimmer-wall, etc.
// =====================================================

export type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
  section?: "top" | "bottom"
}

export const navigationItems = [
  { label: "¿Quiénes somos?", href: "/quienes-somos", section: "top" },
  {
    label: "Productos y Servicios",
    href: "/productos",
    section: "top",
    children: [
      { label: "Shinny Balls", href: "/productos/shinny-balls" },
      { label: "Shimmer Wall", href: "/productos/shimmer-wall" },
      { label: "Barras móviles", href: "/productos/barras-moviles" },
      { label: "Livings", href: "/productos/livings" },
      { label: "Mesas", href: "/productos/mesas" },
      { label: "Estructuras", href: "/productos/estructuras" },
      { label: "Invitaciones digitales", href: "/productos/invitaciones-digitales" },
      { label: "Sectores Premium", href: "/productos/premium" },
      { label: "Decoración Personalizada", href: "/productos/decoracion-personalizada" },
    ],
  },
  { label: "Experiencias y Fotos", href: "/experiencias", section: "bottom" },
  { label: "Contacto", href: "/contacto", section: "bottom" },
]
