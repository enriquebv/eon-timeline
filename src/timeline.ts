import type { Item, Range } from './types'
import { TimelineItem } from './timeline-item'

interface Options {
  timeWindow: Range
}

const HOUR_IN_MS = 1000 * 60 * 60

export class Timeline {
  items: Map<string | number, TimelineItem> = new Map()
  options: Options = {
    timeWindow: {
      start: Date.now(),
      end: Date.now() + HOUR_IN_MS,
    },
  }
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

  static TICKS_MS_DURATION = {
    minutes: {
      interval: 60_000,
      dateCleaner: (date: number): number => new Date(date).setUTCSeconds(0, 0),
    },
    hours: {
      interval: 3_600_000,
      dateCleaner: (date: number): number => new Date(date).setUTCMinutes(0, 0, 0),
    },
    days: {
      interval: 86_400_000,
      dateCleaner: (date: number): number => new Date(date).setUTCHours(0, 0, 0, 0),
    },
  }

  getRangeTicks(scale: 'seconds' | 'minutes' | 'hours' | 'days' | 'months') {
    const rangeSpan = this.options.timeWindow.end - this.options.timeWindow.start
    let offsetStart = this.options.timeWindow.start - rangeSpan

    switch (scale) {
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
        throw new Error(`Unknown scale in getRangeTicks method`, { cause: scale })
    }

    const offsetEnd = offsetStart + rangeSpan * 2
    const interval = Timeline.TICKS_MS_DURATION[scale].interval

    const ticks = Timeline.getDatesInRangeByInterval({ start: offsetStart, end: offsetEnd }, interval).map((t) => ({
      timestamp: t.timestamp,
      offsetStart: t.timestamp - this.options.timeWindow.start,
    }))

    return ticks
  }

  static getDatesInRangeByInterval(range: Range, interval: number) {
    const dates = [range.start]

    while (dates[dates.length - 1] < range.end) {
      dates.push(dates[dates.length - 1] + interval)
    }

    const ticks = dates.map((timestamp) => {
      const offsetStart = timestamp - range.start

      return { timestamp, offsetStart }
    })

    return ticks
  }
}
