import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
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
    .replace(/\//g, "&#47;")
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
    body = newsletterSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "Newsletter <onboarding@resend.dev>",
    to: process.env.FORM_EMAIL!,
    subject: "New Newsletter Subscription",
    html: `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
