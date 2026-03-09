"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

type StoreHeaderProps = {
    categories: HttpTypes.StoreProductCategory[]
    collectionTitle?: string
}

const StoreHeader = ({ categories, collectionTitle }: StoreHeaderProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
    const [activeCategory, setActiveCategory] = useState(searchParams.get("category_id") || "")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Sync search value from URL only when it changes externally
    useEffect(() => {
        const urlQ = searchParams.get("q") || ""
        if (urlQ !== searchValue) {
            setSearchValue(urlQ)
        }
    }, [searchParams.get("q")])

    // Sync active category from URL
    useEffect(() => {
        setActiveCategory(searchParams.get("category_id") || "")
    }, [searchParams.get("category_id")])

    const createQueryString = useCallback(
        (paramsToUpdate: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams)
            Object.entries(paramsToUpdate).forEach(([name, value]) => {
                if (value === null) {
                    params.delete(name)
                } else {
                    params.set(name, value)
                }
            })
            return params.toString()
        },
        [searchParams]
    )

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const query = createQueryString({ q: value || null, page: "1" })
        router.replace(`${pathname}?${query}`, { scroll: false })
    }, 500)

    const onSearchChange = (value: string) => {
        setSearchValue(value)
        debouncedSearch(value)
    }

    const handleCategorySelect = (id: string) => {
        const category = categories.find(c => c.id === id)
        if (category?.handle === "coming-soon") {
            router.push("/coming-soon")
            return
        }

        const newCategoryId = activeCategory === id ? null : id
        setActiveCategory(newCategoryId || "")
        const query = createQueryString({ category_id: newCategoryId, page: "1" })
        router.push(`${pathname}?${query}`)
        setIsFilterOpen(false)
    }

    return (
        <div className="w-full flex flex-col gap-y-4 mb-20 pt-4">
            {collectionTitle && (
                <div className="mb-4">
                    <h1 className="text-2xl uppercase tracking-widest font-medium">{collectionTitle}</h1>
                </div>
            )}
            <div className="flex items-center justify-between gap-x-8">
                <div className="relative w-full max-w-[300px]">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600" size={15} />
                    <input
                        type="text"
                        placeholder={activeCategory ? "SEARCH IN CATEGORY" : "SEARCH PRODUCTS"}
                        className="w-full h-9 pl-6 pr-4 bg-white border-b border-gray-600 rounded-none text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-black transition-colors duration-150 placeholder:text-gray-600"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-x-2 h-9 px-4 border text-gray-600 border-gray-600 bg-white hover:bg-black hover:text-white transition-all duration-200 text-[10px] uppercase font-medium tracking-[0.2em]"
                    >
                        <Filter size={12} strokeWidth={1.5} />
                        FILTER
                        {activeCategory && <span className="ml-1 w-1.5 h-1.5 bg-black rounded-full" />}
                    </button>

                    {isFilterOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40 bg-black/5"
                                onClick={() => setIsFilterOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-sm z-50 py-3">
                                <div className="px-5 py-2 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 border-b border-gray-100 mb-3">
                                    Browse Categories
                                </div>
                                <div className="max-h-64 overflow-y-auto px-1">
                                    <button
                                        onClick={() => handleCategorySelect("")}
                                        className={clx(
                                            "w-full text-left px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-colors duration-150",
                                            {
                                                "font-bold text-black": activeCategory === "",
                                                "text-gray-700": activeCategory !== ""
                                            }
                                        )}
                                    >
                                        All Products
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category.id)}
                                            className={clx(
                                                "w-full text-left px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-colors duration-150",
                                                {
                                                    "font-bold text-black": activeCategory === category.id,
                                                    "text-gray-700": activeCategory !== category.id,
                                                }
                                            )}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {activeCategory && (
                <div className="flex items-center gap-x-3 mt-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Filtering by:</span>
                    <div className="flex items-center gap-x-2 bg-gray-50 px-3 py-1.5 border border-gray-200">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                            {categories.find(c => c.id === activeCategory)?.name}
                        </span>
                        <button
                            onClick={() => handleCategorySelect("")}
                            className="hover:opacity-60 transition-opacity"
                        >
                            <X size={12} className="text-gray-500" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StoreHeader
