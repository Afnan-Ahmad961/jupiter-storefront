import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { orderNumber, email, phone, reason } = await req.json()

  if (!orderNumber || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "Returns <onboarding@resend.dev>",
    to: process.env.FORM_EMAIL!,
    subject: `Return Request – Order #${orderNumber}`,
    html: `
      <h2>New Return Request</h2>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Reason:</strong> ${reason || "Not provided"}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
