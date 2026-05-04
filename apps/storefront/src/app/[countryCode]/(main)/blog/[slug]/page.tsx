import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { getArticleBySlug } from "@lib/content/preview-content"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"

type Props = {
  params: Promise<{ slug: string; countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
    alternates: {
      canonical: `/${params.countryCode}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.image],
    },
  }
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="content-container py-10 small:py-16">
      <div className="grid grid-cols-1 gap-10 large:grid-cols-[minmax(0,0.75fr)_minmax(280px,0.25fr)] large:items-start">
        <div>
          <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            {article.eyebrow} / {article.readTime}
          </Text>
          <Heading
            level="h1"
            className="max-w-4xl text-[32px] leading-[38px] text-[#17261f] small:text-[48px] small:leading-[54px]"
          >
            {article.title}
          </Heading>
          <Text className="mt-4 max-w-3xl text-base leading-7 text-[#415347]">
            {article.summary}
          </Text>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[#d7dfd5] bg-[#f4f6f2]">
            <Image
              src={article.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 72vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 grid gap-5 text-base leading-7 text-[#415347]">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl border border-[#d7dfd5] bg-[#f7faf6] p-5">
          <Text className="text-xs font-semibold uppercase tracking-[0.08em] text-[#637568]">
            Related catalog path
          </Text>
          <Heading level="h2" className="mt-2 text-xl leading-7 text-[#17261f]">
            {article.relatedLabel}
          </Heading>
          <Text className="mt-3 text-sm leading-6 text-[#415347]">
            {article.conversionGoal}
          </Text>
          <LocalizedClientLink
            href={article.relatedPath}
            className="mt-5 inline-flex text-sm font-semibold text-[#17261f] underline decoration-[#9cb09f] underline-offset-4"
            trackingEvent="preview_category_click"
            trackingContext={{
              ctaId: "blog_detail_related_link",
              metadata: {
                placement: "blog_detail",
                articleSlug: article.slug,
              },
            }}
          >
            Browse {article.relatedLabel}
          </LocalizedClientLink>
          <div className="mt-5 flex flex-wrap gap-2">
            {article.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[#c8d8c8] bg-white px-3 py-1 text-xs font-semibold text-[#17261f]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </article>
  )
}
