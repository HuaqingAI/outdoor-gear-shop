import ProductPrice from "@modules/products/components/product-price"
import { Text } from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { getProductPreviewInfo } from "@modules/products/utils/preview-metadata"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const previewInfo = getProductPreviewInfo(product)

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group"
      trackingEvent="preview_product_card_click"
      trackingContext={{
        productHandle: product.handle || undefined,
        collectionHandle: product.collection?.handle || undefined,
        ctaId: isFeatured ? "featured_product_card" : "product_card",
        metadata: {
          placement: isFeatured ? "featured_grid" : "product_grid",
          productTitle: product.title,
        },
      }}
    >
      <div data-testid="product-wrapper" className="flex h-full flex-col">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
        />
        <div className="mt-4 flex min-h-[76px] flex-col gap-2">
          <Text
            className="line-clamp-2 text-sm font-semibold leading-5 text-[#17261f]"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {product.collection?.title && (
              <Text className="text-xs text-[#637568]">
                {product.collection.title}
              </Text>
            )}
            <Text
              as="span"
              className="rounded-full border border-[#c8d8c8] bg-[#eef4ed] px-2 py-1 text-xs font-semibold text-[#17261f]"
              data-testid="preview-status"
            >
              {previewInfo.previewTierLabel}
            </Text>
            {previewInfo.notifyOnly && (
              <Text
                as="span"
                className="rounded-full border border-[#d7dfd5] bg-white px-2 py-1 text-xs font-semibold text-[#637568]"
              >
                Notify only
              </Text>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <ProductPrice product={product} />
            {previewInfo.inventoryState && (
              <Text className="text-xs font-medium text-[#637568]">
                {previewInfo.inventoryState}
              </Text>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
