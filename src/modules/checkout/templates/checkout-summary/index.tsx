import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-12 px-6 small:px-12 h-screen overflow-y-auto">
      <div className="w-full flex flex-col">
        <Heading
          level="h2"
          className="flex flex-row text-2xl-regular items-baseline mb-6"
        >
          Order Summary
        </Heading>
        <div className="flex flex-col gap-y-4">
          <CartTotals totals={cart} />
          <Divider className="my-2" />
          <ItemsPreviewTemplate cart={cart} />
          <Divider className="my-2" />
          <div className="py-2">
            <DiscountCode cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
