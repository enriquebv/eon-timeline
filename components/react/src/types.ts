import { Item, Timeline } from '@eon-timeline/core'

export interface EonTimelineDOMItemSizes {
  width: number
  startOffset: number
}

export interface EonTimelineItemProps<Data = undefined> {
  item: Data extends undefined ? Item & { data?: undefined } : Item & { data?: Data }
  timeline: Timeline
  sizes: EonTimelineDOMItemSizes
}

export type EonTimelineUnitItemProps = EonTimelineItemProps<{ isUnitItem: true }>
