import { Observable } from '../core';
/**
 * Projects each source value to an Observable which is merged in the output Observable.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *             mergeMap
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @return {Observable}
 */
export declare function mergeMap<T, U>(projection: (val: T) => Observable<U>): Observable<U>;
export interface MergeMapSignature<T> {
    <U>(project: (value: T) => Observable<U>): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        mergeMap: MergeMapSignature<T>;
    }
}
