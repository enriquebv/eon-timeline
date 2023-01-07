import { useState } from 'react'
import { Timeline, Range, buildUnitsTimeline } from '@eon-timeline/core'
import { EonTimelineOcurrenceProps, EonTimelineLane, EonTimeline } from '@eon-timeline/react'
import { makeOcurrencesCollection, RANGES_PER_UNIT } from './shared'
import './TimelinesWithUnits.css' // <- Styles of units

const timelines = [
  new Timeline({
    ocurrences: buildUnitsTimeline({ range: RANGES_PER_UNIT.hour, unit: 'minute', unitScale: 15 }),
  }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
]

const formatTime = (timestamp: number) => new Date(timestamp).toTimeString().split(' ')[0]

function UnitOcurrence(props: EonTimelineOcurrenceProps) {
  return <div className='unit-ocurrence'>{formatTime(props.ocurrence.range.start)}</div>
}

function OcurrenceOcurrence(props: EonTimelineOcurrenceProps) {
  return <div>ID: {props.ocurrence.id}</div>
}

export default function ExampleTimelineDay() {
  const [range, setRange] = useState(RANGES_PER_UNIT.hour)

  return (
    <div className='timeline-with-units'>
      <EonTimeline
        range={range}
        timelines={timelines}
        onRangeChange={(range) => {
          timelines[0].replaceOcurrences(buildUnitsTimeline({ range: range as Range, unit: 'minute', unitScale: 15 }))
          setRange(range as Range)
        }}
      >
        <EonTimelineLane timeline={timelines[0]} OcurrenceComponent={UnitOcurrence} className='units' />
      </EonTimeline>
    </div>
  )
}
