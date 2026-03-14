import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import { sdk } from "@lib/config"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string
  region: HttpTypes.StoreRegion
}) {
  const product = await listProducts({
    queryParams: { id: [id] },
    regionId: region.id,
  }).then(({ response }) => response.products[0])

  if (!product) {
    return null
  }

  let bundlesData = { bundles: [], bundledProducts: [] as any[] }
  try {
    const res = await sdk.client.fetch<{ bundles: any[], bundledProducts: any[] }>(`/store/products/${id}/bundles?region_id=${region.id}`, { 
      method: "GET", 
      cache: "no-store",
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      }
    })
    bundlesData = res

    // Augment the bundled products exactly as standard storefront products
    if (bundlesData.bundles.length > 0) {
      const productIds = bundlesData.bundles.flatMap((b: any) => b.items?.map((i: any) => i.product_id) || [])
      if (productIds.length > 0) {
        const enrichedProducts = await listProducts({
          queryParams: { id: productIds },
          regionId: region.id,
        }).then(({ response }) => response.products)

        bundlesData.bundledProducts = enrichedProducts
      }
    }
  } catch (e) {
    console.error("Failed to fetch bundles:", e)
  }

  return <ProductActions product={product} region={region} bundlesData={bundlesData} />
}
