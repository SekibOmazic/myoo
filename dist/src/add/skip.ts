import {Observable, Observer} from '../core';

export function skip<T>(total: number): Observable<T> {
  let counter: number = 0;

  return Observable.create<T>((observer: Observer<T>) => {
    const takeObserver = {
      next: (x: T) => {
        if (counter++ >= total) {
          observer.next(x);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(takeObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.skip = skip;

export interface SkipSignature<T> {
  (value: number): Observable<T>;
}

declare module '../core' {
  interface Observable<T> {
    skip: SkipSignature<T>;
  }
}