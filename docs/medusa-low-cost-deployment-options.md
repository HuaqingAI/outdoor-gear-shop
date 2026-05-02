# MedusaJS Low-Cost Deployment Options

This note records the deployment tradeoffs for the current MedusaJS direction.

## Short Answer

Yes, but the low-cost path means self-hosting and accepting higher operations
complexity.

- Medusa can be deployed at relatively low monthly cost on self-managed infrastructure.
- Medusa Cloud is not the low-cost option for a live store. Its official pricing starts at `Develop: $29/mo`, `Launch: $99/mo`, `Scale: $299/mo`.
- The selected direction for this project is MedusaJS, so the key decision is whether to self-host or pay for Medusa Cloud.

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
- More setup work than a hosted commerce platform
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
- Still more moving parts than a hosted commerce platform
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
- Not the lowest-cost option for the trial phase

## Railway Note

Railway currently documents:

- Trial accounts get a one-time `$5` credit
- Hobby plan is `"$5 a month"` and is not free

So Railway can be used for a prototype, but it is not a durable free hosting path.

Source:

- Railway pricing: https://docs.railway.com/pricing/plans

## Recommendation For This Project

For an early low-cost Medusa test, use a self-hosted stack first and move to a
managed option only when operations cost becomes the bottleneck.

Best Medusa starting point for this project:

- Fly.io app server
- Neon Postgres
- Upstash Redis

That is the lowest-cost path that still looks reasonable for a small first launch.

## Important Caveat

Medusa's official production deployment guide describes two application deployments: one in `server` mode and one in `worker` mode. Running everything in a single low-cost setup is possible as an engineering experiment, but that is a cost optimization choice rather than the documented production shape.
