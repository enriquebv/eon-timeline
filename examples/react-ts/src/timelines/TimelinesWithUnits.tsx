import { useState } from 'react'
import { Timeline, Range, buildUnitsTimeline } from '@eon-timeline/core'
import { EonTimelineItemProps, EonTimelineLane, EonTimelineUnitItemProps, EonTimeline } from '@eon-timeline/react'
import { makeItemsCollection, RANGES_PER_UNIT } from './shared'
import './TimelinesWithUnits.css' // <- Styles of units

const timelines = [
  new Timeline({
    items: buildUnitsTimeline({ range: RANGES_PER_UNIT.hour, unit: 'minute', unitScale: 15 }),
  }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
]

const formatTime = (timestamp: number) => new Date(timestamp).toTimeString().split(' ')[0]

function UnitItem(props: EonTimelineUnitItemProps) {
  return <div className='event-timeline-time-event'>{formatTime(props.item.ocurrence.start)}</div>
}

function EventItem(props: EonTimelineItemProps) {
  return <div>ID: {props.item.id}</div>
}

function ItemComponent(props: EonTimelineItemProps | EonTimelineUnitItemProps) {
  const isUnitItem = (props as EonTimelineUnitItemProps).item.data?.isUnitItem

  return isUnitItem ? <UnitItem {...(props as EonTimelineUnitItemProps)} /> : <EventItem {...props} />
}

export default function ExampleTimelineDay() {
  const [range, setRange] = useState(RANGES_PER_UNIT.hour)

  return (
    <div className='timeline-with-units'>
      <EonTimeline
        range={range}
        timelines={timelines}
        onRangeChange={(range) => {
          timelines[0].replaceItems(buildUnitsTimeline({ range: range as Range, unit: 'minute', unitScale: 15 }))
          setRange(range as Range)
        }}
      >
        <EonTimelineLane timeline={timelines[0]} EventComponent={UnitItem} className='units' />
      </EonTimeline>
    </div>
  )
}
