import { Observable } from '../core';
export declare function retry<T>(maxTries?: number): Observable<T>;
export interface RetrySignature<T> {
    (value: number): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        retry: RetrySignature<T>;
    }
}
