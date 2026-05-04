import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"
import {
  PREVIEW_EMAIL_CONTROLS,
  PREVIEW_EMAIL_DISCLOSURE,
  PREVIEW_SUPPORT_EMAIL,
  PREVIEW_UNSUBSCRIBE_PATH,
} from "@lib/preview/policy"

export default function PrivacyPolicyPage() {
  return (
    <div className="content-container py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[#415347]">
            Preview privacy
          </Text>
          <Heading level="h1" className="text-4xl leading-tight text-[#17261f]">
            Privacy policy for preview launch updates
          </Heading>
          <Text className="text-base text-[#415347]">
            This storefront is collecting preview interest only. It is not
            processing public purchases, fulfillment, or after-sales service.
          </Text>
        </div>

        <section className="flex flex-col gap-2">
          <Heading level="h2" className="text-2xl text-[#17261f]">
            What we collect
          </Heading>
          <Text className="text-base text-[#415347]">
            We collect the email address you submit through preview launch
            update forms, along with optional notes about product, category, or
            sourcing interest.
          </Text>
        </section>

        <section className="flex flex-col gap-2">
          <Heading level="h2" className="text-2xl text-[#17261f]">
            How we use it
          </Heading>
          <Text className="text-base text-[#415347]">
            {PREVIEW_EMAIL_DISCLOSURE}
          </Text>
          <Text className="text-base text-[#415347]">
            We also review aggregate preview demand signals so the team can
            decide what to source or launch next.
          </Text>
        </section>

        <section className="flex flex-col gap-2">
          <Heading level="h2" className="text-2xl text-[#17261f]">
            Your choices
          </Heading>
          <Text className="text-base text-[#415347]">
            {PREVIEW_EMAIL_CONTROLS}
          </Text>
          <Text className="text-base text-[#415347]">
            Email requests can be sent to{" "}
            <a
              href={`mailto:${PREVIEW_SUPPORT_EMAIL}`}
              className="underline underline-offset-4"
            >
              {PREVIEW_SUPPORT_EMAIL}
            </a>
            . You can also manage future preview emails from{" "}
            <LocalizedClientLink
              href={PREVIEW_UNSUBSCRIBE_PATH}
              className="underline underline-offset-4"
            >
              the email preferences page
            </LocalizedClientLink>
            .
          </Text>
        </section>
      </div>
    </div>
  )
}
