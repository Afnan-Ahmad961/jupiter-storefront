import ItemsTemplate from "./items"
import Summary from "./summary"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"
import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import InteractiveLink from "@modules/common/components/interactive-link"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
            <div className="flex flex-col bg-white py-6 gap-y-6">
              {!customer && (
                <>
                  <div className="bg-white flex items-center justify-between">
                    <div>
                      <Heading level="h2" className="txt-xlarge">
                        Already have an account?
                      </Heading>
                      <Text className="txt-medium text-ui-fg-subtle mt-2">
                        Sign in for a better experience.
                      </Text>
                    </div>
                    <div>
                      <LocalizedClientLink href="/account">
                        <Button
                          variant="secondary"
                          className="h-10"
                          data-testid="sign-in-button"
                        >
                          Sign in
                        </Button>
                      </LocalizedClientLink>
                    </div>
                  </div>
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="bg-white py-6">
                      <Summary cart={cart as any} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="py-48 px-2 flex flex-col justify-center items-start"
              data-testid="empty-cart-message"
            >
              <Heading
                level="h1"
                className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
              >
                Cart
              </Heading>
              <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
                You don&apos;t have anything in your cart. Let&apos;s change
                that, use the link below to start browsing our products.
              </Text>
              <div>
                <InteractiveLink href="/store">Explore products</InteractiveLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
