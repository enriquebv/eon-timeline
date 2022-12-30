import { Timeline } from './timeline'
import type { Item, Range } from '../types'

import Hammer, { DIRECTION_HORIZONTAL } from 'hammerjs'
import { EventEmitter } from './event-emitter'

export interface TimelineDOMOptions {
  range: Range
  container: HTMLElement
  timelines: Timeline[]
  onRender(items: TimelineDOMItem[][]): void
  customResizeObserver?: any
}

export interface TimelineDOMItem {
  item: Item
  width: number
  startOffsetPx: number
}

export class MissingContainer extends Error {
  constructor() {
    super('Container is needed to use TimelineDOM.')
  }
}

export class MissingOnRenderFunction extends Error {
  constructor() {
    super('onRender is needed to use TimelineDOM.')
  }
}

export class TimelineDOM extends EventEmitter<{ 'range-change': Range }> {
  private container: HTMLElement
  private timelines: Timeline[] = []
  private renderCallback: (items: TimelineDOMItem[][]) => void
  private ResizeObserver: any
  private millisecondsPerPixel: number | null = null
  private previousTimelineStartReference: number | null = null
  private isPaning: boolean = false
  private sharedTimespan: number
  private sharedRange: Range
  redraw: () => void

  constructor(options: TimelineDOMOptions) {
    super()
    if (!options.container) throw new MissingContainer()
    if (!options.onRender) throw new MissingOnRenderFunction()

    this.sharedRange = { start: options.range.start, end: options.range.end }
    this.sharedTimespan = options.range.end - options.range.start
    this.container = options.container
    this.renderCallback = options.onRender
    this.ResizeObserver = options.customResizeObserver ?? window.ResizeObserver

    options.timelines.forEach(this.addTimeline.bind(this))
    this.computeMillisecondsPerPixel()
    this.setupPanEvents()
    this.setupResizeEvents()
    this.redraw = this.emitRenderCallback.bind(this)
  }

  setRange(range: Range) {
    this.timelines.forEach((timeline) => timeline.setRange(range))

    this.sharedRange = { start: range.start, end: range.end }
    this.sharedTimespan = range.end - range.start

    this.computeMillisecondsPerPixel()
    this.emitRenderCallback()
  }

  private addTimeline(timeline: Timeline, index?: number) {
    if (!index) {
      this.timelines.push(timeline)
    } else {
      this.timelines.splice(index, 0, timeline)
    }

    timeline.setRange(this.sharedRange)

    timeline.calculate()
  }

  private computeMillisecondsPerPixel() {
    const width = this.container.getBoundingClientRect().width

    this.millisecondsPerPixel = this.sharedTimespan / width
  }

  private setupPanEvents() {
    const hammer = new Hammer.Manager(this.container)
    const horizontalPan = new Hammer.Pan({ direction: DIRECTION_HORIZONTAL })

    hammer.add(horizontalPan)

    const handlers: Record<string, Function> = {
      panstart: this.onPanStart,
      panend: this.onPanEnd,
      panleft: this.onPan,
      panright: this.onPan,
    }

    hammer.on('panleft panright panstart panend', (e) => {
      const handler = handlers[e.type] as (pixelsMoved: number) => void
      // Note: Invert x delta value to match user gesture.
      const invertedDelta = e.deltaX > 0 ? -Math.abs(e.deltaX) : Math.abs(e.deltaX)

      handler.call(this, invertedDelta)
    })
  }

  setupResizeEvents() {
    const ResizeObserver = this.ResizeObserver as typeof window.ResizeObserver

    const resizeObserver = new ResizeObserver(([entry]) => {
      const isContainer = entry.target === this.container

      if (isContainer) {
        this.computeMillisecondsPerPixel()
        this.emitRenderCallback()
      }
    })

    resizeObserver.observe(this.container)
  }

  private onPanStart() {
    this.isPaning = true

    this.previousTimelineStartReference = this.sharedRange.start
  }

  private onPan(pixelsMoved: number) {
    if (this.millisecondsPerPixel === null) throw new Error('es null')

    window.requestAnimationFrame(() => {
      if (!this.isPaning) return

      const { previousTimelineStartReference, millisecondsPerPixel, sharedTimespan } = this
      const timelineDuration = sharedTimespan

      const deltaMsFromStart = (millisecondsPerPixel as number) * pixelsMoved

      const nextStart = Math.floor((previousTimelineStartReference as number) + deltaMsFromStart)
      const nextEnd = Math.floor(nextStart + timelineDuration)
      const nextRange: Range = { start: nextStart, end: nextEnd }

      this.emit('range-change', nextRange)
    })
  }

  private onPanEnd() {
    this.isPaning = false
    this.previousTimelineStartReference = null
  }

  private emitRenderCallback() {
    const result: TimelineDOMItem[][] = []

    for (const timeline of this.timelines) {
      const timelineStart = timeline.range?.start as number

      const timelineResult: TimelineDOMItem[] = []

      for (const itemInRange of timeline.getItemsInRange()) {
        const { itemReference, end, start } = itemInRange
        const duration = end - start
        const msFromTimelineStart = start - timelineStart
        const width = duration / (this.millisecondsPerPixel as number)
        const startPxOffset = msFromTimelineStart / (this.millisecondsPerPixel as number)

        timelineResult.push({
          width,
          item: itemReference,
          startOffsetPx: startPxOffset,
        })
      }

      result.push(timelineResult)
    }

    this.renderCallback(result)
  }

  static getItemStyleFromDomItem(item: TimelineDOMItem): {
    position: 'absolute'
    left: `${number}px`
    width: `${number}px`
  } {
    return {
      position: 'absolute',
      left: `${item.startOffsetPx}px`,
      width: `${item.width}px`,
    }
  }
}
