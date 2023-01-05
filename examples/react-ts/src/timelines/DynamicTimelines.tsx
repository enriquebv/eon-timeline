import { useRef, useState } from 'react'
import { Timeline, TimelineDOM } from '@eon-timeline/core'
import { EonTimeline } from '@eon-timeline/react'
import { makeItemsCollection, RANGES_PER_UNIT } from './shared'
import './TimelinesWithUnits.css' // <- Styles of units

const timelines = [
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
  new Timeline({ items: makeItemsCollection() }),
]

export default function DynamicTimeline() {
  const [range, setRange] = useState(RANGES_PER_UNIT.hour)
  const [indexToRemove, setIndexToRemove] = useState<number>(0)
  const timelineDomRef = useRef<TimelineDOM>(null)

  function handleTimelineAdd() {
    timelineDomRef.current?.addTimeline(new Timeline({ items: makeItemsCollection() }))
    timelineDomRef.current?.redraw()
  }

  function handleTimelineRemove() {
    timelineDomRef.current?.removeTimeline(indexToRemove)
    timelineDomRef.current?.redraw()
    setIndexToRemove(0)
  }

  return (
    <div className='timeline-with-units'>
      <button></button>
      <button onClick={handleTimelineAdd}>Add timeline</button>
      <label>
        <input
          type='number'
          placeholder='Timeline index (starts at 0)'
          value={indexToRemove}
          onChange={(event) => setIndexToRemove(Math.max(0, event.target.valueAsNumber || 0))}
        />
        <button onClick={handleTimelineRemove}>Remove timeline</button>
      </label>
      <EonTimeline timelineDomRef={timelineDomRef} range={range} timelines={timelines} onRangeChange={setRange} />
    </div>
  )
}
