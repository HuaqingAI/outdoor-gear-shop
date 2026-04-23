# Outdoor Gear Shopify Store

Shopify store workspace for outdoor gear, camping equipment, and trail accessories.

- **Store URL**: TBD after Shopify shop creation
- **GitHub**: https://github.com/HuaqingAI/outdoor-gear-shop

## Project Structure

```
/
├── theme/          # Shopify theme workspace or submodule placeholder
├── scripts/        # Automation and Shopify Admin API checks
├── docs/           # Store launch docs, product scope, brand guidelines
└── assets/         # Product images and brand assets
```

## Getting Started

1. Install the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli).
2. Copy `.env.example` to `.env` and fill in the real Shopify app credentials.
3. Run `bash scripts/shopify-auth-check.sh` after the Shopify store exists.
4. Initialize the theme workspace in `theme/` using Shopify CLI or convert it to a git submodule once a separate theme repo is approved.

## Git Workflow

- Before making changes, run `git fetch origin && git pull --ff-only`.
- Commit and push delivery changes; do not leave required work only in a local worktree.
- Keep `.env` and other credentials out of git.
- If `theme/` becomes a git submodule, commit theme changes in the theme repo first, then update and commit the parent repo submodule pointer.

## Current Scope

This repo starts as a lightweight parent project modeled after `copper-teaware`, but for an outdoor equipment Shopify store. The initial phase is setup and planning only: no store domain, product catalog, payment setup, or publishable theme has been configured yet.
