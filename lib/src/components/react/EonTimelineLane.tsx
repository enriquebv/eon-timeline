import React, { PropsWithChildren } from 'react'
import { Timeline } from '../../timeline'
import { EonTimelineItemProps, EonTimelineUnitItemProps } from './types'

export interface EonTimelineLaneProps extends PropsWithChildren {
  className?: string
  EventComponent?: React.FC<EonTimelineItemProps> | React.FC<EonTimelineUnitItemProps>
  timeline: Timeline
}

export const EonTimelineLane = (props: EonTimelineLaneProps) => <>{props.children}</>
EonTimelineLane.displayName = 'EonTimelineLane'
