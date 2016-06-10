import {Observable} from '../Observable';
import {Observer} from '../Observer';
import {Subscription} from '../Subscription';

/**
 * Ignores the events from the input stream until the control Observable emits
 * first event and then starts forwarding events to the output.
 *
 * Marble diagram:
 *
 * ```text
 * --a---b---c-----d---e----
 *   skipUntil( --a---b--| )
 * ----------------d---e----
 * ```
 *
 * @param {Observable} control An Observable of events to ignore from the input stream.
 * @return {Observable}
 */
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
