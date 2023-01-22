import { useEffect, useRef, useState } from 'react'
import { Range, buildUnitsTimeline, Ocurrence, TimelineDOM } from '@eon-timeline/core'
import { EonTimelineLane, EonTimeline } from '@eon-timeline/react'
import { RANGES_PER_UNIT } from '../shared'
import { throttle } from 'throttle-debounce'
import timelines from './timelines'

// Ocurrence components
import Unit from './Unit'
import Task from './Task'

import './MainTimeline.css'

function unitsSync(range: Range, timelineDom: TimelineDOM) {
  const unitsLane = timelines[0]
  const unitOcurrencesByRange: Ocurrence[] = buildUnitsTimeline({
    range: range as Range,
    unit: 'minute',
    unitScale: 15,
  })

  unitsLane.replaceOcurrences(unitOcurrencesByRange)
  timelineDom.redraw()
}

const throttledUnitsSync = throttle(100, unitsSync)

export default function MainTimeline() {
  const [range, setRange] = useState(RANGES_PER_UNIT.hour)
  const timelineDomRef = useRef<TimelineDOM>(null)

  useEffect(() => {
    if (!timelineDomRef.current === null) return

    throttledUnitsSync(range, timelineDomRef.current as TimelineDOM)
  }, [range])

  return (
    <EonTimeline
      className='main-timeline'
      range={range}
      timelines={timelines}
      onRangeChange={setRange}
      timelineDomRef={timelineDomRef}
    >
      {timelines.map((timeline, index) => (
        <EonTimelineLane
          timeline={timeline}
          OcurrenceComponent={index === 0 ? Unit : Task}
          className={index === 0 ? 'unit' : 'ocurrence'}
        />
      ))}
    </EonTimeline>
  )
}
