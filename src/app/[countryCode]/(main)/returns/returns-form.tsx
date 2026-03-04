"use client"

import { useState } from "react"

export default function ReturnsForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const data = {
      orderNumber: (form.elements.namedItem("orderNumber") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      reason: (form.elements.namedItem("reason") as HTMLTextAreaElement).value,
    }

    const res = await fetch("/api/returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setStatus("success")
      form.reset()
    } else {
      const json = await res.json()
      setErrorMsg(json.error || "Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-700">
          Order Number <span className="text-rose-500">*</span>
        </label>
        <input
          name="orderNumber"
          type="text"
          required
          placeholder="e.g. 100123"
          className="border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors hover:bg-gray-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-700">
          Email <span className="text-rose-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors hover:bg-gray-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-700">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="+92 300 0000000"
          className="border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors hover:bg-gray-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-700">
          Reason <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          name="reason"
          rows={4}
          placeholder="Please describe the reason for your return..."
          className="border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors hover:bg-gray-50 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-rose-500">{errorMsg}</p>
      )}

      {status === "success" && (
        <p className="text-sm text-emerald-600">
          Your return request has been submitted. We will get back to you shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-black text-white text-xs font-semibold uppercase tracking-widest py-4 rounded hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Submitting..." : "Submit Return Request"}
      </button>
    </form>
  )
}
