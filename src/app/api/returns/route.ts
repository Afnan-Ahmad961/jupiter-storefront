import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const returnsSchema = z.object({
  orderNumber: z.string().min(1).max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(1).max(50),
  reason: z.string().max(1000).optional(),
})

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()
  const rateLimit = rateLimitMap.get(ip)

  if (rateLimit && rateLimit.resetAt > now) {
    if (rateLimit.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }
    rateLimit.count++
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
  }

  let body
  try {
    body = returnsSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: "Invalid input. Please check your fields." }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "Returns <onboarding@resend.dev>",
    to: process.env.FORM_EMAIL!,
    subject: `Return Request – Order #${escapeHtml(body.orderNumber)}`,
    html: `
      <h2>New Return Request</h2>
      <p><strong>Order Number:</strong> ${escapeHtml(body.orderNumber)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(body.reason || "Not provided")}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
