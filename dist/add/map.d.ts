import { Observable } from '../core';
export declare type Projection<T, U> = (val: T) => U;
export declare function map<T, U>(projection: Projection<T, U>): Observable<U>;
export interface MapSignature<T> {
    <U>(project: (value: T) => U): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        map: MapSignature<T>;
    }
}
