const ITEMS_COUNT = 10_000

export function makeExampleItems() {
  const items: any = []
  let lastStart: number = Date.now()

  while (items.length < ITEMS_COUNT) {
    const start = new Date(lastStart)
    start.setMinutes(start.getMinutes() + Math.max(1, Math.floor(Math.random() * 10)))

    const end = new Date(start)
    end.setMinutes(end.getMinutes() + Math.max(5, Math.floor(Math.random() * 10)))

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
