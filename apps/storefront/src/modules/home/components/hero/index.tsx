import InteractiveLink from "@modules/common/components/interactive-link"
import { Heading, Text } from "@modules/common/components/ui"
import PreviewPageEvent from "@modules/preview/components/preview-page-event"

const Hero = () => {
  return (
    <div className="relative min-h-[460px] w-full overflow-hidden border-b border-[#d7dfd5] bg-[#17261f] small:min-h-[600px]">
      <PreviewPageEvent
        eventName="preview_home_view"
        payload={{
          ctaId: "home_hero",
          metadata: {
            placement: "hero",
          },
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1712]/92 via-[#0d1712]/62 to-[#0d1712]/18" />
      <div className="content-container relative z-10 flex min-h-[460px] flex-col justify-center gap-7 py-12 text-white small:min-h-[600px] small:py-20">
        <div className="max-w-3xl">
          <Text className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/78">
            Preview outdoor catalog
          </Text>
          <Heading
            level="h1"
            className="text-[36px] leading-[42px] small:text-[56px] small:leading-[64px] font-semibold"
          >
            Outdoor Gear Shop
          </Heading>
          <Text className="mt-5 max-w-2xl text-base leading-7 text-white/82 small:text-lg small:leading-8">
            Trail-ready camp storage, cookware accessories, and repair
            essentials, reviewed as preview candidates before public launch.
          </Text>
        </div>
        <div className="grid max-w-3xl grid-cols-1 gap-3 text-sm text-white/82 small:grid-cols-3">
          <span className="border border-white/30 bg-white/10 px-3 py-2">
            Preview only
          </span>
          <span className="border border-white/30 bg-white/10 px-3 py-2">
            Sourcing review active
          </span>
          <span className="border border-white/30 bg-white/10 px-3 py-2">
            24 preview products
          </span>
          <span className="border border-white/30 bg-white/10 px-3 py-2">
            6 gear collections
          </span>
        </div>
        <div className="flex flex-col gap-4 small:flex-row small:items-center">
          <InteractiveLink
            href="/products"
            trackingEvent="preview_category_click"
            trackingContext={{
              ctaId: "hero_shop_all",
              metadata: {
                placement: "hero",
                destination: "products",
              },
            }}
          >
            Browse products
          </InteractiveLink>
          <Text className="text-sm text-white/70">
            Early traffic and intent are captured before launch.
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Hero
