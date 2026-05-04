import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import {
  ProductDetailSection,
  getProductDetailSections,
} from "@modules/products/utils/preview-metadata"
import Image from "next/image"

type ProductDetailSectionsProps = {
  product: HttpTypes.StoreProduct
}

const ProductDetailSections = ({ product }: ProductDetailSectionsProps) => {
  const sections = getProductDetailSections(product)

  if (!sections.length) {
    return null
  }

  return (
    <section
      className="content-container py-12 small:py-16"
      data-testid="product-detail-sections"
    >
      <div className="mb-8 max-w-3xl">
        <Text className="text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
          Product details
        </Text>
        <Heading
          level="h2"
          className="mt-3 text-[28px] leading-[34px] text-[#17261f] small:text-[36px] small:leading-[42px]"
        >
          Review the item before launch
        </Heading>
      </div>
      <div className="grid gap-8">
        {sections.map((section, index) => (
          <DetailSection
            key={`${product.id}-${section.id}`}
            section={section}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}

const DetailSection = ({
  section,
  reverse,
}: {
  section: ProductDetailSection
  reverse: boolean
}) => {
  return (
    <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#d7dfd5] bg-white small:grid-cols-2">
      <div className={reverse ? "small:order-2" : undefined}>
        <div className="relative aspect-[4/3] h-full min-h-[280px] w-full bg-[#f4f6f2]">
          <Image
            src={section.imageUrl}
            alt={section.imageAlt}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 small:p-8 large:p-10">
        <Text className="text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
          {section.eyebrow}
        </Text>
        <Heading
          level="h3"
          className="mt-3 text-[24px] leading-[30px] text-[#17261f] small:text-[30px] small:leading-[36px]"
        >
          {section.title}
        </Heading>
        <Text className="mt-4 text-base leading-7 text-[#415347]">
          {section.body}
        </Text>
        {section.bullets.length > 0 && (
          <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#415347]">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f866f]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default ProductDetailSections
