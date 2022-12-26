import { useRef, useState } from 'react'
import Timeline, { Range, TickScale, TimelineDOM } from '../../../dist'
import EonTimeline, { EonTimelineRef } from '../../../dist/react'
import makeExampleItems, { EventsExampleOptions } from '../../utils/example-data'
import './index.css'
import '../../../dist/styles.css'

interface ExampleProps {
  scale: TickScale
  timeWindowDuration: number
  title: string
  eventsExampleOptions: EventsExampleOptions
}

type ExampleRangeScale = 'minute' | 'hour' | 'day' | 'week' | 'month'

function makeTimeline() {
  return makeExampleItems({
    gapRangeInMinutes: {
      min: 10,
      max: 120,
    },
    durationRangeInMinutes: {
      min: 2,
      max: 5,
    },
  })
}

const TIMELINES: Timeline[] = Array(5)
  .fill(null)
  .map(() => new Timeline({ items: makeTimeline() }))

export default function ExampleTimelineDay(props: ExampleProps) {
  const eonTimelineRef = useRef<EonTimelineRef>(null)
  const now = Date.now()
  const RANGE_PER_SCALE: Record<ExampleRangeScale, Range> = {
    minute: { start: now, end: now + 6000 },
    hour: { start: now, end: now + 3_600_000 },
    day: { start: now, end: now + 86_400_000 },
    week: { start: now, end: now + 604_800_000 },
    month: { start: now, end: now + 2_592_000_000 },
  }

  const [rangeScale, setRangeScale] = useState<ExampleRangeScale>('hour')

  const range: Range = RANGE_PER_SCALE[rangeScale]

  function addRandomItem() {
    const randomTimelineIndex = Math.floor(Math.random() * TIMELINES.length)
    const timeline = TIMELINES[randomTimelineIndex]
    const item = {
      id: Date.now(),
      ocurrence: {
        start: Date.now() + 1000 * 60 * Math.floor(Math.random() * 10),
        end: Date.now() + 1000 * 60 * Math.floor(Math.random() * 30),
      },
    }

    timeline.addItem(item)
    eonTimelineRef.current?.redraw()
  }

  return (
    <div className='example'>
      <h3>{props.title}</h3>

      <div className='time-actions'>
        <button onClick={addRandomItem}>Add item at random position</button>
        <button onClick={() => setRangeScale('minute')}>1 minute</button>
        <button onClick={() => setRangeScale('hour')}>1 hour</button>
        <button onClick={() => setRangeScale('day')}>1 day</button>
        <button onClick={() => setRangeScale('week')}>1 week</button>
        <button onClick={() => setRangeScale('month')}>30 days</button>
      </div>

      <EonTimeline ref={eonTimelineRef} range={range} timelines={TIMELINES} />
    </div>
  )
}
