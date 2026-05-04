export const PREVIEW_EVENT_NAMES = [
  "preview_home_view",
  "preview_notice_view",
  "preview_category_click",
  "preview_product_card_click",
  "preview_product_view",
  "preview_intent_click",
  "preview_email_submit",
  "preview_support_click",
] as const

export type PreviewEventName = (typeof PREVIEW_EVENT_NAMES)[number]

export type PreviewTrackingContext = {
  anonymousId?: string
  sessionId?: string
  countryCode?: string
  pagePath?: string
  referrer?: string
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  productHandle?: string
  categoryHandle?: string
  collectionHandle?: string
  ctaId?: string
  metadata?: Record<string, unknown>
}

export type PreviewEventPayload = PreviewTrackingContext & {
  name: PreviewEventName
  userAgent?: string
}

export type PreviewIntentType = "launch_update"

export type PreviewIntentLeadPayload = PreviewTrackingContext & {
  email: string
  intentType?: PreviewIntentType
  notes?: string
}
