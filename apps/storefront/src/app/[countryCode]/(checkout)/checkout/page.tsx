import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading, Text } from "@modules/common/components/ui"
import PreviewIntentForm from "@modules/preview/components/preview-intent-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preview updates",
}

export default async function Checkout({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  return (
    <div className="content-container py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="rounded-lg border border-[#d7dfd5] bg-[#eef4ed] p-6">
          <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[#17261f]">
            Preview only
          </Text>
          <Heading level="h1" className="mt-3 text-3xl-regular text-[#17261f]">
            Purchases are not available in this preview
          </Heading>
          <Text className="mt-4 text-base-regular text-[#415347]">
            This route is guarded while the store is in preview validation. We
            are collecting launch interest only, so the live order path is not
            loaded.
          </Text>
        </div>
        <PreviewIntentForm
          ctaId="checkout_guard_launch_update"
          title="Request launch updates"
          description="Leave your email and we will follow up when this catalog clears the preview-only gate."
          countryCode={countryCode}
          metadata={{
            placement: "checkout_guard",
          }}
        />
        <div>
          <LocalizedClientLink href="/products">
            <Button variant="secondary">Browse preview catalog</Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
