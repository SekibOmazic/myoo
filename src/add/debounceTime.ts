import {Observable} from '../Observable';
import {Observer} from '../Observer';

function cleanup(timerId: any) {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
}
export function debounceTime<T>(dueTime: number): Observable<T> {

  return Observable.create<T>((observer: Observer<T>) => {
    let debounceTimer: any;
    let current: T = null;

    const debounceTimeObserver = {
      next: (x: T) => {
        current = x;

        // clear scheduled task, if we have one
        cleanup(debounceTimer);

        // schedule new task
        debounceTimer = setTimeout(() => {
          observer.next(current);
        }, dueTime);

      },
      error: (err: any) => observer.error(err),
      complete: () => {
        const hasValueScheduled = debounceTimer != null;

        cleanup(debounceTimer);

        // emit the last value if we have one scheduled
        if (hasValueScheduled) {
          observer.next(current);
        }

        // complete
        observer.complete();
      }
    };

    const subscription = this.subscribe(debounceTimeObserver);

    return () => {
      // cleanup internal timeout
      cleanup(debounceTimer);

      subscription.unsubscribe();
    };

  });
}

Observable.prototype.debounceTime = debounceTime;

export interface DebounceTimeSignature<T> {
  (dueTime: number): Observable<T>;
}

declare module '../Observable' {
  interface Observable<T> {
    debounceTime: DebounceTimeSignature<T>;
  }
}