import {Observable} from '../Observable';
import {Observer} from '../Observer';

export function map<T, U>(projection: (val: T) => U): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {
    let mapObserver = {
      next: (x: T) => {
        try {
          observer.next(projection(x));
        } catch (e) {
          observer.error(e);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(mapObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.map = map;

export interface MapSignature<T> {
  <U>(project: (value: T) => U): Observable<U>;
}

declare module '../Observable' {
  interface Observable<T> {
    map: MapSignature<T>;
  }
}