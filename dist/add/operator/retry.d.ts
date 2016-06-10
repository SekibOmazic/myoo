import { Observable } from '../../Observable';
export interface RetrySignature<T> {
    (value: number): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        retry: RetrySignature<T>;
    }
}
