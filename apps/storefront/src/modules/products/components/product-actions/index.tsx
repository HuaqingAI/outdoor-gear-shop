"use client"

import { trackPreviewEvent } from "@lib/preview/client"
import { HttpTypes } from "@medusajs/types"
import { Button, Text } from "@modules/common/components/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { getProductPreviewInfo } from "@modules/products/utils/preview-metadata"
import PreviewIntentForm from "@modules/preview/components/preview-intent-form"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const countryCode = useParams().countryCode as string
  const previewInfo = getProductPreviewInfo(product)

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant, pathname, router, searchParams])

  const handlePreviewRequest = () => {
    setIsFormOpen((current) => !current)

    void trackPreviewEvent("preview_intent_click", {
      countryCode,
      pagePath: pathname,
      productHandle: product.handle || undefined,
      collectionHandle: product.collection?.handle || undefined,
      ctaId: "product_launch_update",
      metadata: {
        placement: "product_actions",
        variantId: selectedVariant?.id,
        selectedOptions: options,
      },
    })
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <Button
          onClick={handlePreviewRequest}
          disabled={!!disabled}
          variant="primary"
          className="w-full text-sm"
          data-testid="preview-intent-button"
        >
          {isFormOpen
            ? "Hide update form"
            : previewInfo.previewTier === "coming_soon"
            ? "Notify me when available"
            : "Request launch updates"}
        </Button>
        <Text className="text-sm leading-6 text-[#637568]">
          {previewInfo.inventoryState
            ? `${previewInfo.inventoryState}. `
            : ""}
          This preview catalog is collecting launch interest only. Live ordering,
          shipping, returns, and service policies are not active yet.
        </Text>
        {isFormOpen && (
          <PreviewIntentForm
            ctaId="product_launch_update"
            title="Track this preview item"
            description="Leave your email to get notified when this item moves past preview-only validation."
            countryCode={countryCode}
            productHandle={product.handle || undefined}
            collectionHandle={product.collection?.handle || undefined}
            metadata={{
              placement: "product_actions",
              variantId: selectedVariant?.id,
              selectedOptions: options,
            }}
          />
        )}
      </div>
    </>
  )
}
