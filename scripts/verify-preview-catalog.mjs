#!/usr/bin/env node

const baseUrl = (
  process.argv[2] ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:8000"
).replace(/\/$/, "")
const countryCode = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
const expectedCount = Number(process.env.PREVIEW_CATALOG_EXPECTED_COUNT || 12)
const productHandles = [
  "roll-top-dry-daypack",
  "aluminum-folding-camp-table",
  "small-utility-pouch",
  "hanging-camp-kitchen-organizer",
  "ambient-camp-lantern",
]

const fetchText = async (path) => {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: "follow",
  })
  const text = await response.text()

  return {
    status: response.status,
    ok: response.ok,
    text,
  }
}

const storePath = `/${countryCode}/products`
const storePage = await fetchText(storePath)
const countMatch = storePage.text.match(
  /(\d+)\s*<!-- -->?\s*preview\s*<!-- -->?\s*items?/i
)
const visibleCount = countMatch ? Number(countMatch[1]) : null

console.log(`Storefront: ${baseUrl}`)
console.log(`Products page: ${storePath} -> ${storePage.status}`)
console.log(
  `Visible product count: ${visibleCount ?? "not found"} (expected ${expectedCount})`
)

let failed = !storePage.ok || visibleCount !== expectedCount

for (const handle of productHandles) {
  const path = `/${countryCode}/products/${handle}`
  const result = await fetchText(path)
  const hasTitle =
    result.text.includes(handle) || result.text.includes("Outdoor Gear Shop")

  console.log(`PDP: ${path} -> ${result.status}`)

  if (!result.ok || !hasTitle) {
    failed = true
  }
}

if (failed) {
  process.exit(1)
}
