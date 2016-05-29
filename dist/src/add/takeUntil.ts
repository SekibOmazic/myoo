import {Observable, Observer} from '../core';

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