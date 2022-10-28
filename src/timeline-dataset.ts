import type { Range, Item } from './types'

export class TimelineDatasetItem {
  itemReference: Item
  start: number
  end: number
  status: {
    lastRangeReference: Range | null
    inRange: boolean | null
    offsetFromRangeStart: number | null
    offsetFromRangeEnd: number | null
    rangeSpaceUsage: number | null
  } = {
    lastRangeReference: null,
    inRange: null,
    offsetFromRangeStart: null,
    offsetFromRangeEnd: null,
    rangeSpaceUsage: null,
  }

  constructor(item: Item) {
    this.itemReference = item
    this.start = item.ocurrence.start
    this.end = item.ocurrence.end

    this.computeStatusFromRange = this.computeStatusFromRange.bind(this)
  }

  computeStatusFromRange(range: Range) {
    this.status.lastRangeReference = range

    this.checkRangeStatus(range)

    if (this.status.inRange) {
      this.computeOffsets(range)
    } else {
      this.status.offsetFromRangeStart = null
      this.status.offsetFromRangeEnd = null
    }
  }

  private checkRangeStatus(range: Range) {
    const { start, end } = this

    const startsBeforeRange = start <= range.start
    const endsAfterRange = end >= range.end
    const startsInsideRange = start >= range.start && start <= range.end
    const endsInsideRange = end >= range.start && end <= range.end

    const rangeStatus =
      (startsBeforeRange && endsInsideRange) ||
      (startsInsideRange && endsInsideRange) ||
      (startsInsideRange && endsAfterRange)

    this.status.inRange = rangeStatus
  }

  private computeOffsets(range: Range) {
    const { start, end } = this
    const rangePercentIndex = (range.end - range.start) / 100
    const millisecondsElapsedFromStart = start - range.start
    const millisecondsToReachEnd = range.end - end
    const offsetStart = millisecondsElapsedFromStart / rangePercentIndex / 100
    const offsetEnd = millisecondsToReachEnd / rangePercentIndex / 100
    const rangeSpaceUsage = (end - start) / rangePercentIndex / 100

    this.status.offsetFromRangeStart = offsetStart
    this.status.offsetFromRangeEnd = offsetEnd
    this.status.rangeSpaceUsage = rangeSpaceUsage
  }
}

// Will be in charge of updating/removing items from timeline
export class TimelineDataset {
  items: Map<string | number, TimelineDatasetItem> = new Map()

  constructor(items: Item[]) {
    for (const item of items) {
      this.items.set(item.id, new TimelineDatasetItem(item))
    }
  }
}
