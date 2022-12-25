/**
 * @jest-environment jsdom
 */

import { Timeline } from './timeline'
import TimelineDOM, {
  TimelineDOMOptions,
  MissingContainer,
  MissingOnRenderFunction,
  TimelineDOMItem,
} from './timeline-dom'
import { Range, TickScale } from './types'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock

describe('TimelineDOM', () => {
  let timelineDom: TimelineDOM
  let container: HTMLDivElement

  beforeEach(() => {
    const HOUR_IN_MILLISECONDS = 3_600_000
    const TIMELINE_RANGE: Range = {
      start: Date.now(),
      end: Date.now() + HOUR_IN_MILLISECONDS,
    }

    container = document.createElement('div')
    timelineDom = new TimelineDOM({
      container,
      timelines: [
        new Timeline({
          items: [
            {
              id: 1,
              ocurrence: {
                start: Date.now(),
                end: Date.now(),
              },
            },
          ],
          range: TIMELINE_RANGE,
        }),
      ],
      onRender: () => {},
    })
  })

  it('Fails if not element is provided', () => {
    const options: TimelineDOMOptions = {
      container: undefined as unknown as HTMLElement,
      timelines: [],
      onRender: () => undefined,
    }

    expect(() => new TimelineDOM(options)).toThrow(MissingContainer)
  })

  it('Fails if not element is provided', () => {
    const options: TimelineDOMOptions = {
      container,
      timelines: [],
      onRender: undefined as unknown as () => void,
    }

    expect(() => new TimelineDOM(options)).toThrow(MissingOnRenderFunction)
  })

  it('Callback .onRender correctly triggered', () => {
    const untypedTimelinedom = timelineDom as any
    untypedTimelinedom.renderCallback = jest.fn(() => {})

    untypedTimelinedom.emitRenderCallback()

    expect(untypedTimelinedom.renderCallback).toBeCalledTimes(1)

    untypedTimelinedom.emitRenderCallback()
    untypedTimelinedom.emitRenderCallback()
    untypedTimelinedom.emitRenderCallback()

    expect(untypedTimelinedom.renderCallback).toBeCalledTimes(4)
  })

  it('Correctly build item styles', () => {
    const item: TimelineDOMItem = {
      startOffsetPx: 1000,
      width: 200,
      item: {
        id: 1,
        ocurrence: {
          start: Date.now(),
          end: Date.now(),
        },
      },
    }

    expect(TimelineDOM.getItemStyleFromDomItem(item)).toEqual({
      position: 'absolute',
      left: `${1000}px`,
      width: `${200}px`,
    })
  })

  it('Method .getRangeTimestamps returns expected data structure', () => {
    const scales: TickScale[] = ['seconds', 'minutes', 'hours', 'days']

    scales.forEach((scale) => {
      timelineDom.getRangeTimestamps(scale).forEach((timestamp) => {
        expect(timestamp).toMatchObject(
          expect.objectContaining({
            timestamp: expect.any(Number),
            left: expect.any(Number),
          })
        )
      })
    })
  })
})
