import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  // ✅ mientras estés probando con "Execute workflow"
  const N8N_URL = "http://localhost:5678/webhook-test/bochi-nick"

  const r = await fetch(N8N_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  })

  // Si n8n devuelve JSON, lo parseamos como JSON.
  // (esto evita re-codificaciones raras de text())
  const data = await r.json().catch(async () => {
    const raw = await r.text()
    throw new Error(`Invalid JSON from n8n: ${raw}`)
  })

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
