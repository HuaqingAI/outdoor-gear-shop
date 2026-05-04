# HTH-57 Preview Validation Launch Pack

Last updated: 2026-05-03

This document is the execution pack for the first small-volume preview validation
wave tied to [HTH-57](/HTH/issues/HTH-57). It assumes the preview-only gate in
[HTH-58](/HTH/issues/HTH-58) has already been approved.

## Current launch status

- Preview analytics and launch-update capture are live.
- Preview-only policy, support, and unsubscribe flows are visible.
- Public preview inventory baseline is 24 published products across six
  collections:
  - Tents & Shelter
  - Packs & Bags
  - Sleep Systems
  - Camp Kitchen
  - Apparel & Layers
  - Lighting & Safety
- As of 2026-05-03, the public preview storefront URL is
  `https://paperclip-hth-outdoor-gear-shop.hqkj.com/us`.

Use the fixed Cloudflare Tunnel domain above for all small-volume external
traffic. Do not use temporary `trycloudflare.com` quick-tunnel URLs in campaign
materials.

## Approved validation scope

Primary theme buckets:

- Shelter setup
- Packs and soft organization
- Sleep systems
- Camp kitchen
- Apparel layers
- Lighting and safety

Current public-preview landing options available in the seeded catalog:

| Theme | Landing path | Public preview asset |
| --- | --- | --- |
| Full catalog | `/us/products` | 24-product preview catalog |
| Shelter setup | `/us/products/ridgeline-two-person-dome-tent` | `ridgeline-two-person-dome-tent` |
| Camp kitchen | `/us/products/hanging-camp-kitchen-organizer` | `hanging-camp-kitchen-organizer` |
| Lighting & safety | `/us/products/trail-first-aid-organizer-pouch` | `trail-first-aid-organizer-pouch` |
| Shelter collection | `/us/collections/tents-shelter-preview` | `tents-shelter-preview` |
| Camp kitchen collection | `/us/collections/camp-kitchen-preview` | `camp-kitchen-preview` |
| Lighting & safety category | `/us/categories/lighting-safety` | `lighting-safety` |

## Channel plan

Wave 1 should stay deliberately small and bias toward intent discovery over
scale:

| Channel | Goal | Recommended landing |
| --- | --- | --- |
| Meta interest test | Read image-led curiosity and product-page intent | Product pages first |
| Pinterest pin test | Read category-level browse appetite | Category or collection page |
| Niche community posts | Read copy clarity and support questions | Collection page |
| Low-volume search probes | Read keyword-to-product fit | Product pages first |

## UTM naming rules

The storefront automatically stores `utm_source`, `utm_medium`,
`utm_campaign`, `utm_term`, and `utm_content` into both
`preview_analytics_events` and `preview_intent_leads`.

Use this naming pattern:

- `utm_source`: channel or publisher, for example `meta`, `pinterest`,
  `reddit`, `search`
- `utm_medium`: delivery type, for example `paid_social`, `organic_social`,
  `community`, `search_probe`
- `utm_campaign`: `ogpv_r1_<theme>_<channel>`
- `utm_content`: asset or post identifier, for example `img_a`, `pin_b`,
  `post_01`
- `utm_term`: only for search probes; store the matched keyword

Recommended campaign names for the first pass:

- `ogpv_r1_shelter_meta`
- `ogpv_r1_kitchen_meta`
- `ogpv_r1_lighting_meta`
- `ogpv_r1_catalog_community`
- `ogpv_r1_sleep_pinterest`
- `ogpv_r1_packs_search`

## Launch URL templates

Use `<base-url>` as `https://paperclip-hth-outdoor-gear-shop.hqkj.com`.

Shelter product:

```text
<base-url>/us/products/ridgeline-two-person-dome-tent?utm_source=meta&utm_medium=paid_social&utm_campaign=ogpv_r1_shelter_meta&utm_content=img_a
```

Camp kitchen product:

```text
<base-url>/us/products/hanging-camp-kitchen-organizer?utm_source=meta&utm_medium=paid_social&utm_campaign=ogpv_r1_kitchen_meta&utm_content=img_a
```

Collection browse:

```text
<base-url>/us/collections/tents-shelter-preview?utm_source=pinterest&utm_medium=organic_social&utm_campaign=ogpv_r1_catalog_community&utm_content=pin_a
```

## KPI mapping

HTH-57 target ratios:

- `homepage -> category >= 20%`
- `category -> PDP >= 12%`
- `PDP -> intent >= 5%`
- `landing -> email >= 2%`
- Transaction-confusion support contacts should stay low

Operational interpretation with current events:

| Target | Read from data |
| --- | --- |
| Homepage to category | `preview_category_click` rows whose `page_path` starts at home |
| Category to PDP | `preview_product_card_click` rows from category or collection paths |
| PDP to intent | `preview_intent_click` or `preview_email_submit` grouped by `product_handle` |
| Landing to email | `preview_email_submit` divided by landing-page views or sessions by campaign |
| Confusion support | `preview_support_click` plus support inbox review |

## Baseline before external launch

Confirmed on 2026-05-03 from the preview analytics database:

- `preview_email_submit`: 1
- `preview_support_click`: 1
- Total leads: 1

These are smoke-test rows, not campaign results. Treat them as pre-launch
baseline only.

## SQL for first readout

Campaign event totals:

```sql
select
  coalesce(source, 'direct') as source,
  coalesce(medium, 'none') as medium,
  coalesce(campaign, '(none)') as campaign,
  event_name,
  count(*) as events
from preview_analytics_events
where occurred_at >= now() - interval '7 days'
group by 1, 2, 3, 4
order by 1, 2, 3, 4;
```

Landing to lead conversion by campaign:

```sql
with landing_views as (
  select
    coalesce(campaign, '(none)') as campaign,
    count(*) as views
  from preview_analytics_events
  where event_name in ('preview_home_view', 'preview_product_view')
    and occurred_at >= now() - interval '7 days'
  group by 1
),
leads as (
  select
    coalesce(campaign, '(none)') as campaign,
    count(*) as leads
  from preview_intent_leads
  where created_at >= now() - interval '7 days'
  group by 1
)
select
  l.campaign,
  l.views,
  coalesce(d.leads, 0) as leads,
  round(coalesce(d.leads, 0)::numeric / nullif(l.views, 0), 4) as lead_rate
from landing_views l
left join leads d using (campaign)
order by l.views desc, l.campaign asc;
```

Product intent rate:

```sql
with product_views as (
  select product_handle, count(*) as views
  from preview_analytics_events
  where event_name = 'preview_product_view'
    and occurred_at >= now() - interval '7 days'
  group by 1
),
product_leads as (
  select product_handle, count(*) as leads
  from preview_intent_leads
  where created_at >= now() - interval '7 days'
  group by 1
)
select
  v.product_handle,
  v.views,
  coalesce(l.leads, 0) as leads,
  round(coalesce(l.leads, 0)::numeric / nullif(v.views, 0), 4) as lead_rate
from product_views v
left join product_leads l using (product_handle)
order by v.views desc, v.product_handle asc;
```

Support confusion by campaign:

```sql
select
  coalesce(campaign, '(none)') as campaign,
  count(*) as support_clicks
from preview_analytics_events
where event_name = 'preview_support_click'
  and occurred_at >= now() - interval '7 days'
group by 1
order by support_clicks desc, campaign asc;
```

## Publishing log template

Record each post or ad as it goes live:

| Date | Channel | Theme | Landing path | Campaign | Content id | Owner | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | Meta | Shelter setup | `/us/products/ridgeline-two-person-dome-tent` | `ogpv_r1_shelter_meta` | `img_a` | traffic ops | queued/live | |

## Readout template

Use this structure in the HTH-57 issue comment once public traffic has run:

1. Distribution window and channels launched
2. Traffic volume by campaign
3. Best landing path by lead rate
4. Support-confusion signals
5. Continue / adjust / stop recommendation

## Public launch URL

Use `https://paperclip-hth-outdoor-gear-shop.hqkj.com/us` as the canonical
public preview entry point. Runtime `NEXT_PUBLIC_BASE_URL` should be set to the
origin `https://paperclip-hth-outdoor-gear-shop.hqkj.com`, without the `/us`
path segment.
