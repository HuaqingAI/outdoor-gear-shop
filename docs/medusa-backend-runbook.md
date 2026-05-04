# Medusa Backend Runbook

## Required Inputs

| Input | Owner | Notes |
| --- | --- | --- |
| PostgreSQL database URL | Operator | Store in `apps/backend/.env` |
| Redis URL | Operator | Store in `apps/backend/.env` |
| JWT secret | Operator | Use a long random value |
| Cookie secret | Operator | Use a long random value |
| Storefront base URL | Operator | Defaults to `http://localhost:8000` locally |
| Admin host allowlist | Operator | `paperclip-hth-outdoor-gear-shop-admin.hqkj.com` is added to the admin Vite `server.allowedHosts` |
| Admin CORS origin | Operator | `https://paperclip-hth-outdoor-gear-shop-admin.hqkj.com` is always appended to admin/auth CORS |
| First admin user | Operator | Create with `pnpm medusa user` |
| Worker mode | Operator | `MEDUSA_WORKER_MODE=shared` for preview; use separate `server` and `worker` instances before production |
| Admin enabled flag | Operator | Keep `MEDUSA_ADMIN_DISABLED=false` for preview admin; set true only on worker-only deployments |

## Local Verification

After environment files are available:

```bash
docker compose up -d postgres redis
docker compose ps
bash scripts/medusa-env-check.sh
pnpm install
cd apps/backend
pnpm medusa db:migrate
pnpm medusa user -e admin@example.com -p change-me
```

The initial data seed is included in `pnpm medusa db:migrate` as a Medusa
migration script. After it runs, query or copy the generated publishable API key
from Medusa Admin and set it in `apps/storefront/.env.local` as
`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

Then start development from the repo root:

```bash
pnpm dev
```

Expected local routes:

- Backend/admin: `http://localhost:9000/app`
- Storefront: `http://localhost:8000`
- Local infra: PostgreSQL `localhost:15432`, Redis `localhost:16379`

## Docker Compose Preview

Use Compose when multiple agents need the same accessible store runtime:

```bash
docker compose up --build
```

The stack includes:

- `postgres` on host port `15432`
- `redis` on host port `16379`
- `backend` on host port `9000`
- `storefront` on host port `8000`

The one-shot `setup` service waits for Postgres and Redis, runs
`medusa db:migrate --execute-safe-links`, executes pending migration scripts,
and writes `.docker-cache/storefront.env` with the generated publishable key.
The storefront reads that file before starting so `http://localhost:8000` can
resolve regions and products without manual API-key copy/paste.

Set `POSTGRES_PORT`, `REDIS_PORT`, `BACKEND_PORT`, or `STOREFRONT_PORT` to
change host port mappings. Inside Compose, services should keep using
`postgres`, `redis`, and `backend` service names rather than `localhost`.

If the system Docker daemon is installed but the current user cannot access
`/var/run/docker.sock`, either add that user to the `docker` group or run a
rootless Docker daemon and set `DOCKER_HOST` before calling `docker compose`.

Deployment preview notes:

- The backend appends the hosted admin origin
  `https://paperclip-hth-outdoor-gear-shop-admin.hqkj.com` to both
  `ADMIN_CORS` and `AUTH_CORS` at runtime, so admin page requests and login
  calls are allowed even if an environment override omits it.
- The hosted admin host
  `paperclip-hth-outdoor-gear-shop-admin.hqkj.com` is added to the Medusa admin
  Vite `server.allowedHosts` in `medusa-config.ts`. Compose also sets
  `__MEDUSA_ADMIN_ADDITIONAL_ALLOWED_HOSTS` for Medusa's internal admin bundler
  host allowlist.
- `apps/backend/package.json` exposes `pnpm predeploy`, which runs
  `medusa db:migrate` before a deployment starts serving traffic.
- `MEDUSA_WORKER_MODE=shared` is acceptable for the controlled preview. Use
  `MEDUSA_WORKER_MODE=server` and `MEDUSA_WORKER_MODE=worker` in separate
  Medusa processes before live selling.
- Redis must be reachable at `REDIS_URL`; otherwise the backend can answer basic
  requests but will emit Redis connection errors and is not an acceptable
  preview runtime.
- Keep `NEXT_PUBLIC_STOREFRONT_PREVIEW_MODE=true` for this phase. Setting it to
  `false` re-enables live ordering UI paths and must wait for explicit checkout
  approval.

## Admin And Operations Hand-Off

| Item | Current path |
| --- | --- |
| Admin URL | `http://localhost:9000/app` locally |
| Admin user command | `cd apps/backend && pnpm medusa user -e <email> -p <temporary-password>` |
| Publishable key | Created by seed as `Outdoor Gear Storefront Key`; copy from Medusa Admin API key settings into `apps/storefront/.env.local` |
| Product sample verification | Store on product metadata as `product_info.sample_verified=false` until a custom admin form is added |
| Hero and navigation | Currently code-backed in the storefront, not Medusa Admin-managed |
| Analytics | No GA4 injection is wired yet; add an env-backed storefront integration after the Measurement ID is provided |

## Preview Guardrails

- Keep payment and shipping providers as manual placeholders until operations are approved.
- Keep storefront preview mode enabled; no UI should present manual payment or
  manual shipping as a real transaction capability.
- Do not publish claims about waterproofing, load capacity, insulation, safety, or certifications without source evidence.
- Keep supplier documents and large binaries under `docs/` or `assets/` with Git LFS where appropriate.
- Replace starter imagery and sample product data before public launch.
