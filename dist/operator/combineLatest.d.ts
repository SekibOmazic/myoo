import { Observable } from '../Observable';
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 * It starts emitting values when all input observables emit first value and
 * stops when all input observables have stopped.
 *
 * Marble diagram:
 *
 * ```text
 * --1-------2----------------3-----|
 * -----a----------b-----c--|
 *         combineLatest
 * ----(1a)-(2a)--(2b)--(2c)-(3c)---|
 * ```
 *
 * @param {Observable} observables An array of Observables to be combined.
 * @return {Observable} An Observable that emits combined values.
 */
export declare function combineLatest<T, U>(...observables: Array<any>): Observable<U>;
