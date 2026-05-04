import { HttpTypes } from "@medusajs/types"
import ProductPrice from "@modules/products/components/product-price"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPreviewInfo } from "@modules/products/utils/preview-metadata"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const previewInfo = getProductPreviewInfo(product)
  const bullets = previewInfo.keyBullets.slice(0, 3)

  return (
    <div id="product-info" className="rounded-2xl border border-[#d7dfd5] bg-white p-5 small:p-6">
      <div className="flex flex-col gap-y-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#637568] hover:text-[#17261f]"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <div className="flex flex-wrap gap-2">
          <div className="flex w-fit rounded-full border border-[#c8d8c8] bg-[#eef4ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#17261f]">
            {previewInfo.statusLabel || previewInfo.previewTierLabel}
          </div>
          {previewInfo.slot && (
            <div className="flex w-fit rounded-full border border-[#d7dfd5] bg-[#f7faf6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
              {previewInfo.slot}
            </div>
          )}
        </div>
        <Heading
          level="h2"
          className="text-[28px] leading-[34px] text-[#17261f] small:text-[40px] small:leading-[46px]"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="max-w-[68ch] text-base leading-6 text-[#415347] whitespace-pre-line"
          data-testid="product-description"
        >
          {previewInfo.shortSummary || product.description}
        </Text>
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#d7dfd5] bg-[#f7faf6] p-4 text-sm small:grid-cols-2">
          <div>
            <Text className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
              Preview price
            </Text>
            <ProductPrice product={product} />
          </div>
          {previewInfo.inventoryState && (
            <div>
              <Text className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
                Availability
              </Text>
              <Text className="mt-1 font-medium text-[#17261f]">
                {previewInfo.inventoryState}
              </Text>
            </div>
          )}
        </div>
        {bullets.length > 0 && (
          <ul className="grid gap-2 text-sm leading-6 text-[#415347]">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f866f]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
