"use client"

import { Badge, Heading, Input, Label, Text } from "@medusajs/ui"
import React from "react"

import { applyPromotions, setShippingMethod } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"
import { toastError, toastSuccess } from "@lib/util/toast"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart

  const revalidateShipping = async () => {
    const selectedOptionId = cart.shipping_methods?.[0]?.shipping_option_id
    if (!selectedOptionId) return
    await setShippingMethod({ cartId: cart.id, shippingMethodId: selectedOptionId })
  }
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    try {
      await applyPromotions(
        validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
      )

      try {
        await revalidateShipping()
      } catch {
        // Shipping re-evaluation failure should not affect the promo removal UX
      }
    } catch {
      toastError("Couldn't remove promo code. Please try again.")
    }
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
      toastSuccess("Promo code applied!")

      try {
        await revalidateShipping()
      } catch {
        // Shipping re-evaluation failure should not affect the promo success UX
      }
    } catch (e: any) {
      setErrorMessage("Invalid or expired promo code.")
      toastError("Invalid or expired promo code.")
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="txt-medium">
        <form action={(a) => addPromotionCode(a)} className="w-full mb-5">
          <div className="flex flex-col gap-y-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors duration-200 py-2 flex items-center gap-x-2"
              data-testid="add-discount-button"
            >
              Add Promotion Code(s)
            </button>

            {isOpen && (
              <>
                <div className="flex w-full gap-x-2">
                  <Input
                    className="size-full bg-white border border-gray-200 rounded h-11 px-4 focus:border-black focus:outline-none transition-all duration-200"
                    id="promotion-input"
                    name="code"
                    type="text"
                    autoFocus={false}
                    data-testid="discount-input"
                    placeholder="Enter code"
                  />
                  <SubmitButton
                    variant="secondary"
                    className="h-11 px-6 min-w-[80px]"
                    data-testid="discount-apply-button"
                  >
                    Apply
                  </SubmitButton>
                </div>

                <ErrorMessage
                  error={errorMessage}
                  data-testid="discount-error-message"
                />
              </>
            )}
          </div>
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center">
            <div className="flex flex-col w-full">
              <Heading className="txt-medium mb-2">
                Promotion(s) applied:
              </Heading>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="flex items-center justify-between w-full max-w-full mb-2"
                    data-testid="discount-row"
                  >
                    <Text className="flex gap-x-1 items-baseline txt-small-plus w-4/5 pr-1">
                      <span className="truncate" data-testid="discount-code">
                        <Badge
                          color={promotion.is_automatic ? "green" : "grey"}
                          size="small"
                        >
                          {promotion.code}
                        </Badge>{" "}
                        (
                        {promotion.application_method?.value !== undefined &&
                          promotion.application_method.currency_code !==
                          undefined && (
                            <>
                              {promotion.application_method.type ===
                                "percentage"
                                ? `${promotion.application_method.value}%`
                                : convertToLocale({
                                  amount: +promotion.application_method.value,
                                  currency_code:
                                    promotion.application_method
                                      .currency_code,
                                })}
                            </>
                          )}
                        )
                        {/* {promotion.is_automatic && (
                          <Tooltip content="This promotion is automatically applied">
                            <InformationCircleSolid className="inline text-zinc-400" />
                          </Tooltip>
                        )} */}
                      </span>
                    </Text>
                    {!promotion.is_automatic && (
                      <button
                        className="flex items-center"
                        onClick={() => {
                          if (!promotion.code) {
                            return
                          }

                          removePromotionCode(promotion.code)
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={14} />
                        <span className="sr-only">
                          Remove discount code from order
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
