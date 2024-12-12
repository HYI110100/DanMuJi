export class EventDispatcher<T extends Record<string, any[]>> {
  private subscribeEvents: { [K in keyof T]?: Set<(...params: T[K]) => void> };
  private maxListeners: number;

  constructor() {
    this.subscribeEvents = {};
    this.maxListeners = 10;
  }

  public emit<K extends keyof T>(type: K, ...params: T[K]): void {
    const handlers = this.subscribeEvents[type];
    if (handlers) {
      [...handlers].forEach((fn) => {
        try {
          fn(...params);
        } catch (error) {
          console.error(`Error in handler for event "${String(type)}":`, error);
        }
      });
    }
  }

  public on<K extends keyof T>(type: K, fn: (...params: T[K]) => void): void {
    if (!this.subscribeEvents[type]) {
      this.subscribeEvents[type] = new Set();
    }
    if (this.subscribeEvents[type]!.size >= this.maxListeners) {
      console.warn(`Max listeners exceeded for event "${String(type)}".`);
    }
    this.subscribeEvents[type]!.add(fn);
  }

  public once<K extends keyof T>(type: K, fn: (...params: T[K]) => void): void {
    const onceFn = (...params: T[K]) => {
      fn(...params);
      this.off(type, onceFn);
    };
    this.on(type, onceFn);
  }

  public off<K extends keyof T>(type: K, fn: (...params: T[K]) => void): void {
    const handlers = this.subscribeEvents[type];
    if (handlers) {
      handlers.delete(fn);
      if (handlers.size === 0) {
        delete this.subscribeEvents[type];
      }
    }
  }

  public offAll<K extends keyof T>(type?: K): void {
    if (type) {
      this.subscribeEvents[type]?.clear();
      delete this.subscribeEvents[type];
    } else {
      Object.keys(this.subscribeEvents).forEach((key) => {
        this.subscribeEvents[key as K]?.clear();
      });
      this.subscribeEvents = {};
    }
  }

  public has<K extends keyof T>(type: K): boolean {
    return !!this.subscribeEvents[type] && this.subscribeEvents[type]!.size > 0;
  }

  public setMaxListeners(max: number): void {
    this.maxListeners = max;
  }
}
