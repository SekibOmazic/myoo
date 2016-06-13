/**
 * This class is taken from https://github.com/staltz/xstream/blob/master/tests/extra/fromEvent.ts
 */
export class MockEventTarget implements EventTarget {
  public handler: EventListener;
  public event: string;
  public capture: boolean;
  public removedEvent: string;
  public removedCapture: boolean;

  constructor() {}

  emit(x: any) {
    if (typeof this.handler !== 'function') {
      return;
    }
    this.handler.call(void 0, x);
  }

  addEventListener(e: string, handler: EventListener, capture: boolean) {
    this.event = e;
    this.handler = handler;
    this.capture = capture;
  }

  removeEventListener(e: string, handler: EventListener, capture: boolean) {
    this.removedEvent = e;
    this.removedCapture = capture;

    this.handler = this.event = this.capture = void 0;
  }

  dispatchEvent(event: Event) {
    return true;
  }
}