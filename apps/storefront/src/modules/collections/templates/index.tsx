import { Suspense } from "react"

import { getCollectionPageContent } from "@lib/content/preview-content"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PreviewIntentForm from "@modules/preview/components/preview-intent-form"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const productCount = collection.products?.length || 0
  const content = getCollectionPageContent(collection.handle, collection.title)

  return (
    <div className="content-container py-10 small:py-16">
      <div className="mb-8 flex flex-col gap-4 small:mb-10 small:flex-row small:items-end small:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            Collection
          </p>
          <h1 className="text-[32px] font-semibold leading-[38px] text-[#17261f] small:text-[40px] small:leading-[46px]">
            {collection.title}
          </h1>
          <p className="mt-3 text-base leading-6 text-[#415347]">
            {content.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {content.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[#c8d8c8] bg-[#eef4ed] px-3 py-1 text-xs font-semibold text-[#17261f]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm font-medium text-[#637568]">
          {productCount} preview {productCount === 1 ? "item" : "items"}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 small:grid-cols-[260px_minmax(0,1fr)] small:items-start">
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <PreviewIntentForm
            className="mb-8 bg-[#f7faf6]"
            ctaId="collection_launch_update"
            title={`Track ${collection.title}`}
            description={content.signupDescription}
            countryCode={countryCode}
            collectionHandle={collection.handle}
            metadata={{
              placement: "collection_page",
              collectionTitle: collection.title,
            }}
          />
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
