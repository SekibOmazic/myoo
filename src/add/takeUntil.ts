import {Observable, Observer} from '../core';

/**
 * Uses another Observable to determine when to complete the current one.
 *
 * When the given `control` stream emits an event or completes, the output
 * stream will complete. Before that happens, the output stream will just
 * pass values from the input observable.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   takeUntil( ------a--b--| )
 * ---1---2-----3--4--|
 * ```
 *
 * @param control Some other stream that is used to know when should the output
 * stream of this operator complete.
 * @return {Observable}
 */
export function takeUntil<T, U>(control: Observable<U>): Observable<T> {

  return Observable.create<T>((observer: Observer<T>) => {

    let source = this.subscribe(observer);

    const innerObserver: Observer<U> = {
      next: (x: U) => observer.complete(),
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    let input = control.subscribe(innerObserver);

    return () => {
      source.unsubscribe();
      input.unsubscribe();
    };
  });
}

Observable.prototype.takeUntil = takeUntil;

export interface TakeUntilSignature<T> {
  <U>(control: Observable<U>): Observable<T>;
}

declare module '../core' {
  interface Observable<T> {
    takeUntil: TakeUntilSignature<T>;
  }
}