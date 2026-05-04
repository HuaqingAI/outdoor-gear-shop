import { NextRequest, NextResponse } from "next/server"

const roleLabels: Record<string, string> = {
  main: "Main preview",
  detail: "Detail view",
  context: "Field context",
  scale: "Scale reference",
}

const palettes = [
  ["#17261f", "#6f866f", "#eef4ed", "#d7dfd5"],
  ["#1d2f33", "#8aa39a", "#eef5f4", "#cbdad7"],
  ["#2f2b21", "#9a8462", "#f4f0e8", "#ded4bf"],
  ["#202b3a", "#7c8fa7", "#f0f4f8", "#d2dce8"],
  ["#2b2623", "#9b7a5f", "#f6f0ea", "#dfd0c3"],
  ["#243128", "#7d946e", "#f2f6ef", "#d4dfca"],
]

function hashText(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatHandle(handle: string) {
  return handle
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ handle: string; role: string }> }
) {
  const params = await props.params
  const handle = decodeURIComponent(params.handle || "preview-product")
  const rawRole = decodeURIComponent(params.role || "main").replace(/\.svg$/i, "")
  const role = roleLabels[rawRole] ? rawRole : "main"
  const palette = palettes[hashText(handle) % palettes.length]
  const accentRotation = hashText(`${handle}-${role}`) % 360
  const title = escapeXml(formatHandle(handle))
  const label = escapeXml(roleLabels[role])

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500" role="img" aria-labelledby="title desc">
  <title id="title">${title} - ${label}</title>
  <desc id="desc">Product-scoped preview placeholder image for ${title}.</desc>
  <rect width="1200" height="1500" fill="${palette[2]}"/>
  <path d="M0 1050 C230 930 330 1010 520 900 C725 780 845 850 1200 620 L1200 1500 L0 1500 Z" fill="${palette[3]}"/>
  <path d="M0 1120 C280 1000 420 1080 640 960 C820 862 980 910 1200 810 L1200 1500 L0 1500 Z" fill="${palette[1]}" opacity="0.55"/>
  <g transform="rotate(${accentRotation} 600 650)" opacity="0.16">
    <rect x="140" y="180" width="920" height="920" rx="96" fill="none" stroke="${palette[0]}" stroke-width="42"/>
    <path d="M290 820 L515 540 L650 700 L780 500 L980 820 Z" fill="${palette[0]}"/>
    <circle cx="840" cy="330" r="82" fill="${palette[0]}"/>
  </g>
  <rect x="104" y="106" width="992" height="1288" rx="44" fill="none" stroke="${palette[0]}" stroke-opacity="0.16" stroke-width="4"/>
  <g transform="translate(112 1090)">
    <rect width="976" height="304" rx="32" fill="#ffffff" opacity="0.82"/>
    <text x="48" y="86" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="${palette[1]}" letter-spacing="4">${label.toUpperCase()}</text>
    <text x="48" y="166" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700" fill="${palette[0]}">${title}</text>
    <text x="48" y="230" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${palette[0]}" opacity="0.72">Scoped placeholder - replace with owned or authorized product imagery.</text>
  </g>
</svg>`

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
