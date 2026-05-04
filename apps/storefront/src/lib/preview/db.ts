import "server-only"

import { Pool } from "pg"

import {
  PreviewEventPayload,
  PreviewIntentLeadPayload,
  PreviewIntentType,
} from "./types"

const PREVIEW_ANALYTICS_DATABASE_URL =
  process.env.PREVIEW_ANALYTICS_DATABASE_URL || process.env.DATABASE_URL

declare global {
  var previewAnalyticsPool: Pool | undefined
  var previewAnalyticsSchemaReady: Promise<void> | undefined
}

function getPreviewAnalyticsPool() {
  if (!PREVIEW_ANALYTICS_DATABASE_URL) {
    return null
  }

  if (!global.previewAnalyticsPool) {
    global.previewAnalyticsPool = new Pool({
      connectionString: PREVIEW_ANALYTICS_DATABASE_URL,
    })
  }

  return global.previewAnalyticsPool
}

async function ensurePreviewAnalyticsSchema(pool: Pool) {
  if (!global.previewAnalyticsSchemaReady) {
    global.previewAnalyticsSchemaReady = pool.query(`
      CREATE TABLE IF NOT EXISTS preview_analytics_events (
        id BIGSERIAL PRIMARY KEY,
        event_name TEXT NOT NULL,
        occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        anonymous_id TEXT,
        session_id TEXT,
        country_code TEXT,
        page_path TEXT,
        referrer TEXT,
        source TEXT,
        medium TEXT,
        campaign TEXT,
        term TEXT,
        content TEXT,
        product_handle TEXT,
        category_handle TEXT,
        collection_handle TEXT,
        cta_id TEXT,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
        user_agent TEXT
      );

      CREATE INDEX IF NOT EXISTS preview_analytics_events_name_time_idx
        ON preview_analytics_events (event_name, occurred_at DESC);
      CREATE INDEX IF NOT EXISTS preview_analytics_events_product_idx
        ON preview_analytics_events (product_handle, occurred_at DESC);
      CREATE INDEX IF NOT EXISTS preview_analytics_events_category_idx
        ON preview_analytics_events (category_handle, occurred_at DESC);
      CREATE INDEX IF NOT EXISTS preview_analytics_events_source_idx
        ON preview_analytics_events (source, campaign, occurred_at DESC);

      CREATE TABLE IF NOT EXISTS preview_intent_leads (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        email TEXT NOT NULL,
        intent_type TEXT NOT NULL DEFAULT 'launch_update',
        anonymous_id TEXT,
        session_id TEXT,
        country_code TEXT,
        page_path TEXT,
        referrer TEXT,
        source TEXT,
        medium TEXT,
        campaign TEXT,
        term TEXT,
        content TEXT,
        product_handle TEXT,
        category_handle TEXT,
        collection_handle TEXT,
        cta_id TEXT,
        notes TEXT,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb
      );

      CREATE INDEX IF NOT EXISTS preview_intent_leads_created_at_idx
        ON preview_intent_leads (created_at DESC);
      CREATE INDEX IF NOT EXISTS preview_intent_leads_email_idx
        ON preview_intent_leads (lower(email));
      CREATE INDEX IF NOT EXISTS preview_intent_leads_product_idx
        ON preview_intent_leads (product_handle, created_at DESC);
      CREATE INDEX IF NOT EXISTS preview_intent_leads_category_idx
        ON preview_intent_leads (category_handle, created_at DESC);
      CREATE INDEX IF NOT EXISTS preview_intent_leads_source_idx
        ON preview_intent_leads (source, campaign, created_at DESC);
    `)
      .then(() => undefined)
      .catch((error) => {
        global.previewAnalyticsSchemaReady = undefined
        throw error
      })
  }

  await global.previewAnalyticsSchemaReady
}

function getRequiredPool() {
  const pool = getPreviewAnalyticsPool()

  if (!pool) {
    throw new Error(
      "Preview analytics database is not configured. Set PREVIEW_ANALYTICS_DATABASE_URL or DATABASE_URL."
    )
  }

  return pool
}

function normalizeText(value?: string | null, maxLength = 255) {
  if (!value) {
    return null
  }

  const normalized = value.trim()

  if (!normalized) {
    return null
  }

  return normalized.slice(0, maxLength)
}

function normalizeMetadata(value?: Record<string, unknown>) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value
}

export function isPreviewAnalyticsConfigured() {
  return Boolean(PREVIEW_ANALYTICS_DATABASE_URL)
}

export async function recordPreviewEvent(input: PreviewEventPayload) {
  const pool = getRequiredPool()
  await ensurePreviewAnalyticsSchema(pool)

  await pool.query(
    `
      INSERT INTO preview_analytics_events (
        event_name,
        anonymous_id,
        session_id,
        country_code,
        page_path,
        referrer,
        source,
        medium,
        campaign,
        term,
        content,
        product_handle,
        category_handle,
        collection_handle,
        cta_id,
        metadata,
        user_agent
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16::jsonb, $17
      )
    `,
    [
      input.name,
      normalizeText(input.anonymousId),
      normalizeText(input.sessionId),
      normalizeText(input.countryCode, 32),
      normalizeText(input.pagePath, 1024),
      normalizeText(input.referrer, 1024),
      normalizeText(input.source),
      normalizeText(input.medium),
      normalizeText(input.campaign),
      normalizeText(input.term),
      normalizeText(input.content),
      normalizeText(input.productHandle),
      normalizeText(input.categoryHandle),
      normalizeText(input.collectionHandle),
      normalizeText(input.ctaId),
      JSON.stringify(normalizeMetadata(input.metadata)),
      normalizeText(input.userAgent, 1024),
    ]
  )
}

export async function createPreviewIntentLead(input: PreviewIntentLeadPayload) {
  const pool = getRequiredPool()
  await ensurePreviewAnalyticsSchema(pool)

  const intentType: PreviewIntentType = input.intentType || "launch_update"

  await pool.query(
    `
      INSERT INTO preview_intent_leads (
        email,
        intent_type,
        anonymous_id,
        session_id,
        country_code,
        page_path,
        referrer,
        source,
        medium,
        campaign,
        term,
        content,
        product_handle,
        category_handle,
        collection_handle,
        cta_id,
        notes,
        metadata
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18::jsonb
      )
    `,
    [
      normalizeText(input.email, 320),
      intentType,
      normalizeText(input.anonymousId),
      normalizeText(input.sessionId),
      normalizeText(input.countryCode, 32),
      normalizeText(input.pagePath, 1024),
      normalizeText(input.referrer, 1024),
      normalizeText(input.source),
      normalizeText(input.medium),
      normalizeText(input.campaign),
      normalizeText(input.term),
      normalizeText(input.content),
      normalizeText(input.productHandle),
      normalizeText(input.categoryHandle),
      normalizeText(input.collectionHandle),
      normalizeText(input.ctaId),
      normalizeText(input.notes, 4000),
      JSON.stringify(normalizeMetadata(input.metadata)),
    ]
  )
}
