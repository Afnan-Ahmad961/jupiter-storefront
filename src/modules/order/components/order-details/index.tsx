import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start text-sm">
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-gray-500">
          Order Number
        </span>
        <span className="font-medium text-gray-900" data-testid="order-id">
          #{order.display_id}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-gray-500">
          Order Date
        </span>
        <span className="font-medium text-gray-900" data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-gray-500">
          Email
        </span>
        <span className="font-medium text-gray-900 truncate max-w-[200px]" data-testid="order-email">
          {order.email}
        </span>
      </div>

      {showStatus && (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Order Status
            </span>
            <span className="font-medium text-gray-900" data-testid="order-status">
              {formatStatus(order.fulfillment_status)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Payment Status
            </span>
            <span className="font-medium text-gray-900" data-testid="order-payment-status">
              {formatStatus(order.payment_status)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderDetails
