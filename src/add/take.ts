import {Observable} from '../Observable';
import {Observer} from '../Observer';

export function take<T>(total: number): Observable<T> {
  let counter: number = 0;

  return Observable.create<T>((observer: Observer<T>) => {
    const takeObserver = {
      next: (x: T) => {
        if (++counter <= total) {
          observer.next(x);

          if (counter === total) {
            observer.complete();
          }
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

Observable.prototype.take = take;

export interface TakeSignature<T> {
  (value: number): Observable<T>;
}

declare module '../Observable' {
  interface Observable<T> {
    take: TakeSignature<T>;
  }
}