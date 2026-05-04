import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields:
        "*variants.calculated_price,+variants.inventory_quantity,*images,*collection,+metadata,+tags",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-20">
      <div className="mb-8 flex flex-col gap-3 small:flex-row small:items-end small:justify-between">
        <div>
          <Text className="text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            Featured collection
          </Text>
          <Text className="mt-2 text-[28px] font-semibold leading-[34px] text-[#17261f] small:text-[32px] small:leading-[38px]">
            {collection.title}
          </Text>
          <Text className="mt-2 max-w-2xl text-base leading-6 text-[#415347]">
            Preview candidates grouped for launch-interest signals and sourcing
            review.
          </Text>
        </div>
        <InteractiveLink
          href={`/collections/${collection.handle}`}
          trackingEvent="preview_category_click"
          trackingContext={{
            collectionHandle: collection.handle,
            ctaId: "featured_collection_view_all",
            metadata: {
              placement: "featured_collection_header",
              collectionTitle: collection.title,
            },
          }}
        >
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 2xsmall:grid-cols-2 small:grid-cols-3">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
