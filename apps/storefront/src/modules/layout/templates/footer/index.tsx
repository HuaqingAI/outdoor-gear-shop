import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import {
  PREVIEW_PRIVACY_PATH,
  PREVIEW_SUPPORT_EMAIL,
  PREVIEW_UNSUBSCRIBE_PATH,
} from "@lib/preview/policy";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="border-t border-[#d7dfd5] bg-[#f7faf6] w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-14 small:py-20">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-[#17261f] hover:text-[#415347] uppercase"
            >
              Outdoor Gear Shop
            </LocalizedClientLink>
            <Text className="mt-3 max-w-xs text-sm leading-6 text-[#637568]">
              Preview-only outdoor gear catalog for sourcing review and launch
              interest.
            </Text>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                          trackingEvent="preview_category_click"
                          trackingContext={{
                            categoryHandle: c.handle,
                            ctaId: "footer_category_link",
                            metadata: {
                              placement: "footer",
                              categoryName: c.name,
                            },
                          }}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                    trackingEvent="preview_category_click"
                                    trackingContext={{
                                      categoryHandle: child.handle,
                                      ctaId: "footer_subcategory_link",
                                      metadata: {
                                        placement: "footer",
                                        categoryName: child.name,
                                      },
                                    }}
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                        trackingEvent="preview_category_click"
                        trackingContext={{
                          collectionHandle: c.handle,
                          ctaId: "footer_collection_link",
                          metadata: {
                            placement: "footer",
                            collectionTitle: c.title,
                          },
                        }}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Preview policy</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href={`mailto:${PREVIEW_SUPPORT_EMAIL}?subject=Outdoor%20Gear%20Shop%20preview`}
                    className="hover:text-ui-fg-base"
                  >
                    Email preview support
                  </a>
                </li>
                <li>
                  <LocalizedClientLink
                    href={PREVIEW_PRIVACY_PATH}
                    className="hover:text-ui-fg-base"
                  >
                    Privacy policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href={PREVIEW_UNSUBSCRIBE_PATH}
                    className="hover:text-ui-fg-base"
                  >
                    Unsubscribe / opt out
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Support</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink
                    href="/products"
                    className="hover:text-ui-fg-base"
                  >
                    Products
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/blog"
                    className="hover:text-ui-fg-base"
                  >
                    Blog
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/events"
                    className="hover:text-ui-fg-base"
                  >
                    Events
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    href={`mailto:${PREVIEW_SUPPORT_EMAIL}?subject=Outdoor%20Gear%20Shop%20preview`}
                    className="hover:text-ui-fg-base"
                  >
                    Contact preview support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-10 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Outdoor Gear Shop. All rights reserved.
          </Text>
          <Text className="txt-compact-small">
            Preview catalog. No public ordering yet.
          </Text>
        </div>
      </div>
    </footer>
  );
}
