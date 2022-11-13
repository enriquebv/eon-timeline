import type { Item, Range, TickScale } from './types'
import { TimelineItem } from './timeline-item'

interface Options {
  timeWindow: Range
}

export class UnknownScaleException extends Error {
  constructor() {
    super('Unknown scale, please use one of type TickScale.')
  }
}

export class Timeline {
  items: Map<string | number, TimelineItem> = new Map()
  options: Options;
  timeWindowDuration: number
  addItem: (item: Item) => void

  constructor(options: { items: Item[]; range: Range }) {
    this.timeWindowDuration = options.range.end - options.range.start

    this.options = {
      timeWindow: { ...options.range },
    }

    for (const item of options.items) {
      this.items.set(item.id, new TimelineItem(item))
    }

    // Note: addItem is just an alias to updateItem method.
    this.addItem = this.updateItem.bind(this)
    this.calculate = this.calculate.bind(this)
  }

  updateItem(item: Item) {
    this.items.set(item.id, new TimelineItem(item))
  }

  removeItem(id: string | number) {
    this.items.delete(id)
  }

  calculate() {
    for (let [, item] of this.items) {
      item.computeStatusFromRange(this.options.timeWindow)
    }

    return this
  }

  getItemsInRange() {
    const result = Array.from(this.items.values()).filter((item: any) => item.status.inRange)

    return result
  }

  setTimeWindow(range: Range) {
    const { start, end } = range
    this.options.timeWindow = { start, end }
    this.calculate()
  }

  static UNITS_IN_MILLISECONDS = {
    seconds:1000,
    minutes: 60_000,
    hours: 3_600_000,
    days: 86_400_000,
  }

  private static getDatesInRangeByInterval(range: Range, interval: number) {
    const timestamps: number[] = [range.start]

    while (timestamps[timestamps.length - 1] < range.end) {
      timestamps.push(timestamps[timestamps.length - 1] + interval)
    }

    return timestamps
  }

  getRangeTimestamps(scale: TickScale) {
    const rangeSpan = this.options.timeWindow.end - this.options.timeWindow.start
    let offsetStart = this.options.timeWindow.start - (rangeSpan / 2)

    switch (scale) {
      case 'seconds':
        offsetStart = new Date(offsetStart).setUTCMilliseconds(0)
        break
      case 'minutes':
        offsetStart = new Date(offsetStart).setUTCSeconds(0, 0)
        break
      case 'hours':
        offsetStart = new Date(offsetStart).setUTCMinutes(0, 0, 0)
        break
      case 'days':
        offsetStart = new Date(offsetStart).setUTCHours(0, 0, 0)
        break
      default:
        throw new UnknownScaleException() 
    }

    const offsetEnd = offsetStart + rangeSpan * 1.5
    const interval = Timeline.UNITS_IN_MILLISECONDS[scale]
     // Note: ticksRange always will be x2 the timeline timespan.
     // This is intentional, since it is expected to obtain an offset
     // of the start and end date in order to be able to respond to dates
     // that are not yet visible.
    const offsetRange = { start: offsetStart, end: offsetEnd }

    return Timeline.getDatesInRangeByInterval(offsetRange, interval)
      .map((date) => ({
        timestamp: date,
        offsetStart: date - this.options.timeWindow.start,
      }))
  }
}
