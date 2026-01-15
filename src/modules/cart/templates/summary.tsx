"use client"

import { Button, Heading, Input, Label, Text, Badge } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const { promotions = [] } = cart

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code")
    if (!code) {
      return
    }
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <div className="w-full bg-white flex flex-col">
        <div className="txt-medium">
          <form action={addPromotionCode} className="w-full mb-5">
            <Label className="flex gap-x-1 my-2 items-center">
              <button
                type="button"
                className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                data-testid="add-discount-button"
              >
                Add Promotion Code(s)
              </button>
            </Label>

            <>
              <div className="flex w-full gap-x-2">
                <Input
                  className="size-full"
                  id="promotion-input"
                  name="code"
                  type="text"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  data-testid="discount-apply-button"
                >
                  Apply
                </Button>
              </div>
              <ErrorMessage error="" data-testid="discount-error-message" />
            </>
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
                        <span
                          className="truncate"
                          data-testid="discount-code"
                        >
                          <Badge
                            color={promotion.is_automatic ? "green" : "grey"}
                            size="small"
                          >
                            {promotion.code}
                          </Badge>{" "}
                          ({promotion.application_method?.value !==
                            undefined &&
                            promotion.application_method.currency_code !==
                              undefined && (
                              <>
                                {promotion.application_method.type ===
                                "percentage"
                                  ? `${promotion.application_method.value}%`
                                  : convertToLocale({
                                      amount:
                                        +promotion.application_method.value,
                                      currency_code:
                                        promotion.application_method
                                          .currency_code,
                                    })}
                              </>
                            )})
                        </span>
                      </Text>
                      {!promotion.is_automatic && (
                        <button
                          className="flex items-center"
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
      <Divider />
      <div>
        <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
          <div className="flex items-center justify-between">
            <span>Subtotal (excl. shipping and taxes)</span>
            <span
              data-testid="cart-subtotal"
              data-value={cart.item_subtotal || 0}
            >
              {convertToLocale({
                amount: cart.item_subtotal ?? 0,
                currency_code: cart.currency_code,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span
              data-testid="cart-shipping"
              data-value={cart.shipping_subtotal || 0}
            >
              {convertToLocale({
                amount: cart.shipping_subtotal ?? 0,
                currency_code: cart.currency_code,
              })}
            </span>
          </div>
          {!!cart.discount_subtotal && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span
                className="text-ui-fg-interactive"
                data-testid="cart-discount"
                data-value={cart.discount_subtotal || 0}
              >
                -{" "}
                {convertToLocale({
                  amount: cart.discount_subtotal ?? 0,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="flex gap-x-1 items-center ">Taxes</span>
            <span
              data-testid="cart-taxes"
              data-value={cart.tax_total || 0}
            >
              {convertToLocale({
                amount: cart.tax_total ?? 0,
                currency_code: cart.currency_code,
              })}
            </span>
          </div>
        </div>
        <div className="h-px w-full border-b border-gray-200 my-4" />
        <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
          <span>Total</span>
          <span
            className="txt-xlarge-plus"
            data-testid="cart-total"
            data-value={cart.total || 0}
          >
            {convertToLocale({
              amount: cart.total ?? 0,
              currency_code: cart.currency_code,
            })}
          </span>
        </div>
        <div className="h-px w-full border-b border-gray-200 mt-4" />
      </div>
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Go to checkout</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
