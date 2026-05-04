"use client"

import Back from "@modules/common/icons/back"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { getProductPreviewInfo } from "@modules/products/utils/preview-metadata"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Use cases",
      component: <UseCasesTab product={product} />,
    },
    {
      label: "Preview status",
      component: <PreviewStatusTab product={product} />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const UseCasesTab = ({ product }: ProductTabsProps) => {
  const previewInfo = getProductPreviewInfo(product)

  if (!previewInfo.useCases.length) {
    return (
      <p className="py-6 text-sm leading-6 text-[#637568]">
        Use cases are being finalized for this preview item.
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 py-6 text-sm leading-6 text-[#415347] small:grid-cols-3">
      {previewInfo.useCases.map((useCase) => (
        <li
          key={useCase}
          className="rounded-xl border border-[#d7dfd5] bg-[#f7faf6] p-4 font-medium text-[#17261f]"
        >
          {useCase}
        </li>
      ))}
    </ul>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const previewInfo = getProductPreviewInfo(product)

  const specs = [
    product.material && ["Material", product.material],
    product.origin_country && ["Country of origin", product.origin_country],
    product.type?.value && ["Type", product.type.value],
    product.weight && ["Weight", `${product.weight} g`],
    product.length &&
      product.width &&
      product.height && [
        "Dimensions",
        `${product.length}L x ${product.width}W x ${product.height}H`,
      ],
    ...previewInfo.keySpecs,
  ].filter(Boolean) as [string, string][]

  return (
    <div className="py-6 text-sm leading-6 text-[#415347]">
      {specs.length > 0 ? (
        <dl className="grid grid-cols-1 gap-4 small:grid-cols-2">
          {specs.map(([label, value]) => (
            <div key={`${label}-${value}`} className="rounded-xl border border-[#d7dfd5] bg-[#f7faf6] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
                {label}
              </dt>
              <dd className="mt-1 font-medium text-[#17261f]">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="rounded-xl border border-[#d7dfd5] bg-[#f7faf6] p-4 text-[#637568]">
          Specs are still under sourcing review and will be completed before
          public launch.
        </p>
      )}
    </div>
  )
}

const PreviewStatusTab = ({ product }: ProductTabsProps) => {
  const previewInfo = getProductPreviewInfo(product)
  const statusRows = [
    ["Preview state", previewInfo.statusLabel || "Preview-only catalog item"],
    [
      "Inventory state",
      previewInfo.inventoryState || "Launch inventory remains under review",
    ],
    ["Preview price", previewInfo.priceLabel || "Pending price review"],
    ["CTA mode", "Notify-only launch updates"],
    ["Sample verification", "No sample has been verified yet"],
    [
      "Image set",
      "Main, detail, field context, and scale references are visible for review",
    ],
  ]

  return (
    <div className="text-small-regular py-8 text-[#415347]">
      <dl className="mb-8 grid grid-cols-1 gap-4 small:grid-cols-2">
        {statusRows.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-[#d7dfd5] bg-[#f7faf6] p-4"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
              {label}
            </dt>
            <dd className="mt-1 font-medium text-[#17261f]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Sourcing validation</span>
            <p className="max-w-sm">
              Product data, availability, and supplier readiness are still being
              reviewed before public launch.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Launch updates</span>
            <p className="max-w-sm">
              Request updates on preview items so the team can use interest
              signals during launch planning.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">No purchases yet</span>
            <p className="max-w-sm">
              Live ordering, shipping, returns, and service policies are
              unavailable while this storefront remains preview only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
