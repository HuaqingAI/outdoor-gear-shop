import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

const PRODUCTS_PAGE_LIMIT = 12

export const metadata: Metadata = {
  title: "Products | Outdoor Gear Shop",
  description:
    "Browse the first-wave P0 outdoor gear preview products across shelter, packs, sleep systems, camp furniture, camp kitchen, utility, and lighting.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function ProductsPage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      productLimit={PRODUCTS_PAGE_LIMIT}
      countryCode={params.countryCode}
    />
  )
}
