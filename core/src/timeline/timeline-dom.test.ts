/**
 * @jest-environment jsdom
 */

import { Timeline } from './timeline'
import {
  TimelineDOM,
  TimelineDOMOptions,
  MissingContainer,
  MissingOnRenderFunction,
  TimelineDOMItem,
} from './timeline-dom'
import { Range } from '../types'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock

describe('TimelineDOM', () => {
  let timelineDom: TimelineDOM
  let container: HTMLDivElement
  let onRenderMock: jest.Mock

  const range: Range = {
    start: Date.now(),
    end: Date.now() + 3_600_000,
  }

  beforeEach(() => {
    container = document.createElement('div')
    onRenderMock = jest.fn(() => {})
    timelineDom = new TimelineDOM({
      range,
      container,
      timelines: [
        new Timeline({
          items: [
            {
              id: 1,
              ocurrence: {
                start: Date.now() + 50,
                end: Date.now() + 100,
              },
            },
          ],
        }),
      ],
      onRender: onRenderMock,
    })
  })

  test('Fails if not element is provided', () => {
    const options: TimelineDOMOptions = {
      range,
      container: undefined as unknown as HTMLElement,
      timelines: [],
      onRender: () => undefined,
    }

    expect(() => new TimelineDOM(options)).toThrow(MissingContainer)
  })

  test('Fails if not element is provided', () => {
    const options: TimelineDOMOptions = {
      range,
      container,
      timelines: [],
      onRender: undefined as unknown as () => void,
    }

    expect(() => new TimelineDOM(options)).toThrow(MissingOnRenderFunction)
  })

  test('Callback .onRender correctly triggered', () => {
    const untypedTimelinedom = timelineDom as any
    untypedTimelinedom.renderCallback = jest.fn(() => {})

    untypedTimelinedom.emitRenderCallback()

    expect(untypedTimelinedom.renderCallback).toBeCalledTimes(1)

    untypedTimelinedom.emitRenderCallback()
    untypedTimelinedom.emitRenderCallback()
    untypedTimelinedom.emitRenderCallback()

    expect(untypedTimelinedom.renderCallback).toBeCalledTimes(4)
  })

  test('Store shared range and computes correctly timestamp', () => {
    timelineDom.setRange({ start: 100, end: 200 })

    expect((timelineDom as any).sharedRange).toEqual({ start: 100, end: 200 })
    expect((timelineDom as any).sharedTimespan).toEqual(100)
  })

  test('Correctly build item styles', () => {
    const item: TimelineDOMItem = {
      startOffset: 1000,
      width: 200,
      timeline: new Timeline({ items: [] }),
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

  test('If timeline is added and redraw method is called, that timeline should be part of the onRender payload', () => {
    timelineDom.redraw()

    const firstOnRenderTriggerPayload = onRenderMock.mock.calls[0][0]

    expect(firstOnRenderTriggerPayload.length).toBe(1)

    timelineDom.addTimeline(new Timeline({ items: [] }))
    timelineDom.addTimeline(new Timeline({ items: [] }))
    timelineDom.redraw()

    const secondOnRenderTriggerPayload = onRenderMock.mock.calls[1][0]

    expect(secondOnRenderTriggerPayload.length).toBe(3)
  })

  test('If timeline is removed and redraw method is called, that timeline should be not included of the onRender payload', () => {
    // Note: Add timeline with 3 elements to check is not present after remove.
    const items = [
      {
        id: 1,
        ocurrence: {
          start: Date.now() + 50,
          end: Date.now() + 100,
        },
      },
      {
        id: 2,
        ocurrence: {
          start: Date.now() + 100,
          end: Date.now() + 150,
        },
      },
      {
        id: 3,
        ocurrence: {
          start: Date.now() + 150,
          end: Date.now() + 200,
        },
      },
    ]
    timelineDom.addTimeline(new Timeline({ items }))
    timelineDom.redraw()

    const firstOnRenderTriggerPayload = onRenderMock.mock.calls[0][0]

    expect(firstOnRenderTriggerPayload.length).toBe(2)
    expect(firstOnRenderTriggerPayload[0].length).toBe(1)
    expect(firstOnRenderTriggerPayload[1].length).toBe(3)

    timelineDom.removeTimeline(1)
    timelineDom.redraw()

    const secondOnRenderTriggerPayload = onRenderMock.mock.calls[1][0]

    expect(secondOnRenderTriggerPayload.length).toBe(1)
    expect(secondOnRenderTriggerPayload[0].length).toBe(1)
  })
})
