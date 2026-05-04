import { MedusaContainer } from "@medusajs/framework";
import { CreateProductWorkflowInputDTO } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  batchInventoryItemLevelsWorkflow,
  batchLinkProductsToCategoryWorkflow,
  batchLinkProductsToCollectionWorkflow,
  createCollectionsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  linkProductsToSalesChannelWorkflow,
  updateCollectionsWorkflow,
  updateProductCategoriesWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows";

import {
  createPreviewProduct,
  getPreviewProductImageUrls,
  previewMetadata,
  previewCategoryData,
  previewCollections,
  previewProducts,
  previewRetiredProductHandles,
} from "./initial-data-seed";

type QueryRow = Record<string, any>;
type HandleRow = QueryRow & { handle: string };
type InventoryLevelRow = {
  id?: string;
  inventory_item_id: string;
};

const byHandle = <T extends { handle: string }>(items: T[]) =>
  new Map(items.map((item) => [item.handle, item]));

const rowsWithHandle = (items: QueryRow[]): HandleRow[] =>
  items.filter((item): item is HandleRow => typeof item.handle === "string");

const productMatchesPreviewSeed = (
  existingProduct: QueryRow | undefined,
  previewProduct: { handle: string; sku: string }
) =>
  existingProduct?.handle === previewProduct.handle ||
  (existingProduct?.variants ?? []).some(
    (variant: { sku?: string }) => variant.sku === previewProduct.sku
  );

const byPreviewProductIdentity = (
  existingProducts: QueryRow[],
  previewProduct: { handle: string; sku: string }
) =>
  existingProducts.find((existingProduct) =>
    productMatchesPreviewSeed(existingProduct, previewProduct)
  );

const queryEntity = async (
  query: { graph: (args: any) => Promise<{ data: QueryRow[] }> },
  entity: string,
  fields: string[],
  filters?: Record<string, unknown>
) => {
  const { data } = await query.graph({
    entity,
    fields,
    filters,
    pagination: {
      take: 1000,
      skip: 0,
    },
  });

  return data;
};

const getRequiredSalesChannelId = async (
  query: { graph: (args: any) => Promise<{ data: QueryRow[] }> }
) => {
  const stores = await queryEntity(query, "store", [
    "id",
    "default_sales_channel_id",
  ]);
  const defaultSalesChannelId = stores.find(
    (store) => typeof store.default_sales_channel_id === "string"
  )?.default_sales_channel_id;

  if (defaultSalesChannelId) {
    return defaultSalesChannelId;
  }

  const salesChannels = await queryEntity(query, "sales_channel", ["id"]);
  const salesChannelId = salesChannels[0]?.id;

  if (!salesChannelId) {
    throw new Error(
      "Cannot ensure preview catalog baseline without a sales channel. Run the full initial data seed first."
    );
  }

  return salesChannelId;
};

const getRequiredShippingProfileId = async (
  query: { graph: (args: any) => Promise<{ data: QueryRow[] }> }
) => {
  const shippingProfiles = await queryEntity(query, "shipping_profile", ["id"]);
  const shippingProfileId = shippingProfiles[0]?.id;

  if (!shippingProfileId) {
    throw new Error(
      "Cannot ensure preview catalog baseline without a shipping profile. Run Medusa migrations and the full initial data seed first."
    );
  }

  return shippingProfileId;
};

const getRequiredStockLocationId = async (
  query: { graph: (args: any) => Promise<{ data: QueryRow[] }> }
) => {
  const stockLocations = await queryEntity(query, "stock_location", ["id"]);
  const stockLocationId = stockLocations[0]?.id;

  if (!stockLocationId) {
    throw new Error(
      "Cannot ensure preview catalog baseline without a stock location. Run the full initial data seed first."
    );
  }

  return stockLocationId;
};

export default async function ensure_preview_catalog_baseline({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Ensuring P0 public preview catalog baseline...");

  const defaultSalesChannelId = await getRequiredSalesChannelId(query);
  const shippingProfileId = await getRequiredShippingProfileId(query);
  const stockLocationId = await getRequiredStockLocationId(query);

  const existingCategories = await queryEntity(query, "product_category", [
    "id",
    "name",
    "handle",
  ]);
  const categoryByHandle = byHandle(rowsWithHandle(existingCategories));
  const missingCategories = previewCategoryData.filter(
    (category) => !categoryByHandle.has(category.handle)
  );

  if (missingCategories.length > 0) {
    logger.info(`Creating ${missingCategories.length} missing preview categories.`);
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((category) => ({
          ...category,
          is_active: true,
        })),
      },
    });

    for (const category of result) {
      categoryByHandle.set(category.handle, category);
    }
  }

  const categoriesToUpdate = previewCategoryData
    .map((category) => {
      const existing = categoryByHandle.get(category.handle);

      if (!existing) {
        return null;
      }

      return {
        id: existing.id,
        name: category.name,
        handle: category.handle,
        description: category.description,
        is_active: true,
      };
    })
    .filter(Boolean) as {
    id: string;
    name: string;
    handle: string;
    description: string;
    is_active: boolean;
  }[];

  for (const category of categoriesToUpdate) {
    await updateProductCategoriesWorkflow(container).run({
      input: {
        selector: { id: category.id },
        update: {
          name: category.name,
          handle: category.handle,
          description: category.description,
          is_active: category.is_active,
        },
      },
    });
  }

  const existingCollections = await queryEntity(query, "product_collection", [
    "id",
    "title",
    "handle",
  ]);
  const collectionByHandle = byHandle(rowsWithHandle(existingCollections));
  const missingCollections = previewCollections.filter(
    (collection) => !collectionByHandle.has(collection.handle)
  );

  if (missingCollections.length > 0) {
    logger.info(`Creating ${missingCollections.length} missing preview collections.`);
    const { result } = await createCollectionsWorkflow(container).run({
      input: {
        collections: missingCollections,
      },
    });

    for (const collection of result) {
      collectionByHandle.set(collection.handle, collection);
    }
  }

  for (const collection of previewCollections) {
    const existing = collectionByHandle.get(collection.handle);

    if (!existing) {
      continue;
    }

    await updateCollectionsWorkflow(container).run({
      input: {
        selector: { id: existing.id },
        update: collection,
      },
    });
  }

  const refreshedCategories = await queryEntity(query, "product_category", [
    "id",
    "name",
    "handle",
  ]);
  const categoryResult = refreshedCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));
  const refreshedCollections = await queryEntity(query, "product_collection", [
    "id",
    "handle",
  ]);
  const refreshedCollectionByHandle = Object.fromEntries(
    refreshedCollections.map((collection) => [collection.handle, collection.id])
  );

  const existingProducts = await queryEntity(query, "product", [
    "id",
    "handle",
    "variants.id",
    "variants.sku",
  ]);
  const missingProducts = previewProducts.filter(
    (product) => !byPreviewProductIdentity(existingProducts, product)
  );

  if (missingProducts.length > 0) {
    logger.info(`Creating ${missingProducts.length} missing preview products.`);
    await createProductsWorkflow(container).run({
      input: {
        products: missingProducts.map((product) =>
          createPreviewProduct({
            product,
            shippingProfileId,
            collectionId: refreshedCollectionByHandle[product.collectionHandle],
            categoryResult,
            defaultSalesChannelId,
          })
        ),
      },
    });
  }

  const productsAfterCreate = await queryEntity(query, "product", [
    "id",
    "handle",
    "title",
    "variants.id",
    "variants.sku",
  ]);

  const productsToUpdate = previewProducts
    .map((product) => {
      const existing = byPreviewProductIdentity(productsAfterCreate, product);

      if (!existing) {
        return null;
      }

      const category = categoryResult.find(
        (categoryItem) => categoryItem.name === product.categoryName
      );
      const variant = (existing.variants ?? []).find(
        (item: { sku?: string }) => item.sku === product.sku
      );
      const imageUrls = getPreviewProductImageUrls(product);

      if (!category) {
        throw new Error(`Missing preview category ${product.categoryName}`);
      }

      return {
        id: existing.id,
        title: product.title,
        category_ids: [category.id],
        collection_id: refreshedCollectionByHandle[product.collectionHandle],
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
            id: variant?.id,
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
    })
    .filter(Boolean) as (CreateProductWorkflowInputDTO & { id: string })[];

  if (productsToUpdate.length > 0) {
    logger.info(`Updating ${productsToUpdate.length} preview products.`);
    await updateProductsWorkflow(container).run({
      input: {
        products: productsToUpdate as any,
      },
    });
  }

  const baselineProducts = await queryEntity(query, "product", [
    "id",
    "handle",
    "variants.id",
    "variants.sku",
  ]);
  const baselineProductByHandle = byHandle(rowsWithHandle(baselineProducts));

  for (const collection of previewCollections) {
    const collectionId = refreshedCollectionByHandle[collection.handle];
    const productIds = previewProducts
      .filter((product) => product.collectionHandle === collection.handle)
      .map((product) => baselineProductByHandle.get(product.handle)?.id)
      .filter(Boolean) as string[];

    if (collectionId && productIds.length > 0) {
      await batchLinkProductsToCollectionWorkflow(container).run({
        input: {
          id: collectionId,
          add: productIds,
        },
      });
    }
  }

  for (const category of previewCategoryData) {
    const categoryId = refreshedCategories.find(
      (categoryItem) => categoryItem.handle === category.handle
    )?.id;
    const productIds = previewProducts
      .filter((product) => product.categoryName === category.name)
      .map((product) => baselineProductByHandle.get(product.handle)?.id)
      .filter(Boolean) as string[];

    if (categoryId && productIds.length > 0) {
      await batchLinkProductsToCategoryWorkflow(container).run({
        input: {
          id: categoryId,
          add: productIds,
        },
      });
    }
  }

  await linkProductsToSalesChannelWorkflow(container).run({
    input: {
      id: defaultSalesChannelId,
      add: previewProducts
        .map((product) => baselineProductByHandle.get(product.handle)?.id)
        .filter(Boolean) as string[],
    },
  });

  const retiredProducts = previewRetiredProductHandles
    .map((handle) => baselineProductByHandle.get(handle))
    .filter(Boolean) as { id: string; handle: string }[];

  if (retiredProducts.length > 0) {
    logger.info(`Drafting ${retiredProducts.length} retired preview products.`);
    await updateProductsWorkflow(container).run({
      input: {
        products: retiredProducts.map((product) => ({
          id: product.id,
          status: ProductStatus.DRAFT,
        })),
      },
    });
  }

  const inventoryModuleService = container.resolve(ModuleRegistrationName.INVENTORY);
  const inventoryItems = await queryEntity(query, "inventory_item", [
    "id",
    "sku",
  ]);
  const quantityBySku = new Map(
    previewProducts.map((product) => [product.sku, product.inventoryQuantity])
  );
  const previewInventoryItems = inventoryItems.filter((item) =>
    quantityBySku.has(item.sku)
  );
  const inventoryLevels =
    previewInventoryItems.length > 0
      ? await inventoryModuleService.listInventoryLevels({
          inventory_item_id: previewInventoryItems.map((item) => item.id),
          location_id: stockLocationId,
        })
      : [];
  const levelByInventoryItemId = new Map(
    (inventoryLevels as InventoryLevelRow[]).map((level) => [
      level.inventory_item_id,
      level,
    ])
  );

  await batchInventoryItemLevelsWorkflow(container).run({
    input: {
      create: previewInventoryItems
        .filter((item) => !levelByInventoryItemId.has(item.id))
        .map((item) => ({
          inventory_item_id: item.id,
          location_id: stockLocationId,
          stocked_quantity: quantityBySku.get(item.sku) ?? 0,
        })),
      update: previewInventoryItems
        .filter((item) => levelByInventoryItemId.has(item.id))
        .map((item) => ({
          id: levelByInventoryItemId.get(item.id)?.id,
          inventory_item_id: item.id,
          location_id: stockLocationId,
          stocked_quantity: quantityBySku.get(item.sku) ?? 0,
        })),
      delete: [],
    },
  });

  const publicProducts = await queryEntity(query, "product", [
    "id",
    "handle",
    "status",
  ]);
  const baselineHandles = new Set(previewProducts.map((product) => product.handle));
  const publicBaselineProducts = publicProducts.filter(
    (product) =>
      baselineHandles.has(product.handle) &&
      product.status === ProductStatus.PUBLISHED
  );
  const publicRetiredProducts = publicProducts.filter(
    (product) =>
      previewRetiredProductHandles.includes(product.handle) &&
      product.status === ProductStatus.PUBLISHED
  );

  if (
    publicBaselineProducts.length !== previewProducts.length ||
    publicRetiredProducts.length > 0
  ) {
    throw new Error(
      `Preview catalog baseline failed: ${publicBaselineProducts.length}/${previewProducts.length} P0 products are public and ${publicRetiredProducts.length} retired products are still public.`
    );
  }

  logger.info(
    `Preview catalog baseline ready: ${publicBaselineProducts.length} P0 public products.`
  );
}
