export type PreviewArticle = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  body: string[]
  seoTitle: string
  seoDescription: string
  date: string
  readTime: string
  image: string
  relatedPath: string
  relatedLabel: string
  relatedHandle: string
  relatedType: "category" | "collection" | "product"
  keywords: string[]
  conversionGoal: string
  bannedWords: string[]
}

export type PreviewEvent = {
  slug: string
  title: string
  status: string
  summary: string
  details: string[]
  date: string
  location: string
  type: string
  image: string
  relatedPath: string
  relatedLabel: string
  relatedHandle: string
  relatedType: "category" | "collection" | "content" | "store"
  conversionGoal: string
  recommendedUtm: {
    source: string
    medium: string
    campaign: string
  }
  trackingPlacement: string
}

export type PreviewPageContent = {
  description: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

export type PreviewCollectionContent = PreviewPageContent & {
  signupDescription: string
}

const defaultPreviewKeywords = [
  "preview catalog",
  "sourcing review",
  "launch updates",
]

export const previewArticles: PreviewArticle[] = [
  {
    slug: "choose-weekend-shelter-kit",
    title: "How to choose a weekend shelter kit",
    eyebrow: "Shelter guide",
    summary:
      "A practical buying note for comparing tents, tarps, footprints, and setup accessories in the preview catalog.",
    body: [
      "A good weekend shelter kit starts with the main sleep space, but it rarely ends there. The preview catalog separates tents, tarps, footprints, and stake kits so visitors can compare the full setup instead of judging one tent card in isolation.",
      "For a two-person trip, the tent handles weather protection and sleep space, while a tarp can create a separate cooking or gear-sorting area. A footprint protects the floor and gives wet gear a cleaner staging point near the entry.",
      "The preview assortment keeps technical weather claims conservative until source documentation is complete. That means the content focuses on size, weight, packed volume, setup role, and how each accessory fits into a real packing list.",
    ],
    seoTitle: "Weekend Shelter Kit Guide | Outdoor Gear Shop",
    seoDescription:
      "Compare preview tents, tarps, footprints, and shelter accessories for weekend camp setups.",
    date: "May 2026 preview",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/tents-shelter-preview",
    relatedLabel: "Tents & Shelter collection",
    relatedHandle: "tents-shelter-preview",
    relatedType: "collection",
    keywords: ["tent buying guide", "camp shelter kit", "tarp setup"],
    conversionGoal:
      "Move shelter-interested visitors into the full tents and shelter collection.",
    bannedWords: ["storm proof", "certified waterproof", "guaranteed"],
  },
  {
    slug: "packing-a-45l-overnight-pack",
    title: "Packing a 45L overnight pack without wasting volume",
    eyebrow: "Packing guide",
    summary:
      "A field note on using cubes, daypacks, and waist packs to keep overnight gear organized.",
    body: [
      "The 45L pack in this preview range is meant to anchor an overnight carry system, but the supporting accessories are what make the browsing experience useful. Packing cubes, waist packs, and dry daypacks each solve a different part of the carry problem.",
      "Visitors comparing pack products should be able to see capacity, pocket structure, and use case at a glance. The storefront now keeps those fields visible on cards and PDPs so the pack category reads like an actual catalog, not a single sample item.",
      "For launch planning, interest in accessories is as important as interest in the main pack. Add-on clicks help identify whether shoppers want a complete packing system or just a primary bag.",
    ],
    seoTitle: "45L Overnight Pack Guide | Outdoor Gear Shop",
    seoDescription:
      "Read preview packing notes for 45L trail packs, packing cubes, dry daypacks, and waist packs.",
    date: "May 2026 preview",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/packs-bags-preview",
    relatedLabel: "Packs & Bags collection",
    relatedHandle: "packs-bags-preview",
    relatedType: "collection",
    keywords: ["45L pack", "packing cubes", "overnight gear"],
    conversionGoal:
      "Drive visitors from educational pack content into packs and bag accessories.",
    bannedWords: ["ultralight certified", "waterproof guarantee"],
  },
  {
    slug: "build-a-sleep-system",
    title: "Building a sleep system from bag, pad, liner, and pillow",
    eyebrow: "Camp comfort",
    summary:
      "A concise guide to reading the sleep-system collection as a set, not as unrelated products.",
    body: [
      "A credible sleep category needs more than one sleeping bag. The preview collection groups bags, pads, pillows, and liners so visitors can understand how comfort, packed size, and care routines fit together.",
      "The PDPs deliberately separate confirmed specs from pending launch policies. Dimensions, materials, and use cases are visible now, while final thermal ratings and warranty details remain follow-up decisions.",
      "This structure lets UX and operations review whether shoppers can browse a full sleep setup without running into empty pages, missing details, or single-image product shells.",
    ],
    seoTitle: "Sleep System Preview Guide | Outdoor Gear Shop",
    seoDescription:
      "Review sleeping bags, pads, pillows, and liners in the Outdoor Gear Shop preview catalog.",
    date: "May 2026 preview",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/sleep-systems-preview",
    relatedLabel: "Sleep Systems collection",
    relatedHandle: "sleep-systems-preview",
    relatedType: "collection",
    keywords: ["sleep system", "camp pad", "sleeping bag liner"],
    conversionGoal:
      "Encourage visitors to browse related sleep products instead of one isolated bag.",
    bannedWords: ["comfort rated", "survival", "guaranteed warmth"],
  },
  {
    slug: "camp-kitchen-packing-checklist",
    title: "Camp kitchen packing checklist for compact meal setups",
    eyebrow: "Kitchen guide",
    summary:
      "A checklist-style note covering cook pots, tableware, organizers, and drinkware in the preview range.",
    body: [
      "Camp kitchen products need clear roles: cooking, eating, organizing, and drinking. The preview collection now gives each role a visible product so the page has enough density to feel like a real category.",
      "The copy avoids unverified food-contact, heat, or dishwasher claims. Instead, it focuses on set count, capacity, storage format, and the reason a shopper might choose one accessory over another.",
      "For acceptance, every card in this category should lead to a PDP with four images, a price, status label, specs, use cases, and a launch-update CTA.",
    ],
    seoTitle: "Camp Kitchen Packing Checklist | Outdoor Gear Shop",
    seoDescription:
      "Browse camp kitchen preview notes for cookware, tableware, hanging organizers, and mug sets.",
    date: "May 2026 preview",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/camp-kitchen-preview",
    relatedLabel: "Camp Kitchen collection",
    relatedHandle: "camp-kitchen-preview",
    relatedType: "collection",
    keywords: ["camp kitchen", "cook pot set", "camp tableware"],
    conversionGoal:
      "Connect checklist readers to the complete camp kitchen collection.",
    bannedWords: ["food safe", "heatproof", "nonstick certified"],
  },
  {
    slug: "layering-for-shoulder-season-camping",
    title: "Layering for shoulder-season camping",
    eyebrow: "Apparel guide",
    summary:
      "A practical guide to using shell, fleece, socks, and sun accessories as a small apparel system.",
    body: [
      "The apparel preview collection is intentionally compact, but it still needs enough variety to look like a shopable system. A shell, fleece, sock set, and cap give visitors a weather-ready starting point without implying the assortment is final.",
      "Each PDP keeps sizing, fit, fabric, and status visible. This is important because apparel pages feel thin quickly when they only show a title and image.",
      "Coming-soon items remain public when they have complete content and a clear notify-only CTA. They should not look broken or out of place beside stocked preview items.",
    ],
    seoTitle: "Shoulder-Season Layering Guide | Outdoor Gear Shop",
    seoDescription:
      "Read preview notes for rain shells, fleece layers, hiking socks, and sun caps.",
    date: "May 2026 preview",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/apparel-layers-preview",
    relatedLabel: "Apparel & Layers collection",
    relatedHandle: "apparel-layers-preview",
    relatedType: "collection",
    keywords: ["camp layering", "rain shell", "grid fleece"],
    conversionGoal:
      "Help visitors evaluate apparel accessories as a coherent preview collection.",
    bannedWords: ["waterproof guaranteed", "medical grade"],
  },
  {
    slug: "camp-lighting-and-visibility-basics",
    title: "Camp lighting and visibility basics",
    eyebrow: "Safety note",
    summary:
      "A conservative overview of headlamps, lanterns, markers, and organizer pouches while compliance gates remain open.",
    body: [
      "Lighting and safety products require careful language. The preview catalog can show the product role, format, and use case while leaving battery documentation, certifications, and medical contents policies to operations follow-up.",
      "That is why coming-soon lighting products still have complete PDPs. Visitors can understand what the item is and request updates, but they are not pushed into a purchase or unsupported claim.",
      "The collection also links back to shelter setup and camp organization, closing the browsing loop instead of leaving events or blog content as dead ends.",
    ],
    seoTitle: "Camp Lighting and Visibility Basics | Outdoor Gear Shop",
    seoDescription:
      "Review preview lighting and visibility accessories with conservative sourcing-review language.",
    date: "May 2026 preview",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/lighting-safety-preview",
    relatedLabel: "Lighting & Safety collection",
    relatedHandle: "lighting-safety-preview",
    relatedType: "collection",
    keywords: ["camp lighting", "headlamp preview", "visibility markers"],
    conversionGoal:
      "Keep safety-adjacent interest measurable without unsupported performance claims.",
    bannedWords: ["life saving", "certified medical", "emergency guaranteed"],
  },
]

export const previewEvents: PreviewEvent[] = [
  {
    slug: "preview-catalog-feedback-window",
    title: "Preview catalog feedback window",
    status: "Open for launch-update requests",
    summary:
      "A rolling online activity window for collecting which product groups should move forward first.",
    details: [
      "Visitors can browse all 24 preview products, then submit launch-update interest from product, collection, cart, or checkout guard surfaces.",
      "The window is online-only. It does not imply public ordering, payment readiness, shipping activation, or a confirmed launch date.",
      "Signals from this activity should be reviewed by collection so the team can decide which categories need real imagery and supplier validation first.",
    ],
    date: "Rolling preview cycle",
    location: "Online",
    type: "Online feedback",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/products",
    relatedLabel: "Full product catalog",
    relatedHandle: "products",
    relatedType: "store",
    conversionGoal:
      "Capture category-level launch-update requests and qualitative interest while the catalog is still in preview.",
    recommendedUtm: {
      source: "content",
      medium: "internal-link",
      campaign: "preview-feedback-window",
    },
    trackingPlacement: "events_feedback_window",
  },
  {
    slug: "camp-shelter-demo-day",
    title: "Camp shelter demo day",
    status: "Scheduling pending",
    summary:
      "A planned shelter-focused demo concept for tents, tarps, footprints, and setup accessories.",
    details: [
      "This event page exists so preview visitors never hit a 404 from an events card. The content owner still needs to approve real dates, location, and partner participation before promotion.",
      "The proposed flow would compare the dome tent, tarp shelter, footprint, and stake kit as a complete camp setup.",
      "Until scheduling is approved, the CTA routes visitors to the shelter collection and launch-update form rather than external registration.",
    ],
    date: "Date to be confirmed",
    location: "Outdoor demo site to be selected",
    type: "In-person concept",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/tents-shelter-preview",
    relatedLabel: "Tents & Shelter collection",
    relatedHandle: "tents-shelter-preview",
    relatedType: "collection",
    conversionGoal:
      "Move shelter-interested visitors into the collection while real event logistics are pending.",
    recommendedUtm: {
      source: "content",
      medium: "internal-link",
      campaign: "camp-shelter-demo-day",
    },
    trackingPlacement: "events_shelter_demo",
  },
  {
    slug: "trail-pack-fit-workshop",
    title: "Trail pack fit workshop",
    status: "Partner confirmation pending",
    summary:
      "A workshop concept for comparing pack volume, daypack carry, and accessory organization.",
    details: [
      "The workshop is a content-ready placeholder for a real operations decision. It gives users a stable event detail page today while avoiding fake registration mechanics.",
      "The proposed session would cover the 45L trail pack, roll-top daypack, waist pack, and packing cube trio.",
      "Visitors can continue into the packs collection and request updates while the team confirms whether this workshop should be scheduled.",
    ],
    date: "Target window: late spring preview",
    location: "Retail or trailhead partner pending",
    type: "Workshop concept",
    image:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/packs-bags-preview",
    relatedLabel: "Packs & Bags collection",
    relatedHandle: "packs-bags-preview",
    relatedType: "collection",
    conversionGoal:
      "Connect event traffic to the carry-system assortment and launch-update queue.",
    recommendedUtm: {
      source: "content",
      medium: "internal-link",
      campaign: "trail-pack-fit-workshop",
    },
    trackingPlacement: "events_pack_workshop",
  },
  {
    slug: "camp-kitchen-preview-night",
    title: "Camp kitchen preview night",
    status: "Content-owner follow-up",
    summary:
      "A camp kitchen concept event for cook pots, tableware, organizers, and insulated mug sets.",
    details: [
      "This detail page closes the events browsing loop while keeping real food-service, venue, and partner decisions out of public claims.",
      "The proposed content would show how cookware, tableware, hanging organizers, and drinkware pack together for compact meal setups.",
      "The current CTA sends visitors to the camp kitchen collection and tracks interest for operations review.",
    ],
    date: "To be scheduled after sourcing review",
    location: "Online or partner camp kitchen setup",
    type: "Product preview concept",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    relatedPath: "/collections/camp-kitchen-preview",
    relatedLabel: "Camp Kitchen collection",
    relatedHandle: "camp-kitchen-preview",
    relatedType: "collection",
    conversionGoal:
      "Route kitchen-content interest into product browsing without unsupported event registration claims.",
    recommendedUtm: {
      source: "content",
      medium: "internal-link",
      campaign: "camp-kitchen-preview-night",
    },
    trackingPlacement: "events_kitchen_preview",
  },
]

export const collectionContentByHandle: Record<
  string,
  PreviewCollectionContent
> = {
  "tents-shelter-preview": {
    description:
      "Shelter products for quick camp setup, weather-aware staging, and accessory backup kits, grouped so visitors can browse a complete shelter system.",
    seoTitle: "Tents & Shelter Preview Collection | Outdoor Gear Shop",
    seoDescription:
      "Browse preview tents, tarps, groundsheets, and shelter setup accessories.",
    keywords: ["tents", "tarps", "shelter accessories"],
    signupDescription:
      "Request launch updates for shelter products while final weather claims and logistics are reviewed.",
  },
  "packs-bags-preview": {
    description:
      "Trail packs, dry daypacks, packing cubes, and quick-access bags for organized outdoor travel and overnight packing.",
    seoTitle: "Packs & Bags Preview Collection | Outdoor Gear Shop",
    seoDescription:
      "Browse preview trail packs, dry daypacks, packing cubes, and waist packs.",
    keywords: ["trail packs", "packing cubes", "dry bags"],
    signupDescription:
      "Request launch updates for pack and bag formats being reviewed for future assortment planning.",
  },
  "sleep-systems-preview": {
    description:
      "Sleeping bags, pads, pillows, and liners grouped as a complete camp sleep system for comfort and packed-size comparison.",
    seoTitle: "Sleep Systems Preview Collection | Outdoor Gear Shop",
    seoDescription:
      "Review preview sleeping bags, pads, pillows, and liners for camp sleep systems.",
    keywords: ["sleeping bags", "sleeping pads", "camp pillows"],
    signupDescription:
      "Request launch updates for sleep-system products while thermal documentation remains under review.",
  },
  "camp-kitchen-preview": {
    description:
      "Cookware, tableware, organizers, and drinkware for compact camp meal setups with conservative sourcing-review language.",
    seoTitle: "Camp Kitchen Preview Collection | Outdoor Gear Shop",
    seoDescription:
      "Explore camp kitchen preview products including cookware, tableware, organizers, and mug sets.",
    keywords: ["camp kitchen", "cookware", "tableware"],
    signupDescription:
      "Request launch updates for kitchen packing formats being reviewed for future assortment planning.",
  },
  "apparel-layers-preview": {
    description:
      "Rain shells, fleece layers, socks, and sun accessories grouped for changing camp and trail conditions.",
    seoTitle: "Apparel & Layers Preview Collection | Outdoor Gear Shop",
    seoDescription:
      "Browse preview outdoor apparel layers, rain shells, fleece, socks, and caps.",
    keywords: ["rain shell", "fleece layer", "hiking socks"],
    signupDescription:
      "Request launch updates for apparel products while sizing, imagery, and material details are finalized.",
  },
  "lighting-safety-preview": {
    description:
      "Lighting, visibility, and organizer products with clear coming-soon boundaries for battery, packaging, and policy review.",
    seoTitle: "Lighting & Safety Preview Collection | Outdoor Gear Shop",
    seoDescription:
      "Review preview headlamps, camp lanterns, visibility markers, and safety organizer pouches.",
    keywords: ["camp lighting", "headlamp", "visibility accessories"],
    signupDescription:
      "Request launch updates for lighting and safety-adjacent accessories while documentation gates remain open.",
  },
}

export const categoryContentByHandle: Record<string, PreviewPageContent> = {
  "tents-shelter": {
    description:
      "Shelter systems, tarps, footprints, and setup kits for weekend camp protection and staging.",
    seoTitle: "Tents & Shelter Preview Category | Outdoor Gear Shop",
    seoDescription:
      "Browse tents, tarps, groundsheets, and shelter setup accessories in the preview catalog.",
    keywords: ["tents", "tarp shelter", "groundsheets"],
  },
  "packs-bags": {
    description:
      "Carry systems and soft organization products for day hikes, overnight trips, and camp travel.",
    seoTitle: "Packs & Bags Preview Category | Outdoor Gear Shop",
    seoDescription:
      "Browse trail packs, dry daypacks, packing cubes, and waist packs in the preview catalog.",
    keywords: ["trail packs", "daypacks", "packing organization"],
  },
  "sleep-systems": {
    description:
      "Sleeping bags, pads, pillows, and liners for comparing camp comfort systems before launch.",
    seoTitle: "Sleep Systems Preview Category | Outdoor Gear Shop",
    seoDescription:
      "Browse sleeping bags, pads, pillows, and liners in the preview catalog.",
    keywords: ["sleeping bag", "camp pad", "sleep system"],
  },
  "camp-kitchen": {
    description:
      "Camp cookware, tableware, organizers, and drinkware for compact meal setups.",
    seoTitle: "Camp Kitchen Preview Category | Outdoor Gear Shop",
    seoDescription:
      "Browse camp kitchen cookware, tableware, organizers, and mugs in the preview catalog.",
    keywords: ["camp kitchen", "cookware", "camp tableware"],
  },
  "apparel-layers": {
    description:
      "Outerwear, midlayers, socks, and sun accessories for camp and trail layering.",
    seoTitle: "Apparel & Layers Preview Category | Outdoor Gear Shop",
    seoDescription:
      "Browse rain shells, fleece layers, socks, and caps in the preview catalog.",
    keywords: ["outdoor apparel", "rain shell", "fleece"],
  },
  "lighting-safety": {
    description:
      "Lighting, visibility markers, and organizer products with clear preview and coming-soon states.",
    seoTitle: "Lighting & Safety Preview Category | Outdoor Gear Shop",
    seoDescription:
      "Browse headlamps, lanterns, visibility accessories, and organizer pouches in the preview catalog.",
    keywords: ["camp lighting", "headlamp", "safety organizer"],
  },
}

export const fieldNotesPageMetadata = {
  title: "Blog | Outdoor Gear Shop",
  description:
    "Outdoor gear buying notes covering shelter, packs, sleep systems, camp kitchen, apparel, and lighting preview products.",
  keywords: [
    "outdoor gear blog",
    "camp shelter guide",
    "camp kitchen checklist",
    "preview catalog",
  ],
}

export const eventsPageMetadata = {
  title: "Events | Outdoor Gear Shop",
  description:
    "Preview events and activity pages for outdoor gear catalog feedback, shelter demos, pack workshops, and camp kitchen follow-ups.",
  keywords: [
    "outdoor gear events",
    "preview events",
    "camp gear demo",
    "launch updates",
  ],
}

export function getArticleBySlug(slug?: string) {
  return previewArticles.find((article) => article.slug === slug)
}

export function getEventBySlug(slug?: string) {
  return previewEvents.find((event) => event.slug === slug)
}

export function getCollectionPageContent(
  handle?: string | null,
  fallbackTitle = "Preview Collection",
): PreviewCollectionContent {
  if (handle && collectionContentByHandle[handle]) {
    return collectionContentByHandle[handle]
  }

  return {
    description:
      "Preview products grouped for sourcing review, customer interest testing, and launch-update planning.",
    seoTitle: `${fallbackTitle} | Outdoor Gear Shop`,
    seoDescription: `Browse ${fallbackTitle.toLowerCase()} items grouped for sourcing review and launch-update tracking.`,
    keywords: defaultPreviewKeywords,
    signupDescription:
      "Request launch updates for this preview collection while sourcing review is still in progress.",
  }
}

export function getCategoryPageContent(
  handle?: string | null,
  fallbackName = "Preview Category",
  fallbackDescription?: string | null,
): PreviewPageContent {
  if (handle && categoryContentByHandle[handle]) {
    return categoryContentByHandle[handle]
  }

  return {
    description:
      fallbackDescription ||
      "Preview products grouped for sourcing review, customer interest, and launch planning.",
    seoTitle: `${fallbackName} | Outdoor Gear Shop`,
    seoDescription:
      fallbackDescription ||
      `Browse ${fallbackName.toLowerCase()} items grouped for sourcing review and launch-update tracking.`,
    keywords: defaultPreviewKeywords,
  }
}
