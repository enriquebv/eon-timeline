import type { Item, Range, TickScale } from './types'
import { TimelineItem } from './timeline-item'
import EventEmitter from './event-emitter'

export class UnknownScale extends Error {
  constructor() {
    super('Unknown scale, please use one of type TickScale.')
  }
}

export class MissingRange extends Error {
  constructor() {
    super('Missing range using Timeline.')
  }
}

export class ItemNotFoundWithId extends Error {
  constructor(id: number | string) {
    super(`Item not found with id "${id}".`)
  }
}

interface TimelineEvents {
  'item-added': TimelineItem
  'item-updated': TimelineItem
  'item-removed': TimelineItem
}

export class Timeline extends EventEmitter<TimelineEvents> {
  items: Map<string | number, TimelineItem> = new Map()
  range?: Range
  timespan?: number
  addItem: (item: Item) => void
  updateItem: (item: Item) => void
  itemsRange: Range | null = null

  constructor(options: { items: Item[]; range?: Range }) {
    super()

    if (options.range) {
      this.range = { start: options.range.start, end: options.range.end }
      this.timespan = options.range.end - options.range.start
    }

    for (const item of options.items) {
      this.registerItem('add', item)
    }

    this.addItem = this.registerItem.bind(this, 'add')
    this.updateItem = this.registerItem.bind(this, 'update')
    this.calculate = this.calculate.bind(this)
  }

  private registerItem(action: 'add' | 'update' = 'add', item: Item) {
    if (action === 'update' && !this.items.has(item.id)) {
      throw new ItemNotFoundWithId(item.id)
    }

    const timelineItem = new TimelineItem(item)
    this.items.set(item.id, timelineItem)

    const event: keyof TimelineEvents = action === 'add' ? 'item-added' : 'item-updated'
    this.emit(event, timelineItem)

    if (this.range) {
      timelineItem.computeStatusFromRange(this.range as Range)
    }

    if (this.itemsRange === null) {
      this.itemsRange = {
        start: item.ocurrence.start,
        end: item.ocurrence.end,
      }

      return
    }

    this.itemsRange = {
      start: Math.min(item.ocurrence.start, this.itemsRange.start),
      end: Math.max(item.ocurrence.end, this.itemsRange.end),
    }
  }

  removeItem(id: string | number) {
    if (!this.items.has(id)) throw new ItemNotFoundWithId(id)

    const itemsRange = this.itemsRange as Range
    const timelineItem = this.items.get(id) as TimelineItem
    const itemStart = timelineItem.start
    const itemEnd = timelineItem.end

    this.items.delete(id)
    this.emit('item-removed', timelineItem)

    const wasItemsRangeStart = itemStart === itemsRange.start
    const wasItemsRangeEnd = itemEnd === itemsRange.end
    const needToRecomputeItemsRange = wasItemsRangeStart || wasItemsRangeEnd

    if (needToRecomputeItemsRange) {
      const itemsAsArray = [...this.items.values()]

      if (wasItemsRangeStart) {
        itemsRange.start = Math.min(...itemsAsArray.map((item) => item.start))
      }

      if (wasItemsRangeEnd) {
        itemsRange.end = Math.max(...itemsAsArray.map((item) => item.end))
      }
    }
  }

  calculate() {
    if (!this.range) throw new MissingRange()

    for (let [, item] of this.items) {
      item.computeStatusFromRange(this.range)
    }
  }

  getItemsInRange() {
    const result = Array.from(this.items.values()).filter((item: any) => item.status.inRange)

    return result
  }

  setRange(range: Range) {
    const { start, end } = range
    this.range = { start, end }
    this.timespan = end - start
    this.calculate()
  }

  static UNITS_IN_MILLISECONDS = {
    seconds: 1000,
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
    if (!this.range) throw new MissingRange()

    const rangeSpan = this.range.end - this.range.start
    let offsetStart = this.range.start - rangeSpan / 2

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
        throw new UnknownScale()
    }

    const offsetEnd = offsetStart + rangeSpan * 1.5
    const interval = Timeline.UNITS_IN_MILLISECONDS[scale]
    // Note: ticksRange always will be x2 the timeline timespan.
    // This is intentional, since it is expected to obtain an offset
    // of the start and end date in order to be able to respond to dates
    // that are not yet visible.
    const offsetRange = { start: offsetStart, end: offsetEnd }

    return Timeline.getDatesInRangeByInterval(offsetRange, interval).map((date) => ({
      timestamp: date,
      offsetStart: date - (this.range?.start as number),
    }))
  }
}
