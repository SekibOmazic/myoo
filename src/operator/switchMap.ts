import {Observable} from '../Observable';
import {Observer} from '../Observer';
import {Subscription} from '../Subscription';

/**
 * Flattens an "observable of observables", handling only one nested stream at a time.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *           switchMap
 * -----a--b------1----2---3--
 * ```
 *
 * @param projection Function that creates an observable for each value it gets as an input.
 * @return {Observable}
 */
export function switchMap<T, U>(projection: (val: T) => Observable<U>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {

    let inner: Subscription<U> = null;
    let outer: Subscription<T> = null;

    outer = this.subscribe({

      next: (value: T) =>  {

        // if there is a current inner stream unsubscribe from it
        if (inner && !inner.isUnsubscribed) {
          inner.unsubscribe();
        }

        // for the new value of outer stream invoke projection(value)
        // which will create another inner stream.
        // subscribe to this new inner stream and send its
        // values to the destination observer
        inner = projection(value).subscribe({

          next: (x: U) => observer.next(x),
          error: (err: any) => observer.error(err),
          complete: () => {
            if (inner.isStopped && outer.isStopped) {
              observer.complete();
            }
          }
        });
      },

      error: (err: any) => observer.error(err),

      complete: () => {
        if (!inner || inner.isUnsubscribed) {
          observer.complete();
        }
      }

    });

    return () => {

      if (inner && !inner.isUnsubscribed) {
        inner.unsubscribe();
      }

      outer.unsubscribe();
    };

  });

}
