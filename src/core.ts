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

/*
let myObserver = {
  next: (x) => console.log('_myObserver ' + x),
  error: (err) => console.error('myObserver ' + err),
  complete: () => console.info('myObserver DONE')
};

let source$ = Observable.interval(1000);

let subscription = source$
                    .filter(x => x > 0)
                    .take(5)
                    .map(x => x + '?')
                    .subscribe(myObserver);

setTimeout(() => subscription.unsubscribe(), 3000)

*/