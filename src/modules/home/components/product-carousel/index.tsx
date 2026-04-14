"use client"

import { useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductCarousel({
    products,
    region,
}: {
    products: HttpTypes.StoreProduct[]
    region: HttpTypes.StoreRegion
}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth / 2
                    : scrollLeft + clientWidth / 2
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }

    return (
        <div className="content-container py-4 small:py-4 relative overflow-hidden group/carousel">
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-x-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[280px] w-[280px] small:w-[320px] snap-start"
                        >
                            <ProductPreview product={product} region={region} />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 border border-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white"
                    aria-label="Previous"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 border border-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white"
                    aria-label="Next"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    )
}
