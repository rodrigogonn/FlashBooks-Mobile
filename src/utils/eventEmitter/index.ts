export type EventListener<T> = (event: T) => void;

export class EventEmitter<T> {
  private listeners: EventListener<T>[] = [];

  addEventListener(listener: EventListener<T>): void {
    this.listeners.push(listener);
  }

  removeEventListener(listener: EventListener<T>): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  emit(event: T): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
