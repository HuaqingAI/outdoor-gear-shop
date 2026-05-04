"use client"

import { FormEvent, useState } from "react"

import { submitPreviewIntent } from "@lib/preview/client"
import {
  PREVIEW_EMAIL_CONTROLS,
  PREVIEW_EMAIL_DISCLOSURE,
  PREVIEW_PRIVACY_PATH,
  PREVIEW_UNSUBSCRIBE_PATH,
} from "@lib/preview/policy"
import { PreviewTrackingContext } from "@lib/preview/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Input, Text } from "@modules/common/components/ui"

type PreviewIntentFormProps = {
  ctaId: string
  title?: string
  description?: string
  countryCode?: string
  productHandle?: string
  categoryHandle?: string
  collectionHandle?: string
  metadata?: Record<string, unknown>
  className?: string
}

const PreviewIntentForm = ({
  ctaId,
  title = "Request launch updates",
  description = "Leave your email to receive sourcing and preview launch-status updates for this catalog.",
  countryCode,
  productHandle,
  categoryHandle,
  collectionHandle,
  metadata,
  className,
}: PreviewIntentFormProps) => {
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setError("Enter an email address.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await submitPreviewIntent({
      email,
      notes,
      ctaId,
      countryCode,
      productHandle,
      categoryHandle,
      collectionHandle,
      metadata,
    } satisfies Partial<PreviewTrackingContext> & {
      email: string
      notes?: string
      ctaId: string
    })

    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setIsSubmitted(true)
    setEmail("")
    setNotes("")
  }

  return (
    <form
      className={`flex flex-col gap-3 rounded-lg border border-[#d7dfd5] bg-white/90 p-4 ${className || ""}`}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <Text className="text-sm font-semibold text-[#17261f]">{title}</Text>
        <Text className="text-sm text-[#415347]">{description}</Text>
      </div>
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@example.com"
        autoComplete="email"
        aria-label="Email address"
      />
      <Text className="text-xs leading-5 text-[#415347]">
        {PREVIEW_EMAIL_DISCLOSURE}
      </Text>
      <Text className="text-xs leading-5 text-[#415347]">
        {PREVIEW_EMAIL_CONTROLS} Review{" "}
        <LocalizedClientLink
          href={PREVIEW_PRIVACY_PATH}
          className="underline underline-offset-4"
        >
          privacy policy
        </LocalizedClientLink>{" "}
        or go to{" "}
        <LocalizedClientLink
          href={PREVIEW_UNSUBSCRIBE_PATH}
          className="underline underline-offset-4"
        >
          unsubscribe / opt out
        </LocalizedClientLink>
        .
      </Text>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Optional: what product, category, or sourcing update should we follow up on?"
        className="min-h-24 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Request launch updates
      </Button>
      {error && <Text className="text-sm text-red-700">{error}</Text>}
      {isSubmitted && (
        <Text className="text-sm text-emerald-700">
          Request received. We will use this preview signal in sourcing review
          and launch planning only.
        </Text>
      )}
    </form>
  )
}

export default PreviewIntentForm
