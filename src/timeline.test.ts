import { ItemNotFoundWithId, Timeline, UnknownScale } from './timeline'
import { Item, Range, TickScale } from './types'

const DEFAULT_TIMESTAMP = 1640995200000
const HOUR_IN_MILLISECONDS = 3_600_000
const DEFAULT_RANGE = {
  start: DEFAULT_TIMESTAMP,
  end: DEFAULT_TIMESTAMP + HOUR_IN_MILLISECONDS * 24,
}

const FIRST_EXAMPLE_ITEM: Item = {
  id: 1,
  ocurrence: {
    start: DEFAULT_TIMESTAMP,
    end: DEFAULT_TIMESTAMP + 1000,
  },
}

const SECOND_EXAMPLE_ITEM: Item = {
  id: 2,
  ocurrence: {
    start: DEFAULT_TIMESTAMP + 1000,
    end: DEFAULT_TIMESTAMP + 5000,
  },
}

describe('Timeline', () => {
  let timeline: Timeline

  beforeEach(() => {
    timeline = new Timeline({
      items: [],
      range: DEFAULT_RANGE,
    })
  })

  test('.items property is defined and is a Map', () => {
    expect(timeline.items).toBeInstanceOf(Map)
  })

  test('Items added by constructor are correctly registered', () => {
    timeline = new Timeline({
      items: [FIRST_EXAMPLE_ITEM],
    })

    expect(timeline.items.get(1)).not.toBeUndefined()
  })

  test('.addItem() method is defined', () => {
    expect(timeline.addItem).not.toBeUndefined()
  })

  test('.updateItem() method is defined', () => {
    expect(timeline.updateItem).not.toBeUndefined()
  })

  test('.addItem() method correctly registers item', () => {
    timeline.addItem(SECOND_EXAMPLE_ITEM)

    expect(timeline.items.get(2)).not.toBeUndefined()
  })

  test(".updateItem() method throws ItemNotFoundWithId if item don't exists in timeline.", () => {
    expect(() => timeline.updateItem(FIRST_EXAMPLE_ITEM)).toThrow(ItemNotFoundWithId)
  })

  test('.updateItem() method correctly updates item', () => {
    const UPDATED_ITEM = { ...FIRST_EXAMPLE_ITEM, customProperty: Math.random() } as Item

    timeline.addItem(FIRST_EXAMPLE_ITEM)

    expect((timeline.items.get(1)?.itemReference as any).customProperty).toBeUndefined()

    timeline.updateItem(UPDATED_ITEM)

    expect((timeline.items.get(1)?.itemReference as any).customProperty).not.toBeUndefined()
    expect((timeline.items.get(1)?.itemReference as any).customProperty).toBe((UPDATED_ITEM as any).customProperty)
  })

  test('.removeItem() is defined', () => {
    expect(timeline.removeItem).not.toBeUndefined()
  })

  test('.removeItem() method correctly removes item', () => {
    expect(() => timeline.removeItem(1)).toThrow(ItemNotFoundWithId)

    timeline.addItem(FIRST_EXAMPLE_ITEM)
    timeline.removeItem(1)

    expect(timeline.items.get(1)).toBeUndefined()
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

  test('.getItemsInRange method returns an array of items', () => {
    expect(timeline.getItemsInRange()).toBeInstanceOf(Array)
  })

  test('.getRangeTicks method correctly returns list of timestamps with offset', () => {
    const scales: TickScale[] = ['seconds', 'minutes', 'hours', 'days']

    for (const scale of scales) {
      const dates = timeline.getRangeTimestamps(scale)

      expect(dates.length).toBeGreaterThan(0)
      expect(dates[0]).toMatchObject({
        timestamp: expect.any(Number),
        offsetStart: expect.any(Number),
      })
    }
  })

  test('.getRangeTicks method throws UnknownTickScaleException if scale is unknown', () => {
    expect(() => timeline.getRangeTimestamps('years' as TickScale)).toThrow(UnknownScale)
  })

  test('.itemsRange property without items is null', () => {
    expect(timeline.itemsRange).toBeNull()
  })

  test('.itemsRange property with items is not null', () => {
    timeline.addItem(FIRST_EXAMPLE_ITEM)
    expect(timeline.itemsRange).not.toBeNull()
  })

  test('.itemsRange property should contain correct range adding single item in constructor', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      items: [FIRST_EXAMPLE_ITEM],
    })

    expect((timeline.itemsRange as Range).start).toBe(FIRST_EXAMPLE_ITEM.ocurrence.start)
    expect((timeline.itemsRange as Range).end).toBe(FIRST_EXAMPLE_ITEM.ocurrence.end)
  })

  test('.itemsRange property should contain correct range adding multiple item in constructor', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      items: [FIRST_EXAMPLE_ITEM, SECOND_EXAMPLE_ITEM],
    })

    expect((timeline.itemsRange as Range).start).toBe(FIRST_EXAMPLE_ITEM.ocurrence.start)
    expect((timeline.itemsRange as Range).end).toBe(SECOND_EXAMPLE_ITEM.ocurrence.end)
  })

  test('.itemsRange property should contain correct range adding items', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      items: [FIRST_EXAMPLE_ITEM],
    })

    expect((timeline.itemsRange as Range).start).toBe(FIRST_EXAMPLE_ITEM.ocurrence.start)
    expect((timeline.itemsRange as Range).end).toBe(FIRST_EXAMPLE_ITEM.ocurrence.end)

    timeline.addItem(SECOND_EXAMPLE_ITEM)
    expect((timeline.itemsRange as Range).start).toBe(FIRST_EXAMPLE_ITEM.ocurrence.start)
    expect((timeline.itemsRange as Range).end).toBe(SECOND_EXAMPLE_ITEM.ocurrence.end)
  })

  test('.itemsRange property should contain correct range removing items', () => {
    timeline = new Timeline({
      range: DEFAULT_RANGE,
      items: [FIRST_EXAMPLE_ITEM, SECOND_EXAMPLE_ITEM],
    })

    timeline.removeItem(SECOND_EXAMPLE_ITEM.id)

    expect((timeline.itemsRange as Range).start).toBe(FIRST_EXAMPLE_ITEM.ocurrence.start)
    expect((timeline.itemsRange as Range).end).toBe(FIRST_EXAMPLE_ITEM.ocurrence.end)
  })
})
