import { useLayoutEffect, useRef, useState } from 'react'
import Timeline, { TimelineDOM } from '../../../dist/index.js'
import makeExampleItems from '../../utils/example-data'
import './index.css'

const now = Date.now()

const DEFAULT_RANGE = {
  start: now,
  // end: now + 24 * 60 * 60 * 1000,
  end: now + 24 * 60 * 60 * 1000,
}

export default function TimelineApp() {
  const containerRef = useRef(null)
  const [timelineDoms, setTimlineDoms] = useState<any[]>([])
  const [ticks, setTicks] = useState<any[]>([])

  function setupTimeline() {
    const container = containerRef.current as unknown as HTMLElement
    const timelines = [
      new Timeline({
        items: makeExampleItems(),
        range: DEFAULT_RANGE,
      }),
      // new Timeline({
      //   items: makeExampleItems(),
      //   range: DEFAULT_RANGE,
      // }),
      // new Timeline({
      //   items: makeExampleItems(),
      //   range: DEFAULT_RANGE,
      // }),
      // new Timeline({
      //   items: makeExampleItems(),
      //   range: DEFAULT_RANGE,
      // }),
      // new Timeline({
      //   items: makeExampleItems(),
      //   range: DEFAULT_RANGE,
      // }),
    ]

    const t = new TimelineDOM({
      container,
      timelines,
      onRender: (domItems) => {
        setTimlineDoms(() => domItems)
        setTicks(t.getRangeTicks('days'))
      },
    })
  }

  useLayoutEffect(setupTimeline, [])

  return (
    <div className='demo-page'>
      <h1>virtual-headless-timeline</h1>
      <h2>A virtualized timeline renderer.</h2>

      <div className='demo-container'>
        <ul>
          <li>⚡ Displaying 5 synced timelines, 10.000 items each one.</li>
          <li>
            💡 Each timeline row and item is rendered by React, you don't have to fight with the library to create your
            own timeline experience.
          </li>
        </ul>

        <div style={{ position: 'relative', overflow: 'hidden', height: '16px' }}>
          {ticks.map((t) => (
            <span style={{ position: 'absolute', left: `${t.ofPx}px`, fontSize: '10px' }}>
              {new Date(t.timestamp).toDateString()}
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
    </div>
  )
}
