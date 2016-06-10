import {Observer, Subscriber, Cleanup} from './Observer';

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
