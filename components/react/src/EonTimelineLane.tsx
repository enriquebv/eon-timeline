import React, { PropsWithChildren } from 'react'
import { Timeline } from '@eon-timeline/core'
import { EonTimelineItemProps, EonTimelineUnitItemProps } from './types'

export interface EonTimelineLaneProps<Data = any> extends PropsWithChildren {
  className?: string
  EventComponent?: React.FC<EonTimelineItemProps<Data>> | React.FC<EonTimelineUnitItemProps>
  timeline: Timeline
}

export const EonTimelineLane = (props: EonTimelineLaneProps) => <>{props.children}</>
EonTimelineLane.displayName = 'EonTimelineLane'
