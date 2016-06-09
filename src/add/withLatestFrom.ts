import {Observable, Observer, Subscription} from '../core';

/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the source emits.
 * All input Observables must emit at least one value before the output Observable will emit a value.
 *
 * Marble diagram:
 *
 * ```text
 * --a----b---------c----d-----|
 * ----1----2--3--4----|
 *         withLatestFrom
 * ------(b1)------(c4)--(d4)--|
 * ```
 *
 * @param {Observable} observables An array of Observables to be combined.
 * @return {Observable} An Observable that emits combined values.
 */
export function withLatestFrom<T, U>(...observables: Array<any>): Observable<U> {

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
          if (values[idx] == undefined) {
            active++;
          }
          values[idx] = x;

          // start emitting only when all sources emitted at least one value
          // and the source (first observable) emits a value.
          if (active === observables.length && idx === 0) {
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
          // complete when first Observable has completed
          if (idx === 0) {
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

Observable.prototype.withLatestFrom = withLatestFrom;

export interface WithLatestFromSignature<T> {
  <U>(...observables: Array<any>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    withLatestFrom: WithLatestFromSignature<T>;
  }
}