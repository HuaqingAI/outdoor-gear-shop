# Medusa Backend Runbook

## Required Inputs

| Input | Owner | Notes |
| --- | --- | --- |
| PostgreSQL database URL | Operator | Store in `apps/backend/.env` |
| Redis URL | Operator | Store in `apps/backend/.env` |
| JWT secret | Operator | Use a long random value |
| Cookie secret | Operator | Use a long random value |
| Storefront base URL | Operator | Defaults to `http://localhost:8000` locally |
| First admin user | Operator | Create with `pnpm medusa user` |

## Local Verification

After environment files are available:

```bash
bash scripts/medusa-env-check.sh
pnpm install
cd apps/backend
pnpm medusa db:migrate
pnpm medusa exec ./src/migration-scripts/initial-data-seed.ts
```

Then start development from the repo root:

```bash
pnpm dev
```

Expected local routes:

- Backend/admin: `http://localhost:9000/app`
- Storefront: `http://localhost:8000`

## Preview Guardrails

- Keep payment and shipping providers as manual placeholders until operations are approved.
- Do not publish claims about waterproofing, load capacity, insulation, safety, or certifications without source evidence.
- Keep supplier documents and large binaries under `docs/` or `assets/` with Git LFS where appropriate.
- Replace starter imagery and sample product data before public launch.
