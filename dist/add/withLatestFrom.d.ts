import { Observable } from '../core';
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the source emits.
 * All input Observables must emit at least one value before the output Observable will emit a value.
 *
 * Marble diagram:
 *
 * ```text
 * --a----b---------c----d-----|
 * ----1----2--3--4----|
 *         withLatestFrom
 * ------(b1)------(c4)--(d4)--|
 * ```
 *
 * @param {Observable} observables An array of Observables to be combined.
 * @return {Observable} An Observable that emits combined values.
 */
export declare function withLatestFrom<T, U>(...observables: Array<any>): Observable<U>;
export interface WithLatestFromSignature<T> {
    <U>(...observables: Array<any>): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        withLatestFrom: WithLatestFromSignature<T>;
    }
}
