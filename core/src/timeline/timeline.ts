import type { Ocurrence, Range } from '../types'
import { TimelineOcurrence } from './timeline-ocurrence'

export class MissingRange extends Error {
  constructor() {
    super('Missing range using Timeline.')
  }
}

export class OcurrenceNotFoundWithId extends Error {
  constructor(id: number | string) {
    super(`Ocurrence not found with id "${id}".`)
  }
}

export class Timeline {
  private ocurrences: Map<string | number, TimelineOcurrence> = new Map()
  range?: Range
  timespan?: number
  addOcurrence: (ocurrence: Ocurrence) => void
  updateOcurrence: (ocurrence: Ocurrence) => void
  ocurrencesRange: Range | null = null

  constructor(options: { ocurrences: Ocurrence[]; range?: Range }) {
    if (options.range) {
      this.range = { start: options.range.start, end: options.range.end }
      this.timespan = options.range.end - options.range.start
    }

    for (const ocurrence of options.ocurrences) {
      this.registerOcurrence('add', ocurrence)
    }

    this.addOcurrence = this.registerOcurrence.bind(this, 'add')
    this.updateOcurrence = this.registerOcurrence.bind(this, 'update')
    this.calculate = this.calculate.bind(this)
  }

  getTimelineOcurrence<Data = unknown>(id: string | number): TimelineOcurrence<Data> {
    return this.ocurrences.get(id) as any
  }

  private registerOcurrence(action: 'add' | 'update' = 'add', ocurrence: Ocurrence) {
    if (action === 'update' && !this.ocurrences.has(ocurrence.id)) {
      throw new OcurrenceNotFoundWithId(ocurrence.id)
    }

    const timelineOcurrence = new TimelineOcurrence(ocurrence)
    this.ocurrences.set(ocurrence.id, timelineOcurrence)

    if (this.range) {
      timelineOcurrence.computeStatusFromRange(this.range as Range)
    }

    if (this.ocurrencesRange === null) {
      this.ocurrencesRange = {
        start: ocurrence.range.start,
        end: ocurrence.range.end,
      }

      return
    }

    this.ocurrencesRange = {
      start: Math.min(ocurrence.range.start, this.ocurrencesRange.start),
      end: Math.max(ocurrence.range.end, this.ocurrencesRange.end),
    }
  }

  removeOcurrence(id: string | number) {
    if (!this.ocurrences.has(id)) throw new OcurrenceNotFoundWithId(id)

    const ocurrencesRange = this.ocurrencesRange as Range
    const timelineOcurrence = this.ocurrences.get(id) as TimelineOcurrence
    const ocurrenceStart = timelineOcurrence.start
    const ocurrenceEnd = timelineOcurrence.end

    this.ocurrences.delete(id)

    const wasOcurrencesRangeStart = ocurrenceStart === ocurrencesRange.start
    const wasOcurrencesRangeEnd = ocurrenceEnd === ocurrencesRange.end
    const needToRecomputeOcurrencesRange = wasOcurrencesRangeStart || wasOcurrencesRangeEnd

    if (needToRecomputeOcurrencesRange) {
      const ocurrencesAsArray = [...this.ocurrences.values()]

      if (wasOcurrencesRangeStart) {
        ocurrencesRange.start = Math.min(...ocurrencesAsArray.map((ocurrence) => ocurrence.start))
      }

      if (wasOcurrencesRangeEnd) {
        ocurrencesRange.end = Math.max(...ocurrencesAsArray.map((ocurrence) => ocurrence.end))
      }
    }
  }

  replaceOcurrences(ocurrences: Ocurrence[]) {
    this.ocurrences = new Map<string | number, TimelineOcurrence>()
    ocurrences.forEach((ocurrence) => this.registerOcurrence('add', ocurrence))
  }

  calculate() {
    if (!this.range) throw new MissingRange()

    for (let [, ocurrence] of this.ocurrences) {
      ocurrence.computeStatusFromRange(this.range)
    }
  }

  getOcurrencesInRange() {
    const result = Array.from(this.ocurrences.values()).filter((ocurrence: any) => ocurrence.status.inRange)

    return result
  }

  getTimelineOcurrences(): TimelineOcurrence[] {
    return Array.from(this.ocurrences.values())
  }

  setRange(range: Range) {
    const { start, end } = range
    this.range = { start, end }
    this.timespan = end - start
    this.calculate()
  }
}
