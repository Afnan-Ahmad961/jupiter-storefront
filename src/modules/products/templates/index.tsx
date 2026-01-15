import React, { Suspense } from "react"

import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container  flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <div id="product-info">
            <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
              {product.collection && (
                <a
                  href={`/collections/${product.collection.handle}`}
                  className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
                >
                  {product.collection.title}
                </a>
              )}
              <h2
                className="text-3xl leading-10 text-ui-fg-base"
                data-testid="product-title"
              >
                {product.title}
              </h2>
              <p
                className="text-medium text-ui-fg-subtle whitespace-pre-line"
                data-testid="product-description"
              >
                {product.description}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="text-small-regular py-8">
              <div className="grid grid-cols-2 gap-x-8">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <span className="font-semibold">Material</span>
                    <p>{product.material ? product.material : "-"}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Country of origin</span>
                    <p>
                      {product.origin_country ? product.origin_country : "-"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">Type</span>
                    <p>{product.type ? product.type.value : "-"}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <span className="font-semibold">Weight</span>
                    <p>{product.weight ? `${product.weight} g` : "-"}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Dimensions</span>
                    <p>
                      {product.length && product.width && product.height
                        ? `${product.length}L x ${product.width}W x ${product.height}H`
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full relative">
          <div className="flex items-start relative">
            <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
              {images.map((image, index) => {
                return (
                  <div
                    key={image.id}
                    className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
                    id={image.id}
                  >
                    {!!image.url && (
                      <img
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        className="absolute inset-0 rounded-rounded"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <div className="max-w-4xl h-full bg-ui-bg-subtle w-full p-8">
            <div className="flex flex-col gap-y-4 center">
              <p className="text-ui-fg-base text-xl">
                Your demo product was successfully created! 🎉
              </p>
              <p className="text-ui-fg-subtle text-small-regular">
                You can now continue setting up your store in the admin.
              </p>
              <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
                <button className="w-full">Continue setup in admin</button>
              </a>
            </div>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <div className="product-page-constraint">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="text-base-regular text-gray-600 mb-6">
                  Related products
                </span>
                <p className="text-2xl-regular text-ui-fg-base max-w-lg">
                  You might also want to check out these products.
                </p>
              </div>
              <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
                {/* Product previews will be rendered here */}
              </ul>
            </div>
          </Suspense>
        </div>
    </>
  )
}

export default ProductTemplate
