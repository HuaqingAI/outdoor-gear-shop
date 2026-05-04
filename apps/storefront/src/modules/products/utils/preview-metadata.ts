import { HttpTypes } from "@medusajs/types"

type RawProductInfo = {
  sample_verified?: unknown
  preview_only?: unknown
  notify_only?: unknown
  slot?: unknown
  preview_tier?: unknown
  status_label?: unknown
  inventory_state?: unknown
  price_label?: unknown
  short_summary?: unknown
  key_bullets?: unknown
  key_specs?: unknown
  use_cases?: unknown
  detail_sections?: unknown
}

type RawProductDetailSection = {
  id?: unknown
  eyebrow?: unknown
  title?: unknown
  body?: unknown
  image_url?: unknown
  image_alt?: unknown
  bullets?: unknown
}

export type ProductPreviewInfo = {
  sampleVerified: boolean
  previewOnly: boolean
  notifyOnly: boolean
  slot?: string
  previewTier?: string
  previewTierLabel: string
  statusLabel?: string
  inventoryState?: string
  priceLabel?: string
  shortSummary?: string
  keyBullets: string[]
  keySpecs: [string, string][]
  useCases: string[]
  detailSections: ProductDetailSection[]
}

export type ProductDetailSection = {
  id: string
  eyebrow: string
  title: string
  body: string
  imageUrl: string
  imageAlt: string
  bullets: string[]
}

export function formatPreviewTier(value?: string) {
  if (!value) {
    return "Preview only"
  }

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function getProductPreviewInfo(
  product: HttpTypes.StoreProduct
): ProductPreviewInfo {
  const metadata = product.metadata as
    | {
        product_info?: RawProductInfo
      }
    | null
    | undefined
  const productInfo = metadata?.product_info

  const previewTier =
    typeof productInfo?.preview_tier === "string"
      ? productInfo.preview_tier
      : undefined
  const slot = typeof productInfo?.slot === "string" ? productInfo.slot : undefined
  const shortSummary =
    typeof productInfo?.short_summary === "string"
      ? productInfo.short_summary
      : undefined
  const statusLabel =
    typeof productInfo?.status_label === "string"
      ? productInfo.status_label
      : undefined
  const inventoryState =
    typeof productInfo?.inventory_state === "string"
      ? productInfo.inventory_state
      : undefined
  const priceLabel =
    typeof productInfo?.price_label === "string"
      ? productInfo.price_label
      : undefined
  const keyBullets = Array.isArray(productInfo?.key_bullets)
    ? productInfo.key_bullets.filter(
        (bullet): bullet is string => typeof bullet === "string" && !!bullet
      )
    : []
  const useCases = Array.isArray(productInfo?.use_cases)
    ? productInfo.use_cases.filter(
        (useCase): useCase is string => typeof useCase === "string" && !!useCase
      )
    : []
  const detailSections = parseDetailSections(productInfo?.detail_sections)
  const keySpecs =
    productInfo?.key_specs &&
    typeof productInfo.key_specs === "object" &&
    !Array.isArray(productInfo.key_specs)
      ? Object.entries(productInfo.key_specs as Record<string, unknown>)
          .filter(
            (entry): entry is [string, string] =>
              typeof entry[1] === "string" && !!entry[1]
          )
      : []

  return {
    sampleVerified: productInfo?.sample_verified === true,
    previewOnly: productInfo?.preview_only !== false,
    notifyOnly: productInfo?.notify_only !== false,
    slot,
    previewTier,
    previewTierLabel: formatPreviewTier(previewTier),
    statusLabel,
    inventoryState,
    priceLabel,
    shortSummary,
    keyBullets,
    keySpecs,
    useCases,
    detailSections,
  }
}

function normalizeString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && !!item.trim())
    : []
}

function parseDetailSections(value: unknown): ProductDetailSection[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((section, index) => {
      if (!section || typeof section !== "object" || Array.isArray(section)) {
        return null
      }

      const rawSection = section as RawProductDetailSection
      const title = normalizeString(rawSection.title)
      const body = normalizeString(rawSection.body)
      const imageUrl = normalizeString(rawSection.image_url)

      if (!title || !body || !imageUrl) {
        return null
      }

      return {
        id: normalizeString(rawSection.id) || `detail-${index + 1}`,
        eyebrow: normalizeString(rawSection.eyebrow) || "Product detail",
        title,
        body,
        imageUrl,
        imageAlt:
          normalizeString(rawSection.image_alt) || `${title} preview detail`,
        bullets: normalizeStringArray(rawSection.bullets),
      }
    })
    .filter((section): section is ProductDetailSection => Boolean(section))
}

export function getScopedPreviewImageUrl(
  product: HttpTypes.StoreProduct,
  role: "main" | "detail" | "context" | "scale" = "main"
) {
  return `/api/preview/product-image/${product.handle || product.id}/${role}.svg`
}

export function getProductDetailSections(
  product: HttpTypes.StoreProduct
): ProductDetailSection[] {
  const previewInfo = getProductPreviewInfo(product)

  if (previewInfo.detailSections.length > 0) {
    return previewInfo.detailSections
  }

  const specs = previewInfo.keySpecs
    .filter(([label]) => !["Preview state", "CTA mode"].includes(label))
    .slice(0, 3)
    .map(([label, value]) => `${label}: ${value}`)

  return [
    {
      id: "summary",
      eyebrow: previewInfo.slot || "Preview item",
      title: `${product.title} overview`,
      body:
        previewInfo.shortSummary ||
        product.description ||
        "This product is available for preview interest capture while final launch details are reviewed.",
      imageUrl: getScopedPreviewImageUrl(product, "main"),
      imageAlt: `${product.title} main preview image`,
      bullets: previewInfo.keyBullets.slice(0, 3),
    },
    {
      id: "specs",
      eyebrow: "Key specs",
      title: "Details available for review",
      body:
        product.material ||
        "The operations team can maintain product facts in metadata without changing the PDP renderer.",
      imageUrl: getScopedPreviewImageUrl(product, "detail"),
      imageAlt: `${product.title} detail preview image`,
      bullets: specs,
    },
    {
      id: "status",
      eyebrow: "Sourcing status",
      title: previewInfo.statusLabel || previewInfo.previewTierLabel,
      body:
        "This item is published for preview interest capture only. Product images are scoped placeholders until owned or supplier-authorized assets replace them.",
      imageUrl: getScopedPreviewImageUrl(product, "context"),
      imageAlt: `${product.title} preview status image`,
      bullets: [
        previewInfo.inventoryState,
        previewInfo.sampleVerified
          ? "Sample verification is complete."
          : "Sample verification is not complete.",
        "Request launch updates to register interest before ordering opens.",
      ].filter((item): item is string => Boolean(item)),
    },
  ]
}
