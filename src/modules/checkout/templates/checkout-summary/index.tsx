import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-12 px-6 small:px-12 h-screen overflow-y-auto bg-gray-50 border-l border-gray-200">
      <div className="w-full flex flex-col">
        <div className="flex flex-col gap-y-4">
          <ItemsPreviewTemplate cart={cart} />
          <Divider className="my-6 border-gray-200" />
          <div className="pb-4">
            <DiscountCode cart={cart} />
          </div>
          <Divider className="my-4 border-gray-200" />
          <CartTotals totals={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
