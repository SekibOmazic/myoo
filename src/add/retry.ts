import {Observable} from '../Observable';
import {Observer} from '../Observer';
import {Subscription} from '../Subscription';

export function retry<T>(maxTries: number = 0): Observable<T> {

  return Observable.create<T>((observer: Observer<T>) => {
    let subscription: Subscription<T>;

    let retryObserver = {
      next: (x: T) => observer.next(x),
      error: (err: any) => {
        if (subscription) {
          subscription.unsubscribe();
        }

        if (maxTries > 0) {
          maxTries--;
          subscription = this.subscribe(retryObserver);
        } else {
          observer.error(err);
        }
      },
      complete: () => observer.complete()
    };

    subscription = this.subscribe(retryObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.retry = retry;

export interface RetrySignature<T> {
  (value: number): Observable<T>;
}

declare module '../Observable' {
  interface Observable<T> {
    retry: RetrySignature<T>;
  }
}