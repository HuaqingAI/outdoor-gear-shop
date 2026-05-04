"use client"

import { useEffect } from "react"

import { trackPreviewEvent } from "@lib/preview/client"
import { PreviewEventName, PreviewTrackingContext } from "@lib/preview/types"

type PreviewPageEventProps = {
  eventName: PreviewEventName
  payload?: Partial<PreviewTrackingContext>
}

const PreviewPageEvent = ({
  eventName,
  payload = {},
}: PreviewPageEventProps) => {
  const serializedPayload = JSON.stringify(payload)

  useEffect(() => {
    void trackPreviewEvent(eventName, JSON.parse(serializedPayload))
  }, [eventName, serializedPayload])

  return null
}

export default PreviewPageEvent
