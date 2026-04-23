# Minimal Store Launch Skeleton - Outdoor Gear

> Scope document for the initial outdoor equipment Shopify store.
> This is not a finished implementation plan.

## Starting Point

This project is modeled after `copper-teaware` as a lightweight Shopify parent repo:

| Area | Initial state |
| --- | --- |
| GitHub repo | Created under `HuaqingAI/outdoor-gear-shop` |
| Paperclip project | Tracks this repo as the primary workspace |
| Shopify store | Not created or connected yet |
| Theme | Placeholder directory only |
| Product catalog | Not selected |
| Payments/shipping/tax | Not configured |

## Minimum Preview Scope

The first viable preview should be a non-transactional outdoor-gear storefront:

| Module | Requirement |
| --- | --- |
| Store identity | Name, domain, market, and brand positioning |
| Theme baseline | Dawn or imported Shopify theme in `theme/` |
| Homepage | Hero, category blocks, sourcing promise, and email capture |
| Preview product | One draft product or starter kit with `preview_only=true` |
| CTA | Email capture or inquiry only |
| Compliance | No safety, warranty, waterproof, or certification claims without evidence |
| Analytics | Basic traffic and email capture tracking |

## Product Direction Candidates

Start with categories that are light, shippable, and low regulatory risk:

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

1. Confirm the store name, target market, and Shopify domain.
2. Choose whether `theme/` should be a normal folder or a paired submodule repo.
3. Select the first preview product category and sourcing criteria.
4. Create Shopify app credentials and run `bash scripts/shopify-auth-check.sh`.
5. Pull or initialize the Shopify theme in `theme/`.
