import { useState } from 'react'

import './App.css'
import '@eon-timeline/core/dist/styles.css'
import reactLogo from './assets/react.svg'

import SingleTimeline from './timelines/SingleTimeline'
import MultipleSyncedTimelines from './timelines/MultipleSyncedTimelines'
import TimlinesWithUnits from './timelines/TimelinesWithUnits'
import { ExampleRangeUnit } from './timelines/shared'
import TimelineWithCustomComponent from './timelines/TimelineWithCustomEventComponent'
import DynamicTimeline from './timelines/DynamicTimelines'
import DynamicEvents from './timelines/DynamicEvents'

function App() {
  const [rangeUnit, setRangeUnit] = useState<ExampleRangeUnit>('hour')

  return (
    <div className='App'>
      <div>
        <img src={reactLogo} className='logo' alt='React logo' />
      </div>
      <h1>eon-timeline + React</h1>

      <div className='panels'>
        <div>
          <h3>Single timeline</h3>
          <SingleTimeline rangeUnit={rangeUnit} />

          <h3>Multiple synced timelines</h3>
          <MultipleSyncedTimelines rangeUnit={rangeUnit} />

          <h3>Timelines with custom item component</h3>
          <TimelineWithCustomComponent rangeUnit={rangeUnit} />

          <div className='controls'>
            <p>Change previous ranges:</p>
            <div>
              <button onClick={() => setRangeUnit('minute')}>1 minute</button>
              <button onClick={() => setRangeUnit('hour')}>1 hour</button>
              <button onClick={() => setRangeUnit('day')}>1 day</button>
            </div>
          </div>
        </div>

        <div>
          <h3>Timelines with units</h3>
          <TimlinesWithUnits />

          <h3>Real-time events</h3>
          <DynamicEvents />

          <h3>Dynamic add/remove timeline lanes</h3>
          <DynamicTimeline />
        </div>
      </div>
    </div>
  )
}

export default App
