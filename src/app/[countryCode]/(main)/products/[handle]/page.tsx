import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"

export const revalidate = 3600

const getProduct = cache(async (countryCode: string, handle: string) => {
  const { response } = await listProducts({
    countryCode,
    queryParams: { handle },
  })
  return response.products[0] || null
})

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return product.images!.filter((i) => imageIdsMap.has(i.id))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProduct(params.countryCode, handle)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Jupiter Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Jupiter Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProduct(params.countryCode, params.handle)

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  if (!pricedProduct) {
    notFound()
  }

  const cheapestVariant = pricedProduct.variants
    ?.filter((v: any) => v.calculated_price?.calculated_amount)
    ?.sort((a: any, b: any) =>
      a.calculated_price.calculated_amount - b.calculated_price.calculated_amount
    )?.[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pricedProduct.title,
    description: pricedProduct.description || pricedProduct.title,
    image: pricedProduct.images?.map((img: any) => img.url) || [],
    ...(pricedProduct.thumbnail && { thumbnailUrl: pricedProduct.thumbnail }),
    brand: {
      "@type": "Brand",
      name: "Jupiterwardrobe",
    },
    ...(cheapestVariant?.calculated_price && {
      offers: {
        "@type": "Offer",
        url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/${params.countryCode}/products/${pricedProduct.handle}`,
        priceCurrency: region.currency_code?.toUpperCase() || "PKR",
        price: (cheapestVariant.calculated_price.calculated_amount / 100).toFixed(2),
        availability: "https://schema.org/InStock",
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images}
      />
    </>
  )
}
