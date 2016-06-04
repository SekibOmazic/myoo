import {Observable, Observer, Subscription} from '../core';

/**
 * Merges multiple streams together, emitting events from all of them
 * concurrently.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b----c---d------
 *            merge
 * --1-a--2--b--3-c---d--4---
 * ```
 *
 * @param {Observable} stream1 A stream to merge together with other streams.
 * @param {Observable} stream2 A stream to merge together with other streams. One
 * or more streams may be given as arguments.
 * @return {Observable}
 */
export function merge<T, U>(...observables: Array<Observable<any>>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {

    let subscriptions: Array<Subscription<any>> = [];

    // TODO: prepend only if "this" is an Observable
    // prepend this observable
    observables.unshift(this);

    // subscribe to each observable
    observables.forEach(observable => {

      let s = observable.subscribe({
        next: (value: U) => {
          observer.next(value);
        },

        error: (err: any) => { observer.error(err); },

        complete: () => {
          if (s && !s.isUnsubscribed) {
            s.unsubscribe();
          }

          if (subscriptions.filter(s => !s.isUnsubscribed).length === 0) {
            observer.complete();
          }
        }
      });

      subscriptions.push(s);
    });
    return () => {
      // take all unsubscribed and call unsubscribe() on them
      subscriptions.filter(s => !s.isUnsubscribed).forEach(s => s.unsubscribe());

      subscriptions = null;
    };

  });

}

Observable.prototype.merge = merge;

export interface MergeSignature<T> {
  <U>(...observables: Array<Observable<any>>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    merge: MergeSignature<T>;
  }
}