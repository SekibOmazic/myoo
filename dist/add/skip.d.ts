import { Observable } from '../core';
export declare function skip<T>(total: number): Observable<T>;
export interface SkipSignature<T> {
    (value: number): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        skip: SkipSignature<T>;
    }
}
