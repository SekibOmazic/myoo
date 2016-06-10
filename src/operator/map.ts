import {Observable} from '../Observable';
import {Observer} from '../Observer';

export function map<T, U>(projection: (val: T) => U): Observable<U> {

  return Observable.create<U>((observer: Observer<U>) => {
    let mapObserver = {
      next: (x: T) => {
        try {
          observer.next(projection(x));
        } catch (e) {
          observer.error(e);
        }
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    };

    const subscription = this.subscribe(mapObserver);

    return () => {
      subscription.unsubscribe();
    };

  });

}
