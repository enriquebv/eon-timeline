import { useLayoutEffect, useRef, useState } from 'react'
import Timeline, { TickScale, TimelineDOM } from '../../../dist/index.js'
import makeExampleItems, { EventsExampleOptions } from '../../utils/example-data'
import './index.css'

interface ExampleProps {
  scale: TickScale
  timeWindowDuration: number
  title: string,
  eventsExampleOptions: EventsExampleOptions
}

export default function ExampleTimelineDay(props: ExampleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [timelineDoms, setTimlineDoms] = useState<any[]>([])
  const [ticks, setTicks] = useState<any[]>([])

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp)

    const isMonth = props.timeWindowDuration === 30 * 24 * 60 * 60 * 1000

    if (props.scale === 'days' && isMonth && date.getUTCDate() === 1) {
      return date.toLocaleDateString()
    }

    if (props.scale === 'days' && !isMonth) {
      return date.toLocaleDateString()
    }

    if (props.scale === 'hours' && date.getUTCHours() % 5 === 0) {
      return date.toLocaleTimeString()
    }

    if (props.scale === 'minutes' && date.getUTCMinutes() % 15 === 0) {
      return date.toLocaleTimeString()
    }

    return ''
  }

  function setupTimeline() {
    const now = Date.now()
    const range = {
      start: now,
      end: now + props.timeWindowDuration
    }

    if (!containerRef.current) {
      throw new Error('Container is not ready yet.')
    }

    
    const container = containerRef.current
    const timelines = [
      new Timeline({
        items: makeExampleItems(props.eventsExampleOptions),
        range,
      }),
      new Timeline({
        items: makeExampleItems(props.eventsExampleOptions),
        range,
      }),
      new Timeline({
        items: makeExampleItems(props.eventsExampleOptions),
        range,
      }),
      new Timeline({
        items: makeExampleItems(props.eventsExampleOptions),
        range,
      }),
      new Timeline({
        items: makeExampleItems(props.eventsExampleOptions),
        range,
      }),
    ]
    const onRender = (domItems: any[]) => {
      setTimlineDoms(() => domItems)
      setTicks(timelineDom.getRangeTimestamps(props.scale))
    }

    const timelineDom = new TimelineDOM({ container, timelines, onRender })
  }

  useLayoutEffect(setupTimeline, [])

  return (
    <div className='example'>
      <h3>{props.title}</h3>

      <div style={{ position: 'relative', overflow: 'hidden', height: '16px' }}>
        {ticks.map((t) => (
          <span style={{ position: 'absolute', left: `${t.left}px`, fontSize: '10px' }}>
            {formatDate(t.timestamp)}
          </span>
        ))}
      </div>
      <div className='demo-timeline-container' ref={containerRef}>
        {timelineDoms.length > 0
          ? timelineDoms.map((t, i) => (
              <div key={i} className='demo-timeline' style={TimelineDOM.getTimelineStyle() as any}>
                {t.map((item: any) => (
                  <div key={item.item.id} style={TimelineDOM.getItemStyleFromDomItem(item) as any}>
                    <div className='demo-timeline-item'>#{item.item.id}</div>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
      
    </div>
  )
}
