#!/usr/bin/env bash
# Verify Shopify Admin API authentication without printing reusable secrets.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
API_VERSION="${SHOPIFY_API_VERSION:-2025-01}"

if [[ -f "$ROOT_DIR/.env" ]]; then
  # shellcheck disable=SC1091
  source "$ROOT_DIR/.env"
fi

: "${SHOPIFY_STORE_DOMAIN:?Set SHOPIFY_STORE_DOMAIN, for example outdoor-gear.myshopify.com}"

SHOPIFY_STORE_DOMAIN="${SHOPIFY_STORE_DOMAIN#https://}"
SHOPIFY_STORE_DOMAIN="${SHOPIFY_STORE_DOMAIN#http://}"
SHOPIFY_STORE_DOMAIN="${SHOPIFY_STORE_DOMAIN%/}"
SHOPIFY_CLIENT_ID="${SHOPIFY_CLIENT_ID:-}"
SHOPIFY_CLIENT_SECRET="${SHOPIFY_CLIENT_SECRET:-}"
SHOPIFY_ADMIN_API_TOKEN="${SHOPIFY_ADMIN_API_TOKEN:-}"

if [[ -z "$SHOPIFY_ADMIN_API_TOKEN" ]]; then
  : "${SHOPIFY_CLIENT_ID:?Set SHOPIFY_CLIENT_ID or SHOPIFY_ADMIN_API_TOKEN}"
  : "${SHOPIFY_CLIENT_SECRET:?Set SHOPIFY_CLIENT_SECRET or SHOPIFY_ADMIN_API_TOKEN}"
fi

json_get() {
  python3 - "$1" <<'PY'
import json
import sys

path = sys.argv[1].split(".")
data = json.load(sys.stdin)
for key in path:
    if isinstance(data, dict):
        data = data.get(key)
    else:
        data = None
        break
print("" if data is None else data)
PY
}

request_token() {
  curl -sS \
    -X POST "https://${SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode "client_id=${SHOPIFY_CLIENT_ID}" \
    --data-urlencode "client_secret=${SHOPIFY_CLIENT_SECRET}"
}

graphql_check() {
  local token="$1"
  local response
  local body
  local status

  response="$(
    curl -sS -w '\n%{http_code}' \
      -X POST "https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json" \
      -H 'Content-Type: application/json' \
      -H "X-Shopify-Access-Token: ${token}" \
      --data '{"query":"query AuthCheck { shop { name myshopifyDomain } products(first: 1) { edges { node { id handle } } } }"}'
  )"

  status="$(printf '%s\n' "$response" | tail -n1)"
  body="$(printf '%s\n' "$response" | sed '$d')"

  if [[ "$status" != "200" ]]; then
    echo "GraphQL check failed: HTTP ${status}" >&2
    printf '%s\n' "$body" >&2
    return 1
  fi

  printf '%s\n' "$body"
}

echo "=== Shopify Admin API auth check ==="
echo "Store: ${SHOPIFY_STORE_DOMAIN}"

if [[ -n "$SHOPIFY_ADMIN_API_TOKEN" ]]; then
  access_token="$SHOPIFY_ADMIN_API_TOKEN"
  echo "Auth mode: legacy access token"
else
  echo "Auth mode: client credentials grant"
  token_response="$(request_token)"
  access_token="$(printf '%s\n' "$token_response" | json_get access_token)"
  if [[ -z "$access_token" ]]; then
    echo "Token exchange failed:" >&2
    printf '%s\n' "$token_response" >&2
    exit 1
  fi
  echo "Token exchange: ok"
fi

graphql_response="$(graphql_check "$access_token")"
shop_name="$(printf '%s\n' "$graphql_response" | json_get data.shop.name)"
shop_domain="$(printf '%s\n' "$graphql_response" | json_get data.shop.myshopifyDomain)"

echo "GraphQL check: ok"
echo "Shop name: ${shop_name}"
echo "Shop domain: ${shop_domain}"
echo "Auth verification completed."
