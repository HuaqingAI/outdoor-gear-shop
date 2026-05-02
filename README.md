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

## Current Scope

The repository is now Medusa-first. Legacy hosted-platform scripts, theme
placeholders, and backend API docs have been removed. The seed script creates a
US preview store with initial outdoor categories and sample products for camp
storage, cookware accessories, and trail repair.

Do not enable real checkout until payment, tax, shipping, inventory, returns,
supplier evidence, and customer support flows are approved.
