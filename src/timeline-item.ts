import type { Range, Item } from './types'

export class InvalidOcurrenceRange extends Error {
  constructor() {
    super("Invalid item ocurrence range, start can't be later than end.")
  }
}

export class TimelineItem {
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
    if (item.ocurrence.end < item.ocurrence.start) throw new InvalidOcurrenceRange()

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
      (startsInsideRange && endsAfterRange) ||
      (startsBeforeRange && endsAfterRange)

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
