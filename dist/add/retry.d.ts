import { Observable } from '../Observable';
export declare function retry<T>(maxTries?: number): Observable<T>;
export interface RetrySignature<T> {
    (value: number): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        retry: RetrySignature<T>;
    }
}
