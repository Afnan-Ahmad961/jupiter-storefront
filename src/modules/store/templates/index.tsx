import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreHeader from "@modules/store/components/store-header"
import { listCategories } from "@lib/data/categories"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  categoryId,
  q,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categoryId?: string
  q?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const categories = await listCategories()

  return (
    <div
      className="flex flex-col py-6 content-container"
      data-testid="category-container"
    >
      <StoreHeader categories={categories} />
      <div className="w-full">
        <Suspense key={`${categoryId}-${q}-${sortBy}-${page}`} fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            categoryId={categoryId}
            q={q}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
