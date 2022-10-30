import { TimelineDataset } from './timeline-dataset'

describe('TimelineDataset', () => {
  test('Items added in constructor are correctly stored', () => {
    const now = Date.now()
    const item = {
      id: 1,
      ocurrence: {
        start: now,
        end: now,
      },
    }
    const dataset = new TimelineDataset([item])

    expect(dataset.items).toBeInstanceOf(Map)
    expect(dataset.items.size).toBe(1)
  })

  test('Items stored are accesible by id', () => {
    const now = Date.now()
    const item = {
      id: 73,
      ocurrence: {
        start: now,
        end: now,
      },
    }
    const dataset = new TimelineDataset([item])

    expect(dataset.items.get(73)).not.toBeUndefined()
  })

  test.todo('Test .updateItem implementation')
  test.todo('Test .deleteItem implementation')
  test.todo('Test .addItem implementation')
})
