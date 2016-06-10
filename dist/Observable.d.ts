import { Observer, Subscriber } from './Observer';
import { Subscription } from './Subscription';
export declare class Observable<T> {
    private subscriber;
    static create<T>(subscriber: Subscriber<T>): Observable<T>;
    /**
     * Converts an array to an Observable. The returned Observable will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @param {Array} array The array to be converted as a stream.
     * @return {Observable}
     */
    static fromArray<T>(array: Array<T>): Observable<T>;
    /**
     * Converts a promise to an observable. The returned observable will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the observable will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @param {Promise} promise The promise to be converted to an observable.
     * @return {Observable}
     */
    static fromPromise<T>(promise: Promise<T>): Observable<T>;
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @param items Values you want to emit to the observer.
     * @return {Observable}
     */
    static of<T>(...items: Array<T>): Observable<T>;
    static interval(interval: number): Observable<number>;
    static range(from: number, to: number): Observable<number>;
    constructor(subscriber: Subscriber<T>);
    subscribe(destination: Observer<T>): Subscription<T>;
}
