import {Observable, Observer} from '../core';

export function filter<T>(predicate: (val: T) => boolean): Observable<T> {

  return Observable.create<T>((observer: Observer<T>) => {
    const filterObserver = {
      next: (x: T) => {
        try {
          const result = predicate(x);

          if (result) observer.next(x);
        } catch (err) {
          observer.error(err);
          return;
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(filterObserver);

    return () => {
      subscription.unsubscribe();
    };

  });
}

Observable.prototype.filter = filter;

export interface FilterSignature<T> {
  (project: (value: T) => boolean): Observable<T>;
}

declare module '../core' {
  interface Observable<T> {
    filter: FilterSignature<T>;
  }
}