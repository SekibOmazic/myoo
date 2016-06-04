import { Observable } from '../core';
export declare function skipUntil<T, U>(control: Observable<U>): Observable<T>;
export interface SkipUntilSignature<T> {
    <U>(control: Observable<U>): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        skipUntil: SkipUntilSignature<T>;
    }
}
