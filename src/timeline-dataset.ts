import type { Item } from './types'
import { TimelineItem } from './timeline-item'

export class TimelineDataset {
  items: Map<string | number, TimelineItem> = new Map()

  constructor(items: Item[]) {
    for (const item of items) {
      this.items.set(item.id, new TimelineItem(item))
    }
  }
}
