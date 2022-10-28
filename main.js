import Timeline, { TimelineDOM, TimelineDataset } from '../dist'

const now = Date.now()
const DEFAULT_RANGE = {
  start: now,
  end: now + 60 * 60 * 1000,
}

const ITEMS_COUNT = 30

const makeExampleItems = (baseTimestamp) =>
  Array(ITEMS_COUNT)
    .fill()
    .map((_, i) => {
      const id = i + 1

      const start = new Date(baseTimestamp)
      start.setMinutes(start.getMinutes() + i)
      start.setMinutes(start.getMinutes())

      const end = new Date(start)
      end.setMinutes(end.getMinutes() + 1)

      return {
        id: i + 1,
        ocurrence: {
          start: start.valueOf(),
          end: end.valueOf(),
        },
      }
    })

const timelines = [
  new Timeline({
    dataset: new TimelineDataset(makeExampleItems(now)),
    range: DEFAULT_RANGE,
  }),
  new Timeline({
    dataset: new TimelineDataset(makeExampleItems(now)),
    range: DEFAULT_RANGE,
  }),
]

new TimelineDOM(document.getElementById('container'), timelines, (items) => console.log(items))
