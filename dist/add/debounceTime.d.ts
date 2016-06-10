import { Observable } from '../Observable';
export declare function debounceTime<T>(dueTime: number): Observable<T>;
export interface DebounceTimeSignature<T> {
    (dueTime: number): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        debounceTime: DebounceTimeSignature<T>;
    }
}
