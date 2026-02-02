import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-base font-bold uppercase tracking-widest text-gray-900 border-b border-gray-200 pb-2">
        Delivery
      </h2>
      <div className="flex flex-col gap-8">
        <div
          className="flex flex-col gap-2"
          data-testid="shipping-address-summary"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Shipping Address
          </span>
          <div className="flex flex-col text-sm text-gray-900">
            <span>
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </span>
            <span>
              {order.shipping_address?.address_1}{" "}
              {order.shipping_address?.address_2}
            </span>
            <span>
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}
            </span>
            <span>
              {order.shipping_address?.country_code?.toUpperCase()}
            </span>
          </div>
        </div>

        <div
          className="flex flex-col gap-2"
          data-testid="shipping-contact-summary"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Contact
          </span>
          <div className="flex flex-col text-sm text-gray-900">
            <span>{order.shipping_address?.phone}</span>
            <span>{order.email}</span>
          </div>
        </div>

        <div
          className="flex flex-col gap-2"
          data-testid="shipping-method-summary"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Method
          </span>
          <div className="text-sm text-gray-900">
            <span>
              {(order as any).shipping_methods[0]?.name} (
              {convertToLocale({
                amount: order.shipping_methods?.[0].total ?? 0,
                currency_code: order.currency_code,
              })}
              )
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
