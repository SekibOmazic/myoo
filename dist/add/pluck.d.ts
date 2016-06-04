import { Observable } from '../core';
export declare function pluck<T, U>(...properties: Array<string>): Observable<U>;
export interface PluckSignature<T> {
    <U>(...properties: Array<string>): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        pluck: PluckSignature<T>;
    }
}
