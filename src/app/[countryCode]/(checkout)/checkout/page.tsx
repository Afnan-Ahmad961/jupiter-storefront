import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_450px] min-h-screen">
      <div className="flex flex-col items-center py-12 px-6 small:px-12 w-full">
        <div className="max-w-[800px] w-full">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
        </div>
      </div>
      <div className="bg-gray-50 border-l border-gray-200 hidden small:block">
        <CheckoutSummary cart={cart} />
      </div>
      <div className="small:hidden bg-gray-50 border-t border-gray-200 px-6 py-12">
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  )
}
