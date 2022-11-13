const ITEMS_COUNT = 10_000

export interface EventsExampleOptions {
  gapRangeInMinutes: {
    min: number,
    max: number
  }
  durationRangeInMinutes: {
    min: number,
    max: number
  } 
}

export function makeExampleItems(options: EventsExampleOptions) {
  const items: any = []
  let lastStart: number = Date.now()

  while (items.length < ITEMS_COUNT) {
    const start = new Date(lastStart)
    start.setMinutes(start.getMinutes() + Math.max(options.gapRangeInMinutes.min, Math.floor(Math.random() * options.gapRangeInMinutes.min)))

    const end = new Date(start)
    end.setMinutes(end.getMinutes() + Math.max(options.durationRangeInMinutes.min, Math.floor(Math.random() * options.durationRangeInMinutes.max)))

    lastStart = end.valueOf()

    items.push({
      id: items.length + 1,
      ocurrence: {
        start: start.valueOf(),
        end: end.valueOf(),
      },
    })
  }

  return items
}

export default makeExampleItems
