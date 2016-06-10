import {Observable} from '../Observable';
import {Observer} from '../Observer';

/**
 * Ignores the first `total` many events from the input stream, and then
 * after that starts forwarding events from the input stream to the output
 * stream.
 *
 * Marble diagram:
 *
 * ```text
 * --a---b--c----d---e--
 *       skip(3)
 * --------------d---e--
 * ```
 *
 * @param {number} total Number of events to ignore from the input stream.
 * @return {Observable}
 */
export function skip<T>(total: number): Observable<T> {
  let counter: number = 0;

  return Observable.create<T>((observer: Observer<T>) => {
    const takeObserver = {
      next: (x: T) => {
        if (counter++ >= total) {
          observer.next(x);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(takeObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.skip = skip;

export interface SkipSignature<T> {
  (value: number): Observable<T>;
}

declare module '../Observable' {
  interface Observable<T> {
    skip: SkipSignature<T>;
  }
}