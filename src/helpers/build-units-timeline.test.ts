import { Range } from '../types'
import buildUnitsTimeline from './build-units-timeline'

const EXAMPLE_TIMESTAMP = 1640995200000
const HOUR_IN_MILLISECONDS = 3_600_000
const EXAMPLE_RANGE: Range = {
  start: EXAMPLE_TIMESTAMP,
  end: EXAMPLE_TIMESTAMP + HOUR_IN_MILLISECONDS,
}

describe('buildUnitsTimeline', () => {
  test('If range is given, will return expected items array', () => {
    // Note: buildUnitsTimeline uses an offset to ensure there is always an item to render.
    // This offset is the size of the range timespan. That means we provide an range with
    // an hour of timespan, will return items present one hour before, and one hour after.

    const result = buildUnitsTimeline({ range: EXAMPLE_RANGE, unit: 'hour' })
    const [firstUnitItem, , lastUnitItem] = result

    expect(result).toHaveLength(3) // 1 hour + 1 hour offset before + 1 hour offset after = 3
    expect(firstUnitItem.ocurrence.start).toBeLessThan(EXAMPLE_RANGE.start)
    expect(lastUnitItem.ocurrence.start).toBeGreaterThan(EXAMPLE_RANGE.start)
  })
})
