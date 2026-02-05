"use client"

import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { useState, useEffect } from "react"
import { listProductsWithSort } from "@lib/data/products"
import { Button } from "@medusajs/ui"
import { Search } from "lucide-react"

type ProductListProps = {
    initialProducts: HttpTypes.StoreProduct[]
    region: HttpTypes.StoreRegion
    count: number
    queryParams: any
    sortBy: any
    countryCode: string
}

export default function ProductList({
    initialProducts,
    region,
    count,
    queryParams,
    sortBy,
    countryCode,
}: ProductListProps) {
    const [products, setProducts] = useState(initialProducts)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(count > initialProducts.length)

    // Reset products if initialProducts changes (due to new filter/search)
    useEffect(() => {
        setProducts(initialProducts)
        setPage(1)
        setHasNextPage(count > initialProducts.length)
    }, [initialProducts, count])

    const handleLoadMore = async () => {
        setLoading(true)
        const nextPage = page + 1

        try {
            const { response: { products: newProducts } } = await listProductsWithSort({
                page: nextPage,
                queryParams: {
                    ...queryParams,
                    limit: 10,
                },
                sortBy,
                countryCode,
            })

            setProducts((oldProducts) => [...oldProducts, ...newProducts])
            setPage(nextPage)
            setHasNextPage(count > products.length + newProducts.length)
        } catch (error) {
            console.error("Error loading more products:", error)
        } finally {
            setLoading(false)
        }
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-y-6">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <Search size={24} className="text-gray-300" />
                </div>
                <div className="text-center flex flex-col gap-y-2">
                    <p className="text-gray-900 text-[13px] uppercase tracking-[0.2em] font-medium">
                        No products found
                    </p>
                    {queryParams?.q && (
                        <p className="text-gray-500 text-[11px] uppercase tracking-widest">
                            We couldn't find anything matching <span className="text-black font-semibold">"{queryParams.q}"</span>
                        </p>
                    )}
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-2">
                        Try adjusting your search or category filters
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-y-12">
            <ul
                className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8"
                data-testid="products-list"
            >
                {products.map((p) => {
                    return (
                        <li key={p.id}>
                            <ProductPreview product={p} region={region} />
                        </li>
                    )
                })}
            </ul>

            {hasNextPage && (
                <Button
                    onClick={handleLoadMore}
                    isLoading={loading}
                    variant="secondary"
                    className="w-full max-w-[200px] h-12 bg-black text-white rounded-none uppercase font-bold tracking-widest hover:bg-black/90 transition-colors duration-150 border-none"
                >
                    View More
                </Button>
            )}
        </div>
    )
}
