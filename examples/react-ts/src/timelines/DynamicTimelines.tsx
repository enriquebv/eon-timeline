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
  const timelineDomRef = useRef<TimelineDOM>(null)

  function handleTimelineAdd() {
    timelineDomRef.current?.addTimeline(new Timeline({ items: makeItemsCollection() }))
    timelineDomRef.current?.redraw()
  }

  function handleTimelineRemove() {
    const response = Number(prompt('Timeline index to remove', '0'))

    try {
      timelineDomRef.current?.removeTimeline(response)
      timelineDomRef.current?.redraw()
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <div className='timeline-with-units'>
      <EonTimeline timelineDomRef={timelineDomRef} range={range} timelines={timelines} onRangeChange={setRange} />
      <div className='controls'>
        <p>Actions:</p>
        <div>
          <button onClick={handleTimelineAdd}>Add timeline</button>
          <label>
            <button onClick={handleTimelineRemove}>Remove timeline</button>
          </label>
        </div>
      </div>
    </div>
  )
}
