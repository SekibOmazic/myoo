export interface Observer<T> {
  next(value: T): void;
  error?(err: any): void;
  complete?(): void;
}

export type Cleanup = () => any | void;
export type Subscriber<T> = (observer: Observer<T>) => Cleanup;

export class Subscription<T> {
  public isUnsubscribed: boolean;
  public isStopped: boolean;
  public cleanup: Cleanup;

  constructor(private subscriber: Subscriber<T>, destination: Observer<T>) {
    this.isUnsubscribed = false;
    this.isStopped = false;

    let observer = {
      next: (data: T) => {
        if (!this.isStopped && destination.next) {
          destination.next(data);
        }
      },
      error: (err: any) => {
        if (!this.isStopped) {
          this.isStopped = true;

          if (destination.error) {
            destination.error(err);
          }

          this.unsubscribe();
        }
      },
      complete: () => {

        if (!this.isStopped) {
          this.isStopped = true;

          if (destination.complete) {
            destination.complete();
          }

          this.unsubscribe();
        }

      }
    };

    let cleanupFn = subscriber(observer);
    if (typeof cleanupFn === 'function') {
      this.cleanup = cleanupFn;
    }
  }

  unsubscribe() {
    if (this.isUnsubscribed) {
      return;
    }

    this.isStopped = true;
    this.isUnsubscribed = true;

    if (this.cleanup) {
      this.cleanup();
    }
  }

}


export class Observable<T> {

  static create<T>(subscriber: Subscriber<T>): Observable<T> {
    return new Observable<T>(subscriber);
  }

  /**
   * Converts an array to an Observable. The returned Observable will emit synchronously
   * all the items in the array, and then complete.
   *
   * Marble diagram:
   *
   * ```text
   * fromArray([1,2,3])
   * 123|
   * ```
   *
   * @param {Array} array The array to be converted as a stream.
   * @return {Observable}
   */
  static fromArray<T>(array: Array<T>): Observable<T> {
    let subscriber: Subscriber<T> = (observer: Observer<T>) => {
      array.forEach(item => { observer.next(item); });
      observer.complete();

      return () => {}
    };

    return new Observable<T>(subscriber);
  }

  /**
   * Creates a Stream that immediately emits the arguments that you give to
   * *of*, then completes.
   *
   * Marble diagram:
   *
   * ```text
   * of(1,2,3)
   * 123|
   * ```
   *
   * @param items Values you want to emit to the observer.
   * @return {Observable}
   */
  static of<T>(...items: Array<T>): Observable<T> {
    return Observable.fromArray(items);
  }

  static interval(interval: number): Observable<number> {
    return Observable.create<number>(observer => {
      let count = 0;
      const intervalId = setInterval(() => {
          observer.next(count++);
      }, interval);

      return () => {
        clearInterval(intervalId);

        if (observer.complete) {
          observer.complete();
        }
      };

    });
  }

  constructor(private subscriber: Subscriber<T>) {}

  public subscribe(destination: Observer<T>): Subscription<T> {
    return new Subscription(this.subscriber, destination);
  }

}
