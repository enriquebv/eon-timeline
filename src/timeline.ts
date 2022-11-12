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
    minutes: 60_000,
    hours: 60 * 60_000,
    days: 24 * 60 * 60_000,
  }

  getRangeTicks(scale: 'seconds' | 'minutes' | 'hours' | 'days' | 'months') {
    switch (scale) {
      case 'minutes':
        return Timeline.getMinuteTicks(this.options.timeWindow)
      case 'hours':
        return Timeline.getHoursTicks(this.options.timeWindow)
      default:
        throw new Error(`Unknown scale in getRangeTicks method`, { cause: scale })
    }
  }

  static getMinuteTicks(range: Range) {
    const TICK_SPAN = 60_000
    const rangeSpan = range.end - range.end

    const ticksStart = new Date(range.start - rangeSpan).setUTCMinutes(0, 0, 0)
    const ticksEnd = new Date(range.end + rangeSpan).setUTCMinutes(0, 0, 0)
    const estimatedTicks = Math.max(1, (ticksEnd - ticksStart) / TICK_SPAN)

    const ticks = Array(estimatedTicks)
      .fill(null)
      .map((_, tickIndex) => {
        const timestamp: number = ticksStart + tickIndex * TICK_SPAN
        const offsetStart = timestamp - range.start

        return { timestamp, offsetStart }
      })

    return ticks
  }

  static getHoursTicks(range: Range) {
    const TICK_SPAN = 3_600_000
    const rangeSpan = range.end - range.start

    const ticksStart = new Date(range.start - rangeSpan).setUTCMinutes(0, 0, 0)
    const ticksEnd = new Date(range.end + rangeSpan).setUTCMinutes(0, 0, 0)
    const estimatedTicks = Math.max(1, (ticksEnd - ticksStart) / TICK_SPAN)

    const ticks = Array(estimatedTicks)
      .fill(null)
      .map((_, tickIndex) => {
        const timestamp: number = ticksStart + tickIndex * TICK_SPAN
        const offsetStart = timestamp - range.start

        return { timestamp, offsetStart }
      })

    return ticks
  }
}
