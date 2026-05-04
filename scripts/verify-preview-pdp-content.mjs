#!/usr/bin/env node

import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const requireFromBackend = createRequire(resolve(__dirname, "../apps/backend/package.json"))
const tsNode = requireFromBackend("ts-node")

tsNode.register({
  transpileOnly: true,
  project: resolve(__dirname, "../apps/backend/tsconfig.json"),
})

const {
  getPreviewProductImageUrls,
  previewMetadata,
  previewProducts,
  previewRetiredProductHandles,
} = requireFromBackend("../backend/src/migration-scripts/initial-data-seed.ts")

const expectedP0Handles = [
  "compact-groundsheet-footprint",
  "aluminum-stake-and-guyline-kit",
  "roll-top-dry-daypack",
  "packing-cube-trio",
  "aluminum-folding-camp-table",
  "lightweight-folding-camp-chair",
  "small-utility-pouch",
  "inflatable-camp-sleeping-pad",
  "camp-pillow-compressible",
  "nesting-camp-cook-pot-set",
  "hanging-camp-kitchen-organizer",
  "ambient-camp-lantern",
]

const sampleHandles = [
  "roll-top-dry-daypack",
  "aluminum-folding-camp-table",
  "small-utility-pouch",
  "inflatable-camp-sleeping-pad",
  "hanging-camp-kitchen-organizer",
  "ambient-camp-lantern",
]

const publicHandles = previewProducts.map((product) => product.handle)
const missingP0Handles = expectedP0Handles.filter(
  (handle) => !publicHandles.includes(handle)
)
const unexpectedRetiredHandles = publicHandles.filter((handle) =>
  previewRetiredProductHandles.includes(handle)
)

if (previewProducts.length !== expectedP0Handles.length) {
  throw new Error(
    `Expected ${expectedP0Handles.length} P0 seed products, found ${previewProducts.length}.`
  )
}

if (missingP0Handles.length > 0) {
  throw new Error(`Missing P0 seed products: ${missingP0Handles.join(", ")}`)
}

if (unexpectedRetiredHandles.length > 0) {
  throw new Error(
    `Retired products are still public in the seed: ${unexpectedRetiredHandles.join(", ")}`
  )
}

const sampledProducts = sampleHandles.map((handle) => {
  const product = previewProducts.find((item) => item.handle === handle)

  if (!product) {
    throw new Error(`Missing preview seed product ${handle}.`)
  }

  return product
})

let failed = false
const seenImageUrls = new Map()

for (const product of sampledProducts) {
  const imageUrls = getPreviewProductImageUrls(product)
  const metadata = previewMetadata(product)
  const productInfo = metadata.product_info
  const sections = productInfo.detail_sections

  const imageCountOk = imageUrls.length === 4
  const imageScopeOk = imageUrls.every((url) => url.includes(`/${product.handle}/`))
  const backendStateOk = ["public_preview", "coming_soon"].includes(
    productInfo.backend_state
  )
  const previewFlagsOk =
    productInfo.sample_verified === false &&
    productInfo.preview_only === true &&
    productInfo.notify_only === true
  const claimGuardrailOk =
    typeof productInfo.claim_guardrail === "string" &&
    productInfo.claim_guardrail.length > 0 &&
    Array.isArray(productInfo.forbidden_claims)
  const sectionCountOk = Array.isArray(sections) && sections.length >= 6
  const uniqueSectionBodiesOk =
    sectionCountOk && new Set(sections.map((section) => section.body)).size >= 5
  const sectionImagesOk =
    sectionCountOk &&
    sections.every(
      (section) =>
        typeof section.image_url === "string" &&
        section.image_url.includes(`/${product.handle}/`) &&
        typeof section.title === "string" &&
        section.title.length > 0 &&
        typeof section.body === "string" &&
        section.body.length > 0
    )

  for (const url of imageUrls) {
    const previousHandle = seenImageUrls.get(url)

    if (previousHandle && previousHandle !== product.handle) {
      console.error(
        `Shared image URL detected: ${url} is used by ${previousHandle} and ${product.handle}.`
      )
      failed = true
    }

    seenImageUrls.set(url, product.handle)
  }

  console.log(
    `${product.handle}: ${productInfo.backend_state}, ${imageUrls.length} scoped gallery images, ${sections.length} detail sections`
  )

  if (
    !imageCountOk ||
    !imageScopeOk ||
    !backendStateOk ||
    !previewFlagsOk ||
    !claimGuardrailOk ||
    !sectionCountOk ||
    !uniqueSectionBodiesOk ||
    !sectionImagesOk
  ) {
    failed = true
  }
}

console.log(
  `P0 catalog seed: ${previewProducts.length} public P0 products, ${previewRetiredProductHandles.length} retired handles excluded`
)

if (failed) {
  process.exit(1)
}
