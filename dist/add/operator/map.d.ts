import { Observable } from '../../Observable';
export interface MapSignature<T> {
    <U>(project: (value: T) => U): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        map: MapSignature<T>;
    }
}
