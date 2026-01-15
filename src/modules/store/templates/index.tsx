import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
        {/* SortProducts component inlined */}
        <FilterRadioGroup
          title="Sort by"
          items={[
            {
              value: "created_at",
              label: "Latest Arrivals",
            },
            {
              value: "price_asc",
              label: "Price: Low -> High",
            },
            {
              value: "price_desc",
              label: "Price: High -> Low",
            },
          ]}
          value={sort}
          handleChange={(value) => {
            // setQueryParams("sortBy", value)
          }}
        />
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
