import { Metadata } from "next"
import ContactTemplate from "@modules/contact/templates"

export const metadata: Metadata = {
  title: "Contact & FAQ",
  description: "Get support, frequently asked questions, and contact information.",
}

export default function ContactPage() {
  return <ContactTemplate />
}
