# Minimal Store Launch Skeleton - Outdoor Gear

> Scope document for the initial outdoor equipment MedusaJS store.
> This is not a finished implementation plan.

## Starting Point

This project is a MedusaJS monorepo modeled after the lightweight
`copper-teaware` project direction, but for outdoor equipment.

| Area | Initial state |
| --- | --- |
| GitHub repo | Created under `HuaqingAI/outdoor-gear-shop` |
| Paperclip project | Tracks this repo as the primary workspace |
| Commerce backend | Medusa v2 in `apps/backend` |
| Storefront | Next.js storefront in `apps/storefront` |
| Product catalog | Preview seed products only |
| Payments/shipping/tax | Manual placeholders only |

## Minimum Preview Scope

The first viable preview should be a controlled, non-production outdoor-gear
storefront:

| Module | Requirement |
| --- | --- |
| Store identity | Name, target market, and brand positioning |
| Backend | Medusa backend with PostgreSQL and Redis |
| Storefront | Next.js storefront connected by publishable API key |
| Homepage | Outdoor gear hero, category navigation, and featured preview products |
| Preview products | Seeded products remain validation placeholders until sourcing is approved |
| Checkout | Manual payment/shipping only until real ops are approved |
| Compliance | No safety, warranty, waterproof, or certification claims without evidence |
| Analytics | Basic traffic and conversion tracking before public launch |

## Product Direction Candidates

Start with categories that are light, shippable, and lower regulatory risk:

| Candidate | Notes |
| --- | --- |
| Camping storage and organizers | Lower safety risk, visual merchandising friendly |
| Lightweight cookware accessories | Avoid fuel, blades, or safety-critical gear at first |
| Hiking accessories | Focus on straps, dry bags, pouches, repair kits |
| Outdoor lighting accessories | Only after battery/shipping compliance is verified |

Avoid in the first preview:

| Category | Reason |
| --- | --- |
| Knives, axes, or weapons-adjacent tools | Marketplace, legal, and shipping restrictions |
| Climbing PPE | High safety liability |
| Fuel, gas, or fire starters | Hazardous goods and shipping risk |
| Medical or survival claims | Evidence and compliance burden |

## Immediate Next Work

1. Provision PostgreSQL and Redis for the Medusa backend.
2. Fill `apps/backend/.env` from `apps/backend/.env.template`.
3. Run migrations and seed data.
4. Create the admin user and retrieve a publishable API key.
5. Fill `apps/storefront/.env.local` from `apps/storefront/.env.template`.
6. Start `pnpm dev` and verify backend/admin plus storefront.
7. Replace preview product images/copy with approved source-backed assets.
