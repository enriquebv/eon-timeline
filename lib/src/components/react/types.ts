import { PropsWithChildren } from 'react'
import { Item, Timeline } from '../../index'

export interface EonTimelineProps extends PropsWithChildren {
  timelines: Timeline[]
  range: Range
  className?: string
  ItemComponent?: (props: EonTimelineItemProps) => JSX.Element
  onRangeChange(range: Range): void
}

export interface EonTimelineDOMItemSizes {
  width: number
  startOffset: number
}

export interface EonTimelineItemProps<Data = undefined> {
  item: Data extends undefined ? Item : Item & { data: Data }
  timeline: Timeline
  sizes: EonTimelineDOMItemSizes
}

export type EonTimelineUnitItemProps = EonTimelineItemProps<{ isUnitItem: true }>
