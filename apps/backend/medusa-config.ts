import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const workerMode = process.env.MEDUSA_WORKER_MODE
const adminCorsOrigins = [
  "https://paperclip-hth-outdoor-gear-shop-admin.hqkj.com",
]
const adminAllowedHosts = [
  "paperclip-hth-outdoor-gear-shop-admin.hqkj.com",
]

const appendCorsOrigins = (
  corsValue: string | undefined,
  requiredOrigins: string[]
) => {
  const origins = new Set(
    (corsValue || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  )

  requiredOrigins.forEach((origin) => origins.add(origin))

  return Array.from(origins).join(",")
}

const appendAllowedHosts = (
  allowedHosts: true | string[] | undefined,
  requiredHosts: string[]
) => {
  if (allowedHosts === true) {
    return true
  }

  const hosts = new Set(allowedHosts || [])

  requiredHosts.forEach((host) => hosts.add(host))

  return Array.from(hosts)
}

const cloudflareRocketLoaderBypassPlugin = {
  name: "admin-cloudflare-rocket-loader-bypass",
  transformIndexHtml: {
    order: "post" as const,
    handler: (html: string) =>
      html.replace(/<script(?![^>]*\bdata-cfasync=)/g, '<script data-cfasync="false"'),
  },
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    workerMode:
      workerMode === "server" || workerMode === "worker" || workerMode === "shared"
        ? workerMode
        : "shared",
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: appendCorsOrigins(process.env.ADMIN_CORS, adminCorsOrigins),
      authCors: appendCorsOrigins(process.env.AUTH_CORS, adminCorsOrigins),
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: process.env.MEDUSA_ADMIN_DISABLED === "true",
    path: "/app",
    vite: (config) => ({
      server: {
        allowedHosts: appendAllowedHosts(
          config.server?.allowedHosts,
          adminAllowedHosts
        ),
      },
      plugins: [cloudflareRocketLoaderBypassPlugin],
    }),
  }
})
