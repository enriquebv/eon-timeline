import { Timeline } from '@eon-timeline/core'
import { EonTimeline, EonTimelineOcurrenceProps, EonTimelineLane } from '@eon-timeline/react'
import { useEffect, useState } from 'react'
import { ExampleProps, RANGES_PER_UNIT, makeOcurrencesCollection } from './shared'

const timelines = [
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
  new Timeline({ ocurrences: makeOcurrencesCollection() }),
]

function OcurrenceComponent(props: EonTimelineOcurrenceProps) {
  return <div>ID: {props.ocurrence.id}</div>
}

export default function TimelineWithCustomComponent(props: ExampleProps) {
  const [range, setRange] = useState(RANGES_PER_UNIT[props.rangeUnit])

  useEffect(() => setRange(RANGES_PER_UNIT[props.rangeUnit]), [props.rangeUnit])

  return (
    <EonTimeline range={range} timelines={timelines} onRangeChange={setRange}>
      {timelines.map((timeline) => (
        <EonTimelineLane timeline={timeline} OcurrenceComponent={OcurrenceComponent} />
      ))}
    </EonTimeline>
  )
}
