import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import Link from "next/link"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <Link href={`/products/${product.handle}`} className="group box-border">
      <div data-testid="product-wrapper" className="relative">
        <div className="relative overflow-hidden bg-ui-bg-subtle aspect-[9/12]">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none !shadow-none !p-0"
          />
        </div>

        <div className="mt-4 h-12 relative overflow-hidden">
          <div className="flex flex-col gap-y-1 transition-transform duration-300 group-hover:-translate-y-full">
            <Text className="text-sm font-medium text-ui-fg-base" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center">
            <div className="w-full bg-black text-white text-[10px] uppercase font-bold tracking-widest py-3 text-center">
              View Product
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
