export class EventEmitter {
  private listeners: { [key: string]: Function[] } = {}

  public on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(listener)

    return () => this.off(event, listener)
  }

  public off(event: string, listener: Function) {
    if (!this.listeners[event]) {
      return
    }

    const index = this.listeners[event].indexOf(listener)

    if (index === -1) {
      return
    }

    this.listeners[event].splice(index, 1)
  }

  public emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach((listener) => listener(...args))
  }
}
