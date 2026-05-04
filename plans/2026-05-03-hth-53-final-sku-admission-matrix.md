# HTH-53 Final SKU Admission Matrix

Context: [HTH-53](/HTH/issues/HTH-53) resumes after [HTH-59](/HTH/issues/HTH-59) closed its supply-chain evidence consolidation. This file is the final decision artifact for the first 9 candidate SKU slots.

Primary upstream sources:

- Seed product facts in [apps/backend/src/migration-scripts/initial-data-seed.ts](/data/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/apps/backend/src/migration-scripts/initial-data-seed.ts:267)
- Supply-chain consolidation in [plans/2026-05-03-hth-59-supply-chain-consolidation.md](/data/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-03-hth-59-supply-chain-consolidation.md:1)
- Resume gate/checklist in [plans/2026-05-03-hth-53-resume-checklist.md](/data/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-03-hth-53-resume-checklist.md:1)

## Decision summary

- `public preview`: 2
- `placeholder only`: 7
- `reject`: 0
- `live pilot ready`: 0

The three original seed names below are no longer treated as factual public product identities:

- `Trail Camp Starter Kit`
- `Nesting Camp Cookware Organizer`
- `Trail Repair Pouch`

Where source-backed replacements exist, this matrix uses the replacement identity for admission decisions.

## Final matrix

| Slot | Final title / current identity | Category | Collection | Positioning | Material / dimensions / weight | Variants | Image status | Source / sample / conceptual status | Target retail / placeholder price status | Risk notes | Forbidden claims | Final decision | Blocker owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `OG-CS-01` | `OG-CS-R1 Kinggear Collapsible Camping Tool Bag` replacing `Trail Camp Starter Kit` | Camp Storage | Preview Outdoor Kit | Soft camp-gear organizer / tool bag, not a bundled kit claim | Supplier-backed material/dimension fields exist; net weight still unresolved against listing language | Seed had single `Preview` bundle variant; final external variant not fixed | Preview image must be self-owned or placeholder only; supplier image authorization incomplete | `source-backed replacement candidate`; supplier/source/quote/MOQ exist; sample and authorization follow-up still open | Placeholder pricing only; not ready for retail math sign-off | `Waterproof` wording conflict, net weight unresolved, image right incomplete | No waterproof guarantee, no durability outcome, no kit completeness claim | `placeholder only` | Supply-chain coordinator for net weight, image right, and wording reconciliation |
| `OG-CS-02` | `Hanging Camp Shelf Organizer` | Camp Storage | Preview Outdoor Kit | Concept storage accessory | No verified supplier facts yet | Not fixed | Placeholder only | `conceptual only`; no real source | Placeholder only | No commercial proof | No load-bearing, weatherproof, survival, or storage-capacity claim | `placeholder only` | Supply-chain coordinator to source first real candidate |
| `OG-CS-03` | `Camp Essentials Pouch Set` | Camp Storage | Preview Outdoor Kit | Concept storage pouch set | No verified supplier facts yet | Not fixed | Placeholder only | `conceptual only`; no real source | Placeholder only | No commercial proof | No completeness, waterproof, field-ready, or safety claim | `placeholder only` | Supply-chain coordinator to source first real candidate |
| `OG-CA-01` | `OG-CA-R1 Camping Tableware Hanging Bag` replacing `Nesting Camp Cookware Organizer` | Cookware Accessories | Preview Outdoor Kit | Neutral cookware/tableware organizer for packing and separation | Source-backed material and size fields available; enough for preview-level factual copy | Seed had single `Standard` size; preview can stay single-variant until sourcing refines | Self-owned image or placeholder only; no supplier-image reuse without permission | `source-backed replacement candidate`; supplier/source/quote/MOQ exist; live-stage sample/logistics evidence still incomplete | Preview price can be shown as placeholder; not ready for live margin lock | Food-contact and heat/performance claims unsupported; image right still limited | No food-safe, heat-resistant, cookware performance, or certification claim | `public preview` | Operations + supply chain for image rights, sample receiving, and logistics before live pilot |
| `OG-CA-02` | `Nesting Pot Protector Set` | Cookware Accessories | Preview Outdoor Kit | Concept accessory for cookware separation | No verified supplier facts yet | Not fixed | Placeholder only | `conceptual only`; no real source | Placeholder only | No commercial proof | No heat protection, scratch prevention guarantee, or food-contact claim | `placeholder only` | Supply-chain coordinator to source first real candidate |
| `OG-CA-03` | `Compact Utensil Roll` | Cookware Accessories | Preview Outdoor Kit | Concept utensil organizer | No verified supplier facts yet | Not fixed | Placeholder only | `conceptual only`; no real source | Placeholder only | No commercial proof | No food-safe, cutlery retention, or travel-performance claim | `placeholder only` | Supply-chain coordinator to source first real candidate |
| `OG-TR-01` | `OG-TR-R1 Small Utility Tool Pouch` replacing `Trail Repair Pouch` | Trail Repair & Utility Pouches | Preview Outdoor Kit | Neutral utility pouch for cords, patches, and small accessories | Source-backed material/size fields exist; final single display size still needs locking | Seed had `Forest` and `Slate`; final replacement should be exposed as one controlled preview spec until size is fixed | Self-owned image or placeholder only; no supplier-image reuse without permission | `source-backed replacement candidate`; supplier/source/quote/MOQ exist; final sample/logistics evidence still incomplete | Preview price can be shown as placeholder; not ready for live margin lock | Must avoid tactical/emergency/repair-result framing; final size version not yet frozen | No tactical, emergency, first-aid, repair outcome, or protective-performance claim | `public preview` | Supply chain + selection analyst to lock final displayed size/spec; operations for logistics before live pilot |
| `OG-TR-02` | `Zipper Pull & Cord Keeper Set` | Trail Repair & Utility Pouches | Preview Outdoor Kit | Concept utility accessory set | No verified supplier facts yet | Not fixed | Placeholder only | `conceptual only`; no real source | Placeholder only | No commercial proof | No field-repair outcome, survival, emergency, or tensile-performance claim | `placeholder only` | Supply-chain coordinator to source first real candidate |
| `OG-TR-03` | `Compression Strap Keeper Set` | Trail Repair & Utility Pouches | Preview Outdoor Kit | Concept pack-organization accessory | No verified supplier facts yet | Not fixed | Placeholder only | `conceptual only`; no real source | Placeholder only | No commercial proof | No load security, emergency, or repair-result claim | `placeholder only` | Supply-chain coordinator to source first real candidate |

## Final operating rules

- Preview taxonomy must use `Trail Repair & Utility Pouches`, not the older `Trail Accessories` bucket used by the seed script.
- `public preview` only means customer-facing preview eligibility. It does not mean buyable, margin-approved, or logistics-ready.
- No slot is currently `live pilot ready` because image authorization, sample receipt/inspection, after-sales boundaries, and logistics scope remain incomplete.
- Any slot with missing source-backed commercial facts remains `placeholder only` even if the concept is directionally approved.

## Residual owner/actions after this matrix

| Topic | Owner | Next action |
| --- | --- | --- |
| Supplier image authorization | Supply-chain coordinator | Obtain written image-use permission or replace with owned assets |
| Sample receipt and inspection evidence | Supply-chain coordinator | Send sample, record arrival date, and log inspection result |
| Logistics scope and DDU/DDP | Operations director + supply-chain coordinator | Fix preview-country scope, carrier path, and delivery promise language |
| `OG-CS-R1` net weight and wording conflict | Supply-chain coordinator | Sample-weigh and reconcile `Waterproof` wording before any upgrade beyond placeholder |
| `OG-TR-R1` final displayed size/spec | Supply-chain coordinator + selection analyst | Freeze one external display spec before merchandising expansion |
