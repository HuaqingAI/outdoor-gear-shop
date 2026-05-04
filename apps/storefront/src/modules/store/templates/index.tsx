import { Suspense } from "react"

import { listProducts } from "@lib/data/products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PreviewIntentForm from "@modules/preview/components/preview-intent-form"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  productLimit,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  productLimit?: number
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const { response } = await listProducts({
    queryParams: { limit: 1 },
    countryCode,
  })

  return (
    <div
      className="content-container py-10 small:py-16"
      data-testid="category-container"
    >
      <div className="mb-8 flex flex-col gap-4 small:mb-10 small:flex-row small:items-end small:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            Preview catalog
          </p>
          <h1
            data-testid="store-page-title"
            className="text-[32px] font-semibold leading-[38px] text-[#17261f] small:text-[40px] small:leading-[46px]"
          >
            All outdoor gear products
          </h1>
          <p className="mt-3 text-base leading-6 text-[#415347]">
            Browse the first-wave P0 preview assortment across shelter, packs,
            sleep systems, camp furniture, camp kitchen, utility, and lighting
            candidates under sourcing review.
          </p>
        </div>
        <p className="text-sm font-medium text-[#637568]">
          {response.count} preview {response.count === 1 ? "item" : "items"}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 small:grid-cols-[260px_minmax(0,1fr)] small:items-start">
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <PreviewIntentForm
            className="mb-8 bg-[#f7faf6]"
            ctaId="store_launch_update"
            title="Track catalog launch progress"
            description="Leave your email to help us read demand across the preview catalog during sourcing review."
            countryCode={countryCode}
            metadata={{
              placement: "store_page",
            }}
          />
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              limit={productLimit}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
