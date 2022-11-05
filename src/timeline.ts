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
    this.timeWindowDuration = Date.now() + HOUR_IN_MS - Date.now()

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
  }

  getRangeTicks(scale: 'seconds' | 'minutes' | 'hours' | 'days' | 'months') {
    const tickSpan = Timeline.TICKS_MS_DURATION[scale as 'minutes']
    const rangeSpan = this.options.timeWindow.end - this.options.timeWindow.start
    const rangePercent = rangeSpan / 100

    const timestampStartReference = new Date(this.options.timeWindow.start).setSeconds(0, 0)

    const ticksCount = rangeSpan / tickSpan

    const ticks = Array(ticksCount)
      .fill(null)
      .map((_, tickIndex) => {
        const timestamp: number = timestampStartReference + tickIndex * tickSpan
        const offsetStart = (timestamp - this.options.timeWindow.start) / rangePercent / 100
        const span = (timestamp + tickSpan - timestamp) / rangePercent / 100

        return { timestamp, offsetStart, span }
      })

    return ticks
  }
}
