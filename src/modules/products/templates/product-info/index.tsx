import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-2 border-b border-gray-200 pb-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs uppercase tracking-widest text-ui-fg-muted hover:text-ui-fg-subtle mb-1"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h2
          className="text-2xl text-ui-fg-base font-normal"
          data-testid="product-title"
        >
          {product.title}
        </h2>
      </div>
    </div>
  )
}

export default ProductInfo
