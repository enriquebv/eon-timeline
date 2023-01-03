import { Timeline } from 'eon-timeline'
import EonTimeline, { EonTimelineItemProps, EonTimelineLane } from 'eon-timeline/dist/components/react'
import { useEffect, useState } from 'react'
import { ExampleProps, RANGES_PER_UNIT, makeItemsCollection } from './shared'

const timelines = [
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
]

function EventComponent(props: EonTimelineItemProps) {
  return <div>ID: {props.item.id}</div>
}

export default function TimelineWithCustomComponent(props: ExampleProps) {
  const [range, setRange] = useState(RANGES_PER_UNIT[props.rangeUnit])

  useEffect(() => setRange(RANGES_PER_UNIT[props.rangeUnit]), [props.rangeUnit])

  return (
    <EonTimeline range={range} timelines={timelines} onRangeChange={setRange}>
      {timelines.map((timeline) => (
        <EonTimelineLane timeline={timeline} EventComponent={EventComponent} />
      ))}
    </EonTimeline>
  )
}
