"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileDrawerMenu } from "./mobile-drawer-menu"
import { navigationItems } from "@/data/navigation"


export function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            {/* TODO: Replace with actual logo */}
            <span className="font-serif text-2xl font-bold text-gray-900">BÔCHI</span>
          </Link>

          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)} aria-label="Abrir menú">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <MobileDrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
