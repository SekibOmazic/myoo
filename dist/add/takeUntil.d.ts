import { Observable } from '../core';
export declare function takeUntil<T, U>(control: Observable<U>): Observable<T>;
export interface TakeUntilSignature<T> {
    <U>(control: Observable<U>): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        takeUntil: TakeUntilSignature<T>;
    }
}
