import { Observable } from '../core';
export declare function switchMap<T, U>(projection: (val: T) => Observable<U>): Observable<U>;
export interface SwitchMapSignature<T> {
    <U>(project: (value: T) => Observable<U>): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        switchMap: SwitchMapSignature<T>;
    }
}
