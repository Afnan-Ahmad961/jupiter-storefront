import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "Newsletter <onboarding@resend.dev>",
    to: process.env.FORM_EMAIL!,
    subject: "New Newsletter Subscription",
    html: `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${email}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
