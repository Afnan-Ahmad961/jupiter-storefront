"use client"

import { useProgressBar } from "@lib/context/progress-bar-context"
import { Button } from "@medusajs/ui"
import React, { useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()
  const { start: startProgress, done: doneProgress } = useProgressBar()
  const wasPending = useRef(false)

  useEffect(() => {
    if (pending && !wasPending.current) {
      startProgress()
    } else if (!pending && wasPending.current) {
      doneProgress()
    }
    wasPending.current = pending
  }, [pending, startProgress, doneProgress])

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
