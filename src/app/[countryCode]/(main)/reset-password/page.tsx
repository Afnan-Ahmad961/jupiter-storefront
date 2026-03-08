"use client"

import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { resetPassword } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect } from "react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const [message, formAction] = useActionState(resetPassword, null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (message === undefined) {
      setSuccess(true)
    }
  }, [message])

  if (!token || !email) {
    return (
      <div className="w-full flex justify-center px-8 py-8">
        <div className="max-w-sm w-full flex flex-col items-center">
          <h1 className="text-large-semi uppercase mb-6">Invalid link</h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            This password reset link is invalid or has expired. Please request
            a new one.
          </p>
          <LocalizedClientLink
            href="/forgot-password"
            className="underline text-ui-fg-base"
          >
            Request a new reset link
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full flex justify-center px-8 py-8">
        <div className="max-w-sm w-full flex flex-col items-center">
          <h1 className="text-large-semi uppercase mb-6">
            Password updated
          </h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <LocalizedClientLink
            href="/account"
            className="underline text-ui-fg-base"
          >
            Sign in
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center px-8 py-8">
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="text-large-semi uppercase mb-6">Reset password</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-8">
          Enter your new password below.
        </p>
        <form className="w-full" action={formAction}>
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="email" value={email} />
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="New password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              data-testid="new-password-input"
            />
            <Input
              label="Confirm password"
              name="confirm_password"
              type="password"
              required
              autoComplete="new-password"
              data-testid="confirm-password-input"
            />
          </div>
          <ErrorMessage error={message} data-testid="reset-password-error" />
          <SubmitButton
            className="w-full mt-6"
            data-testid="reset-password-button"
          >
            Reset password
          </SubmitButton>
        </form>
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          <LocalizedClientLink
            href="/account"
            className="underline"
          >
            Back to sign in
          </LocalizedClientLink>
        </span>
      </div>
    </div>
  )
}
