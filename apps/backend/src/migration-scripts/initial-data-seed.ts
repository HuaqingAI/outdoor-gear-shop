import { MedusaContainer } from "@medusajs/framework";
import { CreateProductWorkflowInputDTO } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

export type PreviewTier =
  | "public_preview"
  | "coming_soon"
  | "hold_internal"
  | "stocked_preview"
  | "low_stock";

export type PreviewBackendState =
  | "public_preview"
  | "coming_soon"
  | "hold_internal";

export type PreviewProductSeed = {
  title: string;
  handle: string;
  legacyHandles?: string[];
  description: string;
  categoryName: string;
  collectionHandle: string;
  imageUrls: string[];
  slot: string;
  previewTier: PreviewTier;
  backendState?: PreviewBackendState;
  priceBandUsd?: string;
  assetSource?: string;
  claimGuardrail?: string;
  forbiddenClaims?: string[];
  inTheBox?: string[];
  statusLabel: string;
  inventoryState: string;
  inventoryQuantity: number;
  price: number;
  sku: string;
  weight: number;
  material: string;
  originCountry: string;
  dimensions: { length: number; width: number; height: number };
  shortSummary: string;
  keyBullets: string[];
  keySpecs: Record<string, string>;
  useCases: string[];
};

type PreviewProductOperation = Partial<PreviewProductSeed> & {
  backendState: PreviewBackendState;
  priceBandUsd?: string;
  assetSource?: string;
  claimGuardrail?: string;
  forbiddenClaims?: string[];
  inTheBox?: string[];
};

export type PreviewProductDetailSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image_url: string;
  image_alt: string;
  bullets: string[];
};

const imagePools = {
  shelter: [
    "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  ],
  packs: [
    "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  ],
  sleep: [
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
  ],
  kitchen: [
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  ],
  apparel: [
    "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1200&q=80",
  ],
  safety: [
    "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
  ],
};

const rotateImages = (images: string[], offset: number) =>
  [...images.slice(offset), ...images.slice(0, offset)].slice(0, 4);

const previewImageRoles = ["main", "detail", "context", "scale"] as const;

const isLegacySharedPreviewImage = (url: string) =>
  url.includes("images.unsplash.com");

export const getPreviewProductImageUrls = (product: PreviewProductSeed) => {
  const configuredImages = product.imageUrls.filter(
    (url) => url && !isLegacySharedPreviewImage(url)
  );

  if (configuredImages.length > 0) {
    return configuredImages;
  }

  return previewImageRoles.map(
    (role) => `/api/preview/product-image/${product.handle}/${role}.svg`
  );
};

export const createProductDetailSections = (
  product: PreviewProductSeed
): PreviewProductDetailSection[] => {
  const imageUrls = getPreviewProductImageUrls(product);
  const specBullets = Object.entries(product.keySpecs)
    .filter(([label]) => !["Preview state", "CTA mode"].includes(label))
    .slice(0, 6)
    .map(([label, value]) => `${label}: ${value}`);
  const confirmedNow = [
    `${product.title} is mapped to ${product.collectionHandle}.`,
    product.shortSummary,
    product.backendState === "public_preview"
      ? "Visible for public preview interest capture."
      : "Visible as a notify-only coming-soon review item.",
  ];
  const pendingReview = [
    product.inventoryState,
    product.assetSource || "Owned or supplier-authorized imagery is pending.",
    product.claimGuardrail ||
      "Performance and compliance claims remain gated until source review.",
  ];
  const doNotClaim =
    product.forbiddenClaims && product.forbiddenClaims.length > 0
      ? product.forbiddenClaims.map((claim) => `Do not claim ${claim}.`)
      : ["Do not claim certified performance or launch availability."];

  return [
    {
      id: "scene-value",
      eyebrow: product.slot,
      title: `${product.title} for the first preview wave`,
      body: product.shortSummary,
      image_url: imageUrls[0],
      image_alt: `${product.title} main preview image`,
      bullets: product.keyBullets.slice(0, 3),
    },
    {
      id: "feature-breakdown",
      eyebrow: "Feature breakdown",
      title: "What shoppers can evaluate now",
      body: "The preview page focuses on visible product structure, packing role, and setup fit while final samples and launch policies remain under review.",
      image_url: imageUrls[1] ?? imageUrls[0],
      image_alt: `${product.title} detail preview image`,
      bullets: product.keyBullets.slice(0, 3),
    },
    {
      id: "materials-structure",
      eyebrow: "Materials and structure",
      title: "Physical facts kept inside review bounds",
      body: `${product.material}. The storefront keeps material language conservative so the item can be reviewed without unsupported performance claims.`,
      image_url: imageUrls[1] ?? imageUrls[0],
      image_alt: `${product.title} material detail preview image`,
      bullets: specBullets.slice(0, 4),
    },
    {
      id: "size-specs",
      eyebrow: "Size and specs",
      title: "Sizing cues for catalog comparison",
      body: "Current dimensions and package facts are preview fields. Final supplier measurements, sample weights, and included components must still be confirmed before live ordering.",
      image_url: imageUrls[3] ?? imageUrls[0],
      image_alt: `${product.title} scale preview image`,
      bullets: specBullets.slice(0, 5),
    },
    {
      id: "in-the-box",
      eyebrow: "In the box",
      title: "Included items under review",
      body: "The included-item list is intentionally conservative and only describes the current draft bundle shape for preview evaluation.",
      image_url: imageUrls[2] ?? imageUrls[0],
      image_alt: `${product.title} in-box preview image`,
      bullets:
        product.inTheBox && product.inTheBox.length > 0
          ? product.inTheBox
          : ["Included items pending sourcing confirmation."],
    },
    {
      id: "use-fit",
      eyebrow: "Use cases and fit",
      title: "Where this item belongs",
      body: "Use cases are written as browsing guidance, not performance guarantees. They help visitors decide whether to request launch updates for this draft item.",
      image_url: imageUrls[2] ?? imageUrls[0],
      image_alt: `${product.title} field context preview image`,
      bullets: product.useCases.slice(0, 3),
    },
    {
      id: "preview-note",
      eyebrow: "Preview status",
      title: product.statusLabel,
      body: "This item is published for preview interest capture only. Product images are scoped placeholders until owned or supplier-authorized assets replace them.",
      image_url: imageUrls[2] ?? imageUrls[0],
      image_alt: `${product.title} preview status image`,
      bullets: [...confirmedNow.slice(0, 2), ...pendingReview.slice(0, 2), ...doNotClaim.slice(0, 2)],
    },
  ];
};

export const previewMetadata = (product: PreviewProductSeed) => ({
  product_info: {
    sample_verified: false,
    preview_only: true,
    notify_only: true,
    backend_state: product.backendState || product.previewTier,
    slot: product.slot,
    preview_tier: product.backendState || product.previewTier,
    status_label: product.statusLabel,
    inventory_state: product.inventoryState,
    price_label: "Price pending launch review",
    price_band_usd: product.priceBandUsd,
    asset_source:
      product.assetSource ||
      "product_scoped_placeholder_until_owned_or_authorized_images",
    claim_guardrail:
      product.claimGuardrail ||
      "no waterproof/load-bearing/food-safe/medical claim",
    forbidden_claims: product.forbiddenClaims || [],
    short_summary: product.shortSummary,
    key_bullets: product.keyBullets,
    key_specs: product.keySpecs,
    use_cases: product.useCases,
    in_the_box: product.inTheBox || [],
    detail_sections: createProductDetailSections(product),
  },
});

export const previewCollections = [
  {
    title: "Tents & Shelter Preview",
    handle: "tents-shelter-preview",
  },
  {
    title: "Packs & Bags Preview",
    handle: "packs-bags-preview",
  },
  {
    title: "Sleep Systems Preview",
    handle: "sleep-systems-preview",
  },
  {
    title: "Camp Furniture Preview",
    handle: "camp-furniture-preview",
  },
  {
    title: "Camp Kitchen Preview",
    handle: "camp-kitchen-preview",
  },
  {
    title: "Lighting & Safety Preview",
    handle: "lighting-safety-preview",
  },
  {
    title: "Trail Utility Preview",
    handle: "trail-utility-preview",
  },
];

export const previewCategoryData = [
  {
    name: "Tents & Shelter",
    handle: "tents-shelter",
    description:
      "Shelter systems, footprints, and setup accessories for camp protection and quick pitching.",
  },
  {
    name: "Packs & Bags",
    handle: "packs-bags",
    description:
      "Trail packs, dry bags, cubes, and carry accessories for organized outdoor travel.",
  },
  {
    name: "Sleep Systems",
    handle: "sleep-systems",
    description:
      "Sleeping bags, pads, pillows, and liners for comfort planning across three-season trips.",
  },
  {
    name: "Camp Kitchen",
    handle: "camp-kitchen",
    description:
      "Cookware, tableware, and camp kitchen organizers for packing and meal prep setups.",
  },
  {
    name: "Lighting & Safety",
    handle: "lighting-safety",
    description:
      "Lighting, visibility, and small safety organizers for camp and trail readiness.",
  },
  {
    name: "Camp Furniture",
    handle: "camp-furniture",
    description:
      "Portable tables and seating drafts for car camping, picnic, and basecamp setups.",
  },
  {
    name: "Trail Repair & Utility Pouches",
    handle: "trail-utility-pouches",
    description:
      "Small utility pouches and camp accessory organizers without tactical, medical, or emergency claims.",
  },
];

const defaultSpecs = (extra: Record<string, string>) => ({
  "Preview state": "Preview-only catalog item",
  "CTA mode": "Launch-update request",
  "Fulfillment status": "Ordering opens after operations approval",
  "Image set": "Product-scoped main, detail, field context, and scale reference",
  Warranty: "Launch policy pending",
  ...extra,
});

const previewProductPool: PreviewProductSeed[] = [
  {
    title: "RidgeLine Two-Person Dome Tent",
    handle: "ridgeline-two-person-dome-tent",
    description:
      "A freestanding dome tent preview for weekend camp setups where easy pitching, ventilation, and compact packed size matter.",
    categoryName: "Tents & Shelter",
    collectionHandle: "tents-shelter-preview",
    imageUrls: rotateImages(imagePools.shelter, 0),
    slot: "OG-TS-01",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 28 sample units",
    inventoryQuantity: 28,
    price: 189,
    sku: "OG-TS-01",
    weight: 2400,
    material: "Ripstop polyester fly, aluminum poles, mesh inner",
    originCountry: "US",
    dimensions: { length: 220, width: 140, height: 110 },
    shortSummary:
      "Two-person tent candidate for shoppers comparing quick-pitch shelter formats.",
    keyBullets: [
      "Freestanding structure supports easy camp setup in the preview assortment.",
      "Dual-door layout keeps entry and gear access simple for two campers.",
      "Packed dimensions are listed so visitors can compare carry volume.",
      "Preview status is clear before checkout and policy decisions are activated.",
    ],
    keySpecs: defaultSpecs({
      Capacity: "2 people",
      "Packed size": "48 x 18 cm",
    }),
    useCases: ["Weekend camping", "Trailhead base camps", "Festival camping"],
  },
  {
    title: "Meadow Tarp Shelter Kit",
    handle: "meadow-tarp-shelter-kit",
    description:
      "A modular tarp shelter preview for shaded cooking zones, gear staging, and fair-weather camp coverage.",
    categoryName: "Tents & Shelter",
    collectionHandle: "tents-shelter-preview",
    imageUrls: rotateImages(imagePools.shelter, 1),
    slot: "OG-TS-02",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 22 sample units",
    inventoryQuantity: 22,
    price: 96,
    sku: "OG-TS-02",
    weight: 930,
    material: "Coated polyester tarp with reinforced guy points",
    originCountry: "US",
    dimensions: { length: 300, width: 300, height: 2 },
    shortSummary:
      "Square tarp kit for visitors evaluating lightweight shade and rain-coverage formats.",
    keyBullets: [
      "Multiple guy points support common A-frame and lean-to pitch styles.",
      "Compact packed profile keeps it relevant for both car camp and pack lists.",
      "Includes clear status messaging before live weather claims are finalized.",
      "Pairs with shelter accessories in the same preview collection.",
    ],
    keySpecs: defaultSpecs({
      Coverage: "3 x 3 m",
      "Included pieces": "Tarp, stuff sack, guyline set",
    }),
    useCases: ["Camp kitchen cover", "Gear staging", "Sun shade"],
  },
  {
    title: "Compact Groundsheet Footprint",
    handle: "compact-groundsheet-footprint",
    description:
      "A packable groundsheet preview for tent floors, entry vestibules, and clean gear staging around camp.",
    categoryName: "Tents & Shelter",
    collectionHandle: "tents-shelter-preview",
    imageUrls: rotateImages(imagePools.shelter, 2),
    slot: "OG-TS-03",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 34 sample units",
    inventoryQuantity: 34,
    price: 42,
    sku: "OG-TS-03",
    weight: 310,
    material: "Coated ripstop polyester",
    originCountry: "US",
    dimensions: { length: 215, width: 130, height: 1 },
    shortSummary:
      "Groundsheet accessory that helps make the shelter category feel complete and shoppable.",
    keyBullets: [
      "Sized for common two-person shelter footprints in the preview range.",
      "Simple fold pattern makes pack size easy to understand on PDP.",
      "Works as a clean staging layer for damp trailhead setups.",
      "Status and price are visible on both listing and detail views.",
    ],
    keySpecs: defaultSpecs({
      "Folded size": "24 x 12 cm",
      "Edge detail": "Bound perimeter loops",
    }),
    useCases: ["Tent floor protection", "Vestibule staging", "Picnic ground layer"],
  },
  {
    title: "Aluminum Stake & Guyline Kit",
    handle: "aluminum-stake-and-guyline-kit",
    description:
      "A small shelter support kit preview for replacing worn stakes and adding spare guylines to a camp repair box.",
    categoryName: "Tents & Shelter",
    collectionHandle: "tents-shelter-preview",
    imageUrls: rotateImages(imagePools.shelter, 3),
    slot: "OG-TS-04",
    previewTier: "low_stock",
    statusLabel: "Low stock preview",
    inventoryState: "Low stock: 7 sample units",
    inventoryQuantity: 7,
    price: 24,
    sku: "OG-TS-04",
    weight: 190,
    material: "Anodized aluminum stakes and reflective cord",
    originCountry: "US",
    dimensions: { length: 18, width: 8, height: 4 },
    shortSummary:
      "Accessory kit that rounds out shelter browsing with a realistic low-stock status.",
    keyBullets: [
      "Includes a visible low-stock label for storefront status validation.",
      "Small-kit format supports repair and backup accessory use cases.",
      "Reflective cord supports night visibility without emergency claims.",
      "Related products link back into shelter and lighting categories.",
    ],
    keySpecs: defaultSpecs({
      "Kit count": "8 stakes, 4 guylines",
      "Stake length": "18 cm",
    }),
    useCases: ["Tent backup kit", "Tarp pitching", "Camp repair bin"],
  },
  {
    title: "Summit 45L Trail Pack",
    handle: "summit-45l-trail-pack",
    description:
      "A mid-volume trail pack preview for overnight gear lists, with structured pockets and clear capacity messaging.",
    categoryName: "Packs & Bags",
    collectionHandle: "packs-bags-preview",
    imageUrls: rotateImages(imagePools.packs, 0),
    slot: "OG-PB-01",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 19 sample units",
    inventoryQuantity: 19,
    price: 142,
    sku: "OG-PB-01",
    weight: 1280,
    material: "Recycled nylon body, padded harness, aluminum stay",
    originCountry: "US",
    dimensions: { length: 70, width: 32, height: 24 },
    shortSummary:
      "A 45L pack candidate for shoppers comparing overnight carry systems.",
    keyBullets: [
      "Clear liter capacity makes the product card read like a real catalog item.",
      "Side pockets and top lid support fast access during camp setup.",
      "Harness notes are framed as features, not fit guarantees.",
      "Inventory state is visible to support baseline ecommerce acceptance.",
    ],
    keySpecs: defaultSpecs({
      Capacity: "45 L",
      "Torso range": "Adjustable preview fit range",
    }),
    useCases: ["Overnight hikes", "Car-camp overflow", "Travel gear hauls"],
  },
  {
    title: "Roll-Top Dry Daypack",
    handle: "roll-top-dry-daypack",
    description:
      "A compact daypack preview with roll-top closure for damp commutes, paddle days, and camp-side carry.",
    categoryName: "Packs & Bags",
    collectionHandle: "packs-bags-preview",
    imageUrls: rotateImages(imagePools.packs, 1),
    slot: "OG-PB-02",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 25 sample units",
    inventoryQuantity: 25,
    price: 74,
    sku: "OG-PB-02",
    weight: 620,
    material: "Coated nylon shell with welded-style seams",
    originCountry: "US",
    dimensions: { length: 48, width: 28, height: 18 },
    shortSummary:
      "Daypack candidate for lightweight water-resistant carry without unverified waterproof claims.",
    keyBullets: [
      "Roll-top access is easy to understand from card to PDP.",
      "Twenty-liter volume fits day layers, snacks, and compact camp items.",
      "Neutral copy avoids certified waterproof claims until verified.",
      "Pairs naturally with apparel and lighting preview items.",
    ],
    keySpecs: defaultSpecs({
      Capacity: "20 L",
      Closure: "Roll top with side buckle",
    }),
    useCases: ["Day hikes", "Camp shower carry", "Wet-weather errands"],
  },
  {
    title: "Packing Cube Trio",
    handle: "packing-cube-trio",
    description:
      "A three-piece packing cube preview for separating camp layers, sleepwear, and small soft goods inside larger bags.",
    categoryName: "Packs & Bags",
    collectionHandle: "packs-bags-preview",
    imageUrls: rotateImages(imagePools.packs, 2),
    slot: "OG-PB-03",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 41 sample units",
    inventoryQuantity: 41,
    price: 38,
    sku: "OG-PB-03",
    weight: 240,
    material: "Lightweight nylon mesh and ripstop panels",
    originCountry: "US",
    dimensions: { length: 34, width: 24, height: 10 },
    shortSummary:
      "Soft organization set that adds realistic accessory depth to the packs collection.",
    keyBullets: [
      "Three sizes help visitors compare packing formats at a glance.",
      "Mesh panel detail supports quick identification in larger packs.",
      "Accessory price point makes the preview catalog feel broader.",
      "Gallery shows main, detail, use, and scale-oriented imagery.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "3 cubes",
      Sizes: "Small, medium, large",
    }),
    useCases: ["Camp clothing organization", "Road trip packing", "Family gear separation"],
  },
  {
    title: "Trek Waist Pack",
    handle: "trek-waist-pack",
    description:
      "A small waist pack preview for snacks, compact cameras, and quick-access items during light trail days.",
    categoryName: "Packs & Bags",
    collectionHandle: "packs-bags-preview",
    imageUrls: rotateImages(imagePools.packs, 3),
    slot: "OG-PB-04",
    previewTier: "low_stock",
    statusLabel: "Low stock preview",
    inventoryState: "Low stock: 6 sample units",
    inventoryQuantity: 6,
    price: 46,
    sku: "OG-PB-04",
    weight: 220,
    material: "Nylon body, adjustable webbing belt, zipper pockets",
    originCountry: "US",
    dimensions: { length: 26, width: 8, height: 14 },
    shortSummary:
      "Low-stock carry accessory that gives the packs category a quick-access option.",
    keyBullets: [
      "Compact format works for short hikes and camp walks.",
      "Front pocket and main compartment create an easy spec story.",
      "Low-stock state validates product card and PDP status alignment.",
      "Launch-update CTA remains consistent with preview-only policy.",
    ],
    keySpecs: defaultSpecs({
      Capacity: "2.5 L",
      "Pocket count": "2 zipper compartments",
    }),
    useCases: ["Short hikes", "Travel days", "Camp walks"],
  },
  {
    title: "Three-Season Mummy Sleeping Bag",
    handle: "three-season-mummy-sleeping-bag",
    description:
      "A mummy-style sleeping bag preview with a conservative three-season positioning for camp comfort browsing.",
    categoryName: "Sleep Systems",
    collectionHandle: "sleep-systems-preview",
    imageUrls: rotateImages(imagePools.sleep, 0),
    slot: "OG-SS-01",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 16 sample units",
    inventoryQuantity: 16,
    price: 128,
    sku: "OG-SS-01",
    weight: 1180,
    material: "Synthetic insulation, polyester shell and lining",
    originCountry: "US",
    dimensions: { length: 210, width: 78, height: 8 },
    shortSummary:
      "Sleeping bag candidate with enough specs to make PDP comparison useful.",
    keyBullets: [
      "Mummy cut and draft collar are visible in the detail narrative.",
      "Synthetic fill keeps care language straightforward for preview browsing.",
      "Temperature wording stays conservative until lab ratings are approved.",
      "Related products support a complete sleep-system journey.",
    ],
    keySpecs: defaultSpecs({
      "Fit length": "Up to 185 cm",
      "Packed size": "38 x 22 cm",
    }),
    useCases: ["Spring camping", "Autumn campouts", "Cabin backup bedding"],
  },
  {
    title: "Inflatable Camp Sleeping Pad",
    handle: "inflatable-camp-sleeping-pad",
    description:
      "A compact inflatable pad preview for visitors comparing packability, comfort notes, and sleep-system accessories.",
    categoryName: "Sleep Systems",
    collectionHandle: "sleep-systems-preview",
    imageUrls: rotateImages(imagePools.sleep, 1),
    slot: "OG-SS-02",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 21 sample units",
    inventoryQuantity: 21,
    price: 88,
    sku: "OG-SS-02",
    weight: 690,
    material: "Laminated nylon shell and TPU bladder",
    originCountry: "US",
    dimensions: { length: 188, width: 58, height: 8 },
    shortSummary:
      "Inflatable pad candidate for making the sleep category browsable beyond bags alone.",
    keyBullets: [
      "Compact packed size supports backpack and car-camp comparisons.",
      "Valve and fabric details give the gallery meaningful detail shots.",
      "Pairing copy connects the pad to sleeping bags and liners.",
      "Stock state and price are available on visible product surfaces.",
    ],
    keySpecs: defaultSpecs({
      Thickness: "8 cm",
      "Packed size": "25 x 10 cm",
    }),
    useCases: ["Backpacking", "Car camping", "Guest sleep kits"],
  },
  {
    title: "Camp Pillow Compressible",
    handle: "camp-pillow-compressible",
    description:
      "A compressible camp pillow preview for rounding out sleep-system browsing with a low-bulk comfort accessory.",
    categoryName: "Sleep Systems",
    collectionHandle: "sleep-systems-preview",
    imageUrls: rotateImages(imagePools.sleep, 2),
    slot: "OG-SS-03",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 32 sample units",
    inventoryQuantity: 32,
    price: 29,
    sku: "OG-SS-03",
    weight: 180,
    material: "Brushed polyester shell with compressible synthetic fill",
    originCountry: "US",
    dimensions: { length: 38, width: 28, height: 10 },
    shortSummary:
      "Small sleep accessory that gives shoppers an approachable add-on item.",
    keyBullets: [
      "Soft accessory format gives the category realistic price variety.",
      "Compressible construction supports simple storage and use-case language.",
      "Main and detail imagery make multi-image behavior easy to verify.",
      "Works as an add-on with bags, pads, and travel kits.",
    ],
    keySpecs: defaultSpecs({
      "Packed size": "14 x 9 cm",
      Cover: "Soft brushed face fabric",
    }),
    useCases: ["Tent sleeping", "Road trips", "Flights and travel"],
  },
  {
    title: "Thermal Bag Liner",
    handle: "thermal-bag-liner",
    description:
      "A sleeping bag liner preview for adding cleanliness, seasonal flexibility, and easy care to sleep-system setups.",
    categoryName: "Sleep Systems",
    collectionHandle: "sleep-systems-preview",
    imageUrls: rotateImages(imagePools.sleep, 3),
    slot: "OG-SS-04",
    previewTier: "low_stock",
    statusLabel: "Low stock preview",
    inventoryState: "Low stock: 5 sample units",
    inventoryQuantity: 5,
    price: 54,
    sku: "OG-SS-04",
    weight: 360,
    material: "Brushed knit polyester blend",
    originCountry: "US",
    dimensions: { length: 210, width: 75, height: 2 },
    shortSummary:
      "Low-stock sleep liner that strengthens PDP specs and related-product browsing.",
    keyBullets: [
      "Liner format supports care, comfort, and packing use cases.",
      "Low-stock state is clearly visible without opening checkout.",
      "Simple dimensions keep the product comparable in grid and PDP.",
      "The product stays preview-only until launch policy is approved.",
    ],
    keySpecs: defaultSpecs({
      Shape: "Mummy-compatible rectangle",
      "Packed size": "18 x 12 cm",
    }),
    useCases: ["Sleeping bag lining", "Hostel travel", "Warm-weather cover"],
  },
  {
    title: "Nesting Camp Cook Pot Set",
    handle: "nesting-camp-cook-pot-set",
    description:
      "A nested pot set preview for compact camp cooking kits, with clear dimensions and conservative material language.",
    categoryName: "Camp Kitchen",
    collectionHandle: "camp-kitchen-preview",
    imageUrls: rotateImages(imagePools.kitchen, 0),
    slot: "OG-CK-01",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 18 sample units",
    inventoryQuantity: 18,
    price: 68,
    sku: "OG-CK-01",
    weight: 760,
    material: "Hard-anodized aluminum body with folding handles",
    originCountry: "US",
    dimensions: { length: 18, width: 18, height: 14 },
    shortSummary:
      "Cook pot set candidate for comparing nested camp kitchen formats.",
    keyBullets: [
      "Nested format makes packability easy to evaluate from the PDP.",
      "Folding handles and lid notes give shoppers concrete details.",
      "Food-contact and heat claims stay out of public copy until approved.",
      "Price and inventory state support real catalog scanning.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "2 pots, 1 lid",
      Capacity: "1.6 L and 1.1 L",
    }),
    useCases: ["Camp meals", "Coffee water", "Two-person cook kits"],
  },
  {
    title: "Folding Camp Tableware Kit",
    handle: "folding-camp-tableware-kit",
    description:
      "A compact tableware preview for organized camp meals, designed to be evaluated as a packing format before launch.",
    categoryName: "Camp Kitchen",
    collectionHandle: "camp-kitchen-preview",
    imageUrls: rotateImages(imagePools.kitchen, 1),
    slot: "OG-CK-02",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 24 sample units",
    inventoryQuantity: 24,
    price: 36,
    sku: "OG-CK-02",
    weight: 420,
    material: "BPA-free polymer pieces and textile carry sleeve",
    originCountry: "US",
    dimensions: { length: 24, width: 15, height: 6 },
    shortSummary:
      "Tableware accessory that adds practical depth to the camp kitchen collection.",
    keyBullets: [
      "Kit structure is easy for visitors to understand on cards.",
      "Carry sleeve gives the gallery a meaningful detail angle.",
      "Copy avoids dishwasher and food-safety claims pending verification.",
      "Works well with cookware and kitchen organizer related products.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "2 bowls, 2 cups, 2 utensil sets",
      "Carry format": "Sleeved kit",
    }),
    useCases: ["Camp dinners", "Picnic kits", "Scout packing lists"],
  },
  {
    title: "Hanging Camp Kitchen Organizer",
    handle: "hanging-camp-kitchen-organizer",
    description:
      "A hanging kitchen organizer preview for separating utensils, cloths, and small prep tools around camp.",
    categoryName: "Camp Kitchen",
    collectionHandle: "camp-kitchen-preview",
    imageUrls: rotateImages(imagePools.kitchen, 2),
    slot: "OG-CK-03",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 20 sample units",
    inventoryQuantity: 20,
    price: 48,
    sku: "OG-CK-03",
    weight: 360,
    material: "Ripstop-style textile, mesh pockets, hanging webbing",
    originCountry: "US",
    dimensions: { length: 42, width: 28, height: 5 },
    shortSummary:
      "Organizer candidate for visitors comparing clean camp kitchen packing formats.",
    keyBullets: [
      "Multiple pocket zones create a clear PDP spec story.",
      "Hanging format supports tent, vehicle, and kitchen canopy setups.",
      "Gallery order shows main, detail, field context, and folded reference.",
      "Stocked preview status replaces earlier placeholder-only language.",
    ],
    keySpecs: defaultSpecs({
      "Pocket count": "8 organizer zones",
      Closure: "Fold-over roll with buckle",
    }),
    useCases: ["Camp kitchen setup", "Vehicle camping", "Picnic storage"],
  },
  {
    title: "Insulated Camp Mug Pair",
    handle: "insulated-camp-mug-pair",
    description:
      "A two-mug preview set for camp coffee, picnic tables, and early assortment interest tracking.",
    categoryName: "Camp Kitchen",
    collectionHandle: "camp-kitchen-preview",
    imageUrls: rotateImages(imagePools.kitchen, 3),
    slot: "OG-CK-04",
    previewTier: "low_stock",
    statusLabel: "Low stock preview",
    inventoryState: "Low stock: 8 sample units",
    inventoryQuantity: 8,
    price: 32,
    sku: "OG-CK-04",
    weight: 500,
    material: "Stainless steel body with press-fit lids",
    originCountry: "US",
    dimensions: { length: 19, width: 10, height: 12 },
    shortSummary:
      "Low-stock table accessory that gives the kitchen collection a clear add-on product.",
    keyBullets: [
      "Two-pack format makes price and use case immediately clear.",
      "Insulation wording stays practical without timed heat-retention claims.",
      "Low-stock status supports acceptance testing for product state labels.",
      "Pairs with tableware and cook pot products in related browsing.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "2 mugs",
      Capacity: "350 ml each",
    }),
    useCases: ["Camp coffee", "Picnic tables", "Road trip drinkware"],
  },
  {
    title: "Lightweight Rain Shell",
    handle: "lightweight-rain-shell",
    description:
      "A packable rain shell preview for variable forecast days, positioned with conservative weather language.",
    categoryName: "Apparel & Layers",
    collectionHandle: "apparel-layers-preview",
    imageUrls: rotateImages(imagePools.apparel, 0),
    slot: "OG-AL-01",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 14 sample units",
    inventoryQuantity: 14,
    price: 118,
    sku: "OG-AL-01",
    weight: 310,
    material: "Ripstop nylon shell with water-resistant finish",
    originCountry: "US",
    dimensions: { length: 34, width: 24, height: 8 },
    shortSummary:
      "Packable shell candidate for shoppers building a wet-weather layer kit.",
    keyBullets: [
      "Hood, cuff, and pocket notes create a complete apparel PDP.",
      "Packable format links apparel to packs and day-hike use cases.",
      "Weather wording avoids certified waterproof claims until verified.",
      "Stocked preview status keeps public catalog confidence higher.",
    ],
    keySpecs: defaultSpecs({
      Sizes: "S-XL preview range",
      "Packed size": "Stows into pocket",
    }),
    useCases: ["Rainy hikes", "Camp chores", "Travel shell layer"],
  },
  {
    title: "Grid Fleece Quarter Zip",
    handle: "grid-fleece-quarter-zip",
    description:
      "A breathable fleece layer preview for morning camp starts, shoulder-season hikes, and travel layering.",
    categoryName: "Apparel & Layers",
    collectionHandle: "apparel-layers-preview",
    imageUrls: rotateImages(imagePools.apparel, 1),
    slot: "OG-AL-02",
    previewTier: "stocked_preview",
    statusLabel: "In stock preview",
    inventoryState: "In stock: 17 sample units",
    inventoryQuantity: 17,
    price: 84,
    sku: "OG-AL-02",
    weight: 380,
    material: "Polyester grid fleece",
    originCountry: "US",
    dimensions: { length: 32, width: 24, height: 9 },
    shortSummary:
      "Midlayer candidate that adds apparel depth and clear seasonality to the catalog.",
    keyBullets: [
      "Grid texture gives the gallery and PDP a real detail story.",
      "Quarter zip design supports ventilation and layering language.",
      "Pairs with rain shell, socks, and pack products in browse paths.",
      "Published stock quantity supports collection density requirements.",
    ],
    keySpecs: defaultSpecs({
      Sizes: "S-XL preview range",
      Fit: "Regular layering fit",
    }),
    useCases: ["Cool mornings", "Shoulder-season hikes", "Travel layering"],
  },
  {
    title: "Merino Hiking Sock Set",
    handle: "merino-hiking-sock-set",
    description:
      "A two-pair hiking sock preview for testing apparel accessory interest with clear sizing and care details.",
    categoryName: "Apparel & Layers",
    collectionHandle: "apparel-layers-preview",
    imageUrls: rotateImages(imagePools.apparel, 2),
    slot: "OG-AL-03",
    previewTier: "low_stock",
    statusLabel: "Low stock preview",
    inventoryState: "Low stock: 8 sample units",
    inventoryQuantity: 8,
    price: 28,
    sku: "OG-AL-03",
    weight: 140,
    material: "Merino wool blend knit",
    originCountry: "US",
    dimensions: { length: 24, width: 10, height: 4 },
    shortSummary:
      "Sock set preview with enough detail to support apparel collection browsing.",
    keyBullets: [
      "Two-pair set creates a clear product proposition on listing cards.",
      "Care and sizing fields strengthen PDP credibility.",
      "Low-stock status validates inventory label behavior.",
      "Accessory price point broadens the assortment beyond large gear.",
    ],
    keySpecs: defaultSpecs({
      Sizes: "S/M and L/XL preview range",
      "Set count": "2 pairs",
    }),
    useCases: ["Day hikes", "Travel socks", "Camp sleep socks"],
  },
  {
    title: "Sun Trek Cap",
    handle: "sun-trek-cap",
    description:
      "A lightweight cap preview for bright trail days, camp chores, and travel packs.",
    categoryName: "Apparel & Layers",
    collectionHandle: "apparel-layers-preview",
    imageUrls: rotateImages(imagePools.apparel, 3),
    slot: "OG-AL-04",
    previewTier: "coming_soon",
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: sample allocation pending",
    inventoryQuantity: 0,
    price: 34,
    sku: "OG-AL-04",
    weight: 90,
    material: "Nylon ripstop crown and adjustable webbing strap",
    originCountry: "US",
    dimensions: { length: 28, width: 20, height: 12 },
    shortSummary:
      "Coming-soon apparel accessory with complete PDP content and disabled purchase flow.",
    keyBullets: [
      "Public page remains complete even while sample allocation is pending.",
      "Adjustable closure and brim notes keep specs concrete.",
      "Coming-soon state uses notify-only CTA rather than checkout.",
      "Cross-links naturally with packs, rain shells, and day-hike content.",
    ],
    keySpecs: defaultSpecs({
      Sizes: "One-size adjustable",
      Brim: "Flexible curved brim",
    }),
    useCases: ["Sunny trail days", "Camp chores", "Travel packing"],
  },
  {
    title: "Rechargeable Trail Headlamp",
    handle: "rechargeable-trail-headlamp",
    description:
      "A rechargeable headlamp preview for camp tasks and early-start hikes, with brightness copy kept inside review bounds.",
    categoryName: "Lighting & Safety",
    collectionHandle: "lighting-safety-preview",
    imageUrls: rotateImages(imagePools.safety, 0),
    slot: "OG-LS-01",
    previewTier: "coming_soon",
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: battery documentation pending",
    inventoryQuantity: 0,
    price: 52,
    sku: "OG-LS-01",
    weight: 86,
    material: "ABS housing, elastic headband, rechargeable battery pack",
    originCountry: "US",
    dimensions: { length: 6, width: 4, height: 4 },
    shortSummary:
      "Headlamp candidate published with full content while battery documentation remains a gate.",
    keyBullets: [
      "Coming-soon state prevents accidental purchase claims.",
      "Charging and mode notes are framed as preview specs.",
      "Pairs with camp lantern and reflective accessory products.",
      "Detail page explains the documentation gate clearly.",
    ],
    keySpecs: defaultSpecs({
      Charging: "USB-C rechargeable preview spec",
      Modes: "Low, medium, high, red",
    }),
    useCases: ["Camp chores", "Early trail starts", "Tent reading"],
  },
  {
    title: "Ambient Camp Lantern",
    handle: "ambient-camp-lantern",
    description:
      "A soft-light camp lantern preview for table lighting, tent vestibules, and evening camp organization.",
    categoryName: "Lighting & Safety",
    collectionHandle: "lighting-safety-preview",
    imageUrls: rotateImages(imagePools.safety, 1),
    slot: "OG-LS-02",
    previewTier: "coming_soon",
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: sample ETA pending",
    inventoryQuantity: 0,
    price: 44,
    sku: "OG-LS-02",
    weight: 240,
    material: "Polymer lantern body with folding carry handle",
    originCountry: "US",
    dimensions: { length: 10, width: 10, height: 16 },
    shortSummary:
      "Lantern candidate that keeps lighting content visible without claiming launch readiness.",
    keyBullets: [
      "Table and hanging use cases are easy to evaluate in content.",
      "Coming-soon inventory state is visible on listing and PDP.",
      "Gallery supports main, handle detail, context, and scale views.",
      "Battery and runtime claims remain pending until verified.",
    ],
    keySpecs: defaultSpecs({
      Power: "Rechargeable preview spec",
      "Carry detail": "Folding handle",
    }),
    useCases: ["Camp tables", "Tent vestibules", "Evening gear sorting"],
  },
  {
    title: "Reflective Guyline Marker Set",
    handle: "reflective-guyline-marker-set",
    description:
      "A small visibility accessory preview for marking tent lines and camp paths without making safety guarantees.",
    categoryName: "Lighting & Safety",
    collectionHandle: "lighting-safety-preview",
    imageUrls: rotateImages(imagePools.safety, 2),
    slot: "OG-LS-03",
    previewTier: "coming_soon",
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: packaging sample pending",
    inventoryQuantity: 0,
    price: 18,
    sku: "OG-LS-03",
    weight: 70,
    material: "Reflective polymer tabs and cord loops",
    originCountry: "US",
    dimensions: { length: 12, width: 8, height: 3 },
    shortSummary:
      "Small camp visibility accessory that fills out the lighting and shelter browse path.",
    keyBullets: [
      "Accessory format makes the collection feel deeper than two hero items.",
      "Visibility copy avoids safety-certification claims.",
      "Coming-soon status still has complete details and use cases.",
      "Related products connect back to shelter setup accessories.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "10 markers",
      Attachment: "Loop-through cord tabs",
    }),
    useCases: ["Tent guyline marking", "Camp path cues", "Accessory repair kits"],
  },
  {
    title: "Trail First-Aid Organizer Pouch",
    handle: "trail-first-aid-organizer-pouch",
    description:
      "A labeled organizer pouch preview for keeping personal first-aid supplies grouped; medical contents are not included.",
    categoryName: "Lighting & Safety",
    collectionHandle: "lighting-safety-preview",
    imageUrls: rotateImages(imagePools.safety, 3),
    slot: "OG-LS-04",
    previewTier: "coming_soon",
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: contents policy pending",
    inventoryQuantity: 0,
    price: 26,
    sku: "OG-LS-04",
    weight: 130,
    material: "Nylon pouch, zipper closure, internal mesh dividers",
    originCountry: "US",
    dimensions: { length: 18, width: 12, height: 6 },
    shortSummary:
      "Organizer pouch with clear boundaries: storage only, no medical contents or claims.",
    keyBullets: [
      "Explicitly states that medical contents are not included.",
      "Internal dividers and label panel give shoppers concrete specs.",
      "Coming-soon CTA collects launch interest without implying availability.",
      "Fits the safety collection while remaining conservative on claims.",
    ],
    keySpecs: defaultSpecs({
      "Pocket count": "4 internal organizer zones",
      Contents: "Organizer pouch only",
    }),
    useCases: ["Personal supply organization", "Trail bag sorting", "Vehicle camp kit"],
  },
];

const p0OperationsBySlot: Record<string, PreviewProductOperation> = {
  "OG-PB-02": {
    backendState: "public_preview",
    priceBandUsd: "49-74",
    assetSource: "owned_placeholder; supplier image authorization pending",
    claimGuardrail: "no waterproof, submersible, or IP-rating claim",
    forbiddenClaims: [
      "waterproof protection",
      "submersible use",
      "IP rating",
      "seam-sealed guarantee",
    ],
    inTheBox: ["1 roll-top daypack", "Final hangtag and display size pending"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: sample verification pending",
    inventoryQuantity: 0,
    price: 74,
    material: "Coated textile shell with roll-top closure",
    shortSummary:
      "Roll-top daypack for damp-day carry, camp wash items, and short hikes while final dimensions and seam construction are reviewed.",
    keyBullets: [
      "Roll-top closure keeps day gear grouped and easy to reach.",
      "Compact profile suits camp wash carry and short hikes.",
      "Single-volume layout works for towels, layers, and snacks.",
    ],
    keySpecs: defaultSpecs({
      Capacity: "20 L target display spec",
      Closure: "Roll-top side buckle",
      Body: "Coated textile shell",
      "Carry detail": "Adjustable shoulder straps",
      Dimensions: "Final supplier confirmation pending",
    }),
    useCases: ["Day hikes", "Camp wash carry", "Wet-weather errands"],
  },
  "OG-LS-02": {
    title: "Rechargeable Ambient Camp Lantern",
    backendState: "coming_soon",
    priceBandUsd: "29-44",
    assetSource: "owned_placeholder; battery documentation pending",
    claimGuardrail: "no lumen, emergency, safety-device, or runtime claim",
    forbiddenClaims: [
      "lumen guarantee",
      "emergency light",
      "safety device",
      "waterproof rating",
      "all-night runtime",
    ],
    inTheBox: ["1 camp lantern draft", "Charging cable inclusion pending"],
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: battery documents pending",
    inventoryQuantity: 0,
    price: 44,
    material: "Polymer lantern body with folding top handle",
    shortSummary:
      "Rechargeable camp lantern for table light, vestibule use, and evening gear sorting while battery files remain gated.",
    keyBullets: [
      "Soft table lighting helps evening setup feel calmer and clearer.",
      "Top handle supports hanging or quick hand carry.",
      "Simple lantern format is easier to judge than headlamp specs.",
    ],
    keySpecs: defaultSpecs({
      Power: "Rechargeable preview spec",
      "Carry detail": "Folding top handle",
      "Use format": "Tabletop or hanging lantern",
      Charging: "Final port details pending",
      Runtime: "Pending supplier document review",
    }),
    useCases: ["Camp tables", "Tent vestibules", "Evening gear sorting"],
  },
  "OG-CF-01": {
    title: "Aluminum Folding Camp Table",
    handle: "aluminum-folding-camp-table",
    description:
      "A folding camp table preview for car camping, picnic prep, and camp kitchen staging.",
    categoryName: "Camp Furniture",
    collectionHandle: "camp-furniture-preview",
    imageUrls: [],
    slot: "OG-CF-01",
    backendState: "public_preview",
    priceBandUsd: "39-79",
    assetSource: "product_scoped_placeholder; approved table imagery pending",
    claimGuardrail: "no load-bearing, heavy-duty, heatproof, or weatherproof claim",
    forbiddenClaims: [
      "load-bearing guarantee",
      "heavy-duty construction",
      "heatproof surface",
      "weatherproof use",
    ],
    inTheBox: ["1 folding table draft", "Carry bag pending confirmation"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: dimensions and carry bag pending",
    inventoryQuantity: 0,
    price: 79,
    sku: "OG-CF-01",
    weight: 1800,
    material: "Aluminum tabletop and folding frame",
    originCountry: "US",
    dimensions: { length: 54, width: 37, height: 38 },
    shortSummary:
      "Pack-flat prep surface for basecamp meals, coffee setup, and picnic use while final open and packed sizes are confirmed.",
    keyBullets: [
      "Pack-flat design creates a useful prep surface at camp.",
      "Simple aluminum frame keeps the product easy to understand.",
      "Pairs naturally with lantern, chair, and kitchen organizer.",
    ],
    keySpecs: defaultSpecs({
      Body: "Aluminum tabletop with folding frame",
      "Included piece": "Carry bag pending confirmation",
      "Use lane": "Basecamp and picnic setup",
      Dimensions: "Final open and packed size pending",
      Weight: "Pending sample review",
    }),
    useCases: ["Car-camp meals", "Picnic prep", "Basecamp coffee setup"],
  },
  "OG-CF-02": {
    title: "Lightweight Folding Camp Chair",
    handle: "lightweight-folding-camp-chair",
    description:
      "A folding camp chair preview for campsite seating, fishing breaks, and grass setups.",
    categoryName: "Camp Furniture",
    collectionHandle: "camp-furniture-preview",
    imageUrls: [],
    slot: "OG-CF-02",
    backendState: "public_preview",
    priceBandUsd: "29-59",
    assetSource: "product_scoped_placeholder; approved chair imagery pending",
    claimGuardrail: "no load capacity, ergonomic guarantee, or weatherproof claim",
    forbiddenClaims: [
      "load capacity",
      "heavy-duty construction",
      "ergonomic support guarantee",
      "weatherproof fabric",
    ],
    inTheBox: ["1 folding chair draft", "Carry bag or strap pending confirmation"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: frame material and packed weight pending",
    inventoryQuantity: 0,
    price: 59,
    sku: "OG-CF-02",
    weight: 1400,
    material: "Textile seat body with folding frame",
    originCountry: "US",
    dimensions: { length: 52, width: 50, height: 68 },
    shortSummary:
      "Portable seat for car camping, fishing breaks, and festival-style rest stops while frame details remain under review.",
    keyBullets: [
      "Foldable seat adds a clear rest stop around camp.",
      "Compact chair format supports picnic, fishing, and festival use.",
      "Visual setup pairs well with tables and soft lighting.",
    ],
    keySpecs: defaultSpecs({
      "Seat format": "Folding chair with fabric seat body",
      Frame: "Aluminum or steel final choice pending",
      "Carry detail": "Bag or strap pending confirmation",
      Dimensions: "Final open and packed size pending",
      Weight: "Pending sample review",
    }),
    useCases: ["Basecamp seating", "Fishing breaks", "Festival rest stops"],
  },
  "OG-CK-03": {
    backendState: "public_preview",
    priceBandUsd: "39-49",
    assetSource: "owned_placeholder; supplier image authorization pending",
    claimGuardrail: "no food-safe, stain-proof, cookware-protection, or waterproof claim",
    forbiddenClaims: [
      "food-safe storage",
      "stain-proof fabric",
      "cookware protection",
      "waterproof protection",
    ],
    inTheBox: ["1 hanging organizer draft", "Final pocket count pending"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: pocket count and hardware pending",
    inventoryQuantity: 0,
    price: 49,
    material: "Soft textile organizer with mesh pocket panels and hanging webbing",
    shortSummary:
      "Foldable hanging organizer for utensils, cloths, paper goods, and small kitchen items around camp.",
    keyBullets: [
      "Hanging layout keeps utensils, cloths, and paper goods separated.",
      "Pocket zones make small kitchen items easier to spot.",
      "Fold-over format stores flat between weekend camp trips.",
    ],
    keySpecs: defaultSpecs({
      Format: "Hanging soft organizer",
      "Pocket count": "Multi-pocket layout, final count pending",
      Closure: "Fold-over buckle closure",
      "Hanging detail": "Webbing loop or hook point pending",
      Dimensions: "Final supplier confirmation pending",
    }),
    useCases: ["Camp kitchen setup", "Vehicle camping", "Picnic storage"],
  },
  "OG-TR-01": {
    title: "Small Utility Pouch",
    handle: "small-utility-pouch",
    description:
      "A compact utility pouch preview for cords, patches, tools, and small camp accessories.",
    categoryName: "Trail Repair & Utility Pouches",
    collectionHandle: "trail-utility-preview",
    imageUrls: [],
    slot: "OG-TR-01",
    backendState: "public_preview",
    priceBandUsd: "18-26",
    assetSource: "product_scoped_placeholder; supplier image authorization pending",
    claimGuardrail: "no tactical, first-aid, emergency, or repair-outcome claim",
    forbiddenClaims: [
      "tactical use",
      "first-aid use",
      "emergency readiness",
      "repair outcome",
      "protective padding",
    ],
    inTheBox: ["1 compact utility pouch", "Final internal layout pending"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: final display size pending",
    inventoryQuantity: 0,
    price: 26,
    sku: "OG-TR-01",
    weight: 120,
    material: "Textile shell with zipper closure",
    originCountry: "US",
    dimensions: { length: 18, width: 11, height: 5 },
    shortSummary:
      "Small zipper pouch for cords, patches, and loose camp accessories without tactical, first-aid, or emergency framing.",
    keyBullets: [
      "Single zipper pouch corrals cords, patches, and camp extras.",
      "Small format fits glove boxes, duffels, and larger packs.",
      "Neutral utility wording avoids tactical or medical framing.",
    ],
    keySpecs: defaultSpecs({
      Format: "Compact zipper pouch",
      Body: "Textile shell with internal divider options pending",
      "Pocket detail": "Main compartment plus small internal pockets pending",
      Size: "Final display dimensions pending",
      "Color lane": "Black, gray, or olive pending final lock",
    }),
    useCases: ["Cord organization", "Daypack small items", "Vehicle camp bins"],
  },
  "OG-PB-03": {
    backendState: "public_preview",
    priceBandUsd: "24-38",
    assetSource: "owned_placeholder; product flat-lay imagery pending",
    claimGuardrail: "no compression, waterproof, smell-proof, or universal-fit claim",
    forbiddenClaims: [
      "compression guarantee",
      "waterproof protection",
      "smell-proof storage",
      "wrinkle-proof packing",
    ],
    inTheBox: ["1 small packing cube", "1 medium packing cube", "1 large packing cube"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: exact cube measurements pending",
    inventoryQuantity: 0,
    price: 38,
    material: "Lightweight textile body with mesh panels and zip openings",
    shortSummary:
      "Three-piece soft organizer set for clothing, sleep layers, and grouped camp items.",
    keyBullets: [
      "Three sizes separate layers, sleepwear, and loose accessories.",
      "Mesh panels help users spot contents without unpacking everything.",
      "Low-risk add-on deepens the bag and organization assortment.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "3 cubes",
      Material: "Lightweight textile body with mesh panels",
      Closure: "Zip opening",
      "Size lane": "Small, medium, large",
      "Exact dimensions": "Supplier size chart pending final approval",
    }),
    useCases: ["Camp clothing organization", "Road trip packing", "Family gear separation"],
  },
  "OG-TS-04": {
    title: "Aluminum Stake & Reflective Guyline Kit",
    backendState: "public_preview",
    priceBandUsd: "16-24",
    assetSource: "owned_placeholder; merged kit imagery pending",
    claimGuardrail: "no stormproof, load-bearing, emergency-safety, or high-wind claim",
    forbiddenClaims: [
      "stormproof setup",
      "load-bearing performance",
      "emergency safety device",
      "high-wind guarantee",
    ],
    inTheBox: [
      "8-10 aluminum stakes pending final count",
      "Reflective guylines pending final length",
      "Storage pouch pending confirmation",
    ],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: final kit count and lengths pending",
    inventoryQuantity: 0,
    price: 24,
    material: "Aluminum stakes with reflective cord and storage pouch pending",
    shortSummary:
      "Shelter accessory kit for spare stakes, guyline replacement, and low-light line visibility.",
    keyBullets: [
      "One kit keeps shelter stakes and cord together.",
      "Reflective lines add low-light visibility around tent edges.",
      "Small accessory pack strengthens the shelter setup assortment.",
    ],
    keySpecs: defaultSpecs({
      "Kit count": "8-10 stakes plus guylines, final count pending",
      Material: "Aluminum stakes with reflective cord",
      "Included piece": "Storage pouch pending",
      "Stake length": "Final supplier confirmation pending",
      "Cord length": "Pending supplier confirmation",
    }),
    useCases: ["Shelter setup backups", "Tarp pitching", "Camp accessory bins"],
  },
  "OG-TS-03": {
    backendState: "public_preview",
    priceBandUsd: "29-42",
    assetSource: "owned_placeholder; product ground-use imagery pending",
    claimGuardrail: "no waterproof, puncture-proof, abrasion-proof, or universal-fit claim",
    forbiddenClaims: [
      "waterproof guarantee",
      "puncture-proof use",
      "abrasion-proof use",
      "universal tent fit",
    ],
    inTheBox: ["1 compact groundsheet draft", "Storage pouch pending confirmation"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: exact size options pending",
    inventoryQuantity: 0,
    price: 42,
    material: "Coated textile body with edge detail pending",
    shortSummary:
      "Packable ground layer for tent floors, vestibule staging, and campsite gear placement.",
    keyBullets: [
      "Packable ground layer creates cleaner tent and gear staging.",
      "Simple rectangular format is easy to compare across setups.",
      "Useful both under shelter floors and around camp edges.",
    ],
    keySpecs: defaultSpecs({
      Format: "Compact groundsheet or footprint",
      Material: "Coated textile body",
      "Size lane": "Single and two-person options pending",
      "Packed size": "Pending supplier confirmation",
      "Edge detail": "Loops or corner points pending final spec",
    }),
    useCases: ["Tent floor layer", "Vestibule staging", "Picnic ground layer"],
  },
  "OG-SS-02": {
    backendState: "public_preview",
    priceBandUsd: "49-88",
    assetSource: "owned_placeholder; sample leak-test imagery pending",
    claimGuardrail: "no R-value, zero-leak, ultralight, self-inflating, or medical-comfort claim",
    forbiddenClaims: [
      "R-value",
      "zero-leak guarantee",
      "ultralight construction",
      "self-inflating design",
      "medical comfort",
    ],
    inTheBox: ["1 inflatable sleeping pad draft", "Stuff sack pending confirmation"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: 48-hour leak check pending",
    inventoryQuantity: 0,
    price: 88,
    material: "Laminated nylon shell with TPU bladder",
    shortSummary:
      "Packable sleep pad for weekend camping, car camping, and guest sleep kits.",
    keyBullets: [
      "Inflatable pad adds packable comfort to simple sleep setups.",
      "Valve and packed size details are easy to understand visually.",
      "Pairs directly with camp pillow for a cleaner bundle story.",
    ],
    keySpecs: defaultSpecs({
      Format: "Inflatable sleeping pad",
      Thickness: "Target 6-8 cm display lane",
      Valve: "Single or dual valve pending final sample",
      "Packed size": "Pending supplier confirmation",
      Weight: "Pending leak and sample review",
    }),
    useCases: ["Weekend camping", "Car camping", "Guest sleep kits"],
  },
  "OG-SS-03": {
    title: "Compressible Camp Pillow",
    backendState: "public_preview",
    priceBandUsd: "19-29",
    assetSource: "owned_placeholder; sleep bundle imagery pending",
    claimGuardrail: "no orthopedic, memory-foam, washable, sleep-improvement, or ultralight claim",
    forbiddenClaims: [
      "orthopedic support",
      "memory foam",
      "washable guarantee",
      "sleep improvement",
      "ultralight construction",
    ],
    inTheBox: ["1 compressible camp pillow", "Stuff sack pending confirmation"],
    statusLabel: "Public preview",
    inventoryState: "Notify-only: fill construction pending",
    inventoryQuantity: 0,
    price: 29,
    material: "Soft textile shell with fill construction pending",
    shortSummary:
      "Low-risk comfort add-on for tent sleep, road trips, and simple sleep bundles.",
    keyBullets: [
      "Soft pillow adds a low-risk comfort add-on for sleep kits.",
      "Compressible shape stores easily inside duffels and camp bins.",
      "Pairs cleanly with pads, bags, and guest sleep bundles.",
    ],
    keySpecs: defaultSpecs({
      Format: "Compressible pillow",
      Fill: "Synthetic or air-core final lock pending",
      Cover: "Soft textile shell",
      "Packed size": "Pending supplier confirmation",
      Weight: "Pending sample review",
    }),
    useCases: ["Tent sleep", "Road trips", "Guest sleep bundles"],
  },
  "OG-CK-01": {
    backendState: "coming_soon",
    priceBandUsd: "49-68",
    assetSource: "owned_placeholder; material and food-contact documents pending",
    claimGuardrail: "no food-safe, BPA-free, non-stick, open-fire-safe, or boil-time claim",
    forbiddenClaims: [
      "food-safe materials",
      "BPA-free materials",
      "non-stick guarantee",
      "open-fire safe use",
      "timed boil performance",
    ],
    inTheBox: ["2-pot nested set draft", "1 lid draft", "Final capacities pending"],
    statusLabel: "Coming soon",
    inventoryState: "Coming soon: material documents pending",
    inventoryQuantity: 0,
    price: 68,
    material: "Nested metal pot set with folding handles; material documents pending",
    shortSummary:
      "Nested cookware set for two-person camp meals, coffee water, and compact kitchen packing while material files are reviewed.",
    keyBullets: [
      "Nested pieces keep cook gear compact between camp meals.",
      "Folding handles create a clear pack-flat storage story.",
      "Simple pot set works as the kitchen category anchor.",
    ],
    keySpecs: defaultSpecs({
      "Set count": "2 pots plus lid, pending final supplier lock",
      Body: "Aluminum or stainless composition pending document review",
      Handle: "Folding handle design",
      Capacity: "Approximate two-pot lane, final liters pending",
      "Food-contact documents": "Pending supplier file review",
    }),
    useCases: ["Two-person camp meals", "Coffee water", "Compact kitchen packing"],
  },
};

const previewProductBySlot = new Map(
  previewProductPool.map((product) => [product.slot, product])
);
const p0Slots = Object.keys(p0OperationsBySlot);

const createP0PreviewProduct = (slot: string): PreviewProductSeed => {
  const operation = p0OperationsBySlot[slot];
  const base = previewProductBySlot.get(slot);

  if (!base && !operation.sku) {
    throw new Error(`Missing P0 seed source for ${slot}.`);
  }

  return {
    ...(base || {}),
    ...operation,
    previewTier: operation.backendState,
    backendState: operation.backendState,
    imageUrls: operation.imageUrls || base?.imageUrls || [],
  } as PreviewProductSeed;
};

export const previewProducts: PreviewProductSeed[] =
  p0Slots.map(createP0PreviewProduct);

export const previewPublicProductHandles = previewProducts.map(
  (product) => product.handle
);

export const previewRetiredProductHandles = Array.from(
  new Set([
    ...previewProductPool
      .map((product) => product.handle)
      .filter((handle) => !previewPublicProductHandles.includes(handle)),
    "reflective-guyline-marker-set",
    "trail-first-aid-organizer-pouch",
    "og-ca-r1-camping-tableware-hanging-bag",
    "og-tr-r1-small-utility-tool-pouch",
  ])
);

export const createPreviewProduct = ({
  product,
  shippingProfileId,
  collectionId,
  categoryResult,
  defaultSalesChannelId,
}: {
  product: PreviewProductSeed;
  shippingProfileId: string;
  collectionId: string;
  categoryResult: { name: string; id: string }[];
  defaultSalesChannelId: string;
}): CreateProductWorkflowInputDTO => {
  const category = categoryResult.find((cat) => cat.name === product.categoryName);

  if (!category) {
    throw new Error(`Missing seeded category ${product.categoryName}`);
  }

  const imageUrls = getPreviewProductImageUrls(product);
  const productInput = {
    title: product.title,
    category_ids: [category.id],
    collection_id: collectionId,
    description: product.description,
    handle: product.handle,
    thumbnail: imageUrls[0],
    metadata: previewMetadata(product),
    weight: product.weight,
    material: product.material,
    origin_country: product.originCountry,
    length: product.dimensions.length,
    width: product.dimensions.width,
    height: product.dimensions.height,
    status: ProductStatus.PUBLISHED,
    shipping_profile_id: shippingProfileId,
    images: imageUrls.map((url) => ({ url })),
    options: [
      {
        title: "Preview Status",
        values: [product.statusLabel],
      },
    ],
    variants: [
      {
        title: product.statusLabel,
        sku: product.sku,
        manage_inventory: true,
        allow_backorder: false,
        prices: [
          {
            currency_code: "usd",
            amount: product.price,
          },
        ],
        options: {
          "Preview Status": product.statusLabel,
        },
        metadata: {
          inventory_state: product.inventoryState,
        },
      },
    ],
    sales_channels: [
      {
        id: defaultSalesChannelId,
      },
    ],
  };

  return productInput as unknown as CreateProductWorkflowInputDTO;
};

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  const countries = ["us"];

  logger.info("Seeding outdoor gear store data...");
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Outdoor Gear Web Store",
          description: "Primary sales channel for the outdoor gear preview.",
        },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Outdoor Gear Storefront Key",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  });

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Outdoor Gear Shop",
          supported_currencies: [
            {
              currency_code: "usd",
              is_default: true,
            },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  });

  logger.info("Seeding US region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];

  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Outdoor Gear Preview Warehouse",
          address: {
            city: "Seattle",
            country_code: "US",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "US ground delivery",
    type: "shipping",
    service_zones: [
      {
        name: "United States",
        geo_zones: [
          {
            country_code: "us",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Preview Ground Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Ground",
          description: "Manual placeholder rate for preview orders.",
          code: "ground",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel.id],
    },
  });

  logger.info("Seeding outdoor product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: previewCategoryData.map((category) => ({
        ...category,
        is_active: true,
      })),
    },
  });

  const { result: collectionResult } = await createCollectionsWorkflow(
    container
  ).run({
    input: {
      collections: previewCollections,
    },
  });

  const collectionByHandle = Object.fromEntries(
    collectionResult.map((collection) => [collection.handle, collection.id])
  );

  logger.info("Seeding expanded outdoor product data...");
  await createProductsWorkflow(container).run({
    input: {
      products: previewProducts.map((product) =>
        createPreviewProduct({
          product,
          shippingProfileId: shippingProfile.id,
          collectionId: collectionByHandle[product.collectionHandle],
          categoryResult,
          defaultSalesChannelId: defaultSalesChannel.id,
        })
      ),
    },
  });

  logger.info("Seeding inventory levels.");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  });

  const quantityBySku = new Map(
    previewProducts.map((product) => [product.sku, product.inventoryQuantity])
  );

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => {
        const inventoryItem = item as { id: string; sku?: string };

        return {
          location_id: stockLocation.id,
          stocked_quantity: quantityBySku.get(inventoryItem.sku ?? "") ?? 0,
          inventory_item_id: inventoryItem.id,
        };
      }),
    },
  });

  logger.info("Finished seeding expanded outdoor gear preview data.");
}
