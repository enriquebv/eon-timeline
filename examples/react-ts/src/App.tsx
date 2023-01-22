import { useState } from 'react'

import './App.css'
import '@eon-timeline/core/dist/styles.css'

import MainTimeline from './timelines/MainTimeline'
import SingleTimeline from './timelines/SingleTimeline'
import MultipleSyncedTimelines from './timelines/MultipleSyncedTimelines'
import TimlinesWithUnits from './timelines/TimelinesWithUnits'
import { ExampleRangeUnit } from './timelines/shared'
import TimelineWithCustomComponent from './timelines/TimelineWithCustomOcurrenceComponent'
import DynamicTimeline from './timelines/DynamicTimeline'
import DynamicOcurrences from './timelines/DynamicOcurrences'

function App() {
  const [rangeUnit, setRangeUnit] = useState<ExampleRangeUnit>('hour')

  return (
    <div className='App'>
      <h1>eon-timeline</h1>

      <ul className='example-links'>
        <li>
          <a href='./docs'>Docs</a>
        </li>
        <li>
          <a href='https://github.com/enriquebv/eon-timeline'>GitHub</a>
        </li>
      </ul>

      <MainTimeline />

      <div className='panels'>
        <div>
          <h3>Single timeline</h3>
          <SingleTimeline rangeUnit={rangeUnit} />

          <h3>Multiple synced timelines</h3>
          <MultipleSyncedTimelines rangeUnit={rangeUnit} />

          <h3>Timelines with custom ocurrence component</h3>
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

          <h3>Real time</h3>
          <DynamicOcurrences />

          <h3>Dynamic add/remove timeline lanes</h3>
          <DynamicTimeline />
        </div>
      </div>
    </div>
  )
}

export default App
