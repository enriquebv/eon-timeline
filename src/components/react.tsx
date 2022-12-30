import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { Timeline } from '../timeline'
import { TimelineDOM, TimelineDOMItem } from '../timeline'
import { Item, Range } from '../types'

type AvailableComponent<Props> = React.ReactNode | ((props: Props) => React.ReactElement)

export interface EonTimelineProps {
  timelines: Timeline[]
  range: Range
  className?: string
  timelineClassName?: string
  itemClassName?: string
  ItemComponent?: AvailableComponent<{ item: Item }>
  onRangeChange(range?: Range): void
}

export interface EonTimelineRef {
  redraw(): void
}

const EonTimeline = React.forwardRef<EonTimelineRef, EonTimelineProps>((props, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timelineDom = useRef<TimelineDOM | null>(null)
  const [timelinesDomItems, setTimelinesDomItems] = useState<TimelineDOMItem[][]>([])

  function onRender(domTimelines: TimelineDOMItem[][]) {
    setTimelinesDomItems(domTimelines)
  }

  function setupTimeline() {
    const instance = new TimelineDOM({
      range: props.range,
      container: containerRef.current as HTMLElement,
      timelines: props.timelines,
      onRender,
    })

    instance.on('range-change', props.onRangeChange)

    timelineDom.current = instance
  }

  function onUnmount() {
    timelineDom.current?.removeTimelineListeners()
  }

  useEffect(() => onUnmount, [])

  useLayoutEffect(() => {
    if (containerRef.current === null) return
    setupTimeline()
  }, [])

  useEffect(() => {
    timelineDom.current?.setRange(props.range)
  }, [props.range])

  useImperativeHandle(ref, () => ({
    redraw() {
      timelineDom.current?.redraw()
    },
  }))

  const ItemComponent = props.ItemComponent as unknown as React.ElementType

  return (
    <>
      <div ref={containerRef} className={props.className}>
        {timelinesDomItems.map((timelineDomItems, index) => (
          <div className={`eon-timeline ${props.timelineClassName || ''}`} key={index}>
            {timelineDomItems.map((timelineDomItem) => (
              <div
                className={`eon-timeline-item ${props.itemClassName || ''}`}
                key={timelineDomItem.item.id}
                style={TimelineDOM.getItemStyleFromDomItem(timelineDomItem)}
              >
                {ItemComponent ? <ItemComponent item={timelineDomItem.item} /> : timelineDomItem.item.id}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
})

export default EonTimeline
