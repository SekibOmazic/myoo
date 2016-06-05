import { Observable } from '../core';
export declare function scan<T, U>(accumulator: (acc: U, value: T, index?: number) => U, seed?: T | U): Observable<U>;
export interface ScanSignature<T> {
    <U>(accumulator: (acc: U, value: T, index?: number) => U, seed?: T | U): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        scan: ScanSignature<T>;
    }
}
