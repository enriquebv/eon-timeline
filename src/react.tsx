import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Timeline } from './timeline'
import TimelineDOM, { TimelineDOMItem } from './timeline-dom'
import { Range } from './types'

interface Props {
  timelines: Timeline[]
  range: Range
  className?: string
  timelineClassName?: string
  itemClassName?: string
  TimelineComponent?: React.ReactNode
  ItemComponent?: React.ReactNode
}

export default function EonTimeline(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timelineDom = useRef<TimelineDOM | null>(null)
  const [domTimelines, setDomTimelines] = useState<TimelineDOMItem[][]>([])

  function onRender(domTimelines: TimelineDOMItem[][]) {
    setDomTimelines(domTimelines)
  }

  useLayoutEffect(() => {
    if (containerRef.current === null) return

    timelineDom.current = new TimelineDOM({
      range: props.range,
      container: containerRef.current,
      timelines: props.timelines,
      onRender,
    })
  }, [])

  useEffect(() => {
    timelineDom.current?.setRange(props.range)
  }, [props.range])

  const TimelineComponent = props.TimelineComponent as unknown as React.ElementType
  const ItemComponent = props.ItemComponent as unknown as React.ElementType

  return (
    <div ref={containerRef} className={props.className}>
      {domTimelines.map((timeline, index) =>
        TimelineComponent ? (
          <TimelineComponent timeline={timeline} key={index} />
        ) : (
          <div
            className={`eon-timeline ${props.timelineClassName || ''}`}
            key={index}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {timeline.map((item) =>
              ItemComponent ? (
                <ItemComponent {...item} />
              ) : (
                <div
                  className={`eon-timeline-item ${props.itemClassName || ''}`}
                  key={item.item.id}
                  style={TimelineDOM.getItemStyleFromDomItem(item)}
                >
                  <span>{item.item.id}</span>
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  )
}
