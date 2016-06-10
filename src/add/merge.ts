import {Observable} from '../Observable';
import {Observer} from '../Observer';
import {Subscription} from '../Subscription';

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
 * @param {Observable} observables An array of Observables to be merged together.
 * @return {Observable}
 */
export function merge<T, U>(...observables: Array<Observable<any>>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {

    let subscriptions: Array<Subscription<any>> = [];

    // prepend this observable
    if (this instanceof Observable) {
      observables.unshift(this);
    }

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

declare module '../Observable' {
  interface Observable<T> {
    merge: MergeSignature<T>;
  }
}