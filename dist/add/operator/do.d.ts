import { Observable } from '../../Observable';
export interface DoSignature<T> {
    (sideEffect: (val: T) => any): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        do: DoSignature<T>;
    }
}
