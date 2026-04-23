#!/usr/bin/env bash
# Print the first outdoor-gear draft product setup checklist.

set -euo pipefail

PRODUCT_HANDLE="${PRODUCT_HANDLE:-trail-camp-starter-kit}"
PRODUCT_TITLE="${PRODUCT_TITLE:-Trail Camp Starter Kit}"
PRODUCT_TYPE="${PRODUCT_TYPE:-Outdoor Gear}"
PRODUCT_TAGS="${PRODUCT_TAGS:-camping,hiking,outdoor-gear}"
PRODUCT_SKU="${PRODUCT_SKU:-OG-STARTER-KIT-01}"

cat <<EOF
=== Outdoor Gear Preview Product Setup ===

Create a draft Shopify product with these fields:

Title:        ${PRODUCT_TITLE}
Handle:       ${PRODUCT_HANDLE}
Product type: ${PRODUCT_TYPE}
Tags:         ${PRODUCT_TAGS}
Status:       draft
SKU:          ${PRODUCT_SKU}
Price:        0.00 until sourcing and margin are approved
Inventory:    0 until stock is confirmed

Recommended metafields:

Namespace: product_info
Key: sample_verified      Type: boolean  Value: false
Key: sourcing_verified    Type: boolean  Value: false
Key: compliance_checked   Type: boolean  Value: false
Key: preview_only         Type: boolean  Value: true

Preview requirements:

1. The product remains draft or preview-only until supplier, compliance, and margin checks pass.
2. No purchase CTA should be visible before inventory and shipping rules are approved.
3. Use an email capture or inquiry CTA as the only conversion action during preview.
EOF
