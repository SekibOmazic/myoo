import { Observable } from '../core';
export declare function take<T>(total: number): Observable<T>;
export interface TakeSignature<T> {
    (value: number): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        take: TakeSignature<T>;
    }
}
