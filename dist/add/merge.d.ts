import { Observable } from '../Observable';
/**
 * Merges multiple streams together, emitting events from all of them
 * concurrently.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b----c---d------
 *            merge
 * --1-a--2--b--3-c---d--4---
 * ```
 *
 * @param {Observable} observables An array of Observables to be merged together.
 * @return {Observable}
 */
export declare function merge<T, U>(...observables: Array<Observable<any>>): Observable<U>;
export interface MergeSignature<T> {
    <U>(...observables: Array<Observable<any>>): Observable<U>;
}
declare module '../Observable' {
    interface Observable<T> {
        merge: MergeSignature<T>;
    }
}
