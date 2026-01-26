"use client"

import { useEffect, useMemo, useState } from "react"
import { X, Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

type ChatMsg = {
  role: "user" | "assistant"
  text: string
  ts: number
}

// =========================
// ✅ CONFIG (EDITABLE)
// =========================
const ASSISTANT_NAME = "Nick"
const ASSISTANT_SUBTITLE = "Consultas rápidas"
const BUBBLE_HINT = "¿Tienes alguna duda?"
const N8N_WEBHOOK_TEST_URL = "http://localhost:5678/webhook-test/bochi-nick"

const GREETING_MESSAGE =
  "Hola! Soy Nick 🤖✨\nTu asistente virtual.\nConsultame lo que necesites."

const INPUT_PLACEHOLDER = "Escribí tu consulta…"
const HUMAN_CTA_TEXT = "Hablar con una persona"

const DEFAULT_WA_PREFILL =
  "Hola! Vengo desde la web de Eventos Bochi 🙌\nQuiero hablar con una persona."

// Guardado local del chat
const STORAGE_KEY = "bochi_nick_chat_v2"

// ✅ Link base a tu WhatsApp (recomendado por .env.local)
// Ej: NEXT_PUBLIC_WHATSAPP_LINK="https://wa.me/5493517570278"
const DEFAULT_WA_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/5493517570278"

// Colores de WhatsApp
const WHATSAPP_GREEN = "#25D366"
const WHATSAPP_DARK = "#128C7E"

function buildWhatsAppLink(baseLink: string, text: string) {
  const encoded = encodeURIComponent(text)
  return `${baseLink}?text=${encoded}`
}

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit" })
  } catch {
    return ""
  }
}

// Resumen simple (placeholder). Luego lo reemplazamos por n8n+Gemini.
function makeSummary(messages: ChatMsg[]) {
  const userMsgs = messages.filter((m) => m.role === "user").map((m) => m.text)
  if (userMsgs.length === 0) return "El cliente aún no escribió consultas."

  const last = userMsgs.slice(-3).map((t) => `- ${t}`).join("\n")
  return `Últimas consultas:\n${last}`
}

// ✅ Ícono WhatsApp (SVG) para no depender de librerías
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.43c-.26-.13-1.54-.76-1.78-.85-.24-.09-.42-.13-.6.13-.18.26-.69.85-.85 1.02-.16.18-.31.2-.57.07-.26-.13-1.1-.4-2.09-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.11-.11.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.46-.16 0-.33-.02-.51-.02-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.73.13.18 1.85 2.83 4.47 3.97.62.27 1.11.43 1.49.55.63.2 1.21.17 1.67.1.51-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31Z"
      />
      <path
        fill="currentColor"
        d="M16 3C9.37 3 4 8.37 4 15c0 2.11.55 4.16 1.6 5.97L4 29l8.2-1.56A11.9 11.9 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3Zm0 21.8c-1.92 0-3.78-.52-5.37-1.51l-.38-.23-4.86.93.95-4.73-.25-.39A9.82 9.82 0 0 1 6.2 15c0-5.41 4.39-9.8 9.8-9.8 5.41 0 9.8 4.39 9.8 9.8 0 5.41-4.39 9.8-9.8 9.8Z"
      />
    </svg>
  )
}

export function WhatsAppFloating() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMsg[]>([])

  const chatTitle = useMemo(
    () => `${ASSISTANT_NAME} • Asistente Virtual`,
    []
  )

  // Init + cargar chat guardado
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setMessages(JSON.parse(raw))
      else setMessages([{ role: "assistant", text: GREETING_MESSAGE, ts: Date.now() }])
    } catch {
      setMessages([{ role: "assistant", text: GREETING_MESSAGE, ts: Date.now() }])
    }
  }, [])

  // Persistir chat
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // noop
    }
  }, [messages])

  const canSend = input.trim().length > 0

    async function sendUserMessage() {
  const text = input.trim()
  if (!text) return

  const now = Date.now()

  // 1) Mostrar mensaje del usuario + "escribiendo"
  const loading: ChatMsg = {
    role: "assistant",
    text: "Escribiendo…",
    ts: now + 1,
  }

  setMessages((prev) => [...prev, { role: "user", text, ts: now }, loading])
  setInput("")

  try {
    // 2) Llamar a tu API Next (proxy a n8n) → evita CORS
    const res = await fetch("/api/nick", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "web-local",
        message: text,
      }),
    })

    if (!res.ok) throw new Error("Nick API error")

    const data = (await res.json()) as { reply?: string; handoff?: boolean }

    const replyText = data?.reply ?? "Perdón, no pude responder en este momento."

    // 3) Reemplazar el loading por la respuesta real
    setMessages((prev) => {
      const trimmed = prev.slice(0, -1) // saca "Escribiendo…"
      return [...trimmed, { role: "assistant", text: replyText, ts: Date.now() }]
    })
  } catch (err) {
    setMessages((prev) => {
      const trimmed = prev.slice(0, -1)
      return [
        ...trimmed,
        {
          role: "assistant",
          text: "Ups 😅 Ahora mismo no puedo conectarme. Probá nuevamente.",
          ts: Date.now(),
        },
      ]
    })
  }
}



  function clearChat() {
    const initial: ChatMsg[] = [{ role: "assistant", text: GREETING_MESSAGE, ts: Date.now() }]
    setMessages(initial)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
    } catch {}
  }

  function handoffToHuman() {
    const summary = makeSummary(messages)
    const transcript = messages
      .slice(-12)
      .map((m) => `${m.role === "user" ? "Cliente" : ASSISTANT_NAME}: ${m.text}`)
      .join("\n\n")

    const finalText =
      `${DEFAULT_WA_PREFILL}\n\n` +
      `📌 Resumen:\n${summary}\n\n` +
      `🗨️ Últimos mensajes:\n${transcript}`

    const link = buildWhatsAppLink(DEFAULT_WA_LINK, finalText)
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className="fixed right-4 z-[60] flex flex-col items-end gap-2"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
      }}
    >
      {/* Ventana del chat */}
      {open && (
        <div className="w-[92vw] max-w-[420px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div
            className="flex items-center justify-between gap-3 px-3 py-3 text-white"
            style={{
              background: `linear-gradient(135deg, ${WHATSAPP_DARK}, ${WHATSAPP_GREEN})`,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">{chatTitle}</p>
                <p className="text-xs text-white/85">{ASSISTANT_SUBTITLE}</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 hover:bg-white/15"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="max-h-[420px] space-y-2 overflow-auto bg-gray-50 p-3">
            {messages.map((m, idx) => {
              const isUser = m.role === "user"
              return (
                <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      isUser ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 pb-1 text-xs opacity-70">
                      {isUser ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      <span>{isUser ? "Vos" : ASSISTANT_NAME}</span>
                      <span>•</span>
                      <span>{formatTime(m.ts)}</span>
                    </div>
                    <div className="whitespace-pre-line">{m.text}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Acciones + input */}
          <div className="grid gap-2 border-t border-gray-200 bg-white p-3">
            <div className="flex gap-2">
              <Button
                className="w-full rounded-xl"
                onClick={handoffToHuman}
                style={{ backgroundColor: WHATSAPP_GREEN }}
              >
                {HUMAN_CTA_TEXT}
              </Button>
              <Button variant="outline" onClick={clearChat} className="rounded-xl">
                Limpiar
              </Button>
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendUserMessage()
                }}
                placeholder={INPUT_PLACEHOLDER}
                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              />
              <Button
                size="icon"
                onClick={sendUserMessage}
                disabled={!canSend}
                aria-label="Enviar"
                className="rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <div className="flex items-center gap-2">
        {!open && (
          <div className="hidden rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-900 shadow-md sm:block">
            {BUBBLE_HINT}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="WhatsApp"
          className={[
            "relative grid h-14 w-14 place-items-center rounded-full shadow-xl",
            !open ? "bochi-wa-pulse" : "",
          ].join(" ")}
          style={{ backgroundColor: WHATSAPP_GREEN }}
        >
          <WhatsAppIcon className="h-7 w-7 text-white" />
        </button>
      </div>
    </div>
  )
}
