import { Observable } from '../Observable';
/**
 * Concatenates multiple Observables together by sequentially emitting their values,
 * one Observable after the other.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2--|
 *           --b---c---d--|
 *         concat
 * --1----2----b---c---d--|
 * ```
 *
 * @param {Observable} observables An array of Observables to be merged together.
 * @return {Observable}
 */
export declare function concat<T, U>(...observables: Array<Observable<any>>): Observable<U>;
export interface ConcatSignature<T> {
    <U>(...observables: Array<Observable<any>>): Observable<U>;
}
declare module '../Observable' {
    interface Observable<T> {
        concat: ConcatSignature<T>;
    }
}
