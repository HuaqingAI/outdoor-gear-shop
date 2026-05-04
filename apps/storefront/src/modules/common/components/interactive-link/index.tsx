import { ArrowUpRightMini } from "@medusajs/icons"
import { PreviewEventName, PreviewTrackingContext } from "@lib/preview/types"
import { Text } from "@modules/common/components/ui"
import React from "react"
import LocalizedClientLink from "../localized-client-link"
type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  trackingEvent?: PreviewEventName
  trackingContext?: Partial<PreviewTrackingContext>
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  trackingEvent,
  trackingContext,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group"
      href={href}
      onClick={onClick}
      trackingEvent={trackingEvent}
      trackingContext={trackingContext}
      {...props}
    >
      <Text className="text-ui-fg-interactive">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="var(--fg-interactive)"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
