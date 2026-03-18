"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { toastError, toastSuccess } from "@lib/util/toast"

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setStatus("success")
      toastSuccess("You're subscribed! Welcome to Jupiter.")
      e.currentTarget.reset()
    } else {
      setStatus("error")
      toastError("Couldn't subscribe. Please try again.")
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border border-white hover:border-white focus-within:border-white transition-colors duration-200"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="bg-transparent flex-1 px-4 py-3 outline-none text-sm text-white placeholder:text-gray-200 min-w-0"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-3 text-white hover:text-gray-300 transition-colors disabled:opacity-40"
          aria-label="Subscribe"
        >
          <ArrowRight size={16} />
        </button>
      </form>

      {status === "success" && (
        <p className="text-xs text-emerald-400 tracking-wide">Thank you for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-xs text-rose-400 tracking-wide">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}
