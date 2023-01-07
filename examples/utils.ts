const OCURRENCES_COUNT = 10_000

export interface OcurrencesExampleOptions {
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

export function makeRandomOcurrence() {
  const now = Date.now()
  const start = now + 1000 * 60 * Math.floor(Math.random() * 10)
  const end = start + 1000 * 60 * Math.floor(Math.random() * 30)

  return {
    id: now,
    range: { start, end },
  }
}

export function makeRandomOcurrenceCollection(options: OcurrencesExampleOptions) {
  const ocurrences: any = []
  let lastStart: number = Date.now()

  for (let index = 0; index < OCURRENCES_COUNT; index++) {
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

    ocurrences.push({
      id: ocurrences.length + 1,
      range: {
        start: start.valueOf(),
        end: end.valueOf(),
      },
    })
  }

  return ocurrences
}

export default makeRandomOcurrenceCollection
