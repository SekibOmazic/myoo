import {Observable, Observer, Subscription} from '../core';

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

Observable.prototype.mergeMap = mergeMap;

export interface MergeMapSignature<T> {
  <U>(project: (value: T) => Observable<U>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    mergeMap: MergeMapSignature<T>;
  }
}