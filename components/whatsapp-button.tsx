import type React from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SOCIAL_LINKS } from "@/lib/constants"

interface WhatsAppButtonProps {
  message?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({
  message,
  variant = "default",
  size = "default",
  className,
  children = "Cotizar por WhatsApp",
}: WhatsAppButtonProps) {
  const encodedMessage = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hola! Quisiera cotizar un servicio/producto de Eventos Bochi.")
  const whatsappUrl = `${SOCIAL_LINKS.whatsapp}?text=${encodedMessage}`

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-5 w-5" />
        {children}
      </Link>
    </Button>
  )
}
