import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getCategoryPageContent } from "@lib/content/preview-content"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)
  const productCount = category.products?.length || 0
  const content = getCategoryPageContent(
    category.handle,
    category.name,
    category.description,
  )

  return (
    <div
      className="content-container py-10 small:py-16"
      data-testid="category-container"
    >
      <div className="mb-8 flex flex-col gap-4 small:mb-10 small:flex-row small:items-end small:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            {parents.map((parent) => (
              <LocalizedClientLink
                key={parent.id}
                className="hover:text-[#17261f]"
                href={`/categories/${parent.handle}`}
                data-testid="sort-by-link"
                trackingEvent="preview_category_click"
                trackingContext={{
                  categoryHandle: parent.handle,
                  ctaId: "category_breadcrumb",
                  metadata: {
                    placement: "category_breadcrumb",
                    categoryName: parent.name,
                  },
                }}
              >
                {parent.name} /
              </LocalizedClientLink>
            ))}
            <span>Category</span>
          </div>
          <h1
            data-testid="category-page-title"
            className="text-[32px] font-semibold leading-[38px] text-[#17261f] small:text-[40px] small:leading-[46px]"
          >
            {category.name}
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
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <div className="w-full">
          {!!category.category_children?.length && (
            <div className="mb-8 rounded-2xl border border-[#d7dfd5] bg-[#f7faf6] p-4 small:p-5">
              <ul className="grid grid-cols-1 gap-2 text-sm font-medium text-[#17261f] small:grid-cols-2">
                {category.category_children.map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="underline decoration-[#9cb09f] underline-offset-4"
                      href={`/categories/${c.handle}`}
                      trackingEvent="preview_category_click"
                      trackingContext={{
                        categoryHandle: c.handle,
                        ctaId: "category_child_link",
                        metadata: {
                          placement: "category_children",
                          categoryName: c.name,
                        },
                      }}
                    >
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
