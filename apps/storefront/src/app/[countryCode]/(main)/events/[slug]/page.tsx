import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { getEventBySlug } from "@lib/content/preview-content"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"

type Props = {
  params: Promise<{ slug: string; countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  return {
    title: `${event.title} | Outdoor Gear Shop`,
    description: event.summary,
    alternates: {
      canonical: `/${params.countryCode}/events/${event.slug}`,
    },
    openGraph: {
      title: `${event.title} | Outdoor Gear Shop`,
      description: event.summary,
      images: [event.image],
    },
  }
}

export default async function EventDetailPage(props: Props) {
  const params = await props.params
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  return (
    <article className="content-container py-10 small:py-16">
      <div className="grid grid-cols-1 gap-10 large:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)] large:items-start">
        <div>
          <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            {event.type}
          </Text>
          <Heading
            level="h1"
            className="max-w-4xl text-[32px] leading-[38px] text-[#17261f] small:text-[48px] small:leading-[54px]"
          >
            {event.title}
          </Heading>
          <Text className="mt-4 max-w-3xl text-base leading-7 text-[#415347]">
            {event.summary}
          </Text>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[#d7dfd5] bg-[#f4f6f2]">
            <Image
              src={event.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 grid gap-5 text-base leading-7 text-[#415347]">
            {event.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl border border-[#d7dfd5] bg-[#f7faf6] p-5">
          <Text className="w-fit rounded-full border border-[#c8d8c8] bg-[#eef4ed] px-3 py-1 text-xs font-semibold text-[#17261f]">
            {event.status}
          </Text>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
                Timing
              </dt>
              <dd className="mt-1 font-medium text-[#17261f]">{event.date}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
                Location
              </dt>
              <dd className="mt-1 font-medium text-[#17261f]">
                {event.location}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
                Goal
              </dt>
              <dd className="mt-1 leading-6 text-[#415347]">
                {event.conversionGoal}
              </dd>
            </div>
          </dl>
          <LocalizedClientLink
            href={event.relatedPath}
            className="mt-6 inline-flex text-sm font-semibold text-[#17261f] underline decoration-[#9cb09f] underline-offset-4"
            trackingEvent="preview_category_click"
            trackingContext={{
              ctaId: "event_detail_related_link",
              metadata: {
                placement: event.trackingPlacement,
                eventSlug: event.slug,
                utmCampaign: event.recommendedUtm.campaign,
              },
            }}
          >
            Continue to {event.relatedLabel}
          </LocalizedClientLink>
        </aside>
      </div>
    </article>
  )
}
