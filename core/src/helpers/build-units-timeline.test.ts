import { Range } from '../types'
import { buildUnitsTimeline } from './build-units-timeline'

const EXAMPLE_TIMESTAMP = 1640995200000
const HOUR_IN_MILLISECONDS = 3_600_000
const EXAMPLE_RANGE: Range = {
  start: EXAMPLE_TIMESTAMP,
  end: EXAMPLE_TIMESTAMP + HOUR_IN_MILLISECONDS,
}

const MILLISECOND_UNITS = {
  second: 1000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
}

describe('buildUnitsTimeline', () => {
  test('If range is given, first unit even starts before that range, and last ocurrence ends after that range', () => {
    const unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })
    const firstOcurrence = unitOcurrences[0]
    const lastUnitOcurrence = unitOcurrences[unitOcurrences.length - 1]

    expect(firstOcurrence.range.start).toBeLessThan(EXAMPLE_RANGE.start)
    expect(lastUnitOcurrence.range.end).toBeGreaterThan(EXAMPLE_RANGE.end)
  })

  test('If "minute" unit is provided, each ocurrence range should be one minute timespan', () => {
    const unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'minute' })

    for (const unitOcurrence of unitOcurrences) {
      expect(unitOcurrence.range.end - unitOcurrence.range.start).toBe(MILLISECOND_UNITS.minute)
    }
  })

  test('If "hour" unit is provided, each ocurrence range should be one hour timespan', () => {
    const unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })

    for (const unitOcurrence of unitOcurrences) {
      expect(unitOcurrence.range.end - unitOcurrence.range.start).toBe(MILLISECOND_UNITS.hour)
    }
  })

  test('If "day" unit is provided, each ocurrence range should be one day timespan', () => {
    const unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'day' })

    for (const unitOcurrence of unitOcurrences) {
      expect(unitOcurrence.range.end - unitOcurrence.range.start).toBe(MILLISECOND_UNITS.day)
    }
  })

  test('If unit and unitScale are provided, each ocurrence range timespan should be modified to represent that scale', () => {
    const unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour', unitScale: 2 })
    const expectedTimespan = MILLISECOND_UNITS.hour * 2

    for (const unitOcurrence of unitOcurrences) {
      expect(unitOcurrence.range.end - unitOcurrence.range.start).toBe(expectedTimespan)
    }
  })

  test('Second ocurrence range must start where previous ocurrence range ends', () => {
    let unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })

    expect(unitOcurrences[1].range.start).toBe(unitOcurrences[0].range.end)

    unitOcurrences = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour', unitScale: 2 })

    expect(unitOcurrences[1].range.start).toBe(unitOcurrences[0].range.end)
  })
})
