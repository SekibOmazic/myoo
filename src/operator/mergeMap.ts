import {Observable} from '../Observable';
import {Observer} from '../Observer';
import {Subscription} from '../Subscription';

/**
 * Projects each source value to an Observable which is merged in the output Observable.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *             mergeMap
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @param projection Function that creates an observable for each value it gets as an input.
 * @return {Observable}
 */
export function mergeMap<T, U>(projection: (val: T) => Observable<U>): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {

    let innerSubscriptions: Array<Subscription<U>> = [];
    let outer: Subscription<T> = null;

    outer = this.subscribe({

      next: (value: T) =>  {

        // for the new value of outer stream invoke projection(value)
        // which will create another inner stream.
        // subscribe to this new inner stream and send its
        // values to the destination observer.
        // Also store the subscription into the innerSubscriptions
        let inner: Subscription<U> = projection(value).subscribe({

          next: (x: U) => observer.next(x),
          error: (err: any) => observer.error(err),
          complete: () => {
            // unsubscribe from this(inner) stream
            if (inner && !inner.isUnsubscribed) {
              inner.unsubscribe();
            }

            // if there is no more active streams signal complete to the observer
            if (innerSubscriptions.filter(s => !s.isUnsubscribed).length === 0) {
              observer.complete();
            }
          }
        });

        innerSubscriptions.push(inner);
      },

      error: (err: any) => observer.error(err),

      complete: () => {
        // if all inner streams have stopped signal complete to the observer
        if (innerSubscriptions.filter(inner => !inner.isStopped).length === 0) {
          observer.complete();
        }
      }

    });

    return () => {
      // release resources from all active inner streams
      innerSubscriptions.filter(subscription => !subscription.isUnsubscribed)
                        .forEach(subscription => subscription.unsubscribe());

      outer.unsubscribe();
    };

  });

}
