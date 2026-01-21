import Link from "next/link"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SOCIAL_LINKS } from "@/lib/constants"

interface InstagramButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function InstagramButton({ variant = "outline", size = "default", className }: InstagramButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
        <Instagram className="mr-2 h-5 w-5" />
        Síguenos en Instagram
      </Link>
    </Button>
  )
}
