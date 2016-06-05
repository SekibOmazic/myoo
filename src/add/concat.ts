import {Observable, Observer, Subscription} from '../core';

/**
 * Concatenates multiple Observables together by sequentially emitting their values,
 * one Observable after the other.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2--|
 *           --b---c---d--|
 *         concat
 * --1----2----b---c---d--|
 * ```
 *
 * @param {Observable} observables An array of Observables to be merged together.
 * @return {Observable}
 */
export function concat<T, U>(...observables: Array<Observable<any>>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {

    let subscription: Subscription<any> = null;
    let others: Array<Observable<any>> = observables.slice();

    let concatObserver = {
      next: (x: U) => {
        try {
          observer.next(x);
        } catch (e) {
          observer.error(e);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => {
        if (others.length > 0) {
          // subscribe to the next available observable
          subscription = others.shift().subscribe(concatObserver);
        } else {
          // no more observables left - send complete signal to the observer
          observer.complete();
        }
      }
    };

    subscription = this.subscribe(concatObserver);

    return () => {
      subscription.unsubscribe();
      subscription = null;
    };

  });

}

Observable.prototype.concat = concat;

export interface ConcatSignature<T> {
  <U>(...observables: Array<Observable<any>>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    concat: ConcatSignature<T>;
  }
}