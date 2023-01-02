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
  test('If range is given, first unit item starts before that range, and last item ends after that range', () => {
    const unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })
    const firstItem = unitItems[0]
    const lastUnitItem = unitItems[unitItems.length - 1]

    expect(firstItem.ocurrence.start).toBeLessThan(EXAMPLE_RANGE.start)
    expect(lastUnitItem.ocurrence.end).toBeGreaterThan(EXAMPLE_RANGE.end)
  })

  test('If "minute" unit is provided, each item range should be one minute timespan', () => {
    const unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'minute' })

    for (const unitItem of unitItems) {
      expect(unitItem.ocurrence.end - unitItem.ocurrence.start).toBe(MILLISECOND_UNITS.minute)
    }
  })

  test('If "hour" unit is provided, each item range should be one hour timespan', () => {
    const unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })

    for (const unitItem of unitItems) {
      expect(unitItem.ocurrence.end - unitItem.ocurrence.start).toBe(MILLISECOND_UNITS.hour)
    }
  })

  test('If "day" unit is provided, each item range should be one day timespan', () => {
    const unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'day' })

    for (const unitItem of unitItems) {
      expect(unitItem.ocurrence.end - unitItem.ocurrence.start).toBe(MILLISECOND_UNITS.day)
    }
  })

  test('If unit and unitScale are provided, each item range timespan should be modified to represent that scale', () => {
    const unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour', unitScale: 2 })
    const expectedTimespan = MILLISECOND_UNITS.hour * 2

    for (const unitItem of unitItems) {
      expect(unitItem.ocurrence.end - unitItem.ocurrence.start).toBe(expectedTimespan)
    }
  })

  test('Second item range must start where previous item range ends', () => {
    let unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })

    expect(unitItems[1].ocurrence.start).toBe(unitItems[0].ocurrence.end)

    unitItems = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour', unitScale: 2 })

    expect(unitItems[1].ocurrence.start).toBe(unitItems[0].ocurrence.end)
  })
})
