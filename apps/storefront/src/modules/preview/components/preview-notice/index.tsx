"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"

import { trackPreviewEvent } from "@lib/preview/client"
import {
  PREVIEW_PRIVACY_PATH,
  PREVIEW_SUPPORT_EMAIL,
  PREVIEW_UNSUBSCRIBE_PATH,
} from "@lib/preview/policy"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TrackedExternalLink from "@modules/common/components/tracked-external-link"
import { Button, Text } from "@modules/common/components/ui"

import PreviewIntentForm from "../preview-intent-form"

const PreviewNotice = () => {
  const pathname = usePathname()
  const params = useParams()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const countryCode =
    typeof params.countryCode === "string" ? params.countryCode : undefined

  useEffect(() => {
    void trackPreviewEvent("preview_notice_view", {
      countryCode,
      pagePath: pathname,
      ctaId: "preview_notice",
      metadata: {
        placement: "global_notice",
      },
    })
  }, [countryCode, pathname])

  const handleLaunchUpdateClick = () => {
    setIsFormOpen((current) => !current)
    void trackPreviewEvent("preview_intent_click", {
      countryCode,
      pagePath: pathname,
      ctaId: "notice_launch_update",
      metadata: {
        placement: "global_notice",
      },
    })
  }

  return (
    <section className="border-b border-[#d7dfd5] bg-[#eef4ed]">
      <div className="content-container py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[#17261f]">
              Preview only
            </Text>
            <Text className="max-w-3xl text-sm text-[#415347]">
              Catalog availability, pricing, and media are still under sourcing
              review. Use launch updates to signal interest before public launch.
            </Text>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant="secondary"
              className="border-[#17261f] text-[#17261f]"
              onClick={handleLaunchUpdateClick}
            >
              {isFormOpen ? "Hide update form" : "Request launch updates"}
            </Button>
            <TrackedExternalLink
              href={`mailto:${PREVIEW_SUPPORT_EMAIL}?subject=Outdoor%20Gear%20Shop%20preview`}
              trackingEvent="preview_support_click"
              trackingContext={{
                countryCode,
                pagePath: pathname,
                ctaId: "notice_support_email",
                metadata: {
                  placement: "global_notice",
                  supportEmail: PREVIEW_SUPPORT_EMAIL,
                },
              }}
              className="text-sm font-medium text-[#17261f] underline decoration-[#9cb09f] underline-offset-4"
            >
              Email preview support
            </TrackedExternalLink>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#415347]">
          <LocalizedClientLink
            href={PREVIEW_PRIVACY_PATH}
            className="underline decoration-[#9cb09f] underline-offset-4"
          >
            Privacy policy
          </LocalizedClientLink>
          <LocalizedClientLink
            href={PREVIEW_UNSUBSCRIBE_PATH}
            className="underline decoration-[#9cb09f] underline-offset-4"
          >
            Unsubscribe / opt out
          </LocalizedClientLink>
        </div>
        {isFormOpen && (
          <PreviewIntentForm
            className="mt-4"
            ctaId="notice_launch_update"
            title="Request preview launch updates"
            description="Share your email so we can read intent by source, page, and product interest during sourcing review."
            countryCode={countryCode}
            metadata={{
              placement: "global_notice",
            }}
          />
        )}
      </div>
    </section>
  )
}

export default PreviewNotice
