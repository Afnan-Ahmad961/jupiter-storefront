"use client"

import { useState } from "react"
import { requestPasswordReset } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (formData: FormData) => {
    const emailValue = formData.get("email") as string
    setEmail(emailValue)

    try {
      await requestPasswordReset(emailValue)
    } catch {
      // Always show success to prevent email enumeration
    }

    setSubmitted(true)
  }

  return (
    <div className="w-full flex justify-center px-8 py-8">
      <div className="max-w-sm w-full flex flex-col items-center">
        {!submitted ? (
          <>
            <h1 className="text-large-semi uppercase mb-6">
              Forgot password?
            </h1>
            <p className="text-center text-base-regular text-ui-fg-base mb-8">
              Enter the email address associated with your account and
              we&apos;ll send you a link to reset your password.
            </p>
            <form className="w-full" action={handleSubmit}>
              <div className="flex flex-col w-full gap-y-2">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  data-testid="forgot-password-email-input"
                />
              </div>
              <SubmitButton
                className="w-full mt-6"
                data-testid="forgot-password-button"
              >
                Send reset link
              </SubmitButton>
            </form>
            <span className="text-center text-ui-fg-base text-small-regular mt-6">
              Remember your password?{" "}
              <LocalizedClientLink
                href="/account"
                className="underline"
              >
                Sign in
              </LocalizedClientLink>
            </span>
          </>
        ) : (
          <>
            <h1 className="text-large-semi uppercase mb-6">
              Check your email
            </h1>
            <p className="text-center text-base-regular text-ui-fg-base mb-4">
              If an account exists for <strong>{email}</strong>, we&apos;ve
              sent a password reset link. The link will expire in 10 minutes.
            </p>
            <p className="text-center text-small-regular text-ui-fg-muted mb-8">
              Didn&apos;t receive the email? Check your spam folder or try
              again.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="underline text-ui-fg-base text-small-regular"
            >
              Try another email
            </button>
            <span className="text-center text-ui-fg-base text-small-regular mt-4">
              <LocalizedClientLink
                href="/account"
                className="underline"
              >
                Back to sign in
              </LocalizedClientLink>
            </span>
          </>
        )}
      </div>
    </div>
  )
}
