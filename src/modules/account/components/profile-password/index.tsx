"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

const ProfilePassword = () => {
  return (
    <div className="text-small-regular" data-testid="account-password-editor">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="uppercase text-ui-fg-base">Password</span>
          <div className="flex items-center flex-1 basis-0 justify-end gap-x-4">
            <span>The password is not shown for security reasons</span>
          </div>
        </div>
        <div>
          <LocalizedClientLink href="/forgot-password">
            <Button
              variant="secondary"
              className="w-[100px] min-h-[25px] py-1"
              type="button"
              data-testid="reset-password-link"
            >
              Reset
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default ProfilePassword
