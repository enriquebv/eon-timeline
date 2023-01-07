import { Ocurrence, Range } from '../types'

export type TimelineUnit = 'minute' | 'hour' | 'day'

export interface BuildUnitTimelinesOptions {
  range: Range
  unit: TimelineUnit
  unitScale?: number
}

const MILLISECOND_UNITS = {
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
}

const resetDateMinutes = (timestamp: number): number => new Date(timestamp).setUTCMinutes(0, 0, 0)
const resetDateHours = (timestamp: number): number => new Date(timestamp).setUTCHours(0, 0, 0, 0)

export function buildUnitsTimeline(options: BuildUnitTimelinesOptions): Ocurrence[] {
  const { range, unit } = options
  const unitsScale = options.unitScale || 1

  const millisecondsUnit: number = MILLISECOND_UNITS[unit]
  const rangeTimespan = range.end - range.start
  const ticksRange: Range = {
    start: range.start - rangeTimespan,
    end: range.end + rangeTimespan,
  }
  let closestStart: number

  switch (unit) {
    case 'minute':
    case 'hour':
      closestStart = resetDateMinutes(ticksRange.start)
      break
    case 'day':
      closestStart = resetDateHours(ticksRange.start)
      break
    default:
      throw new Error('invalid')
  }

  let unitsCount = (ticksRange.end - ticksRange.start) / millisecondsUnit / unitsScale
  unitsCount = Math.max(3, unitsCount) // Note: We ensure at least 3 units will be generated.
  const ocurrenceTimespan = millisecondsUnit * unitsScale

  const unitOcurrences: Ocurrence<{ isUnitOcurrence: true }>[] = Array(Math.ceil(unitsCount))
    .fill(null)
    .map((_, i) => new Date(closestStart).valueOf() + ocurrenceTimespan * i)
    .map(
      (t): Ocurrence<{ isUnitOcurrence: true }> => ({
        id: t,
        range: {
          start: t,
          end: t + ocurrenceTimespan,
        },
        data: {
          isUnitOcurrence: true,
        },
      })
    )

  return unitOcurrences
}
