import {Observable, Observer, Subscription} from '../core';

export function skipUntil<T, U>(control: Observable<U>): Observable<T> {

  return Observable.create<T>((observer: Observer<T>) => {

    let outer: Subscription<T> = null;
    let controlSubscription: Subscription<U> = null;
    let readyToEmit: boolean = false;

    const controlObserver: Observer<U> = {
      next: (x: U) => {
        readyToEmit = true;
        controlSubscription.unsubscribe();
      },
      error: (err: any) => observer.error(err),
      complete: () => {} //observer.complete()
    };

    controlSubscription = control.subscribe(controlObserver);

    outer = this.subscribe({
      next: (value: T) => {
        if (readyToEmit) {
          observer.next(value);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    });

    return () => {
      outer.unsubscribe();
      controlSubscription.unsubscribe();
    };
  });
}

Observable.prototype.skipUntil = skipUntil;

export interface SkipUntilSignature<T> {
  <U>(control: Observable<U>): Observable<T>;
}

declare module '../core' {
  interface Observable<T> {
    skipUntil: SkipUntilSignature<T>;
  }
}