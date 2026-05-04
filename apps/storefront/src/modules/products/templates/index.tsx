import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductDetailSections from "@modules/products/components/product-detail-sections"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import PreviewPageEvent from "@modules/preview/components/preview-page-event"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <PreviewPageEvent
        eventName="preview_product_view"
        payload={{
          countryCode,
          productHandle: product.handle || undefined,
          collectionHandle: product.collection?.handle || undefined,
          ctaId: "product_page_view",
          metadata: {
            productTitle: product.title,
          },
        }}
      />
      <div className="content-container py-8 small:py-14" data-testid="product-container">
        <div className="grid grid-cols-1 gap-8 large:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] large:gap-12 large:items-start">
          <div className="order-1">
            <ImageGallery productId={product.id} images={images} />
          </div>
          <div className="order-2 flex flex-col gap-6 large:sticky large:top-28">
            <ProductInfo product={product} />
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <ProductTabs product={product} />
          </div>
        </div>
      </div>
      <ProductDetailSections product={product} />
      <div
        className="content-container my-14 small:my-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
