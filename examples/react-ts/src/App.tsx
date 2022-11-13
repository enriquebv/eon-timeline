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

        
        <ExampleTimeline title="30 days hours timeline" timeWindowDuration={MONTH} scale="days" eventsExampleOptions={{
          gapRangeInMinutes: {
            min: 500,
            max: 2000
          },
          durationRangeInMinutes: {
            min: 1000,
            max: 5000
          }
        }}/>
        <ExampleTimeline title="7 days hours timeline" timeWindowDuration={WEEK} scale="days" eventsExampleOptions={{
          gapRangeInMinutes: {
            min: 50,
            max: 500
          },
          durationRangeInMinutes: {
            min: 1000,
            max: 2000
          }
        }}/>
        <ExampleTimeline title="1 day timeline" timeWindowDuration={DAY} scale="hours" eventsExampleOptions={{
          gapRangeInMinutes: {
            min: 5,
            max: 100
          },
          durationRangeInMinutes: {
            min: 50,
            max: 100
          }
        }} />
        <ExampleTimeline title="1 hour timeline" timeWindowDuration={HOUR} scale="minutes"  eventsExampleOptions={{
          gapRangeInMinutes: {
            min: 1,
            max: 5
          },
          durationRangeInMinutes: {
            min: 15,
            max: 60
          }
        }}/>
        <ExampleTimeline title="1 minute timeline" timeWindowDuration={5 * MINUTE} scale="seconds"  eventsExampleOptions={{
          gapRangeInMinutes: {
            min: 0.5,
            max: 1
          },
          durationRangeInMinutes: {
            min: 1,
            max: 1.5
          }
        }} />
      </div>
    </div>
  )
}
