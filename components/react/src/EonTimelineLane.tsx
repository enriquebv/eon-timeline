import React, { PropsWithChildren } from 'react'
import { Timeline } from '@eon-timeline/core'
import { EonTimelineOcurrenceProps } from './types'

export interface EonTimelineLaneProps<Data = any> extends PropsWithChildren {
  className?: string
  OcurrenceComponent?: React.FC<EonTimelineOcurrenceProps<Data>>
  timeline: Timeline
}

export const EonTimelineLane = (props: EonTimelineLaneProps) => <>{props.children}</>
EonTimelineLane.displayName = 'EonTimelineLane'
