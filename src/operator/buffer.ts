import {Observable} from '../Observable';
import {Observer} from '../Observer';

/**
 * Collects values from the past as an array, and emits that array only
 * when another Observable emits.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2---3---4---5---6---|
 * ---------a-------a-------a-|
 *            buffer
 * --------[1,2]---[3,4]------|
 * ```
 *
 * @param control Some other stream that is used to know when should the output
 * stream of this operator emit the array of values.
 * @return {Observable}
 */
export function buffer<T, U>(control: Observable<U>): Observable<T[]> {

  return Observable.create<T[]>((observer: Observer<T[]>) => {

    const buffer: Array<T> = [];

    // subscribe to the control stream
    const input = control.subscribe({
      next: (x: U) => {
        observer.next(buffer);
        buffer.length = 0;
      },
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    });

    // subscribe to the source stream
    const source = this.subscribe({
      next: (x: T) => buffer.push(x),
      error: (err: any) => observer.error(err),
      complete: () => observer.complete()
    });

    return () => {
      source.unsubscribe();
      input.unsubscribe();
    };

  });

}