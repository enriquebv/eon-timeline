import React, { useLayoutEffect, useRef, useState } from 'react'
import { Timeline } from '../timeline'
import TimelineDOM, { TimelineDOMItem } from '../timeline-dom'

interface Props {
  timelines: Timeline[]
  className?: string
  timelineClassName?: string
  itemClassName?: string
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
      container: containerRef.current,
      timelines: props.timelines,
      onRender,
    })
  }, [])

  return (
    <div ref={containerRef} className={props.className}>
      {domTimelines.map((timeline, index) => (
        <div
          className={`eon-timeline ${props.timelineClassName}`}
          key={index}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {timeline.map((domItem) => (
            <div
              className={`eon-timeline-item ${props.itemClassName}`}
              key={domItem.item.id}
              style={TimelineDOM.getItemStyleFromDomItem(domItem)}
            >
              <span>{domItem.item.id}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
