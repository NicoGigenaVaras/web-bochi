import Image from "next/image"

const LINKEDIN_URL = "https://www.linkedin.com/in/nicolasgigenavaras/"

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <p className="text-sm text-neutral-700">
          © {new Date().getFullYear()} BÔCHI Eventos. Todos los derechos reservados.
        </p>

        <p className="mt-2 text-sm text-neutral-800">
          - Detalles que transforman -
        </p>

        <div className="mx-auto mt-5 h-px max-w-[260px] bg-black/10" />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs text-neutral-500">
            Sitio desarrollado por
          </span>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver perfil de LinkedIn de MAP Soluciones Informáticas"
            className="group inline-flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-neutral-50"
          >
            <Image
              src="/brand/map-soluciones-informaticas.png"
              alt="MAP Soluciones Informáticas"
              width={42}
              height={42}
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <span className="text-xs font-medium text-neutral-800 underline-offset-4 transition group-hover:underline">
              Soluciones Informáticas
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
