export type EventListener<T, K extends keyof T> = (this: EventDispatcher<T>, data: T[K]) => void

type ListenersSet<T, K extends keyof T> = Set<EventListener<T, K>>
type ListenersMap<T, K extends keyof T> = Map<K, ListenersSet<T, K>>

export class EventDispatcher<T> {
  private readonly listeners: ListenersMap<T, keyof T> = new Map()

  public dispose (): void {
    this.listeners.forEach((listeners) => {
      listeners.clear()
    })

    this.listeners.clear()
  }

  public off<K extends keyof T>(event: K, callback?: EventListener<T, K>): void {
    if (callback === undefined) {
      this.listeners.delete(event)

      return
    }

    const listeners = this.listeners.get(event)

    if (listeners === undefined) return

    listeners.delete(callback as EventListener<T, keyof T>)
  }

  public on<K extends keyof T>(event: K, callback: EventListener<T, K>): void {
    this.getListeners(event).add(callback as EventListener<T, keyof T>)
  }

  public dispatch<K extends keyof T>(event: K, data: T[K]): void {
    const listeners = this.listeners.get(event)

    if (listeners === undefined) return

    listeners.forEach((listener) => {
      listener.call(this, data)
    })
  }

  private getListeners<K extends keyof T>(event: K): ListenersSet<T, K> {
    let listeners = this.listeners.get(event)

    if (listeners === undefined) {
      listeners = new Set()
      this.listeners.set(event, listeners)
    }

    return listeners
  }
}
