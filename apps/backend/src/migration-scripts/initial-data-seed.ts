import { MedusaContainer } from "@medusajs/framework";
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

const productImages = {
  organizer:
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
  cookware:
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
  pouch:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
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
            amount: 1000,
          },
          {
            region_id: region.id,
            amount: 1000,
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
      product_categories: [
        {
          name: "Camp Storage",
          is_active: true,
        },
        {
          name: "Cookware Accessories",
          is_active: true,
        },
        {
          name: "Trail Accessories",
          is_active: true,
        },
      ],
    },
  });

  const { result: collectionResult } = await createCollectionsWorkflow(
    container
  ).run({
    input: {
      collections: [
        {
          title: "Preview Outdoor Kit",
          handle: "preview-outdoor-kit",
        },
      ],
    },
  });

  logger.info("Seeding preview product data...");
  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Trail Camp Starter Kit",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Camp Storage")!.id,
          ],
          collection_id: collectionResult[0].id,
          description:
            "A preview bundle for organizing small camp essentials before sourcing and margin checks are finalized.",
          handle: "trail-camp-starter-kit",
          weight: 900,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: productImages.organizer,
            },
          ],
          options: [
            {
              title: "Bundle",
              values: ["Preview"],
            },
          ],
          variants: [
            {
              title: "Preview",
              sku: "OG-STARTER-KIT-01",
              options: {
                Bundle: "Preview",
              },
              prices: [
                {
                  amount: 4900,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel.id,
            },
          ],
        },
        {
          title: "Nesting Camp Cookware Organizer",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Cookware Accessories")!
              .id,
          ],
          collection_id: collectionResult[0].id,
          description:
            "A lightweight organizer concept for separating cookware, utensils, and cleanup items in a camp box.",
          handle: "nesting-camp-cookware-organizer",
          weight: 350,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: productImages.cookware,
            },
          ],
          options: [
            {
              title: "Size",
              values: ["Standard"],
            },
          ],
          variants: [
            {
              title: "Standard",
              sku: "OG-COOK-ORG-01",
              options: {
                Size: "Standard",
              },
              prices: [
                {
                  amount: 2400,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel.id,
            },
          ],
        },
        {
          title: "Trail Repair Pouch",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Trail Accessories")!.id,
          ],
          collection_id: collectionResult[0].id,
          description:
            "A compact pouch concept for straps, patches, cord, and small field-repair items.",
          handle: "trail-repair-pouch",
          weight: 200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: productImages.pouch,
            },
          ],
          options: [
            {
              title: "Color",
              values: ["Forest", "Slate"],
            },
          ],
          variants: [
            {
              title: "Forest",
              sku: "OG-REPAIR-FOREST-01",
              options: {
                Color: "Forest",
              },
              prices: [
                {
                  amount: 1800,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Slate",
              sku: "OG-REPAIR-SLATE-01",
              options: {
                Color: "Slate",
              },
              prices: [
                {
                  amount: 1800,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel.id,
            },
          ],
        },
      ],
    },
  });

  logger.info("Seeding inventory levels.");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 25,
        inventory_item_id: item.id,
      })),
    },
  });

  logger.info("Finished seeding outdoor gear preview data.");
}
