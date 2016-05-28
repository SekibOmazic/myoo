import {Observable, Observer} from '../core';

export type Projection<T, U> = (val: T) => U;

export function map<T, U>(projection: Projection<T, U>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {
    let mapObserver = {
      next: (x: T) => observer.next(projection(x)),
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

declare module '../core' {
  interface Observable<T> {
    map: MapSignature<T>;
  }
}