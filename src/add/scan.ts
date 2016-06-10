import {Observable} from '../Observable';
import {Observer} from '../Observer';

export function scan<T, U>(accumulator: (acc: U, value: T, index?: number) => U, seed?: T | U): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {
    let index: number = 0;
    let acc: T | U = seed;
    let seedSet = !!acc;

    let scanObserver = {
      next: (x: T) => {
        try {
          if (seedSet) {
            acc = accumulator(<U>acc, x, index++);
          } else {
            acc = x;
            seedSet = true;
          }
          observer.next(<U>acc);
        } catch (e) {
          observer.error(e);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(scanObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.scan = scan;

export interface ScanSignature<T> {
  <U>(accumulator: (acc: U, value: T, index?: number) => U, seed?: T | U): Observable<U>;
}

declare module '../Observable' {
  interface Observable<T> {
    scan: ScanSignature<T>;
  }
}