import { Metadata } from "next"
import Image from "next/image"

import {
  fieldNotesPageMetadata,
  previewArticles,
} from "@lib/content/preview-content"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"

export const metadata: Metadata = {
  title: fieldNotesPageMetadata.title,
  description: fieldNotesPageMetadata.description,
  keywords: fieldNotesPageMetadata.keywords,
  openGraph: {
    title: fieldNotesPageMetadata.title,
    description: fieldNotesPageMetadata.description,
  },
}

export default function FieldNotesPage() {
  return (
    <div className="content-container py-10 small:py-16">
      <div className="mb-10 max-w-3xl">
        <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
          Blog
        </Text>
        <Heading
          level="h1"
          className="text-[32px] leading-[38px] text-[#17261f] small:text-[40px] small:leading-[46px]"
        >
          Outdoor gear buying notes
        </Heading>
        <Text className="mt-3 text-base leading-6 text-[#415347]">
          Six readable guides cover shelter, packs, sleep systems, camp
          kitchen, apparel, and lighting so product browsing has a real content
          path instead of a dead-end blog shell.
        </Text>
      </div>

      <ul className="grid grid-cols-1 gap-6 small:grid-cols-3">
        {previewArticles.map((article) => (
          <li
            key={article.slug}
            className="overflow-hidden rounded-2xl border border-[#d7dfd5] bg-white"
          >
            <LocalizedClientLink href={`/blog/${article.slug}`}>
              <div className="relative aspect-video bg-[#f4f6f2]">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </LocalizedClientLink>
            <div className="flex flex-col gap-3 p-5">
              <Text className="text-xs font-semibold uppercase tracking-[0.06em] text-[#637568]">
                {article.eyebrow} / {article.readTime}
              </Text>
              <LocalizedClientLink href={`/blog/${article.slug}`}>
                <Heading level="h2" className="text-xl leading-7 text-[#17261f]">
                  {article.title}
                </Heading>
              </LocalizedClientLink>
              <Text className="text-sm leading-6 text-[#415347]">
                {article.summary}
              </Text>
              <Text className="text-sm leading-6 text-[#17261f]">
                Goal: {article.conversionGoal}
              </Text>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-[#c8d8c8] bg-[#eef4ed] px-3 py-1 text-xs font-semibold text-[#17261f]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <LocalizedClientLink
                href={`/blog/${article.slug}`}
                className="mt-2 text-sm font-semibold text-[#17261f] underline decoration-[#9cb09f] underline-offset-4"
                trackingEvent="preview_category_click"
                trackingContext={{
                  ctaId: "field_note_detail_link",
                  metadata: {
                    placement: "field_notes",
                    articleSlug: article.slug,
                  },
                }}
              >
                Read article
              </LocalizedClientLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
