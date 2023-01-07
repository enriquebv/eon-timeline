import { InvalidOcurrenceRange, TimelineOcurrence } from './timeline-ocurrence'

import type { Ocurrence, Range } from '../types'

const RANGE: Range = {
  start: new Date('2020-01-01T00:00:00.000Z').valueOf(),
  end: new Date('2020-01-01T23:59:59.999Z').valueOf(),
}

const ITEM_OCURRENCE_RANGE = {
  start: new Date('2020-01-01T17:00:00.000Z').valueOf(),
  end: new Date('2020-01-01T17:30:00.000Z').valueOf(),
}

describe('TimelineDatasetOcurrence', () => {
  function getDefaults() {
    const ocurrence: Ocurrence = {
      id: 1,
      range: ITEM_OCURRENCE_RANGE,
    }

    return {
      ocurrence,
      datasetOcurrence: new TimelineOcurrence(ocurrence),
    }
  }

  test('Create a ocurrence with invalid range will emit exception InvalidOcurrenceRange', () => {
    const invalidRange: Range = { start: 400, end: 200 }

    expect(() => new TimelineOcurrence({ id: 1, range: invalidRange })).toThrow(InvalidOcurrenceRange)
  })

  test('Property ocurrenceReference is reference to argument in constructor', () => {
    const { ocurrence, datasetOcurrence } = getDefaults()

    expect(datasetOcurrence.ocurrence).toEqual(ocurrence)
  })

  test('Ocurrence ocurrence range is correctly stored', () => {
    const { datasetOcurrence } = getDefaults()

    expect(datasetOcurrence.start).toBe(ITEM_OCURRENCE_RANGE.start)
    expect(datasetOcurrence.end).toBe(ITEM_OCURRENCE_RANGE.end)
  })

  test('Defines method computeStatusFromRange()', () => {
    const { datasetOcurrence } = getDefaults()

    expect(typeof datasetOcurrence.computeStatusFromRange).toBe('function')
  })

  test('Method computeStatusFromRange() returns undefined', () => {
    const { datasetOcurrence } = getDefaults()

    expect(datasetOcurrence.computeStatusFromRange(RANGE)).toBeUndefined()
  })

  test('Method computeStatusFromRange() hydrates public state if ocurrence is in range', () => {
    const { datasetOcurrence } = getDefaults()

    datasetOcurrence.computeStatusFromRange(RANGE)

    expect(datasetOcurrence).toMatchObject({
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

  test.todo('Set .status.inRange to true if property if ocurrence starts before range, and ends inside the range.')
  test.todo('Set .status.inRange to true property if ocurrence starts inside range, and ends inside the range.')
  test.todo('Set .status.inRange to true property if ocurrence starts inside range, and ends after the range.')
  test.todo('Set .status.inRange to true property if ocurrence starts before range, and ends after the range.')
  test.todo('Method computeStatusFromRange() resets public state if ocurrence is not in range')
})
