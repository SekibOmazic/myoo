import { Observable } from '../core';
/**
 * Uses another Observable to determine when to complete the current one.
 *
 * When the given `control` stream emits an event or completes, the output
 * stream will complete. Before that happens, the output stream will just
 * pass values from the input observable.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   takeUntil( ------a--b--| )
 * ---1---2-----3--4--|
 * ```
 *
 * @param control Some other stream that is used to know when should the output
 * stream of this operator complete.
 * @return {Observable}
 */
export declare function takeUntil<T, U>(control: Observable<U>): Observable<T>;
export interface TakeUntilSignature<T> {
    <U>(control: Observable<U>): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        takeUntil: TakeUntilSignature<T>;
    }
}
