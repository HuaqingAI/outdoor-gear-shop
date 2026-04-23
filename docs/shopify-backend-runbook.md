# Shopify Backend Runbook

## Required Inputs

| Input | Owner | Notes |
| --- | --- | --- |
| Shopify store domain | Board/operator | Example: `outdoor-gear.myshopify.com` |
| Shopify app client ID | Board/operator | Store in `.env`, not in comments |
| Shopify app client secret | Board/operator | Store in `.env`, not in comments |
| Product category and first SKU | Business owner | Needed before catalog setup |
| Shipping market | Business owner | Drives shipping, tax, and compliance work |

## Verification

After credentials are available:

```bash
bash scripts/shopify-auth-check.sh
```

The script should report a successful token exchange and GraphQL shop lookup.

## Preview Guardrails

- Keep products as draft or preview-only until sourcing and compliance are approved.
- Do not enable checkout until payment, tax, shipping, inventory, returns, and customer support flows are ready.
- Do not publish claims about waterproofing, load capacity, insulation, safety, or certifications without source evidence.
- Keep supplier documents and large binaries under `docs/` or `assets/` with Git LFS where appropriate.
