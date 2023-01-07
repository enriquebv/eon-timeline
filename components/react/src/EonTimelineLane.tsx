import React, { PropsWithChildren } from 'react'
import { Timeline } from '@eon-timeline/core'
import { EonTimelineOcurrenceProps, EonTimelineUnitOcurrenceProps } from './types'

export interface EonTimelineLaneProps<Data = any> extends PropsWithChildren {
  className?: string
  OcurrenceComponent?: React.FC<EonTimelineOcurrenceProps<Data>> | React.FC<EonTimelineUnitOcurrenceProps>
  timeline: Timeline
}

export const EonTimelineLane = (props: EonTimelineLaneProps) => <>{props.children}</>
EonTimelineLane.displayName = 'EonTimelineLane'
