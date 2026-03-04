"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

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
      e.currentTarget.reset()
    } else {
      setStatus("error")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-b border-gray-300 focus-within:border-black transition-colors py-2 max-w-xs"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="ENTER YOUR EMAIL"
          className="bg-transparent w-full outline-none text-xs uppercase tracking-wider placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="ml-2 hover:opacity-70 transition-opacity disabled:opacity-40"
        >
          <ArrowRight size={16} />
        </button>
      </form>

      {status === "success" && (
        <p className="text-xs text-emerald-600 tracking-wide">Thank you for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-xs text-rose-500 tracking-wide">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}
