import { Timeline, UnknownScaleException } from './timeline'
import { TickScale } from './types'

describe('Timeline', () => {
  function getDefaults() {
    const HOUR_IN_MILLISECONDS = 3_600_000
    const THREE_HOURS_RANGE = {
      start: Date.now(),
      end: Date.now() + (3 * HOUR_IN_MILLISECONDS)
    }
    const item = {
      id: 1,
      ocurrence: {
        start: Date.now(),
        end: Date.now(),
      },
    }
    const timeline = new Timeline({
      items: [item],
      range: THREE_HOURS_RANGE,
    })

    return { item, timeline, THREE_HOURS_RANGE }
  }

  test('Items added in constructor are correctly stored', () => {
    const { timeline } = getDefaults()

    expect(timeline.items).toBeInstanceOf(Map)
    expect(timeline.items.size).toBe(1)
  })

  test('Items stored are accesible by id', () => {
    const { timeline } = getDefaults()

    expect(timeline.items.get(1)).not.toBeUndefined()
  })

  test('Defines .addItem()', () => {
    const { timeline } = getDefaults()

    expect(timeline.addItem).not.toBeUndefined()
  })

  test('.addItem() correctly add item', () => {
    const { timeline } = getDefaults()

    timeline.addItem({
      id: 2,
      ocurrence: {
        start: Date.now(),
        end: Date.now(),
      },
    })

    expect(timeline.items.get(2)).not.toBeUndefined()
  })

  test('Defines .updateItem()', () => {
    const { timeline } = getDefaults()

    expect(timeline.updateItem).not.toBeUndefined()
  })

  test('.updateItem() correctly replaces item', () => {
    const randomPropertyValue = Math.random()
    const { timeline } = getDefaults()

    timeline.addItem({
      id: 1,
      randomProperty: randomPropertyValue,
      ocurrence: {
        start: Date.now(),
        end: Date.now(),
      },
    } as any)

    expect((timeline.items.get(1)?.itemReference as any).randomProperty).not.toBeUndefined()
    expect((timeline.items.get(1)?.itemReference as any).randomProperty).toBe(randomPropertyValue)
  })

  test('Defines .removeItem()', () => {
    const { timeline } = getDefaults()

    expect(timeline.removeItem).not.toBeUndefined()
  })

  test('.removeItem() correctly removes item', () => {
    const { timeline } = getDefaults()

    timeline.removeItem(1)

    expect(timeline.items.get(1)).toBeUndefined()
  })

  test('Options change using .setTimeWindow', () => {
    const { timeline } = getDefaults()
    const start = Date.now()
    const end = Date.now() + 86_400_000

    timeline.setTimeWindow({
      start,
      end
    })

    expect(timeline.options.timeWindow.start).toBe(start)
    expect(timeline.options.timeWindow.end).toBe(end)
  })

  test('getItemsInRange returns an array of items', () => {
    const { timeline } = getDefaults()
    
    expect(timeline.getItemsInRange()).toBeInstanceOf(Array)
  })
  
  test('.getRangeTicks method correctly returns list of timestamps with offset', () => {
    const { timeline } = getDefaults()
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

  test('.getRangeTicks throws UnknownTickScaleException if scale is unknown', () => {
    const { timeline } = getDefaults()

    expect(() => timeline.getRangeTimestamps('years' as TickScale)).toThrow(UnknownScaleException)
  })
})
