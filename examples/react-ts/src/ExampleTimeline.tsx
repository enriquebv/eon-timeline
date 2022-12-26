import { useEffect, useState } from 'react'
import Timeline, { Range, TickScale } from '../../../dist'
import EonTimeline from '../../../dist/react'
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

export default function ExampleTimelineDay(props: ExampleProps) {
  const now = Date.now()
  const RANGE_PER_SCALE: Record<ExampleRangeScale, Range> = {
    minute: { start: now, end: now + 6000 },
    hour: { start: now, end: now + 3_600_000 },
    day: { start: now, end: now + 86_400_000 },
    week: { start: now, end: now + 604_800_000 },
    month: { start: now, end: now + 2_592_000_000 },
  }

  const [timelines, setTimelines] = useState<Timeline[]>()
  const [rangeScale, setRangeScale] = useState<ExampleRangeScale>('hour')

  function setupTimelines() {
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

    const timelines: Timeline[] = Array(5)
      .fill(null)
      .map(() => new Timeline({ items: makeTimeline() }))

    setTimelines(timelines)
  }

  useEffect(setupTimelines, [])

  const range: Range = RANGE_PER_SCALE[rangeScale]

  return (
    <div className='example'>
      <h3>{props.title}</h3>

      <div className='time-actions'>
        <button onClick={() => setRangeScale('minute')}>1 minute</button>
        <button onClick={() => setRangeScale('hour')}>1 hour</button>
        <button onClick={() => setRangeScale('day')}>1 day</button>
        <button onClick={() => setRangeScale('week')}>1 week</button>
        <button onClick={() => setRangeScale('month')}>30 days</button>
      </div>

      {timelines ? <EonTimeline range={range} timelines={timelines} /> : null}
    </div>
  )
}
