import './index.css'
import ExampleTimeline from './ExampleTimeline'

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY

export default function TimelineApp() {
  return (
    <div className='demo-page'>
      <h1>virtual-headless-timeline</h1>
      <h2>A virtualized timeline renderer.</h2>

      <div className='demo-container'>
        <ul>
          <li>⚡ Displaying 5 synced timelines, 10.000 items each one.</li>
          <li>
            💡 Each timeline row and item is rendered by React, you don't have to fight with the library to create your
            own timeline experience.
          </li>
        </ul>

        <ExampleTimeline
          title='30 days hours timeline'
          timeWindowDuration={MONTH}
          scale='days'
          eventsExampleOptions={{
            gapRangeInMinutes: {
              min: 500,
              max: 2000,
            },
            durationRangeInMinutes: {
              min: 1000,
              max: 5000,
            },
          }}
        />
      </div>
    </div>
  )
}
