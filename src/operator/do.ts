import {Observable} from '../Observable';

export function _do<T>(sideEffect: (val: T) => any): Observable<T> {

  return Observable.create<T>((observer) => {

    const doObserver = {
      next: (x: T) => {
        try {
          sideEffect(x);
          observer.next(x);
        } catch (e) {
          observer.error(e);
        }
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
