import type { ReactNode } from "react"

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="bochi-crosshatch relative flex min-h-screen flex-col overflow-hidden">
      {children}
    </div>
  )
}
