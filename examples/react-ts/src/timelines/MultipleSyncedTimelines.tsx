import { Timeline } from 'eon-timeline'
import EonTimeline from 'eon-timeline/dist/components/react'
import { useEffect, useState } from 'react'
import makeRandomItemCollection from '../../../example-items'
import { ExampleProps, RANGES_PER_UNIT } from './shared'

function makeItemsCollection() {
  return makeRandomItemCollection({
    gapRangeInMinutes: {
      min: 1,
      max: 5,
    },
    durationRangeInMinutes: {
      min: 5,
      max: 10,
    },
  })
}

const timelines = [
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
]

export default function MultipleSyncedTimelines(props: ExampleProps) {
  const [range, setRange] = useState(RANGES_PER_UNIT[props.rangeUnit])

  useEffect(() => setRange(RANGES_PER_UNIT[props.rangeUnit]), [props.rangeUnit])

  return <EonTimeline range={range} timelines={timelines} onRangeChange={setRange} />
}
