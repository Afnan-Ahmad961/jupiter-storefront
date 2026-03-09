"use client"

import { useProgressBar } from "@lib/context/progress-bar-context"
import { usePathname } from "next/navigation"

export default function ProgressBar() {
  const { progress, isActive, isFinishing } = useProgressBar()
  const pathname = usePathname()

  const isCheckout = pathname.includes("/checkout")
  const topOffset = isCheckout ? "top-20" : "top-16"

  if (!isActive && !isFinishing) return null

  return (
    <div className={`fixed ${topOffset} left-0 right-0 z-[60] h-[2px] pointer-events-none`}>
      <div
        className="h-full bg-[#e9b321] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: isFinishing ? 0 : 1,
          transition: "width 300ms ease, opacity 200ms ease 100ms",
          boxShadow: "0 0 8px #e9b321, 0 0 2px #e9b321",
        }}
      />
    </div>
  )
}
