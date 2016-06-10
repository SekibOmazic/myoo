import { Observable } from '../Observable';
export declare function _do<T>(sideEffect: (val: T) => any): Observable<T>;
export interface DoSignature<T> {
    (sideEffect: (val: T) => any): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        do: DoSignature<T>;
    }
}
