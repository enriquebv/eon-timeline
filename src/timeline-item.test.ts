import { TimelineItem } from './timeline-item'

import type { Item, Range } from './types'

const RANGE: Range = {
  start: new Date('2020-01-01T00:00:00.000Z').valueOf(),
  end: new Date('2020-01-01T23:59:59.999Z').valueOf(),
}

const ITEM_OCURRENCE_RANGE = {
  start: new Date('2020-01-01T17:00:00.000Z').valueOf(),
  end: new Date('2020-01-01T17:30:00.000Z').valueOf(),
}

describe('TimelineDatasetItem', () => {
  function getDefaults() {
    const item: Item = {
      id: 1,
      ocurrence: ITEM_OCURRENCE_RANGE,
    }

    return {
      item,
      datasetItem: new TimelineItem(item),
    }
  }

  test('Property itemReference is reference to argument in constructor', () => {
    const { item, datasetItem } = getDefaults()

    expect(datasetItem.itemReference).toEqual(item)
  })

  test('Item ocurrence range is correctly stored', () => {
    const { datasetItem } = getDefaults()

    expect(datasetItem.start).toBe(ITEM_OCURRENCE_RANGE.start)
    expect(datasetItem.end).toBe(ITEM_OCURRENCE_RANGE.end)
  })

  test('Defines method computeStatusFromRange()', () => {
    const { datasetItem } = getDefaults()

    expect(typeof datasetItem.computeStatusFromRange).toBe('function')
  })

  test('Method computeStatusFromRange() returns undefined', () => {
    const { datasetItem } = getDefaults()

    expect(datasetItem.computeStatusFromRange(RANGE)).toBeUndefined()
  })

  test('Method computeStatusFromRange() correctly hydrates public state', () => {
    const { datasetItem } = getDefaults()

    datasetItem.computeStatusFromRange(RANGE)

    expect(datasetItem).toMatchObject({
      start: expect.any(Number),
      end: expect.any(Number),
      status: expect.objectContaining({
        lastRangeReference: expect.objectContaining(RANGE),
        inRange: true,
        offsetFromRangeStart: expect.any(Number),
        offsetFromRangeEnd: expect.any(Number),
        rangeSpaceUsage: expect.any(Number),
      }),
    })
  })
})
