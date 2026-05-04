"use client"

import {
  PreviewEventName,
  PreviewIntentLeadPayload,
  PreviewTrackingContext,
} from "./types"

const ATTRIBUTION_STORAGE_KEY = "preview_attribution_v1"
const ANONYMOUS_ID_STORAGE_KEY = "preview_anonymous_id_v1"
const SESSION_ID_STORAGE_KEY = "preview_session_id_v1"

function canUseBrowser() {
  return typeof window !== "undefined"
}

function createClientId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`
}

function getStoredId(storage: Storage, key: string, prefix: string) {
  const existing = storage.getItem(key)

  if (existing) {
    return existing
  }

  const created = createClientId(prefix)
  storage.setItem(key, created)
  return created
}

function readAttributionFromStorage() {
  if (!canUseBrowser()) {
    return {}
  }

  const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)

  if (!raw) {
    return {}
  }

  try {
    const parsed = JSON.parse(raw)
    return typeof parsed === "object" && parsed ? parsed : {}
  } catch {
    return {}
  }
}

function readAttributionFromLocation() {
  if (!canUseBrowser()) {
    return {}
  }

  const params = new URLSearchParams(window.location.search)

  const attribution = {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
    campaign: params.get("utm_campaign") || undefined,
    term: params.get("utm_term") || undefined,
    content: params.get("utm_content") || undefined,
  }

  const hasAttribution = Object.values(attribution).some(Boolean)

  if (hasAttribution) {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution)
    )
  }

  return hasAttribution ? attribution : readAttributionFromStorage()
}

export function getPreviewTrackingContext(
  overrides: Partial<PreviewTrackingContext> = {}
): PreviewTrackingContext {
  if (!canUseBrowser()) {
    return overrides
  }

  const anonymousId = getStoredId(
    window.localStorage,
    ANONYMOUS_ID_STORAGE_KEY,
    "anon"
  )
  const sessionId = getStoredId(
    window.sessionStorage,
    SESSION_ID_STORAGE_KEY,
    "session"
  )
  const attribution = readAttributionFromLocation()

  return {
    anonymousId,
    sessionId,
    pagePath:
      overrides.pagePath ||
      `${window.location.pathname}${window.location.search || ""}`,
    referrer: overrides.referrer || document.referrer || undefined,
    source:
      overrides.source || (attribution.source as string | undefined) || "direct",
    medium:
      overrides.medium || (attribution.medium as string | undefined) || "none",
    campaign: overrides.campaign || (attribution.campaign as string | undefined),
    term: overrides.term || (attribution.term as string | undefined),
    content: overrides.content || (attribution.content as string | undefined),
    ...overrides,
  }
}

export async function trackPreviewEvent(
  name: PreviewEventName,
  payload: Partial<PreviewTrackingContext> = {}
) {
  if (!canUseBrowser()) {
    return
  }

  try {
    await fetch("/api/preview/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        name,
        ...getPreviewTrackingContext(payload),
      }),
    })
  } catch {}
}

export async function submitPreviewIntent(
  payload: Omit<PreviewIntentLeadPayload, "anonymousId" | "sessionId" | "pagePath" | "referrer" | "source" | "medium" | "campaign" | "term" | "content">
    & Partial<PreviewTrackingContext>
) {
  const response = await fetch("/api/preview/intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...getPreviewTrackingContext(payload),
      ...payload,
    }),
  })

  const body = (await response.json().catch(() => null)) as
    | {
        ok?: boolean
        error?: string
      }
    | null

  if (!response.ok) {
    return {
      ok: false,
      error: body?.error || "Unable to submit your launch update request.",
    }
  }

  return { ok: true as const }
}
