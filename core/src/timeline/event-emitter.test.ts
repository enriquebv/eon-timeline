import { OcurrenceEmitter } from './event-emitter'

interface Ocurrence {
  'user-registered': { id: number }
}

describe('OcurrenceEmitter', () => {
  let ocurrenceEmitter: OcurrenceEmitter<Ocurrence>

  beforeEach(() => {
    ocurrenceEmitter = new OcurrenceEmitter<Ocurrence>()
  })

  test('Register listener', () => {
    ocurrenceEmitter.on('user-registered', () => {})

    expect((ocurrenceEmitter as any).listeners['user-registered']).not.toBeUndefined()
    expect((ocurrenceEmitter as any).listeners['user-registered'].length).toBe(1)

    ocurrenceEmitter.on('user-registered', () => {})
    expect((ocurrenceEmitter as any).listeners['user-registered'].length).toBe(2)
  })

  test('Unregister listener if reference is the same', () => {
    const callback = () => {}

    ocurrenceEmitter.on('user-registered', callback)
    ocurrenceEmitter.off('user-registered', callback)
    expect((ocurrenceEmitter as any).listeners['user-registered'].length).toBe(0)
  })

  test("Don't unregister listener if reference is different", () => {
    ocurrenceEmitter.on('user-registered', () => {})
    ocurrenceEmitter.off('user-registered', () => {})
    expect((ocurrenceEmitter as any).listeners['user-registered'].length).toBe(1)
  })

  test('If .emit() method is called, callback should be called N times', () => {
    const callback = jest.fn(() => undefined)

    ocurrenceEmitter.on('user-registered', callback)
    ocurrenceEmitter.emit('user-registered')

    expect(callback).toBeCalledTimes(1)

    ocurrenceEmitter.emit('user-registered')
    ocurrenceEmitter.emit('user-registered')
    expect(callback).toBeCalledTimes(3)
  })

  test('If .emit() method is called, callback should be called N times', () => {
    const callback = jest.fn(() => undefined)

    ocurrenceEmitter.on('user-registered', callback)
    ocurrenceEmitter.emit('user-registered')

    expect(callback).toBeCalledTimes(1)

    ocurrenceEmitter.emit('user-registered')
    ocurrenceEmitter.emit('user-registered')
    expect(callback).toBeCalledTimes(3)
  })

  test('If .emit() method is called but listener is removed, callback should not be called', () => {
    const callback = jest.fn(() => undefined)

    ocurrenceEmitter.on('user-registered', callback)
    ocurrenceEmitter.emit('user-registered')
    ocurrenceEmitter.off('user-registered', callback)

    expect(callback).toBeCalledTimes(1)

    ocurrenceEmitter.emit('user-registered')
    ocurrenceEmitter.emit('user-registered')

    expect(callback).toBeCalledTimes(1)
  })

  test('If .emit() method is called with payload, callback should recieve same payload', () => {
    const callback = jest.fn(() => undefined)
    const payload = { id: 1 }

    ocurrenceEmitter.on('user-registered', callback)
    ocurrenceEmitter.emit('user-registered', payload)

    expect((callback.mock.lastCall as any)[0]).toBe(payload) // Check reference
    expect((callback.mock.lastCall as any)[0].id).toBe(payload.id) // Check value

    ocurrenceEmitter.emit('user-registered')
    expect((callback.mock.lastCall as any)[0]).toBe(undefined)
  })
})
