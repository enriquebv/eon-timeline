const ITEMS_COUNT = 10_000

export interface EventsExampleOptions {
  gapRangeInMinutes: {
    min: number
    max: number
  }
  durationRangeInMinutes: {
    min: number
    max: number
  }
}

export const getNumberBetween = (min: number, max: number) => Math.max(min, Math.floor(Math.random() * max))

export function makeRandomItem() {
  const now = Date.now()
  const start = now + 1000 * 60 * Math.floor(Math.random() * 10)
  const end = start + 1000 * 60 * Math.floor(Math.random() * 30)

  return {
    id: now,
    ocurrence: { start, end },
  }
}

export function makeRandomItemCollection(options: EventsExampleOptions) {
  const items: any = []
  let lastStart: number = Date.now()

  for (let index = 0; index < ITEMS_COUNT; index++) {
    const start = new Date(lastStart)
    const minutesGap =
      index === 0
        ? getNumberBetween(0, options.durationRangeInMinutes.max)
        : getNumberBetween(options.gapRangeInMinutes.min, options.durationRangeInMinutes.max)

    start.setMinutes(start.getMinutes() + minutesGap)

    const end = new Date(start)
    end.setMinutes(
      end.getMinutes() + getNumberBetween(options.durationRangeInMinutes.min, options.durationRangeInMinutes.max)
    )

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

export default makeRandomItemCollection
