"use client"

import { useParams } from "next/navigation"

import { Heading, Text } from "@modules/common/components/ui"
import PreviewIntentForm from "@modules/preview/components/preview-intent-form"

const Summary = () => {
  const params = useParams()
  const countryCode =
    typeof params.countryCode === "string" ? params.countryCode : undefined

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Preview request
      </Heading>
      <Text className="text-sm text-ui-fg-subtle">
        The preview catalog is collecting launch intent instead of accepting
        orders, discounts, or fulfillment choices. Share interest and our team
        will follow up when items clear sourcing validation.
      </Text>
      <PreviewIntentForm
        ctaId="cart_launch_update"
        title="Request preview launch updates"
        description="Leave your email to receive sourcing and availability updates instead of starting a purchase."
        countryCode={countryCode}
        metadata={{
          placement: "cart_preview_panel",
        }}
      />
    </div>
  )
}

export default Summary
