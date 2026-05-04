import { NextRequest, NextResponse } from "next/server"

import { isPreviewAnalyticsConfigured, recordPreviewEvent } from "@lib/preview/db"
import { PREVIEW_EVENT_NAMES, PreviewEventName } from "@lib/preview/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeText(value: unknown, maxLength = 255) {
  if (typeof value !== "string") {
    return undefined
  }

  const normalized = value.trim()

  if (!normalized) {
    return undefined
  }

  return normalized.slice(0, maxLength)
}

function normalizeMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined
  }

  return value as Record<string, unknown>
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null)

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid analytics payload." },
      { status: 400 }
    )
  }

  const name = normalizeText((payload as { name?: unknown }).name) as
    | PreviewEventName
    | undefined

  if (!name || !PREVIEW_EVENT_NAMES.includes(name)) {
    return NextResponse.json(
      { ok: false, error: "Unsupported preview event." },
      { status: 400 }
    )
  }

  if (!isPreviewAnalyticsConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Preview analytics database is not configured. Set PREVIEW_ANALYTICS_DATABASE_URL or DATABASE_URL.",
      },
      { status: 503 }
    )
  }

  await recordPreviewEvent({
    name,
    anonymousId: normalizeText((payload as { anonymousId?: unknown }).anonymousId),
    sessionId: normalizeText((payload as { sessionId?: unknown }).sessionId),
    countryCode: normalizeText((payload as { countryCode?: unknown }).countryCode),
    pagePath: normalizeText((payload as { pagePath?: unknown }).pagePath, 1024),
    referrer:
      normalizeText((payload as { referrer?: unknown }).referrer, 1024) ||
      request.headers.get("referer") ||
      undefined,
    source: normalizeText((payload as { source?: unknown }).source),
    medium: normalizeText((payload as { medium?: unknown }).medium),
    campaign: normalizeText((payload as { campaign?: unknown }).campaign),
    term: normalizeText((payload as { term?: unknown }).term),
    content: normalizeText((payload as { content?: unknown }).content),
    productHandle: normalizeText(
      (payload as { productHandle?: unknown }).productHandle
    ),
    categoryHandle: normalizeText(
      (payload as { categoryHandle?: unknown }).categoryHandle
    ),
    collectionHandle: normalizeText(
      (payload as { collectionHandle?: unknown }).collectionHandle
    ),
    ctaId: normalizeText((payload as { ctaId?: unknown }).ctaId),
    metadata: normalizeMetadata((payload as { metadata?: unknown }).metadata),
    userAgent: request.headers.get("user-agent") || undefined,
  })

  return NextResponse.json({ ok: true })
}
