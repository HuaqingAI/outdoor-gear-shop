#!/usr/bin/env node

import { spawn } from "node:child_process"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const requireFromStorefront = createRequire(
  resolve(__dirname, "../apps/storefront/package.json")
)
const { Client } = requireFromStorefront("pg")

const databaseUrl = process.env.DATABASE_URL
const previewHandles = [
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

const retiredPublicHandles = [
  "ridgeline-two-person-dome-tent",
  "meadow-tarp-shelter-kit",
  "summit-45l-trail-pack",
  "trek-waist-pack",
  "three-season-mummy-sleeping-bag",
  "thermal-bag-liner",
  "folding-camp-tableware-kit",
  "insulated-camp-mug-pair",
  "lightweight-rain-shell",
  "grid-fleece-quarter-zip",
  "merino-hiking-sock-set",
  "sun-trek-cap",
  "rechargeable-trail-headlamp",
  "reflective-guyline-marker-set",
  "trail-first-aid-organizer-pouch",
  "og-ca-r1-camping-tableware-hanging-bag",
  "og-tr-r1-small-utility-tool-pouch",
]

if (!databaseUrl) {
  console.error("DATABASE_URL is required to verify preview seed state.")
  process.exit(1)
}

const client = new Client({ connectionString: databaseUrl })

try {
  await client.connect()

  const { rows } = await client.query(
    `
      select
        count(*) filter (
          where handle = any($1)
            and status = 'published'
        )::int as baseline_count,
        count(*) filter (
          where handle = any($2)
            and status = 'published'
        )::int as retired_count
      from product
      where deleted_at is null
    `,
    [previewHandles, retiredPublicHandles]
  )

  const baselineCount = rows[0]?.baseline_count ?? 0
  const retiredCount = rows[0]?.retired_count ?? 0

  if (baselineCount === previewHandles.length && retiredCount === 0) {
    console.log(
      `P0 preview seed is already present (${baselineCount} public products).`
    )
    process.exit(0)
  }

  console.log(
    `P0 preview seed needs repair: ${baselineCount}/${previewHandles.length} P0 products public, ${retiredCount} retired products public.`
  )
} finally {
  await client.end().catch(() => {})
}

console.log("Ensuring P0 preview catalog baseline...")

const child = spawn(
  "pnpm",
  [
    "--dir",
    "apps/backend",
    "exec",
    "medusa",
    "exec",
    "./src/migration-scripts/ensure-preview-catalog-baseline.ts",
  ],
  {
    env: process.env,
    stdio: "inherit",
  }
)

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Seed process exited from signal ${signal}.`)
    process.exit(1)
  }

  process.exit(code ?? 1)
})
