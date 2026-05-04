# Preview Analytics Runbook

This preview storefront now ships with a Postgres-backed analytics and intent
capture path inside `apps/storefront`.

## Required env

Set these in `apps/storefront/.env.local`:

- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `PREVIEW_ANALYTICS_DATABASE_URL`

`PREVIEW_ANALYTICS_DATABASE_URL` can point at the same Postgres instance as
Medusa. If it is omitted, the storefront falls back to `DATABASE_URL`.

For the public preview runtime, set `NEXT_PUBLIC_BASE_URL` to:

```text
https://paperclip-hth-outdoor-gear-shop.hqkj.com
```

The public user-facing entry point is
`https://paperclip-hth-outdoor-gear-shop.hqkj.com/us`.

## Captured events

- `preview_home_view`
- `preview_notice_view`
- `preview_category_click`
- `preview_product_card_click`
- `preview_product_view`
- `preview_intent_click`
- `preview_email_submit`
- `preview_support_click`

## Storage tables

Tables are auto-created on first event or intent submission:

- `preview_analytics_events`
- `preview_intent_leads`

No manual migration is required for preview.

## Verification flow

1. Start backend and storefront with a Postgres URL available to storefront.
2. Open the homepage and a product page.
3. Click a category, product card, and the preview notice support link.
4. Submit one launch-update email form.

## Example SQL

Daily event counts:

```sql
select event_name, count(*) as events
from preview_analytics_events
where occurred_at >= now() - interval '7 days'
group by 1
order by 2 desc, 1 asc;
```

Top preview products by page views:

```sql
select product_handle, count(*) as views
from preview_analytics_events
where event_name = 'preview_product_view'
group by 1
order by 2 desc, 1 asc;
```

Product-card clicks by collection:

```sql
select collection_handle, product_handle, count(*) as clicks
from preview_analytics_events
where event_name = 'preview_product_card_click'
group by 1, 2
order by 3 desc, 1 asc, 2 asc;
```

Lead captures by source:

```sql
select coalesce(source, 'direct') as source, count(*) as leads
from preview_intent_leads
group by 1
order by 2 desc, 1 asc;
```

Recent leads with context:

```sql
select created_at, email, source, campaign, page_path, product_handle, collection_handle, cta_id
from preview_intent_leads
order by created_at desc
limit 50;
```
