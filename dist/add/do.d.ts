import { Observable } from '../core';
export declare function _do<T>(sideEffect: (val: T) => any): Observable<T>;
export interface DoSignature<T> {
    (sideEffect: (val: T) => any): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        do: DoSignature<T>;
    }
}
