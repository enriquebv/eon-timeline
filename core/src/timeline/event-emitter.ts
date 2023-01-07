export class OcurrenceEmitter<Ocurrence = { string: any }> {
  private listeners: Record<string, ((payload: Ocurrence[keyof Ocurrence]) => void)[]> = {}

  emit<Topic extends keyof Ocurrence>(topic: Topic, payload?: Ocurrence[Topic]) {
    const listeners = this.listeners[topic as string]

    if (!listeners || listeners.length === 0) return

    listeners.forEach((listener) => listener(payload as any))
  }

  on<Topic extends keyof Ocurrence>(topic: Topic, callbackReference: (payload: Ocurrence[Topic]) => void) {
    if (!this.listeners[topic as string]) {
      this.listeners[topic as string] = []
    }

    this.listeners[topic as string].push(callbackReference as any)
  }

  off(topic: keyof Ocurrence, callbackReference: (payload: Ocurrence[keyof Ocurrence]) => void) {
    const callbacks = this.listeners[topic as string]

    if (callbacks?.length === 0) return

    this.listeners[topic as string] = this.listeners[topic as string].filter(
      (callback) => callback !== callbackReference
    )
  }
}
