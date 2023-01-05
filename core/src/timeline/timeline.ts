import type { Item, Range } from '../types'
import { TimelineItem } from './timeline-item'

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

export class Timeline {
  private items: Map<string | number, TimelineItem> = new Map()
  range?: Range
  timespan?: number
  addItem: (item: Item) => void
  updateItem: (item: Item) => void
  itemsRange: Range | null = null

  constructor(options: { items: Item[]; range?: Range }) {
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

  getItem<Data = undefined>(
    id: string | number
  ): (Data extends undefined ? TimelineItem : TimelineItem & { itemReference: { data: Data } }) | undefined {
    return this.items.get(id) as any
  }

  private registerItem(action: 'add' | 'update' = 'add', item: Item) {
    if (action === 'update' && !this.items.has(item.id)) {
      throw new ItemNotFoundWithId(item.id)
    }

    const timelineItem = new TimelineItem(item)
    this.items.set(item.id, timelineItem)

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

  replaceItems(items: Item[]) {
    this.items = new Map<string | number, TimelineItem>()
    items.forEach((item) => this.registerItem('add', item))
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

  getTimelineEvents(): TimelineItem[] {
    return Array.from(this.items.values())
  }

  setRange(range: Range) {
    const { start, end } = range
    this.range = { start, end }
    this.timespan = end - start
    this.calculate()
  }
}
