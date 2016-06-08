import { Observable } from '../core';
export declare function debounceTime<T>(dueTime: number): Observable<T>;
export interface DebounceTimeSignature<T> {
    (dueTime: number): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        debounceTime: DebounceTimeSignature<T>;
    }
}
