"use client"

// =====================================================
// components/mobile-drawer-menu.tsx
// Menú lateral responsive
// - Separa items por section: "top" y "bottom"
// - Productos y Servicios incluye children (subitems)
// =====================================================

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navigationItems, type NavigationItem } from "@/data/navigation"
import { useMemo, useState } from "react"

interface MobileDrawerMenuProps {
  open: boolean
  onClose: () => void
}

function MenuItem({
  item,
  onClose,
  level = 0,
}: {
  item: NavigationItem
  onClose: () => void
  level?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
        style={{ paddingLeft: `${1 + level * 1}rem` }}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
        style={{ paddingLeft: `${1 + level * 1}rem` }}
      >
        {item.label}
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children?.map((child) => (
              <MenuItem key={child.href} item={child} onClose={onClose} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MobileDrawerMenu({ open, onClose }: MobileDrawerMenuProps) {
  // Separamos navegación superior e inferior
  const { topItems, bottomItems } = useMemo(() => {
    const topItems = navigationItems.filter((i) => i.section !== "bottom")
    const bottomItems = navigationItems.filter((i) => i.section === "bottom")
    return { topItems, bottomItems }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-[85vw] max-w-sm overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <span className="font-serif text-xl font-bold">Menú</span>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar menú">
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* TOP */}
            <nav className="space-y-1 p-4">
              {topItems.map((item) => (
                <MenuItem key={item.href} item={item} onClose={onClose} />
              ))}
            </nav>

            {/* Separador grande */}
            <div className="px-4 py-6">
              <div className="h-px bg-gray-200" />
            </div>

            {/* BOTTOM */}
            <nav className="space-y-1 px-4 pb-6">
              {bottomItems.map((item) => (
                <MenuItem key={item.href} item={item} onClose={onClose} />
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
