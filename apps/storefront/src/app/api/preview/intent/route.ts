import { NextRequest, NextResponse } from "next/server"

import {
  createPreviewIntentLead,
  isPreviewAnalyticsConfigured,
  recordPreviewEvent,
} from "@lib/preview/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      { ok: false, error: "Invalid intent payload." },
      { status: 400 }
    )
  }

  const email = normalizeText((payload as { email?: unknown }).email, 320)?.toLowerCase()

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
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

  const basePayload = {
    email,
    intentType: "launch_update" as const,
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
    notes: normalizeText((payload as { notes?: unknown }).notes, 4000),
    metadata: normalizeMetadata((payload as { metadata?: unknown }).metadata),
  }

  await createPreviewIntentLead(basePayload)

  await recordPreviewEvent({
    name: "preview_email_submit",
    anonymousId: basePayload.anonymousId,
    sessionId: basePayload.sessionId,
    countryCode: basePayload.countryCode,
    pagePath: basePayload.pagePath,
    referrer: basePayload.referrer,
    source: basePayload.source,
    medium: basePayload.medium,
    campaign: basePayload.campaign,
    term: basePayload.term,
    content: basePayload.content,
    productHandle: basePayload.productHandle,
    categoryHandle: basePayload.categoryHandle,
    collectionHandle: basePayload.collectionHandle,
    ctaId: basePayload.ctaId,
    metadata: {
      ...(basePayload.metadata || {}),
      emailDomain: email.split("@")[1],
      intentType: "launch_update",
    },
    userAgent: request.headers.get("user-agent") || undefined,
  })

  return NextResponse.json({ ok: true })
}
