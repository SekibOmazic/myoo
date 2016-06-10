import {Observable} from '../Observable';
import {Observer} from '../Observer';

export function distinctUntilChanged<T>(compare?: Function): Observable<T> {

  return Observable.create<T>((observer: Observer<T>) => {
    let last: T;
    let compareFn: Function;

    if (typeof compare === 'function') {
      compareFn = compare;
    } else {
      compareFn = (last: T, current: T) => last === current;
    }

    const distinctObserver = {
      next: (x: T) => {
        let equal = compareFn(last, x);

        if (!equal) {
          last = x;
          observer.next(x);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(distinctObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.distinctUntilChanged = distinctUntilChanged;

export interface DistinctUntilChangedSignature<T> {
  (compare?: Function): Observable<T>;
}

declare module '../Observable' {
  interface Observable<T> {
    distinctUntilChanged: DistinctUntilChangedSignature<T>;
  }
}
