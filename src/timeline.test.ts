import { Timeline } from './timeline'

describe('Timeline', () => {
  function getDefaults() {
    const item = {
      id: 1,
      ocurrence: {
        start: Date.now(),
        end: Date.now(),
      },
    }
    const timeline = new Timeline({
      items: [item],
      range: { start: Date.now(), end: Date.now() },
    })

    return { item, timeline }
  }

  test('Items added in constructor are correctly stored', () => {
    const { timeline } = getDefaults()

    expect(timeline.items).toBeInstanceOf(Map)
    expect(timeline.items.size).toBe(1)
  })

  test('Items stored are accesible by id', () => {
    const { timeline } = getDefaults()

    expect(timeline.items.get(1)).not.toBeUndefined()
  })

  test('Defines .addItem()', () => {
    const { timeline } = getDefaults()

    expect(timeline.addItem).not.toBeUndefined()
  })

  test('.addItem() correctly add item', () => {
    const { timeline } = getDefaults()

    timeline.addItem({
      id: 2,
      ocurrence: {
        start: Date.now(),
        end: Date.now(),
      },
    })

    expect(timeline.items.get(2)).not.toBeUndefined()
  })

  test('Defines .updateItem()', () => {
    const { timeline } = getDefaults()

    expect(timeline.updateItem).not.toBeUndefined()
  })

  test('.updateItem() correctly replaces item', () => {
    const randomPropertyValue = Math.random()
    const { timeline } = getDefaults()

    timeline.addItem({
      id: 1,
      randomProperty: randomPropertyValue,
      ocurrence: {
        start: Date.now(),
        end: Date.now(),
      },
    } as any)

    expect((timeline.items.get(1)?.itemReference as any).randomProperty).not.toBeUndefined()
    expect((timeline.items.get(1)?.itemReference as any).randomProperty).toBe(randomPropertyValue)
  })

  test('Defines .removeItem()', () => {
    const { timeline } = getDefaults()

    expect(timeline.removeItem).not.toBeUndefined()
  })

  test('.removeItem() correctly removes item', () => {
    const { timeline } = getDefaults()

    timeline.removeItem(1)

    expect(timeline.items.get(1)).toBeUndefined()
  })
})
