#!/usr/bin/env bash
# Verify required Medusa env files and variables without printing secrets.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_ENV="$ROOT_DIR/apps/backend/.env"
STOREFRONT_ENV="$ROOT_DIR/apps/storefront/.env.local"

missing_files=()
if [[ ! -f "$BACKEND_ENV" ]]; then
  missing_files+=("apps/backend/.env")
fi
if [[ ! -f "$STOREFRONT_ENV" ]]; then
  missing_files+=("apps/storefront/.env.local")
fi

if [[ "${#missing_files[@]}" -gt 0 ]]; then
  echo "Missing required env files:" >&2
  printf ' - %s\n' "${missing_files[@]}" >&2
  echo >&2
  echo "Next step: copy the matching .env.template files and fill real values." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$BACKEND_ENV"
# shellcheck disable=SC1090
source "$STOREFRONT_ENV"
set +a

required_vars=(
  DATABASE_URL
  REDIS_URL
  JWT_SECRET
  COOKIE_SECRET
  STORE_CORS
  ADMIN_CORS
  AUTH_CORS
  NEXT_PUBLIC_MEDUSA_BACKEND_URL
  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  NEXT_PUBLIC_DEFAULT_REGION
  NEXT_PUBLIC_BASE_URL
)

missing_vars=()
for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    missing_vars+=("$var_name")
  fi
done

if [[ "${#missing_vars[@]}" -gt 0 ]]; then
  echo "Missing required Medusa environment variables:" >&2
  printf ' - %s\n' "${missing_vars[@]}" >&2
  exit 1
fi

echo "Medusa env check: ok"
echo "Backend env: apps/backend/.env"
echo "Storefront env: apps/storefront/.env.local"
