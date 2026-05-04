import { Metadata } from "next"
import Image from "next/image"

import { eventsPageMetadata, previewEvents } from "@lib/content/preview-content"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"

export const metadata: Metadata = {
  title: eventsPageMetadata.title,
  description: eventsPageMetadata.description,
  keywords: eventsPageMetadata.keywords,
  openGraph: {
    title: eventsPageMetadata.title,
    description: eventsPageMetadata.description,
  },
}

export default function EventsPage() {
  return (
    <div className="content-container py-10 small:py-16">
      <div className="mb-10 max-w-3xl">
        <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
          Events
        </Text>
        <Heading
          level="h1"
          className="text-[32px] leading-[38px] text-[#17261f] small:text-[40px] small:leading-[46px]"
        >
          Preview activity and follow-ups
        </Heading>
        <Text className="mt-3 text-base leading-6 text-[#415347]">
          Activity pages keep visitors moving between the preview catalog and
          launch-update flows while sourcing review is still open. Scheduled
          field tests and partner events remain content-owner follow-ups, but
          every event card now has a stable detail page and product path.
        </Text>
      </div>

      <ul className="grid grid-cols-1 gap-6 small:grid-cols-2">
        {previewEvents.map((event) => (
          <li
            key={event.slug}
            className="overflow-hidden rounded-2xl border border-[#d7dfd5] bg-white"
          >
            <LocalizedClientLink href={`/events/${event.slug}`}>
              <div className="relative aspect-video bg-[#f4f6f2]">
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </LocalizedClientLink>
            <div className="flex flex-col gap-3 p-5">
              <Text className="w-fit rounded-full border border-[#c8d8c8] bg-[#eef4ed] px-3 py-1 text-xs font-semibold text-[#17261f]">
                {event.status}
              </Text>
              <LocalizedClientLink href={`/events/${event.slug}`}>
                <Heading level="h2" className="text-xl leading-7 text-[#17261f]">
                  {event.title}
                </Heading>
              </LocalizedClientLink>
              <Text className="text-sm leading-6 text-[#415347]">
                {event.summary}
              </Text>
              <div className="grid grid-cols-1 gap-2 text-sm text-[#637568]">
                <Text className="text-sm">Timing: {event.date}</Text>
                <Text className="text-sm">Location: {event.location}</Text>
                <Text className="text-sm">Type: {event.type}</Text>
                <Text className="text-sm text-[#17261f]">
                  Goal: {event.conversionGoal}
                </Text>
              </div>
              <LocalizedClientLink
                href={`/events/${event.slug}`}
                className="mt-2 text-sm font-semibold text-[#17261f] underline decoration-[#9cb09f] underline-offset-4"
                trackingEvent="preview_category_click"
                trackingContext={{
                  ctaId: "event_detail_link",
                  metadata: {
                    placement: event.trackingPlacement,
                    eventSlug: event.slug,
                    utmCampaign: event.recommendedUtm.campaign,
                  },
                }}
              >
                View event details
              </LocalizedClientLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
