"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

import { trackPreviewEvent } from "@lib/preview/client"
import { PreviewEventName, PreviewTrackingContext } from "@lib/preview/types"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  onClick,
  trackingEvent,
  trackingContext,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  passHref?: true
  trackingEvent?: PreviewEventName
  trackingContext?: Partial<PreviewTrackingContext>
  [x: string]: unknown
}) => {
  const { countryCode } = useParams()
  const resolvedCountryCode =
    typeof countryCode === "string" ? countryCode : undefined

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event)

    if (trackingEvent) {
      void trackPreviewEvent(trackingEvent, {
        countryCode: resolvedCountryCode,
        ...trackingContext,
      })
    }
  }

  return (
    <Link href={`/${countryCode}${href}`} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
