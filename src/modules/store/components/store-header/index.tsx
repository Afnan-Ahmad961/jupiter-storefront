"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

type StoreHeaderProps = {
    categories: HttpTypes.StoreProductCategory[]
}

const StoreHeader = ({ categories }: StoreHeaderProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
    const [activeCategory, setActiveCategory] = useState(searchParams.get("category_id") || "")
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Sync state with URL params
    useEffect(() => {
        setSearchValue(searchParams.get("q") || "")
        setActiveCategory(searchParams.get("category_id") || "")
    }, [searchParams])

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const query = createQueryString({ q: searchValue || null, page: "1" })
        router.push(`${pathname}?${query}`)
    }

    const handleCategorySelect = (id: string) => {
        const newCategoryId = activeCategory === id ? null : id
        setActiveCategory(newCategoryId || "")
        const query = createQueryString({ category_id: newCategoryId, page: "1" })
        router.push(`${pathname}?${query}`)
        setIsFilterOpen(false)
    }

    return (
        <div className="w-full flex flex-col gap-y-6 mb-12">
            <div className="flex items-center justify-between gap-x-4">
                <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder={activeCategory ? "Search in category..." : "Search products..."}
                        className="w-full h-10 pl-10 pr-4 bg-ui-bg-subtle border border-ui-border-base rounded-none text-sm focus:outline-none focus:border-black transition-colors duration-150"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-fg-muted" size={18} />
                </form>

                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-x-2 h-10 px-4 border border-ui-border-base bg-white hover:bg-ui-bg-subtle transition-colors duration-150 text-xs uppercase font-bold tracking-widest"
                    >
                        <Filter size={16} />
                        Filter
                        {activeCategory && <span className="ml-1 w-2 h-2 bg-black rounded-full" />}
                    </button>

                    {isFilterOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40 bg-black/5"
                                onClick={() => setIsFilterOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-ui-border-base shadow-lg z-50 py-2">
                                <div className="px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-ui-fg-muted border-b border-ui-border-base mb-2">
                                    Categories
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    <button
                                        onClick={() => handleCategorySelect("")}
                                        className={clx(
                                            "w-full text-left px-4 py-2 text-xs hover:bg-ui-bg-subtle transition-colors duration-150",
                                            {
                                                "font-bold": activeCategory === ""
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
                                                "w-full text-left px-4 py-2 text-xs hover:bg-ui-bg-subtle transition-colors duration-150",
                                                {
                                                    "font-bold text-black": activeCategory === category.id,
                                                    "text-ui-fg-subtle": activeCategory !== category.id,
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
                <div className="flex items-center gap-x-2">
                    <span className="text-xs text-ui-fg-muted">Category:</span>
                    <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-ui-bg-subtle border border-ui-border-base rounded-none">
                        {categories.find(c => c.id === activeCategory)?.name}
                    </span>
                    <button
                        onClick={() => handleCategorySelect("")}
                        className="text-[10px] uppercase underline text-ui-fg-muted hover:text-black ml-2"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    )
}

export default StoreHeader
