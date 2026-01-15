"use client"

import { useState } from "react"
import { useActionState } from "react"

import { signup } from "@lib/data/customer"
import { login } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")
  const [loginMessage, loginAction] = useActionState(login, null)
  const [registerMessage, registerAction] = useActionState(signup, null)

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <div
          className="max-w-sm w-full flex flex-col items-center"
          data-testid="login-page"
        >
          <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            Sign in to access an enhanced shopping experience.
          </p>
          <form className="w-full" action={loginAction}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                data-testid="email-input"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                data-testid="password-input"
              />
            </div>
            <ErrorMessage
              error={loginMessage}
              data-testid="login-error-message"
            />
            <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
              Sign in
            </SubmitButton>
          </form>
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            Not a member?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="underline"
              data-testid="register-button"
            >
              Join us
            </button>
            .
          </span>
        </div>
      ) : (
        <div
          className="max-w-sm flex flex-col items-center"
          data-testid="register-page"
        >
          <h1 className="text-large-semi uppercase mb-6">
            Become a Medusa Store Member
          </h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-4">
            Create your Medusa Store Member profile, and get access to an
            enhanced shopping experience.
          </p>
          <form className="w-full flex flex-col" action={registerAction}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="First name"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
              />
              <Input
                label="Last name"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
              />
              <Input
                label="Email"
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
              />
              <Input
                label="Password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
                data-testid="password-input"
              />
            </div>
            <ErrorMessage error={registerMessage} data-testid="register-error" />
            <span className="text-center text-ui-fg-base text-small-regular mt-6">
              By creating an account, you agree to Medusa Store&apos;s{" "}
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="underline"
              >
                Privacy Policy
              </LocalizedClientLink>{" "}
              and{" "}
              <LocalizedClientLink
                href="/content/terms-of-use"
                className="underline"
              >
                Terms of Use
              </LocalizedClientLink>
              .
            </span>
            <SubmitButton
              className="w-full mt-6"
              data-testid="register-button"
            >
              Join
            </SubmitButton>
          </form>
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            Already a member?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="underline"
            >
              Sign in
            </button>
            .
          </span>
        </div>
      )}
    </div>
  )
}

export default LoginTemplate
