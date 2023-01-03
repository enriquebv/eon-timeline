import { useState } from 'react'

import './App.css'
import 'eon-timeline/dist/styles.css'
import reactLogo from './assets/react.svg'

import SingleTimeline from './timelines/SingleTimeline'
import MultipleSyncedTimelines from './timelines/MultipleSyncedTimelines'
import TimlinesWithUnits from './timelines/TimelinesWithUnits'
import { ExampleRangeUnit } from './timelines/shared'
import TimelineWithCustomComponent from './timelines/TimelineWithCustomEventComponent'

function App() {
  const [rangeUnit, setRangeUnit] = useState<ExampleRangeUnit>('hour')

  return (
    <div className='App'>
      <div>
        <img src={reactLogo} className='logo' alt='React logo' />
      </div>
      <h1>eon-timeline + React</h1>

      <button onClick={() => setRangeUnit('minute')}>1 minute</button>
      <button onClick={() => setRangeUnit('hour')}>1 hour</button>
      <button onClick={() => setRangeUnit('day')}>1 day</button>

      <h2>Basic examples</h2>

      <h3>Single timeline</h3>
      <SingleTimeline rangeUnit={rangeUnit} />

      <h3>Multiple synced timelines</h3>
      <MultipleSyncedTimelines rangeUnit={rangeUnit} />

      <h3>Timelines with custom item component</h3>
      <TimelineWithCustomComponent rangeUnit={rangeUnit} />

      <h2>Advanced examples</h2>

      <h3>Timelines with units</h3>
      <TimlinesWithUnits />
    </div>
  )
}

export default App
