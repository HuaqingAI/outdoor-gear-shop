import { Heading, Text } from "@modules/common/components/ui"
import { PREVIEW_SUPPORT_EMAIL } from "@lib/preview/policy"

export default function EmailPreferencesPage() {
  return (
    <div className="content-container py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[#415347]">
            Preview email preferences
          </Text>
          <Heading level="h1" className="text-4xl leading-tight text-[#17261f]">
            Opt out or request deletion
          </Heading>
          <Text className="text-base text-[#415347]">
            Preview update emails are optional. This page explains how to stop
            them or ask us to delete your preview request details.
          </Text>
        </div>

        <section className="flex flex-col gap-2">
          <Heading level="h2" className="text-2xl text-[#17261f]">
            How to opt out
          </Heading>
          <Text className="text-base text-[#415347]">
            Send an email to{" "}
            <a
              href={`mailto:${PREVIEW_SUPPORT_EMAIL}?subject=Preview%20email%20opt-out`}
              className="underline underline-offset-4"
            >
              {PREVIEW_SUPPORT_EMAIL}
            </a>{" "}
            with the subject line <span className="font-medium">Preview email
            opt-out</span> from the address you used on the form.
          </Text>
        </section>

        <section className="flex flex-col gap-2">
          <Heading level="h2" className="text-2xl text-[#17261f]">
            How to request deletion
          </Heading>
          <Text className="text-base text-[#415347]">
            Send an email to{" "}
            <a
              href={`mailto:${PREVIEW_SUPPORT_EMAIL}?subject=Preview%20data%20deletion`}
              className="underline underline-offset-4"
            >
              {PREVIEW_SUPPORT_EMAIL}
            </a>{" "}
            with the subject line <span className="font-medium">Preview data
            deletion</span> so the team can remove that preview lead from
            follow-up use.
          </Text>
        </section>
      </div>
    </div>
  )
}
