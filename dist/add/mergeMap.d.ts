import { Observable } from '../Observable';
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
 * @param projection Function that creates an observable for each value it gets as an input.
 * @return {Observable}
 */
export declare function mergeMap<T, U>(projection: (val: T) => Observable<U>): Observable<U>;
export interface MergeMapSignature<T> {
    <U>(project: (value: T) => Observable<U>): Observable<U>;
}
declare module '../Observable' {
    interface Observable<T> {
        mergeMap: MergeMapSignature<T>;
    }
}
