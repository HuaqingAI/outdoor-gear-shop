"use client"

import { useState } from "react"

import { trackPreviewEvent } from "@lib/preview/client"
import { Button, Text } from "@modules/common/components/ui"

import PreviewIntentForm from "../preview-intent-form"

type PreviewIntentPanelProps = {
  countryCode?: string
  productHandle?: string
  collectionHandle?: string
}

const PreviewIntentPanel = ({
  countryCode,
  productHandle,
  collectionHandle,
}: PreviewIntentPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen((current) => !current)
    void trackPreviewEvent("preview_intent_click", {
      countryCode,
      productHandle,
      collectionHandle,
      ctaId: "product_launch_update",
      metadata: {
        placement: "product_panel",
      },
    })
  }

  return (
    <div className="rounded-xl border border-[#d7dfd5] bg-[#eef4ed] p-4">
      <div className="flex flex-col gap-2">
        <Text className="text-sm font-semibold text-[#17261f]">
          Preview-only availability
        </Text>
        <Text className="text-sm text-[#415347]">
          This item is still in preview validation. Request launch updates if you
          want sourcing follow-up when this product clears the next preview
          gate.
        </Text>
      </div>
      <Button
        variant="secondary"
        className="mt-4 w-full border-[#17261f] text-sm text-[#17261f]"
        onClick={handleOpen}
      >
        {isOpen ? "Hide update form" : "Request launch updates"}
      </Button>
      {isOpen && (
        <PreviewIntentForm
          className="mt-4"
          ctaId="product_launch_update"
          title="Track this preview item"
          description="Leave your email to get notified when this item moves past preview-only validation and is ready for a broader launch review."
          countryCode={countryCode}
          productHandle={productHandle}
          collectionHandle={collectionHandle}
          metadata={{
            placement: "product_panel",
          }}
        />
      )}
    </div>
  )
}

export default PreviewIntentPanel
