import {Observable} from '../core';

export function _do<T>(sideEffect: (val: T) => any): Observable<T> {

  return Observable.create<T>((observer) => {

    const doObserver = {
      next: (x: T) => {
        sideEffect(x); // TODO: error handling
        observer.next(x);
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(doObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}

Observable.prototype.do = _do;

export interface DoSignature<T> {
  (sideEffect: (val: T) => any): Observable<T>;
}

declare module '../core' {
  interface Observable<T> {
    do: DoSignature<T>;
  }
}