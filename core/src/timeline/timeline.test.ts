import { OcurrenceNotFoundWithId, Timeline } from './timeline'
import { Ocurrence, Range } from '../types'

const DEFAULT_TIMESTAMP = 1640995200000
const HOUR_IN_MILLISECONDS = 3_600_000
const DEFAULT_RANGE = {
  start: DEFAULT_TIMESTAMP,
  end: DEFAULT_TIMESTAMP + HOUR_IN_MILLISECONDS * 24,
}

const FIRST_EXAMPLE_OCURRENCE: Ocurrence = {
  id: 1,
  range: {
    start: DEFAULT_TIMESTAMP,
    end: DEFAULT_TIMESTAMP + 1000,
  },
}

const SECOND_EXAMPLE_ITEM: Ocurrence = {
  id: 2,
  range: {
    start: DEFAULT_TIMESTAMP + 1000,
    end: DEFAULT_TIMESTAMP + 5000,
  },
}

describe('Timeline', () => {
  let timeline: Timeline

  beforeEach(() => {
    timeline = new Timeline({
      ocurrences: [],
      range: DEFAULT_RANGE,
    })
  })

  test('Ocurrences added by constructor are correctly registered', () => {
    timeline = new Timeline({
      ocurrences: [FIRST_EXAMPLE_OCURRENCE],
    })

    expect(timeline.getTimelineOcurrence(1)).not.toBeUndefined()
  })

  test('.addOcurrence() method correctly registers ocurrence', () => {
    timeline.addOcurrence(FIRST_EXAMPLE_OCURRENCE)

    expect(timeline.getTimelineOcurrence(1)).not.toBeUndefined()
  })

  test(".updateOcurrence() method throws OcurrenceNotFoundWithId if ocurrence don't exists in timeline.", () => {
    expect(() => timeline.updateOcurrence(FIRST_EXAMPLE_OCURRENCE)).toThrow(OcurrenceNotFoundWithId)
  })

  test('.updateOcurrence() method correctly updates ocurrence', () => {
    type OcurrenceData = { customProperty: number }
    timeline.addOcurrence(FIRST_EXAMPLE_OCURRENCE)

    const timelineOcurrence = timeline.getTimelineOcurrence(1)

    expect((timelineOcurrence as any).ocurrence.data?.customProperty).toBeUndefined()

    const UPDATED_OCURRENCE: Ocurrence<OcurrenceData> = {
      ...FIRST_EXAMPLE_OCURRENCE,
      data: { customProperty: Math.random() },
    }
    timeline.updateOcurrence(UPDATED_OCURRENCE)

    expect(timeline.getTimelineOcurrence<OcurrenceData>(1)?.ocurrence.data?.customProperty).not.toBeUndefined()
    expect(timeline.getTimelineOcurrence<OcurrenceData>(1)?.ocurrence.data?.customProperty).toBe(
      UPDATED_OCURRENCE.data?.customProperty
    )
  })

  test('.removeOcurrence() is defined', () => {
    expect(timeline.removeOcurrence).not.toBeUndefined()
  })

  test('.removeOcurrence() method correctly removes ocurrence', () => {
    expect(() => timeline.removeOcurrence(1)).toThrow(OcurrenceNotFoundWithId)

    timeline.addOcurrence(FIRST_EXAMPLE_OCURRENCE)
    timeline.removeOcurrence(1)

    expect(timeline.getTimelineOcurrence(1)).toBeUndefined()
  })

  test('.setRange() method modifies internal values', () => {
    const MODIFIED_RANGE: Range = {
      start: DEFAULT_RANGE.start + 10_000,
      end: DEFAULT_RANGE.start + 50_000,
    }

    timeline.setRange(MODIFIED_RANGE)
    expect(timeline.range).toEqual(MODIFIED_RANGE)
    expect(timeline.timespan).toBe(40_000)
  })

  test('.getOcurrencesInRange method returns an array of ocurrences', () => {
    expect(timeline.getOcurrencesInRange()).toBeInstanceOf(Array)
  })

  test('.ocurrencesRange property without ocurrences is null', () => {
    expect(timeline.ocurrencesRange).toBeNull()
  })

  test('.ocurrencesRange property with ocurrences is not null', () => {
    timeline.addOcurrence(FIRST_EXAMPLE_OCURRENCE)
    expect(timeline.ocurrencesRange).not.toBeNull()
  })

  test('.ocurrencesRange property should contain correct range adding single ocurrence in constructor', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      ocurrences: [FIRST_EXAMPLE_OCURRENCE],
    })

    expect((timeline.ocurrencesRange as Range).start).toBe(FIRST_EXAMPLE_OCURRENCE.range.start)
    expect((timeline.ocurrencesRange as Range).end).toBe(FIRST_EXAMPLE_OCURRENCE.range.end)
  })

  test('.ocurrencesRange property should contain correct range adding multiple ocurrence in constructor', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      ocurrences: [FIRST_EXAMPLE_OCURRENCE, SECOND_EXAMPLE_ITEM],
    })

    expect((timeline.ocurrencesRange as Range).start).toBe(FIRST_EXAMPLE_OCURRENCE.range.start)
    expect((timeline.ocurrencesRange as Range).end).toBe(SECOND_EXAMPLE_ITEM.range.end)
  })

  test('.ocurrencesRange property should contain correct range adding ocurrences', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      ocurrences: [FIRST_EXAMPLE_OCURRENCE],
    })

    expect((timeline.ocurrencesRange as Range).start).toBe(FIRST_EXAMPLE_OCURRENCE.range.start)
    expect((timeline.ocurrencesRange as Range).end).toBe(FIRST_EXAMPLE_OCURRENCE.range.end)

    timeline.addOcurrence(SECOND_EXAMPLE_ITEM)
    expect((timeline.ocurrencesRange as Range).start).toBe(FIRST_EXAMPLE_OCURRENCE.range.start)
    expect((timeline.ocurrencesRange as Range).end).toBe(SECOND_EXAMPLE_ITEM.range.end)
  })

  test('.ocurrencesRange property should contain correct range removing ocurrences', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      ocurrences: [FIRST_EXAMPLE_OCURRENCE, SECOND_EXAMPLE_ITEM],
    })

    timeline.removeOcurrence(SECOND_EXAMPLE_ITEM.id)

    expect((timeline.ocurrencesRange as Range).start).toBe(FIRST_EXAMPLE_OCURRENCE.range.start)
    expect((timeline.ocurrencesRange as Range).end).toBe(FIRST_EXAMPLE_OCURRENCE.range.end)
  })
})
