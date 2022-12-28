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
  const range: Range = {
    start: Date.now(),
    end: Date.now() + 3_600_000,
  }

  beforeEach(() => {
    container = document.createElement('div')
    timelineDom = new TimelineDOM({
      range,
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
        }),
      ],
      onRender: () => {},
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

  test('Method .getRangeTimestamps returns expected data structure', () => {
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

  test('Each timeline added will recieve event subscriptions', () => {
    const timeline = new Timeline({
      items: [
        {
          id: 1,
          ocurrence: {
            start: Date.now(),
            end: Date.now(),
          },
        },
      ],
    })

    const spyEventOn = jest.spyOn(timeline, 'on')

    timelineDom = new TimelineDOM({
      range,
      container,
      timelines: [timeline],
      onRender: () => {},
    })

    expect(spyEventOn).toBeCalledTimes(3)
    expect(spyEventOn.mock.calls.some((call) => call[0] === 'item-added')).toBe(true)
    expect(spyEventOn.mock.calls.some((call) => call[0] === 'item-updated')).toBe(true)
    expect(spyEventOn.mock.calls.some((call) => call[0] === 'item-removed')).toBe(true)
  })

  test('.removeTimelineListeners() will unsuscribe event listeners', () => {
    const timeline = new Timeline({
      items: [
        {
          id: 1,
          ocurrence: {
            start: Date.now(),
            end: Date.now(),
          },
        },
      ],
    })

    timelineDom = new TimelineDOM({
      range,
      container,
      timelines: [timeline],
      onRender: () => {},
    })

    const spyEventOff = jest.spyOn(timeline, 'off')

    timelineDom.removeTimelineListeners()

    expect(spyEventOff).toBeCalledTimes(3)
    expect(spyEventOff.mock.calls.some((call) => call[0] === 'item-added')).toBe(true)
    expect(spyEventOff.mock.calls.some((call) => call[0] === 'item-updated')).toBe(true)
    expect(spyEventOff.mock.calls.some((call) => call[0] === 'item-removed')).toBe(true)
  })
})
