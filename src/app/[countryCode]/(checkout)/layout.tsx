import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen flex flex-col">
      <div className="h-20 bg-white border-b border-gray-100 flex-shrink-0">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/"
            className="text-2xl text-ui-fg-base uppercase tracking-widest"
            data-testid="store-link"
          >
            JUPITER
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase text-gray-500 hover:text-black transition-colors"
            data-testid="back-to-cart-link"
          >
            <span className="hidden small:block txt-compact-plus hover:text-ui-fg-base ">
              Back to Store
            </span>
          </LocalizedClientLink>
        </nav>
      </div>
      <div className="relative flex-1" data-testid="checkout-container">{children}</div>
    </div>
  )
}
