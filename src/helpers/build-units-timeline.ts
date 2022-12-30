import { Item, Range } from '../types'

export type TimelineUnit = 'minute' | 'hour' | 'day'

export interface BuildUnitTimelinesOptions {
  range: Range
  unit: TimelineUnit
  unitScale?: number
}

const UNIT_MILLISECONDS = {
  second: 1000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
}

export default function buildUnitsTimeline(options: BuildUnitTimelinesOptions): Item[] {
  const { range, unit } = options
  const cleanDateSeconds = (t: number): number => new Date(t).setSeconds(0, 0)
  const cleanDateMinutes = (t: number): number => new Date(t).setUTCMinutes(0, 0, 0)
  const cleanDateHours = (t: number): number => new Date(t).setUTCHours(0, 0, 0, 0)

  const millisecondsUnit: number = UNIT_MILLISECONDS[unit]
  const rangeTimespan = range.end - range.start
  const ticksRange: Range = {
    start: range.start - rangeTimespan,
    end: range.end + rangeTimespan,
  }

  const realRange = Math.ceil((ticksRange.end - ticksRange.start) / millisecondsUnit)
  let cleanStart: number

  switch (unit) {
    case 'minute':
      cleanStart = cleanDateSeconds(ticksRange.start)
      break
    case 'hour':
      cleanStart = cleanDateMinutes(ticksRange.start)
      break
    case 'day':
      cleanStart = cleanDateHours(ticksRange.start)
      break
    default:
      throw new Error('invalid')
  }

  const items: Item[] = Array(realRange)
    .fill(null)
    .map((_, i) => new Date(cleanStart).valueOf() + millisecondsUnit * i)
    .map(
      (t): Item => ({
        id: t,
        ocurrence: {
          start: t,
          end: t + millisecondsUnit,
        },
      })
    )

  return items
}
