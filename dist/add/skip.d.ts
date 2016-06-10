import { Observable } from '../Observable';
/**
 * Ignores the first `total` many events from the input stream, and then
 * after that starts forwarding events from the input stream to the output
 * stream.
 *
 * Marble diagram:
 *
 * ```text
 * --a---b--c----d---e--
 *       skip(3)
 * --------------d---e--
 * ```
 *
 * @param {number} total Number of events to ignore from the input stream.
 * @return {Observable}
 */
export declare function skip<T>(total: number): Observable<T>;
export interface SkipSignature<T> {
    (value: number): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        skip: SkipSignature<T>;
    }
}
