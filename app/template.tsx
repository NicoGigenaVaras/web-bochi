"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { PageTransitionLoader } from "@/components/page-transition-loader"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      setIsLoading(true)

      // Show loader for 700ms
      const timer = setTimeout(() => {
        setIsLoading(false)
        setPrevPathname(pathname)
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [pathname, prevPathname])

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <PageTransitionLoader variant="logo" />}</AnimatePresence>
      {children}
    </>
  )
}
