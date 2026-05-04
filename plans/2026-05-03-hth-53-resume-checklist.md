# HTH-53 Resume Checklist

Context: [HTH-53](/HTH/issues/HTH-53) remains blocked by [HTH-59](/HTH/issues/HTH-59), with current external evidence collection delegated through [HTH-71](/HTH/issues/HTH-71).

Purpose: when `HTH-71` lands, use this checklist to convert the existing SKU admission draft into final `public preview / placeholder only / reject` outcomes for all 9 candidate SKUs without replaying the whole thread.

## Current decision baseline

- `Trail Camp Starter Kit`: conditional public-preview candidate only
- `Nesting Camp Cookware Organizer`: conditional public-preview candidate only
- `Trail Repair Pouch`: conditional public-preview candidate only
- Remaining 6 candidate SKUs: placeholder-only until stronger evidence arrives

## Evidence required from HTH-71 before reclassification

For each of the 3 conditional public-preview candidates, verify all of the following:

- Supplier identity is specific and attributable
- Source link or procurement source record is preserved
- Quotation is current enough to support target retail math
- MOQ is known
- Ship-from location is known
- Sample status is explicit
- Lead time or replenishment window is explicit
- Image usage right is explicit for preview surfaces

If any one of the above remains missing, the SKU stays `placeholder only`.

## Reclassification rules

- Upgrade to `public preview` only if commercial evidence and image permission are both complete enough for customer-facing preview copy
- Keep as `placeholder only` if supplier/commercial proof is incomplete, image right is missing, or taxonomy/compliance wording is still unresolved
- Mark as `reject` if new evidence introduces category-policy conflict, unsafe claims risk, or structurally unworkable supply terms

## Additional checks before final comment on HTH-53

- Confirm taxonomy uses `Trail Repair & Utility Pouches` rather than the older `Trail Accessories` bucket where applicable
- Preserve banned-claims guidance: no weapon, PPE, medical, survival efficacy, fuel/ignition, or other excluded-risk language
- Separate factual fields from conceptual placeholders in the final admission table
- Name blocker owner for any SKU that still cannot move past placeholder

## Expected output when resumed

- Update the SKU admission matrix with final evidence snapshots
- Post an issue comment on [HTH-53](/HTH/issues/HTH-53) listing all 9 SKUs and their final status:
  - `public preview`
  - `placeholder only`
  - `reject`
- Call out any residual blocker owner if a SKU still cannot move
