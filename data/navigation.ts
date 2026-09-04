export type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
  section?: "top" | "bottom"
}

export const navigationItems: NavigationItem[] = [
  {
    label: "¿Quiénes somos?",
    href: "/quienes-somos",
    section: "top",
  },
  {
    label: "Productos y Servicios",
    href: "/productos",
    section: "top",
    children: [
      { label: "Shinny Balls", href: "/productos#shinny-balls" },
      { label: "Shimmer Wall", href: "/productos#shimmer-wall" },
      { label: "Barras móviles", href: "/productos#barras-moviles" },
      { label: "Livings", href: "/productos#livings" },
      { label: "Mesas", href: "/productos#mesas" },
      { label: "Estructuras", href: "/productos#estructuras" },
      { label: "Invitaciones digitales", href: "/productos#invitaciones-digitales" },
      { label: "Sectores Premium", href: "/productos#premium" },
      { label: "Decoración Personalizada", href: "/productos#decoracion-personalizada" },
    ],
  },
  {
    label: "Salón Centro Social, Cultural y Deportivo Las Flores — Ingresá",
    href: "/centro-social-cultural-deportivo-las-flores",
    section: "top",
  },
  {
    label: "Experiencias y Fotos",
    href: "/experiencias",
    section: "bottom",
  },
  {
    label: "Contacto",
    href: "/contacto",
    section: "bottom",
  },
]



