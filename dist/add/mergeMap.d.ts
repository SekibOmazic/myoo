import { Observable } from '../core';
export declare function mergeMap<T, U>(projection: (val: T) => Observable<U>): Observable<U>;
export interface MergeMapSignature<T> {
    <U>(project: (value: T) => Observable<U>): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        mergeMap: MergeMapSignature<T>;
    }
}
