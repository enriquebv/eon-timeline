import type { Range } from './types'
import type { TimelineDataset } from './timeline-dataset'

interface Options {
  timeWindow: Range
}

const HOUR_IN_MS = 1000 * 60 * 60

export class Timeline {
  options: Options = {
    timeWindow: {
      start: Date.now(),
      end: Date.now() + HOUR_IN_MS,
    },
  }
  timeWindowDuration: number

  dataset: TimelineDataset

  constructor(options: { dataset: TimelineDataset; range: Range }) {
    this.dataset = options.dataset

    this.timeWindowDuration = Date.now() + HOUR_IN_MS - Date.now()

    this.options = {
      timeWindow: { ...options.range },
    }

    this.calculate = this.calculate.bind(this)
  }

  calculate() {
    for (let [, item] of this.dataset.items) {
      item.computeStatusFromRange(this.options.timeWindow)
    }

    return this
  }

  getItemsInRange() {
    const result = Array.from(this.dataset.items.values()).filter((item: any) => item.status.inRange)

    return result
  }

  setTimeWindow(range: Range) {
    const { start, end } = range
    this.options.timeWindow = { start, end }
    this.calculate()
  }
}
