# HTH-83 Preview SKU Operations Matrix

Created: 2026-05-03 20:26 CST
Owner: 选品分析师
Source issue: [HTH-83](/HTH/issues/HTH-83)
Parent issue: [HTH-82](/HTH/issues/HTH-82)

## Purpose

This file converts the current 9 preview SKU slots into a reusable selection/operations matrix for later merchandising decisions.

It does not block the current seed/mock implementation in [HTH-81](/HTH/issues/HTH-81). It exists to separate:

- what the current preview seed is already rendering
- what operations should treat as the real admission/status baseline

## Primary sources

- Preview seed data in [apps/backend/src/migration-scripts/initial-data-seed.ts](/data/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/apps/backend/src/migration-scripts/initial-data-seed.ts:380)
- Final admission matrix in [plans/2026-05-03-hth-53-final-sku-admission-matrix.md](/data/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-03-hth-53-final-sku-admission-matrix.md:1)
- Supply-chain consolidation in [plans/2026-05-03-hth-59-supply-chain-consolidation.md](/data/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-03-hth-59-supply-chain-consolidation.md:1)

## Operating assumptions

- `target user`, `core scenario`, `demand hypothesis`, and `content keywords` below are selection-side working assumptions inferred from the current seed copy and the admission matrix. They are not customer-validated facts.
- Where a source-backed replacement exists, use the replacement identity instead of the older seed identity.
- `public preview` means customer-facing preview eligibility only. It does not mean buyable, sample-approved, or live-pilot ready.
- `priority sourcing` below is a next-round selection lane, not an admission status.

## Alignment note for current preview seed

Current mock data still exposes two slots more optimistically than the final operations baseline:

- `OG-CS-01` is seeded as `public_preview` in the preview catalog, but operations should still treat it as `placeholder only` until net weight, wording conflict, and image rights are resolved.
- `OG-CS-02` is seeded as `public_preview` in the preview catalog, but operations should still treat it as `placeholder only` because there is no real source-backed candidate yet.

This mismatch is acceptable for the current mock/preview workstream, but the admission baseline below should be used for future merchandising, sourcing follow-up, and content approvals.

## SKU operations matrix

| Slot | Current identity for operations | Target user | Core use scenario | Category / collection | Demand hypothesis | Alternative / competitor direction | Content keywords | Neutral preview copy allowed now | Copy that must wait for sample or supplier proof | Forbidden claims | Risk notes | Final admission | Next-round sourcing lane |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `OG-CS-01` | `OG-CS-R1 Kinggear Collapsible Camping Tool Bag` | Car campers and basecamp organizers who want one soft organizer for setup tools and loose camp accessories | Keep camp setup pieces visible and grouped during packing, transport, and setup teardown | `Camp Storage` / `Camp Organization Preview` | A neutral organizer-bag angle is more defensible than a bundled `starter kit` claim and can serve as the category anchor if wording is reconciled | Soft gear tote, camp organizer bag, trunk organizer insert, setup-tool bag | camp organizer bag, gear tote, tool bag, collapsible storage, setup storage | organizer bag, grouped camp storage, collapsible format, setup accessory storage, packing visibility | waterproof or water-resistant language, exact net weight, durability outcome, carry-capacity claims, complete-kit language, supplier-image-led feature copy | waterproof guarantee, heavy-duty, weatherproof, load-bearing, complete kit, durability promise | Source-backed candidate exists, but wording conflict, net-weight gap, and image-right gap still block upgrade | `placeholder only` | `priority sourcing/reconciliation` |
| `OG-CS-02` | `Hanging Camp Shelf Organizer` | Tent and vehicle campers who want vertical separation for small soft goods | Hang small camp items inside a tent, vehicle, or camp corner to reduce clutter | `Camp Storage` / `Camp Organization Preview` | A vertical-storage format tests a different organization need than a tote or pouch set and is worth sourcing if the category stays active | Hanging closet organizer, tent shelf organizer, seatback organizer, vertical camp storage | hanging camp shelf, vertical storage, tent organizer, camp shelf organizer, small-item storage | hanging organizer, shelf-style storage concept, separates small items, vertical organization | attachment method, load capacity, number of tiers, no-sag language, tent-fit compatibility, weather exposure language | load-bearing, freestanding, no-sag, weatherproof, universal fit | No source-backed candidate; current mock labeling is more optimistic than real ops status | `placeholder only` | `priority sourcing` |
| `OG-CS-03` | `Camp Essentials Pouch Set` | Campers who want to split toiletries, cords, utensils, or other small items by task | Use multiple small pouches to sort camp essentials inside a tote, bin, or duffel | `Camp Storage` / `Camp Organization Preview` | Modular pouch demand matters only if visitors want more flexible grouping than a single organizer bag | Accessory pouch set, packing cube mini-set, ditty bag set, modular storage pouches | essentials pouch set, modular storage, small-item organizer, camp pouches, grouped packing | pouch set concept, grouped storage, sort-by-task organization, small essentials storage | piece count, closure security, waterproofing, use-specific bundle language, durability or protective language | waterproof, smell-proof, first-aid, emergency, complete set, protective performance | No source-backed candidate and weaker differentiation than `OG-CS-01` or `OG-CS-02` | `placeholder only` | `hold` |
| `OG-CA-01` | `OG-CA-R1 Camping Tableware Hanging Bag` | Car campers and outdoor hosts who want cleaner tableware organization in a camp kitchen setup | Store or hang utensils, napkins, or lightweight tableware pieces in one soft organizer | `Cookware Accessories` / `Camp Kitchen Preview` | Neutral tableware-organization copy is strong enough for preview interest capture without leaning on performance claims | Tableware organizer bag, picnic utensil carrier, hanging kitchen organizer, soft divider bag | camp kitchen organizer, tableware bag, utensil storage, hanging kitchen bag, kitchen packing | tableware organization, stitched dividers, hanging bag, clean packing separation, camp kitchen storage | food-safe language, heat resistance, cookware-fit claims, washability promises, certification wording, supplier-image-specific feature claims | food-safe, BPA-free, heat-resistant, cookware protection, certification, hygienic guarantee | Best-supported category candidate, but image rights and logistics proof still incomplete for live pilot | `public preview` | `maintain preview` |
| `OG-CA-02` | `Nesting Pot Protector Set` | Campers who want quieter and neater cookware packing between nested pieces | Separate stacked pans, plates, or bowls during packing and storage | `Cookware Accessories` / `Camp Kitchen Preview` | Stack-separation may become the clearest second concept in this category if framed as organization rather than protection | Pot separator pads, pan dividers, soft cookware separators, felt-style protectors | cookware separator, nesting organizer, soft dividers, packing pads, stacked storage | soft separator, nested storage organization, stack-spacing concept, camp kitchen packing | heat resistance, scratch-prevention language, food-contact safety, exact size/fit claims, non-slip wording | heat protection, scratch-proof, food-contact safe, non-slip, universal cookware fit | No source-backed candidate yet, but concept is easy to understand and complementary to `OG-CA-01` | `placeholder only` | `priority sourcing` |
| `OG-CA-03` | `Compact Utensil Roll` | Minimalist campers who want a low-bulk way to carry a few kitchen tools | Roll and tie a small utensil set for compact kitchen packing | `Cookware Accessories` / `Camp Kitchen Preview` | The roll format matters only if visitors clearly prefer compact carry over a hanging-bag format | Utensil roll organizer, cutlery wrap, roll-up kitchen organizer, compact tool wrap | utensil roll, compact kitchen storage, roll-up organizer, camp cutlery wrap, low-bulk carry | compact roll organizer, utensil storage, low-bulk packing, roll-up format | utensil count, retention security, washability, food-contact safety, knife-safe or travel-safe wording | food-safe, secure retention, knife-safe, spill-proof, travel-proof | Highest ambiguity on exact contents and therefore lower sourcing priority than `OG-CA-02` | `placeholder only` | `secondary sourcing` |
| `OG-TR-01` | `OG-TR-R1 Small Utility Tool Pouch` | Hikers and car campers who want to corral cords, patches, and small setup accessories in one place | Keep small utility items together in a pack, glove box, or camp bin | `Trail Repair & Utility Pouches` / `Trail Utility Preview` | A neutral `utility pouch` angle can carry category demand without drifting into tactical or repair-outcome language | Small accessory pouch, zip utility pouch, cable pouch, organizer pouch | utility pouch, small organizer, accessory pouch, zip pouch, trail setup storage | small utility pouch, grouped accessories, zipper closure, compact storage, pack or vehicle organization | final display size/spec, waterproofing, protective padding, repair-result framing, sample-based quality claims | tactical, emergency, first-aid, repair outcome, waterproof, protective performance | Public-preview eligible, but final display spec and logistics proof are still incomplete | `public preview` | `maintain preview` |
| `OG-TR-02` | `Zipper Pull & Cord Keeper Set` | Users who lose loose zipper pulls, paracord ends, or other small replaceable bits | Keep tiny cord and zipper-related accessories together as an add-on organization set | `Trail Repair & Utility Pouches` / `Trail Utility Preview` | This is only worth sourcing if preview notes show explicit demand for replacement-part organization rather than general pouch storage | Zipper pull replacement set, cord keeper tabs, small accessory hardware, pull-tab set | cord keeper set, zipper pull organizer, small accessory keepers, pack parts storage | small accessory set, cord keeping, organization add-on, grouped small parts | included-part counts, material strength, field-repair outcome, replacement compatibility, tensile language | repair fix, emergency spare, heavy-duty, tensile strength, universal compatibility | Ambiguous assortment and easy drift into repair-performance claims | `placeholder only` | `secondary sourcing` |
| `OG-TR-03` | `Compression Strap Keeper Set` | Backpack and duffel users annoyed by loose webbing and dangling straps | Tidy loose straps on packs, bins, or camp bags for cleaner storage | `Trail Repair & Utility Pouches` / `Trail Utility Preview` | Strap-management is a broader and safer organization angle than `repair` language and may outperform `OG-TR-02` as a follow-on concept | Strap keeper bands, elastic webbing keepers, pack strap organizers, webbing loops | strap keeper, webbing organizer, pack tidy, strap management, loose-strap control | strap organization, cleaner pack setup, loop keepers, webbing management | compatibility, grip reliability, retention strength, load-security claims, compression-performance language | load security, no-slip guarantee, compression performance, emergency repair | No source-backed candidate yet, but concept is easier to keep in a neutral organization lane than `OG-TR-02` | `placeholder only` | `priority sourcing` |

## Category recommendations

### Camp Storage

Recommendation: continue the category, but do not expand slot count yet.

- Use `OG-CS-01` as the category anchor only after wording/image-right reconciliation.
- Source one real vertical-storage candidate for `OG-CS-02` before adding any fourth concept.
- Keep `OG-CS-03` on hold until there is evidence that customers want modularity over a single-bag format.

### Cookware Accessories

Recommendation: continue the category with one public-preview anchor and one clear next sourcing test.

- Keep `OG-CA-01` as the customer-facing preview anchor.
- Make `OG-CA-02` the next sourcing priority because it tests a distinct stack-separation use case with relatively manageable compliance risk.
- Keep `OG-CA-03` as secondary until there is explicit signal for a compact roll format.

### Trail Repair & Utility Pouches

Recommendation: continue narrowly around neutral organization, not around `repair` or `tactical` semantics.

- Keep `OG-TR-01` as the category anchor for preview traffic and interest capture.
- Make `OG-TR-03` the next sourcing priority because strap management is broader and safer than a replacement-parts set.
- Treat `OG-TR-02` as secondary until users explicitly ask for zipper-pull or cord-part organization.

## Minimum content rules for future ops use

- Keep all live preview copy in an `organization / storage / grouping / separation` lane.
- Do not reuse the original seed names `Trail Camp Starter Kit`, `Nesting Camp Cookware Organizer`, or `Trail Repair Pouch` as if they are factual public product identities.
- Do not treat preview seed `preview_tier` values as the final operations truth when they conflict with the admission matrix.
- Any upgrade beyond `public preview` requires sample receipt, image rights clarity, and logistics scope confirmation.
