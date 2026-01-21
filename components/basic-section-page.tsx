import type { ReactNode } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"

type BasicSectionPageProps = {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function BasicSectionPage({ title, subtitle, children }: BasicSectionPageProps) {
  return (
    <PageWrapper>
      <AppHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
        <section className="w-full max-w-4xl">
          <Card className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <h1 className="font-serif text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>

              {subtitle ? <p className="mt-3 text-base text-gray-600 sm:text-lg">{subtitle}</p> : null}

              {children ? <div className="mt-10">{children}</div> : null}
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  )
}
