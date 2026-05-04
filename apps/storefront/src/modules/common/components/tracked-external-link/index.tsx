"use client"

import React from "react"

import { trackPreviewEvent } from "@lib/preview/client"
import { PreviewEventName, PreviewTrackingContext } from "@lib/preview/types"

type TrackedExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  trackingEvent?: PreviewEventName
  trackingContext?: Partial<PreviewTrackingContext>
}

const TrackedExternalLink = ({
  href,
  onClick,
  trackingEvent,
  trackingContext,
  children,
  ...props
}: TrackedExternalLinkProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (trackingEvent) {
      void trackPreviewEvent(trackingEvent, trackingContext)
    }
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default TrackedExternalLink
