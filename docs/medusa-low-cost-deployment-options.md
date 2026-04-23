# MedusaJS Low-Cost Deployment Options

This note answers a practical question for this project: if we do not use Shopify, can we switch to MedusaJS and still keep early deployment costs low?

## Short Answer

Yes, but only with self-hosting and only if we accept higher operations complexity.

- Medusa can be deployed at relatively low monthly cost on self-managed infrastructure.
- Medusa Cloud is not the low-cost option for a live store. Its official pricing starts at `Develop: $29/mo`, `Launch: $99/mo`, `Scale: $299/mo`.
- Shopify Basic currently starts at `$29/month` billed yearly after the temporary intro offer, so Medusa Cloud does not beat Shopify on entry price for a real launch.

## What Medusa Requires in Production

According to the Medusa deployment guide, a deployed Medusa application needs:

1. PostgreSQL
2. Redis
3. Medusa application resources in server and worker mode

The same guide says the hosting plan should offer at least `2 GB RAM` for an optimal production experience.

Sources:

- Medusa deployment guide: https://docs.medusajs.com/learn/deployment/general
- Medusa pricing: https://medusajs.com/pricing/

## Practical Cost Shapes

### Option A: Cheapest acceptable experiment

Use:

- App server on Fly.io with 2 GB shared CPU instance
- PostgreSQL on Neon free plan
- Redis on Upstash free plan

Observed official prices:

- Fly.io shared-cpu-1x 2 GB: about `$12.83/month` in the displayed pricing table
- Neon Free: `$0/month`
- Upstash Redis Free: `$0/month`

Expected monthly cost:

- Roughly `$13/month` plus network/storage overages

Tradeoffs:

- Lowest realistic cost if traffic is very small
- More setup work than Shopify
- Not the cleanest production shape because Medusa officially describes separate server and worker deployments

### Option B: Low-friction managed stack

Use:

- Render web service
- Render Postgres
- Render Key Value

Observed official prices:

- Web service Starter: `$7/month`
- Postgres Basic-256mb: `$6/month`
- Key Value Starter: `$10/month`

Expected monthly cost:

- Roughly `$23/month`

Tradeoffs:

- Operationally simpler than stitching together multiple vendors
- Still more moving parts than Shopify
- If we follow Medusa's 2 GB recommendation, a larger app instance may be more appropriate than the 512 MB Starter plan

### Option C: Single-VM self-host

Use:

- One small VM running app + worker, with managed or local Postgres/Redis depending on tolerance for ops

Observed official prices:

- DigitalOcean Basic Droplet 2 GB / 1 vCPU: `$12/month`
- Hetzner shared-vCPU CX22: `EUR 3.79/month` in the EU launch announcement

Tradeoffs:

- Best raw cost control
- Highest ops burden
- Backups, monitoring, security patching, Redis/Postgres reliability, and deploy safety become our responsibility

### Option D: Medusa Cloud

Observed official pricing:

- Develop: `from $29/mo`
- Launch: `from $99/mo`

Takeaway:

- Good if we want Medusa without self-hosting pain
- Not a low-cost replacement for Shopify Basic in the trial phase

## Railway Note

Railway currently documents:

- Trial accounts get a one-time `$5` credit
- Hobby plan is `"$5 a month"` and is not free

So Railway can be used for a prototype, but it is not a durable free hosting path.

Source:

- Railway pricing: https://docs.railway.com/pricing/plans

## Recommendation For This Project

For an early low-cost test, there are only two rational paths:

1. Stay on Shopify if the goal is fastest launch with minimal infrastructure work.
2. Use Medusa only if we specifically want code ownership and are willing to manage backend infrastructure.

My recommendation:

- If the goal is `fast validation with the least ops`, keep Shopify.
- If the goal is `own the commerce backend and avoid Shopify lock-in`, use Medusa with a self-hosted low-cost stack.

Best Medusa starting point for this project:

- Fly.io app server
- Neon Postgres
- Upstash Redis

That is the lowest-cost path that still looks reasonable for a small first launch.

## Important Caveat

Medusa's official production deployment guide describes two application deployments: one in `server` mode and one in `worker` mode. Running everything in a single low-cost setup is possible as an engineering experiment, but that is a cost optimization choice rather than the documented production shape.
