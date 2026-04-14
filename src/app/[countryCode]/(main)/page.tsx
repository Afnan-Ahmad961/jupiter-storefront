import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Jupiterwardrobe",
  description:
    "Jupiter\u00AE \u2014 OOTW out of this world - volume 1 coming soon \uD83E\uDE90",
}

import { listProducts } from "@lib/data/products"
import ProductCarousel from "@modules/home/components/product-carousel"
import NewArrivalsMarquee from "@modules/home/components/new-arrivals-marquee"
import Link from "next/link"

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 10,
      fields: "*variants.calculated_price",
    },
  })

  return (
    <>
      <Hero />
      <NewArrivalsMarquee />
      {products && (
        <div className="pb-12 flex flex-col items-center">
          <ProductCarousel products={products} region={region} />
          <div className="mt-4">
            <Link
              href="/store"
              className="px-12 py-4 border border-gray-200 text-black text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300 inline-block"
            >
              Shop All
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
