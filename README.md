# Outdoor Gear Medusa Store

MedusaJS monorepo for an outdoor gear ecommerce store under
`HuaqingAI/outdoor-gear-shop`.

## Project Structure

```text
/
├── apps/backend       # Medusa v2 backend and admin
├── apps/storefront    # Next.js storefront
├── docs              # launch, scope, and deployment notes
├── assets            # product and brand assets
└── scripts           # local verification helpers
```

## Requirements

- Node.js 20+
- pnpm 10+
- PostgreSQL 15+
- Redis

The Medusa starter was generated with `create-medusa-app@2.14.2` and the
Next.js starter storefront.

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create backend env:

```bash
cp apps/backend/.env.template apps/backend/.env
```

3. Create storefront env:

```bash
cp apps/storefront/.env.template apps/storefront/.env.local
```

4. Update `apps/backend/.env` with a real `DATABASE_URL`, `JWT_SECRET`,
   `COOKIE_SECRET`, and `REDIS_URL`.

5. Run the backend setup:

```bash
cd apps/backend
pnpm medusa db:migrate
pnpm medusa exec ./src/migration-scripts/initial-data-seed.ts
pnpm medusa user -e admin@example.com -p change-me
```

6. Copy the generated publishable API key into
   `apps/storefront/.env.local` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

7. Start local development:

```bash
pnpm dev
```

- Backend/admin: `http://localhost:9000/app`
- Storefront: `http://localhost:8000`

## Docker Preview

For an agent-accessible preview, run the full stack through Docker Compose:

```bash
docker compose up --build
```

Compose starts PostgreSQL, Redis, the Medusa backend, and the Next.js
storefront. It exposes:

- Backend/admin: `http://localhost:9000/app`
- Storefront: `http://localhost:8000`
- PostgreSQL: `localhost:15432`
- Redis: `localhost:16379`

The one-shot `setup` service runs Medusa migrations, ensures the 24-product
public preview catalog baseline, and exports the generated publishable API key
into `.docker-cache/storefront.env` for the storefront. To change exposed host
ports, set `POSTGRES_PORT`, `REDIS_PORT`, `BACKEND_PORT`, or `STOREFRONT_PORT`
before running Compose. The database and Redis defaults avoid common host
conflicts; the application ports stay on `9000` and `8000`.

To verify a running preview catalog:

```bash
pnpm preview:verify-catalog https://paperclip-hth-outdoor-gear-shop.hqkj.com
```

## Current Scope

The repository is now Medusa-first. Legacy hosted-platform scripts, theme
placeholders, and backend API docs have been removed. The seed scripts create a
US preview store with 24 public outdoor gear preview products across shelter,
packs, sleep systems, camp kitchen, apparel, and lighting.

Do not enable real checkout until payment, tax, shipping, inventory, returns,
supplier evidence, and customer support flows are approved.
