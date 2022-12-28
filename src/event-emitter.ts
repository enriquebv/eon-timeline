export default class EventEmitter<Event = { string: any }> {
  private listeners: Record<string, ((payload: Event[keyof Event]) => void)[]> = {}

  emit<Topic extends keyof Event>(topic: Topic, payload?: Event[Topic]) {
    const listeners = this.listeners[topic as string]

    if (!listeners || listeners.length === 0) return

    listeners.forEach((listener) => listener(payload as any))
  }

  on<Topic extends keyof Event>(topic: Topic, callbackReference: (payload?: Event[Topic]) => void) {
    if (!this.listeners[topic as string]) {
      this.listeners[topic as string] = []
    }

    this.listeners[topic as string].push(callbackReference as any)
  }

  off(topic: keyof Event, callbackReference: (payload: Event[keyof Event]) => void) {
    const callbacks = this.listeners[topic as string]

    if (callbacks?.length === 0) return

    this.listeners[topic as string] = this.listeners[topic as string].filter(
      (callback) => callback !== callbackReference
    )
  }
}
