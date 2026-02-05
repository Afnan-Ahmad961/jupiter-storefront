"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col gap-y-8 w-full max-w-4xl mx-auto py-10">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-900">
          Order Details
        </h1>
        <LocalizedClientLink
          href="/account/orders"
          className="text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all"
          data-testid="back-to-overview-button"
        >
          Back to overview
        </LocalizedClientLink>
      </div>

      <div
        className="flex flex-col gap-8 w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
          <ShippingDetails order={order} />
          <OrderSummary order={order} />
        </div>
        {/* <Help /> */}
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
