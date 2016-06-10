import { Observable } from '../../Observable';
export interface DebounceTimeSignature<T> {
    (dueTime: number): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        debounceTime: DebounceTimeSignature<T>;
    }
}
