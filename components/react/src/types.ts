import { Ocurrence, Timeline } from '@eon-timeline/core'

export interface EonTimelineDOMOcurrenceSizes {
  width: number
  startOffset: number
}

export interface EonTimelineOcurrenceProps<Data = undefined> {
  ocurrence: Data extends undefined ? Ocurrence & { data?: undefined } : Ocurrence & { data?: Data }
  timeline: Timeline
  sizes: EonTimelineDOMOcurrenceSizes
}
