#!/usr/bin/env node

import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { mkdir, writeFile } from "node:fs/promises"

const __dirname = dirname(fileURLToPath(import.meta.url))
const requireFromStorefront = createRequire(
  resolve(__dirname, "../apps/storefront/package.json")
)
const { Client } = requireFromStorefront("pg")

const databaseUrl = process.env.DATABASE_URL
const outputPath = resolve(process.cwd(), process.argv[2] || ".docker-cache/storefront.env")

if (!databaseUrl) {
  console.error("DATABASE_URL is required to export the publishable key.")
  process.exit(1)
}

const client = new Client({ connectionString: databaseUrl })

try {
  await client.connect()

  const { rows } = await client.query(
    `
      select token
      from api_key
      where type = 'publishable'
        and title = 'Outdoor Gear Storefront Key'
        and (revoked_at is null or revoked_at > now())
      order by created_at desc
      limit 1
    `
  )

  const token = rows[0]?.token

  if (!token) {
    console.error(
      "No active Outdoor Gear Storefront Key was found. Run the backend seed before starting the storefront."
    )
    process.exit(1)
  }

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${token}\n`)

  console.log(
    `Exported publishable key to ${outputPath} (${token.slice(0, 6)}...${token.slice(-3)}).`
  )
} finally {
  await client.end().catch(() => {})
}
