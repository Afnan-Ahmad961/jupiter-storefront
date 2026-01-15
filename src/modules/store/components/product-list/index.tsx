"use client"

import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { useState, useEffect } from "react"
import { listProductsWithSort } from "@lib/data/products"
import { Button } from "@medusajs/ui"

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
