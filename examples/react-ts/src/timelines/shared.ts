import { Range } from '@eon-timeline/core'
import makeRandomItemCollection from '../../../utils'

export type ExampleRangeUnit = 'minute' | 'hour' | 'day'

const now = Date.now()
export const RANGES_PER_UNIT: Record<ExampleRangeUnit, Range> = {
  minute: { start: now, end: now + 60_000 },
  hour: { start: now, end: now + 3_600_000 },
  day: { start: now, end: now + 86_400_000 },
}

export type ExampleProps = { rangeUnit: ExampleRangeUnit }

export function makeItemsCollection() {
  return makeRandomItemCollection({
    gapRangeInMinutes: {
      min: 1,
      max: 5,
    },
    durationRangeInMinutes: {
      min: 5,
      max: 10,
    },
  })
}
