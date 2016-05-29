import {Observable, Observer, Subscription} from '../core';

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
            if (inner.isStopped) {
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

Observable.prototype.switchMap = switchMap;

export interface SwitchMapSignature<T> {
  <U>(project: (value: T) => Observable<U>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    switchMap: SwitchMapSignature<T>;
  }
}