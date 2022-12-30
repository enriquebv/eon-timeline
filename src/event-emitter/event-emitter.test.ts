import { EventEmitter } from './event-emitter'

interface Event {
  'user-registered': { id: number }
}

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter<Event>

  beforeEach(() => {
    eventEmitter = new EventEmitter<Event>()
  })

  test('Register listener', () => {
    eventEmitter.on('user-registered', () => {})

    expect((eventEmitter as any).listeners['user-registered']).not.toBeUndefined()
    expect((eventEmitter as any).listeners['user-registered'].length).toBe(1)

    eventEmitter.on('user-registered', () => {})
    expect((eventEmitter as any).listeners['user-registered'].length).toBe(2)
  })

  test('Unregister listener if reference is the same', () => {
    const callback = () => {}

    eventEmitter.on('user-registered', callback)
    eventEmitter.off('user-registered', callback)
    expect((eventEmitter as any).listeners['user-registered'].length).toBe(0)
  })

  test("Don't unregister listener if reference is different", () => {
    eventEmitter.on('user-registered', () => {})
    eventEmitter.off('user-registered', () => {})
    expect((eventEmitter as any).listeners['user-registered'].length).toBe(1)
  })

  test('If .emit() method is called, callback should be called N times', () => {
    const callback = jest.fn(() => undefined)

    eventEmitter.on('user-registered', callback)
    eventEmitter.emit('user-registered')

    expect(callback).toBeCalledTimes(1)

    eventEmitter.emit('user-registered')
    eventEmitter.emit('user-registered')
    expect(callback).toBeCalledTimes(3)
  })

  test('If .emit() method is called, callback should be called N times', () => {
    const callback = jest.fn(() => undefined)

    eventEmitter.on('user-registered', callback)
    eventEmitter.emit('user-registered')

    expect(callback).toBeCalledTimes(1)

    eventEmitter.emit('user-registered')
    eventEmitter.emit('user-registered')
    expect(callback).toBeCalledTimes(3)
  })

  test('If .emit() method is called but listener is removed, callback should not be called', () => {
    const callback = jest.fn(() => undefined)

    eventEmitter.on('user-registered', callback)
    eventEmitter.emit('user-registered')
    eventEmitter.off('user-registered', callback)

    expect(callback).toBeCalledTimes(1)

    eventEmitter.emit('user-registered')
    eventEmitter.emit('user-registered')

    expect(callback).toBeCalledTimes(1)
  })

  test('If .emit() method is called with payload, callback should recieve same payload', () => {
    const callback = jest.fn(() => undefined)
    const payload = { id: 1 }

    eventEmitter.on('user-registered', callback)
    eventEmitter.emit('user-registered', payload)

    expect((callback.mock.lastCall as any)[0]).toBe(payload) // Check reference
    expect((callback.mock.lastCall as any)[0].id).toBe(payload.id) // Check value

    eventEmitter.emit('user-registered')
    expect((callback.mock.lastCall as any)[0]).toBe(undefined)
  })
})
