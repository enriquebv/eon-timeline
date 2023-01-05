import React, { useEffect, useRef, useState } from 'react'
import { Timeline, TimelineDOM } from '@eon-timeline/core'
import { EonTimeline, EonTimelineItemProps, EonTimelineLane } from '@eon-timeline/react'
import { makeItemsCollection, RANGES_PER_UNIT } from './shared'
import './TimelinesWithUnits.css' // <- Styles of units
import { getNumberBetween } from '../../../utils'

const timelines = [
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
]

const colors = ['#1abc9c', '#2ecc71', '#9b59b6', '#f1c40f', '#f39c12', '#c0392b']

const EventComponent = React.memo(
  function EventComponent(props: EonTimelineItemProps<{ realtime: true }>) {
    if (!props.item.data?.realtime) {
      return null
    }

    return <div style={{ backgroundColor: colors[getNumberBetween(0, colors.length)], height: 15 }} />
  },
  () => {
    // Note: You can control when event renders here! More info: https://reactjs.org/docs/react-api.html#reactmemo
    return true
  }
)

export default function DynamicEvents() {
  const [range, setRange] = useState(RANGES_PER_UNIT.hour)
  const timelineDomRef = useRef<TimelineDOM>(null)
  const [realtimeStatus, setRealtimeStatus] = useState<'running' | 'stopped'>('running')
  const interval = useRef<NodeJS.Timer | null>(null)

  function startInterval() {
    if (interval.current !== null) return

    interval.current = setInterval(function () {
      const randomTimelineIndex = Math.floor(Math.random() * timelines.length)
      const timeline = timelines[randomTimelineIndex]
      const offsetStartMinutes = getNumberBetween(10, 30)

      timeline.addItem({
        id: timeline.getTimelineEvents().length + 1,
        ocurrence: {
          start: Date.now() + 60_000 * offsetStartMinutes,
          end: Date.now() + 60_000 * (offsetStartMinutes + getNumberBetween(5, 30)),
        },
        data: {
          realtime: true,
        },
      })

      timelineDomRef.current?.redraw()
    }, 1000)
  }

  function stopInterval() {
    clearInterval(interval.current as NodeJS.Timer)
    interval.current = null
  }

  useEffect(() => {
    realtimeStatus === 'running' ? startInterval() : stopInterval()
  }, [realtimeStatus])

  return (
    <div className='timeline-with-units'>
      <EonTimeline timelineDomRef={timelineDomRef} range={range} timelines={timelines} onRangeChange={setRange}>
        {timelines.map((timeline) => (
          <EonTimelineLane timeline={timeline} EventComponent={EventComponent} />
        ))}
      </EonTimeline>
      <div className='controls'>
        <div>
          <button
            onClick={() => (realtimeStatus === 'running' ? setRealtimeStatus('stopped') : setRealtimeStatus('running'))}
          >
            {realtimeStatus === 'running' ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    </div>
  )
}
