import { Observable } from '../Observable';
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
export declare function skipUntil<T, U>(control: Observable<U>): Observable<T>;
export interface SkipUntilSignature<T> {
    <U>(control: Observable<U>): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        skipUntil: SkipUntilSignature<T>;
    }
}
