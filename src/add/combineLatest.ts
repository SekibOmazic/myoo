import {Observable, Observer, Subscription} from '../core';

/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 * It starts emitting values when all input observables emit first value and
 * stops when all input observables have stopped.
 *
 * Marble diagram:
 *
 * ```text
 * --1-------2----------------3-----|
 * -----a----------b-----c--|
 *         combineLatest
 * ----(1a)-(2a)--(2b)--(2c)-(3c)---|
 * ```
 *
 * @param {Observable} observables An array of Observables to be combined.
 * @return {Observable} An Observable that emits combined values.
 */
export function combineLatest<T, U>(...observables: Array<any>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {
    let project: (...values: Array<any>) => any = null;

    // last argument is a project function?
    if (typeof observables[observables.length - 1] === 'function') {
      project = <(...values: Array<any>) => U>observables.pop();
    }

    let subscriptions: Array<Subscription<any>> = [];
    let values: Array<any> = [];
    let active: number = 0;

    // prepend calling observable
    observables.unshift(this);

    // subscribe to all input observables
    observables.forEach((observable, idx) => {
      let subscription = observable.subscribe({
        next: (x: any) => {
          values[idx] = x;
          // start emitting only when all sources emitted at least one value
          if (++active >= observables.length) {
            try {
              let output = values;
              if (project) {
                output = project(...values);
              }
              observer.next(<any>output);
            } catch (err) {
              observer.error(err);
            }
          }
        },
        error: (err: any) => observer.error(err),
        complete: () => {
          // complete only when all sources have completed
          if (subscriptions.filter(s => !s.isStopped).length === 0) {
            observer.complete();
          }
        }
      });

      subscriptions.push(subscription);
    });

    return () => {
      subscriptions.filter(s => !s.isUnsubscribed).forEach(s => s.unsubscribe());
      subscriptions = null;
    };

  });

}

Observable.prototype.combineLatest = combineLatest;

export interface CombineLatestSignature<T> {
  <U>(...observables: Array<any>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    combineLatest: CombineLatestSignature<T>;
  }
}